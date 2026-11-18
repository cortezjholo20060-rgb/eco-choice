import Link from "next/link";
import { PageHero, SectionHeading, SdgChip } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { issues, whatCanWeDo } from "@/data/issues";
import { getSdg } from "@/data/sdgs";
import { references } from "@/data/references";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "Environmental Awareness and Stewardship",
  description: "Learn what environmental stewardship means, why environmental responsibility matters, and how plastic pollution, climate change, deforestation and other challenges affect people and nature.",
  path: "/awareness",
});

const why = [
  { t: "Responsibility toward nature", d: "Ecosystems have value beyond what they provide to us. Caring for them is part of acting ethically." },
  { t: "Responsibility toward other people", d: "Pollution and resource use affect neighbors and distant communities, often those with the least power to respond." },
  { t: "Responsibility toward future generations", d: "The choices we make now determine the resources and conditions that young people and later generations inherit." },
  { t: "Conservation of natural resources", d: "Water, soil, forests and energy sources can be depleted or damaged. Using them wisely keeps them available." },
  { t: "Protection of biodiversity", d: "A variety of species keeps ecosystems balanced and resilient." },
  { t: "Sustainable community development", d: "Healthy communities depend on clean surroundings, safe water and responsible use of resources." },
];

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-bold text-forest">{title}</h4>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}

export default function AwarenessPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: "Environmental Awareness and Stewardship", url: `${siteConfig.url}/awareness`, description: "Environmental stewardship, why it matters, and major environmental challenges." }} />
      <PageHero eyebrow="Environmental awareness" title="Environmental stewardship: caring for what we share." text="Understand the issues, the ethics behind them and the practical steps that students and citizens can take." cta={{ href: "/challenge", label: "Test your choices" }} />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Definition</p>
            <h2 className="h-display">What is environmental stewardship?</h2>
            <p className="mt-4 text-lg">Environmental stewardship is the responsible care and protection of the natural environment and its resources. It means using what nature provides thoughtfully and passing on a healthy planet.</p>
            <p className="mt-4">It is an ethical idea, not only a practical one. Our decisions affect other people, living things and communities, so we are accountable for the way we use shared resources.</p>
          </div>
          <div className="card bg-sage/30">
            <p className="font-heading text-xl font-bold text-forest">Why it is ethical, not just personal preference</p>
            <p className="mt-3">When one person pollutes a river or wastes water, the cost is carried by others. Stewardship asks us to consider those effects before we act.</p>
            <p className="mt-3 text-xs text-deep/70">General educational explanation. Sources are listed in the References section below.</p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Why it matters" title="Why environmental responsibility matters" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w) => (
              <li key={w.t} className="rounded-2xl bg-cream p-6 ring-1 ring-forest/10"><h3 className="text-lg font-bold text-forest">{w.t}</h3><p className="mt-2 text-sm">{w.d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Major challenges" title="Eight environmental challenges" text="Each section explains what it means, why it happens, who is affected and what we can do." />
          <nav aria-label="Jump to an issue" className="mb-10 flex flex-wrap gap-2">
            {issues.map((i) => <a key={i.id} href={`#${i.id}`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest ring-1 ring-forest/20 hover:bg-sage/40">{i.title}</a>)}
          </nav>
          <div className="space-y-8">
            {issues.map((i, idx) => {
              const Icon = i.icon;
              return (
                <article key={i.id} id={i.id} className="card scroll-mt-24 overflow-hidden p-0">
                  <div className={`flex items-center gap-4 bg-gradient-to-r ${i.tile} p-6 text-white`}>
                    <Icon size={40} aria-hidden="true" />
                    <div><p className="text-xs font-bold uppercase tracking-widest text-white/80">Challenge {idx + 1}</p><h3 className="text-2xl font-extrabold">{i.title}</h3></div>
                  </div>
                  <div className="space-y-5 p-6">
                    <div><h4 className="font-bold text-forest">What it means</h4><p className="text-sm">{i.meaning}</p></div>
                    <div className="grid gap-5 md:grid-cols-2">
                      <List title="Main causes" items={i.causes} />
                      <List title="Environmental effects" items={i.effects} />
                      <List title="Social and community effects" items={i.social} />
                      <List title="Practical solutions" items={i.solutions} />
                    </div>
                    <div><h4 className="font-bold text-forest">Ethical responsibility</h4><p className="text-sm">{i.ethics}</p></div>
                    <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-semibold">Related SDGs:</span>{i.sdgs.map((n) => { const s = getSdg(n)!; return <Link key={n} href={`/sdgs/${n}`}><SdgChip n={n} color={s.color} dark={s.dark} /></Link>; })}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Take action" title="What can we do?" text="Realistic habits that students and ordinary citizens can practice. These are recommendations, not guarantees of a specific outcome." />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whatCanWeDo.map((w, i) => (
              <li key={w.title} className="rounded-2xl bg-cream p-6 ring-1 ring-forest/10"><p className="font-heading text-3xl font-extrabold text-nature">{i + 1}</p><h3 className="mt-1 font-bold text-forest">{w.title}</h3><p className="mt-1 text-sm">{w.text}</p></li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/pledge" className="btn-primary">Make your pledge</Link><Link href="/sdgs" className="btn-outline">Explore the SDGs</Link></div>
        </div>
      </section>

      <section id="references" className="section scroll-mt-20">
        <div className="container-x">
          <SectionHeading eyebrow="Sources" title="References" text="Facts about the SDGs, climate and health come from these organizations. Recommendations and ethical explanations on this site are educational and written by the project team." />
          <ul className="grid gap-4 md:grid-cols-2">
            {references.map((r) => (
              <li key={r.url} className="card"><a href={r.url} target="_blank" rel="noopener noreferrer" className="font-bold text-forest underline">{r.name}</a><p className="mt-1 text-sm">{r.note}</p></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
