import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sdgs, getSdg } from "@/data/sdgs";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

type Params = { params: Promise<{ number: string }> };

export function generateStaticParams() {
  return sdgs.map((s) => ({ number: String(s.n) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { number } = await params;
  const s = getSdg(Number(number));
  if (!s) return {};
  return pageMetadata({
    title: `SDG ${s.n}: ${s.title}`,
    description: `${s.short} Learn why SDG ${s.n} matters, how it connects to environmental stewardship and what students can do.`,
    path: `/sdgs/${s.n}`,
  });
}

export default async function SdgDetailPage({ params }: Params) {
  const { number } = await params;
  const s = getSdg(Number(number));
  if (!s) notFound();
  const prev = getSdg(s.n - 1);
  const next = getSdg(s.n + 1);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: `SDG ${s.n}: ${s.title}`, url: `${siteConfig.url}/sdgs/${s.n}`, description: s.short }} />
      <section style={{ backgroundColor: s.color }} className={s.dark ? "text-deep" : "text-white"}>
        <div className="container-x py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm font-semibold"><Link href="/sdgs" className="underline">The 17 SDGs</Link> / SDG {s.n}</nav>
          <p className="font-heading text-7xl font-extrabold leading-none">{s.n}</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{s.title}</h1>
          <p className="mt-4 max-w-2xl text-lg">{s.official}.</p>
          {s.env && <p className="mt-4 inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-forest">Environment-related goal</p>}
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div className="card"><h2 className="text-xl font-bold text-forest">Why it matters</h2><p className="mt-2">{s.why}</p></div>
          <div className="card"><h2 className="text-xl font-bold text-forest">Link to environmental stewardship</h2><p className="mt-2">{s.envLink}</p></div>
          <div className="card"><h2 className="text-xl font-bold text-forest">Real-world challenges</h2><ul className="mt-2 list-disc space-y-1 pl-5">{s.challenges.map((c) => <li key={c}>{c}</li>)}</ul></div>
          <div className="card"><h2 className="text-xl font-bold text-forest">What students can do</h2><ul className="mt-2 list-disc space-y-1 pl-5">{s.actions.map((a) => <li key={a}>{a}</li>)}</ul></div>
        </div>
        <div className="container-x mt-10">
          <h2 className="text-xl font-bold text-forest">Related goals</h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {s.related.map((n) => { const r = getSdg(n)!; return <li key={n}><Link href={`/sdgs/${n}`} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest ring-1 ring-forest/20 hover:bg-sage/40"><span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-extrabold ${r.dark ? "text-deep" : "text-white"}`} style={{ backgroundColor: r.color }}>{r.n}</span>{r.title}</Link></li>; })}
          </ul>
          <div className="mt-10 flex flex-wrap justify-between gap-3">
            {prev ? <Link href={`/sdgs/${prev.n}`} className="btn-outline">&larr; SDG {prev.n}</Link> : <span />}
            <Link href="/pledge" className="btn-primary">Pledge to support SDG {s.n}</Link>
            {next ? <Link href={`/sdgs/${next.n}`} className="btn-outline">SDG {next.n} &rarr;</Link> : <span />}
          </div>
          <p className="mt-8 text-xs text-deep/70">Official goal statement from <a className="underline" href="https://sdgs.un.org/goals" target="_blank" rel="noopener noreferrer">sdgs.un.org/goals</a>. Explanations are educational summaries.</p>
        </div>
      </section>
    </>
  );
}
