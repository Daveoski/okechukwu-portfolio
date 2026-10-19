"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useId, useState } from "react";
import { experience, experienceCategories, type Experience, type ExperienceCategory } from "@/lib/data";
import { Plus } from "@/components/ui/icons";
import { Tag } from "@/components/ui/section-label";
import { cn, EASE_EXPO } from "@/lib/utils";

export function ExperienceList() {
  const [filter, setFilter] = useState<ExperienceCategory | "all">("all");
  const [open, setOpen] = useState<string | null>(experience[0].id);
  const items = filter === "all" ? experience : experience.filter((e) => e.category === filter);

  return (
    <div>
      <LayoutGroup id="experience-filter">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter roles">
          {experienceCategories.map((cat) => {
            const active = filter === cat.id;
            const count = cat.id === "all" ? experience.length : experience.filter((e) => e.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[14px] transition-colors duration-300",
                  active ? "text-ink-950" : "text-bone-dim hover:text-bone",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="experience-filter-pill"
                    className="absolute inset-0 rounded-full bg-gfp"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full border border-line" />
                )}
                <span className="relative">
                  {cat.label} <span className={active ? "text-ink-950/60" : "text-mute"}>{count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <ul className="mt-10 border-t border-line">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE_EXPO, delay: i * 0.03 }}
              className="border-b border-line"
            >
              <Row item={item} open={open === item.id} onToggle={() => setOpen(open === item.id ? null : item.id)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function Row({ item, open, onToggle }: { item: Experience; open: boolean; onToggle: () => void }) {
  const panelId = useId();
  return (
    <div className="group">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="grid w-full grid-cols-[1fr_auto] items-start gap-6 py-7 text-left md:grid-cols-12 md:py-9"
      >
        <span className="type-label pt-1.5 text-mute md:col-span-3">{item.period}</span>
        <span className="md:col-span-8">
          <span className="block text-[clamp(1.35rem,2.4vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em] transition-colors duration-300 group-hover:text-gfp">
            {item.role}
          </span>
          <span className="mt-2 block text-bone-dim">
            {item.org}
            {item.context ? <span className="text-mute"> · {item.context}</span> : null}
          </span>
        </span>
        <span
          className={cn(
            "col-start-2 row-start-1 grid size-10 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-expo md:col-span-1 md:col-start-12 md:justify-self-end",
            open ? "rotate-45 border-gfp bg-gfp text-ink-950" : "border-line-strong text-bone",
          )}
          aria-hidden="true"
        >
          <Plus className="size-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-9 md:grid-cols-12">
              <ul className="space-y-3 md:col-span-8 md:col-start-4">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3 text-bone-dim">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gfp" />
                    {point}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-2 md:col-span-8 md:col-start-4" aria-label="Skills">
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
