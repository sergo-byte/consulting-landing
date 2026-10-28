# Consulting website demo

**English** · [Русский](#сайт-консалтинговой-компании)

A demo website for a fictional strategy consulting company, built with
Next.js 16, TypeScript, Tailwind CSS v4 and Motion. Two languages
(Russian and English), a dark theme, 38 pages in total (19 per language).

**Live demo:** https://sergo-byte.github.io/consulting-landing/

> **About this project**
> - **The company is fictional.** The names, figures, clients, team members and projects are generic and do not refer to any real organisation.
> - **The site was built with [Claude Code](https://claude.com/claude-code)**, which wrote the code.
> - **My role:** the idea, the requirements, design and product decisions, and reviewing and testing the result.

## Pages

| Page | What it shows |
|---|---|
| Home | Hero with a particle canvas, animated metrics, principles, previews of the other sections |
| Services | Eight service areas, a page for each, and an interactive service builder |
| Engagements | A rotating globe and project filters by industry, type of work and country |
| Team | Fictional people shown as monograms, not photos |
| Publications | Three demo articles |
| Careers | What the company offers, who it looks for, the hiring process, and an application form |
| Self-assessment | A 15-question quiz with a radar chart and suggested services |
| Contact | A contact form with field validation |

## Interactive parts

- **Service builder.** Pick service areas and it builds a combined list of work stages.
- **Project filter.** Three filter groups and a count of matching projects.
- **Globe.** An orthographic projection on canvas with real country outlines
  (Natural Earth 110m). It can be rotated with a mouse or a finger and turns
  to a country on hover.
- **Self-assessment quiz.** Fifteen questions across five dimensions, shown as a radar chart.
  Answers stay in localStorage and are not sent anywhere.

The forms check their fields and show a result but send nothing: this is a demo.

## Run locally

```bash
npm install
npm run dev
```

Opens at http://localhost:3000. The root redirects to `/ru` or `/en`
depending on the browser language. The site is deployed to GitHub Pages
by `.github/workflows/pages.yml` on every push to `main`.

---

# Сайт консалтинговой компании

Многостраничный сайт на Next.js 16, TypeScript, Tailwind v4 и Motion.
Два языка, тёмная тема, 38 страниц (по 19 на каждом языке).

Компания условная. Сайт сделан как демонстрация вёрстки и
интерфейса: названия, цифры, клиенты, сотрудники и проекты обобщённые
и ни к какой реальной организации не относятся.

Сайт сделан с помощью [Claude Code](https://claude.com/claude-code):
код написал Claude Code. Моя роль — идея, требования, решения по
дизайну и содержанию, проверка результата.

---

## Страницы

| Страница | Что показывает |
|---|---|
| Главная | Первый экран с полем частиц на canvas, показатели со счётчиками, принципы, превью остальных разделов |
| Услуги | Восемь направлений, отдельная страница для каждого, конструктор состава работ |
| Проекты | Вращающийся глобус, фильтр по отрасли, типу работы и стране |
| Команда | Условные сотрудники, монограммы вместо фотографий |
| Публикации | Три демонстрационные статьи |
| Соискателям | Что предлагает компания, кого ищет, как проходит отбор, форма отклика |
| Диагностика | 15 вопросов, радар по пяти измерениям, подбор услуг |
| Контакты | Форма с проверкой полей |

### Интерактив

- **Конструктор состава работ.** Отмечаете направления — внизу
  собирается общий список этапов и их количество.
- **Фильтр проектов.** Три группы фильтров, счётчик показанных карточек.
- **Глобус.** Ортографическая проекция на canvas с реальными контурами
  материков (Natural Earth 110m). Крутится мышью и пальцем, при
  наведении на страну доворачивает к ней.
- **Диагностика.** Пятнадцать вопросов, результат в виде радара.
  Ответы хранятся в localStorage и никуда не отправляются.

Формы проверяют заполнение и показывают результат, но ничего не
отправляют: это демонстрация.

---

## Запуск

```bash
npm install
npm run dev
```

Откроется на http://localhost:3000, корень перекинет на `/ru` или `/en`
по языку браузера.

---

## Где править тексты

Всё содержание лежит в `src/content/`. Каждое значение записано сразу
на двух языках: `{ ru: "…", en: "…" }`.

| Файл | Что внутри |
|---|---|
| `site.ts` | Бренд, меню, первый экран, показатели, принципы, подвал, SEO |
| `services.ts` | Восемь услуг и состав работ по каждой |
| `engagements.ts` | Проекты, справочники отраслей и стран, координаты для глобуса |
| `diagnostic.ts` | Вопросы диагностики и толкование результата |
| `forms.ts` | Подписи полей формы |
| `clients.ts` | Условные клиенты для стены логотипов |
| `team.ts` | Условные сотрудники |
| `insights.ts` | Публикации |
| `careers.ts` | Страница для соискателей |

Подпись автора выводится в подвале. Впишите имя и ссылку в
`footer.credit` в `site.ts` — строка появится; пока поле пустое, её нет.

---

## Сборка

| Переменная | Что делает |
|---|---|
| `STATIC_EXPORT=1` | Собрать статику в `out/` |
| `NOINDEX=1` | Закрыть от поисковиков: `Disallow: /` и `noindex` |
| `BASE_PATH` | Префикс, если сайт лежит в подпапке |
| `SITE_URL` | Адрес для canonical и карты сайта |

```bash
npm run build         # серверный режим
npm run build:pages   # то же, что собирает GitHub Actions
npm run build:prod    # боевой режим
```

Сайт пересобирается сам при `git push` в ветку `main`
(`.github/workflows/pages.yml`). Адрес и префикс путей workflow берёт
из имени репозитория, поэтому после переименования репозитория ничего
править не нужно.

---

## Устройство

- Корневой макет лежит под сегментом `src/app/[locale]/layout.tsx`,
  языки разведены по адресу.
- `proxy.ts` выбирает язык по заголовкам браузера в серверном режиме;
  в статике то же делает `public/index.html`.
- Пункты меню — ссылки на страницы. Активный пункт подсвечивается
  по текущему адресу.
- Блоки проявляются при прокрутке. Те, что при загрузке оказались выше
  экрана (переход по якорю, перезагрузка в середине страницы),
  показываются сразу — иначе остались бы невидимыми.
- Счётчики отдают конечное значение в HTML и анимируются только при
  попадании в поле зрения, чтобы в разметке не было нулей.
