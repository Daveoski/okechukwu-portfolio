"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { isActive, navLinks, site } from "@/lib/site";
import { cn, EASE_EXPO, EASE_LAB, pad } from "@/lib/utils";
import { TransitionLink } from "@/components/transition/transition-link";
import { Close } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { LiveDot } from "@/components/ui/section-label";

const ORIGIN = "calc(100% - 3.25rem) 2.25rem";

export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const lenis = useLenis();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, lenis, onClose]);

  const links = [{ href: "/", label: "Home" }, ...navLinks];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-print-hide
          data-lenis-prevent
          className="fixed inset-0 z-60 flex flex-col overflow-y-auto overscroll-contain bg-ink-900"
          initial={{ clipPath: `circle(0% at ${ORIGIN})` }}
          animate={{ clipPath: `circle(150% at ${ORIGIN})` }}
          exit={{ clipPath: `circle(0% at ${ORIGIN})` }}
          transition={{ duration: 0.75, ease: EASE_LAB }}
        >
          <div className="hairline-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="container-x relative flex h-18 shrink-0 items-center justify-between">
            <span className="type-label text-mute">Menu</span>
            <button
              ref={closeButton}
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[13px] font-medium"
            >
              <Close className="size-4" />
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x relative flex flex-1 flex-col justify-center py-10">
            <ul className="flex flex-col gap-1">
              {links.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.18 + i * 0.05 }}
                    >
                      <TransitionLink
                        href={link.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-baseline gap-4 py-1 text-[clamp(2.75rem,13vw,5rem)] font-semibold leading-none tracking-tighter",
                          active ? "text-gfp" : "text-bone",
                        )}
                      >
                        <span className="font-mono text-xs font-normal tracking-normal text-mute">
                          {pad(i)}
                        </span>
                        {link.label}
                      </TransitionLink>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            className="container-x relative grid shrink-0 gap-6 border-t border-line py-8 text-sm sm:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.45 }}
          >
            <div>
              <p className="type-label text-mute">Say hello</p>
              <a href={`mailto:${site.email}`} className="mt-2 block break-all text-bone">
                {site.email}
              </a>
            </div>
            <div className="flex items-end justify-between gap-4">
              <p className="flex items-center gap-2 text-bone-dim">
                <LiveDot /> Enugu · <LocalTime /> WAT
              </p>
              <div className="flex gap-4">
                <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="text-bone-dim hover:text-gfp">
                  GitHub
                </a>
                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-bone-dim hover:text-gfp">
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
