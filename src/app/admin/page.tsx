import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Download } from "lucide-react";
import { getAdminUser } from "@/lib/admin";
import { getServiceClient } from "@/lib/supabase-service";
import { logout, setFeedbackStatus, setPledgeStatus } from "./actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type Pledge = { id: string; display_name: string | null; action_category: string; commitment: string; frequency: string; selected_sdgs: number[]; status: string; created_at: string };
type Feedback = { id: string; name: string | null; email: string | null; category: string; message: string; status: string; created_at: string };

const FILTERS = ["pending", "approved", "rejected"] as const;

function StatusButton({ action, id, status, label }: { action: (f: FormData) => Promise<void>; id: string; status: string; label: string }) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button type="submit" className="rounded-full border border-forest/40 px-3 py-1 text-xs font-bold text-forest hover:bg-sage/40">{label}</button>
    </form>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");
  const db = getServiceClient();
  if (!db) return <section className="section"><div className="container-x">The server database is not configured.</div></section>;

  const { status } = await searchParams;
  const filter = (FILTERS as readonly string[]).includes(status ?? "") ? (status as string) : "pending";

  const count = async (table: string, col: string, val: string) =>
    (await db.from(table).select("id", { count: "exact", head: true }).eq(col, val)).count ?? 0;

  const [pending, approved, rejected, newFeedback, pledgesRes, feedbackRes] = await Promise.all([
    count("pledges", "status", "pending"),
    count("pledges", "status", "approved"),
    count("pledges", "status", "rejected"),
    count("feedback", "status", "new"),
    db.from("pledges").select("id, display_name, action_category, commitment, frequency, selected_sdgs, status, created_at").eq("status", filter).order("created_at", { ascending: false }).limit(200),
    db.from("feedback").select("id, name, email, category, message, status, created_at").neq("status", "archived").order("created_at", { ascending: false }).limit(100),
  ]);
  const pledges = (pledgesRes.data ?? []) as Pledge[];
  const feedback = (feedbackRes.data ?? []) as Feedback[];

  return (
    <section className="section">
      <div className="container-x space-y-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><h1 className="text-3xl font-extrabold text-forest">Moderation dashboard</h1><p className="text-sm text-deep/70">Signed in as {admin.email}</p></div>
          <div className="flex gap-3">
            <a href="/api/admin/export" className="btn-outline"><Download size={16} aria-hidden="true" /> Export approved (CSV)</a>
            <form action={logout}><button type="submit" className="btn-primary">Sign out</button></form>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[["Pending pledges", pending], ["Approved pledges", approved], ["Rejected pledges", rejected], ["New feedback", newFeedback]].map(([l, n]) => (
            <div key={l as string} className="card"><dt className="text-sm font-semibold text-deep/70">{l}</dt><dd className="font-heading text-4xl font-extrabold text-forest">{n}</dd></div>
          ))}
        </dl>

        <div>
          <h2 className="mb-4 text-2xl font-bold text-forest">Pledges</h2>
          <div className="mb-4 flex gap-2" role="tablist" aria-label="Pledge status">
            {FILTERS.map((f) => (
              <Link key={f} href={`/admin?status=${f}`} aria-current={filter === f ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${filter === f ? "bg-forest text-white" : "bg-white text-forest ring-1 ring-forest/20"}`}>{f}</Link>
            ))}
          </div>
          {pledges.length === 0 ? <p className="card">No {filter} pledges.</p> : (
            <ul className="space-y-3">
              {pledges.map((p) => (
                <li key={p.id} className="card">
                  <p className="font-semibold text-forest">{p.commitment}</p>
                  <p className="mt-1 text-sm text-deep/75">{p.display_name || "Anonymous"} &middot; {p.action_category} &middot; {p.frequency} &middot; SDG {p.selected_sdgs.join(", ")} &middot; {new Date(p.created_at).toLocaleString()}</p>
                  <div className="mt-3 flex gap-2">
                    {p.status !== "approved" && <StatusButton action={setPledgeStatus} id={p.id} status="approved" label="Approve" />}
                    {p.status !== "rejected" && <StatusButton action={setPledgeStatus} id={p.id} status="rejected" label="Reject" />}
                    {p.status !== "pending" && <StatusButton action={setPledgeStatus} id={p.id} status="pending" label="Move to pending" />}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold text-forest">Feedback (private)</h2>
          {feedback.length === 0 ? <p className="card">No feedback yet.</p> : (
            <ul className="space-y-3">
              {feedback.map((f) => (
                <li key={f.id} className="card">
                  <p className="text-sm font-bold text-nature">{f.category} &middot; {f.status}</p>
                  <p className="mt-1 whitespace-pre-wrap">{f.message}</p>
                  <p className="mt-2 text-sm text-deep/75">{f.name || "Anonymous"}{f.email ? ` (${f.email})` : ""} &middot; {new Date(f.created_at).toLocaleString()}</p>
                  <div className="mt-3 flex gap-2">
                    {f.status !== "reviewed" && <StatusButton action={setFeedbackStatus} id={f.id} status="reviewed" label="Mark reviewed" />}
                    <StatusButton action={setFeedbackStatus} id={f.id} status="archived" label="Archive" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
