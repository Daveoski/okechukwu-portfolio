"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  accentHex,
  elementGroups,
  elements,
  type ElementGroup,
  type StackElement,
} from "@/lib/data";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { cn, EASE_EXPO, pad } from "@/lib/utils";

const groupKeys = Object.keys(elementGroups) as ElementGroup[];

export function PeriodicStack() {
  const [active, setActive] = useState<StackElement>(elements[0]);
  const [filter, setFilter] = useState<ElementGroup | null>(null);
  const activeColor = accentHex[elementGroups[active.group].accent];

  return (
    <section aria-labelledby="stack-title" className="container-x py-24 md:py-32">
      <SectionLabel index="04">The stack</SectionLabel>
      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <RevealText
            as="h2"
            id="stack-title"
            text="A periodic table *of my stack.*"
            className="type-h1 font-semibold"
          />
          <Reveal className="mt-8">
            <p className="max-w-xl text-bone-dim">
              Thirty elements I work with — from the frameworks I ship in to the science I trained in.
              Hover or tab through them; filter by group.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by group">
              <FilterChip label="All" color={accentHex.bone} active={filter === null} onClick={() => setFilter(null)} />
              {groupKeys.map((key) => (
                <FilterChip
                  key={key}
                  label={elementGroups[key].label}
                  color={accentHex[elementGroups[key].accent]}
                  active={filter === key}
                  onClick={() => setFilter(filter === key ? null : key)}
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Readout */}
        <Reveal className="lg:col-span-5" delay={0.1}>
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-850 p-6 md:p-8"
            aria-live="polite"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full blur-[90px] transition-colors duration-700"
              style={{ background: activeColor, opacity: 0.16 }}
            />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active.sym}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: EASE_EXPO }}
                className="relative"
              >
                <div className="type-label flex items-center justify-between text-mute">
                  <span>Element {pad(active.n)}</span>
                  <span style={{ color: activeColor }}>{elementGroups[active.group].label}</span>
                </div>
                <div className="mt-4 flex items-end gap-5">
                  <span
                    className="text-[clamp(4.5rem,8vw,6.5rem)] font-semibold leading-[0.8] tracking-[-0.06em]"
                    style={{ color: activeColor }}
                  >
                    {active.sym}
                  </span>
                  <span className="pb-1 text-2xl font-medium tracking-[-0.03em]">{active.name}</span>
                </div>
                <p className="mt-5 text-bone-dim">{active.note}</p>
                <p className="type-label mt-5 text-mute">
                  Found in <span className="text-bone-dim">— {active.usedIn.join(" · ")}</span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12" y={24}>
        <ul className="grid grid-cols-5 gap-1.5 sm:grid-cols-6 sm:gap-2 lg:grid-cols-10" aria-label="Stack elements">
          {elements.map((el) => {
            const color = accentHex[elementGroups[el.group].accent];
            const dimmed = filter !== null && filter !== el.group;
            const isActive = active.sym === el.sym;
            return (
              <li key={el.sym}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`${el.name}, ${elementGroups[el.group].label}`}
                  onMouseEnter={() => setActive(el)}
                  onFocus={() => setActive(el)}
                  onClick={() => setActive(el)}
                  className={cn(
                    "group relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-xl border p-2 text-left transition-[opacity,transform,border-color,background-color] duration-500 ease-expo sm:rounded-2xl sm:p-3",
                    dimmed ? "opacity-20" : "opacity-100",
                    isActive ? "-translate-y-1 bg-ink-800" : "bg-ink-900 hover:-translate-y-1",
                  )}
                  style={{ borderColor: isActive ? color : "var(--color-line)" }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(120% 90% at 0% 0%, ${color}22, transparent 65%)`, opacity: isActive ? 1 : undefined }}
                  />
                  <span className="relative flex items-center justify-between font-mono text-[9px] text-mute sm:text-[10px]">
                    {el.n}
                    <span className="size-1.5 rounded-full" style={{ background: color }} />
                  </span>
                  <span
                    className="relative text-[clamp(1rem,4.6vw,1.65rem)] font-semibold leading-none tracking-[-0.04em] transition-colors duration-300 lg:text-[clamp(1.1rem,2vw,1.9rem)]"
                    style={{ color: isActive ? color : undefined }}
                  >
                    {el.sym}
                  </span>
                  <span className="relative hidden truncate text-[11px] text-bone-dim sm:block">{el.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

function FilterChip({
  label,
  color,
  active,
  onClick,
}: {
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors duration-300",
        active ? "border-bone/40 bg-bone/10 text-bone" : "border-line text-bone-dim hover:border-line-strong hover:text-bone",
      )}
    >
      <span className="size-2 rounded-full" style={{ background: color }} />
      {label}
    </button>
  );
}
