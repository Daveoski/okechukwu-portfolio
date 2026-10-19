"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin reading-progress bar pinned to the top of long case studies. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      data-print-hide
      className="fixed inset-x-0 top-0 z-55 h-0.5 origin-left bg-gfp"
      style={{ scaleX }}
    />
  );
}
