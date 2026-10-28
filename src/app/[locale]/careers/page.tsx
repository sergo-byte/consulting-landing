import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { careersPage } from "@/content/careers";
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
    title: t(careersPage.title, l),
    description: t(careersPage.lede, l),
    alternates: { canonical: `/${l}/careers` },
  };
}

export default async function CareersPage({
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
        eyebrow={t(careersPage.eyebrow, locale)}
        title={
          locale === "ru"
            ? "Работа, по которой\nвидно результат"
            : "Work where the\nresult is visible"
        }
        lede={t(careersPage.lede, locale)}
      />

      <section className="py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <Eyebrow index="01">{t(careersPage.offerTitle, locale)}</Eyebrow>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2">
            {careersPage.offers.map((o, i) => (
              <Reveal key={o.id} delay={0.06 * i}>
                <div className="-mr-px -mb-px h-full border border-line p-8 md:p-10">
                  <span className="font-mono text-[0.625rem] tracking-[0.16em] text-signal-400">
                    {pad(i + 1)}
                  </span>
                  <h2 className="display-sm mt-6">{t(o.title, locale)}</h2>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-fog-400 text-pretty">
                    {t(o.body, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="container-page grid gap-14 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Eyebrow index="02">{t(careersPage.lookingTitle, locale)}</Eyebrow>
            <ul className="mt-7 border-t border-line">
              {tList(careersPage.looking, locale).map((line, i) => (
                <li
                  key={i}
                  className="flex gap-5 border-b border-line py-4 text-[0.9375rem] leading-relaxed text-fog-200 text-pretty"
                >
                  <span className="mt-2.5 h-1 w-3 shrink-0 bg-gold-400" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow index="03">{t(careersPage.processTitle, locale)}</Eyebrow>
            <ol className="mt-7 border-t border-line">
              {tList(careersPage.process, locale).map((line, i) => (
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
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <Eyebrow index="04">{t(careersPage.formTitle, locale)}</Eyebrow>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-fog-400 text-pretty">
              {t(careersPage.formBody, locale)}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm locale={locale} variant="careers" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
