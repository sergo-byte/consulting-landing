import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { team, teamPage } from "@/content/team";
import { isLocale, locales, t, tList, type Locale } from "@/lib/i18n";
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
    title: t(teamPage.title, l),
    description: t(teamPage.lede, l),
    alternates: { canonical: `/${l}/team` },
  };
}

export default async function TeamPage({
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
        eyebrow={t(teamPage.eyebrow, locale)}
        title={locale === "ru" ? "Кто делает\nработу" : "Who does\nthe work"}
        lede={t(teamPage.lede, locale)}
      />

      {team.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className="scroll-mt-24 border-b border-line py-20 md:py-28"
        >
          <div className="container-page grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <span className="flex h-24 w-24 items-center justify-center border border-line-strong font-display text-[2rem] tracking-tight text-gold-200">
                  {p.mark}
                </span>

                <h2 className="display-sm mt-8">{t(p.name, locale)}</h2>
                <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.14em] text-fog-600 uppercase">
                  {t(p.role, locale)}
                </p>

                <p className="mt-8 font-display text-5xl leading-none text-gold-400 tnum">
                  {p.years}
                </p>
                <p className="mt-2 font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase">
                  {t(teamPage.yearsLabel, locale)}
                </p>

                <p className="mt-8 max-w-xs text-[0.9375rem] leading-relaxed text-fog-400 text-pretty">
                  {t(p.focus, locale)}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-12">
                <Block
                  index="01"
                  label={t(teamPage.backgroundLabel, locale)}
                  items={tList(p.background, locale)}
                />
                <Block
                  index="02"
                  label={t(teamPage.educationLabel, locale)}
                  items={tList(p.education, locale)}
                />
                <Block
                  index="03"
                  label={t(teamPage.projectsLabel, locale)}
                  items={tList(p.projects, locale)}
                  numbered
                />
              </div>
            </Reveal>
          </div>

          <span className="sr-only">{pad(i + 1)}</span>
        </section>
      ))}

      <section className="py-14">
        <div className="container-page">
          <p className="text-[0.75rem] leading-relaxed text-fog-600">
            {t(teamPage.demoNote, locale)}
          </p>
        </div>
      </section>
    </>
  );
}

function Block({
  index,
  label,
  items,
  numbered = false,
}: {
  index: string;
  label: string;
  items: string[];
  numbered?: boolean;
}) {
  return (
    <div>
      <Eyebrow index={index}>{label}</Eyebrow>
      <ul className="mt-6 border-t border-line">
        {items.map((line, i) => (
          <li
            key={i}
            className="flex gap-6 border-b border-line py-4 text-[0.9375rem] leading-relaxed text-fog-200 text-pretty"
          >
            {numbered && (
              <span className="shrink-0 font-mono text-[0.625rem] text-signal-400">
                {pad(i + 1)}
              </span>
            )}
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
