"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { scenarios } from "@/data/scenarios";

const s = scenarios[0];

/** One live question from the real challenge, shown on the homepage. */
export function ScenarioPreview() {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="card mx-auto max-w-3xl">
      <p className="eyebrow">{s.title}</p>
      <p className="text-xl font-bold text-forest">{s.situation}</p>
      <ul className="mt-5 space-y-3">
        {s.options.map((o, i) => {
          const done = picked !== null;
          const good = i === s.correct;
          const cls = done && good ? "border-nature bg-sage/40" : done && i === picked ? "border-red-600 bg-red-50" : "border-forest/25 bg-white hover:border-forest";
          return (
            <li key={o}>
              <button type="button" disabled={done} onClick={() => setPicked(i)} className={`flex min-h-[52px] w-full items-start gap-3 rounded-xl border-2 p-4 text-left ${cls}`}>
                <span className="flex-1">{o}</span>
                {done && good && <CheckCircle2 className="shrink-0 text-nature" aria-label="Best choice" />}
                {done && i === picked && !good && <XCircle className="shrink-0 text-red-600" aria-label="Not the best choice" />}
              </button>
            </li>
          );
        })}
      </ul>
      <div aria-live="polite">
        {picked !== null && <p className="mt-4 rounded-xl bg-cream p-4 text-sm">{s.explanation}</p>}
      </div>
      <Link href="/challenge" className="btn-primary mt-6">Start the full challenge</Link>
    </div>
  );
}
