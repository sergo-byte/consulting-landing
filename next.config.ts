import type { NextConfig } from "next";

/**
 * Одна кодовая база, две цели сборки.
 *
 * npm run dev / npm run build  — обычный сервер: работает форма через
 *   /api/contact и определение языка в proxy.ts.
 *
 * npm run build:static — статический экспорт в папку out/ для GitHub Pages.
 *   Сервера там нет, поэтому форма сразу открывает почтовый клиент,
 *   а корень отдаёт public/index.html с выбором языка.
 */
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStatic
    ? {
        output: "export" as const,
        images: { unoptimized: true },
        trailingSlash: true,
        basePath: basePath || undefined,
      }
    : {}),
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: isStatic ? "1" : "",
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: process.env.SITE_URL ?? "",
  },
};

export default nextConfig;
