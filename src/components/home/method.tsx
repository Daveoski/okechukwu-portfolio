"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { accentHex, method, type MethodStep } from "@/lib/data";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";
import { MethodGlyph } from "./method-glyph";

export function Method() {
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stack, offset: ["start start", "end end"] });

  return (
    <section aria-labelledby="method-title" className="relative pb-4 pt-24 md:pb-6 md:pt-32">
      <div className="container-x">
        <SectionLabel index="03">The method</SectionLabel>
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealText
            as="h2"
            id="method-title"
            text="The scientific method, *applied to software.*"
            className="type-h1 font-semibold lg:col-span-8"
          />
          <Reveal className="lg:col-span-4">
            <p className="text-bone-dim">
              Biochemistry didn&rsquo;t just teach me molecules. It taught me a way of working — and
              it&rsquo;s the same loop I run on every product I build.
            </p>
            <TextLink href="/lab" className="mt-5">
              Read the lab notes
            </TextLink>
          </Reveal>
        </div>

        <div ref={stack} className="relative mt-12 md:mt-16">
          {method.map((step, i) => (
            <MethodCard key={step.n} step={step} index={i} total={method.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodCard({
  step,
  index,
  total,
  progress,
}: {
  step: MethodStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const color = accentHex[step.accent];
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.04]);
  const dim = useTransform(progress, [index / total, 1], [0, (total - 1 - index) * 0.12]);

  return (
    <div className="sticky top-0 flex min-h-svh items-center py-6 md:py-10">
      <motion.article
        style={{ scale, top: `${index * 1.6}rem` }}
        className="relative w-full origin-top overflow-hidden rounded-4xl border border-line bg-ink-850 md:rounded-[2.5rem]"
      >
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full blur-[110px]"
          style={{ background: color, opacity: 0.1 }}
        />
        <div className="relative grid gap-10 p-7 sm:p-10 md:min-h-[68vh] md:grid-cols-12 md:p-14">
          <div className="flex flex-col md:col-span-7">
            <div className="type-label flex items-center gap-3 text-mute">
              <span style={{ color }}>{step.n}</span>
              <span>/ 0{total}</span>
            </div>
            <h3 className="type-display mt-6 font-semibold md:mt-auto">{step.title}</h3>
            <p className="type-lead mt-6 max-w-xl text-bone-dim">{step.body}</p>
          </div>
          <div className="flex flex-col justify-between gap-10 md:col-span-5">
            <div className="mx-auto aspect-square w-40 md:w-56 lg:w-64">
              <MethodGlyph glyph={step.glyph} color={color} />
            </div>
            <dl className="grid gap-5 border-t border-line pt-6 text-[15px]">
              <div>
                <dt className="type-label text-mute">In the lab</dt>
                <dd className="mt-1.5 font-serif text-xl italic text-bone">&ldquo;{step.lab}&rdquo;</dd>
              </div>
              <div>
                <dt className="type-label text-mute">In code</dt>
                <dd className="mt-1.5 text-bone-dim">{step.code}</dd>
              </div>
            </dl>
          </div>
        </div>
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-950" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}
