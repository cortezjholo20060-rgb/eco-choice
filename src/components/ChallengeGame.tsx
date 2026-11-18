"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from "lucide-react";
import { getTier, scenarios } from "@/data/scenarios";
import { getSdg } from "@/data/sdgs";
import { SdgChip } from "./ui";

type Phase = "intro" | "playing" | "results" | "review";

function SdgBadges({ ids }: { ids: number[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5">
      {ids.map((n) => {
        const s = getSdg(n);
        return s ? <SdgChip key={n} n={n} color={s.color} dark={s.dark} /> : null;
      })}
    </span>
  );
}

export function ChallengeGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const total = scenarios.length;
  const score = answers.filter((a, i) => a === scenarios[i].correct).length;
  const tier = getTier(score);
  const q = scenarios[index];

  const start = () => { setAnswers([]); setIndex(0); setSelected(null); setPhase("playing"); };
  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setAnswers((prev) => { const n = [...prev]; n[index] = i; return n; });
  };
  const next = () => {
    if (index < total - 1) {
      setIndex(index + 1);
      setSelected(null);
      setTimeout(() => headingRef.current?.focus(), 0);
    } else {
      setPhase("results");
    }
  };

  if (phase === "intro") {
    return (
      <div className="card mx-auto max-w-3xl text-center">
        <p className="eyebrow">Interactive ethical decision game</p>
        <h2 className="h-display">What would you choose?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-deep/80">
          Everyday decisions have consequences. Test your environmental awareness and discover how responsible choices contribute to a sustainable future.
        </p>
        <p className="mt-3 text-sm text-deep/70">{total} scenarios. Each one explains the ethical principle and the SDGs behind the best choice.</p>
        <button type="button" onClick={start} className="btn-primary mt-8">Start Game</button>
      </div>
    );
  }

  if (phase === "playing") {
    const answered = selected !== null;
    const pct = ((index + (answered ? 1 : 0)) / total) * 100;
    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center justify-between text-sm font-semibold text-forest">
          <span>Question {index + 1} of {total}</span>
          <span>Score: {score}</span>
        </div>
        <div className="mb-6 h-3 overflow-hidden rounded-full bg-sage/40" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={index + (answered ? 1 : 0)} aria-label="Challenge progress">
          <div className="h-full rounded-full bg-forest transition-all" style={{ width: `${pct}%` }} />
        </div>

        <div className="card">
          <p className="eyebrow">{q.title}</p>
          <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold leading-snug text-forest outline-none sm:text-2xl">{q.situation}</h2>

          <ul className="mt-6 space-y-3">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct;
              const isPicked = i === selected;
              let style = "border-forest/25 bg-white hover:border-forest hover:bg-sage/20";
              if (answered && isCorrect) style = "border-nature bg-sage/40";
              else if (answered && isPicked) style = "border-red-600 bg-red-50";
              else if (answered) style = "border-forest/10 bg-white opacity-70";
              return (
                <li key={opt}>
                  <button
                    type="button"
                    disabled={answered}
                    onClick={() => choose(i)}
                    className={`flex min-h-[56px] w-full items-start gap-3 rounded-xl border-2 p-4 text-left text-base transition-colors ${style}`}
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-bold text-white" aria-hidden="true">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {answered && isCorrect && <CheckCircle2 className="shrink-0 text-nature" aria-label="Best choice" />}
                    {answered && isPicked && !isCorrect && <XCircle className="shrink-0 text-red-600" aria-label="Your answer, not the best choice" />}
                  </button>
                </li>
              );
            })}
          </ul>

          <div aria-live="polite">
            {answered && (
              <div className="mt-6 rounded-xl bg-cream p-5 ring-1 ring-forest/15">
                <p className="font-bold text-forest">{selected === q.correct ? "That is the most responsible choice." : "Not quite. The most responsible choice was " + String.fromCharCode(65 + q.correct) + "."}</p>
                <p className="mt-2">{q.explanation}</p>
                <p className="mt-3 text-sm"><strong className="text-forest">Ethical principle: </strong>{q.principle}</p>
                <p className="mt-2 text-sm"><strong className="text-forest">Related SDGs: </strong><SdgBadges ids={q.sdgs} /></p>
                <button type="button" onClick={next} className="btn-primary mt-5">
                  {index < total - 1 ? "Next question" : "See my results"} <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="card mx-auto max-w-3xl text-center">
        <p className="eyebrow">Your result</p>
        <p className="font-heading text-6xl font-extrabold text-forest">{score}<span className="text-3xl text-deep/50"> / {total}</span></p>
        <h2 className="mt-3 text-2xl font-extrabold text-forest">{tier.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-deep/85">{tier.message}</p>
        <p className="mx-auto mt-4 max-w-xl rounded-xl bg-cream p-4 text-sm text-deep/80">
          This score reflects your knowledge of the scenarios presented here. It is not a measure of your character or moral worth.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={start} className="btn-primary"><RotateCcw size={16} aria-hidden="true" /> Play again</button>
          <button type="button" onClick={() => setPhase("review")} className="btn-outline">Review answers</button>
          <Link href="/pledge" className="btn-outline">Make a pledge</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-extrabold text-forest">Review your answers</h2>
        <div className="flex gap-3">
          <button type="button" onClick={() => setPhase("results")} className="btn-outline">Back to results</button>
          <button type="button" onClick={start} className="btn-primary"><RotateCcw size={16} aria-hidden="true" /> Play again</button>
        </div>
      </div>
      <ol className="space-y-4">
        {scenarios.map((s, i) => {
          const a = answers[i];
          const ok = a === s.correct;
          return (
            <li key={s.id} className="card">
              <p className="eyebrow">{i + 1}. {s.title}</p>
              <p className="font-semibold text-forest">{s.situation}</p>
              <p className="mt-3 text-sm"><strong>Your answer: </strong>{a != null ? s.options[a] : "No answer"} {ok ? "(best choice)" : "(not the best choice)"}</p>
              {!ok && <p className="mt-1 text-sm"><strong>Best choice: </strong>{s.options[s.correct]}</p>}
              <p className="mt-2 text-sm">{s.explanation}</p>
              <p className="mt-2 text-sm"><strong className="text-forest">Principle: </strong>{s.principle} <span className="ml-2"><SdgBadges ids={s.sdgs} /></span></p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
