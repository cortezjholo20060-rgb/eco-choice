import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PageHero({ eyebrow, title, text, cta }: { eyebrow: string; title: string; text: string; cta?: { href: string; label: string } }) {
  return (
    <section className="bg-gradient-to-br from-deep via-forest to-nature text-white">
      <div className="container-x py-16 sm:py-24">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-sage">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-white/90">{text}</p>
        {cta && (
          <Link href={cta.href} className="btn-light mt-8">
            {cta.label} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text, center = false }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="h-display">{title}</h2>
      {text && <p className="mt-4 text-lg text-deep/80">{text}</p>}
    </div>
  );
}

export function SdgChip({ n, color, dark }: { n: number; color: string; dark?: boolean }) {
  return (
    <span
      className={`inline-flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-xs font-extrabold ${dark ? "text-deep" : "text-white"}`}
      style={{ backgroundColor: color }}
      title={`SDG ${n}`}
    >
      {n}
    </span>
  );
}
