import type { L } from "@/lib/i18n";

/* ============================================================
   ДИАГНОСТИКА

   Вопросы общие: они не описывают ничью конкретную методику.
   Компания на сайте условная, утверждений о ней здесь нет.

   Итоговые рекомендации ссылаются на услуги этого же сайта
   из раздела «Наши услуги».

   5 измерений × 3 вопроса, ответ даёт от 0 до 3 баллов.
   Балл измерения = сумма / 9 × 100.
   ============================================================ */

export type Option = { label: L; score: 0 | 1 | 2 | 3 };
export type Question = { id: string; text: L; options: Option[] };

export type Dimension = {
  id: string;
  title: L;
  axis: L;
  description: L;
  /** slug'и направлений экспертизы, которые закрывают провал по этой оси */
  services: string[];
  questions: Question[];
};

const o = (ru: string, en: string, score: 0 | 1 | 2 | 3): Option => ({
  label: { ru, en },
  score,
});

export const dimensions: Dimension[] = [
  {
    id: "clarity",
    title: { ru: "Ясность стратегии", en: "Strategy clarity" },
    axis: { ru: "Стратегия", en: "Strategy" },
    description: {
      ru: "Сформулирован ли выбор: не список намерений, а решение о том, чего компания делать не будет.",
      en: "Whether the choice is made: not a list of intentions, but a decision about what the company will not do.",
    },
    services: ["strategy", "strategy-session"],
    questions: [
      {
        id: "clarity-1",
        text: {
          ru: "Если спросить пятерых топ-менеджеров, в чём стратегия компании, насколько совпадут ответы?",
          en: "If you asked five senior managers what the strategy is, how close would the answers be?",
        },
        options: [
          o("Ответы будут принципиально разными", "The answers would differ fundamentally", 0),
          o("Совпадут общие слова, разойдутся приоритеты", "The words would match, the priorities would not", 1),
          o("Совпадут по сути, разойдутся в деталях", "They would agree in substance, differ in detail", 2),
          o("Совпадут, включая то, от чего мы отказались", "They would agree, including on what we gave up", 3),
        ],
      },
      {
        id: "clarity-2",
        text: {
          ru: "Есть ли решения, которые компания сознательно приняла «не делать»?",
          en: "Are there things the company has deliberately decided not to do?",
        },
        options: [
          o("Нет, стараемся не закрывать возможности", "No, we try not to close off options", 0),
          o("Обсуждали, но формально не фиксировали", "Discussed, never formally recorded", 1),
          o("Да, по нескольким направлениям", "Yes, on several fronts", 2),
          o("Да, и они зафиксированы в решении совета", "Yes, and they are recorded in a board decision", 3),
        ],
      },
      {
        id: "clarity-3",
        text: {
          ru: "Как выглядит горизонт планирования, под который есть цифры?",
          en: "What planning horizon actually has numbers behind it?",
        },
        options: [
          o("Год, и то бюджет", "One year, and only the budget", 0),
          o("Год с цифрами, дальше — направления", "One year with numbers, beyond that directions", 1),
          o("Три года с целевыми показателями", "Three years with target metrics", 2),
          o("3–5 лет со сценариями и моделью", "3–5 years with scenarios and a model", 3),
        ],
      },
    ],
  },
  {
    id: "market",
    title: { ru: "Знание рынка", en: "Market insight" },
    axis: { ru: "Рынок", en: "Market" },
    description: {
      ru: "Опираются ли решения на проверяемую картину рынка или на управленческую интуицию.",
      en: "Whether decisions rest on a verifiable picture of the market or on management intuition.",
    },
    services: ["market-analysis", "benchmarking"],
    questions: [
      {
        id: "market-1",
        text: {
          ru: "Когда компания последний раз считала объём своего рынка снизу вверх?",
          en: "When did the company last size its market bottom-up?",
        },
        options: [
          o("Никогда или больше трёх лет назад", "Never, or more than three years ago", 0),
          o("Пользуемся оценками из отраслевых обзоров", "We rely on industry report estimates", 1),
          o("Считали 1–2 года назад", "We calculated it one to two years ago", 2),
          o("Считаем регулярно и сверяем с фактом", "We recalculate regularly and reconcile with actuals", 3),
        ],
      },
      {
        id: "market-2",
        text: {
          ru: "Насколько точно вы знаете экономику ключевых конкурентов?",
          en: "How precisely do you know the economics of your key competitors?",
        },
        options: [
          o("Знаем цены, остальное — предположения", "We know their prices, the rest is guesswork", 0),
          o("Есть общее представление о структуре затрат", "We have a general sense of their cost structure", 1),
          o("Делали сравнение по нескольким функциям", "We benchmarked several functions", 2),
          o("Есть регулярный бенчмарк по единой методике", "We run a recurring benchmark on a single method", 3),
        ],
      },
      {
        id: "market-3",
        text: {
          ru: "Как в компании разрешается спор о том, что происходит на рынке?",
          en: "How does the company settle an argument about what is happening in the market?",
        },
        options: [
          o("Решает мнение самого старшего в комнате", "The most senior person in the room decides", 0),
          o("Спорим, пока кто-то не уступит", "We argue until someone concedes", 1),
          o("Запрашиваем данные, если спор принципиальный", "We pull data when the argument matters", 2),
          o("Есть общая база фактов, спор идёт о выводах", "There is a shared fact base; we argue about conclusions", 3),
        ],
      },
    ],
  },
  {
    id: "economics",
    title: { ru: "Экономика решений", en: "Decision economics" },
    axis: { ru: "Экономика", en: "Economics" },
    description: {
      ru: "Проходят ли крупные решения через модель, в которой видно каждое допущение.",
      en: "Whether major decisions pass through a model where every assumption is visible.",
    },
    services: ["business-plan", "investment-materials"],
    questions: [
      {
        id: "economics-1",
        text: {
          ru: "Есть ли финансовая модель, в которой можно поменять допущение и увидеть эффект?",
          en: "Is there a financial model where you can change an assumption and see the effect?",
        },
        options: [
          o("Нет, есть бюджет в таблице", "No, there is a budget in a spreadsheet", 0),
          o("Есть, но её понимает один человек", "There is one, but only one person understands it", 1),
          o("Есть рабочая модель по ключевым направлениям", "There is a working model for the key lines", 2),
          o("Есть модель со сценариями, ей пользуется команда", "A scenario model the team actually uses", 3),
        ],
      },
      {
        id: "economics-2",
        text: {
          ru: "Знаете ли вы юнит-экономику по каждому значимому продукту или сегменту?",
          en: "Do you know the unit economics of every material product or segment?",
        },
        options: [
          o("Считаем маржу в целом по компании", "We track margin at company level", 0),
          o("По крупным направлениям, с допущениями по аллокации", "By major line, with allocation assumptions", 1),
          o("По продуктам, но не по клиентским сегментам", "By product, but not by customer segment", 2),
          o("По продуктам и сегментам, с полной себестоимостью", "By product and segment, fully loaded", 3),
        ],
      },
      {
        id: "economics-3",
        text: {
          ru: "Что происходит, когда крупная инициатива не даёт заявленного эффекта?",
          en: "What happens when a major initiative fails to deliver the promised effect?",
        },
        options: [
          o("Обычно это не отслеживается", "It generally is not tracked", 0),
          o("Замечаем постфактум, разбора нет", "We notice after the fact, without a post-mortem", 1),
          o("Разбираем причины, решения принимаем по ситуации", "We review causes and decide case by case", 2),
          o("Есть регулярный разбор эффекта и решение о продолжении", "There is a recurring effect review and a continue-or-stop decision", 3),
        ],
      },
    ],
  },
  {
    id: "execution",
    title: { ru: "Операционная готовность", en: "Execution readiness" },
    axis: { ru: "Процессы", en: "Execution" },
    description: {
      ru: "Способна ли операционная модель выдержать принятое стратегическое решение.",
      en: "Whether the operating model can carry the strategic decision once it is made.",
    },
    services: ["process-optimisation"],
    questions: [
      {
        id: "execution-1",
        text: {
          ru: "Насколько реальные процессы совпадают с описанными в регламентах?",
          en: "How closely do the real processes match the documented ones?",
        },
        options: [
          o("Регламенты существуют отдельно от работы", "The policies exist separately from the work", 0),
          o("Совпадают частично, обходные пути привычны", "Partially; workarounds are routine", 1),
          o("В основном совпадают в ключевых процессах", "Mostly aligned on the critical processes", 2),
          o("Совпадают, отклонения фиксируются и разбираются", "Aligned; deviations are logged and reviewed", 3),
        ],
      },
      {
        id: "execution-2",
        text: {
          ru: "Известно ли, сколько времени и денег стоит каждый шаг ключевого процесса?",
          en: "Do you know the time and cost of each step in your core process?",
        },
        options: [
          o("Нет", "No", 0),
          o("Знаем длительность в целом, стоимость — нет", "We know overall duration, not cost", 1),
          o("Замеряли в рамках отдельного проекта", "We measured it once, within a project", 2),
          o("Замеряем регулярно, есть нормативы", "We measure it regularly against standards", 3),
        ],
      },
      {
        id: "execution-3",
        text: {
          ru: "Как быстро компания перестраивает процесс, когда меняется приоритет?",
          en: "How quickly does the company rewire a process when priorities change?",
        },
        options: [
          o("Практически не перестраивает", "It effectively does not", 0),
          o("Полгода и дольше", "Six months or more", 1),
          o("Один-два квартала", "One to two quarters", 2),
          o("Недели, есть отработанный механизм изменений", "Weeks; there is an established change mechanism", 3),
        ],
      },
    ],
  },
  {
    id: "performance",
    title: { ru: "Управление по показателям", en: "Performance management" },
    axis: { ru: "КПЭ", en: "Metrics" },
    description: {
      ru: "Доходит ли стратегия до уровня, на котором конкретный человек меняет поведение.",
      en: "Whether strategy reaches the level at which an individual changes behaviour.",
    },
    services: ["kpi-system"],
    questions: [
      {
        id: "performance-1",
        text: {
          ru: "Каскадированы ли цели компании до уровня подразделений и руководителей?",
          en: "Are company goals cascaded down to units and individual leaders?",
        },
        options: [
          o("Нет, цели живут на уровне компании", "No, goals live at company level", 0),
          o("Каскадированы формально, связь не очевидна", "Cascaded formally; the linkage is unclear", 1),
          o("Каскадированы по ключевым подразделениям", "Cascaded across the key units", 2),
          o("Каскадированы до руководителя с понятным вкладом", "Cascaded to the individual leader with a clear contribution", 3),
        ],
      },
      {
        id: "performance-2",
        text: {
          ru: "Бывает ли, что показатели двух подразделений противоречат друг другу?",
          en: "Do metrics of two different units ever contradict each other?",
        },
        options: [
          o("Регулярно, это источник постоянных конфликтов", "Regularly, and it causes constant conflict", 0),
          o("Иногда, разбираем вручную", "Sometimes; we resolve it manually", 1),
          o("Редко, конфликты выявлены и учтены", "Rarely; the conflicts are known and accounted for", 2),
          o("Нет, дерево показателей проверено на конфликты", "No; the metric tree was tested for conflicts", 3),
        ],
      },
      {
        id: "performance-3",
        text: {
          ru: "Связана ли переменная часть вознаграждения со стратегическими приоритетами?",
          en: "Is variable compensation linked to the strategic priorities?",
        },
        options: [
          o("Нет, привязана к выполнению бюджета", "No, it is tied to hitting the budget", 0),
          o("Частично, доля приоритетов невелика", "Partly; the strategic share is small", 1),
          o("Да, по большинству руководителей", "Yes, for most leaders", 2),
          o("Да, и состав показателей пересматривается ежегодно", "Yes, and the metric set is reviewed annually", 3),
        ],
      },
    ],
  },
];

/** Полосы интерпретации итогового индекса. */
export const bands = [
  {
    max: 40,
    label: { ru: "Требует вмешательства", en: "Needs intervention" } satisfies L,
    body: {
      ru: "Решения принимаются быстрее, чем под них собирается фактура. Заметный сдвиг обычно даёт работа с одним или двумя блоками, а не со всеми сразу.",
      en: "Decisions are being made faster than the evidence under them is gathered. Working on one or two blocks usually achieves more than tackling all of them at once.",
    } satisfies L,
  },
  {
    max: 60,
    label: { ru: "Зона риска", en: "At risk" } satisfies L,
    body: {
      ru: "Основа есть, но держится на отдельных людях и плохо переживает смену контекста. Стоит закрепить методику там, где сейчас работает интуиция.",
      en: "The foundation exists, but it rests on individual people and does not survive a change of context. It is worth writing down the method where intuition currently carries the load.",
    } satisfies L,
  },
  {
    max: 80,
    label: { ru: "Устойчиво", en: "Solid" } satisfies L,
    body: {
      ru: "Управленческий контур работает. Дальше выигрыш даёт точность: более тонкая сегментация и доведение показателей до уровня, на котором принимают решения.",
      en: "The management loop works. Further gains come from precision: finer segmentation, and metrics that reach the level where decisions are actually taken.",
    } satisfies L,
  },
  {
    max: 101,
    label: { ru: "Сильная позиция", en: "Strong position" } satisfies L,
    body: {
      ru: "Решения опираются на проверяемые основания. Внешний взгляд здесь нужен не для наведения порядка, а чтобы проверить сами допущения.",
      en: "Decisions rest on verifiable grounds. An outside view here is for testing the assumptions, not for imposing order.",
    } satisfies L,
  },
];

export const diagnosticPage = {
  eyebrow: { ru: "Инструмент", en: "Instrument" } satisfies L,
  title: {
    ru: "Стратегическая диагностика",
    en: "Strategic diagnostic",
  } satisfies L,
  lede: {
    ru: "15 вопросов о том, на чём в вашей компании держатся решения. На выходе вы получите профиль по пяти измерениям, его толкование и список услуг, которые к этим измерениям относятся. Ответы остаются в вашем браузере.",
    en: "Fifteen questions about what your decisions rest on. You get a profile across five dimensions, a reading of it, and the services that relate to those dimensions. Your answers stay in your browser.",
  } satisfies L,
  meta: {
    ru: "15 вопросов · около 6 минут · без регистрации",
    en: "15 questions · about 6 minutes · no sign-up",
  } satisfies L,
  start: { ru: "Начать диагностику", en: "Start the diagnostic" } satisfies L,
  next: { ru: "Далее", en: "Next" } satisfies L,
  prev: { ru: "Назад", en: "Back" } satisfies L,
  restart: { ru: "Пройти заново", en: "Start over" } satisfies L,
  seeResult: { ru: "Показать результат", en: "Show result" } satisfies L,
  questionOf: { ru: "Вопрос", en: "Question" } satisfies L,
  resultTitle: { ru: "Ваш профиль", en: "Your profile" } satisfies L,
  indexLabel: { ru: "Сводный индекс", en: "Composite index" } satisfies L,
  weakestLabel: { ru: "Начинать стоит здесь", en: "Start here" } satisfies L,
  recommendedLabel: {
    ru: "Услуги по этим измерениям",
    en: "Services for these dimensions",
  } satisfies L,
  discussTitle: {
    ru: "Обсудить результат",
    en: "Discuss the result",
  } satisfies L,
  discussBody: {
    ru: "Отправьте профиль вместе с парой строк о контексте, и мы свяжемся с вами.",
    en: "Send the profile with a couple of lines of context and we will get back to you.",
  } satisfies L,
  privacy: {
    ru: "Ответы хранятся только в вашем браузере и не отправляются на сервер, пока вы сами не нажмёте «Отправить».",
    en: "Answers are stored in your browser only and are not sent anywhere until you press Send.",
  } satisfies L,
};
