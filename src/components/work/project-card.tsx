import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { RevealMask, Reveal } from "@/components/motion/reveal";
import { TransitionLink } from "@/components/transition/transition-link";
import { ArrowSwap } from "@/components/ui/button-link";
import { LiveDot, Tag } from "@/components/ui/section-label";
import { ProjectCover } from "./project-cover";

export function ProjectCard({
  project,
  large = false,
  className,
}: {
  project: Project;
  large?: boolean;
  className?: string;
}) {
  return (
    <article className={className}>
      <TransitionLink
        href={project.href}
        data-cursor="view"
        data-cursor-label="View case"
        className="group block"
        aria-label={`${project.title} — ${project.kicker}. View case study`}
      >
        <RevealMask>
          <div
            className={cn(
              "relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-850",
              large ? "aspect-4/3 sm:aspect-video lg:aspect-21/10" : "aspect-4/3",
            )}
          >
            <div className="absolute inset-0 transition-transform duration-1400 ease-expo group-hover:scale-[1.035]">
              <ProjectCover
                slug={project.slug}
                sizes={large ? "(min-width: 1024px) 92vw, 100vw" : "(min-width: 768px) 46vw, 100vw"}
              />
            </div>
            <span className="absolute bottom-4 right-4 grid size-12 translate-y-3 place-items-center rounded-full bg-gfp text-ink-950 opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100 md:bottom-5 md:right-5">
              <ArrowSwap />
            </span>
          </div>
        </RevealMask>

        <Reveal y={20} className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 className="flex items-baseline gap-4">
              <span className="type-label text-mute">{project.index}</span>
              <span className="type-h2 font-semibold transition-colors duration-500 group-hover:text-gfp">
                {project.title}
              </span>
            </h3>
            <p className="type-label flex flex-wrap items-center gap-x-2 text-mute">
              {project.kicker} · {project.year} ·
              <span className="inline-flex items-center gap-2 text-gfp">
                {project.status === "Live" ? <LiveDot /> : null}
                {project.status}
              </span>
            </p>
          </div>
          <p className={cn("mt-3 text-bone-dim", large ? "max-w-3xl text-lg" : "max-w-xl")}>{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </Reveal>
      </TransitionLink>
    </article>
  );
}
