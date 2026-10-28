import type { L } from "@/lib/i18n";

/* ============================================================
   КЛИЕНТЫ

   Компании условные. Вместо чужих логотипов — типографские знаки:
   монограмма в рамке и название под ней. Так стена читается как
   единое поле и не зависит от чужих файлов.
   ============================================================ */

export type Client = {
  id: string;
  /** Монограмма: две-три буквы для знака. */
  mark: string;
  name: L;
  industry: L;
};

export const clients: Client[] = [
  { id: "nordwell", mark: "NW", name: { ru: "Нордвелл", en: "Nordwell" }, industry: { ru: "Металлургия", en: "Metals" } },
  { id: "vektor", mark: "ВК", name: { ru: "Вектор Групп", en: "Vektor Group" }, industry: { ru: "Машиностроение", en: "Machinery" } },
  { id: "arbat", mark: "АБ", name: { ru: "Арбат Банк", en: "Arbat Bank" }, industry: { ru: "Банки", en: "Banking" } },
  { id: "polelan", mark: "ПЛ", name: { ru: "Полелан", en: "Polelan" }, industry: { ru: "Агропром", en: "Agriculture" } },
  { id: "silverline", mark: "SL", name: { ru: "Сильверлайн", en: "Silverline" }, industry: { ru: "Ритейл", en: "Retail" } },
  { id: "tehnoprom", mark: "ТП", name: { ru: "Техпром", en: "Tehprom" }, industry: { ru: "Промышленность", en: "Industry" } },
  { id: "meridian", mark: "МД", name: { ru: "Меридиан", en: "Meridian" }, industry: { ru: "Логистика", en: "Logistics" } },
  { id: "kamena", mark: "КМ", name: { ru: "Камена", en: "Kamena" }, industry: { ru: "Строительство", en: "Construction" } },
  { id: "bluefield", mark: "BF", name: { ru: "Блюфилд", en: "Bluefield" }, industry: { ru: "E-commerce", en: "E-commerce" } },
  { id: "aurat", mark: "АР", name: { ru: "Аурат", en: "Aurat" }, industry: { ru: "Энергетика", en: "Energy" } },
  { id: "stenmark", mark: "SM", name: { ru: "Стенмарк", en: "Stenmark" }, industry: { ru: "FMCG", en: "FMCG" } },
  { id: "orbita", mark: "ОР", name: { ru: "Орбита", en: "Orbita" }, industry: { ru: "Телеком", en: "Telecom" } },
  { id: "lindgren", mark: "LG", name: { ru: "Линдгрен", en: "Lindgren" }, industry: { ru: "Фармацевтика", en: "Pharma" } },
  { id: "progress", mark: "ПГ", name: { ru: "Прогресс", en: "Progress" }, industry: { ru: "Транспорт", en: "Transport" } },
  { id: "halcyon", mark: "HC", name: { ru: "Халсион", en: "Halcyon" }, industry: { ru: "Здравоохранение", en: "Healthcare" } },
  { id: "rodnik", mark: "РД", name: { ru: "Родник", en: "Rodnik" }, industry: { ru: "Пищевая промышленность", en: "Food" } },
  { id: "aksiom", mark: "АК", name: { ru: "Аксиома", en: "Aksioma" }, industry: { ru: "Финансы", en: "Finance" } },
  { id: "granit", mark: "ГР", name: { ru: "Гранит", en: "Granit" }, industry: { ru: "Добыча", en: "Mining" } },
  { id: "westport", mark: "WP", name: { ru: "Вестпорт", en: "Westport" }, industry: { ru: "Порты", en: "Ports" } },
  { id: "altair", mark: "АЛ", name: { ru: "Альтаир", en: "Altair" }, industry: { ru: "Приборостроение", en: "Instruments" } },
];

export const clientsSection = {
  eyebrow: { ru: "Клиенты", en: "Clients" } satisfies L,
  title: {
    ru: "Двадцать компаний из четырнадцати отраслей",
    en: "Twenty companies across fourteen sectors",
  } satisfies L,
  body: {
    ru: "Названия условные: в демонстрационной версии мы не показываем реальных заказчиков. Отрасль появляется при наведении.",
    en: "The names are fictional: a demo does not show real clients. The sector appears on hover.",
  } satisfies L,
};
