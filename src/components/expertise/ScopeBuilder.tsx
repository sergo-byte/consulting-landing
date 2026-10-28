"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Eyebrow } from "@/components/ui/Primitives";
import { expertiseIntro, services } from "@/content/services";
import { t, tList, type Locale } from "@/lib/i18n";
import { cn, pad, plural } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Конструктор состава работ. Отмечаете направления, внизу собирается
 * общий список этапов и их количество.
 */
export function ScopeBuilder({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(services[0].slug);

  const toggle = (slug: string) =>
    setSelected((s) =>
      s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug],
    );

  const chosen = useMemo(
    () => services.filter((s) => selected.includes(s.slug)),
    [selected],
  );

  const totalSteps = chosen.reduce(
    (acc, s) => acc + tList(s.scope, locale).length,
    0,
  );

  const scopeText = chosen
    .map(
      (s) =>
        `${t(s.title, locale)}\n${tList(s.scope, locale)
          .map((line) => `  - ${line}`)
          .join("\n")}`,
    )
    .join("\n\n");

  return (
    <div className="grid gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
      {/* Список направлений */}
      <div className="border-t border-line">
        {services.map((service, i) => {
          const isOpen = expanded === service.slug;
          const isPicked = selected.includes(service.slug);
          const scope = tList(service.scope, locale);

          return (
            <div
              key={service.slug}
              className={cn(
                "border-b border-line transition-colors duration-500",
                isPicked && "bg-ink-900/60",
              )}
            >
              <div className="flex items-start gap-4 py-6 md:gap-6">
                {/* Отметка */}
                <button
                  type="button"
                  onClick={() => toggle(service.slug)}
                  aria-pressed={isPicked}
                  aria-label={t(service.title, locale)}
                  className={cn(
                    "mt-1 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-400",
                    isPicked
                      ? "border-gold-400 bg-gold-400"
                      : "border-line-strong hover:border-fog-400",
                  )}
                >
                  {isPicked && (
                    <svg viewBox="0 0 12 10" className="h-2.5 w-3 fill-none">
                      <path
                        d="M1 5l3.2 3.2L11 1.5"
                        stroke="#05070c"
                        strokeWidth="1.8"
                      />
                    </svg>
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded(isOpen ? null : service.slug)
                    }
                    aria-expanded={isOpen}
                    className="group flex w-full items-baseline gap-4 text-left md:gap-6"
                  >
                    <span
                      className={cn(
                        "font-mono text-[0.6875rem] tracking-[0.16em] transition-colors duration-500",
                        isPicked ? "text-gold-400" : "text-fog-600",
                      )}
                    >
                      {pad(i + 1)}
                    </span>

                    <span className="flex-1">
                      <span className="block font-display text-[1.375rem] leading-tight tracking-tight text-fog-50 md:text-[1.625rem]">
                        {t(service.title, locale)}
                      </span>
                      <span className="mt-2 block text-[0.9375rem] leading-relaxed text-fog-400 text-pretty">
                        {t(service.summary, locale)}
                      </span>
                    </span>

                    <span className="shrink-0 font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase">
                      {scope.length} {plural(scope.length, "step", locale)}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <ol className="mt-6 border-t border-line">
                          {scope.map((line, j) => (
                            <li
                              key={j}
                              className="flex gap-5 border-b border-line py-3.5 text-[0.9375rem] leading-relaxed text-fog-200 text-pretty"
                            >
                              <span className="shrink-0 font-mono text-[0.625rem] text-signal-400">
                                {pad(j + 1)}
                              </span>
                              {line}
                            </li>
                          ))}
                        </ol>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Собранный состав */}
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="border border-line bg-ink-900/40 p-7 md:p-8">
          <Eyebrow>{t(expertiseIntro.builderTitle, locale)}</Eyebrow>

          <div className="mt-6 flex items-baseline gap-3">
            <motion.span
              key={totalSteps}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="font-display text-5xl leading-none text-gold-400 tnum"
            >
              {totalSteps}
            </motion.span>
            <span className="font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase">
              {plural(totalSteps, "step", locale)} · {chosen.length}{" "}
              {plural(chosen.length, "service", locale)}
            </span>
          </div>

          {chosen.length === 0 ? (
            <p className="mt-6 text-[0.875rem] leading-relaxed text-fog-600 text-pretty">
              {t(expertiseIntro.builderEmpty, locale)}
            </p>
          ) : (
            <div className="mt-7 max-h-[26rem] overflow-y-auto pr-1">
              {chosen.map((s) => (
                <div key={s.slug} className="mb-5">
                  <h4 className="font-mono text-[0.625rem] tracking-[0.12em] text-gold-200 uppercase">
                    {t(s.title, locale)}
                  </h4>
                  <ul className="mt-2">
                    {tList(s.scope, locale).map((line, j) => (
                      <li
                        key={j}
                        className="border-b border-line py-2 text-[0.8125rem] leading-relaxed text-fog-400"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {chosen.length > 0 && (
            <details className="group/d mt-6">
              <summary className="cursor-pointer list-none font-mono text-[0.625rem] tracking-[0.14em] text-gold-200 uppercase transition-colors duration-300 hover:text-gold-400">
                {t(expertiseIntro.builderSend, locale)}
              </summary>
              <div className="mt-6">
                <ContactForm locale={locale} meta={scopeText} />
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
