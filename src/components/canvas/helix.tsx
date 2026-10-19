"use client";

import type { MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { mulberry32 } from "@/lib/utils";

type RGB = readonly [number, number, number];
type Base = "A" | "T" | "G" | "C";

const BASES: Base[] = ["A", "T", "G", "C"];
const PAIR: Record<Base, Base> = { A: "T", T: "A", G: "C", C: "G" };
const BASE_COLOR: Record<Base, RGB> = {
  A: [92, 255, 176], // GFP
  T: [68, 225, 255], // CFP
  G: [124, 140, 255], // DAPI
  C: [255, 92, 138], // mCherry
};
const STRAND: [RGB, RGB] = [
  [92, 255, 176],
  [68, 225, 255],
];
const NODE: RGB = [232, 239, 234];

/** B-DNA: ~10.5 base pairs per helical turn. */
const TWIST = (Math.PI * 2) / 10.5;
/** Angular offset between the backbones — produces the major and minor grooves. */
const GROOVE = Math.PI * 0.8;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${clamp01(a).toFixed(3)})`;

type Point = { x: number; y: number; z: number; depth: number; s: number };
type Drawable = { z: number; draw: () => void };

function makeGlow(color: RGB) {
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = 64;
  const g = sprite.getContext("2d");
  if (!g) return sprite;
  const gradient = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, rgba(color, 0.95));
  gradient.addColorStop(0.22, rgba(color, 0.4));
  gradient.addColorStop(1, rgba(color, 0));
  g.fillStyle = gradient;
  g.fillRect(0, 0, 64, 64);
  return sprite;
}

/**
 * A rotating, depth-sorted DNA double helix drawn on a 2D canvas.
 * Pointer position steers rotation and tilt; `progress` (0–1) twists it on scroll.
 */
export function Helix({
  className,
  progress,
  pairs = 34,
}: {
  className?: string;
  progress?: MotionValue<number>;
  pairs?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const count = coarse ? Math.round(pairs * 0.75) : pairs;

    const rand = mulberry32(509);
    const sequence: Base[] = Array.from({ length: count }, () => BASES[Math.floor(rand() * 4)]);
    const particles = Array.from({ length: coarse ? 16 : 40 }, () => ({
      radius: 1.25 + rand() * 1.6,
      angle: rand() * Math.PI * 2,
      y: rand() * 2 - 1,
      size: 0.5 + rand() * 1.3,
      speed: 0.015 + rand() * 0.045,
    }));
    const glows = [makeGlow(STRAND[0]), makeGlow(STRAND[1])];
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() ||
      "ui-monospace, monospace";

    let width = 0;
    let height = 0;
    let angle = 0.6;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let raf = 0;
    let running = false;
    let last = performance.now();

    function frame(dt: number) {
      if (!ctx || width === 0 || height === 0) return;
      pointerX += (targetX - pointerX) * 0.045;
      pointerY += (targetY - pointerY) * 0.045;
      const scroll = progress?.get() ?? 0;
      angle += dt * (0.34 + pointerX * 0.22);

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width * 0.27, height * 0.17, 175);
      const span = height * 1.1;
      const half = span / 2;
      const tilt = 0.2 + pointerY * 0.14 + scroll * 0.55;
      const lean = -0.24 + pointerX * 0.07;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const cosL = Math.cos(lean);
      const sinL = Math.sin(lean);
      const focal = Math.max(width, height) * 1.7;
      const twist = angle + scroll * 2.6;

      const project = (x: number, y: number, z: number): Point => {
        const y1 = y * cosT - z * sinT;
        const z1 = y * sinT + z * cosT;
        const x2 = x * cosL - y1 * sinL;
        const y2 = x * sinL + y1 * cosL;
        const s = focal / (focal + z1);
        return { x: cx + x2 * s, y: cy + y2 * s, z: z1, depth: clamp01((z / R + 1) / 2), s };
      };

      const list: Drawable[] = [];

      // Sugar-phosphate backbones, sampled finely for smooth curves.
      const steps = count * 4;
      for (let strand = 0; strand < 2; strand++) {
        const offset = strand === 0 ? 0 : GROOVE;
        const color = STRAND[strand];
        let previous: Point | null = null;
        for (let k = 0; k <= steps; k++) {
          const u = k / steps;
          const a = u * (count - 1) * TWIST + twist + offset;
          const point = project(Math.cos(a) * R, -half + u * span, Math.sin(a) * R);
          if (previous) {
            const from = previous;
            const depth = (from.depth + point.depth) / 2;
            list.push({
              z: (from.z + point.z) / 2,
              draw: () => {
                ctx.strokeStyle = rgba(color, 0.95 - depth * 0.78);
                ctx.lineWidth = (3.3 - depth * 2.3) * from.s;
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
              },
            });
          }
          previous = point;
        }
      }

      // Base pairs and nucleotides.
      ctx.font = `500 10px ${mono}`;
      for (let i = 0; i < count; i++) {
        const y = -half + (i / (count - 1)) * span;
        const a = i * TWIST + twist;
        const pA = project(Math.cos(a) * R, y, Math.sin(a) * R);
        const pB = project(Math.cos(a + GROOVE) * R, y, Math.sin(a + GROOVE) * R);
        const base = sequence[i];
        const comp = PAIR[base];
        const mx = (pA.x + pB.x) / 2;
        const my = (pA.y + pB.y) / 2;
        const depth = (pA.depth + pB.depth) / 2;

        list.push({
          z: (pA.z + pB.z) / 2 + 0.5,
          draw: () => {
            const alpha = 0.85 - depth * 0.68;
            ctx.lineWidth = (2.3 - depth * 1.5) * ((pA.s + pB.s) / 2);
            ctx.strokeStyle = rgba(BASE_COLOR[base], alpha);
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
            ctx.strokeStyle = rgba(BASE_COLOR[comp], alpha);
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          },
        });

        const nucleotides: [Point, Base, number][] = [
          [pA, base, 0],
          [pB, comp, 1],
        ];
        for (const [point, letter, strand] of nucleotides) {
          list.push({
            z: point.z - 0.5,
            draw: () => {
              const r = (4.4 - point.depth * 2.8) * point.s;
              if (point.depth < 0.42) {
                const size = r * 7.5;
                ctx.globalCompositeOperation = "lighter";
                ctx.globalAlpha = (0.42 - point.depth) * 1.5;
                ctx.drawImage(glows[strand], point.x - size / 2, point.y - size / 2, size, size);
                ctx.globalAlpha = 1;
                ctx.globalCompositeOperation = "source-over";
              }
              ctx.fillStyle = rgba(NODE, 1 - point.depth * 0.78);
              ctx.beginPath();
              ctx.arc(point.x, point.y, r, 0, Math.PI * 2);
              ctx.fill();

              // Label the nearest bases around the middle of the helix.
              if (point.depth < 0.1 && Math.abs(point.y - cy) < height * 0.28) {
                const dx = point.x - mx;
                const dy = point.y - my;
                const len = Math.hypot(dx, dy) || 1;
                ctx.fillStyle = rgba(BASE_COLOR[letter], 0.85);
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(letter, point.x + (dx / len) * 16, point.y + (dy / len) * 16);
              }
            },
          });
        }
      }

      // Drifting particles orbiting the helix.
      for (const p of particles) {
        p.y -= p.speed * dt;
        if (p.y < -1) p.y += 2;
        const a = p.angle + twist * 0.3;
        const point = project(Math.cos(a) * R * p.radius, p.y * half, Math.sin(a) * R * p.radius);
        list.push({
          z: point.z,
          draw: () => {
            ctx.fillStyle = rgba(STRAND[0], (1 - point.depth) * 0.5);
            ctx.beginPath();
            ctx.arc(point.x, point.y, p.size * point.s, 0, Math.PI * 2);
            ctx.fill();
          },
        });
      }

      list.sort((m, n) => n.z - m.z);
      for (const item of list) item.draw();
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) frame(0);
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      frame(dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onPointer = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(canvas);
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });
    resize();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [pairs, progress]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
