import type { ReactNode } from "react";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

export function PageHero({
  label,
  index,
  title,
  lead,
  children,
  className,
  titleClassName,
}: {
  label: string;
  index?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <section className={cn("relative isolate pb-16 pt-36 md:pb-24 md:pt-44", className)}>
      <div
        aria-hidden="true"
        className="hairline-grid absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,black_10%,transparent_90%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-[-10%] top-[-30%] -z-10 aspect-square w-[55vw] rounded-full bg-gfp/[0.06] blur-[120px]"
      />
      <div className="container-x">
        <Reveal y={16}>
          <SectionLabel index={index}>{label}</SectionLabel>
        </Reveal>
        <RevealText as="h1" text={title} className={cn("type-display mt-8 font-semibold", titleClassName)} />
        {lead ? (
          <Reveal delay={0.35} className="type-lead mt-10 max-w-2xl text-bone-dim">
            {lead}
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}
