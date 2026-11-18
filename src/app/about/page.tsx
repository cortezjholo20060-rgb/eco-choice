import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "About the ECO-CHOICE Project",
  description: "ECO-CHOICE is an Ethics advocacy project on environmental stewardship and the 17 SDGs. Learn about its philosophy, ethical principles and objectives.",
  path: "/about",
});

const principles = [
  { t: "Responsibility", d: "We are responsible for the foreseeable effects of our choices on nature and on other people." },
  { t: "Accountability", d: "Being answerable for our actions, and willing to correct them, builds trust and real change." },
  { t: "Respect for Nature", d: "Living things and ecosystems have worth beyond their usefulness to us." },
  { t: "Common Good", d: "Shared resources like air, water and public spaces should benefit everyone." },
  { t: "Environmental Justice", d: "Environmental benefits and burdens should be shared fairly, and everyone's voice should count." },
  { t: "Intergenerational Responsibility", d: "We owe future generations a world that can still meet their needs." },
  { t: "Sustainable Development", d: "Progress should meet present needs without undermining the ability of the future to meet its own." },
];

const objectives = [
  "Promote awareness of environmental challenges.",
  "Encourage responsible environmental behavior.",
  "Explain the importance of the 17 SDGs.",
  "Develop ethical decision-making.",
  "Encourage sustainable community participation.",
];

export default function AboutPage() {
  const p = siteConfig.project;
  const hasProject = p.title || p.course || p.institution || p.members.length > 0;
  return (
    <>
      <PageHero eyebrow="About the project" title="An Ethics project about everyday environmental choices." text="ECO-CHOICE turns the ideas of environmental stewardship and sustainable development into something people can explore, test and commit to." />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h-display">Project background</h2>
            <p className="mt-4 text-lg">ECO-CHOICE was developed as an Ethics advocacy project focusing on Environmental Stewardship and the 17 Sustainable Development Goals.</p>
          </div>
          <div>
            <h2 className="h-display">Project philosophy</h2>
            <p className="mt-4 text-lg">Environmental protection requires responsible choices, moral awareness and collective participation.</p>
          </div>
        </div>
        {hasProject && (
          <div className="container-x mt-10">
            <div className="card">
              <h2 className="text-xl font-bold text-forest">Academic project details</h2>
              <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                {p.title && <div><dt className="font-semibold text-deep/70">Project title</dt><dd>{p.title}</dd></div>}
                {p.course && <div><dt className="font-semibold text-deep/70">Course</dt><dd>{p.course}</dd></div>}
                {p.institution && <div><dt className="font-semibold text-deep/70">Institution</dt><dd>{p.institution}</dd></div>}
                {p.members.length > 0 && <div><dt className="font-semibold text-deep/70">Project team</dt><dd>{p.members.join(", ")}</dd></div>}
              </dl>
            </div>
          </div>
        )}
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Ethical foundation" title="Core ethical principles" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((x) => <li key={x.t} className="rounded-2xl bg-cream p-6 ring-1 ring-forest/10"><h3 className="text-lg font-bold text-forest">{x.t}</h3><p className="mt-2 text-sm">{x.d}</p></li>)}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h-display">Project objectives</h2>
            <ol className="mt-6 space-y-3">
              {objectives.map((o, i) => <li key={o} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest font-bold text-white">{i + 1}</span><span className="pt-1">{o}</span></li>)}
            </ol>
          </div>
          <div>
            <h2 className="h-display">Project outcomes</h2>
            <p className="mt-4 text-lg">The physical environmental exhibition invites people to experience the issues in person. This website extends it online: visitors can learn the issues, explore the SDGs, play the Eco-Choice Challenge and record a pledge. Together, they move people from awareness to action.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link href="/challenge" className="btn-primary">Take the challenge</Link><Link href="/contact" className="btn-outline">Send feedback</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
