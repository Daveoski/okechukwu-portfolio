"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { isActive, navLinks } from "@/lib/site";
import { cn, EASE_EXPO, pad } from "@/lib/utils";
import { TransitionLink } from "@/components/transition/transition-link";
import { usePageReady } from "@/components/transition/transition-provider";
import { LogoMark } from "@/components/ui/logo";
import { RollText } from "@/components/ui/roll-text";
import { LiveDot } from "@/components/ui/section-label";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const pathname = usePathname();
  const ready = usePageReady();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (Math.abs(y - previous) < 6) return;
    setHidden(y > previous && y > 280);
  });

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButton.current?.focus();
  }, []);

  return (
    <>
      <motion.header
        data-print-hide
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: "-100%" }}
        animate={{ y: !ready || hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.7, ease: EASE_EXPO, delay: ready && !hidden ? 0.2 : 0 }}
      >
        <div
          className={cn(
            "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled
              ? "border-line bg-ink-950/75 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <div className="container-x flex h-18 items-center justify-between gap-6">
            <TransitionLink
              href="/"
              aria-label="Okechukwu Orjionuchie — home"
              className="group flex items-center gap-3"
            >
              <LogoMark className="size-7 text-bone" />
              <span className="flex items-baseline gap-2 text-[15px] font-semibold tracking-[-0.02em]">
                Okechukwu
                <span className="hidden font-normal text-mute xl:inline">— Full-stack developer</span>
              </span>
            </TransitionLink>

            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {navLinks.map((link, i) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <TransitionLink
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative flex items-start gap-1 rounded-full px-3.5 py-2 text-[14px] transition-colors duration-300",
                          active ? "text-bone" : "text-bone-dim hover:text-bone",
                        )}
                      >
                        <RollText hoverClassName="text-gfp">{link.label}</RollText>
                        <span className="font-mono text-[9px] leading-none text-mute">{pad(i + 1)}</span>
                        {active ? (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gfp"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        ) : null}
                      </TransitionLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <TransitionLink
                href="/contact"
                className="group hidden items-center gap-2.5 rounded-full border border-line bg-ink-950/55 px-4 py-2 text-[13px] text-bone-dim backdrop-blur-md transition-colors duration-300 hover:border-gfp/50 hover:text-bone lg:inline-flex"
              >
                <LiveDot />
                Available for work
              </TransitionLink>
              <button
                ref={menuButton}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="group inline-flex h-10 items-center gap-2.5 rounded-full border border-line-strong px-4 text-[13px] font-medium md:hidden"
              >
                <span className="flex flex-col gap-0.75" aria-hidden="true">
                  <span className="block h-px w-4 bg-current" />
                  <span className="block h-px w-4 bg-current transition-[width] duration-300 group-hover:w-2.5" />
                </span>
                Menu
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
