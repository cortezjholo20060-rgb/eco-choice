import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/ui";
import { SdgExplorer } from "@/components/SdgExplorer";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "The 17 Sustainable Development Goals Explained",
  description: "Explore all 17 UN Sustainable Development Goals. Search by number or keyword and learn how each goal connects to environmental responsibility and what students can do.",
  path: "/sdgs",
});

export default function SdgsPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "The 17 Sustainable Development Goals", url: `${siteConfig.url}/sdgs`, description: "Interactive guide to the 17 UN Sustainable Development Goals." }} />
      <PageHero eyebrow="Sustainable Development Goals" title="The 17 SDGs, explained for everyday action." text="Adopted by all UN member states, the SDGs are a shared plan for people and planet. Select a goal to learn how it connects to environmental stewardship." />
      <section className="section">
        <div className="container-x">
          <p className="mb-8 max-w-3xl rounded-2xl bg-sage/30 p-5 text-sm">
            <strong className="text-forest">Environment-related goals: </strong>
            SDGs 6, 7, 11, 12, 13, 14 and 15 are most directly about the environment. The other ten matter too, because poverty, health, education, fairness, institutions and partnerships all shape how well people can care for nature.
          </p>
          <SdgExplorer />
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Source" title="About these goals" text="Goal names, numbers and colors follow the United Nations. Explanations are written for students and are educational summaries." />
          <a href="https://sdgs.un.org/goals" target="_blank" rel="noopener noreferrer" className="btn-outline">Official UN SDG website</a>
          <Link href="/pledge" className="btn-primary ml-3">Pledge to support a goal</Link>
        </div>
      </section>
    </>
  );
}
