import { PageHero } from "@/components/ui";
import { ChallengeGame } from "@/components/ChallengeGame";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Eco-Choice Challenge: What Would You Choose?",
  description: "Play an interactive environmental ethics game with 10 everyday scenarios. Learn the ethical principle and the SDGs behind each responsible choice.",
  path: "/challenge",
});

export default function ChallengePage() {
  return (
    <>
      <PageHero eyebrow="Eco-Choice Challenge" title="What would you choose?" text="Ten everyday situations. One responsible choice each. Learn why after every answer." />
      <section className="section">
        <div className="container-x">
          <ChallengeGame />
        </div>
      </section>
    </>
  );
}
