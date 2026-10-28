"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ArrowIcon } from "@/components/ui/Primitives";
import { nav, navCta, brand } from "@/content/site";
import { href, localeLabel, locales, t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (path: string) => {
    const target = href(path, locale);
    return path === "/"
      ? pathname === target || pathname === `${target}/`
      : pathname.startsWith(target);
  };

  /** Тот же путь на другом языке. */
  const swapLocale = (next: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return `/${next}${rest ? `/${rest}` : ""}`;
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-out-expo",
          scrolled
            ? "border-b border-line bg-ink-950/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="container-page">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-700 ease-out-expo",
              scrolled ? "h-16" : "h-20 md:h-24",
            )}
          >
            <Link
              href={href("/", locale)}
              className="group -ml-1 shrink-0"
              aria-label={brand.name}
            >
              <Logo compact={scrolled} locale={locale} />
            </Link>

            <nav className="hidden items-center gap-9 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.path}
                  href={href(item.path, locale)}
                  className={cn(
                    "relative font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors duration-400",
                    isActive(item.path)
                      ? "text-fog-50"
                      : "text-fog-400 hover:text-fog-50",
                  )}
                >
                  {t(item.label, locale)}
                  {isActive(item.path) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-2 left-0 h-px w-full bg-gold-400"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              <div className="hidden items-center gap-1 font-mono text-[0.6875rem] tracking-[0.12em] sm:flex">
                {locales.map((l, i) => (
                  <span key={l} className="flex items-center gap-1">
                    {i > 0 && <span className="text-fog-600">/</span>}
                    <Link
                      href={swapLocale(l)}
                      className={cn(
                        "px-1 transition-colors duration-300",
                        l === locale
                          ? "text-fog-50"
                          : "text-fog-600 hover:text-fog-200",
                      )}
                    >
                      {localeLabel[l]}
                    </Link>
                  </span>
                ))}
              </div>

              <Link
                href={href(navCta.path, locale)}
                className="group/cta hidden items-center gap-2.5 border border-gold-400/40 px-5 py-2.5 font-mono text-[0.6875rem] tracking-[0.14em] text-gold-200 uppercase transition-colors duration-500 hover:border-gold-400 hover:bg-gold-400 hover:text-ink-950 md:inline-flex"
              >
                {t(navCta.label, locale)}
                <ArrowIcon className="transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
                aria-expanded={open}
                className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
              >
                <span
                  className={cn(
                    "h-px w-6 bg-fog-50 transition-all duration-500 ease-out-expo",
                    open && "translate-y-[3px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "h-px w-6 bg-fog-50 transition-all duration-500 ease-out-expo",
                    open && "-translate-y-[3px] -rotate-45",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-ink-950/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-page flex h-full flex-col justify-center pt-20 pb-12">
              <nav className="flex flex-col">
                {[...nav, navCta].map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.06 * i, ease: EASE }}
                    className="border-b border-line"
                  >
                    <Link
                      href={href(item.path, locale)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span
                        className={cn(
                          "font-display text-[2rem] leading-none tracking-tight",
                          item.path === navCta.path
                            ? "text-gold-400 italic"
                            : "text-fog-50",
                        )}
                      >
                        {t(item.label, locale)}
                      </span>
                      <span className="eyebrow">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mt-10 flex items-center justify-between"
              >
                <a
                  href={`mailto:${brand.email}`}
                  className="font-mono text-xs tracking-[0.08em] text-fog-400"
                >
                  {brand.email}
                </a>
                <div className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em]">
                  {locales.map((l, i) => (
                    <span key={l} className="flex items-center gap-2">
                      {i > 0 && <span className="text-fog-600">/</span>}
                      <Link
                        href={swapLocale(l)}
                        onClick={() => setOpen(false)}
                        className={
                          l === locale ? "text-fog-50" : "text-fog-600"
                        }
                      >
                        {localeLabel[l]}
                      </Link>
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
