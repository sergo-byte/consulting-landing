import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { brand, seo } from "@/content/site";
import { siteOrigin } from "@/lib/origin";
import {
  isLocale,
  localeHtmlLang,
  locales,
  t,
  type Locale,
} from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#05070c",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : "ru";

  return {
    metadataBase: new URL(siteOrigin),
    title: {
      default: t(seo.title, l),
      template: `%s · ${brand.short}`,
    },
    description: t(seo.description, l),
    keywords: seo.keywords[l],
    applicationName: brand.name,
    alternates: {
      canonical: `/${l}`,
      languages: {
        "ru-RU": "/ru",
        "en-US": "/en",
        "x-default": "/ru",
      },
    },
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: localeHtmlLang[l].replace("-", "_"),
      title: t(seo.title, l),
      description: t(seo.description, l),
      url: `/${l}`,
    },
    twitter: {
      card: "summary_large_image",
      title: t(seo.title, l),
      description: t(seo.description, l),
    },
    robots:
      process.env.NOINDEX === "1"
        ? { index: false, follow: false }
        : { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={localeHtmlLang[locale]} className={fontVariables}>
      <body className="grain antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-fog-50 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-ink-950"
        >
          {locale === "ru" ? "К содержанию" : "Skip to content"}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
