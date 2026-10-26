"use client";

import { LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn, EASE_EXPO } from "@/lib/utils";

const STAGES = ["Applied", "Screen", "Interview", "Offer", "Hired"] as const;

type Fit = "Strong match" | "Good match" | "Needs review";
type Candidate = { id: string; initials: string; name: string; role: string; fit: Fit; score: number; stage: number };

const START: Candidate[] = [
  { id: "c1", initials: "AO", name: "Adaeze O.", role: "Product designer", fit: "Strong match", score: 4, stage: 2 },
  { id: "c2", initials: "TB", name: "Tunde B.", role: "Backend engineer", fit: "Good match", score: 3, stage: 1 },
  { id: "c3", initials: "CE", name: "Chioma E.", role: "Data analyst", fit: "Strong match", score: 5, stage: 0 },
  { id: "c4", initials: "MI", name: "Musa I.", role: "Frontend engineer", fit: "Needs review", score: 3, stage: 0 },
  { id: "c5", initials: "KM", name: "Kemi M.", role: "QA engineer", fit: "Good match", score: 4, stage: 3 },
  { id: "c6", initials: "IN", name: "Ifeanyi N.", role: "DevOps engineer", fit: "Good match", score: 4, stage: 1 },
];

/** Deterministic script of moves so the board tells a clear story on loop. */
const MOVES = ["c5", "c1", "c3", "c2", "c6", "c1", "c3", "c4", "c2"];

const fitColor: Record<Fit, string> = {
  "Strong match": "text-gfp border-gfp/30 bg-gfp/10",
  "Good match": "text-cyan border-cyan/30 bg-cyan/10",
  "Needs review": "text-amber border-amber/30 bg-amber/10",
};

export function HirePlumePipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [candidates, setCandidates] = useState(START);
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => {
      const next = stepRef.current + 1;
      if (next > MOVES.length) {
        stepRef.current = 0;
        setStep(0);
        setCandidates(START);
        return;
      }
      stepRef.current = next;
      const mover = MOVES[next - 1];
      setStep(next);
      setCandidates((list) =>
        list.map((c) => (c.id === mover ? { ...c, stage: Math.min(STAGES.length - 1, c.stage + 1) } : c)),
      );
    }, 1700);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  const moving = step > 0 && step <= MOVES.length ? MOVES[step - 1] : null;

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-line bg-ink-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-cherry/70" />
            <span className="size-2.5 rounded-full bg-amber/70" />
            <span className="size-2.5 rounded-full bg-gfp/70" />
          </span>
          <span className="text-sm font-medium">Hiring pipeline</span>
          <span className="type-label hidden text-mute sm:inline">— illustrative demo, sample data</span>
        </div>
        <span className="type-label flex items-center gap-2 text-mute">
          <span className="size-1.5 rounded-full bg-gfp" /> AI advises · people decide
        </span>
      </div>

      <div className="overflow-x-auto" data-lenis-prevent-wheel>
        <LayoutGroup>
          <div className="grid min-w-[760px] grid-cols-5 gap-3 p-4">
            {STAGES.map((stage, stageIndex) => {
              const inStage = candidates.filter((c) => c.stage === stageIndex);
              return (
                <div key={stage} className="flex min-h-[23rem] flex-col rounded-2xl bg-ink-850 p-2.5">
                  <div className="flex items-center justify-between px-1.5 pb-3 pt-1">
                    <span className="type-label text-bone-dim">{stage}</span>
                    <motion.span
                      key={inStage.length}
                      initial={{ scale: 1.4, opacity: 0.4 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={cn(
                        "grid size-5 place-items-center rounded-full font-mono text-[10px]",
                        stageIndex === STAGES.length - 1 ? "bg-gfp text-ink-950" : "bg-ink-700 text-bone-dim",
                      )}
                    >
                      {inStage.length}
                    </motion.span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {inStage.map((c) => (
                      <motion.article
                        key={c.id}
                        layoutId={c.id}
                        transition={{ layout: { duration: 0.8, ease: EASE_EXPO } }}
                        className={cn(
                          "rounded-xl border bg-ink-800 p-3 transition-colors duration-500",
                          moving === c.id ? "border-gfp/60" : "border-line",
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-bone/10 font-mono text-[10px] font-medium text-bone">
                            {c.initials}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[13px] font-medium leading-tight">{c.name}</span>
                            <span className="block truncate text-[11px] text-mute">{c.role}</span>
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className={cn("rounded-full border px-2 py-0.5 text-[10px]", fitColor[c.fit])}>{c.fit}</span>
                          <span className="font-mono text-[10px] tracking-tight text-amber" aria-label={`${c.score} of 5`}>
                            {"★".repeat(c.score)}
                            <span className="text-ink-600">{"★".repeat(5 - c.score)}</span>
                          </span>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
