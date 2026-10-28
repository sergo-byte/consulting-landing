import type { L, LList } from "@/lib/i18n";

/* ============================================================
   КОМАНДА

   Люди условные. Вместо фотографий — монограммы: демонстрация
   не должна показывать лица реальных людей.
   ============================================================ */

export type Person = {
  id: string;
  mark: string;
  name: L;
  role: L;
  years: number;
  focus: L;
  background: LList;
  education: LList;
  projects: LList;
};

export const team: Person[] = [
  {
    id: "partner-strategy",
    mark: "АМ",
    name: { ru: "Андрей М.", en: "Andrey M." },
    role: { ru: "Управляющий партнёр", en: "Managing partner" },
    years: 17,
    focus: {
      ru: "Корпоративные стратегии и финансовое моделирование в промышленности и ритейле",
      en: "Corporate strategy and financial modelling in industry and retail",
    },
    background: {
      ru: [
        "Международная консалтинговая компания, руководитель проектов",
        "Промышленный холдинг, директор по стратегии",
        "Инвестиционный фонд, оценка активов",
      ],
      en: [
        "International consulting firm, project leader",
        "Industrial group, strategy director",
        "Investment fund, asset valuation",
      ],
    },
    education: {
      ru: ["Экономический факультет, специализация «корпоративные финансы»", "Программа по стратегическому управлению"],
      en: ["Economics, major in corporate finance", "Executive programme in strategic management"],
    },
    projects: {
      ru: [
        "Стратегия металлургического холдинга на пять лет с финансовой моделью по переделам",
        "Разбор рентабельности продуктового портфеля производителя продуктов питания",
        "Оценка четырёх зарубежных рынков для выхода службы доставки",
        "Инвестиционная программа энергетической компании на десять лет",
      ],
      en: [
        "A five-year strategy for a metals group with a financial model by process stage",
        "Profitability analysis of a food producer's product portfolio",
        "Assessment of four foreign markets for a delivery service",
        "A ten-year investment programme for an energy company",
      ],
    },
  },
  {
    id: "partner-operations",
    mark: "ЕК",
    name: { ru: "Елена К.", en: "Elena K." },
    role: { ru: "Партнёр, операционная практика", en: "Partner, operations" },
    years: 14,
    focus: {
      ru: "Процессы, организационные структуры и системы показателей",
      en: "Processes, organisational design and performance systems",
    },
    background: {
      ru: [
        "Консалтинговая практика операционной эффективности",
        "Производственная компания, директор по развитию",
        "Проекты реорганизации на четырёх площадках",
      ],
      en: [
        "Operational effectiveness consulting practice",
        "Manufacturing company, development director",
        "Reorganisation projects across four sites",
      ],
    },
    education: {
      ru: ["Инженерное образование", "Магистратура по управлению операциями"],
      en: ["Engineering degree", "Master's in operations management"],
    },
    projects: {
      ru: [
        "Программа реорганизации машиностроительного завода на 18 месяцев",
        "Система КПЭ телеком-оператора от правления до руководителей отделов",
        "Описание и перестройка процессов сервисной компании",
      ],
      en: [
        "An 18-month reorganisation programme for a machinery plant",
        "A KPI system for a telecom operator, board to department heads",
        "Process mapping and redesign for a services company",
      ],
    },
  },
  {
    id: "director-markets",
    mark: "ДС",
    name: { ru: "Дмитрий С.", en: "Dmitry S." },
    role: { ru: "Директор практики, рынки", en: "Practice director, markets" },
    years: 11,
    focus: {
      ru: "Анализ рынков, бенчмаркинг и выход на новые территории",
      en: "Market analysis, benchmarking and market entry",
    },
    background: {
      ru: [
        "Исследовательское агентство, руководитель направления",
        "FMCG-компания, аналитика каналов продаж",
      ],
      en: [
        "Research agency, practice lead",
        "FMCG company, sales channel analytics",
      ],
    },
    education: {
      ru: ["Прикладная математика", "Программа по международной экономике"],
      en: ["Applied mathematics", "Programme in international economics"],
    },
    projects: {
      ru: [
        "Бенчмаркинг девяти конкурентов сети магазинов",
        "Стратегия выхода на рынки Индии, Бразилии и Вьетнама",
        "Сегментация клиентской базы универсального банка",
      ],
      en: [
        "Benchmarking nine competitors of a retail chain",
        "A market entry strategy for India, Brazil and Vietnam",
        "Customer segmentation for a universal bank",
      ],
    },
  },
  {
    id: "lead-modelling",
    mark: "ИТ",
    name: { ru: "Ирина Т.", en: "Irina T." },
    role: { ru: "Руководитель моделирования", en: "Head of modelling" },
    years: 9,
    focus: {
      ru: "Финансово-экономические модели и проверка решений на сценариях",
      en: "Financial models and scenario testing of decisions",
    },
    background: {
      ru: ["Инвестиционный банк, проектное финансирование", "Аудит и оценка"],
      en: ["Investment bank, project finance", "Audit and valuation"],
    },
    education: {
      ru: ["Финансы и кредит", "Профессиональная квалификация по финансовому анализу"],
      en: ["Finance", "Professional qualification in financial analysis"],
    },
    projects: {
      ru: [
        "Модель запуска переработки для агрохолдинга: три конфигурации производства",
        "Экономика одной клиники для сети медицинских центров",
        "Пересборка комиссионной политики маркетплейса",
      ],
      en: [
        "A processing launch model for an agricultural group: three plant configurations",
        "Unit economics of a single clinic for a medical network",
        "Rebuilding a marketplace's commission policy",
      ],
    },
  },
];

export const teamPage = {
  eyebrow: { ru: "Команда", en: "Team" } satisfies L,
  title: {
    ru: "Кто делает работу",
    en: "Who does the work",
  } satisfies L,
  lede: {
    ru: "Команда собирается под отрасль и тип задачи. Ниже — ядро практики: четыре человека, на которых держатся направления.",
    en: "Teams are assembled for the sector and the kind of task. Below is the core of the practice: the four people the practices rest on.",
  } satisfies L,
  yearsLabel: { ru: "лет в консалтинге", en: "years in consulting" } satisfies L,
  focusLabel: { ru: "Специализация", en: "Focus" } satisfies L,
  backgroundLabel: { ru: "Опыт", en: "Background" } satisfies L,
  educationLabel: { ru: "Образование", en: "Education" } satisfies L,
  projectsLabel: { ru: "Проекты", en: "Projects" } satisfies L,
  demoNote: {
    ru: "Имена и биографии условные: в демонстрационной версии мы не показываем реальных людей.",
    en: "Names and biographies are fictional: a demo does not show real people.",
  } satisfies L,
};
