import { archive, projects } from "@/lib/data";
import { RevealText } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectCard } from "@/components/work/project-card";
import { pad } from "@/lib/utils";

export function FeaturedWork() {
  const [lead, ...rest] = projects;
  return (
    <section aria-labelledby="work-title" className="container-x py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <SectionLabel index="02">Selected work</SectionLabel>
          <RevealText
            as="h2"
            id="work-title"
            text="Products, platforms *& experiments.*"
            className="type-h1 mt-6 max-w-4xl font-semibold"
          />
        </div>
        <TextLink href="/work">All work ({pad(projects.length + archive.length)})</TextLink>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-20 md:mt-20 md:grid-cols-2">
        <ProjectCard project={lead} large className="md:col-span-2" />
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
