import type { Metadata } from "next";
import { getProject, projects } from "@/lib/data";
import { Reveal } from "@/components/motion/reveal";
import { ArchFrame, ArchLink, ArchNode } from "@/components/work/architecture";
import {
  CaseCover,
  CaseFigure,
  CaseHero,
  CaseSection,
  FeatureGrid,
  NextProject,
  Prose,
  StackList,
} from "@/components/work/case-study";
import { HireDeskPipeline } from "@/components/work/hiredesk-pipeline";

export const metadata: Metadata = {
  title: "HireDesk — case study",
  description:
    "HireDesk is an applicant-tracking platform founded and built by Okechukwu Orjionuchie: a Next.js web client and FastAPI backend on Vercel and Neon Postgres, with advisory AI screening.",
  alternates: { canonical: "/work/hiredesk" },
};

const features = [
  { title: "AI screening, final review", body: "Gemini reads CVs, documents and answers, then weighs interview scorecards against the team's assessment. It advises; the hiring manager decides.", tag: "AI" },
  { title: "Job adverts in minutes", body: "Turn a title and a few notes into a description, required qualifications and eligibility criteria.", tag: "AI" },
  { title: "Public application links", body: "One shareable link per role. Candidates apply and upload a CV and documents without creating an account.", tag: "Candidates" },
  { title: "Virtual or in-person interviews", body: "Schedule with a meeting link or a location, reschedule or cancel, and keep everyone informed.", tag: "Scheduling" },
  { title: "Independent scorecards", body: "Interviewers rate and recommend on their own, so feedback stays honest and comparable.", tag: "Assessment" },
  { title: "Progress reports by email", body: "Admins see open roles, pipeline movement and outcomes — and a scheduled job emails the report every Monday.", tag: "Reporting" },
  { title: "Team invitations", body: "Invite hiring managers and interviewers through shareable links; each person sees only what their role needs.", tag: "Access" },
  { title: "Secure sign-in", body: "Email and password or a Google work account, with rate-limited logins and expiring sessions.", tag: "Security" },
];

const decisions = [
  {
    title: "Uploads that bypass the 4.5 MB limit",
    body: "Vercel Functions cap request bodies at 4.5 MB, so the apply page uploads CVs straight from the browser to Cloudinary with a signed, one-file upload. The backend then verifies the real size and type with Cloudinary before it accepts the application.",
    tag: "Infrastructure",
  },
  {
    title: "Migrations as part of the pipeline",
    body: "GitHub Actions runs the backend test suite on every push and pull request. On main it then applies Alembic migrations to Neon, so schema and code ship together.",
    tag: "CI/CD",
  },
  {
    title: "Tests that can't touch real data",
    body: "The pytest fixture refuses to run unless the database name ends in _test, then truncates it before each test — a guard rail that makes wiping production impossible by accident.",
    tag: "Testing",
  },
  {
    title: "Security in the backend, not the browser",
    body: "FastAPI owns authentication, authorisation and workflow rules: Argon2 password hashing, signed JWT sessions, Google sign-in verified server-side and role-based permissions enforced by the API.",
    tag: "Security",
  },
];

export default function HireDeskPage() {
  const { project, next } = getProject("hiredesk");

  return (
    <>
      <CaseHero project={project} total={projects.length} />
      <CaseCover project={project} />

      <CaseSection index="01" label="Overview" title="Hiring, made calm for *growing teams.*">
        <Prose>
          <p>
            Growing companies hire across inboxes, spreadsheets and chat threads. CVs get lost,
            interview notes live in personal documents, and nobody is quite sure who made the final call
            — or why.
          </p>
          <p>
            <strong>HireDesk brings every application, interview, scorecard and decision into one shared
            workspace.</strong> I founded it, wrote the product and software requirements, designed it and
            built it end to end: a Next.js web client and a FastAPI backend that owns authentication,
            authorisation, hiring rules, persistence, uploads and email.
          </p>
        </Prose>
      </CaseSection>

      <CaseSection index="02" label="The pipeline" title="A clear line from *start to decision.*">
        <Prose>
          <p>
            Every role moves candidates through five stages. Interviewers submit independent scorecards,
            the AI assistant weighs the evidence and advises, and the hiring manager records the
            decision — with admins notified as things move.
          </p>
        </Prose>
        <Reveal className="mt-10">
          <HireDeskPipeline />
        </Reveal>
      </CaseSection>

      <CaseSection index="03" label="Features" title="Built for the way *teams really hire.*">
        <FeatureGrid items={features} />
      </CaseSection>

      <CaseSection index="04" label="Architecture" title="Two deploys, *one repository.*">
        <Prose>
          <p>
            The repo deploys as two Vercel projects — the Next.js client and the FastAPI API — and every
            push to main redeploys both. Neon Postgres comes from the Vercel Marketplace.
          </p>
        </Prose>
        <div className="mt-10">
          <ArchFrame
            title="Fig. 1 — HireDesk system architecture"
            footer={
              <div className="grid gap-3 text-[13px] text-bone-dim md:grid-cols-3">
                <p><span className="type-label mr-2 text-gfp">CI</span>pytest on every push and pull request</p>
                <p><span className="type-label mr-2 text-gfp">CD</span>Alembic migrations to Neon on main</p>
                <p><span className="type-label mr-2 text-gfp">Cron</span>Admin reports, Mondays 08:00 UTC</p>
              </div>
            }
          >
            <div className="grid items-stretch md:grid-cols-[1fr_auto_1.2fr_auto_1.2fr]">
              <ArchNode kicker="Client" title="Browser" detail="Admins, hiring managers, interviewers & candidates" />
              <ArchLink label="HTTPS" className="md:w-20" />
              <ArchNode tone="gfp" kicker="Vercel · frontend" title="Next.js web client" detail="TypeScript · React 19 · TanStack Query · Zod · Tailwind CSS" />
              <ArchLink label="REST · JWT" className="md:w-24" />
              <ArchNode tone="cyan" kicker="Vercel · backend" title="FastAPI API" detail="SQLModel · Pydantic v2 · Argon2 · role-based access" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <ArchNode tone="dapi" kicker="Data" title="Neon Postgres" detail="psycopg 3 · Alembic migrations" />
              <ArchNode tone="amber" kicker="Files" title="Cloudinary" detail="Signed direct uploads, verified server-side" />
              <ArchNode tone="cherry" kicker="Email" title="Resend" detail="Stage moves, interviews, scorecards, reports" />
              <ArchNode tone="gfp" kicker="Google" title="Gemini & Sign-in" detail="google-genai screening · google-auth" />
            </div>
          </ArchFrame>
        </div>
      </CaseSection>

      <CaseSection index="05" label="Engineering decisions" title="The details *that matter.*">
        <FeatureGrid items={decisions} />
      </CaseSection>

      <CaseSection index="06" label="Stack">
        <StackList
          groups={[
            { label: "Frontend", items: ["Next.js", "React 19", "TypeScript", "TanStack Query", "React Hook Form", "Zod", "Zustand", "Radix UI", "Tailwind CSS v4", "Bun"] },
            { label: "Backend", items: ["Python", "FastAPI", "SQLModel", "Pydantic v2", "PyJWT", "pwdlib · Argon2", "google-auth"] },
            { label: "Data & services", items: ["Neon Postgres", "psycopg 3", "Alembic", "Cloudinary", "Resend", "Gemini (google-genai)"] },
            { label: "Delivery", items: ["Vercel × 2", "GitHub Actions", "pytest", "PRD & SRS specs", "Work log"] },
          ]}
        />
      </CaseSection>

      <CaseSection index="07" label="In production" title="Live, and *in the open.*">
        <div className="grid gap-10">
          <CaseFigure
            src="/images/work/hiredesk-features.jpg"
            alt="HireDesk features section: AI screening and final review, job adverts, public application links, interviews, scorecards, progress reports, team invitations and secure sign-in"
            caption="Fig. 2 — Everything in one workspace"
            width={2880}
            height={2372}
          />
          <div className="grid gap-10 md:grid-cols-2">
            <CaseFigure
              src="/images/work/hiredesk-workflow.jpg"
              alt="HireDesk workflow: applications with context, interviews thoughtfully assigned, decisions clearly recorded"
              caption="Fig. 3 — One process, three clear steps"
              width={2880}
              height={1512}
            />
            <CaseFigure
              src="/images/work/hiredesk-roles.jpg"
              alt="HireDesk roles: company admin, hiring manager and interviewer, each with distinct responsibilities"
              caption="Fig. 4 — Distinct roles, shared outcome"
              width={2880}
              height={1420}
            />
          </div>
        </div>
        <Prose>
          <p className="mt-12">
            HireDesk is live at <strong>hiredesk-app.vercel.app</strong>. Building it solo taught me to
            treat requirements, tests and migrations as product features — and to keep AI in an advisory
            role, so the people accountable for a hire stay the ones who make it.
          </p>
        </Prose>
      </CaseSection>

      <NextProject project={next} />
    </>
  );
}
