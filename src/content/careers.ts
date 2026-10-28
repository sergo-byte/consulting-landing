import type { L, LList } from "@/lib/i18n";

/* ============================================================
   СОИСКАТЕЛЯМ
   ============================================================ */

export const careersPage = {
  eyebrow: { ru: "Соискателям", en: "Careers" } satisfies L,
  title: {
    ru: "Работа, по которой видно результат",
    en: "Work where the result is visible",
  } satisfies L,
  lede: {
    ru: "Мы не держим постоянный список вакансий. Если то, что написано ниже, описывает вас — напишите, и мы ответим по существу.",
    en: "We do not keep a standing list of vacancies. If what follows describes you, write to us and we will answer properly.",
  } satisfies L,

  offerTitle: { ru: "Что мы предлагаем", en: "What we offer" } satisfies L,
  offers: [
    {
      id: "scope",
      title: { ru: "Задачи целиком", en: "Whole tasks" } satisfies L,
      body: {
        ru: "Не кусок аналитики в чужом проекте, а направление от первого разбора до защиты решения перед заказчиком.",
        en: "Not a slice of analysis inside someone else's project, but a workstream from the first review to defending the decision with the client.",
      } satisfies L,
    },
    {
      id: "sectors",
      title: { ru: "Смена отраслей", en: "Changing sectors" } satisfies L,
      body: {
        ru: "За год получается пройти через три-четыре непохожие индустрии. Это быстрее любого курса учит видеть общее в разном.",
        en: "A year usually covers three or four unalike industries. That teaches you to see the common structure faster than any course.",
      } satisfies L,
    },
    {
      id: "format",
      title: { ru: "Удалённо, где это работает", en: "Remote where it works" } satisfies L,
      body: {
        ru: "Аналитика и моделирование — дистанционно. Цех, склад и интервью с людьми — на месте. Мы не делаем вид, что второе можно заменить созвоном.",
        en: "Analysis and modelling are remote. The shop floor, the warehouse and interviews happen on site. We do not pretend a call replaces the second.",
      } satisfies L,
    },
    {
      id: "review",
      title: { ru: "Разбор работы", en: "Work reviewed" } satisfies L,
      body: {
        ru: "Каждый расчёт и каждая формулировка проходят через партнёра. Это неприятно первые месяцы и сильно ускоряет дальше.",
        en: "Every calculation and every formulation goes past a partner. That is uncomfortable for the first months and speeds you up a lot afterwards.",
      } satisfies L,
    },
  ],

  lookingTitle: { ru: "Кого ищем", en: "Who we look for" } satisfies L,
  looking: {
    ru: [
      "Умение довести задачу до числа, а не до списка соображений",
      "Готовность защищать вывод перед человеком, который знает отрасль лучше вас",
      "Аккуратность в данных: проверенная цифра важнее быстрой",
      "Английский на уровне чтения отраслевых отчётов",
    ],
    en: [
      "The ability to take a task to a number, not to a list of considerations",
      "Readiness to defend a conclusion in front of someone who knows the sector better than you",
      "Care with data: a checked figure beats a fast one",
      "English good enough to read industry reports",
    ],
  } satisfies LList,

  processTitle: { ru: "Как проходит отбор", en: "How the process runs" } satisfies L,
  process: {
    ru: [
      "Разговор о том, что вы делали и как принимали решения",
      "Разбор небольшого кейса: даём данные, смотрим на ход рассуждения",
      "Встреча с партнёром направления",
    ],
    en: [
      "A conversation about what you have done and how you decided",
      "A short case: we give the data and watch how you reason",
      "A meeting with the practice partner",
    ],
  } satisfies LList,

  formTitle: { ru: "Написать нам", en: "Write to us" } satisfies L,
  formBody: {
    ru: "Коротко о себе и о том, какие задачи вам интересны. Ссылка на резюме необязательна, но помогает.",
    en: "Briefly about you and the work that interests you. A link to your CV is optional but helps.",
  } satisfies L,
};
