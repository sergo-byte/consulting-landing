import Link from "next/link";
import { ArrowLink, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { team, teamPage } from "@/content/team";
import { href, t, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

export function TeamPreview({ locale }: { locale: Locale }) {
  return (
    <section className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow={t(teamPage.eyebrow, locale)}
            title={t(teamPage.title, locale)}
            body={t(teamPage.lede, locale)}
          />
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p, i) => (
            <Reveal key={p.id} delay={0.06 * i}>
              <Link
                href={href(`/team#${p.id}`, locale)}
                className="group -mr-px -mb-px flex h-full flex-col border border-line p-7 transition-colors duration-600 hover:bg-ink-900"
              >
                <span className="flex items-start justify-between">
                  <span className="flex h-16 w-16 items-center justify-center border border-line-strong font-display text-[1.25rem] text-fog-400 transition-colors duration-500 group-hover:border-gold-400/50 group-hover:text-gold-200">
                    {p.mark}
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-[0.14em] text-fog-600">
                    {pad(i + 1)}
                  </span>
                </span>

                <span className="mt-7 block font-display text-[1.25rem] leading-tight tracking-tight text-fog-50">
                  {t(p.name, locale)}
                </span>
                <span className="mt-2 block font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase">
                  {t(p.role, locale)}
                </span>

                <span className="mt-5 block text-[0.875rem] leading-relaxed text-fog-400 text-pretty">
                  {t(p.focus, locale)}
                </span>

                <span className="mt-auto pt-7 font-mono text-[0.625rem] tracking-[0.12em] text-gold-400 tnum">
                  {p.years} {t(teamPage.yearsLabel, locale)}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <ArrowLink href={href("/team", locale)}>
            {locale === "ru" ? "Вся команда" : "The whole team"}
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
