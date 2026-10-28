import { ButtonLink, Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { diagnosticPage, dimensions } from "@/content/diagnostic";
import { href, t, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

export function DiagnosticCta({ locale }: { locale: Locale }) {
  const ru = locale === "ru";
  const questions = dimensions.reduce((n, d) => n + d.questions.length, 0);

  return (
    <section className="border-t border-line bg-ink-900/40 py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
          <Reveal>
            <Eyebrow index="07">{t(diagnosticPage.eyebrow, locale)}</Eyebrow>
            <h2 className="display-md mt-6 max-w-2xl text-balance">
              {ru
                ? "Пятнадцать вопросов о вашей стратегии"
                : "Fifteen questions about your strategy"}
            </h2>
            <p className="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-fog-400 text-pretty">
              {ru
                ? "Ответы складываются в профиль по пяти измерениям и показывают, где у компании тоньше всего. Ничего никуда не отправляется: результат остаётся в браузере."
                : "The answers build a profile across five dimensions and show where the company is thinnest. Nothing is sent anywhere: the result stays in your browser."}
            </p>
            <div className="mt-10">
              <ButtonLink href={href("/diagnostic", locale)} variant="gold">
                {ru ? "Пройти диагностику" : "Run the diagnostic"}
              </ButtonLink>
            </div>
            <p className="mt-6 font-mono text-[0.625rem] tracking-[0.12em] text-fog-600 uppercase tnum">
              {questions} {ru ? "вопросов" : "questions"} · {ru ? "около 6 минут" : "about 6 minutes"} ·{" "}
              {ru ? "без регистрации" : "no sign-up"}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="border-t border-line">
              {dimensions.map((d, i) => (
                <li
                  key={d.id}
                  className="flex gap-6 border-b border-line py-5"
                >
                  <span className="font-mono text-[0.625rem] text-signal-400">
                    {pad(i + 1)}
                  </span>
                  <span>
                    <span className="block font-display text-[1.125rem] leading-tight tracking-tight text-fog-50">
                      {t(d.title, locale)}
                    </span>
                    <span className="mt-2 block text-[0.875rem] leading-relaxed text-fog-400 text-pretty">
                      {t(d.description, locale)}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
