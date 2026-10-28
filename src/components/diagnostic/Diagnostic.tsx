"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Radar } from "./Radar";
import { ContactForm } from "@/components/forms/ContactForm";
import { ArrowIcon, Eyebrow } from "@/components/ui/Primitives";
import { bands, diagnosticPage, dimensions } from "@/content/diagnostic";
import { getService } from "@/content/services";
import { href, t, tList, type Locale } from "@/lib/i18n";
import { cn, pad, plural } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const STORAGE_KEY = "diagnostic-v1";

type Answers = Record<string, number>;
type Screen = "intro" | "quiz" | "result";

const flatQuestions = dimensions.flatMap((d) =>
  d.questions.map((q) => ({ ...q, dimensionId: d.id })),
);

export function Diagnostic({ locale }: { locale: Locale }) {
  const [screen, setScreen] = useState<Screen>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [restored, setRestored] = useState(false);

  // Восстановление из localStorage возможно только после монтирования:
  // на сервере его нет, и чтение при первом рендере ломает гидратацию.
  // Это тот самый случай, для которого React допускает setState в эффекте.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Answers;
        if (saved && typeof saved === "object") {
          setAnswers(saved);
          if (Object.keys(saved).length >= flatQuestions.length) {
            setScreen("result");
          }
        }
      }
    } catch {
      /* приватный режим — просто работаем без сохранения */
    }
    setRestored(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!restored) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* игнорируем */
    }
  }, [answers, restored]);

  const scores = useMemo(() => {
    return dimensions.map((d) => {
      const max = d.questions.length * 3;
      const sum = d.questions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
      return { id: d.id, value: Math.round((sum / max) * 100) };
    });
  }, [answers]);

  const composite = useMemo(
    () =>
      Math.round(scores.reduce((a, s) => a + s.value, 0) / (scores.length || 1)),
    [scores],
  );

  const band = bands.find((b) => composite < b.max) ?? bands[bands.length - 1];

  const weakest = useMemo(
    () => [...scores].sort((a, b) => a.value - b.value).slice(0, 2),
    [scores],
  );

  const recommended = useMemo(() => {
    const slugs = new Set<string>();
    for (const w of weakest) {
      const dim = dimensions.find((d) => d.id === w.id);
      dim?.services.forEach((s) => slugs.add(s));
    }
    return [...slugs].map(getService).filter(Boolean);
  }, [weakest]);

  const answeredCount = Object.keys(answers).length;
  const question = flatQuestions[step];
  const currentDimension = dimensions.find((d) => d.id === question?.dimensionId);
  const progress = ((step + (answers[question?.id ?? ""] != null ? 1 : 0)) /
    flatQuestions.length) *
    100;

  const select = (score: number) => {
    setAnswers((a) => ({ ...a, [question.id]: score }));
    window.setTimeout(() => {
      if (step < flatQuestions.length - 1) setStep((s) => s + 1);
      else setScreen("result");
    }, 260);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setScreen("intro");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* игнорируем */
    }
  };

  const metaForForm = [
    `${t(diagnosticPage.indexLabel, locale)}: ${composite}/100 (${t(band.label, locale)})`,
    ...scores.map(
      (s, i) => `${t(dimensions[i].title, locale)}: ${s.value}/100`,
    ),
  ].join("\n");

  /* ---------------------------------------------------------- */

  if (screen === "intro") {
    return (
      <div className="container-page pb-24">
        <div className="border border-line bg-ink-900/40 p-8 md:p-14">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Eyebrow index="→">{t(diagnosticPage.meta, locale)}</Eyebrow>

              <ul className="mt-8 border-t border-line">
                {dimensions.map((d, i) => (
                  <li key={d.id} className="border-b border-line py-5">
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-[0.6875rem] text-gold-400">
                        {pad(i + 1)}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.25rem] leading-tight tracking-tight text-fog-50">
                          {t(d.title, locale)}
                        </h3>
                        <p className="mt-2 max-w-lg text-[0.9375rem] leading-relaxed text-fog-400 text-pretty">
                          {t(d.description, locale)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setScreen("quiz")}
                className="group mt-10 inline-flex items-center gap-3 bg-gold-400 px-8 py-4 font-mono text-[0.6875rem] tracking-[0.16em] text-ink-950 uppercase transition-colors duration-500 hover:bg-gold-200"
              >
                {answeredCount > 0
                  ? locale === "ru"
                    ? "Продолжить"
                    : "Continue"
                  : t(diagnosticPage.start, locale)}
                <ArrowIcon className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
              </button>

              <p className="mt-6 max-w-md text-[0.75rem] leading-relaxed text-fog-600">
                {t(diagnosticPage.privacy, locale)}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Radar
                values={[0, 0, 0, 0, 0].map(() => 8)}
                labels={dimensions.map((d) => t(d.axis, locale))}
                className="h-auto w-full max-w-md opacity-40"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------- */

  if (screen === "quiz" && question && currentDimension) {
    return (
      <div className="container-page pb-24">
        <div className="border border-line bg-ink-900/40">
          {/* Прогресс */}
          <div className="relative h-px w-full bg-line">
            <motion.span
              className="absolute inset-y-0 left-0 bg-gold-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-12">
            <span className="eyebrow">
              {pad(step + 1)} / {pad(flatQuestions.length)} ·{" "}
              {t(currentDimension.title, locale)}
            </span>
            <button
              type="button"
              onClick={restart}
              className="font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase transition-colors duration-300 hover:text-fog-200"
            >
              {t(diagnosticPage.restart, locale)}
            </button>
          </div>

          <div className="px-6 py-12 md:px-12 md:py-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h2 className="display-md max-w-3xl text-balance">
                  {t(question.text, locale)}
                </h2>

                <div className="mt-10 flex flex-col gap-px bg-line">
                  {question.options.map((option, i) => {
                    const selected = answers[question.id] === option.score;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => select(option.score)}
                        className={cn(
                          "group flex items-center gap-6 bg-ink-950 px-6 py-5 text-left transition-colors duration-400 hover:bg-ink-800 md:px-8",
                          selected && "bg-ink-800",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-400",
                            selected
                              ? "border-gold-400 bg-gold-400"
                              : "border-line-strong group-hover:border-fog-400",
                          )}
                        >
                          {selected && (
                            <span className="h-1.5 w-1.5 rounded-full bg-ink-950" />
                          )}
                        </span>
                        <span
                          className={cn(
                            "text-[1.0625rem] leading-snug transition-colors duration-400 text-pretty",
                            selected
                              ? "text-fog-50"
                              : "text-fog-200 group-hover:text-fog-50",
                          )}
                        >
                          {t(option.label, locale)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="group inline-flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-fog-400 uppercase transition-colors duration-400 hover:text-fog-50 disabled:opacity-30"
                  >
                    <ArrowIcon className="rotate-180 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1.5" />
                    {t(diagnosticPage.prev, locale)}
                  </button>

                  {answeredCount >= flatQuestions.length && (
                    <button
                      type="button"
                      onClick={() => setScreen("result")}
                      className="group inline-flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-gold-200 uppercase transition-colors duration-400 hover:text-gold-400"
                    >
                      {t(diagnosticPage.seeResult, locale)}
                      <ArrowIcon className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------- */

  return (
    <div className="container-page pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="border border-line bg-ink-900/40"
      >
        {/* Профиль */}
        <div className="grid gap-12 border-b border-line p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 md:p-14">
          <div className="flex flex-col justify-center">
            <Eyebrow index="→">{t(diagnosticPage.resultTitle, locale)}</Eyebrow>

            <div className="mt-8 flex items-baseline gap-5">
              <span className="font-display text-7xl leading-none text-gold-400 tnum md:text-8xl">
                {composite}
              </span>
              <span className="max-w-[9rem] font-mono text-[0.625rem] leading-relaxed tracking-[0.12em] text-fog-600 uppercase">
                {t(diagnosticPage.indexLabel, locale)} / 100
              </span>
            </div>

            <h2 className="display-md mt-8">{t(band.label, locale)}</h2>
            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-fog-400 text-pretty">
              {t(band.body, locale)}
            </p>

            <button
              type="button"
              onClick={restart}
              className="mt-8 self-start font-mono text-[0.625rem] tracking-[0.14em] text-fog-600 uppercase transition-colors duration-300 hover:text-fog-200"
            >
              {t(diagnosticPage.restart, locale)}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <Radar
              values={scores.map((s) => s.value)}
              labels={dimensions.map((d) => t(d.axis, locale))}
              className="h-auto w-full max-w-lg"
            />
          </div>
        </div>

        {/* Разбор по осям */}
        <div className="p-8 md:p-14">
          <Eyebrow index="01">
            {locale === "ru" ? "Разбор по измерениям" : "Dimension breakdown"}
          </Eyebrow>

          <div className="mt-8 border-t border-line">
            {dimensions.map((d, i) => {
              const value = scores[i].value;
              const isWeak = weakest.some((w) => w.id === d.id);
              return (
                <div
                  key={d.id}
                  className="grid items-center gap-4 border-b border-line py-6 md:grid-cols-[1fr_2fr_auto] md:gap-10"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[0.6875rem] text-fog-600">
                      {pad(i + 1)}
                    </span>
                    <span
                      className={cn(
                        "text-[1.0625rem]",
                        isWeak ? "text-gold-200" : "text-fog-200",
                      )}
                    >
                      {t(d.title, locale)}
                    </span>
                  </div>

                  <div className="h-px w-full bg-line">
                    <motion.div
                      className={cn(
                        "h-px",
                        isWeak ? "bg-gold-400" : "bg-signal-400",
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: EASE }}
                    />
                  </div>

                  <span className="font-mono text-sm text-fog-50 tnum">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Рекомендации */}
          <div className="mt-14">
            <Eyebrow index="02">
              {t(diagnosticPage.recommendedLabel, locale)}
            </Eyebrow>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((service) =>
                service ? (
                  <Link
                    key={service.slug}
                    href={href(`/expertise/${service.slug}`, locale)}
                    className="group -mr-px -mb-px border border-line bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-800"
                  >
                    <h3 className="font-display text-[1.25rem] leading-tight tracking-tight text-fog-50 transition-colors duration-500 group-hover:text-gold-200">
                      {t(service.title, locale)}
                    </h3>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-fog-400 text-pretty">
                      {t(service.summary, locale)}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.14em] text-fog-600 uppercase transition-colors duration-400 group-hover:text-gold-400">
                      {tList(service.scope, locale).length}{" "}
                      {plural(tList(service.scope, locale).length, "step", locale)}
                      <ArrowIcon className="h-2 w-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
                    </span>
                  </Link>
                ) : null,
              )}
            </div>
          </div>

          {/* Отправка результата */}
          <div className="mt-16 border border-line bg-ink-950 p-8 md:p-12">
            <h2 className="display-md">{t(diagnosticPage.discussTitle, locale)}</h2>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-fog-400 text-pretty">
              {t(diagnosticPage.discussBody, locale)}
            </p>

            <pre className="mt-8 overflow-x-auto border border-line bg-ink-900/60 p-5 font-mono text-[0.6875rem] leading-relaxed text-fog-400">
              {metaForForm}
            </pre>

            <ContactForm
              locale={locale}
              variant="diagnostic"
              meta={metaForForm}
              className="mt-10"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
