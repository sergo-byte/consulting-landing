import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { siteOrigin } from "@/lib/origin";

export const dynamic = "force-static";

/** Одна страница на язык: сайт целиком лежит на лендинге. */
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteOrigin}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteOrigin}/${l}`]),
      ),
    },
  }));
}
