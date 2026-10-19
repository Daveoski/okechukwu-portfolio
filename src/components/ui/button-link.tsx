import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/transition/transition-link";
import { ArrowUpRight } from "./icons";
import { RollText } from "./roll-text";

type Variant = "primary" | "ghost";

const variants: Record<Variant, { root: string; icon: string }> = {
  primary: {
    root: "bg-gfp text-ink-950 hover:bg-bone",
    icon: "bg-ink-950 text-gfp",
  },
  ghost: {
    root: "border border-line-strong bg-ink-950/55 text-bone backdrop-blur-md hover:border-gfp/60 hover:text-gfp",
    icon: "bg-bone/10 text-current",
  },
};

/** Arrow that slides out and is replaced by a twin on hover. */
export function ArrowSwap({ className }: { className?: string }) {
  return (
    <span className={cn("relative block size-4 overflow-hidden", className)}>
      <ArrowUpRight className="absolute inset-0 size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-full group-hover:translate-x-full" />
      <ArrowUpRight className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-expo group-hover:translate-x-0 group-hover:translate-y-0" />
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const v = variants[variant];
  const classes = cn(
    "group relative inline-flex h-12 items-center gap-3 rounded-full pl-6 pr-2 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-500 ease-expo",
    v.root,
    className,
  );
  const inner = (
    <>
      <RollText>{children}</RollText>
      <span className={cn("grid size-8 place-items-center rounded-full", v.icon)}>
        <ArrowSwap />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <TransitionLink href={href} className={classes}>
      {inner}
    </TransitionLink>
  );
}

/** Underlined inline link with an arrow; internal links use the curtain. */
export function TextLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const classes = cn(
    "group inline-flex items-center gap-2 text-[15px] font-medium text-bone transition-colors duration-300 hover:text-gfp",
    className,
  );
  const inner = (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-current/40 transition-transform duration-500 ease-expo group-hover:scale-x-0" />
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform delay-150 duration-500 ease-expo group-hover:origin-left group-hover:scale-x-100" />
      </span>
      <ArrowSwap />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <TransitionLink href={href} className={classes}>
      {inner}
    </TransitionLink>
  );
}
