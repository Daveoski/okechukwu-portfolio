import { ScrollHighlight } from "@/components/motion/scroll-highlight";
import { Reveal } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";
import { SpecimenPortrait } from "./specimen-portrait";

const statement =
  "I'm Okechukwu — a *biochemist* turned full-stack developer. The lab taught me to question assumptions, measure carefully and write everything down. Today I bring that same discipline to software: fast, secure, human-centred products built with Next.js, TypeScript and Python — like *HireDesk*, an applicant-tracking platform I founded and shipped to production.";

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="container-x pb-16 pt-28 md:pb-20 md:pt-40">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionLabel index="01">
            <span id="intro-title">Hello</span>
          </SectionLabel>
          <ScrollHighlight text={statement} className="type-h2 mt-8 font-medium" />
          <Reveal className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
            <TextLink href="/about">More about me</TextLink>
            <TextLink href="/lab">Inside the lab</TextLink>
            <TextLink href="/experience">Full experience</TextLink>
          </Reveal>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <SpecimenPortrait />
        </div>
      </div>
    </section>
  );
}
