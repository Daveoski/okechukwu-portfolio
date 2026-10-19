"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { usePageReady } from "@/components/transition/transition-provider";
import { EASE_EXPO, pad } from "@/lib/utils";

/** Counts up from zero when scrolled into view. Server HTML holds the final value. */
export function Counter({
  value,
  digits = 2,
  suffix = "",
  className,
}: {
  value: number;
  digits?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const ready = usePageReady();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || !ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE_EXPO,
      onUpdate: (v) => {
        node.textContent = `${pad(Math.round(v), digits)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, ready, value, digits, suffix]);

  return (
    <span ref={ref} className={className}>
      {pad(value, digits)}
      {suffix}
    </span>
  );
}
