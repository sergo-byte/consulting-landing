import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { contactPage } from "@/content/forms";
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
    title: t(contactPage.title, l),
    description: t(contactPage.lede, l),
    alternates: { canonical: `/${l}/contact` },
  };
}

export default async function ContactPage({
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
        eyebrow={t(contactPage.eyebrow, locale)}
        title={locale === "ru" ? "Опишите\nзадачу" : "Describe\nthe task"}
        lede={t(contactPage.lede, locale)}
      />

      <section className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <Eyebrow index="01">{t(contactPage.directTitle, locale)}</Eyebrow>
            <ol className="mt-7 border-t border-line">
              {tList(contactPage.directItems, locale).map((line, i) => (
                <li
                  key={i}
                  className="flex gap-5 border-b border-line py-4 text-[0.9375rem] leading-relaxed text-fog-200 text-pretty"
                >
                  <span className="shrink-0 font-mono text-[0.625rem] text-signal-400">
                    {pad(i + 1)}
                  </span>
                  {line}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow index="02">{t(contactPage.formTitle, locale)}</Eyebrow>
            <div className="mt-7">
              <ContactForm locale={locale} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
