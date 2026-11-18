import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/ui";
import { CategoryChart, SdgChart } from "@/components/Charts";
import { getCommunityStats } from "@/lib/stats";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "Community Impact Dashboard",
  description: "See real participation in the ECO-CHOICE campaign: approved pledges, popular action categories and the SDGs people commit to supporting.",
  path: "/impact",
});

export default async function ImpactPage() {
  const stats = await getCommunityStats();
  const empty = stats.totalPledges === 0;

  return (
    <>
      <PageHero eyebrow="Community impact" title="Small commitments. Collective impact." text="Live figures from approved pledges. Nothing on this page is made up." cta={{ href: "/pledge", label: "Add your commitment" }} />
      <section className="section">
        <div className="container-x">
          {!stats.configured && (
            <p className="mb-8 rounded-xl bg-white p-4 text-sm ring-1 ring-forest/15" role="status">The community database is not connected yet, so no figures can be shown.</p>
          )}
          {empty ? (
            <div className="card mx-auto max-w-2xl text-center">
              <p className="text-xl font-semibold text-forest">Every movement begins with its first commitment. Be the first to make yours.</p>
              <Link href="/pledge" className="btn-primary mt-6">Make your pledge</Link>
            </div>
          ) : (
            <>
              <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="card"><dt className="text-sm font-semibold text-deep/70">Total pledges</dt><dd className="font-heading text-4xl font-extrabold text-forest">{stats.totalPledges}</dd></div>
                <div className="card"><dt className="text-sm font-semibold text-deep/70">Participants</dt><dd className="font-heading text-4xl font-extrabold text-forest">{stats.participants}</dd></div>
                <div className="card"><dt className="text-sm font-semibold text-deep/70">Most popular category</dt><dd className="text-xl font-extrabold text-forest">{stats.topCategory}</dd></div>
                <div className="card"><dt className="text-sm font-semibold text-deep/70">Most selected SDG</dt><dd className="text-xl font-extrabold text-forest">SDG {[...stats.sdgCounts].sort((a, b) => b.count - a.count)[0].sdg}</dd></div>
              </dl>

              <div className="mt-12 grid gap-8 lg:grid-cols-2">
                <div className="card"><h2 className="mb-4 text-xl font-bold text-forest">Commitments by category</h2><CategoryChart data={stats.categories} /></div>
                <div className="card"><h2 className="mb-4 text-xl font-bold text-forest">SDG participation</h2><SdgChart data={stats.sdgCounts} /></div>
              </div>

              <div className="mt-12">
                <SectionHeading title="Participation highlights" />
                <ul className="flex flex-wrap gap-3">
                  {stats.frequencies.map((f) => <li key={f.name} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest ring-1 ring-forest/20">{f.name}: {f.count}</li>)}
                </ul>
              </div>

              <div className="mt-12">
                <SectionHeading title="Recent public commitments" text="Only moderator-approved pledges are shown." />
                <ul className="grid gap-4 md:grid-cols-2">
                  {stats.recent.map((r, i) => (
                    <li key={i} className="card">
                      <p className="text-lg font-semibold text-forest">&ldquo;{r.commitment}&rdquo;</p>
                      <p className="mt-3 text-sm text-deep/75">{r.name} &middot; {r.category} &middot; {r.frequency}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
