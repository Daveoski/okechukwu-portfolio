"use client";

import { animate } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { INTRO_KEY } from "@/lib/site";
import { EASE_LAB, pad } from "@/lib/utils";

const TAGLINE = ["From", "molecules", "to", "modules."];
const CODONS = ["ATG", "GCC", "TTA", "CGA", "GGT", "ACC", "TAG", "CAT", "GAA", "TCG"];

function sequence() {
  let out = "";
  for (let i = 0; i < 4; i++) out += (i ? " " : "") + CODONS[(Math.random() * CODONS.length) | 0];
  return out;
}

/**
 * First-visit intro. Rendered on the server so it paints before hydration;
 * an inline script in <head> adds `intro-seen` to <html> for repeat visits in
 * the same session, which hides it before first paint.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<SVGSVGElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLSpanElement>(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      seen = false;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduced) {
      root.style.display = "none";
      onDoneRef.current();
      return;
    }

    let cancelled = false;
    let lastSeq = 0;
    const counter = animate(0, 100, {
      duration: 2.1,
      ease: [0.65, 0, 0.35, 1],
      onUpdate(v) {
        if (counterRef.current) counterRef.current.textContent = pad(Math.round(v), 3);
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
        const now = performance.now();
        if (seqRef.current && now - lastSeq > 90) {
          seqRef.current.textContent = sequence();
          lastSeq = now;
        }
      },
      onComplete() {
        if (cancelled) return;
        try {
          sessionStorage.setItem(INTRO_KEY, "1");
        } catch {
          /* private mode: the intro simply plays again next time */
        }
        onDoneRef.current();
        const panel = panelRef.current;
        const curve = curveRef.current;
        if (!panel || !curve) return;
        animate(curve, { scaleY: [0, 1] }, { duration: 1.05, ease: EASE_LAB });
        animate(panel, { y: ["0vh", "-116vh"] }, { duration: 1.05, ease: EASE_LAB }).then(() => {
          root.style.display = "none";
        });
      },
    });

    return () => {
      cancelled = true;
      counter.stop();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-preloader
      data-print-hide
      aria-hidden="true"
      className="fixed inset-0 z-95 overflow-hidden"
    >
      <div ref={panelRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 overflow-hidden bg-ink-950">
          <div className="hairline-grid absolute inset-0 opacity-60" />
          <div className="absolute right-[-10%] top-[20%] size-[60vmax] rounded-full bg-gfp/[0.07] blur-[120px]" />

          <div className="container-x relative flex h-full flex-col justify-between py-7 md:py-9">
            <div className="type-label flex items-center justify-between text-mute">
              <span>Okechukwu D. Orjionuchie</span>
              <span className="hidden sm:inline">Portfolio — Enugu, NG</span>
            </div>

            <p className="font-serif text-[clamp(2.6rem,7.5vw,7rem)] italic leading-[0.95] tracking-[-0.02em] text-bone">
              {TAGLINE.map((word, i) => (
                <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-top">
                  <span
                    className="preloader-word inline-block"
                    style={{ animationDelay: `${120 + i * 110}ms` }}
                  >
                    {word === "modules." ? (
                      <>
                        modules<span className="text-gfp">.</span>
                      </>
                    ) : (
                      word
                    )}
                  </span>
                </span>
              ))}
            </p>

            <div>
              <div className="flex items-end justify-between gap-6">
                <span className="type-label text-gfp">
                  Sequencing <span ref={seqRef} className="text-bone-dim">ATG GCC TTA CGA</span>
                </span>
                <span
                  ref={counterRef}
                  className="font-sans text-[clamp(3.5rem,13vw,11rem)] font-semibold leading-[0.8] tracking-[-0.06em] tabular-nums"
                >
                  000
                </span>
              </div>
              <div className="mt-5 h-px w-full bg-line">
                <div ref={barRef} className="h-full origin-left scale-x-0 bg-gfp" />
              </div>
            </div>
          </div>
        </div>

        <svg
          ref={curveRef}
          className="absolute inset-x-0 top-full h-[14vh] w-full origin-top"
          style={{ transform: "scaleY(0)" }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 0 C 22 100 78 100 100 0 Z" className="fill-ink-950" />
        </svg>
      </div>
    </div>
  );
}
