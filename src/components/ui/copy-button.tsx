"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "./icons";

/** Copies `value` to the clipboard and confirms inline. */
export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-3.5 text-[13px] text-bone-dim transition-colors duration-300 hover:border-gfp/60 hover:text-gfp",
        className,
      )}
    >
      <span className="relative size-4">
        <AnimatePresence initial={false} mode="popLayout">
          {copied ? (
            <motion.span key="ok" className="absolute inset-0" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }}>
              <CheckIcon className="size-4 text-gfp" />
            </motion.span>
          ) : (
            <motion.span key="copy" className="absolute inset-0" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }}>
              <CopyIcon className="size-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
