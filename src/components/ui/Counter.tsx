"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Счётчик, который не ломает статический HTML: до анимации и на сервере
 * выводится итоговое число, поэтому поисковики и читалки видят «> 50»,
 * а не «> 0». Анимация запускается только если блок появился в видимой
 * области уже после первой отрисовки.
 */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const armed = useRef(false);
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      armed.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!inView || !armed.current) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value ?? to}
      {suffix}
    </span>
  );
}
