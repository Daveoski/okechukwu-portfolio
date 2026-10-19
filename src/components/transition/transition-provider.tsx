"use client";

import { useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { routeLabel } from "@/lib/site";
import { Curtain } from "./curtain";
import { Preloader } from "./preloader";

export type TransitionPhase = "intro" | "idle" | "covering" | "revealing";

type TransitionContextValue = {
  /** True once the page underneath may play its entrance animations. */
  ready: boolean;
  phase: TransitionPhase;
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  ready: true,
  phase: "idle",
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function usePageReady() {
  return useContext(TransitionContext).ready;
}

type Pending = { href: string; pathname: string; hash: string };

/**
 * Owns the page-transition state machine:
 * intro (preloader) → idle → covering (curtain rises, then router.push)
 * → revealing (new route has rendered, curtain lifts) → idle.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<TransitionPhase>("intro");
  const [ready, setReady] = useState(false);
  const [label, setLabel] = useState("");

  const phaseRef = useRef<TransitionPhase>("intro");
  const pending = useRef<Pending | null>(null);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Freeze scrolling while something covers the page.
  useEffect(() => {
    if (!lenis) return;
    if (phase === "intro" || phase === "covering") lenis.stop();
    else lenis.start();
  }, [lenis, phase]);

  const scrollToHash = useCallback(
    (hash: string) => {
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: -24 });
      else target.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) {
        window.location.assign(url.href);
        return;
      }

      if (url.pathname === window.location.pathname) {
        if (url.hash) scrollToHash(url.hash);
        else if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (phaseRef.current !== "idle") return;
      const target = url.pathname + url.search + url.hash;

      if (reduceMotion) {
        router.push(target);
        return;
      }

      pending.current = { href: target, pathname: url.pathname, hash: url.hash };
      setLabel(routeLabel(url.pathname));
      setPhase("covering");
    },
    [lenis, reduceMotion, router, scrollToHash],
  );

  const reveal = useCallback(() => {
    if (fallback.current) clearTimeout(fallback.current);
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
    lenis?.resize();
    setPhase("revealing");
    setReady(true);
  }, [lenis]);

  const handleCovered = useCallback(() => {
    const next = pending.current;
    if (!next) return;
    setReady(false);
    router.push(next.href, { scroll: false });
    // Never leave the curtain down if a navigation stalls.
    fallback.current = setTimeout(reveal, 4000);
  }, [reveal, router]);

  // The new route has committed beneath the curtain: lift it on the next frames.
  useEffect(() => {
    const next = pending.current;
    if (phase !== "covering" || !next || pathname !== next.pathname) return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(reveal);
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [pathname, phase, reveal]);

  const handleRevealed = useCallback(() => {
    const hash = pending.current?.hash;
    pending.current = null;
    setPhase("idle");
    if (hash) requestAnimationFrame(() => scrollToHash(hash));
  }, [scrollToHash]);

  const handleIntroDone = useCallback(() => {
    setPhase("idle");
    setReady(true);
  }, []);

  useEffect(() => () => {
    if (fallback.current) clearTimeout(fallback.current);
  }, []);

  const value = useMemo(() => ({ ready, phase, navigate }), [ready, phase, navigate]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <Curtain
        phase={phase}
        label={label}
        onCovered={handleCovered}
        onRevealed={handleRevealed}
      />
      <Preloader onDone={handleIntroDone} />
    </TransitionContext.Provider>
  );
}
