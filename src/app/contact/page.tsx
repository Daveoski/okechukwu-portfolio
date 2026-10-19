import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { CopyButton } from "@/components/ui/copy-button";
import { ArrowUpRight } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { LiveDot, SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Okechukwu Orjionuchie about full-stack developer roles, freelance projects or research collaborations.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, copy: site.email },
  { label: "Phone", value: site.phone, href: site.phoneHref, copy: site.phone },
  { label: "LinkedIn", value: "in/okechukwu-orjionuchie", href: site.socials.linkedin },
  { label: "GitHub", value: "github.com/Daveoski", href: site.socials.github },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        index="C"
        title="Let’s *talk.*"
        lead={
          <p>
            Hiring for a full-stack or wider technology role, planning a product, or exploring research in
            digital health, education or data? Send a note and let&rsquo;s start the conversation.
          </p>
        }
      />

      <section aria-label="Contact options" className="container-x pb-24 md:pb-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <SectionLabel>Direct lines</SectionLabel>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {channels.map((c) => (
                  <li key={c.label} className="flex flex-wrap items-center justify-between gap-3 py-5">
                    <div className="min-w-0">
                      <p className="type-label text-mute">{c.label}</p>
                      <a
                        href={c.href}
                        {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group mt-1.5 inline-flex max-w-full items-center gap-1.5 break-all text-[15px] text-bone transition-colors hover:text-gfp"
                      >
                        {c.value}
                        <ArrowUpRight className="size-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100" />
                      </a>
                    </div>
                    {c.copy ? <CopyButton value={c.copy} /> : null}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 rounded-3xl border border-line bg-ink-850 p-6">
              <p className="type-label flex items-center gap-2 text-gfp">
                <LiveDot /> {site.availability}
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-6 text-[15px]">
                <div>
                  <dt className="type-label text-mute">Based in</dt>
                  <dd className="mt-1.5">{site.location}</dd>
                </div>
                <div>
                  <dt className="type-label text-mute">Local time</dt>
                  <dd className="mt-1.5">
                    <LocalTime className="tabular-nums" /> {site.timeZoneLabel}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
