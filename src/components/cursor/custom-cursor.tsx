"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type Variant = "default" | "link" | "view" | "drag" | "text" | "hidden";

const ring: Record<Variant, { size: number; bg: string; border: string; opacity: number }> = {
  default: { size: 34, bg: "rgba(92,255,176,0)", border: "rgba(232,239,234,0.35)", opacity: 1 },
  link: { size: 58, bg: "rgba(92,255,176,0.08)", border: "rgba(92,255,176,0.9)", opacity: 1 },
  view: { size: 104, bg: "rgba(92,255,176,1)", border: "rgba(92,255,176,1)", opacity: 1 },
  drag: { size: 78, bg: "rgba(92,255,176,0.06)", border: "rgba(92,255,176,0.9)", opacity: 1 },
  text: { size: 34, bg: "rgba(92,255,176,0)", border: "rgba(92,255,176,0)", opacity: 0 },
  hidden: { size: 20, bg: "rgba(92,255,176,0)", border: "rgba(92,255,176,0)", opacity: 0 },
};

/**
 * Dot + trailing ring. Elements opt into richer states with
 * `data-cursor="view"` and an optional `data-cursor-label`.
 */
export function CustomCursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reduced;

  const [variant, setVariant] = useState<Variant>("hidden");
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 38, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 420, damping: 38, mass: 0.55 });

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest) return;
      const custom = target.closest<HTMLElement>("[data-cursor]");
      if (custom) {
        setVariant((custom.dataset.cursor as Variant) ?? "link");
        setLabel(custom.dataset.cursorLabel ?? "");
        return;
      }
      setLabel("");
      if (target.closest("input, textarea, select, [contenteditable='true']")) setVariant("text");
      else if (target.closest("a, button, [role='button'], label, summary")) setVariant("link");
      else setVariant("default");
    };
    const onLeave = () => setVariant("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("pointerleave", onLeave);

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const style = ring[variant];

  return (
    <div aria-hidden="true" data-print-hide className="pointer-events-none fixed inset-0 z-100">
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
          animate={{
            width: style.size,
            height: style.size,
            backgroundColor: style.bg,
            borderColor: style.border,
            opacity: style.opacity,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.6 }}
        >
          <AnimatePresence>
            {(variant === "view" || variant === "drag") && label ? (
              <motion.span
                key={label}
                className={cn(
                  "type-label whitespace-nowrap font-medium",
                  variant === "view" ? "text-ink-950" : "text-gfp",
                )}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
              >
                {label}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.div
          className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gfp"
          animate={{ opacity: variant === "view" || variant === "drag" || variant === "hidden" ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
}
