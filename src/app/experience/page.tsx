import type { Metadata } from "next";
import { awards, certifications, education, experience } from "@/lib/data";
import { ExperienceList } from "@/components/experience/experience-list";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Roles, certifications, education and awards — eight years across software, cybersecurity, pharmaceutical quality assurance, education and leadership.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        label="Experience"
        index="E"
        title="Eight years. Nine roles. *One through-line.*"
        lead={
          <p>
            Solving real problems for real people — in labs, classrooms, polling units, warehouses,
            security operations and codebases.
          </p>
        }
      >
        <Reveal delay={0.45} className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/cv">Printable CV</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Get in touch
          </ButtonLink>
        </Reveal>
      </PageHero>

      <section aria-labelledby="roles-title" className="container-x pb-24 md:pb-32">
        <SectionLabel index="01">
          <span id="roles-title">Roles — {experience.length}</span>
        </SectionLabel>
        <div className="mt-8">
          <ExperienceList />
        </div>
      </section>

      <section aria-labelledby="certs-title" className="border-t border-line py-24 md:py-32">
        <div className="container-x">
          <SectionLabel index="02">Training & certifications</SectionLabel>
          <RevealText
            as="h2"
            id="certs-title"
            text="Always *in training.*"
            className="type-h1 mt-6 font-semibold"
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <li key={cert.title}>
                <Reveal
                  delay={(i % 3) * 0.06}
                  className="group flex h-full flex-col justify-between gap-10 rounded-3xl border border-line bg-ink-850 p-6 transition-colors duration-500 hover:border-gfp/40 md:p-7"
                >
                  <div className="type-label flex items-center justify-between text-mute">
                    <span className="text-gfp">{cert.domain}</span>
                    <span>{cert.year}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold leading-snug tracking-[-0.025em]">{cert.title}</h3>
                    {cert.issuer ? <p className="mt-2 text-[15px] text-bone-dim">{cert.issuer}</p> : null}
                    {cert.note ? <p className="mt-3 text-sm leading-relaxed text-mute">{cert.note}</p> : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Education and awards" className="border-t border-line py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-10">
          <div>
            <SectionLabel index="03">Education</SectionLabel>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {education.map((e) => (
                <li key={e.title} className="grid gap-2 py-6 sm:grid-cols-[6rem_1fr]">
                  <span className="type-label pt-1 text-gfp">{e.year}</span>
                  <Reveal y={14}>
                    <p className="text-lg font-medium tracking-[-0.02em]">{e.title}</p>
                    <p className="mt-1 text-[15px] text-bone-dim">
                      {e.detail} — {e.org}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel index="04">Awards</SectionLabel>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {awards.map((a) => (
                <li key={a.title} className="grid gap-2 py-6 sm:grid-cols-[6rem_1fr]">
                  <span className="type-label pt-1 text-gfp">{a.year}</span>
                  <Reveal y={14}>
                    <p className="text-lg font-medium tracking-[-0.02em]">{a.title}</p>
                    {a.org ? <p className="mt-1 text-[15px] text-bone-dim">{a.org}</p> : null}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
