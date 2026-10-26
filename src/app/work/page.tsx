import type { Metadata } from "next";
import { archive, projects } from "@/lib/data";
import { site } from "@/lib/site";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button-link";
import { ArrowUpRight } from "@/components/ui/icons";
import { LiveDot, SectionLabel, Tag } from "@/components/ui/section-label";
import { ProjectCard } from "@/components/work/project-card";
import { WorkList } from "@/components/work/work-list";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and builds by Okechukwu Orjionuchie — HirePlume, an applicant-tracking platform on Next.js and FastAPI; BookNook, a cloud API on Microsoft Azure; and more.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Work"
        index="W"
        title="Selected *work.*"
        lead={
          <p>
            Products I&rsquo;ve founded, cloud systems I&rsquo;ve shipped and experiments I&rsquo;ve
            learned from. Each case study covers the problem, the decisions and what shipped.
          </p>
        }
      />

      <section aria-label="Case studies" className="container-x pb-24 md:pb-32">
        <div className="hidden lg:block">
          <WorkList projects={projects} />
        </div>
        <div className="grid gap-16 lg:hidden">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section aria-labelledby="archive-title" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <SectionLabel index={pad(archive.length)}>From the lab notebook</SectionLabel>
              <RevealText
                as="h2"
                id="archive-title"
                text="Smaller builds, *bigger lessons.*"
                className="type-h1 mt-6 font-semibold"
              />
            </div>
            <TextLink href={site.socials.github} external>
              Everything on GitHub
            </TextLink>
          </div>

          <ul className="mt-14 border-t border-line">
            {archive.map((item, i) => (
              <li key={item.title} className="border-b border-line">
                <Reveal y={16} delay={i * 0.04}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-7 transition-colors"
                  >
                    <span className="type-label col-span-2 text-mute md:col-span-1">{item.year}</span>
                    <span className="col-span-10 text-xl font-semibold tracking-[-0.025em] transition-colors duration-300 group-hover:text-gfp md:col-span-4 md:text-2xl">
                      {item.title}
                    </span>
                    <span className="col-span-12 text-[15px] text-bone-dim md:col-span-4">{item.note}</span>
                    <span className="col-span-9 flex flex-wrap gap-1.5 md:col-span-2">
                      {item.stack.map((s) => (
                        <Tag key={s} className="px-2.5 py-0.5 text-[10px]">
                          {s}
                        </Tag>
                      ))}
                    </span>
                    <span className="type-label col-span-3 flex items-center justify-end gap-2 text-mute transition-colors group-hover:text-gfp md:col-span-1">
                      {item.kind === "Live" ? <LiveDot /> : null}
                      {item.kind}
                      <ArrowUpRight className="size-3.5" />
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
