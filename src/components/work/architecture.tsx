import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type Tone = "gfp" | "cyan" | "dapi" | "amber" | "cherry" | "bone";

const toneText: Record<Tone, string> = {
  gfp: "text-gfp",
  cyan: "text-cyan",
  dapi: "text-dapi",
  amber: "text-amber",
  cherry: "text-cherry",
  bone: "text-bone-dim",
};

const toneBorder: Record<Tone, string> = {
  gfp: "border-gfp/35",
  cyan: "border-cyan/35",
  dapi: "border-dapi/35",
  amber: "border-amber/35",
  cherry: "border-cherry/35",
  bone: "border-line-strong",
};

export function ArchNode({
  kicker,
  title,
  detail,
  tone = "bone",
  className,
}: {
  kicker: string;
  title: string;
  detail?: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("relative rounded-2xl border bg-ink-900 p-4 md:p-5", toneBorder[tone], className)}>
      <p className={cn("type-label text-[10px]", toneText[tone])}>{kicker}</p>
      <p className="mt-2 font-semibold tracking-[-0.02em]">{title}</p>
      {detail ? <p className="mt-1 text-[13px] leading-snug text-mute">{detail}</p> : null}
    </div>
  );
}

/** Connector with a travelling pulse. Horizontal on wide screens, vertical when stacked. */
export function ArchLink({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center py-3 md:px-2 md:py-0", className)} aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line-strong md:left-0 md:top-1/2 md:h-px md:w-full md:translate-x-0 md:-translate-y-1/2" />
      <span className="arch-pulse absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-gfp shadow-[0_0_10px_2px_rgba(92,255,176,0.6)] md:left-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-0" />
      {label ? (
        <span className="type-label relative rounded-full border border-line bg-ink-950 px-2.5 py-1 text-[9px] text-bone-dim">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export function ArchFrame({ title, children, footer }: { title: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <Reveal>
      <figure className="overflow-hidden rounded-[1.75rem] border border-line bg-ink-850">
        <div className="hairline-grid relative p-5 md:p-8">{children}</div>
        {footer ? <div className="border-t border-line bg-ink-900/60 p-5 md:px-8">{footer}</div> : null}
        <figcaption className="type-label border-t border-line px-5 py-4 text-mute md:px-8">{title}</figcaption>
      </figure>
    </Reveal>
  );
}
