import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { insights } from "@/content/insights";
import { locales } from "@/lib/i18n";
import { siteOrigin } from "@/lib/origin";

export const dynamic = "force-static";

const staticPaths = [
  "",
  "/expertise",
  "/engagements",
  "/team",
  "/insights",
  "/careers",
  "/contact",
  "/diagnostic",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const alternates = (path: string) => ({
    languages: Object.fromEntries(
      locales.map((l) => [l, `${siteOrigin}/${l}${path}`]),
    ),
  });

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteOrigin}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: alternates(path),
      });
    }

    for (const service of services) {
      const path = `/expertise/${service.slug}`;
      entries.push({
        url: `${siteOrigin}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: alternates(path),
      });
    }

    for (const insight of insights) {
      const path = `/insights/${insight.slug}`;
      entries.push({
        url: `${siteOrigin}/${locale}${path}`,
        lastModified: new Date(insight.date),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: alternates(path),
      });
    }
  }

  return entries;
}
