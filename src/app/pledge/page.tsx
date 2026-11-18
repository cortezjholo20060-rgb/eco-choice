import { PageHero } from "@/components/ui";
import { PledgeForm } from "@/components/PledgeForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Make Your Environmental Pledge",
  description: "Turn awareness into action. Make a personal environmental commitment and choose the Sustainable Development Goals it supports. No account required.",
  path: "/pledge",
});

export default function PledgePage() {
  return (
    <>
      <PageHero eyebrow="Environmental pledge" title="Make your choice. Make your impact." text="Change begins when awareness becomes action. Make a personal commitment to practice environmental responsibility." />
      <section className="section">
        <div className="container-x max-w-3xl">
          <PledgeForm />
        </div>
      </section>
    </>
  );
}
