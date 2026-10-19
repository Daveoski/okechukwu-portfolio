import type { Metadata } from "next";
import { accentHex, getProject, projects } from "@/lib/data";
import { Reveal } from "@/components/motion/reveal";
import {
  CaseCover,
  CaseHero,
  CaseSection,
  FeatureGrid,
  NextProject,
  Prose,
  StackList,
} from "@/components/work/case-study";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "This site — case study",
  description:
    "How this portfolio was designed and built: a fluorescence-microscopy palette, a hand-written canvas DNA helix, custom page transitions and fully prerendered Next.js 16 pages.",
  alternates: { canonical: "/work/portfolio" },
};

const palette = [
  { name: "GFP", role: "Primary accent", hex: accentHex.gfp, nm: "509", note: "Green fluorescent protein — the site's signature colour." },
  { name: "CFP", role: "Secondary", hex: accentHex.cyan, nm: "475", note: "Cyan variant; the second DNA strand." },
  { name: "DAPI", role: "Data", hex: accentHex.dapi, nm: "461", note: "The classic nuclear stain." },
  { name: "YFP", role: "Highlights", hex: accentHex.amber, nm: "527", note: "Yellow fluorescent protein." },
  { name: "mCherry", role: "Alerts", hex: accentHex.cherry, nm: "610", note: "Red fluorescent protein." },
];

const engineering = [
  {
    title: "Prerendered, then animated",
    body: "Every route is static HTML from Next.js 16 with Cache Components. Motion is layered on top, so content is there before a single script runs.",
    tag: "Performance",
  },
  {
    title: "A transition state machine",
    body: "Links route through a curtain: cover → navigate → wait for the new route to commit → reveal. Entrance animations wait for the curtain, and stalled navigations time out safely.",
    tag: "Motion",
  },
  {
    title: "B-DNA, not a sine wave",
    body: "The hero helix uses real geometry — 10.5 base pairs per turn and offset backbones that form major and minor grooves — depth-sorted on a 2D canvas that pauses off-screen.",
    tag: "Canvas",
  },
  {
    title: "Motion with manners",
    body: "prefers-reduced-motion disables smooth scrolling, the preloader, curtains and canvas animation. The custom cursor only appears on fine pointers.",
    tag: "Accessibility",
  },
  {
    title: "Readable by everyone",
    body: "Semantic landmarks, a skip link, visible focus states, screen-reader text for split headings, and AA contrast across the palette.",
    tag: "Accessibility",
  },
  {
    title: "Secure headers by default",
    body: "HSTS, nosniff, frame denial, a strict referrer policy and a locked-down permissions policy ship on every response.",
    tag: "Security",
  },
];

export default function PortfolioCaseStudy() {
  const { project, next } = getProject("portfolio");

  return (
    <>
      <CaseHero project={project} total={projects.length} />
      <CaseCover project={project} />

      <CaseSection index="01" label="Brief" title="Tell one story: *biochemist → builder.*">
        <Prose>
          <p>
            A portfolio is a product with one job — help the right people understand who you are,
            quickly. Mine had to connect two worlds that rarely share a page:{" "}
            <strong>the lab bench and the codebase</strong>. So the whole design borrows from the lab,
            and the engineering is held to the same standard as client work.
          </p>
        </Prose>
      </CaseSection>

      <CaseSection index="02" label="Palette" title="Lit like a *fluorescence micrograph.*">
        <Prose>
          <p>
            Fluorescence microscopy makes biology glow against black. Each accent here is a fluorophore
            named after its emission peak, and each has a job.
          </p>
        </Prose>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {palette.map((swatch, i) => (
            <Reveal key={swatch.name} delay={i * 0.06} className="overflow-hidden rounded-3xl border border-line bg-ink-850">
              <div className="aspect-4/3" style={{ background: swatch.hex }} />
              <div className="p-5">
                <p className="type-label text-mute">{swatch.role}</p>
                <p className="mt-2 text-lg font-semibold">{swatch.name}</p>
                <p className="mt-1 font-mono text-[12px] text-bone-dim">
                  {swatch.hex.toUpperCase()} · λem {swatch.nm} nm
                </p>
                <p className="mt-3 text-[13px] leading-snug text-mute">{swatch.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </CaseSection>

      <CaseSection index="03" label="Type" title="Three voices, *one system.*">
        <div className="grid gap-4">
          {[
            { family: "Geist", role: "Display & body", sample: "From molecules to modules.", className: "font-sans font-semibold tracking-[-0.045em]" },
            { family: "Instrument Serif", role: "Accent", sample: "a biochemist’s mind", className: "font-serif italic text-gfp" },
            { family: "Geist Mono", role: "Labels & data", sample: "FIG. 01 — B-DNA · 10.5 BP / TURN", className: "font-mono text-[0.42em] tracking-[0.14em] text-bone-dim" },
          ].map((type, i) => (
            <Reveal key={type.family} delay={i * 0.06} className="rounded-3xl border border-line bg-ink-850 p-6 md:p-8">
              <div className="type-label flex justify-between text-mute">
                <span>{type.family}</span>
                <span>{type.role}</span>
              </div>
              <p className={cn("mt-6 text-[clamp(2rem,5vw,4.5rem)] leading-none", type.className)}>{type.sample}</p>
            </Reveal>
          ))}
        </div>
      </CaseSection>

      <CaseSection index="04" label="Engineering" title="Held to a *production standard.*">
        <FeatureGrid items={engineering} />
      </CaseSection>

      <CaseSection index="05" label="Stack">
        <StackList
          groups={[
            { label: "Framework", items: ["Next.js 16", "React 19", "TypeScript", "Cache Components"] },
            { label: "Styling", items: ["Tailwind CSS v4", "Design tokens", "Container queries"] },
            { label: "Motion", items: ["Motion", "Lenis", "Canvas 2D", "SVG path drawing"] },
            { label: "Delivery", items: ["Vercel", "GitHub", "Static prerendering", "Security headers"] },
          ]}
        />
      </CaseSection>

      <NextProject project={next} />
    </>
  );
}
