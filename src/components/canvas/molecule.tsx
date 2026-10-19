"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Element = "C" | "N" | "O" | "H";
type Atom = { el: Element; x: number; y: number; z: number };
type Bond = [number, number, 1 | 2];

const STYLE: Record<Element, { r: number; color: [number, number, number]; label: boolean }> = {
  C: { r: 0.36, color: [232, 239, 234], label: false },
  N: { r: 0.36, color: [124, 140, 255], label: true },
  O: { r: 0.38, color: [255, 92, 138], label: true },
  H: { r: 0.2, color: [150, 168, 160], label: false },
};

/** Caffeine (1,3,7-trimethylxanthine), C8H10N4O2, from idealised planar geometry in ångströms. */
function caffeine() {
  const atoms: Atom[] = [];
  const add = (el: Element, x: number, y: number, z = 0) => atoms.push({ el, x, y, z }) - 1;

  const N1 = add("N", -1.212, 0.7);
  const C2 = add("C", -1.212, -0.7);
  const N3 = add("N", 0, -1.4);
  const C4 = add("C", 1.212, -0.7);
  const C5 = add("C", 1.212, 0.7);
  const C6 = add("C", 0, 1.4);
  const N7 = add("N", 2.543, 1.133);
  const C8 = add("C", 3.367, 0);
  const N9 = add("N", 2.543, -1.133);
  const O2 = add("O", -2.269, -1.31);
  const O6 = add("O", 0, 2.62);
  const M1 = add("C", -2.485, 1.435);
  const M3 = add("C", 0, -2.87);
  const M7 = add("C", 2.997, 2.531);
  const H8 = add("H", 4.447, 0);

  const bonds: Bond[] = [
    [N1, C2, 1], [C2, N3, 1], [N3, C4, 1], [C4, C5, 2], [C5, C6, 1], [C6, N1, 1],
    [C5, N7, 1], [N7, C8, 1], [C8, N9, 2], [N9, C4, 1],
    [C2, O2, 2], [C6, O6, 2],
    [N1, M1, 1], [N3, M3, 1], [N7, M7, 1], [C8, H8, 1],
  ];

  // Tetrahedral hydrogens on each methyl group (109.5° from the N–C bond).
  const cosT = Math.cos(Math.PI - (109.47 * Math.PI) / 180);
  const sinT = Math.sin(Math.PI - (109.47 * Math.PI) / 180);
  for (const [m, n] of [[M1, N1], [M3, N3], [M7, N7]] as const) {
    const c = atoms[m];
    const a = atoms[n];
    const len = Math.hypot(c.x - a.x, c.y - a.y);
    const dx = (c.x - a.x) / len;
    const dy = (c.y - a.y) / len;
    for (let k = 0; k < 3; k++) {
      const phi = (k * 2 * Math.PI) / 3 + Math.PI / 2;
      const h = add(
        "H",
        c.x + 1.09 * (cosT * dx + sinT * Math.cos(phi) * -dy),
        c.y + 1.09 * (cosT * dy + sinT * Math.cos(phi) * dx),
        1.09 * sinT * Math.sin(phi),
      );
      bonds.push([m, h, 1]);
    }
  }

  const cx = atoms.reduce((s, a) => s + a.x, 0) / atoms.length;
  const cy = atoms.reduce((s, a) => s + a.y, 0) / atoms.length;
  for (const a of atoms) {
    a.x -= cx;
    a.y -= cy;
  }
  return { atoms, bonds };
}

const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

export function Molecule({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { atoms, bonds } = caffeine();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sans = getComputedStyle(document.documentElement).getPropertyValue("--font-geist").trim() || "sans-serif";

    let width = 0;
    let height = 0;
    let rotY = -0.5;
    let rotX = 0.45;
    let velY = reduced ? 0 : 0.35;
    let velX = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let idle = 0;
    let raf = 0;
    let running = false;
    let last = performance.now();

    function frame(dt: number) {
      if (!ctx || width === 0) return;
      if (!dragging) {
        idle += dt;
        rotY += velY * dt;
        rotX += velX * dt;
        // Ease back to a gentle auto-rotation after a throw.
        const target = reduced ? 0 : 0.35;
        velY += (target - velY) * Math.min(1, dt * (idle > 1.2 ? 1.2 : 0.4));
        velX *= 1 - Math.min(1, dt * 1.5);
        rotX += (0.45 - rotX) * Math.min(1, dt * 0.25);
      }

      ctx.clearRect(0, 0, width, height);
      // ~4.6 Å max radius from the centroid, plus headroom for perspective on near atoms.
      const scale = Math.min(width, height) / 11;
      const focal = 24;
      const cY = Math.cos(rotY);
      const sY = Math.sin(rotY);
      const cX = Math.cos(rotX);
      const sX = Math.sin(rotX);

      const projected = atoms.map((a) => {
        const x1 = a.x * cY + a.z * sY;
        const z1 = -a.x * sY + a.z * cY;
        const y2 = a.y * cX - z1 * sX;
        const z2 = a.y * sX + z1 * cX;
        const s = focal / (focal + z2);
        return { x: width / 2 + x1 * scale * s, y: height / 2 - y2 * scale * s, z: z2, s };
      });

      type Item = { z: number; draw: () => void };
      const items: Item[] = [];

      for (const [i, j, order] of bonds) {
        const a = projected[i];
        const b = projected[j];
        items.push({
          z: (a.z + b.z) / 2 + 0.01,
          draw: () => {
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const len = Math.hypot(dx, dy) || 1;
            const nx = (-dy / len) * 3.2;
            const ny = (dx / len) * 3.2;
            const offsets = order === 2 ? [-1, 1] : [0];
            const depth = Math.max(0, Math.min(1, ((a.z + b.z) / 2 + 4) / 8));
            ctx.lineWidth = 2.2 * ((a.s + b.s) / 2);
            ctx.lineCap = "round";
            for (const o of offsets) {
              const mx = (a.x + b.x) / 2 + nx * o;
              const my = (a.y + b.y) / 2 + ny * o;
              ctx.strokeStyle = rgba(STYLE[atoms[i].el].color, 0.85 - depth * 0.5);
              ctx.beginPath();
              ctx.moveTo(a.x + nx * o, a.y + ny * o);
              ctx.lineTo(mx, my);
              ctx.stroke();
              ctx.strokeStyle = rgba(STYLE[atoms[j].el].color, 0.85 - depth * 0.5);
              ctx.beginPath();
              ctx.moveTo(mx, my);
              ctx.lineTo(b.x + nx * o, b.y + ny * o);
              ctx.stroke();
            }
          },
        });
      }

      atoms.forEach((atom, i) => {
        const p = projected[i];
        const style = STYLE[atom.el];
        items.push({
          z: p.z,
          draw: () => {
            const r = style.r * scale * p.s;
            const depth = Math.max(0, Math.min(1, (p.z + 4) / 8));
            const g = ctx.createRadialGradient(p.x - r * 0.35, p.y - r * 0.4, r * 0.1, p.x, p.y, r);
            g.addColorStop(0, rgba([255, 255, 255], 0.95));
            g.addColorStop(0.35, rgba(style.color, 1));
            g.addColorStop(1, rgba(style.color.map((v) => v * 0.35) as [number, number, number], 1));
            ctx.globalAlpha = 1 - depth * 0.45;
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            if (style.label && r > 7) {
              ctx.fillStyle = "rgba(4,7,6,0.85)";
              ctx.font = `600 ${Math.round(r * 0.95)}px ${sans}`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(atom.el, p.x, p.y + r * 0.05);
            }
          },
        });
      });

      items.sort((m, n) => n.z - m.z);
      for (const item of items) item.draw();
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      start();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.01;
      rotX += dy * 0.01;
      velY = dx * 0.6;
      velX = dy * 0.6;
      idle = 0;
      if (!running) frame(0);
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduced) start();
      else stop();
    });
    visibility.observe(canvas);
    resize();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Interactive 3D model of a caffeine molecule, C8H10N4O2. Drag to rotate."
      data-cursor="drag"
      data-cursor-label="Drag"
      className={cn("cursor-grab touch-pan-y active:cursor-grabbing", className)}
    />
  );
}
