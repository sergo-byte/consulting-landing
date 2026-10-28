export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

/** Двуязычная строка. Весь контент сайта хранится в таком виде. */
export type L = Record<Locale, string>;

/** Двуязычный список строк. */
export type LList = Record<Locale, string[]>;

/** Достаёт нужный язык из двуязычного значения. */
export function t(value: L, locale: Locale): string {
  return value[locale];
}

export function tList(value: LList, locale: Locale): string[] {
  return value[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Строит ссылку внутри текущего языка: href("/team", "en") -> "/en/team" */
export function href(path: string, locale: Locale): string {
  // Якорь на текущей странице: язык подставлять не нужно.
  if (path.startsWith("#")) return path;
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

export const localeLabel: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
};

export const localeHtmlLang: Record<Locale, string> = {
  ru: "ru-RU",
  en: "en-US",
};
