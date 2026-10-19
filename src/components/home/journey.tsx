"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { accentHex, journey } from "@/lib/data";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { TransitionLink } from "@/components/transition/transition-link";
import { ArrowSwap } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";
import { cn, pad } from "@/lib/utils";

export function Journey() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!desktop || !track.current) return;
    const node = track.current;
    const measure = () => setDistance(Math.max(0, node.scrollWidth - window.innerWidth));
    const raf = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);
  const pinned = desktop && distance > 0;

  return (
    <section
      ref={section}
      aria-labelledby="journey-title"
      className="relative"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className={cn("py-24 md:py-32", pinned && "sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-0 md:py-0")}>
        <div className="container-x flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel index="05">The journey</SectionLabel>
            <RevealText
              as="h2"
              id="journey-title"
              text="From the lab bench *to production.*"
              className="type-h1 mt-6 font-semibold"
            />
          </div>
          <Reveal className="max-w-md text-bone-dim">
            <p>
              Eight years across science, education, public service, security and software — each one
              left a tool in the kit.
            </p>
          </Reveal>
        </div>

        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className="mt-12 flex flex-col gap-4 px-[clamp(1.25rem,4vw,3.5rem)] lg:w-max lg:flex-row lg:gap-5 lg:pr-[clamp(1.25rem,4vw,3.5rem)]"
        >
          {journey.map((m, i) => {
            const color = accentHex[m.accent];
            return (
              <Reveal
                key={m.year}
                as="article"
                y={pinned ? 0 : 30}
                className="relative flex shrink-0 flex-col justify-between gap-10 overflow-hidden rounded-[1.75rem] border border-line bg-ink-850 p-6 md:p-8 lg:h-[54vh] lg:max-h-130 lg:min-h-100 lg:w-[min(27rem,30vw)]"
              >
                <div className="type-label flex items-center justify-between">
                  <span className="flex items-center gap-2" style={{ color }}>
                    <span className="size-1.5 rounded-full" style={{ background: color }} />
                    {m.tag}
                  </span>
                  <span className="text-mute">
                    {pad(i + 1)} / {pad(journey.length)}
                  </span>
                </div>
                <p
                  className="text-outline text-[clamp(4.25rem,7.5vw,7.25rem)] font-semibold leading-[0.8] tracking-[-0.06em]"
                  style={{ color }}
                >
                  {m.year}
                </p>
                <div>
                  <h3 className="type-h3 font-semibold">{m.title}</h3>
                  <p className="mt-2 text-bone-dim">{m.place}</p>
                  {m.note ? <p className="mt-4 text-sm leading-relaxed text-mute">{m.note}</p> : null}
                </div>
              </Reveal>
            );
          })}

          <TransitionLink
            href="/experience"
            data-cursor="view"
            data-cursor-label="Open"
            className="group relative flex shrink-0 flex-col justify-between gap-10 overflow-hidden rounded-[1.75rem] bg-gfp p-6 text-ink-950 md:p-8 lg:h-[54vh] lg:max-h-130 lg:min-h-100 lg:w-[min(22rem,26vw)]"
          >
            <span className="type-label">Next chapter</span>
            <span className="text-[clamp(1.7rem,2.3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              The full record — roles, certifications &amp; awards.
            </span>
            <span className="flex items-center gap-3 text-[15px] font-medium">
              View experience
              <span className="grid size-10 place-items-center rounded-full bg-ink-950 text-gfp">
                <ArrowSwap />
              </span>
            </span>
          </TransitionLink>
        </motion.div>

        {pinned ? (
          <div className="container-x mt-10">
            <div className="h-px w-full bg-line">
              <motion.div className="h-full origin-left bg-gfp" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
