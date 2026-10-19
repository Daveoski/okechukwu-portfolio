import { navLinks, site } from "@/lib/site";
import { Magnetic } from "@/components/motion/magnetic";
import { TransitionLink } from "@/components/transition/transition-link";
import { CopyButton } from "@/components/ui/copy-button";
import { ArrowUpRight } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/local-time";
import { LiveDot } from "@/components/ui/section-label";
import { BackToTop } from "./footer-actions";

const elsewhere = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
  { label: "Phone", href: site.phoneHref },
];

export function SiteFooter() {
  return (
    <footer data-print-hide className="relative z-0 overflow-hidden tall:sticky tall:bottom-0">
      <div className="container-x pt-24 pb-6 md:pt-28">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className="type-label flex items-center gap-3 text-mute">
              <span className="text-gfp">[ ∞ ]</span> Next step
            </p>
            <h2 className="mt-6 type-h1 font-semibold">
              Let&rsquo;s build something{" "}
              <span className="font-serif font-normal italic text-gfp">remarkable.</span>
            </h2>
          </div>
          <div className="lg:col-span-3 lg:flex lg:justify-end">
            <Magnetic strength={0.4}>
              <TransitionLink
                href="/contact"
                data-cursor="link"
                className="group relative grid size-36 place-items-center overflow-hidden rounded-full bg-gfp text-ink-950 md:size-44"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-bone transition-transform duration-700 ease-expo group-hover:scale-y-100" />
                <span className="relative flex flex-col items-center gap-1 text-[15px] font-semibold tracking-[-0.01em]">
                  <ArrowUpRight className="size-6 transition-transform duration-500 ease-expo group-hover:rotate-45" />
                  Get in touch
                </span>
              </TransitionLink>
            </Magnetic>
          </div>
        </div>

        <div className="mt-14 grid gap-12 border-t border-line pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="type-label text-mute">Write to me</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block break-all text-[clamp(1.25rem,2.1vw,1.85rem)] font-medium tracking-[-0.03em] text-bone transition-colors hover:text-gfp"
            >
              {site.email}
            </a>
            <CopyButton value={site.email} label="Copy email" className="mt-4" />
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <p className="type-label text-mute">Sitemap</p>
            <ul className="mt-3 space-y-1.5 text-[15px]">
              {[{ href: "/", label: "Home" }, ...navLinks, { href: "/cv", label: "CV" }].map((link) => (
                <li key={link.href}>
                  <TransitionLink href={link.href} className="text-bone-dim transition-colors hover:text-gfp">
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="type-label text-mute">Elsewhere</p>
            <ul className="mt-3 space-y-1.5 text-[15px]">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-1.5 text-bone-dim transition-colors hover:text-gfp"
                  >
                    {item.label}
                    <ArrowUpRight className="size-3.5 opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="type-label text-mute">Based in</p>
            <p className="mt-3 text-[15px] text-bone-dim">
              {site.location}
              <br />
              <LocalTime className="tabular-nums text-bone" /> {site.timeZoneLabel} (UTC+1)
            </p>
            <p className="mt-4 flex items-center gap-2 text-[15px] text-bone-dim">
              <LiveDot /> {site.availability}
            </p>
          </div>
        </div>

        <div className="type-label mt-14 flex flex-col gap-4 border-t border-line pt-6 text-mute md:flex-row md:items-center md:justify-between">
          <span>© 2026 {site.name}</span>
          <span className="hidden lg:inline">Designed &amp; engineered from scratch · Next.js on Vercel</span>
          <BackToTop />
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none">
        <p className="text-outline mb-[-0.24em] text-center text-[19.5vw] font-semibold leading-none tracking-[-0.07em] text-line-strong">
          Orjionuchie
        </p>
      </div>
    </footer>
  );
}
