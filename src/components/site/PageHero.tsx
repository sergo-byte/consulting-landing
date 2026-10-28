import Link from "next/link";
import { ArrowIcon, Eyebrow } from "@/components/ui/Primitives";
import { RevealLines, Reveal } from "@/components/ui/Reveal";
import { ui } from "@/content/site";
import { href, t, type Locale } from "@/lib/i18n";

/**
 * Шапка внутренней страницы: хлебная крошка, метка раздела,
 * заголовок построчно и короткое введение.
 */
export function PageHero({
  locale,
  eyebrow,
  title,
  lede,
  index,
  breadcrumb,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  lede?: string;
  index?: string;
  /** Промежуточное звено: раздел, внутри которого лежит страница. */
  breadcrumb?: { label: string; path: string };
}) {
  const lines = title.split("\n");

  return (
    <section className="relative border-b border-line pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container-page">
        <Reveal y={10}>
          <nav
            aria-label={locale === "ru" ? "Хлебные крошки" : "Breadcrumb"}
            className="mb-10 flex flex-wrap items-center gap-2 font-mono text-[0.625rem] tracking-[0.14em] text-fog-600 uppercase"
          >
            <Link
              href={href("/", locale)}
              className="transition-colors duration-400 hover:text-fog-200"
            >
              {t(ui.backHome, locale)}
            </Link>
            {breadcrumb && (
              <>
                <span aria-hidden="true">·</span>
                <Link
                  href={href(breadcrumb.path, locale)}
                  className="transition-colors duration-400 hover:text-fog-200"
                >
                  {breadcrumb.label}
                </Link>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="text-fog-400">{eyebrow}</span>
          </nav>
        </Reveal>

        <Eyebrow index={index}>{eyebrow}</Eyebrow>

        <h1 className="mt-7 max-w-4xl font-display text-[2.25rem] leading-[1.06] tracking-tight text-balance text-fog-50 md:text-[3.25rem] lg:text-[3.75rem]">
          <RevealLines lines={lines} />
        </h1>

        {lede && (
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-fog-400 text-pretty">
              {lede}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/** Переход к следующей странице раздела внизу страницы. */
export function NextLink({
  locale,
  label,
  title,
  path,
}: {
  locale: Locale;
  label: string;
  title: string;
  path: string;
}) {
  return (
    <Link
      href={href(path, locale)}
      className="group block border-t border-line py-12 transition-colors duration-600 hover:bg-ink-900 md:py-16"
    >
      <div className="container-page flex items-end justify-between gap-8">
        <span>
          <span className="eyebrow">{label}</span>
          <span className="mt-3 block font-display text-[1.5rem] leading-tight tracking-tight text-fog-50 transition-colors duration-500 group-hover:text-gold-200 md:text-[2rem]">
            {title}
          </span>
        </span>
        <ArrowIcon className="mb-2 h-3 w-6 shrink-0 text-fog-600 transition-all duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-gold-400" />
      </div>
    </Link>
  );
}
