import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Diagnostic } from "@/components/diagnostic/Diagnostic";
import { diagnosticPage } from "@/content/diagnostic";
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
    title: t(diagnosticPage.title, l),
    description: t(diagnosticPage.lede, l),
    alternates: { canonical: `/${l}/diagnostic` },
  };
}

export default async function DiagnosticPage({
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
        eyebrow={t(diagnosticPage.eyebrow, locale)}
        title={
          locale === "ru"
            ? "Пятнадцать вопросов\nо вашей стратегии"
            : "Fifteen questions\nabout your strategy"
        }
        lede={t(diagnosticPage.lede, locale)}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <Diagnostic locale={locale} />
        </div>
      </section>
    </>
  );
}
