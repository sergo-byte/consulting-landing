"use client";

import { useEffect, useRef, useState } from "react";
import landRings from "@/content/land.json";
import {
  engagementsPage,
  geoLabels,
  geoPoints,
  type GeoKey,
} from "@/content/engagements";
import { t, type Locale } from "@/lib/i18n";

/**
 * Ортографическая проекция Земли на canvas.
 *
 * Шар можно крутить мышью или пальцем. Наведение на название страны
 * в списке доворачивает глобус так, чтобы страна оказалась в центре,
 * и подсвечивает её точку.
 *
 * Контуры материков лежат в land.json: это Natural Earth 110m,
 * пересчитанный в пары «долгота, широта» с шагом 0.1 градуса.
 */

const RINGS = landRings as [number, number][][];
const COUNTRIES = (Object.keys(geoPoints) as GeoKey[]).map((key) => ({
  key,
  ...geoPoints[key],
}));

const RAD = Math.PI / 180;
const AUTO_SPEED = 0.055; // радиан в секунду
const MAX_TILT = 68 * RAD;

/** Кратчайшая разница между углами. */
function shortestAngle(from: number, to: number) {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

export function Globe({ locale }: { locale: Locale }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<GeoKey | null>(null);
  const [dragging, setDragging] = useState(false);

  // Живое состояние держим в ref: перерисовка идёт на canvas, а не в React
  const view = useRef({ lon: -0.6, lat: 0.35 });
  const target = useRef<{ lon: number; lat: number } | null>(null);
  const activeRef = useRef<GeoKey | null>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    activeRef.current = active;
    if (active) {
      const c = COUNTRIES.find((x) => x.key === active)!;
      target.current = { lon: -c.lon * RAD, lat: c.lat * RAD };
    } else {
      target.current = null;
    }
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let size = 0;
    let cx = 0;
    let cy = 0;
    let R0 = 0; // радиус «иллюминатора», он же граница обрезки
    let R = 0; // радиус самой сферы, растёт при приближении
    let zoom = 1;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let pointer: { x: number; y: number } | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      size = rect.width;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = size / 2;
      cy = size / 2;
      R0 = size / 2 - 14;
      R = R0 * zoom;
    };

    const project = (latDeg: number, lonDeg: number) => {
      const { lon: rot, lat: tilt } = view.current;
      const phi = latDeg * RAD;
      const lam = lonDeg * RAD + rot;
      const cosPhi = Math.cos(phi);
      const cosC =
        Math.sin(tilt) * Math.sin(phi) + Math.cos(tilt) * cosPhi * Math.cos(lam);
      return {
        x: cx + R * cosPhi * Math.sin(lam),
        y:
          cy -
          R *
            (Math.cos(tilt) * Math.sin(phi) -
              Math.sin(tilt) * cosPhi * Math.cos(lam)),
        visible: cosC > 0,
      };
    };

    /** Рисует видимые куски линии, разрывая её на границе полушария. */
    const strokePath = (
      points: readonly (readonly [number, number])[],
      style: string,
      width: number,
    ) => {
      ctx.strokeStyle = style;
      ctx.lineWidth = width;
      ctx.beginPath();
      let drawing = false;
      for (const [lon, lat] of points) {
        const p = project(lat, lon);
        if (!p.visible) {
          drawing = false;
          continue;
        }
        if (drawing) ctx.lineTo(p.x, p.y);
        else {
          ctx.moveTo(p.x, p.y);
          drawing = true;
        }
      }
      ctx.stroke();
    };

    const meridians: [number, number][][] = [];
    for (let lon = -180; lon < 180; lon += 20) {
      const line: [number, number][] = [];
      for (let lat = -80; lat <= 80; lat += 4) line.push([lon, lat]);
      meridians.push(line);
    }
    const parallels: [number, number][][] = [];
    for (let lat = -60; lat <= 60; lat += 20) {
      const line: [number, number][] = [];
      for (let lon = -180; lon <= 180; lon += 4) line.push([lon, lat]);
      parallels.push(line);
    }

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Довод до выбранной страны или спокойное вращение
      const tgt = target.current;
      if (tgt) {
        const k = 1 - Math.pow(0.001, dt);
        view.current.lon += shortestAngle(view.current.lon, tgt.lon) * k;
        view.current.lat += (tgt.lat - view.current.lat) * k;
      } else if (!dragRef.current && !reduced) {
        view.current.lon -= AUTO_SPEED * dt;
        view.current.lat += (0.35 - view.current.lat) * (1 - Math.pow(0.2, dt));
      }

      // Приближение к выбранной стране: сфера растёт, а рамка остаётся
      const zoomTarget = tgt ? 1.42 : 1;
      zoom += (zoomTarget - zoom) * (1 - Math.pow(0.006, dt));
      R = R0 * zoom;

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R0, 0, Math.PI * 2);
      ctx.clip();

      // Океан
      const ocean = ctx.createRadialGradient(
        cx - R * 0.35,
        cy - R * 0.4,
        R * 0.1,
        cx,
        cy,
        R,
      );
      ocean.addColorStop(0, "rgba(30, 44, 84, 0.95)");
      ocean.addColorStop(1, "rgba(7, 10, 20, 0.98)");
      ctx.fillStyle = ocean;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Координатная сетка
      for (const line of meridians)
        strokePath(line, "rgba(91, 125, 255, 0.14)", 0.6);
      for (const line of parallels)
        strokePath(line, "rgba(91, 125, 255, 0.14)", 0.6);

      // Материки
      for (const ring of RINGS)
        strokePath(ring, "rgba(143, 165, 255, 0.55)", 0.75);

      // Точки стран
      let hovered: GeoKey | null = null;
      let labelAt: { x: number; y: number; key: GeoKey } | null = null;

      for (const c of COUNTRIES) {
        const p = project(c.lat, c.lon);
        if (!p.visible) continue;

        if (pointer && Math.hypot(pointer.x - p.x, pointer.y - p.y) < 16) {
          hovered = c.key;
        }
        const isActive = activeRef.current === c.key || hovered === c.key;
        const r = isActive ? 6.5 : 4;

        ctx.strokeStyle = isActive
          ? "rgba(227, 182, 100, 0.95)"
          : "rgba(227, 182, 100, 0.5)";
        ctx.lineWidth = isActive ? 1.2 : 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#e3b664";
        ctx.beginPath();
        ctx.arc(p.x, p.y, isActive ? 3 : 2.2, 0, Math.PI * 2);
        ctx.fill();

        if (isActive) labelAt = { x: p.x, y: p.y, key: c.key };
      }

      // Дальше рисуем поверх обрезки, чтобы подпись и край не срезались
      ctx.restore();

      ctx.strokeStyle = "rgba(43, 52, 70, 0.9)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R0, 0, Math.PI * 2);
      ctx.stroke();

      if (labelAt) {
        const label = t(geoLabels[labelAt.key], locale).toUpperCase();
        ctx.font =
          '500 10px var(--font-jetbrains), ui-monospace, "SF Mono", monospace';
        ctx.letterSpacing = "1.5px";
        const w = ctx.measureText(label).width;
        const lx =
          labelAt.x + 14 + w > size ? labelAt.x - 14 - w : labelAt.x + 14;
        ctx.fillStyle = "rgba(5, 7, 12, 0.85)";
        ctx.fillRect(lx - 5, labelAt.y - 9, w + 10, 18);
        ctx.fillStyle = "#f4f7fb";
        ctx.fillText(label, lx, labelAt.y + 4);
        ctx.letterSpacing = "0px";
      }

      canvas.style.cursor = dragRef.current
        ? "grabbing"
        : hovered
          ? "pointer"
          : "grab";

      raf = requestAnimationFrame((n) => {
        if (visible) draw(n);
        else {
          last = performance.now();
          raf = requestAnimationFrame(draw);
        }
      });
    };

    const localPoint = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      dragRef.current = localPoint(e);
      target.current = null;
      setDragging(true);
    };

    const onMove = (e: PointerEvent) => {
      pointer = localPoint(e);
      const d = dragRef.current;
      if (!d) return;
      const k = 2.2 / R0;
      view.current.lon += (pointer.x - d.x) * k;
      view.current.lat = Math.max(
        -MAX_TILT,
        Math.min(MAX_TILT, view.current.lat + (pointer.y - d.y) * k),
      );
      dragRef.current = pointer;
    };

    const onUp = (e: PointerEvent) => {
      if (canvas.hasPointerCapture(e.pointerId))
        canvas.releasePointerCapture(e.pointerId);
      dragRef.current = null;
      setDragging(false);
    };

    const onLeave = () => {
      pointer = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [locale]);

  return (
    <div className="w-full max-w-[26rem]">
      <div className="relative aspect-square w-full">
        <canvas
          ref={canvasRef}
          className="h-full w-full touch-none select-none"
          aria-label={
            locale === "ru"
              ? "Глобус с географией проектов, можно вращать"
              : "Globe with delivery geography, draggable"
          }
          role="img"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
        {COUNTRIES.map((c) => (
          <button
            key={c.key}
            type="button"
            onMouseEnter={() => setActive(c.key)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(c.key)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(active === c.key ? null : c.key)}
            className={`font-mono text-[0.625rem] tracking-[0.14em] uppercase transition-colors duration-300 ${
              active === c.key
                ? "text-gold-400"
                : "text-fog-600 hover:text-fog-200"
            }`}
          >
            {t(geoLabels[c.key], locale)}
          </button>
        ))}
      </div>

      <p className="mt-4 font-mono text-[0.5625rem] leading-relaxed tracking-[0.12em] text-fog-600 uppercase">
        {t(engagementsPage.geoNote, locale)} ·{" "}
        {dragging
          ? locale === "ru"
            ? "вращайте"
            : "rotating"
          : locale === "ru"
            ? "глобус можно вращать"
            : "drag to rotate"}
      </p>
    </div>
  );
}
