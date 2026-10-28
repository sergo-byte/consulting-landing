import type { L, LList, Locale } from "@/lib/i18n";

/* ============================================================
   ДЕМОНСТРАЦИОННЫЙ ЛЕНДИНГ

   Страница показывает вёрстку, интерфейс и интерактивные блоки.
   Компания условная: названия, цифры и проекты — обобщённые,
   ни к какой реальной организации не относятся.
   ============================================================ */

export const brand = {
  /** Компании нет: в логотипе только знак и название категории. */
  name: "Strategy Consulting",
  short: "SC",
  email: "hello@example.com",
  tagline: {
    ru: "Стратегический консалтинг",
    en: "Strategy consulting",
  } satisfies L,
  demo: {
    ru: "Демонстрационная страница. Компания условная, данные обобщённые.",
    en: "A demo page. The company is fictional and the figures are generic.",
  } satisfies L,
};

/* ============================================================
   НАВИГАЦИЯ
   Одна страница: пункты меню ведут к секциям.
   ============================================================ */

export type NavItem = { path: string; label: L };

export const nav: NavItem[] = [
  { path: "#services", label: { ru: "Услуги", en: "Services" } },
  { path: "#work", label: { ru: "Проекты", en: "Work" } },
  { path: "#diagnostic", label: { ru: "Диагностика", en: "Diagnostic" } },
];

export const navCta: NavItem = {
  path: "#contact",
  label: { ru: "Обсудить задачу", en: "Start a conversation" },
};

/* ============================================================
   ПЕРВЫЙ ЭКРАН
   ============================================================ */

export const hero = {
  eyebrow: {
    ru: "Стратегия · Финансовая модель · План внедрения",
    en: "Strategy · Financial model · Road map",
  } satisfies L,
  headline: {
    ru: [
      { text: "Решения, которые" },
      { text: "доживают", accent: true },
      { text: "до внедрения", accent: true },
    ],
    en: [
      { text: "Strategies that" },
      { text: "survive", accent: true },
      { text: "the handover", accent: true },
    ],
  } satisfies Record<Locale, { text: string; accent?: boolean }[]>,
  lede: {
    ru: "Разбираем рынок и бизнес-модель, считаем варианты в цифрах и доводим выбранный до плана работ с ответственными и сроками. Не презентация на полку, а документ, по которому работают.",
    en: "We take apart the market and the business model, cost out the options, and carry the chosen one through to a plan with owners and dates. Not a deck for the shelf, but a document people work from.",
  } satisfies L,
  primaryCta: {
    ru: "Пройти диагностику",
    en: "Run the diagnostic",
  } satisfies L,
  secondaryCta: {
    ru: "Смотреть услуги",
    en: "See services",
  } satisfies L,
  scrollHint: { ru: "Листайте", en: "Scroll" } satisfies L,
};

/* ============================================================
   ПОКАЗАТЕЛИ
   Условные значения для демонстрации.
   ============================================================ */

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: L;
  note: L;
};

export const metrics: Metric[] = [
  {
    value: 12,
    label: { ru: "лет", en: "years" },
    note: { ru: "Практике консалтинга", en: "Of consulting practice" },
  },
  {
    value: 120,
    prefix: "> ",
    label: { ru: "проектов", en: "projects" },
    note: { ru: "Доведено до внедрения", en: "Carried to implementation" },
  },
  {
    value: 40,
    label: { ru: "консультантов", en: "consultants" },
    note: { ru: "Отраслевые и функциональные команды", en: "Sector and function teams" },
  },
  {
    value: 9,
    label: { ru: "стран", en: "countries" },
    note: { ru: "География проектов", en: "Project geography" },
  },
  {
    value: 8,
    label: { ru: "направлений", en: "practices" },
    note: { ru: "От стратегии до системы КПЭ", en: "From strategy to KPI systems" },
  },
];

/* ============================================================
   ПРИНЦИПЫ
   ============================================================ */

export type Principle = {
  id: string;
  title: L;
  body: L;
};

export const principles: Principle[] = [
  {
    id: "numbers",
    title: { ru: "Счёт, а не мнение", en: "Arithmetic, not opinion" },
    body: {
      ru: "Каждая стратегическая опция получает финансовую модель. Выбор между вариантами объясняется цифрами, которые можно проверить и пересчитать самому.",
      en: "Every strategic option gets a financial model. The choice between them is explained with figures you can check and rerun yourself.",
    },
  },
  {
    id: "handover",
    title: { ru: "Доведение до работ", en: "Through to the work" },
    body: {
      ru: "Проект заканчивается не презентацией, а планом внедрения: кто, что и к какому сроку делает. Без этого стратегия остаётся документом.",
      en: "A project ends with a road map, not a deck: who does what and by when. Without that, a strategy stays a document.",
    },
  },
  {
    id: "team",
    title: { ru: "Команда под задачу", en: "A team per task" },
    body: {
      ru: "Состав собирается под отрасль и тип задачи. Там, где хватает удалённой работы, работаем удалённо; где нужен цех и склад, выезжаем на место.",
      en: "The team is assembled for the sector and the kind of task. Remote where remote is enough, on site where the shop floor and the warehouse matter.",
    },
  },
];

/* ============================================================
   ОБЩИЕ СТРОКИ ИНТЕРФЕЙСА
   ============================================================ */

export const ui = {
  allEngagements: { ru: "Все проекты", en: "All engagements" } satisfies L,
  allExpertise: { ru: "Все услуги", en: "All services" } satisfies L,
  filterAll: { ru: "Все", en: "All" } satisfies L,
  nothingFound: { ru: "Ничего не найдено", en: "Nothing found" } satisfies L,
  reset: { ru: "Сбросить", en: "Reset" } satisfies L,
  scope: { ru: "Состав работ", en: "Scope of work" } satisfies L,
};

/* ============================================================
   ПОДВАЛ
   ============================================================ */

export const footer = {
  ctaTitle: {
    ru: "Опишите задачу",
    en: "Describe the task",
  } satisfies L,
  ctaBody: {
    ru: "Расскажите, на каком решении вы застряли. Ответим, чем это лечится и сколько занимает.",
    en: "Tell us which decision you are stuck on. We will say what it takes to unstick it and how long.",
  } satisfies L,
  contactLead: {
    ru: "Обсудить задачу",
    en: "Start a conversation",
  } satisfies L,
  legal: {
    ru: "© 2026. Демонстрационный проект",
    en: "© 2026. A demo project",
  } satisfies L,
  /**
   * Подпись автора. Впишите своё имя и ссылку — и они появятся в подвале.
   * Пока поля пустые, строка не выводится.
   */
  credit: {
    name: "",
    role: { ru: "Дизайн и разработка", en: "Design and development" } satisfies L,
    url: "",
  },
};

/* ============================================================
   SEO
   ============================================================ */

export const seo = {
  title: {
    ru: "Стратегический консалтинг — демонстрационный лендинг",
    en: "Strategy consulting: a demo landing page",
  } satisfies L,
  description: {
    ru: "Демонстрационный одностраничный сайт консалтинговой компании: состав работ по восьми направлениям, фильтр проектов, интерактивный глобус и стратегическая диагностика.",
    en: "A demo one-page site for a consulting firm: scope of work across eight practices, a project filter, an interactive globe and a strategy diagnostic.",
  } satisfies L,
  keywords: {
    ru: [
      "стратегический консалтинг",
      "разработка стратегии",
      "анализ рынка",
      "разработка бизнес-плана",
      "оптимизация бизнес-процессов",
      "разработка системы КПЭ",
    ],
    en: [
      "strategy consulting",
      "strategy design",
      "market analysis",
      "business plan",
      "process optimisation",
      "KPI system",
    ],
  } satisfies LList,
};
