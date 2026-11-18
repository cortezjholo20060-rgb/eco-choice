"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { sdgs, getSdg, type Sdg } from "@/data/sdgs";

function Tile({ s, size = "h-12 w-12 text-xl" }: { s: Sdg; size?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-xl font-heading font-extrabold ${size} ${s.dark ? "text-deep" : "text-white"}`}
      style={{ backgroundColor: s.color }}
    >
      {s.n}
    </span>
  );
}

export function SdgExplorer() {
  const [query, setQuery] = useState("");
  const [envOnly, setEnvOnly] = useState(false);
  const [active, setActive] = useState<Sdg | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().replace(/^sdg\s*/, "").trim();
    return sdgs.filter((s) => {
      if (envOnly && !s.env) return false;
      if (!q) return true;
      if (/^\d+$/.test(q)) return String(s.n) === q;
      const hay = `${s.title} ${s.short} ${s.envLink} ${s.why} ${s.action}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, envOnly]);

  useEffect(() => {
    const d = dialogRef.current;
    if (active && d && !d.open) d.showModal();
  }, [active]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="sdg-search" className="label">Search by number, title or keyword</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-forest/60" size={18} aria-hidden="true" />
            <input
              id="sdg-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 13, water, energy, forests"
              className="field pl-11"
            />
          </div>
        </div>
        <fieldset className="flex gap-2" aria-label="Filter goals">
          <button type="button" onClick={() => setEnvOnly(false)} aria-pressed={!envOnly} className={envOnly ? "btn-outline" : "btn-primary"}>All 17 goals</button>
          <button type="button" onClick={() => setEnvOnly(true)} aria-pressed={envOnly} className={envOnly ? "btn-primary" : "btn-outline"}>Environment-related</button>
        </fieldset>
      </div>

      <p className="mb-4 text-sm text-deep/70" role="status" aria-live="polite">
        Showing {filtered.length} of 17 goals
      </p>

      {filtered.length === 0 ? (
        <div className="card text-center">
          <p className="font-semibold text-forest">No goals match your search.</p>
          <button type="button" className="btn-outline mt-4" onClick={() => { setQuery(""); setEnvOnly(false); }}>Clear search</button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => setActive(s)}
                className="card flex h-full w-full flex-col gap-3 text-left transition hover:-translate-y-1 hover:shadow-md"
                style={{ borderTop: `6px solid ${s.color}` }}
                aria-label={`SDG ${s.n}: ${s.title}. Open details`}
              >
                <span className="flex items-center gap-3">
                  <Tile s={s} />
                  <span>
                    <span className="block font-heading text-lg font-bold leading-snug text-forest">{s.title}</span>
                    {s.env && <span className="mt-1 inline-block rounded-full bg-sage/50 px-2 py-0.5 text-xs font-bold text-forest">Environment-related</span>}
                  </span>
                </span>
                <span className="text-sm text-deep/85">{s.short}</span>
                <span className="text-sm"><strong className="text-forest">Environmental connection: </strong>{s.envLink}</span>
                <span className="text-sm"><strong className="text-forest">Try this: </strong>{s.action}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {active && (
        <dialog
          ref={dialogRef}
          aria-labelledby="sdg-dialog-title"
          onClose={() => setActive(null)}
          onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
          className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl bg-cream p-0"
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Tile s={active} size="h-16 w-16 text-3xl" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-nature">Sustainable Development Goal {active.n}</p>
                  <h2 id="sdg-dialog-title" className="text-2xl font-extrabold text-forest">{active.title}</h2>
                </div>
              </div>
              <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close details" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-sage/40">
                <X />
              </button>
            </div>

            <div className="mt-6 space-y-5 text-[15px] leading-relaxed">
              <section><h3 className="font-bold text-forest">Goal description</h3><p>{active.official}.</p></section>
              <section><h3 className="font-bold text-forest">Why it matters</h3><p>{active.why}</p></section>
              <section><h3 className="font-bold text-forest">Link to environmental stewardship</h3><p>{active.envLink}</p></section>
              <section>
                <h3 className="font-bold text-forest">Real-world challenges</h3>
                <ul className="list-disc space-y-1 pl-5">{active.challenges.map((c) => <li key={c}>{c}</li>)}</ul>
              </section>
              <section>
                <h3 className="font-bold text-forest">What students can do</h3>
                <ul className="list-disc space-y-1 pl-5">{active.actions.map((a) => <li key={a}>{a}</li>)}</ul>
              </section>
              <section>
                <h3 className="font-bold text-forest">Related goals</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {active.related.map((n) => {
                    const r = getSdg(n);
                    if (!r) return null;
                    return (
                      <li key={n}>
                        <button type="button" onClick={() => setActive(r)} className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-forest ring-1 ring-forest/20 hover:bg-sage/40">
                          <Tile s={r} size="h-6 w-6 text-xs" /> {r.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/sdgs/${active.n}`} className="btn-primary">Open full page <ArrowRight size={16} aria-hidden="true" /></Link>
              <Link href="/pledge" className="btn-outline">Pledge to support this goal</Link>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
