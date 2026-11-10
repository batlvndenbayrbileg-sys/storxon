import type { MetadataRoute } from "next";
import { LESSONS } from "@/lib/lessons/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://storxon.online";
  const now = new Date();
  const lessons: MetadataRoute.Sitemap = LESSONS.map((l) => ({
    url: `${base}/playground/${l.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/playground`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/playground/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...lessons,
  ];
}
