"use client";

import { motion, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Насколько сжимается зона срабатывания сверху и снизу. */
const MARGIN = 60;

/**
 * Блок, оказавшийся выше экрана в момент загрузки, в поле зрения уже
 * никогда не попадёт и остался бы невидимым. Так бывает при переходе
 * по ссылке на секцию и при перезагрузке посреди страницы. Такие блоки
 * показываем сразу, без анимации.
 */
function useAlreadyPassed<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().bottom < MARGIN) setPassed(true);
  }, []);

  return { ref, passed };
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, passed } = useAlreadyPassed<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      {...(passed
        ? { animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: `-${MARGIN}px` },
            transition: { duration: 0.9, delay, ease: EASE },
          })}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, passed } = useAlreadyPassed<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerParent}
      initial="hidden"
      {...(passed
        ? { animate: "show", transition: { duration: 0 } }
        : { whileInView: "show", viewport: { once: true, margin: `-${MARGIN}px` } })}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/** Заголовок, проявляющийся построчно: строки поднимаются из-под маски. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        // Запас снизу нужен под выносные элементы кириллицы (р, у, д, ц):
        // при line-height 0.95 они выходят за строку и обрезаются маской.
        // Отрицательный отступ возвращает исходное расстояние между строк.
        <span key={i} className="block overflow-hidden pb-[0.24em] -mb-[0.18em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
