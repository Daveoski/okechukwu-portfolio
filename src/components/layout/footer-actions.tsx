"use client";

import { useLenis } from "lenis/react";
import type { MouseEvent } from "react";
import { ArrowUp } from "@/components/ui/icons";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group inline-flex items-center gap-2 uppercase text-bone-dim transition-colors hover:text-gfp"
    >
      Back to top
      <span className="relative size-3.5 overflow-hidden">
        <ArrowUp className="absolute inset-0 size-3.5 transition-transform duration-500 ease-expo group-hover:-translate-y-full" />
        <ArrowUp className="absolute inset-0 size-3.5 translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0" />
      </span>
    </button>
  );
}

/** Skip link that moves focus as well as scroll position. */
export function SkipLink() {
  const lenis = useLenis();
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById("main");
    if (!main) return;
    event.preventDefault();
    main.focus({ preventScroll: true });
    if (lenis) lenis.scrollTo(main, { immediate: true });
    else main.scrollIntoView();
  };
  return (
    <a
      href="#main"
      onClick={onClick}
      className="sr-only rounded-full bg-gfp px-5 py-3 text-sm font-medium text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-110"
    >
      Skip to content
    </a>
  );
}
