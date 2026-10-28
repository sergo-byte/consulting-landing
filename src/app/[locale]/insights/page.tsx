import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { ArrowIcon, Tag } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { insights, insightsPage } from "@/content/insights";
import { ui } from "@/content/site";
import { href, isLocale, locales, t, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : "ru";
  return {
    title: t(insightsPage.title, l),
    description: t(insightsPage.lede, l),
    alternates: { canonical: `/${l}/insights` },
  };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <PageHero
        locale={locale}
        index="01"
        eyebrow={t(insightsPage.eyebrow, locale)}
        title={
          locale === "ru"
            ? "Что мы разбираем\nмежду проектами"
            : "What we take apart\nbetween projects"
        }
        lede={t(insightsPage.lede, locale)}
      />

      <section className="py-20 md:py-28">
        <div className="container-page">
          {insights.length === 0 ? (
            <p className="text-fog-400">{t(insightsPage.empty, locale)}</p>
          ) : (
            <ol className="border-t border-line">
              {insights.map((item, i) => (
                <Reveal key={item.slug} delay={0.05 * i}>
                  <li>
                    <Link
                      href={href(`/insights/${item.slug}`, locale)}
                      className="group grid gap-5 border-b border-line py-9 transition-colors duration-600 hover:bg-ink-900 md:grid-cols-[4rem_1fr_9rem] md:items-baseline md:gap-8"
                    >
                      <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600">
                        {pad(i + 1)}
                      </span>

                      <span>
                        <span className="flex flex-wrap items-center gap-3">
                          <Tag>{t(item.topic, locale)}</Tag>
                          <span className="font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase tnum">
                            {item.date} · {item.readMinutes}{" "}
                            {t(insightsPage.readLabel, locale)}
                          </span>
                        </span>

                        <span className="mt-4 block font-display text-[1.5rem] leading-tight tracking-tight text-fog-50 transition-colors duration-500 group-hover:text-gold-200 md:text-[1.875rem]">
                          {t(item.title, locale)}
                        </span>
                        <span className="mt-4 block max-w-2xl text-[0.9375rem] leading-relaxed text-fog-400 text-pretty">
                          {t(item.excerpt, locale)}
                        </span>
                      </span>

                      <span className="inline-flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.14em] text-fog-600 uppercase transition-colors duration-400 group-hover:text-gold-400 md:justify-end">
                        {t(ui.readMore, locale)}
                        <ArrowIcon className="h-2 w-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}
