import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { principles } from "@/content/site";
import { t, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

export function Principles({ locale }: { locale: Locale }) {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow={locale === "ru" ? "Подход" : "Approach"}
            title={
              locale === "ru"
                ? "Как мы работаем"
                : "How we work"
            }
          />
        </Reveal>

        <Stagger className="mt-16 grid gap-px bg-line md:grid-cols-3">
          {principles.map((p, i) => (
            <StaggerItem key={p.id}>
              <div className="group relative h-full overflow-hidden bg-ink-950 p-8 transition-colors duration-600 hover:bg-ink-900 md:p-10">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-px w-0 bg-gold-400 transition-all duration-800 ease-out-expo group-hover:w-full"
                />

                <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600 transition-colors duration-500 group-hover:text-gold-400">
                  {pad(i + 1)}
                </span>

                <h3 className="mt-8 font-display text-[1.625rem] leading-tight tracking-tight text-fog-50 md:text-[1.875rem]">
                  {t(p.title, locale)}
                </h3>

                <p className="mt-5 text-[1rem] leading-relaxed text-fog-400 text-pretty">
                  {t(p.body, locale)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
