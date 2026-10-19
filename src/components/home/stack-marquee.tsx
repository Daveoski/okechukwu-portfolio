import { Fragment } from "react";
import { VelocityMarquee } from "@/components/motion/marquee";
import { cn } from "@/lib/utils";

const items = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "Azure",
  "Vercel",
  "Biochemistry",
  "Research",
];

function Hexagon() {
  return (
    <svg viewBox="0 0 24 24" className="mx-[0.5em] size-[0.42em] shrink-0 text-gfp" aria-hidden="true">
      <path d="M12 2 20.66 7v10L12 22l-8.66-5V7Z" fill="currentColor" />
    </svg>
  );
}

export function StackMarquee() {
  return (
    <section aria-label="Core stack" className="border-y border-line py-6 md:py-8">
      <VelocityMarquee>
        {items.map((item, i) => (
          <Fragment key={item}>
            <span
              className={cn(
                "type-h2 px-[0.2em]",
                i % 2 === 1 ? "font-serif font-normal italic text-bone-dim" : "font-semibold text-bone",
              )}
            >
              {item}
            </span>
            <Hexagon />
          </Fragment>
        ))}
      </VelocityMarquee>
    </section>
  );
}
