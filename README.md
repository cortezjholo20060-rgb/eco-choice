# ECO-CHOICE: Every Action Leaves a Footprint.

An interactive environmental awareness platform for an Ethics semestral project on **Environmental Stewardship** and the **17 Sustainable Development Goals**.

Stack: Next.js 15 (App Router, server-rendered), React 19, TypeScript, Tailwind CSS, Supabase (Postgres + Auth + RLS), Zod + React Hook Form, Recharts, Lucide icons. Deploys on Vercel.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: hero, six issues, small choices, SDG grid, challenge preview, live stats |
| `/awareness` | Stewardship, why it matters, 8 environmental challenges, actions, references |
| `/sdgs`, `/sdgs/1` to `/sdgs/17` | SDG explorer with search, filter and modal, plus a crawlable page for each goal |
| `/challenge` | 10-scenario ethical decision game with feedback, scoring, review |
| `/pledge` | Pledge form (validated, saved to Supabase, moderated) |
| `/impact` | Live dashboard (approved pledges only) |
| `/about`, `/contact`, `/privacy` | Project info, feedback form, privacy policy |
| `/admin`, `/admin/login` | Moderation, feedback inbox, CSV export (protected) |

## 1. Run locally

```bash
npm install
cp .env.example .env.local     # then fill in the values (see below)
npm run dev                    # http://localhost:3000
npm run typecheck
npm run build
```

Without Supabase variables the public site still renders. Forms return a "temporarily unavailable" message and the dashboard shows its empty state.

## 2. Supabase setup

1. Create a project at supabase.com.
2. Open **SQL Editor** and run `supabase/migrations/001_init.sql`. This creates `pledges`, `feedback` and `admins`, indexes, Row Level Security and column-level grants.
3. Open **Project Settings > API** and copy into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only, never prefix with `NEXT_PUBLIC_`)
4. Set `RATE_LIMIT_SALT` to a long random string (`openssl rand -hex 32`).

### Security model

- Visitors never write to the database directly. There is no insert policy; the `/api/pledge` and `/api/feedback` routes validate with Zod, check a honeypot, rate limit (5 pledges and 3 messages per hour per hashed IP) and insert with the service-role key.
- Anonymous visitors can read only **approved** pledges, and only safe columns (hashes are not granted).
- Feedback is not readable by anyone except admins.
- New pledges start as `pending` and appear publicly only after an admin approves them.
- Duplicate submissions are blocked by a unique `(ip_hash, content_hash)` index.
- Raw IPs are never stored.

## 3. Create the first administrator (no hardcoded password)

1. Supabase dashboard > **Authentication > Users > Add user**. Enter your email and a strong password.
2. In the SQL Editor run (replace the email):
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@example.com';
   ```
3. Sign in at `/admin/login`. A valid Supabase account that is **not** listed in `public.admins` is rejected.

Consider disabling public sign-ups in **Authentication > Providers > Email** so nobody else can register accounts.

## 4. Deploy to Vercel

1. Push the project to GitHub.
2. In Vercel: **Add New > Project**, import the repository (framework is detected as Next.js).
3. Under **Environment Variables**, add every variable from `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to your final public URL (for example `https://eco-choice.vercel.app` or your custom domain), with no trailing slash.
4. Deploy. After changing `NEXT_PUBLIC_SITE_URL`, redeploy so the sitemap and canonical URLs update.

### Custom domain

Vercel project > **Settings > Domains > Add**, then create the DNS records Vercel shows (an `A` record for the apex domain, or a `CNAME` for a subdomain). Update `NEXT_PUBLIC_SITE_URL` and redeploy.

## 5. Google Search Console

Google cannot index the site until it is deployed on a publicly reachable URL. Indexing is not instant or guaranteed; it can take days or weeks.

1. Go to search.google.com/search-console and **Add property**.
2. Choose **Domain** (verify with a DNS TXT record at your registrar) if you own a custom domain, or **URL prefix** for your Vercel URL (verify with the HTML tag method by adding the verification meta to `metadata.verification.google` in `src/app/layout.tsx`).
3. Open **Sitemaps**, enter `sitemap.xml` and submit. The sitemap lists every public page and all 17 SDG pages.
4. Use **URL Inspection** on the homepage and click **Request indexing**.
5. Check progress under **Pages** (indexing report). Allow time before expecting results.

`robots.txt` allows all public pages and blocks `/admin` and `/api/`. Admin pages also send `noindex`.

## 6. Configure the About page (no code edits)

Optional environment variables show an "Academic project details" card on `/about`. Leave them blank to hide it:

`NEXT_PUBLIC_PROJECT_TITLE`, `NEXT_PUBLIC_PROJECT_COURSE`, `NEXT_PUBLIC_PROJECT_INSTITUTION`, `NEXT_PUBLIC_PROJECT_MEMBERS` (semicolon-separated names).

## Content and asset notes

- **Images:** the site uses original SVG illustrations and gradients, so there are no broken or unlicensed images. To add photography, place licensed images in `public/` and use `next/image` with descriptive `alt` text.
- **SDG icons:** the official UN SDG icons have usage guidelines. Cards use the official numbers, names and colors with number tiles. To use the official icons, follow the UN guidelines at un.org/sustainabledevelopment/news/communications-material.
- **Facts:** educational text is qualitative and based on the references listed on `/awareness#references`. No statistics are invented.

## 7. Testing checklist

- [ ] `npm run typecheck` and `npm run build` succeed.
- [ ] Navigation works on every page; mobile menu opens, closes with Escape and on navigation.
- [ ] No horizontal scroll at 360, 390, 430, 768, 1024, 1366 and 1920 px.
- [ ] SDG search works by number ("13"), title ("water") and keyword; "Environment-related" filter shows 7 goals; modal opens, closes with Esc, related goals switch.
- [ ] `/sdgs/1` to `/sdgs/17` load; `/sdgs/18` shows the 404.
- [ ] Challenge: all 10 questions answer, show explanation, score tallies, each result tier (0-4, 5-6, 7-8, 9-10), Review and Play again work.
- [ ] Pledge form: empty submit shows errors; honeypot ignored; valid submit shows confirmation; duplicate returns a friendly message; 6th pledge in an hour is rate limited.
- [ ] A new pledge does **not** appear on `/impact` until approved in `/admin`; after approval it does (within about 60 seconds).
- [ ] Contact form saves feedback, which appears only in `/admin`.
- [ ] `/admin` redirects to login when signed out; a non-admin account is rejected; CSV export downloads approved pledges only.
- [ ] `/sitemap.xml` and `/robots.txt` load; view-source on `/` shows content and JSON-LD; Rich Results Test passes for WebSite/Organization.
- [ ] Tab through each page: visible focus, labelled fields, skip link works.
- [ ] Run Lighthouse in Chrome DevTools for performance, accessibility, best practices and SEO.
