"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { MethodStep } from "@/lib/data";
import { EASE_EXPO } from "@/lib/utils";

const paths: Record<MethodStep["glyph"], string[]> = {
  // Microscope field of view with cells.
  observe: [
    "M80 14a66 66 0 1 0 0.01 0",
    "M80 40a40 40 0 1 0 0.01 0",
    "M80 0v26M80 134v26M0 80h26M134 80h26",
    "M62 70a9 9 0 1 0 0.01 0",
    "M96 88a6 6 0 1 0 0.01 0",
    "M88 58a4 4 0 1 0 0.01 0",
  ],
  // Erlenmeyer flask with meniscus and bubbles.
  hypothesise: [
    "M66 18h28M70 18v42L34 132a8 8 0 0 0 7 12h78a8 8 0 0 0 7-12L90 60V18",
    "M47 108h66",
    "M70 92a4 4 0 1 0 0.01 0",
    "M86 80a3 3 0 1 0 0.01 0",
    "M80 64a2 2 0 1 0 0.01 0",
  ],
  // Three test tubes in a rack.
  experiment: [
    "M40 24v96a12 12 0 0 0 24 0V24M36 24h32",
    "M68 24v96a12 12 0 0 0 24 0V24M64 24h32",
    "M96 24v96a12 12 0 0 0 24 0V24M92 24h32",
    "M40 84h24M68 64h24M96 100h24",
    "M24 146h112",
  ],
  // Scatter plot with a fitted curve.
  analyse: [
    "M22 18v120h124",
    "M30 128C62 122 78 92 92 66s26-38 46-42",
    "M44 118a3 3 0 1 0 0.01 0M66 106a3 3 0 1 0 0.01 0M80 86a3 3 0 1 0 0.01 0M96 70a3 3 0 1 0 0.01 0M112 46a3 3 0 1 0 0.01 0M128 38a3 3 0 1 0 0.01 0",
  ],
  // Manuscript with an outgoing arrow.
  publish: [
    "M36 16h58l26 26v102H36Z",
    "M94 16v26h26",
    "M52 66h52M52 82h52M52 98h36",
    "M104 118l26-26m-18 0h18v18",
  ],
};

export function MethodGlyph({ glyph, color }: { glyph: MethodStep["glyph"]; color: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <svg ref={ref} viewBox="0 0 160 160" className="size-full" aria-hidden="true">
      {paths[glyph].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.6, ease: EASE_EXPO, delay: 0.15 + i * 0.12 }}
        />
      ))}
    </svg>
  );
}
