"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Helix } from "@/components/canvas/helix";
import { Magnetic } from "@/components/motion/magnetic";
import { usePageReady } from "@/components/transition/transition-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowDown } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { LiveDot } from "@/components/ui/section-label";
import { EASE_EXPO } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = usePageReady();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const helixOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);
  const helixScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  const line = (delay: number) => ({
    initial: { y: "112%" },
    animate: { y: ready ? "0%" : "112%" },
    transition: { duration: 1.3, ease: EASE_EXPO, delay: ready ? delay : 0 },
  });
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 1.1, ease: EASE_EXPO, delay: ready ? delay : 0 },
  });

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden pb-8 pt-28 md:pt-32"
    >
      <div
        aria-hidden="true"
        className="hairline-grid absolute inset-0 -z-10 mask-[radial-gradient(ellipse_75%_65%_at_65%_40%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[-15%] top-[5%] -z-10 aspect-square w-[70vw] max-w-[980px] rounded-full bg-gfp/[0.08] blur-[130px]"
      />

      <motion.div
        aria-hidden="true"
        style={{ opacity: helixOpacity, scale: helixScale }}
        className="absolute inset-y-0 right-[-26vw] -z-10 w-[92vw] opacity-55 sm:right-[-10vw] sm:w-[64vw] sm:opacity-80 lg:right-[1vw] lg:w-[44vw] lg:opacity-100"
      >
        <motion.div
          className="size-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1.8, ease: EASE_EXPO, delay: ready ? 0.25 : 0 }}
        >
          <Helix
            progress={scrollYProgress}
            className="size-full mask-[linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]"
          />
        </motion.div>
      </motion.div>

      <div className="container-x flex flex-1 flex-col">
        <motion.div {...fade(0.1)} className="type-label flex items-center justify-between gap-6 text-mute">
          <span className="flex items-center gap-2.5">
            <LiveDot />
            <span className="text-bone-dim">Available for full-stack roles</span>
          </span>
          <span className="hidden sm:inline">
            Enugu, NG — <LocalTime className="tabular-nums text-bone-dim" /> WAT
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          style={{ y: nameY }}
          className="type-display-xl mt-auto pt-20 font-semibold md:pt-24"
        >
          <span className="sr-only">Okechukwu Orjionuchie — full-stack developer and biochemist</span>
          <span aria-hidden="true" className="block overflow-hidden pb-[0.05em]">
            <motion.span data-reveal className="block" {...line(0.08)}>
              Okechukwu
            </motion.span>
          </span>
          <span aria-hidden="true" className="block overflow-hidden pb-[0.05em] pl-[6vw]">
            <motion.span data-reveal className="block" {...line(0.2)}>
              Orjionuchie<span className="text-gfp">.</span>
            </motion.span>
          </span>
        </motion.h1>

        <div className="mt-10 grid items-end gap-8 md:mt-14 lg:grid-cols-12">
          <motion.p {...fade(0.55)} data-reveal className="type-h3 max-w-xl font-medium lg:col-span-5">
            Full-stack developer with a{" "}
            <span className="font-serif font-normal italic text-gfp">biochemist&rsquo;s</span> mind.
          </motion.p>
          <motion.p {...fade(0.65)} data-reveal className="max-w-md text-[15px] leading-relaxed text-bone-dim lg:col-span-4">
            From molecules to modules — I design and build fast, secure, human-centred web products
            with Next.js, TypeScript and Python, from the database to the last pixel.
          </motion.p>
          <motion.div {...fade(0.75)} data-reveal className="flex flex-wrap gap-3 lg:col-span-3 lg:justify-end">
            <Magnetic strength={0.25}>
              <ButtonLink href="/work">View work</ButtonLink>
            </Magnetic>
            <Magnetic strength={0.25}>
              <ButtonLink href="/cv" variant="ghost">
                Résumé
              </ButtonLink>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          {...fade(0.9)}
          data-reveal
          className="type-label mt-12 flex items-end justify-between gap-6 text-mute"
        >
          <span className="flex items-center gap-3">
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-full border border-line-strong">
              <ArrowDown className="size-3.5 animate-float" />
            </span>
            Scroll to explore
          </span>
          <span className="hidden text-right md:block">
            Fig. 01 — B-DNA · 10.5 bp per turn ·{" "}
            <span className="normal-case tracking-[0.08em] text-gfp">λem 509 nm</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
