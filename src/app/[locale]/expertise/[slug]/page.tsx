import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, NextLink } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { getService, services, expertiseIntro } from "@/content/services";
import { ui } from "@/content/site";
import { isLocale, locales, t, tList, type Locale } from "@/lib/i18n";
import { pad, plural } from "@/lib/utils";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l: Locale = isLocale(locale) ? locale : "ru";
  const service = getService(slug);
  if (!service) return {};
  return {
    title: t(service.title, l),
    description: t(service.summary, l),
    alternates: { canonical: `/${l}/expertise/${slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const scope = tList(service.scope, locale);
  const index = services.findIndex((s) => s.slug === slug);
  const next = services[(index + 1) % services.length];

  return (
    <>
      <PageHero
        locale={locale}
        index={pad(index + 1)}
        eyebrow={t(service.title, locale)}
        title={t(service.title, locale)}
        lede={t(service.summary, locale)}
        breadcrumb={{
          label: t(expertiseIntro.eyebrow, locale),
          path: "/expertise",
        }}
      />

      <section className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <Eyebrow index="01">{t(ui.scope, locale)}</Eyebrow>
              <p className="mt-6 font-display text-6xl leading-none text-gold-400 tnum">
                {scope.length}
              </p>
              <p className="mt-3 font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase">
                {plural(scope.length, "step", locale)}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="border-t border-line">
              {scope.map((line, i) => (
                <li
                  key={i}
                  className="flex gap-6 border-b border-line py-5 text-[1rem] leading-relaxed text-fog-200 text-pretty"
                >
                  <span className="shrink-0 font-mono text-[0.6875rem] text-signal-400">
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
            <Eyebrow index="02">
              {locale === "ru" ? "Обсудить" : "Get in touch"}
            </Eyebrow>
            <h2 className="display-sm mt-6 max-w-md text-balance">
              {locale === "ru"
                ? "Расскажите, на каком решении вы застряли"
                : "Tell us which decision you are stuck on"}
            </h2>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-fog-400 text-pretty">
              {locale === "ru"
                ? "Ответим, чем это лечится, сколько занимает и что потребуется с вашей стороны."
                : "We will say what it takes to unstick it, how long it takes and what we need from you."}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm
              locale={locale}
              meta={`${t(service.title, locale)}`}
            />
          </Reveal>
        </div>
      </section>

      <NextLink
        locale={locale}
        label={locale === "ru" ? "Следующая услуга" : "Next service"}
        title={t(next.title, locale)}
        path={`/expertise/${next.slug}`}
      />
    </>
  );
}
