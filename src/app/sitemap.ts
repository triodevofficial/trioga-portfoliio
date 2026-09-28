import type { MetadataRoute } from "next";
import { products } from "@/content/work";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.9 },
    ...products.map((p) => ({ url: `${SITE_URL}/work/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
