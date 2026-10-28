import { Tag } from "@/components/ui/Primitives";
import {
  functionLabels,
  geoLabels,
  industryLabels,
  type Engagement,
} from "@/content/engagements";
import { t, type Locale } from "@/lib/i18n";
import { pad } from "@/lib/utils";

export function EngagementCard({
  engagement: e,
  index,
  locale,
}: {
  engagement: Engagement;
  index: number;
  locale: Locale;
}) {
  return (
    <article className="group relative flex h-full flex-col border border-line bg-ink-950 p-7 transition-colors duration-600 hover:border-line-strong hover:bg-ink-900 md:p-8">
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-px w-0 bg-gold-400 transition-all duration-700 ease-out-expo group-hover:w-full"
      />

      <header className="flex items-start justify-between gap-4">
        <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-fog-600">
          {pad(index)}
        </span>
        <span className="text-right font-mono text-[0.5625rem] tracking-[0.12em] text-fog-600 uppercase">
          {t(industryLabels[e.industries[0]], locale)}
        </span>
      </header>

      <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.1em] text-gold-200 uppercase">
        {t(e.client, locale)}
      </p>

      <h3 className="mt-4 flex-1 font-display text-[1.25rem] leading-snug tracking-tight text-fog-50 text-pretty">
        {t(e.text, locale)}
      </h3>

      {e.outcome && (
        <p className="mt-5 border-l border-gold-400 pl-4 text-[0.9375rem] leading-relaxed text-fog-200">
          {t(e.outcome, locale)}
        </p>
      )}

      <footer className="mt-7 flex flex-wrap gap-1.5 border-t border-line pt-5">
        {e.industries.map((k) => (
          <Tag key={k}>{t(industryLabels[k], locale)}</Tag>
        ))}
        {e.functions.map((k) => (
          <Tag key={k} tone="signal">
            {t(functionLabels[k], locale)}
          </Tag>
        ))}
        {e.geo.map((k) => (
          <Tag key={k} tone="gold">
            {t(geoLabels[k], locale)}
          </Tag>
        ))}
      </footer>
    </article>
  );
}
