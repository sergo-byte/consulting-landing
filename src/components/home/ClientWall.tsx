"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { clients, clientsSection } from "@/content/clients";
import { t, type Locale } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Стена клиентов. Вместо чужих логотипов — типографские знаки:
 * монограмма в рамке, название под ней, отрасль по наведению.
 */
export function ClientWall({ locale }: { locale: Locale }) {
  return (
    <section className="border-t border-line py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow={t(clientsSection.eyebrow, locale)}
            title={t(clientsSection.title, locale)}
            body={t(clientsSection.body, locale)}
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.05, ease: EASE }}
              className="group relative -mr-px -mb-px flex flex-col items-center justify-center gap-4 border border-line px-4 py-10 transition-colors duration-500 hover:bg-ink-900"
            >
              <span className="flex h-14 w-14 items-center justify-center border border-line-strong font-display text-[1.125rem] tracking-tight text-fog-400 transition-colors duration-500 group-hover:border-gold-400/50 group-hover:text-gold-200">
                {c.mark}
              </span>

              <span className="text-center text-[0.875rem] leading-snug text-fog-200">
                {t(c.name, locale)}
              </span>

              <span className="absolute bottom-3 font-mono text-[0.5625rem] tracking-[0.12em] text-fog-600 uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {t(c.industry, locale)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
