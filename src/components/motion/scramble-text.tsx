"use client";

import { useEffect, useRef } from "react";

const NUCLEOTIDES = "ATGC";

/** Resolves text out of a random A/T/G/C "sequence", left to right. */
export function ScrambleText({
  text,
  play,
  duration = 700,
  className,
}: {
  text: string;
  play: boolean;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!play) {
      node.textContent = text;
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const settled = Math.floor(t * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += i < settled || ch === " " ? ch : NUCLEOTIDES[(Math.random() * 4) | 0];
      }
      node.textContent = out;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, play, duration]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
