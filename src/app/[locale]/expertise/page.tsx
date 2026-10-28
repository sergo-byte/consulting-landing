import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { ScopeBuilder } from "@/components/expertise/ScopeBuilder";
import { expertiseIntro } from "@/content/services";
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
    title: t(expertiseIntro.title, l),
    description: t(expertiseIntro.body, l),
    alternates: { canonical: `/${l}/expertise` },
  };
}

export default async function ExpertisePage({
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
        eyebrow={t(expertiseIntro.eyebrow, locale)}
        title={
          locale === "ru"
            ? "Восемь направлений\nи состав работ\nпо каждому"
            : "Eight services,\nwith the scope\nof work for each"
        }
        lede={t(expertiseIntro.body, locale)}
      />

      <section className="py-20 md:py-28">
        <div className="container-page">
          <ScopeBuilder locale={locale} />
        </div>
      </section>
    </>
  );
}
