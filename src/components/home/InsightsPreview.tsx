import Link from "next/link";
import { ArrowIcon, ArrowLink, Eyebrow, Tag } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { insights, insightsPage } from "@/content/insights";
import { ui } from "@/content/site";
import { href, t, type Locale } from "@/lib/i18n";

export function InsightsPreview({ locale }: { locale: Locale }) {
  const [latest, ...rest] = insights;
  if (!latest) return null;

  return (
    <section className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <Reveal>
          <Eyebrow index="06">{t(insightsPage.eyebrow, locale)}</Eyebrow>
          <h2 className="display-md mt-6 max-w-3xl text-balance">
            {t(insightsPage.title, locale)}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <Link
            href={href(`/insights/${latest.slug}`, locale)}
            className="group grid items-start gap-8 border border-line bg-ink-950 p-7 transition-colors duration-600 hover:border-line-strong hover:bg-ink-900 md:grid-cols-[0.35fr_1fr] md:gap-14 md:p-10"
          >
            <span>
              <Tag tone="signal">{t(latest.topic, locale)}</Tag>
              <span className="mt-6 block font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase tnum">
                {latest.date} · {latest.readMinutes} {t(insightsPage.readLabel, locale)}
              </span>
            </span>

            <span>
              <span className="block font-display text-[1.625rem] leading-tight tracking-tight text-fog-50 transition-colors duration-500 group-hover:text-gold-200 md:text-[2.125rem]">
                {t(latest.title, locale)}
              </span>
              <span className="mt-5 block max-w-xl text-[0.9375rem] leading-relaxed text-fog-400 text-pretty">
                {t(latest.excerpt, locale)}
              </span>
              <span className="mt-7 inline-flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.14em] text-fog-600 uppercase transition-colors duration-400 group-hover:text-gold-400">
                {t(ui.readMore, locale)}
                <ArrowIcon className="h-2 w-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-px grid gap-px md:grid-cols-2">
            {rest.map((item, i) => (
              <Reveal key={item.slug} delay={0.06 * i}>
                <Link
                  href={href(`/insights/${item.slug}`, locale)}
                  className="group flex h-full flex-col border border-line p-7 transition-colors duration-600 hover:bg-ink-900"
                >
                  <Tag>{t(item.topic, locale)}</Tag>
                  <span className="mt-6 block font-display text-[1.25rem] leading-tight tracking-tight text-fog-50 transition-colors duration-500 group-hover:text-gold-200">
                    {t(item.title, locale)}
                  </span>
                  <span className="mt-4 block text-[0.875rem] leading-relaxed text-fog-400 text-pretty">
                    {t(item.excerpt, locale)}
                  </span>
                  <span className="mt-auto pt-6 font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase tnum">
                    {item.date}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.15} className="mt-10">
          <ArrowLink href={href("/insights", locale)}>
            {t(ui.allInsights, locale)}
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
