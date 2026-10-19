import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("type-label flex items-center gap-3 text-mute", className)}>
      {index ? <span className="text-gfp">[{index}]</span> : null}
      <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-[0.02em] text-bone-dim",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex size-2", className)} aria-hidden="true">
      <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-gfp" />
      <span className="relative inline-flex size-2 rounded-full bg-gfp" />
    </span>
  );
}
