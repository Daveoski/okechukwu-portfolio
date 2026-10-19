import Image from "next/image";
import type { ReactNode } from "react";
import { accentHex, type Project } from "@/lib/data";
import { cn, pad } from "@/lib/utils";
import { Reveal, RevealMask, RevealText } from "@/components/motion/reveal";
import { TransitionLink } from "@/components/transition/transition-link";
import { ArrowSwap, ButtonLink } from "@/components/ui/button-link";
import { ArrowLeft } from "@/components/ui/icons";
import { LiveDot, SectionLabel, Tag } from "@/components/ui/section-label";
import { ProjectCover } from "./project-cover";
import { ScrollProgress } from "./scroll-progress";

export function CaseHero({ project, total }: { project: Project; total: number }) {
  return (
    <section className="relative isolate pb-12 pt-32 md:pt-40">
      <ScrollProgress />
      <div
        aria-hidden="true"
        className="hairline-grid absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,black_10%,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[-10%] top-[-20%] -z-10 aspect-square w-[50vw] rounded-full blur-[130px]"
        style={{ background: accentHex[project.accent], opacity: 0.08 }}
      />
      <div className="container-x">
        <Reveal y={12} className="flex items-center justify-between gap-6">
          <TransitionLink
            href="/work"
            className="group type-label inline-flex items-center gap-2 text-mute transition-colors hover:text-gfp"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-500 ease-expo group-hover:-translate-x-1" />
            All work
          </TransitionLink>
          <span className="type-label text-mute">
            Case study <span className="text-gfp">{project.index}</span> / {pad(total)}
          </span>
        </Reveal>

        <RevealText as="h1" text={project.title} className="type-display mt-10 font-semibold" />
        <Reveal delay={0.3} className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="type-lead text-bone-dim lg:col-span-7">{project.summary}</p>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            {project.live ? (
              <ButtonLink href={project.live} external>
                Visit live site
              </ButtonLink>
            ) : null}
            {project.repo ? (
              <ButtonLink href={project.repo} external variant={project.live ? "ghost" : "primary"}>
                View source
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.4} className="mt-14">
          <dl className="grid grid-cols-2 border-t border-line md:grid-cols-4">
            <Fact label="Role">{project.role}</Fact>
            <Fact label="Year">{project.year}</Fact>
            <Fact label="Status">
              <span className="inline-flex items-center gap-2">
                {project.status === "Live" ? <LiveDot /> : null}
                {project.status}
              </span>
            </Fact>
            <Fact label="Type">{project.kicker}</Fact>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-line py-5 pr-4 md:border-b-0">
      <dt className="type-label text-mute">{label}</dt>
      <dd className="mt-2 text-[15px] text-bone">{children}</dd>
    </div>
  );
}

export function CaseCover({ project, children }: { project: Project; children?: ReactNode }) {
  return (
    <div className="container-x">
      <RevealMask>
        <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem] border border-line bg-ink-850 sm:aspect-16/9 md:rounded-[2.25rem]">
          {children ?? <ProjectCover slug={project.slug} sizes="(min-width: 1680px) 1600px, 96vw" preload />}
        </div>
      </RevealMask>
    </div>
  );
}

export function CaseSection({
  index,
  label,
  title,
  children,
  className,
}: {
  index: string;
  label: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container-x py-20 md:py-28", className)}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index={index}>{label}</SectionLabel>
          </div>
        </div>
        <div className="lg:col-span-8">
          {title ? <RevealText as="h2" text={title} className="type-h1 font-semibold" /> : null}
          <div className={cn(title && "mt-10")}>{children}</div>
        </div>
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <Reveal className="type-lead max-w-3xl space-y-6 text-bone-dim [&_strong]:font-medium [&_strong]:text-bone">
      {children}
    </Reveal>
  );
}

export function CaseFigure({
  src,
  alt,
  caption,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <figure className={className}>
      <RevealMask>
        <div className="overflow-hidden rounded-3xl border border-line bg-ink-850">
          <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 64vw, 96vw" className="h-auto w-full" />
        </div>
      </RevealMask>
      <figcaption className="type-label mt-4 text-mute">{caption}</figcaption>
    </figure>
  );
}

export function FeatureGrid({
  items,
}: {
  items: { title: string; body: string; tag?: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          delay={(i % 2) * 0.06}
          as="article"
          className="rounded-3xl border border-line bg-ink-850 p-6 md:p-7"
        >
          <div className="type-label flex items-center justify-between text-mute">
            <span className="text-gfp">{pad(i + 1)}</span>
            {item.tag ? <span>{item.tag}</span> : null}
          </div>
          <h3 className="mt-8 text-xl font-semibold tracking-[-0.025em]">{item.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-bone-dim">{item.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function StackList({ groups }: { groups: { label: string; items: string[] }[] }) {
  return (
    <dl className="grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2">
      {groups.map((group) => (
        <Reveal key={group.label} y={14}>
          <dt className="type-label text-mute">{group.label}</dt>
          <dd className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}

export function NextProject({ project }: { project: Project }) {
  return (
    <section aria-label="Next case study" className="border-t border-line">
      <TransitionLink
        href={project.href}
        data-cursor="view"
        data-cursor-label="Next"
        className="group container-x grid gap-10 py-20 md:grid-cols-12 md:items-center md:py-28"
      >
        <div className="md:col-span-7">
          <p className="type-label text-mute">Next case study — {project.index}</p>
          <p className="type-display mt-6 font-semibold transition-colors duration-500 group-hover:text-gfp">
            {project.title}
          </p>
          <p className="mt-6 max-w-xl text-bone-dim">{project.kicker}</p>
          <span className="mt-8 inline-flex items-center gap-3 text-[15px] font-medium">
            Read the case study
            <span className="grid size-11 place-items-center rounded-full bg-gfp text-ink-950">
              <ArrowSwap />
            </span>
          </span>
        </div>
        <div className="md:col-span-5">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-line">
            <div className="absolute inset-0 transition-transform duration-[1400ms] ease-expo group-hover:scale-105">
              <ProjectCover slug={project.slug} sizes="(min-width: 768px) 40vw, 96vw" />
            </div>
          </div>
        </div>
      </TransitionLink>
    </section>
  );
}
