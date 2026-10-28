"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowIcon } from "@/components/ui/Primitives";
import { services } from "@/content/services";
import { href, t, tList, type Locale } from "@/lib/i18n";
import { cn, pad, plural } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Список направлений: строка подсвечивается целиком при наведении. */
export function ExpertiseList({ locale }: { locale: Locale }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="border-t border-line" onMouseLeave={() => setHovered(null)}>
      {services.map((service, i) => {
        const steps = tList(service.scope, locale).length;
        const active = hovered === i;

        return (
          <Link
            key={service.slug}
            href={href(`/expertise/${service.slug}`, locale)}
            onMouseEnter={() => setHovered(i)}
            className="group relative block border-b border-line"
          >
            {active && (
              <motion.span
                layoutId="expertise-hover"
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0 bg-ink-900"
              />
            )}

            <span className="relative flex flex-col gap-3 py-7 md:flex-row md:items-baseline md:gap-8 md:py-8">
              <span
                className={cn(
                  "shrink-0 font-mono text-[0.6875rem] tracking-[0.16em] transition-colors duration-500 md:w-12",
                  active ? "text-gold-400" : "text-fog-600",
                )}
              >
                {pad(i + 1)}
              </span>

              <span
                className={cn(
                  "font-display text-[1.5rem] leading-tight tracking-tight transition-colors duration-500 md:w-[19rem] md:shrink-0 md:text-[1.75rem]",
                  active ? "text-gold-200" : "text-fog-50",
                )}
              >
                {t(service.title, locale)}
              </span>

              <span className="flex-1 pl-12 text-[0.9375rem] leading-relaxed text-fog-400 text-pretty md:pl-0">
                {t(service.summary, locale)}
              </span>

              <span className="hidden shrink-0 items-center gap-4 pr-2 md:flex">
                <span className="font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase">
                  {steps} {plural(steps, "step", locale)}
                </span>
                <ArrowIcon
                  className={cn(
                    "h-2.5 w-4 transition-all duration-500 ease-out-expo",
                    active ? "translate-x-1 text-gold-400" : "translate-x-0 text-fog-600",
                  )}
                />
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
