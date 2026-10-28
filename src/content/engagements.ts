import type { L } from "@/lib/i18n";

/* ============================================================
   ПРОЕКТЫ

   Обобщённые примеры для демонстрации фильтра и глобуса.
   Заказчики условные, цифры условные.
   ============================================================ */

export type IndustryKey =
  | "banking"
  | "retail"
  | "fmcg"
  | "ecommerce"
  | "industry"
  | "metals"
  | "agri"
  | "construction"
  | "transport"
  | "energy"
  | "telecom"
  | "healthcare";

export type FunctionKey =
  | "growth"
  | "commercial"
  | "portfolio"
  | "reorg"
  | "modelling"
  | "international"
  | "benchmarking"
  | "kpi"
  | "profitability"
  | "launch";

export type GeoKey = "ru" | "kz" | "tr" | "ae" | "de" | "se" | "in" | "br" | "vn";

export const industryLabels: Record<IndustryKey, L> = {
  banking: { ru: "Банки и финансы", en: "Banking and finance" },
  retail: { ru: "Ритейл", en: "Retail" },
  fmcg: { ru: "FMCG", en: "FMCG" },
  ecommerce: { ru: "E-commerce", en: "E-commerce" },
  industry: { ru: "Машиностроение", en: "Machinery" },
  metals: { ru: "Металлургия", en: "Metals" },
  agri: { ru: "Агропром", en: "Agriculture" },
  construction: { ru: "Строительство", en: "Construction" },
  transport: { ru: "Транспорт и логистика", en: "Transport and logistics" },
  energy: { ru: "Энергетика", en: "Energy" },
  telecom: { ru: "Телеком", en: "Telecom" },
  healthcare: { ru: "Здравоохранение", en: "Healthcare" },
};

export const functionLabels: Record<FunctionKey, L> = {
  growth: { ru: "Стратегия развития", en: "Growth strategy" },
  commercial: { ru: "Коммерческая стратегия", en: "Commercial strategy" },
  portfolio: { ru: "Продуктовый портфель", en: "Product portfolio" },
  reorg: { ru: "Реорганизация", en: "Reorganisation" },
  modelling: { ru: "Финансовое моделирование", en: "Financial modelling" },
  international: { ru: "Выход на новые рынки", en: "Market entry" },
  benchmarking: { ru: "Бенчмаркинг", en: "Benchmarking" },
  kpi: { ru: "Система КПЭ", en: "KPI system" },
  profitability: { ru: "Рентабельность", en: "Profitability" },
  launch: { ru: "Запуск направления", en: "New business launch" },
};

export const geoLabels: Record<GeoKey, L> = {
  ru: { ru: "Россия", en: "Russia" },
  kz: { ru: "Казахстан", en: "Kazakhstan" },
  tr: { ru: "Турция", en: "Türkiye" },
  ae: { ru: "ОАЭ", en: "UAE" },
  de: { ru: "Германия", en: "Germany" },
  se: { ru: "Швеция", en: "Sweden" },
  in: { ru: "Индия", en: "India" },
  br: { ru: "Бразилия", en: "Brazil" },
  vn: { ru: "Вьетнам", en: "Vietnam" },
};

export type Engagement = {
  id: string;
  client: L;
  text: L;
  industries: IndustryKey[];
  functions: FunctionKey[];
  geo: GeoKey[];
  /** Измеримый результат. Условный, как и весь остальной пример. */
  outcome?: L;
};

export const engagements: Engagement[] = [
  {
    id: "retail-formats",
    client: { ru: "Производитель продуктов питания", en: "Food producer" },
    text: {
      ru: "Разведение продуктовой линейки между сетевым ритейлом, дискаунтерами и собственными точками: кто что продаёт и по какой цене",
      en: "Splitting a product line across grocery chains, discounters and own outlets: who sells what and at what price",
    },
    industries: ["fmcg", "retail"],
    functions: ["portfolio"],
    geo: ["ru"],
    outcome: {
      ru: "Каннибализация между каналами снижена, маржа линейки выросла на 6 п. п.",
      en: "Cannibalisation between channels reduced, line margin up by 6 points",
    },
  },
  {
    id: "bank-sme",
    client: { ru: "Универсальный банк", en: "Universal bank" },
    text: {
      ru: "Стратегия работы с малым и средним бизнесом: сегментация клиентской базы, продуктовое предложение по сегментам, экономика на одного клиента",
      en: "An SME strategy: customer segmentation, a product offer per segment and unit economics per client",
    },
    industries: ["banking"],
    functions: ["growth", "modelling"],
    geo: ["ru", "kz"],
  },
  {
    id: "delivery-entry",
    client: { ru: "Служба доставки", en: "Delivery service" },
    text: {
      ru: "Оценка четырёх зарубежных рынков для выхода: размер, регулирование, конкуренты, стоимость входа. Выбор двух и план запуска",
      en: "Assessing four foreign markets for entry: size, regulation, competitors, cost of entry. Picking two and planning the launch",
    },
    industries: ["ecommerce", "transport"],
    functions: ["international"],
    geo: ["in", "br", "vn"],
    outcome: {
      ru: "Запуск в первой стране за 7 месяцев вместо запланированных 12",
      en: "Launch in the first country in 7 months instead of the planned 12",
    },
  },
  {
    id: "metals-profitability",
    client: { ru: "Металлургический холдинг", en: "Metals group" },
    text: {
      ru: "Разбор рентабельности по переделам и видам продукции. Выявление позиций, которые продавались ниже себестоимости",
      en: "Profitability analysis by process stage and product. Finding the lines that were being sold below cost",
    },
    industries: ["metals"],
    functions: ["profitability", "modelling"],
    geo: ["ru"],
    outcome: {
      ru: "11 убыточных позиций выведены из портфеля",
      en: "11 loss-making lines taken out of the portfolio",
    },
  },
  {
    id: "machinery-reorg",
    client: { ru: "Машиностроительный завод", en: "Machinery plant" },
    text: {
      ru: "Программа реорганизации: целевая оргструктура, перераспределение функций между площадками, план перехода на 18 месяцев",
      en: "A reorganisation programme: target structure, functions redistributed between sites and an 18-month transition plan",
    },
    industries: ["industry"],
    functions: ["reorg"],
    geo: ["ru", "de"],
  },
  {
    id: "agri-launch",
    client: { ru: "Агрохолдинг", en: "Agricultural group" },
    text: {
      ru: "Запуск направления переработки: сырьевой баланс, капитальные затраты, окупаемость трёх конфигураций производства",
      en: "Launching a processing business: raw material balance, capital costs and payback for three plant configurations",
    },
    industries: ["agri", "fmcg"],
    functions: ["launch", "modelling"],
    geo: ["ru", "kz"],
  },
  {
    id: "telecom-kpi",
    client: { ru: "Телеком-оператор", en: "Telecom operator" },
    text: {
      ru: "Система КПЭ от правления до руководителей отделов: показатели, веса, порядок расчёта премии и регламент пересмотра",
      en: "A KPI system from the board down to department heads: measures, weights, bonus calculation and a revision procedure",
    },
    industries: ["telecom"],
    functions: ["kpi"],
    geo: ["ru"],
  },
  {
    id: "retail-benchmark",
    client: { ru: "Сеть магазинов", en: "Retail chain" },
    text: {
      ru: "Бенчмаркинг девяти конкурентов: ассортимент, ценовые уровни, форматы точек, логистика и условия работы с поставщиками",
      en: "Benchmarking nine competitors: assortment, price levels, store formats, logistics and supplier terms",
    },
    industries: ["retail"],
    functions: ["benchmarking"],
    geo: ["ru", "tr"],
  },
  {
    id: "construction-commercial",
    client: { ru: "Строительная компания", en: "Construction company" },
    text: {
      ru: "Коммерческая стратегия и перестройка отдела продаж: сегменты заказчиков, воронка, мотивация менеджеров",
      en: "A commercial strategy and a rebuilt sales function: customer segments, pipeline and sales incentives",
    },
    industries: ["construction"],
    functions: ["commercial", "reorg"],
    geo: ["ru", "ae"],
  },
  {
    id: "energy-model",
    client: { ru: "Энергетическая компания", en: "Energy company" },
    text: {
      ru: "Финансово-экономическая модель инвестиционной программы на десять лет с проверкой на сценариях спроса и тарифа",
      en: "A ten-year financial model of the investment programme, stress-tested against demand and tariff scenarios",
    },
    industries: ["energy"],
    functions: ["modelling"],
    geo: ["ru"],
  },
  {
    id: "clinic-growth",
    client: { ru: "Сеть клиник", en: "Clinic network" },
    text: {
      ru: "Стратегия развития сети: где открывать, какие направления держать в каждом формате, экономика одной клиники",
      en: "A network growth strategy: where to open, which specialisms to keep in each format and the unit economics of one clinic",
    },
    industries: ["healthcare"],
    functions: ["growth"],
    geo: ["ru", "kz"],
  },
  {
    id: "marketplace-portfolio",
    client: { ru: "Маркетплейс", en: "Marketplace" },
    text: {
      ru: "Пересборка категорийного портфеля и комиссионной политики: что растить, что удерживать, из чего выходить",
      en: "Rebuilding the category portfolio and commission policy: what to grow, what to hold and what to exit",
    },
    industries: ["ecommerce", "retail"],
    functions: ["portfolio", "profitability"],
    geo: ["ru", "se"],
    outcome: {
      ru: "Валовая прибыль площадки выросла на 14 % без потери оборота",
      en: "Platform gross profit up 14% with no loss of turnover",
    },
  },
];

export const engagementsPage = {
  eyebrow: { ru: "Проекты", en: "Engagements" } satisfies L,
  title: {
    ru: "Отрасли, задачи и география",
    en: "Sectors, tasks and geography",
  } satisfies L,
  lede: {
    ru: "Примеры задач, с которыми приходят. Отфильтруйте по отрасли, типу работы или стране — глобус повернётся к выбранной.",
    en: "Examples of the tasks clients arrive with. Filter by sector, type of work or country and the globe turns to the one you pick.",
  } satisfies L,
  filterIndustry: { ru: "Отрасль", en: "Sector" } satisfies L,
  filterFunction: { ru: "Тип работы", en: "Type of work" } satisfies L,
  filterGeo: { ru: "География", en: "Geography" } satisfies L,
  countLabel: { ru: "показано", en: "shown" } satisfies L,
  geoNote: {
    ru: "Страны, названные в проектах",
    en: "Countries named in the projects",
  } satisfies L,
  noGeo: { ru: "Страна не указана", en: "Country not stated" } satisfies L,
};

/** Координаты для глобуса. */
export const geoPoints: Record<GeoKey, { lat: number; lon: number }> = {
  ru: { lat: 55.75, lon: 37.62 },
  kz: { lat: 51.16, lon: 71.47 },
  tr: { lat: 39.93, lon: 32.86 },
  ae: { lat: 24.47, lon: 54.37 },
  de: { lat: 52.52, lon: 13.4 },
  se: { lat: 59.33, lon: 18.07 },
  in: { lat: 28.61, lon: 77.21 },
  br: { lat: -23.55, lon: -46.63 },
  vn: { lat: 21.03, lon: 105.85 },
};
