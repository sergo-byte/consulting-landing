"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { EngagementCard } from "./EngagementCard";
import {
  engagements,
  engagementsPage,
  functionLabels,
  geoLabels,
  industryLabels,
  type FunctionKey,
  type GeoKey,
  type IndustryKey,
} from "@/content/engagements";
import { ui } from "@/content/site";
import { t, type Locale } from "@/lib/i18n";
import { cn, plural } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Filters = {
  industry: IndustryKey | null;
  fn: FunctionKey | null;
  geo: GeoKey | null;
};

export function EngagementExplorer({ locale }: { locale: Locale }) {
  const [filters, setFilters] = useState<Filters>({
    industry: null,
    fn: null,
    geo: null,
  });

  /** Показываем только те значения, что реально встречаются в данных. */
  const available = useMemo(() => {
    const ind = new Set<IndustryKey>();
    const fns = new Set<FunctionKey>();
    const geos = new Set<GeoKey>();
    for (const e of engagements) {
      e.industries.forEach((k) => ind.add(k));
      e.functions.forEach((k) => fns.add(k));
      e.geo.forEach((k) => geos.add(k));
    }
    return {
      industries: [...ind],
      functions: [...fns],
      geos: [...geos],
    };
  }, []);

  const filtered = useMemo(
    () =>
      engagements.filter(
        (e) =>
          (!filters.industry || e.industries.includes(filters.industry)) &&
          (!filters.fn || e.functions.includes(filters.fn)) &&
          (!filters.geo || e.geo.includes(filters.geo)),
      ),
    [filters],
  );

  const hasFilters = Boolean(filters.industry || filters.fn || filters.geo);

  return (
    <div>
      {/* Панель фильтров */}
      <div className="border-y border-line bg-ink-900/30">
        <div className="container-page py-8">
          <FilterRow
            label={t(engagementsPage.filterIndustry, locale)}
            options={available.industries.map((k) => ({
              key: k,
              label: t(industryLabels[k], locale),
            }))}
            active={filters.industry}
            allLabel={t(ui.filterAll, locale)}
            onSelect={(k) =>
              setFilters((f) => ({ ...f, industry: k as IndustryKey | null }))
            }
          />
          <FilterRow
            label={t(engagementsPage.filterFunction, locale)}
            options={available.functions.map((k) => ({
              key: k,
              label: t(functionLabels[k], locale),
            }))}
            active={filters.fn}
            allLabel={t(ui.filterAll, locale)}
            onSelect={(k) =>
              setFilters((f) => ({ ...f, fn: k as FunctionKey | null }))
            }
          />
          <FilterRow
            label={t(engagementsPage.filterGeo, locale)}
            options={available.geos.map((k) => ({
              key: k,
              label: t(geoLabels[k], locale),
            }))}
            active={filters.geo}
            allLabel={t(ui.filterAll, locale)}
            onSelect={(k) =>
              setFilters((f) => ({ ...f, geo: k as GeoKey | null }))
            }
            last
          />
        </div>
      </div>

      {/* Счётчик */}
      <div className="container-page flex items-center justify-between gap-6 py-8">
        <div className="flex items-baseline gap-3">
          <motion.span
            key={filtered.length}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-display text-4xl text-fog-50 tnum"
          >
            {filtered.length}
          </motion.span>
          <span className="eyebrow">
            {plural(filtered.length, "project", locale)}{" "}
            {t(engagementsPage.countLabel, locale)}
          </span>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={() => setFilters({ industry: null, fn: null, geo: null })}
            className="font-mono text-[0.6875rem] tracking-[0.14em] text-gold-200 uppercase transition-colors duration-300 hover:text-gold-400"
          >
            {t(ui.reset, locale)} ×
          </button>
        )}
      </div>

      {/* Сетка */}
      <div className="container-page pb-24">
        {filtered.length === 0 ? (
          <p className="border border-line py-24 text-center font-mono text-xs tracking-[0.14em] text-fog-600 uppercase">
            {t(ui.nothingFound, locale)}
          </p>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((e) => (
                <motion.div
                  key={e.id}
                  layout
                  className="-mr-px -mb-px"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <EngagementCard
                    engagement={e}
                    index={engagements.indexOf(e) + 1}
                    locale={locale}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function FilterRow({
  label,
  options,
  active,
  allLabel,
  onSelect,
  last = false,
}: {
  label: string;
  options: { key: string; label: string }[];
  active: string | null;
  allLabel: string;
  onSelect: (key: string | null) => void;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 py-4 md:flex-row md:items-baseline md:gap-8",
        !last && "border-b border-line",
      )}
    >
      <span className="eyebrow shrink-0 md:w-28">{label}</span>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <FilterChip active={active === null} onClick={() => onSelect(null)}>
          {allLabel}
        </FilterChip>
        {options.map((o) => (
          <FilterChip
            key={o.key}
            active={active === o.key}
            onClick={() => onSelect(active === o.key ? null : o.key)}
          >
            {o.label}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative py-0.5 font-mono text-[0.6875rem] tracking-[0.1em] uppercase transition-colors duration-300",
        active ? "text-gold-400" : "text-fog-600 hover:text-fog-200",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gold-400 transition-transform duration-500 ease-out-expo",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
    </button>
  );
}
