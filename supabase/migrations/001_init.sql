-- ECO-CHOICE database schema, Row Level Security and indexes.
-- Run in the Supabase SQL editor (or via the Supabase CLI).

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------
-- Administrators: a user listed here may moderate content.
-- ---------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- An admin may see the admin list; nobody can change it through the API.
-- Add admins from the SQL editor only (see README).
drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- ---------------------------------------------------------------
-- Pledges
-- ---------------------------------------------------------------
create table if not exists public.pledges (
  id uuid primary key default gen_random_uuid(),
  display_name text check (display_name is null or char_length(display_name) <= 40),
  action_category text not null check (action_category in (
    'Waste Reduction','Plastic Reduction','Water Conservation','Energy Conservation',
    'Tree and Biodiversity Protection','Sustainable Transportation','Responsible Consumption',
    'Community Cleanliness','Environmental Education','Other')),
  commitment text not null check (char_length(commitment) between 10 and 500),
  frequency text not null check (frequency in ('Daily','Weekly','Monthly','Whenever possible')),
  selected_sdgs smallint[] not null check (
    cardinality(selected_sdgs) between 1 and 5
    and selected_sdgs <@ array[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]::smallint[]),
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  ip_hash text not null,          -- salted SHA-256 of the visitor IP; never the raw IP
  content_hash text not null,     -- hash of the normalised commitment, blocks duplicates
  created_at timestamptz not null default now(),
  moderated_at timestamptz,
  moderated_by uuid references auth.users(id) on delete set null
);

create unique index if not exists pledges_no_duplicates on public.pledges (ip_hash, content_hash);
create index if not exists pledges_status_created on public.pledges (status, created_at desc);
create index if not exists pledges_ip_created on public.pledges (ip_hash, created_at desc);
create index if not exists pledges_category on public.pledges (action_category);

alter table public.pledges enable row level security;

-- Public visitors may read ONLY approved pledges, and ONLY safe columns.
revoke all on public.pledges from anon, authenticated;
grant select (id, display_name, action_category, commitment, frequency, selected_sdgs, created_at)
  on public.pledges to anon, authenticated;
grant select, update on public.pledges to authenticated;  -- narrowed by the admin policies below

drop policy if exists "public reads approved pledges" on public.pledges;
create policy "public reads approved pledges" on public.pledges
  for select to anon, authenticated using (status = 'approved');

drop policy if exists "admins read all pledges" on public.pledges;
create policy "admins read all pledges" on public.pledges
  for select to authenticated using (public.is_admin());

drop policy if exists "admins moderate pledges" on public.pledges;
create policy "admins moderate pledges" on public.pledges
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- No insert policy exists on purpose: inserts happen only through the server API
-- (service role), which validates input, rate limits and hashes IPs.

-- ---------------------------------------------------------------
-- Feedback (private; never readable by the public)
-- ---------------------------------------------------------------
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  name text check (name is null or char_length(name) <= 60),
  email text check (email is null or char_length(email) <= 120),
  category text not null check (category in (
    'Website Feedback','Environmental Suggestions','Technical Issue','General Inquiry','Other')),
  message text not null check (char_length(message) between 10 and 1500),
  status text not null default 'new' check (status in ('new','reviewed','archived')),
  ip_hash text not null,
  content_hash text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists feedback_no_duplicates on public.feedback (ip_hash, content_hash);
create index if not exists feedback_status_created on public.feedback (status, created_at desc);
create index if not exists feedback_ip_created on public.feedback (ip_hash, created_at desc);

alter table public.feedback enable row level security;

revoke all on public.feedback from anon, authenticated;
grant select, update on public.feedback to authenticated;

drop policy if exists "admins read feedback" on public.feedback;
create policy "admins read feedback" on public.feedback
  for select to authenticated using (public.is_admin());

drop policy if exists "admins update feedback" on public.feedback;
create policy "admins update feedback" on public.feedback
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
