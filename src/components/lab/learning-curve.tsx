"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { EASE_EXPO } from "@/lib/utils";

// Plot area (SVG user units).
const X0 = 56;
const Y0 = 228;
const W = 320;
const H = 176;
const S_MAX = 10;
const KM = 1.6;
const VMAX = 0.92;

const sx = (s: number) => X0 + (s / S_MAX) * W;
const vy = (v: number) => Y0 - v * H;
const rate = (s: number) => (VMAX * s) / (KM + s);

const curve = Array.from({ length: 81 }, (_, i) => {
  const s = (i / 80) * S_MAX;
  return `${i === 0 ? "M" : "L"}${sx(s).toFixed(1)} ${vy(rate(s)).toFixed(1)}`;
}).join(" ");

const HERE = 6.2;

/** Michaelis–Menten kinetics, repurposed as a learning curve. */
export function LearningCurve() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: { duration: 1.8, ease: EASE_EXPO, delay },
  });
  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: inView ? 1 : 0 },
    transition: { duration: 0.8, delay },
  });

  return (
    <figure>
      <svg
        ref={ref}
        viewBox="0 0 400 270"
        className="w-full"
        role="img"
        aria-label="A Michaelis–Menten curve: rate of learning rises steeply with hours spent building, then levels toward a maximum that has not been reached yet."
      >
        {/* Axes */}
        <motion.path d={`M${X0} ${Y0 - H - 10}V${Y0}H${X0 + W + 8}`} fill="none" stroke="rgba(232,239,234,0.35)" strokeWidth="1" {...draw(0)} />
        {/* Vmax asymptote and Km guides are dashed, so they fade rather than draw
            (pathLength animation would overwrite the dash pattern). */}
        <motion.path d={`M${X0} ${vy(VMAX)}H${X0 + W}`} fill="none" stroke="#ff5c8a" strokeWidth="1" strokeDasharray="4 5" {...fade(0.4)} />
        <motion.path
          d={`M${sx(KM)} ${Y0}V${vy(VMAX / 2)}H${X0}`}
          fill="none"
          stroke="rgba(232,239,234,0.3)"
          strokeWidth="1"
          strokeDasharray="3 4"
          {...fade(0.9)}
        />
        {/* The curve */}
        <motion.path d={curve} fill="none" stroke="#5cffb0" strokeWidth="2.4" strokeLinecap="round" {...draw(0.6)} />

        {/* "You are here" */}
        <motion.g {...fade(1.6)}>
          <circle cx={sx(HERE)} cy={vy(rate(HERE))} r="9" fill="rgba(92,255,176,0.18)" />
          <circle cx={sx(HERE)} cy={vy(rate(HERE))} r="4" fill="#5cffb0" />
          <text x={sx(HERE)} y={vy(rate(HERE)) + 26} textAnchor="middle" className="fill-bone font-mono text-[10px]">
            you are here
          </text>
        </motion.g>

        <motion.g {...fade(1.2)} className="font-mono text-[9.5px]">
          <text x={X0 + W} y={vy(VMAX) - 8} textAnchor="end" className="fill-cherry">
            V<tspan baselineShift="sub" fontSize="7">max</tspan> — not reached yet
          </text>
          <text x={sx(KM)} y={Y0 + 15} textAnchor="middle" className="fill-mute">
            K<tspan baselineShift="sub" fontSize="7">m</tspan>
          </text>
          <text x={X0 - 8} y={vy(VMAX / 2) + 3} textAnchor="end" className="fill-mute">
            ½V
          </text>
          <text x={X0 + W / 2} y={Y0 + 34} textAnchor="middle" className="fill-mute">
            [S] — hours spent building
          </text>
          <text
            x={18}
            y={Y0 - H / 2}
            textAnchor="middle"
            transform={`rotate(-90 18 ${Y0 - H / 2})`}
            className="fill-mute"
          >
            v — rate of learning
          </text>
        </motion.g>
      </svg>
      <figcaption className="type-label mt-4 text-mute">
        Fig. 06 — Michaelis–Menten ·{" "}
        <span className="normal-case tracking-[0.06em]">
          v = V<sub>max</sub>[S] / (K<sub>m</sub> + [S])
        </span>
      </figcaption>
    </figure>
  );
}
