import { PageHero } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact and Feedback",
  description: "Share feedback, environmental suggestions or report a technical issue with the ECO-CHOICE website. Name and email are optional.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact and feedback" title="We would like to hear from you." text="Share a suggestion, report a problem or ask a question. Your message is private and never shown publicly." />
      <section className="section">
        <div className="container-x max-w-3xl"><ContactForm /></div>
      </section>
    </>
  );
}
