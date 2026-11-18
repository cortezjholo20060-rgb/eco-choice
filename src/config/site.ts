export const siteConfig = {
  name: "ECO-CHOICE",
  tagline: "Every Action Leaves a Footprint.",
  altMessage: "Your Choices. Your Planet. Your Future.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  defaultTitle: "ECO-CHOICE | Environmental Stewardship and Sustainable Development",
  description:
    "ECO-CHOICE is an interactive environmental awareness campaign about environmental stewardship, responsible choices and the 17 Sustainable Development Goals.",
  project: {
    title: process.env.NEXT_PUBLIC_PROJECT_TITLE?.trim() || "",
    course: process.env.NEXT_PUBLIC_PROJECT_COURSE?.trim() || "",
    institution: process.env.NEXT_PUBLIC_PROJECT_INSTITUTION?.trim() || "",
    members: (process.env.NEXT_PUBLIC_PROJECT_MEMBERS ?? "")
      .split(";")
      .map((m) => m.trim())
      .filter(Boolean),
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/awareness", label: "Environmental Issues" },
  { href: "/sdgs", label: "The 17 SDGs" },
  { href: "/challenge", label: "Challenges" },
  { href: "/impact", label: "Community Impact" },
  { href: "/about", label: "About" },
];
