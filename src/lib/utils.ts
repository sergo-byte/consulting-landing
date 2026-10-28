import { clsx, type ClassValue } from "clsx";
import type { Locale } from "./i18n";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** "01", "02", ... для нумерации секций и карточек. */
export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Русское склонение по числу: 1 этап, 2 этапа, 5 этапов.
 * forms = [один, два, пять]
 */
function pluralRu(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
}

const WORDS = {
  step: {
    ru: ["этап", "этапа", "этапов"] as [string, string, string],
    en: ["step", "steps"] as [string, string],
  },
  project: {
    ru: ["проект", "проекта", "проектов"] as [string, string, string],
    en: ["engagement", "engagements"] as [string, string],
  },
  service: {
    ru: ["направление", "направления", "направлений"] as [string, string, string],
    en: ["service", "services"] as [string, string],
  },
  entry: {
    ru: ["позиция", "позиции", "позиций"] as [string, string, string],
    en: ["entry", "entries"] as [string, string],
  },
} as const;

/** plural(7, "step", "ru") -> "этапов" */
export function plural(
  n: number,
  word: keyof typeof WORDS,
  locale: Locale,
): string {
  const forms = WORDS[word];
  return locale === "ru"
    ? pluralRu(n, forms.ru)
    : n === 1
      ? forms.en[0]
      : forms.en[1];
}

/**
 * Путь к файлу из /public с учётом basePath.
 *
 * next/image с unoptimized: true отдаёт src как есть, без префикса,
 * поэтому на GitHub Pages (сайт лежит в подпапке) картинки ломаются.
 * Прогоняем все ссылки на статику через эту функцию.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
