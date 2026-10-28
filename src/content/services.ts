import type { L, LList } from "@/lib/i18n";

/* ============================================================
   УСЛУГИ

   Восемь направлений, у каждого развёрнутый состав работ.
   Формулировки отраслевые, не привязаны к конкретной компании.
   ============================================================ */

export type Service = {
  slug: string;
  title: L;
  summary: L;
  scope: LList;
};

export const services: Service[] = [
  {
    slug: "strategy",
    title: { ru: "Разработка стратегии", en: "Strategy design" },
    summary: {
      ru: "От анализа рынка и бизнес-модели до финансовой модели целевой опции и плана внедрения",
      en: "From market and business model analysis to a financial model of the chosen option and an implementation plan",
    },
    scope: {
      ru: [
        "Анализ рынка (объёмы, сегменты, тренды, конкуренты, регулирование)",
        "Анализ бизнес-модели (продукты, ресурсы, клиенты, каналы и т. д.)",
        "Сбор целей и амбиций акционеров и менеджмента",
        "Определение стратегических развилок и стратегических опций",
        "Сравнение опций на базе качественных и количественных параметров",
        "Построение детальной финансово-экономической модели для целевой опции",
        "Создание плана внедрения стратегии (Road Map)",
      ],
      en: [
        "Market analysis (size, segments, trends, competitors, regulation)",
        "Business model analysis (products, resources, customers, channels and so on)",
        "Collecting the goals and ambitions of shareholders and management",
        "Identifying strategic forks and strategic options",
        "Comparing options on qualitative and quantitative parameters",
        "Building a detailed financial and economic model for the chosen option",
        "Creating a strategy implementation plan (road map)",
      ],
    },
  },
  {
    slug: "market-analysis",
    title: { ru: "Анализ рынка", en: "Market analysis" },
    summary: {
      ru: "Объём рынка, тренды, сегментация и бизнес-модели конкурентов",
      en: "Market size, trends, segmentation and competitor business models",
    },
    scope: {
      ru: [
        "Объём рынка",
        "Тренды и перспективы развития рынка",
        "Сегментация рынка",
        "Конкуренты и их бизнес-модели (продукты, география, вертикальная интеграция и т. п.)",
      ],
      en: [
        "Market size",
        "Market trends and development outlook",
        "Market segmentation",
        "Competitors and their business models (products, geography, vertical integration and so on)",
      ],
    },
  },
  {
    slug: "business-plan",
    title: { ru: "Разработка бизнес-плана", en: "Business plan development" },
    summary: {
      ru: "Финансово-экономическая модель, пакет документов и участие во встречах с инвесторами",
      en: "A financial and economic model, a document pack and participation in investor meetings",
    },
    scope: {
      ru: [
        "Верхнеуровневый анализ рынка",
        "Сбор и консолидация предпосылок (интервью, запросы и т. п.)",
        "Построение финансово-экономической модели",
        "Подготовка пакета документов",
        "Участие в ключевых встречах с инвесторами",
        "Сопровождение",
      ],
      en: [
        "High-level market analysis",
        "Collecting and consolidating assumptions (interviews, information requests and so on)",
        "Building a financial and economic model",
        "Preparing the document pack",
        "Taking part in key meetings with investors",
        "Ongoing support",
      ],
    },
  },
  {
    slug: "investment-materials",
    title: {
      ru: "Подготовка инвестиционных материалов",
      en: "Investment materials",
    },
    summary: {
      ru: "Базовая финансовая модель и презентационные материалы для встреч с инвесторами",
      en: "A base financial model and presentation materials for investor meetings",
    },
    scope: {
      ru: [
        "Сбор и консолидация необходимой информации (интервью, запросы и т. п.)",
        "Построение базовой финансовой модели",
        "Подготовка презентационных материалов",
        "Участие в ключевых встречах",
      ],
      en: [
        "Collecting and consolidating the necessary information (interviews, information requests and so on)",
        "Building a base financial model",
        "Preparing presentation materials",
        "Taking part in key meetings",
      ],
    },
  },
  {
    slug: "process-optimisation",
    title: {
      ru: "Оптимизация бизнес-процессов",
      en: "Business process optimisation",
    },
    summary: {
      ru: "Описание текущих процессов, зоны неэффективности, целевые процессы, КПЭ и расчёт FTE",
      en: "As-is process description, inefficiency zones, target processes, KPIs and FTE calculation",
    },
    scope: {
      ru: [
        "Описание существующих бизнес-процессов на базе интервью и регламентов",
        "Определение зон неэффективности",
        "Разработка целевых бизнес-процессов",
        "Определение КПЭ процессов, кросс-функциональных КПЭ",
        "Расчёт FTE",
      ],
      en: [
        "Describing existing business processes from interviews and internal policies",
        "Identifying zones of inefficiency",
        "Designing target business processes",
        "Defining process KPIs and cross-functional KPIs",
        "FTE calculation",
      ],
    },
  },
  {
    slug: "kpi-system",
    title: { ru: "Разработка системы КПЭ", en: "KPI system design" },
    summary: {
      ru: "КПЭ функций и их руководителей с формулой расчёта, целевым значением и привязкой к мотивации",
      en: "KPIs for functions and their heads, with formulas, targets and a link to the incentive system",
    },
    scope: {
      ru: [
        "Анализ целей и задач организации и функциональных подразделений",
        "Анализ организационной структуры и функционала",
        "Определение КПЭ (формула расчёта, целевое значение) функций и их руководителей",
        "Привязка КПЭ к системе мотивации",
      ],
      en: [
        "Analysis of the goals and objectives of the organisation and its functional units",
        "Analysis of the organisational structure and functions",
        "Defining KPIs (calculation formula, target value) for functions and their heads",
        "Linking KPIs to the incentive system",
      ],
    },
  },
  {
    slug: "benchmarking",
    title: { ru: "Бенчмаркинг конкурентов", en: "Competitive benchmarking" },
    summary: {
      ru: "Сегментация конкурентного ландшафта и сбор финансовых и продуктовых метрик конкурентов",
      en: "Segmentation of the competitive landscape and collection of competitors’ financial and product metrics",
    },
    scope: {
      ru: [
        "Сегментация конкурентного ландшафта",
        "Экспресс-анализ бизнес-моделей конкурентов",
        "Сбор финансовых и продуктовых метрик компаний-конкурентов",
      ],
      en: [
        "Segmentation of the competitive landscape",
        "Rapid analysis of competitors’ business models",
        "Collecting financial and product metrics of competitor companies",
      ],
    },
  },
  {
    slug: "strategy-session",
    title: {
      ru: "Подготовка стратегических сессий",
      en: "Strategy session preparation",
    },
    summary: {
      ru: "Первичный анализ, модерация сессии и визуализация её результатов",
      en: "Preliminary analysis, session facilitation and visualisation of the outcome",
    },
    scope: {
      ru: [
        "Первичный анализ и подготовка материалов",
        "Модерация стратегической сессии",
        "Консолидация и визуализация результатов встречи",
      ],
      en: [
        "Preliminary analysis and preparation of materials",
        "Facilitation of the strategy session",
        "Consolidating and visualising the outcome of the meeting",
      ],
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const expertiseIntro = {
  eyebrow: { ru: "Наши услуги", en: "Our services" } satisfies L,
  title: {
    ru: "Восемь направлений и состав работ по каждому",
    en: "Eight services, with the scope of work for each",
  } satisfies L,
  body: {
    ru: "Ниже перечислено то, из чего состоит каждая работа. Отметьте нужные направления, и внизу соберётся общий состав будущего проекта.",
    en: "Below is what each service consists of. Tick the ones you need and the combined scope of the engagement appears below.",
  } satisfies L,
  builderTitle: {
    ru: "Состав вашего проекта",
    en: "The scope of your engagement",
  } satisfies L,
  builderEmpty: {
    ru: "Отметьте направления слева, чтобы собрать состав работ.",
    en: "Tick the services on the left to assemble the scope of work.",
  } satisfies L,
  builderSend: {
    ru: "Отправить состав нам",
    en: "Send this scope to us",
  } satisfies L,
};
