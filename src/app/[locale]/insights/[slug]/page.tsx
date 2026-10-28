import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, NextLink } from "@/components/site/PageHero";
import { Eyebrow, Tag } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getInsight, insights, insightsPage } from "@/content/insights";
import { isLocale, locales, t, tList, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    insights.map((i) => ({ locale, slug: i.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l: Locale = isLocale(locale) ? locale : "ru";
  const item = getInsight(slug);
  if (!item) return {};
  return {
    title: t(item.title, l),
    description: t(item.excerpt, l),
    alternates: { canonical: `/${l}/insights/${slug}` },
    openGraph: { type: "article", publishedTime: item.date },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = getInsight(slug);
  if (!item) notFound();

  const index = insights.findIndex((i) => i.slug === slug);
  const next = insights[(index + 1) % insights.length];

  return (
    <>
      <PageHero
        locale={locale}
        index={pad(index + 1)}
        eyebrow={t(item.topic, locale)}
        title={t(item.title, locale)}
        breadcrumb={{
          label: t(insightsPage.eyebrow, locale),
          path: "/insights",
        }}
      />

      <article className="py-20 md:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[0.45fr_1.55fr] lg:gap-20">
          <Reveal>
            <aside className="flex flex-col gap-8 lg:sticky lg:top-32">
              <div>
                <Tag tone="signal">{t(item.topic, locale)}</Tag>
                <p className="mt-5 font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase tnum">
                  {item.date} · {item.readMinutes}{" "}
                  {t(insightsPage.readLabel, locale)}
                </p>
              </div>

              <div>
                <Eyebrow>{t(insightsPage.methodLabel, locale)}</Eyebrow>
                <ol className="mt-5 border-t border-line">
                  {tList(item.method, locale).map((line, i) => (
                    <li
                      key={i}
                      className="flex gap-4 border-b border-line py-3 text-[0.8125rem] leading-relaxed text-fog-400"
                    >
                      <span className="font-mono text-[0.5625rem] text-signal-400">
                        {pad(i + 1)}
                      </span>
                      {line}
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="border-l-2 border-gold-400 pl-6 text-[1.125rem] leading-relaxed text-fog-200 text-pretty">
                {t(item.excerpt, locale)}
              </p>

              <div className="mt-12 flex flex-col gap-7">
                {tList(item.body, locale).map((para, i) => (
                  <p
                    key={i}
                    className="max-w-2xl text-[1.0625rem] leading-[1.75] text-fog-200 text-pretty"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-16 border border-line bg-ink-900/60 p-8 md:p-10">
                <Eyebrow index="→">
                  {t(insightsPage.findingsLabel, locale)}
                </Eyebrow>
                <ul className="mt-7 flex flex-col gap-5">
                  {tList(item.findings, locale).map((line, i) => (
                    <li
                      key={i}
                      className="flex gap-5 text-[1rem] leading-relaxed text-fog-50 text-pretty"
                    >
                      <span className="mt-2.5 h-1 w-4 shrink-0 bg-gold-400" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <NextLink
        locale={locale}
        label={t(insightsPage.nextLabel, locale)}
        title={t(next.title, locale)}
        path={`/insights/${next.slug}`}
      />
    </>
  );
}
