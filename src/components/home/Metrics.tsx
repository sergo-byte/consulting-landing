import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { metrics } from "@/content/site";
import { t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Metrics({ locale }: { locale: Locale }) {
  return (
    <section className="border-y border-line bg-ink-900/40">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {metrics.map((m, i) => {
            // Пятый показатель заканчивает неполный ряд: растягиваем его
            // на остаток, иначе граница справа уходит в пустоту.
            const last = i === metrics.length - 1;

            return (
            <Reveal
              key={i}
              delay={i * 0.07}
              className={cn(
                "border-b border-line px-5 py-10 md:px-7 md:py-14 lg:border-b-0",
                i % 2 === 0 && "border-r",
                "md:border-r lg:last:border-r-0",
                i >= 3 && "md:border-b-0",
                last && "col-span-2 border-r-0 md:col-span-2 md:border-r-0 lg:col-span-1",
              )}
            >
              <div className="flex items-baseline">
                <Counter
                  to={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  className="tnum font-display text-[2.75rem] leading-none tracking-tight text-fog-50 md:text-6xl"
                />
              </div>

              <div className="mt-4 text-sm leading-snug text-fog-200">
                {t(m.label, locale)}
              </div>

              <div className="mt-3 font-mono text-[0.625rem] leading-relaxed tracking-[0.08em] text-fog-600 uppercase">
                {t(m.note, locale)}
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
