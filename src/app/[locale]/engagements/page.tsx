import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Globe } from "@/components/engagements/Globe";
import { EngagementExplorer } from "@/components/engagements/EngagementExplorer";
import { Reveal } from "@/components/ui/Reveal";
import { engagementsPage } from "@/content/engagements";
import { isLocale, locales, t, type Locale } from "@/lib/i18n";

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
    title: t(engagementsPage.title, l),
    description: t(engagementsPage.lede, l),
    alternates: { canonical: `/${l}/engagements` },
  };
}

export default async function EngagementsPage({
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
        eyebrow={t(engagementsPage.eyebrow, locale)}
        title={
          locale === "ru"
            ? "Отрасли, задачи\nи география"
            : "Sectors, tasks\nand geography"
        }
        lede={t(engagementsPage.lede, locale)}
      />

      <section className="py-16 md:py-20">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-xl">
              <Globe locale={locale} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-page">
          <EngagementExplorer locale={locale} />
        </div>
      </section>
    </>
  );
}
