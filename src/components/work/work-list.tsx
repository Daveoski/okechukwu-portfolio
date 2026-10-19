"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState, type PointerEvent } from "react";
import type { Project } from "@/lib/data";
import { EASE_EXPO } from "@/lib/utils";
import { TransitionLink } from "@/components/transition/transition-link";
import { ArrowSwap } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCover } from "./project-cover";

/** Desktop index: oversized titles with a cover preview that trails the cursor. */
export function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    x.set(event.clientX);
    y.set(event.clientY);
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <ul className="border-t border-line">
        {projects.map((project, i) => (
          <li key={project.slug} className="border-b border-line" onPointerEnter={() => setActive(i)}>
            <Reveal y={24} delay={i * 0.06}>
              <TransitionLink
                href={project.href}
                data-cursor="view"
                data-cursor-label="View case"
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group grid grid-cols-12 items-center gap-6 py-10"
              >
                <span className="type-label col-span-1 text-mute">{project.index}</span>
                <span className="col-span-6 text-[clamp(3rem,6.4vw,7rem)] font-semibold leading-[0.95] tracking-[-0.055em] transition-[color,translate] duration-700 ease-expo group-hover:translate-x-6 group-hover:text-gfp">
                  {project.title}
                </span>
                <span className="col-span-3 text-[15px] text-bone-dim">
                  {project.kicker}
                  <span className="mt-1 block text-mute">{project.role}</span>
                </span>
                <span className="col-span-2 flex items-center justify-end gap-5">
                  <span className="type-label text-mute">{project.year}</span>
                  <span className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors duration-500 group-hover:border-gfp group-hover:bg-gfp group-hover:text-ink-950">
                    <ArrowSwap />
                  </span>
                </span>
              </TransitionLink>
            </Reveal>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40"
        style={{ x: springX, y: springY }}
      >
        <AnimatePresence>
          {active !== null ? (
            <motion.div
              key="preview"
              className="relative aspect-4/3 w-[min(30vw,460px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-line bg-ink-900 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.85)]"
              initial={{ scale: 0.5, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 6 }}
              transition={{ duration: 0.55, ease: EASE_EXPO }}
            >
              {projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.08 }}
                  transition={{ duration: 0.5, ease: EASE_EXPO }}
                >
                  <ProjectCover slug={project.slug} sizes="460px" />
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
