import type { Metadata } from "next";
import { accentHex, researchInterests, researchToolkit } from "@/lib/data";
import { Molecule } from "@/components/canvas/molecule";
import { Bridges } from "@/components/lab/bridges";
import { LearningCurve } from "@/components/lab/learning-curve";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel, Tag } from "@/components/ui/section-label";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Lab",
  description:
    "Biochemistry, research and the scientific habits behind the software — Okechukwu Orjionuchie's lab notes, research interests and toolkit.",
  alternates: { canonical: "/lab" },
};

const background = [
  {
    kicker: "Degree · 2021",
    title: "B.Sc. Biochemistry, Second Class Upper",
    body: "University of Nigeria, Nsukka — molecules, metabolism and method, capped by a supervised research project.",
    accent: accentHex.gfp,
  },
  {
    kicker: "Industry · 2020 — 2021",
    title: "Quality control & assurance in pharma",
    body: "Gauze Pharmaceuticals and Lab, Awka — helping manufacturing meet national and international standards, and writing the technical reports that prove it.",
    accent: accentHex.cyan,
  },
  {
    kicker: "Health · 2017 — 2026",
    title: "Public health, mental health & care",
    body: "Advanced certificates in public health, mental health and caregiving (2026), after five years volunteering on COVID-19 awareness with Health for Humanity.",
    accent: accentHex.cherry,
  },
];

export default function LabPage() {
  return (
    <>
      <PageHero
        label="The Lab"
        index="L"
        title="Trained as a scientist. *Still experimenting.*"
        lead={
          <p>
            Biochemistry is where I learned to think; research is how I keep learning. This is the part
            of my work that happens before — and after — the code.
          </p>
        }
      />

      <section aria-labelledby="specimen-title" className="container-x pb-24 md:pb-32">
        <div className="grid items-center gap-12 overflow-hidden rounded-4xl border border-line bg-ink-850 p-6 md:p-10 lg:grid-cols-12 lg:p-14">
          <div className="lg:col-span-5">
            <SectionLabel index="01">Specimen of the day</SectionLabel>
            <h2 id="specimen-title" className="type-h1 mt-6 font-semibold">
              C<sub className="text-[0.45em]">8</sub>H<sub className="text-[0.45em]">10</sub>N
              <sub className="text-[0.45em]">4</sub>O<sub className="text-[0.45em]">2</sub>
            </h2>
            <p className="mt-6 text-bone-dim md:text-lg">
              1,3,7-Trimethylxanthine — better known as{" "}
              <span className="font-serif italic text-gfp">caffeine</span>, the molecule behind many a
              late-night build. Twenty-four atoms, two fused rings, three methyl groups.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2 text-[13px]">
              {[
                { label: "Carbon", color: accentHex.bone },
                { label: "Nitrogen", color: accentHex.dapi },
                { label: "Oxygen", color: accentHex.cherry },
                { label: "Hydrogen", color: "#96a8a0" },
              ].map((el) => (
                <li key={el.label} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-bone-dim">
                  <span className="size-2.5 rounded-full" style={{ background: el.color }} />
                  {el.label}
                </li>
              ))}
            </ul>
            <p className="type-label mt-8 text-mute">Fig. 05 — Drag to rotate · ball-and-stick model</p>
          </div>
          <div className="relative lg:col-span-7">
            <div className="hairline-grid pointer-events-none absolute inset-0 rounded-3xl opacity-70" />
            <div className="pointer-events-none absolute inset-[15%] rounded-full bg-dapi/15 blur-[90px]" />
            <Molecule className="relative aspect-square w-full" />
          </div>
        </div>
      </section>

      <section aria-labelledby="background-title" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <SectionLabel index="02">Background</SectionLabel>
          <RevealText
            as="h2"
            id="background-title"
            text="Trained in the *life sciences.*"
            className="type-h1 mt-6 font-semibold"
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {background.map((item, i) => (
              <Reveal
                key={item.title}
                as="article"
                delay={i * 0.08}
                className="relative flex flex-col justify-between gap-12 overflow-hidden rounded-[1.75rem] border border-line bg-ink-850 p-7 md:min-h-[24rem] md:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }} />
                <span className="type-label" style={{ color: item.accent }}>
                  {item.kicker}
                </span>
                <div>
                  <h3 className="type-h3 font-semibold">{item.title}</h3>
                  <p className="mt-4 text-bone-dim">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="bridges-title" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionLabel index="03">Lab → code</SectionLabel>
              <RevealText
                as="h2"
                id="bridges-title"
                text="Habits that *survived the move.*"
                className="type-h1 mt-6 font-semibold"
              />
            </div>
            <Reveal className="text-bone-dim lg:col-span-4">
              <p>The bench and the codebase reward the same discipline. Here&rsquo;s how each lab habit shows up in the way I build.</p>
            </Reveal>
          </div>
          <div className="mt-14">
            <Bridges />
          </div>
        </div>
      </section>

      <section aria-labelledby="interests-title" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <SectionLabel index="04">Research interests</SectionLabel>
          <RevealText
            as="h2"
            id="interests-title"
            text="Questions I *keep returning to.*"
            className="type-h1 mt-6 font-semibold"
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {researchInterests.map((item, i) => (
              <Reveal
                key={item.title}
                as="article"
                delay={i * 0.07}
                className="group relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-850 p-7"
              >
                <span className="type-label" style={{ color: accentHex[item.accent] }}>
                  {pad(i + 1)}
                </span>
                <h3 className="mt-12 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-bone-dim">{item.body}</p>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-20 -right-20 size-48 rounded-full opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: accentHex[item.accent] }}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="toolkit-title" className="border-t border-line py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionLabel index="05">Research toolkit</SectionLabel>
            <RevealText
              as="h2"
              id="toolkit-title"
              text="Method *before* tools."
              className="type-h1 mt-6 font-semibold"
            />
            <Reveal className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {researchToolkit.map((skill) => (
                  <li key={skill}>
                    <Tag className="px-4 py-2 font-sans text-[14px] text-bone">{skill}</Tag>
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-md text-bone-dim">
                I&rsquo;ve written research reports on business, economics, the social sciences and
                healthcare — and I&rsquo;m open to collaborations in digital health, education and data.
              </p>
              <div className="mt-8">
                <ButtonLink href="/contact">Start a conversation</ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <div className="rounded-[1.75rem] border border-line bg-ink-850 p-6 md:p-10">
              <p className="type-label flex items-center justify-between text-mute">
                <span>Learning kinetics</span>
                <span className="text-gfp">Live estimate</span>
              </p>
              <div className="mt-6">
                <LearningCurve />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
