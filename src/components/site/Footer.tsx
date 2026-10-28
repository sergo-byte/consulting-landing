import Link from "next/link";
import { LogoMark } from "./Logo";
import { ContactForm } from "@/components/forms/ContactForm";
import { Eyebrow } from "@/components/ui/Primitives";
import { brand, footer, nav } from "@/content/site";
import { href, t, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const credit = footer.credit;

  return (
    <footer
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-ink-900"
    >
      <div className="container-page py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <Eyebrow>{t(footer.contactLead, locale)}</Eyebrow>
            <h2 className="display-lg mt-8 max-w-xl text-balance">
              {t(footer.ctaTitle, locale)}
            </h2>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-fog-400 text-pretty">
              {t(footer.ctaBody, locale)}
            </p>

            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              {nav.map((item) => (
                <li key={item.path}>
                  <Link
                    href={href(item.path, locale)}
                    className="font-mono text-[0.6875rem] tracking-[0.14em] text-fog-400 uppercase transition-colors duration-400 hover:text-fog-50"
                  >
                    {t(item.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm locale={locale} />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-5 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <LogoMark className="h-8 w-8 text-fog-600" />
            <span className="font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase">
              {t(footer.legal, locale)}
            </span>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <p className="max-w-xl text-[0.6875rem] leading-relaxed text-fog-600">
              {t(brand.demo, locale)}
            </p>
            {credit.name && (
              <p className="font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase">
                {t(credit.role, locale)} ·{" "}
                {credit.url ? (
                  <a
                    href={credit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fog-400 transition-colors duration-400 hover:text-gold-400"
                  >
                    {credit.name}
                  </a>
                ) : (
                  <span className="text-fog-400">{credit.name}</span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
