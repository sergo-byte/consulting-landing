import { Globe } from "@/components/engagements/Globe";
import { EngagementCard } from "@/components/engagements/EngagementCard";
import { ArrowLink, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { engagements, engagementsPage } from "@/content/engagements";
import { ui } from "@/content/site";
import { href, t, type Locale } from "@/lib/i18n";

export function EngagementsPreview({ locale }: { locale: Locale }) {
  const featured = engagements.slice(0, 3);

  return (
    <section className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow={t(engagementsPage.eyebrow, locale)}
              title={t(engagementsPage.title, locale)}
              body={t(engagementsPage.lede, locale)}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Globe locale={locale} />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px md:grid-cols-3">
          {featured.map((e, i) => (
            <Reveal key={e.id} delay={0.06 * i}>
              <EngagementCard engagement={e} index={i + 1} locale={locale} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <ArrowLink href={href("/engagements", locale)}>
            {t(ui.allEngagements, locale)}
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
