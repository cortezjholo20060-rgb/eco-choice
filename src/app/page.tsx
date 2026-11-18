import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroArt } from "@/components/HeroArt";
import { SectionHeading, SdgChip } from "@/components/ui";
import { ScenarioPreview } from "@/components/ScenarioPreview";
import { JsonLd } from "@/components/JsonLd";
import { issues, smallChoices } from "@/data/issues";
import { sdgs, getSdg } from "@/data/sdgs";
import { getCommunityStats } from "@/lib/stats";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export const metadata = {
  title: { absolute: siteConfig.defaultTitle },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const stats = await getCommunityStats();
  const homeIssues = issues.slice(0, 6);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: siteConfig.defaultTitle, url: siteConfig.url, description: siteConfig.description }} />

      {/* A. Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-deep via-forest to-nature text-white">
        <div className="container-x grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-sage">Environmental Stewardship and the 17 SDGs</p>
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">EVERY ACTION LEAVES A FOOTPRINT.</h1>
            <p className="mt-6 max-w-xl text-lg text-white/90">
              Every choice we make shapes the world we live in. Discover how everyday actions can protect our planet, strengthen communities, and create a more sustainable future.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/awareness" className="btn-light">Explore the Experience <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link href="/challenge" className="btn-outline-light">Take the Eco-Choice Challenge</Link>
            </div>
          </div>
          <HeroArt className="mx-auto w-full max-w-md lg:max-w-none" />
        </div>
      </section>

      {/* B. Environmental reality */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Environmental reality" title="Our planet needs more than awareness." text="Six major challenges connect everyday choices to people, places and future generations." />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeIssues.map((i) => {
              const Icon = i.icon;
              return (
                <li key={i.id} className="card flex flex-col overflow-hidden p-0">
                  <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${i.tile}`} aria-hidden="true">
                    <Icon size={56} className="text-white" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-forest">{i.title}</h3>
                    <p className="mt-2 text-sm">{i.summary}</p>
                    <p className="mt-3 text-sm"><strong className="text-forest">Consequences: </strong>{i.effects[0]}; {i.effects[1].toLowerCase()}.</p>
                    <p className="mt-2 text-sm"><strong className="text-forest">Responsible action: </strong>{i.action}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-xs font-semibold text-deep/70">Related SDGs:</span>
                      {i.sdgs.map((n) => { const s = getSdg(n)!; return <SdgChip key={n} n={n} color={s.color} dark={s.dark} />; })}
                    </div>
                    <Link href={`/awareness#${i.id}`} className="mt-4 text-sm font-bold text-forest underline">Learn more about {i.title.toLowerCase()}</Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* C. Small choices */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Small choices, bigger impact" title="Ordinary habits add up." text="You do not need special equipment to start. These everyday actions fit into student and community life." />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {smallChoices.map((c) => (
              <li key={c.title} className="rounded-2xl bg-cream p-6 ring-1 ring-forest/10">
                <h3 className="text-lg font-bold text-forest">{c.title}</h3>
                <p className="mt-2 text-sm">{c.text}</p>
                <div className="mt-3 flex gap-1.5">{c.sdgs.map((n) => { const s = getSdg(n)!; return <SdgChip key={n} n={n} color={s.color} dark={s.dark} />; })}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* D. SDG intro */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Sustainable Development Goals" title="17 goals. One shared future." text="The United Nations' 17 SDGs describe how to build a fairer, healthier and more sustainable world." />
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-9">
            {sdgs.map((s) => (
              <li key={s.n}>
                <Link
                  href={`/sdgs/${s.n}`}
                  className={`flex aspect-square flex-col items-center justify-center rounded-xl p-2 text-center transition hover:scale-105 ${s.dark ? "text-deep" : "text-white"}`}
                  style={{ backgroundColor: s.color }}
                  aria-label={`SDG ${s.n}: ${s.title}`}
                >
                  <span className="font-heading text-2xl font-extrabold">{s.n}</span>
                  <span className="mt-1 text-[10px] font-semibold leading-tight">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center"><Link href="/sdgs" className="btn-primary">Explore All 17 Goals</Link></div>
        </div>
      </section>

      {/* E. Challenge preview */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading center eyebrow="Interactive challenge" title="What would you choose?" text="Try one real question from the Eco-Choice Challenge." />
          <ScenarioPreview />
        </div>
      </section>

      {/* F. Community preview */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Community impact" title="Real commitments, real numbers." text="These figures come from approved pledges stored in our database. Nothing here is invented." />
          {stats.totalPledges === 0 ? (
            <div className="card text-center">
              <p className="text-lg font-semibold text-forest">Every movement begins with its first commitment. Be the first to make yours.</p>
              <Link href="/pledge" className="btn-primary mt-5">Make your pledge</Link>
            </div>
          ) : (
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="card"><dt className="text-sm font-semibold text-deep/70">Total pledges</dt><dd className="font-heading text-4xl font-extrabold text-forest">{stats.totalPledges}</dd></div>
              <div className="card"><dt className="text-sm font-semibold text-deep/70">Participants</dt><dd className="font-heading text-4xl font-extrabold text-forest">{stats.participants}</dd></div>
              <div className="card"><dt className="text-sm font-semibold text-deep/70">Most popular category</dt><dd className="text-xl font-extrabold text-forest">{stats.topCategory}</dd></div>
              <div className="card">
                <dt className="text-sm font-semibold text-deep/70">Most selected commitments</dt>
                <dd><ul className="mt-1 space-y-1 text-sm font-semibold text-forest">{stats.topCommitments.map((c) => <li key={c.name}>{c.name} ({c.count})</li>)}</ul></dd>
              </div>
            </dl>
          )}
          <div className="mt-6"><Link href="/impact" className="font-bold text-forest underline">See the full dashboard</Link></div>
        </div>
      </section>

      {/* G. Final CTA */}
      <section className="bg-forest py-20 text-center text-white">
        <div className="container-x">
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold sm:text-5xl">THE FUTURE STARTS WITH WHAT YOU CHOOSE TODAY.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">Protecting the planet begins with responsibility. Make your choice count.</p>
          <Link href="/pledge" className="btn-light mt-8">Make Your Environmental Pledge</Link>
        </div>
      </section>
    </>
  );
}
