"use client";

import { motion } from "motion/react";
import { HeroCanvas } from "./HeroCanvas";
import { ButtonLink } from "@/components/ui/Primitives";
import { RevealLines } from "@/components/ui/Reveal";
import { brand, hero } from "@/content/site";
import { t, type Locale } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ locale }: { locale: Locale }) {
  const lines = hero.headline[locale];

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32 pb-10">
      {/* Слои фона */}
      <div className="absolute inset-0 grid-veil opacity-60" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        <HeroCanvas />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-950 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-signal-500/8 blur-[140px]"
      />

      {/* Вертикальная подпись у левого края */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-6 hidden -translate-y-1/2 xl:block"
      >
        <span className="block origin-left -rotate-90 font-mono text-[0.5625rem] tracking-[0.4em] whitespace-nowrap text-fog-600 uppercase">
          {brand.name}
        </span>
      </div>

      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          {t(hero.eyebrow, locale)}
        </motion.div>

        <h1 className="display-xl mt-8 max-w-[19ch]">
          <RevealLines
            delay={0.15}
            lines={lines.map((line, i) =>
              line.accent ? (
                <em key={i} className="text-gold-400 italic">
                  {line.text}
                </em>
              ) : (
                <span key={i}>{line.text}</span>
              ),
            )}
          />
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
            className="max-w-2xl text-[1.0625rem] leading-relaxed text-fog-400 text-pretty md:text-lg"
          >
            {t(hero.lede, locale)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease: EASE }}
            className="flex flex-wrap gap-3"
          >
            <ButtonLink href="#diagnostic" variant="gold">
              {t(hero.primaryCta, locale)}
            </ButtonLink>
            <ButtonLink href="#services" variant="ghost">
              {t(hero.secondaryCta, locale)}
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 flex items-center gap-4 border-t border-line pt-6"
        >
          <span className="eyebrow">{t(hero.scrollHint, locale)}</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-px bg-gradient-to-b from-fog-600 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
