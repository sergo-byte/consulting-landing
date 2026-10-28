import { Hero } from "@/components/home/Hero";
import { Metrics } from "@/components/home/Metrics";
import { Principles } from "@/components/home/Principles";
import { ScopeBuilder } from "@/components/expertise/ScopeBuilder";
import { EngagementExplorer } from "@/components/engagements/EngagementExplorer";
import { Globe } from "@/components/engagements/Globe";
import { Diagnostic } from "@/components/diagnostic/Diagnostic";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { engagementsPage } from "@/content/engagements";
import { expertiseIntro } from "@/content/services";
import { t, type Locale } from "@/lib/i18n";

/**
 * Лендинг. Весь сайт — одна страница; пункты меню ведут к секциям,
 * у каждой из них есть id, по которому её находит и шапка, и ссылка.
 */
export default async function Landing({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const ru = locale === "ru";

  return (
    <>
      <Hero locale={locale} />
      <Metrics locale={locale} />
      <Principles locale={locale} />

      <section
        id="services"
        className="scroll-mt-24 border-t border-line py-24 md:py-32 lg:py-40"
      >
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow={t(expertiseIntro.eyebrow, locale)}
              title={t(expertiseIntro.title, locale)}
              body={t(expertiseIntro.body, locale)}
            />
          </Reveal>
          <div className="mt-16">
            <ScopeBuilder locale={locale} />
          </div>
        </div>
      </section>

      <section
        id="work"
        className="scroll-mt-24 border-t border-line py-24 md:py-32 lg:py-40"
      >
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                index="03"
                eyebrow={t(engagementsPage.eyebrow, locale)}
                title={t(engagementsPage.title, locale)}
                body={t(engagementsPage.lede, locale)}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Globe locale={locale} />
            </Reveal>
          </div>
          <div className="mt-20">
            <EngagementExplorer locale={locale} />
          </div>
        </div>
      </section>

      <section
        id="diagnostic"
        className="scroll-mt-24 border-t border-line py-24 md:py-32 lg:py-40"
      >
        <div className="container-page">
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow={ru ? "Диагностика" : "Diagnostic"}
              title={
                ru
                  ? "Пятнадцать вопросов о вашей стратегии"
                  : "Fifteen questions about your strategy"
              }
              body={
                ru
                  ? "Ответы складываются в профиль по пяти измерениям и показывают, где у компании тоньше всего. Ничего никуда не отправляется: результат остаётся в браузере."
                  : "The answers build a profile across five dimensions and show where the company is thinnest. Nothing is sent anywhere: the result stays in your browser."
              }
            />
          </Reveal>
          <div className="mt-16">
            <Diagnostic locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
