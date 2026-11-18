import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How ECO-CHOICE handles pledges, feedback and visitor data. No accounts, no sensitive personal information.",
  path: "/privacy",
});

const sections: { t: string; p: string[] }[] = [
  { t: "What we collect", p: [
    "Pledges: the optional display name, action category, commitment text, frequency and SDGs you choose.",
    "Feedback: the optional name and email you enter, the category and your message.",
    "Abuse protection: a salted one-way hash of your network address and a hash of your text. We use these only to limit spam and block duplicate submissions. Your raw network address is not stored.",
  ] },
  { t: "What we do not collect", p: [
    "We do not require accounts and do not ask for home addresses, phone numbers, school IDs or exact locations. Please do not type this kind of information into free-text fields.",
  ] },
  { t: "How pledges are shown", p: [
    "Pledges are reviewed before they appear publicly. Only the display name (or Anonymous), commitment, category and frequency are shown. Rejected or pending pledges are never shown.",
  ] },
  { t: "How feedback is used", p: [
    "Feedback is private. It is visible only to authorized administrators and is used to improve the site.",
  ] },
  { t: "Where data is stored", p: [
    "Data is stored in a database provided by Supabase. Access is restricted by database security rules and server-side checks.",
  ] },
  { t: "Cookies", p: [
    "The public site does not use advertising or tracking cookies. Administrators receive a sign-in cookie when they log in.",
  ] },
  { t: "Your choices", p: [
    "To ask for your pledge or feedback to be removed, use the Contact page and describe the entry. Please avoid including private details in your request.",
  ] },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy Policy" text="We collect as little as possible and explain exactly what we keep." />
      <section className="section">
        <div className="container-x max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.t}>
              <h2 className="text-2xl font-bold text-forest">{s.t}</h2>
              {s.p.map((x) => <p key={x} className="mt-2">{x}</p>)}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
