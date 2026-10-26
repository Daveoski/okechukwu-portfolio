import type { Metadata } from "next";
import type { ReactNode } from "react";
import { awards, certifications, education, experience, volunteering } from "@/lib/data";
import { site } from "@/lib/site";
import { PrintButton } from "@/components/cv/print-button";
import { Reveal } from "@/components/motion/reveal";
import { TransitionLink } from "@/components/transition/transition-link";
import { ArrowLeft } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Printable CV of Okechukwu David Orjionuchie — full-stack developer (Next.js, React, TypeScript, Node.js, Python/FastAPI, PostgreSQL, MongoDB) with a biochemistry degree.",
  alternates: { canonical: "/cv" },
};

const skills = [
  { label: "Frontend", value: "Next.js, React, JavaScript, TypeScript, HTML5, Tailwind CSS, shadcn/ui" },
  { label: "Backend", value: "Node.js, Express, Python, FastAPI, REST APIs" },
  { label: "Databases", value: "PostgreSQL (relational/SQL), MongoDB (NoSQL), SQL Server" },
  { label: "Tools & cloud", value: "Git, GitHub & Actions, Vercel, Microsoft Azure, cloud fundamentals (IaaS, PaaS, SaaS), virtual machines" },
  { label: "Security", value: "Network traffic monitoring, incident response and reporting, firewalls and encryption software" },
  { label: "Professional", value: "Project & stakeholder management, technical reporting, data analysis, Microsoft Excel, Word & PowerPoint" },
  { label: "People", value: "Customer experience, customer relationship management, leadership, teamwork" },
];

const cvProjects = [
  {
    title: "HirePlume",
    role: "Founder & Full-Stack Developer",
    meta: "hireplume-app.vercel.app · Next.js, TypeScript, FastAPI, PostgreSQL · Vercel & Neon",
    points: [
      "Built and launched an applicant-tracking platform that brings applications, interview scheduling, scorecards and hiring decisions into one shared workspace.",
      "One public application link per role (no candidate account), a five-stage pipeline from Applied to Hired, and signed direct-to-Cloudinary CV uploads verified by the API.",
      "Advisory AI screening (Gemini) that weighs CVs against interview scorecards while the hiring manager makes the final decision.",
      "Email/password and Google sign-in, Argon2 hashing, role-based permissions, rate-limited logins and expiring sessions; CI runs tests and Alembic migrations on every deploy.",
    ],
  },
  {
    title: "BookNook Reading Tracker",
    role: "Cloud computing capstone",
    meta: "github.com/Daveoski/david-booknook · Node.js, Express, Azure SQL, Key Vault, Blob Storage",
    points: [
      "Built a reading-tracker REST API on Azure App Service with Azure SQL, secrets loaded from Key Vault through managed identity, cover images in Blob Storage and deployment through GitHub Actions.",
    ],
  },
];

const technicalIds = new Set(["hackathon-africa", "foretrust", "unn"]);

export default function CvPage() {
  const technical = experience.filter((e) => technicalIds.has(e.id));
  const additional = experience.filter((e) => !technicalIds.has(e.id));

  return (
    <div className="container-x pb-24 pt-32 md:pt-36 print:p-0">
      <div data-print-hide>
        <Reveal y={12} className="mx-auto mb-8 flex max-w-[210mm] flex-wrap items-center justify-between gap-4">
          <TransitionLink
            href="/experience"
            className="group type-label inline-flex items-center gap-2 text-mute transition-colors hover:text-gfp"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-500 ease-expo group-hover:-translate-x-1" />
            Experience
          </TransitionLink>
          <PrintButton />
        </Reveal>
      </div>

      <Reveal y={30} amount={0.02}>
        <article className="mx-auto max-w-[210mm] rounded-sm bg-paper px-[8%] py-[9%] text-[13.5px] leading-relaxed text-paper-ink shadow-[0_40px_120px_-30px_rgba(92,255,176,0.18)] print:max-w-none print:rounded-none print:p-0 print:text-[10.5pt] print:shadow-none">
          <header className="border-b-2 border-paper-ink pb-6 text-center">
            <h1 className="text-[2.1em] font-semibold tracking-[0.06em] uppercase">Orjionuchie Okechukwu David</h1>
            <p className="mt-1 font-medium text-[#1f6b4a]">
              Full-Stack Developer · Next.js, React, TypeScript, Node.js, Python (FastAPI), PostgreSQL, MongoDB
            </p>
            <p className="mt-2 text-[0.92em] text-[#4b5852]">
              {site.location} · {site.phone} · {site.email}
              <br />
              linkedin.com/in/okechukwu-orjionuchie-12510818a · github.com/Daveoski
            </p>
          </header>

          <CvSection title="Profile">
            <p>
              Full-stack developer building responsive web applications with Next.js, React and TypeScript
              on Node.js and Python (FastAPI) back ends, using PostgreSQL and MongoDB. Founder and developer
              of HirePlume, a live applicant-tracking platform. Brings a biochemistry degree and health
              certifications, plus hands-on cybersecurity, cloud computing, project-management and
              customer-facing experience, and is seeking a full-stack developer or wider technology role where
              clear communication, teamwork and reliable delivery matter.
            </p>
          </CvSection>

          <CvSection title="Skills">
            <dl className="grid gap-1">
              {skills.map((s) => (
                <div key={s.label} className="grid grid-cols-[8.5em_1fr] gap-3">
                  <dt className="font-semibold">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </CvSection>

          <CvSection title="Projects">
            {cvProjects.map((p) => (
              <Entry key={p.title} title={p.title} subtitle={p.role} meta={p.meta} points={p.points} />
            ))}
          </CvSection>

          <CvSection title="Technical experience">
            {technical.map((e) => (
              <Entry
                key={e.id}
                title={e.role}
                subtitle={[e.org, e.context].filter(Boolean).join(" — ")}
                date={e.period}
                points={e.points}
              />
            ))}
          </CvSection>

          <CvSection title="Additional experience">
            {additional.map((e) => (
              <Entry
                key={e.id}
                title={e.role}
                subtitle={[e.org, e.context].filter(Boolean).join(", ")}
                date={e.period}
                points={e.points.slice(0, 1)}
              />
            ))}
          </CvSection>

          <CvSection title="Education">
            {education.map((e) => (
              <Entry key={e.title} title={`${e.title} — ${e.detail}`} subtitle={e.org} date={e.year} />
            ))}
          </CvSection>

          <CvSection title="Training & certifications">
            <ul className="grid gap-1">
              {certifications.map((c) => (
                <li key={c.title} className="flex justify-between gap-4 break-inside-avoid">
                  <span>
                    {c.title}
                    {c.issuer ? <span className="text-[#4b5852]"> — {c.issuer}</span> : null}
                  </span>
                  <span className="shrink-0 tabular-nums text-[#4b5852]">{c.year}</span>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection title="Awards">
            <ul className="grid gap-1">
              {awards.map((a) => (
                <li key={a.title} className="flex justify-between gap-4">
                  <span>
                    {a.title}
                    {a.org ? <span className="text-[#4b5852]">, {a.org}</span> : null}
                  </span>
                  <span className="shrink-0 tabular-nums text-[#4b5852]">{a.year}</span>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection title="Volunteering">
            <ul className="grid gap-1">
              {volunteering.map((v) => (
                <li key={v.title} className="flex justify-between gap-4">
                  <span>
                    {v.title}
                    {v.note ? <span className="text-[#4b5852]"> — {v.note}</span> : null}
                  </span>
                  <span className="shrink-0 tabular-nums text-[#4b5852]">{v.year}</span>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection title="References">
            <p>Available on request.</p>
          </CvSection>
        </article>
      </Reveal>
    </div>
  );
}

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6 break-inside-avoid-page">
      <h2 className="border-b border-[#c9d1cc] pb-1 text-[0.82em] font-bold tracking-[0.14em] text-[#1f6b4a] uppercase">
        {title}
      </h2>
      <div className="mt-3 grid gap-3">{children}</div>
    </section>
  );
}

function Entry({
  title,
  subtitle,
  meta,
  date,
  points,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  date?: string;
  points?: string[];
}) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <p className="font-semibold">
          {title}
          {subtitle ? <span className="font-normal text-[#4b5852]"> — {subtitle}</span> : null}
        </p>
        {date ? <p className="shrink-0 text-[0.92em] tabular-nums text-[#4b5852]">{date}</p> : null}
      </div>
      {meta ? <p className="text-[0.92em] text-[#1f6b4a]">{meta}</p> : null}
      {points?.length ? (
        <ul className="mt-1 list-disc space-y-0.5 pl-5 marker:text-[#1f6b4a]">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
