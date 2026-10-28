import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------
   Микро-метка секции: 01 / ЭКСПЕРТИЗА
   -------------------------------------------------------------- */

export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow flex items-center gap-3", className)}>
      {index && (
        <>
          <span className="text-signal-400">{index}</span>
          <span className="h-px w-8 bg-line-strong" />
        </>
      )}
      {children}
    </span>
  );
}

/* --------------------------------------------------------------
   Заголовок секции
   -------------------------------------------------------------- */

export function SectionHeading({
  index,
  eyebrow,
  title,
  body,
  align = "left",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 className="display-md max-w-3xl text-balance">{title}</h2>
      {body && (
        <p
          className={cn(
            "max-w-2xl text-[1.0625rem] leading-relaxed text-fog-400 text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------
   Кнопки
   -------------------------------------------------------------- */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "gold";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  const base =
    "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 font-mono text-[0.6875rem] tracking-[0.16em] uppercase transition-colors duration-500";

  const styles = {
    primary:
      "bg-fog-50 text-ink-950 hover:bg-white border border-transparent",
    gold: "bg-gold-400 text-ink-950 hover:bg-gold-200 border border-transparent",
    ghost:
      "border border-line-strong text-fog-200 hover:text-fog-50 hover:border-fog-600 bg-transparent",
  }[variant];

  return (
    <Link href={href} className={cn(base, styles, className)}>
      <span className="relative z-10">{children}</span>
      <ArrowIcon className="relative z-10 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-1" />
    </Link>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 10"
      fill="none"
      aria-hidden="true"
      className={cn("h-2.5 w-4", className)}
    >
      <path
        d="M0 5h14M10 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Текстовая ссылка со стрелкой и подчёркиванием, растущим слева. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/al inline-flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-fog-400 uppercase transition-colors duration-400 hover:text-fog-50",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowIcon className="transition-transform duration-500 ease-out-expo group-hover/al:translate-x-1.5" />
    </Link>
  );
}

/* --------------------------------------------------------------
   Волосяные разделители и обёртки
   -------------------------------------------------------------- */

export function Rule({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-line", className)} />;
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-24 md:py-32 lg:py-40", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Тег-чип для отраслей, функций и географии. */
export function Tag({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "signal" | "gold";
  className?: string;
}) {
  const tones = {
    default: "border-line-strong text-fog-400",
    signal: "border-signal-500/40 text-signal-300 bg-signal-950/40",
    gold: "border-gold-400/30 text-gold-200 bg-gold-400/5",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] uppercase",
        tones,
        className,
      )}
    >
      {children}
    </span>
  );
}
