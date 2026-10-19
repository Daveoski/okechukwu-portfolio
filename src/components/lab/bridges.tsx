"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { bridges } from "@/lib/data";
import { EASE_EXPO, pad } from "@/lib/utils";

/** Lab habit → engineering practice, joined by a "reaction arrow" that draws in. */
export function Bridges() {
  return (
    <ol className="border-t border-line">
      {bridges.map((bridge, i) => (
        <BridgeRow key={bridge.lab} index={i} {...bridge} />
      ))}
    </ol>
  );
}

function BridgeRow({ index, lab, code, body }: { index: number; lab: string; code: string; body: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <li ref={ref} className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:items-center md:gap-8">
      <span className="type-label text-mute md:col-span-1">{pad(index + 1)}</span>
      <div className="md:col-span-3">
        <p className="type-label text-mute">In the lab</p>
        <p className="mt-2 font-serif text-[clamp(1.6rem,2.4vw,2.2rem)] italic leading-tight text-bone">{lab}</p>
      </div>
      <div className="relative h-6 md:col-span-2" aria-hidden="true">
        <svg viewBox="0 0 200 24" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
          <motion.path
            d="M0 12H190"
            stroke="#5cffb0"
            strokeWidth="1.5"
            fill="none"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.2 }}
          />
          <motion.path
            d="M182 4l10 8-10 8"
            stroke="#5cffb0"
            strokeWidth="1.5"
            fill="none"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 1.1 }}
          />
        </svg>
        <motion.span
          className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-gfp shadow-[0_0_12px_3px_rgba(92,255,176,0.6)]"
          initial={{ left: "0%", opacity: 0 }}
          animate={inView ? { left: ["0%", "92%"], opacity: [0, 1, 0] } : { left: "0%", opacity: 0 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.4, repeat: Infinity, repeatDelay: 1.6 }}
        />
      </div>
      <div className="md:col-span-6">
        <p className="type-label text-gfp">In code — {code}</p>
        <p className="mt-2 text-bone-dim md:text-lg">{body}</p>
      </div>
    </li>
  );
}
