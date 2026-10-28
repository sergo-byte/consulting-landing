"use client";

import { motion } from "motion/react";

/**
 * Пятиосевая радарная диаграмма профиля. Значения — 0…100.
 */

/** Холст шире фигуры: подписи осей должны помещаться целиком. */
const W = 460;
const H = 360;
const CX = W / 2;
const CY = 168;
const R = 108;

function point(index: number, total: number, value: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const r = (value / 100) * R;
  return {
    x: Math.round((CX + Math.cos(angle) * r) * 100) / 100,
    y: Math.round((CY + Math.sin(angle) * r) * 100) / 100,
  };
}

export function Radar({
  values,
  labels,
  compact = false,
  className,
}: {
  values: number[];
  labels?: string[];
  compact?: boolean;
  className?: string;
}) {
  const n = values.length;
  const rings = [25, 50, 75, 100];

  const polygon = (vals: number[]) =>
    vals
      .map((v, i) => {
        const p = point(i, n, v);
        return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
      })
      .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label="radar"
    >
      <defs>
        <linearGradient id="radar-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b7dff" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#e3b664" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Кольца */}
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={polygon(Array(n).fill(ring))}
          fill="none"
          stroke="#2b3446"
          strokeWidth="0.7"
          opacity={ring === 100 ? 1 : 0.55}
        />
      ))}

      {/* Оси */}
      {Array.from({ length: n }, (_, i) => {
        const p = point(i, n, 100);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={p.x}
            y2={p.y}
            stroke="#2b3446"
            strokeWidth="0.6"
            opacity="0.7"
          />
        );
      })}

      {/* Значения */}
      <motion.polygon
        points={polygon(values)}
        fill="url(#radar-fill)"
        stroke="#8fa5ff"
        strokeWidth="1.4"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      {values.map((v, i) => {
        const p = point(i, n, v);
        return (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#e3b664" />
        );
      })}

      {/* Подписи осей */}
      {!compact &&
        labels?.map((label, i) => {
          const p = point(i, n, 126);
          const anchor =
            Math.abs(p.x - CX) < 12 ? "middle" : p.x > CX ? "start" : "end";
          return (
            <text
              key={i}
              x={p.x}
              y={p.y + 3}
              textAnchor={anchor}
              fill="#8b95ab"
              fontSize="9.5"
              fontFamily="var(--font-jetbrains), monospace"
              letterSpacing="1.2"
            >
              {label.toUpperCase()}
            </text>
          );
        })}
    </svg>
  );
}
