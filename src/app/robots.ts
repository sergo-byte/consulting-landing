import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/origin";

export const dynamic = "force-static";

/**
 * На превью-сборке (NOINDEX=1) закрываем сайт от поисковиков целиком:
 * ссылку можно спокойно отправлять, но в выдаче она не появится.
 */
const noindex = process.env.NOINDEX === "1";

export default function robots(): MetadataRoute.Robots {
  if (noindex) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}
