import { cn } from "@/lib/utils";
import { brand } from "@/content/site";
import { t, type Locale } from "@/lib/i18n";

/**
 * Знак: пять узлов на окружности, сходящихся в один центр.
 * Распределённая команда — одно решение.
 */
export function LogoMark({ className }: { className?: string }) {
  const nodes = [0, 1, 2, 3, 4].map((i) => {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return { x: 20 + Math.cos(angle) * 14, y: 20 + Math.sin(angle) * 14 };
  });

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <circle
        cx="20"
        cy="20"
        r="18.25"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.35"
      />
      <circle
        cx="20"
        cy="20"
        r="14"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.18"
      />
      {nodes.map((n, i) => (
        <line
          key={`l-${i}`}
          x1={n.x}
          y1={n.y}
          x2="20"
          y2="20"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.45"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={`n-${i}`} cx={n.x} cy={n.y} r="1.7" fill="currentColor" />
      ))}
      <circle cx="20" cy="20" r="3" className="fill-gold-400" />
    </svg>
  );
}

export function Logo({
  className,
  compact = false,
  locale = "ru",
}: {
  className?: string;
  compact?: boolean;
  locale?: Locale;
}) {
  const words = t(brand.tagline, locale).split(" ");

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-9 w-9 text-fog-50 transition-transform duration-700 ease-out-expo group-hover:rotate-[72deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.2rem] tracking-tight text-fog-50 md:text-[1.35rem]">
          {words[0]}
        </span>
        {!compact && words.length > 1 && (
          <span className="mt-1 font-mono text-[0.5rem] tracking-[0.22em] text-fog-600 uppercase">
            {words.slice(1).join(" ")}
          </span>
        )}
      </span>
    </span>
  );
}
