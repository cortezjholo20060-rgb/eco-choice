import Link from "next/link";
import { Leaf } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-deep text-cream">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-heading text-xl font-extrabold">
            <Leaf size={20} aria-hidden="true" /> ECO-CHOICE
          </p>
          <p className="mt-3 text-sm text-cream/80">{siteConfig.tagline}</p>
          <p className="mt-1 text-sm text-cream/80">{siteConfig.altMessage}</p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-sage">Explore</p>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}><Link className="hover:underline" href={l.href}>{l.label}</Link></li>
            ))}
            <li><Link className="hover:underline" href="/pledge">Environmental Pledge</Link></li>
          </ul>
        </nav>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-sage">Connect</p>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:underline" href="/contact">Contact and Feedback</Link></li>
            <li><Link className="hover:underline" href="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:underline" href="/awareness#references">References</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-cream/70">
        <p>An Ethics advocacy project on Environmental Stewardship and the Sustainable Development Goals.</p>
        <p className="mt-1">The SDG names and colors belong to the United Nations. This site is not endorsed by the UN.</p>
      </div>
    </footer>
  );
}
