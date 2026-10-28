/**
 * Базовый адрес сайта: отсюда строятся canonical, карта сайта и robots.txt.
 * Задаётся переменной SITE_URL при сборке; без неё берётся локальный адрес.
 */
export const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");
