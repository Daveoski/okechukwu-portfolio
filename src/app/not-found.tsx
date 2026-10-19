import type { Metadata } from "next";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { HelixGlyph } from "@/components/work/helix-glyph";

export const metadata: Metadata = {
  title: "Specimen not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden pb-16 pt-28">
      <div aria-hidden="true" className="hairline-grid absolute inset-0 -z-10 opacity-70" />
      <HelixGlyph className="absolute right-[4%] top-1/2 -z-10 hidden h-[120%] w-[18vw] -translate-y-1/2 rotate-12 opacity-40 md:block" />
      <div className="container-x">
        <Reveal y={12}>
          <p className="type-label flex items-center gap-3 text-cherry">
            <span className="size-1.5 rounded-full bg-cherry" />
            Error 404 — mutation detected
          </p>
        </Reveal>
        <RevealText as="h1" text="Specimen *not found.*" className="type-display mt-8 font-semibold" />
        <Reveal delay={0.3} className="type-lead mt-8 max-w-xl text-bone-dim">
          <p>This sequence doesn&rsquo;t code for any page. It may have moved — or it never existed.</p>
        </Reveal>
        <Reveal delay={0.4}>
          <p aria-hidden="true" className="mt-8 font-mono text-sm tracking-[0.24em] text-mute">
            5′ — ATG · GCC · <span className="text-cherry">T?A</span> · CGA · TAG — 3′
          </p>
        </Reveal>
        <Reveal delay={0.5} className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/work" variant="ghost">
            View work
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
