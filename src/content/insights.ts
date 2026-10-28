import type { L, LList } from "@/lib/i18n";

/* ============================================================
   ПУБЛИКАЦИИ

   Демонстрационные материалы. Темы общие, цифры условные.
   ============================================================ */

export type Insight = {
  slug: string;
  date: string;
  readMinutes: number;
  topic: L;
  title: L;
  excerpt: L;
  body: LList;
  method: LList;
  findings: LList;
};

export const insights: Insight[] = [
  {
    slug: "strategy-that-survives",
    date: "2026-09-18",
    readMinutes: 7,
    topic: { ru: "Стратегия", en: "Strategy" },
    title: {
      ru: "Почему стратегия не доживает до внедрения",
      en: "Why strategies do not survive the handover",
    },
    excerpt: {
      ru: "Разбор восьми типичных мест, где стратегический документ теряет связь с работой компании, и что меняется, если закрыть хотя бы три из них.",
      en: "Eight typical points where a strategy document loses touch with the work, and what changes if you close even three of them.",
    },
    body: {
      ru: [
        "Стратегия редко проваливается на этапе выбора. Чаще она проваливается на стыке между документом и календарём: решение принято, но никто не знает, чья это теперь задача и к какому сроку.",
        "Мы разобрали, как устроен этот разрыв. Самое частое: в документе есть целевое состояние, но нет описания первого шага. Второе по частоте: шаг описан, но у него нет владельца — только отдел. Третье: владелец есть, но у него нет полномочий остановить текущую работу ради новой.",
        "Отдельный случай — когда стратегия сформулирована только как список намерений. «Выйти в новые сегменты», «повысить эффективность», «усилить бренд». Такой текст невозможно опровергнуть, а значит, невозможно и проверить. Рабочая формулировка всегда содержит то, от чего компания отказывается.",
        "Проверка простая: если из документа нельзя составить список задач с фамилиями и датами, это ещё не стратегия, а намерение её написать.",
      ],
      en: [
        "A strategy rarely fails at the point of choice. It fails at the seam between the document and the calendar: the decision is made, but nobody knows whose task it now is, or by when.",
        "We took that gap apart. The most common form: the document has a target state but no description of the first step. The second: the step is described but has no owner, only a department. The third: there is an owner, but no authority to stop current work in favour of the new.",
        "A separate case is a strategy written only as a list of intentions. Enter new segments, improve efficiency, strengthen the brand. Such a text cannot be contradicted, which means it cannot be tested either. A working formulation always says what the company is giving up.",
        "The test is simple: if you cannot turn the document into a list of tasks with names and dates, it is not yet a strategy — only an intention to write one.",
      ],
    },
    method: {
      ru: [
        "Разбор документов по завершённым проектам",
        "Интервью с владельцами задач через шесть месяцев после сдачи",
        "Сопоставление планов внедрения с фактическим календарём работ",
      ],
      en: [
        "Review of documents from completed projects",
        "Interviews with task owners six months after handover",
        "Comparison of road maps against the actual work calendar",
      ],
    },
    findings: {
      ru: [
        "Самая частая причина остановки — отсутствие владельца у первого шага",
        "Формулировка через отказ работает лучше формулировки через намерение",
        "Документ без дат перестаёт использоваться в среднем через квартал",
      ],
      en: [
        "The most common cause of a stall is the first step having no owner",
        "A formulation stated as a trade-off works better than one stated as an intention",
        "A document without dates falls out of use within about a quarter",
      ],
    },
  },
  {
    slug: "kpi-that-change-behaviour",
    date: "2026-07-02",
    readMinutes: 6,
    topic: { ru: "Показатели", en: "Performance" },
    title: {
      ru: "Показатели, которые меняют поведение",
      en: "Measures that actually change behaviour",
    },
    excerpt: {
      ru: "Чем отличается система КПЭ, по которой работают, от системы, которую заполняют раз в квартал и забывают.",
      en: "What separates a KPI system people work by from one that gets filled in quarterly and forgotten.",
    },
    body: {
      ru: [
        "Система показателей меняет поведение только тогда, когда конкретный человек может назвать действие, которое сдвинет его цифру на этой неделе. Если такого действия нет, показатель остаётся отчётностью.",
        "Отсюда два практических правила. Первое: у показателя должен быть один владелец, а не комитет. Второе: горизонт влияния должен быть короче горизонта пересмотра — иначе человек не успевает увидеть связь между усилием и результатом.",
        "Частая ошибка — вес показателя задают по важности для компании, а не по управляемости для сотрудника. В итоге половина премии зависит от того, на что человек не влияет, и мотивационная часть перестаёт работать как мотивация.",
        "Количество тоже имеет значение. Больше пяти показателей на одного человека означает, что приоритета нет ни у одного.",
      ],
      en: [
        "A performance system changes behaviour only when a specific person can name an action that will move their number this week. Without such an action, the measure stays a report.",
        "Two practical rules follow. First: a measure needs one owner, not a committee. Second: the horizon of influence must be shorter than the horizon of review — otherwise nobody sees the link between effort and result.",
        "A common mistake is to set weights by importance to the company rather than by controllability for the employee. Half the bonus then depends on things the person cannot affect, and the incentive stops working as an incentive.",
        "Quantity matters too. More than five measures per person means none of them is a priority.",
      ],
    },
    method: {
      ru: [
        "Разбор систем показателей в проектах разных отраслей",
        "Проверка каждого показателя на управляемость владельцем",
        "Сравнение горизонта влияния и горизонта пересмотра",
      ],
      en: [
        "Review of performance systems across sector projects",
        "Testing each measure for controllability by its owner",
        "Comparing the horizon of influence with the horizon of review",
      ],
    },
    findings: {
      ru: [
        "Один владелец на показатель работает лучше коллективной ответственности",
        "Вес стоит задавать по управляемости, а не по важности",
        "Больше пяти показателей на человека обесценивают все пять",
      ],
      en: [
        "One owner per measure beats collective responsibility",
        "Weights should follow controllability, not importance",
        "More than five measures per person devalues all five",
      ],
    },
  },
  {
    slug: "market-entry-cost",
    date: "2026-04-11",
    readMinutes: 8,
    topic: { ru: "Новые рынки", en: "Market entry" },
    title: {
      ru: "Сколько на самом деле стоит вход на новый рынок",
      en: "What market entry actually costs",
    },
    excerpt: {
      ru: "Статьи затрат, которые регулярно не попадают в расчёт, и почему срок выхода обычно оказывается вдвое длиннее запланированного.",
      en: "The cost lines that routinely miss the model, and why entry usually takes twice as long as planned.",
    },
    body: {
      ru: [
        "В расчёт входа на новый рынок почти всегда попадают прямые затраты: регистрация, аренда, первая команда, маркетинг. И почти никогда — время руководителей, которое уходит на согласования, и стоимость ошибок первого года.",
        "Второй системный пропуск — локальное регулирование. Его оценивают по сумме пошлин и забывают про срок: сертификация может занимать больше, чем строительство.",
        "Третий — стоимость выхода. Если рынок не пойдёт, сворачивание тоже стоит денег, и эту сумму лучше знать до входа, а не после.",
        "По нашим расчётам, сумма недооценённых статей обычно даёт от 30 до 60 процентов сверх первоначальной сметы. Поэтому в модели имеет смысл сразу считать три сценария, а не один.",
      ],
      en: [
        "Market entry models almost always include direct costs: registration, rent, the first team, marketing. They almost never include leadership time spent on approvals, or the cost of first-year mistakes.",
        "The second systematic gap is local regulation. It is costed as the sum of fees, while the timeline is forgotten: certification can take longer than construction.",
        "The third is the cost of exit. If the market does not work out, winding down also costs money, and that figure is better known before entry than after.",
        "In our models the underestimated lines usually add 30 to 60 per cent on top of the original budget. That is why it is worth modelling three scenarios rather than one.",
      ],
    },
    method: {
      ru: [
        "Сравнение плановых и фактических смет по проектам выхода на рынки",
        "Разбор статей затрат, отсутствовавших в первоначальной модели",
        "Опрос руководителей о фактических сроках согласований",
      ],
      en: [
        "Comparing planned and actual budgets across market entry projects",
        "Reviewing cost lines missing from the original model",
        "Surveying executives on actual approval timelines",
      ],
    },
    findings: {
      ru: [
        "Недооценка сметы составляет от 30 до 60 процентов",
        "Срок сертификации чаще всего и определяет дату запуска",
        "Стоимость выхода стоит считать до входа",
      ],
      en: [
        "Budgets are underestimated by 30 to 60 per cent",
        "Certification time is most often what sets the launch date",
        "The cost of exit is worth costing before entry",
      ],
    },
  },
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

export const insightsPage = {
  eyebrow: { ru: "Публикации", en: "Publications" } satisfies L,
  title: {
    ru: "Что мы разбираем между проектами",
    en: "What we take apart between projects",
  } satisfies L,
  lede: {
    ru: "Короткие разборы повторяющихся ситуаций. Без общих слов: только то, что видно в работе.",
    en: "Short analyses of recurring situations. No generalities: only what shows up in the work.",
  } satisfies L,
  methodLabel: { ru: "Методология", en: "Methodology" } satisfies L,
  findingsLabel: { ru: "Выводы", en: "Findings" } satisfies L,
  readLabel: { ru: "мин чтения", en: "min read" } satisfies L,
  allLabel: { ru: "Все публикации", en: "All publications" } satisfies L,
  nextLabel: { ru: "Следующая публикация", en: "Next publication" } satisfies L,
  empty: { ru: "Публикаций пока нет.", en: "No publications yet." } satisfies L,
};
