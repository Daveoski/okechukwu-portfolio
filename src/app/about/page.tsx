import type { Metadata } from "next";
import type { ReactNode } from "react";
import { awards, education, hobbies, interests, principles, volunteering } from "@/lib/data";
import { PageHero } from "@/components/layout/page-hero";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { SpecimenPortrait } from "@/components/home/specimen-portrait";
import { ButtonLink, TextLink } from "@/components/ui/button-link";
import { SectionLabel, Tag } from "@/components/ui/section-label";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Okechukwu David Orjionuchie — a biochemist turned full-stack developer from Enugu, Nigeria. The story, the principles and the person behind the code.",
  alternates: { canonical: "/about" },
};

const story = [
  "I studied Biochemistry at the University of Nigeria, Nsukka, and graduated with Second Class Upper honours in 2021. The lab gave me habits I still lean on every day: question the obvious, control your variables, measure twice and write everything down.",
  "My path since has been deliberately wide. I've helped keep pharmaceutical manufacturing in line with national and international standards, taught secondary-school students, served as a presiding officer for INEC, run inventory and projects, guided clients through digital investments and monitored networks as a cybersecurity analyst. Each role sharpened a different instinct — precision, clarity, integrity, ownership, empathy and vigilance.",
  "Software is where those instincts meet. On the Hackathon Africa programme I build full-stack products with Next.js, React, TypeScript, Node.js and Python (FastAPI) on PostgreSQL and MongoDB — and I founded HireDesk, an applicant-tracking platform that's now live in production.",
  "I'm looking for a full-stack developer or wider technology role where clear communication, teamwork and reliable delivery matter. If that sounds like your team, I'd love to talk.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        index="A"
        title="The scientist who learned *to ship.*"
        lead={
          <p>
            I&rsquo;m Okechukwu David Orjionuchie — a full-stack developer from Enugu, Nigeria, with a
            degree in biochemistry and eight years of working with people, data and technology.
          </p>
        }
      />

      <section aria-label="My story" className="container-x pb-24 md:pb-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SpecimenPortrait figure="Fig. 01" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <SectionLabel index="01">The story</SectionLabel>
            <div className="mt-8 space-y-8">
              {story.map((paragraph, i) => (
                <Reveal key={i} delay={0.05}>
                  <p className={i === 0 ? "type-h3 font-medium leading-[1.3]" : "type-lead text-bone-dim"}>
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16">
              <figure>
                <ParallaxImage
                  src="/images/okechukwu-at-work.jpg"
                  alt="Okechukwu working on a laptop at a desk, wearing a blue patterned shirt"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  strength={5}
                  className="aspect-4/5 rounded-[1.75rem] border border-line sm:aspect-[6/5]"
                  imageClassName="object-[40%_18%]"
                />
                <figcaption className="type-label mt-4 flex justify-between gap-6 text-mute">
                  <span>Fig. 02 — Heads-down, shipping</span>
                  <span className="hidden sm:inline">Field observation</span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal className="mt-12 flex flex-wrap gap-3">
              <ButtonLink href="/work">See my work</ButtonLink>
              <ButtonLink href="/cv" variant="ghost">
                Read my CV
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <SectionLabel index="02">Principles</SectionLabel>
          <RevealText
            as="h2"
            id="principles-title"
            text="Four rules I *work by.*"
            className="type-h1 mt-6 font-semibold"
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {principles.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.08}
                as="article"
                className="group relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-850 p-7 transition-colors duration-500 hover:border-gfp/40 md:p-10"
              >
                <span className="type-label text-gfp">{pad(i + 1)}</span>
                <h3 className="type-h2 mt-10 font-semibold md:mt-16">{item.title}</h3>
                <p className="mt-4 max-w-md text-bone-dim">{item.body}</p>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -right-24 size-64 rounded-full bg-gfp/10 opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-100"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Education, awards and volunteering" className="border-t border-line py-24 md:py-32">
        <div className="container-x grid gap-16 md:grid-cols-3 md:gap-10">
          <Column title="Education" index="03">
            {education.map((e) => (
              <Entry key={e.title} year={e.year} title={e.title} detail={`${e.detail} — ${e.org}`} />
            ))}
          </Column>
          <Column title="Awards" index="04">
            {awards.map((a) => (
              <Entry key={a.title} year={a.year} title={a.title} detail={a.org} />
            ))}
          </Column>
          <Column title="Volunteering" index="05">
            {volunteering.map((v) => (
              <Entry key={v.title} year={v.year} title={v.title} detail={v.note} />
            ))}
          </Column>
        </div>
      </section>

      <section aria-labelledby="beyond-title" className="border-t border-line py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="06">Beyond the code</SectionLabel>
            <RevealText
              as="h2"
              id="beyond-title"
              text="Off the clock, *still curious.*"
              className="type-h1 mt-6 font-semibold"
            />
          </div>
          <div className="space-y-10 lg:col-span-5">
            <Reveal>
              <p className="type-label text-mute">Hobbies</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {hobbies.map((h) => (
                  <li key={h}>
                    <Tag className="px-4 py-2 font-sans text-[15px] text-bone">{h}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="type-label text-mute">Interests</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {interests.map((h) => (
                  <li key={h}>
                    <Tag className="px-4 py-2 font-sans text-[15px] text-bone">{h}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.16} className="flex flex-wrap gap-x-8 gap-y-4">
              <TextLink href="/lab">Visit the lab</TextLink>
              <TextLink href="/experience">Full experience</TextLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Column({ title, index, children }: { title: string; index: string; children: ReactNode }) {
  return (
    <div>
      <SectionLabel index={index}>{title}</SectionLabel>
      <ul className="mt-8 divide-y divide-line border-y border-line">{children}</ul>
    </div>
  );
}

function Entry({ year, title, detail }: { year: string; title: string; detail?: string }) {
  return (
    <li className="py-6">
      <Reveal y={16}>
        <p className="type-label text-gfp">{year}</p>
        <p className="mt-2 text-lg font-medium tracking-[-0.02em]">{title}</p>
        {detail ? <p className="mt-1.5 text-[15px] text-bone-dim">{detail}</p> : null}
      </Reveal>
    </li>
  );
}
