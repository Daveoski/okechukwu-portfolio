"use client";

import { motion, type Variants } from "motion/react";
import { EASE_EXPO, EASE_LAB } from "@/lib/utils";
import { ScrambleText } from "@/components/motion/scramble-text";
import type { TransitionPhase } from "./transition-provider";

const COVER = 0.72;
const REVEAL = 0.9;

/* The sheet is 14vh curve + 100vh body + 14vh curve tall, offset by -14vh,
   so ±116vh parks it fully off-screen in either direction. */
const sheet: Variants = {
  intro: { y: "116vh", transition: { duration: 0 } },
  idle: { y: "116vh", transition: { duration: 0 } },
  covering: { y: "0vh", transition: { duration: COVER, ease: EASE_LAB } },
  revealing: { y: "-116vh", transition: { duration: REVEAL, ease: EASE_LAB, delay: 0.12 } },
};

const leadingEdge: Variants = {
  intro: { scaleY: 1, transition: { duration: 0 } },
  idle: { scaleY: 1, transition: { duration: 0 } },
  covering: { scaleY: 0, transition: { duration: COVER, ease: EASE_LAB } },
  revealing: { scaleY: 0, transition: { duration: 0 } },
};

const trailingEdge: Variants = {
  intro: { scaleY: 0, transition: { duration: 0 } },
  idle: { scaleY: 0, transition: { duration: 0 } },
  covering: { scaleY: 0, transition: { duration: 0 } },
  revealing: { scaleY: 1, transition: { duration: REVEAL, ease: EASE_LAB, delay: 0.12 } },
};

const content: Variants = {
  intro: { opacity: 0, y: 40, transition: { duration: 0 } },
  idle: { opacity: 0, y: 40, transition: { duration: 0 } },
  covering: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO, delay: 0.32 } },
  revealing: { opacity: 0, y: -60, transition: { duration: 0.45, ease: EASE_LAB } },
};

export function Curtain({
  phase,
  label,
  onCovered,
  onRevealed,
}: {
  phase: TransitionPhase;
  label: string;
  onCovered: () => void;
  onRevealed: () => void;
}) {
  const active = phase === "covering" || phase === "revealing";

  return (
    <div
      aria-hidden="true"
      data-print-hide
      className="pointer-events-none fixed inset-0 z-90 overflow-hidden"
      style={{ pointerEvents: active ? "auto" : "none" }}
    >
      <motion.div
        className="absolute inset-x-0 top-[-14vh] h-[128vh]"
        variants={sheet}
        initial="intro"
        animate={phase}
        onAnimationComplete={(definition) => {
          if (definition === "covering") onCovered();
          else if (definition === "revealing") onRevealed();
        }}
      >
        <motion.svg
          variants={leadingEdge}
          className="absolute inset-x-0 top-0 h-[14vh] w-full origin-bottom"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C 22 0 78 0 100 100 Z" className="fill-ink-800" />
        </motion.svg>

        <div className="absolute inset-x-0 top-[14vh] h-screen overflow-hidden bg-ink-800">
          <div className="hairline-grid absolute inset-0 opacity-70" />
          <div className="absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gfp/10 blur-[110px]" />
          <motion.div
            variants={content}
            className="relative flex h-full flex-col items-center justify-center gap-6 px-6 text-center"
          >
            <span className="type-label flex items-center gap-3 text-gfp">
              <span className="inline-block size-1.5 rounded-full bg-gfp" />
              Sequencing
            </span>
            <ScrambleText
              text={label}
              play={phase === "covering"}
              className="font-serif text-[clamp(3.5rem,12vw,11rem)] italic leading-[0.9] tracking-[-0.02em] text-bone"
            />
          </motion.div>
        </div>

        <motion.svg
          variants={trailingEdge}
          className="absolute inset-x-0 bottom-0 h-[14vh] w-full origin-top"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 0 C 22 100 78 100 100 0 Z" className="fill-ink-800" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
