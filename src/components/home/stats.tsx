import { stats } from "@/lib/data";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function Stats() {
  return (
    <section aria-label="By the numbers" className="container-x py-24 md:py-32">
      <SectionLabel index="06">By the numbers</SectionLabel>
      <div className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className="border-b border-line py-10 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
          >
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              className="block text-[clamp(4.5rem,8.5vw,8.5rem)] font-semibold leading-[0.8] tracking-[-0.065em] tabular-nums"
            />
            <p className="mt-8 font-medium">{stat.label}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-mute">{stat.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
