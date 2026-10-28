import { ExpertiseList } from "./ExpertiseList";
import { ArrowLink, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { expertiseIntro } from "@/content/services";
import { ui } from "@/content/site";
import { href, t, type Locale } from "@/lib/i18n";

export function ExpertisePreview({ locale }: { locale: Locale }) {
  return (
    <section className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow={t(expertiseIntro.eyebrow, locale)}
            title={t(expertiseIntro.title, locale)}
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <ExpertiseList locale={locale} />
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <ArrowLink href={href("/expertise", locale)}>
            {t(ui.allExpertise, locale)}
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
