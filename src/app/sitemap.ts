import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { sdgs } from "@/data/sdgs";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/awareness", "/sdgs", "/challenge", "/pledge", "/impact", "/about", "/contact", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${siteConfig.url}${p}`, changeFrequency: (p === "/impact" || p === "" ? "weekly" : "monthly") as "weekly" | "monthly", priority: p === "" ? 1 : 0.8 })),
    ...sdgs.map((s) => ({ url: `${siteConfig.url}/sdgs/${s.n}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
