export const site = {
  name: "Okechukwu David Orjionuchie",
  displayName: "Okechukwu Orjionuchie",
  firstName: "Okechukwu",
  lastName: "Orjionuchie",
  role: "Full-Stack Developer",
  tagline: "From molecules to modules.",
  description:
    "Okechukwu David Orjionuchie is a full-stack developer with a biochemist's mind — building fast, secure, human-centred web products with Next.js, React, TypeScript, Node.js and Python (FastAPI), on PostgreSQL and MongoDB.",
  email: "okechukwuorjionuchie@gmail.com",
  phone: "+234 903 170 7946",
  phoneHref: "tel:+2349031707946",
  location: "Enugu, Nigeria",
  timeZone: "Africa/Lagos",
  timeZoneLabel: "WAT",
  availability: "Open to full-stack & technology roles",
  socials: {
    github: "https://github.com/Daveoski",
    linkedin: "https://www.linkedin.com/in/okechukwu-orjionuchie-12510818a",
  },
  repo: "https://github.com/Daveoski/okechukwu-portfolio",
} as const;

export const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/lab", label: "Lab" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
] as const;

/** sessionStorage key set once the intro preloader has played. */
export const INTRO_KEY = "odo:intro";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Labels shown on the page-transition curtain. */
export function routeLabel(pathname: string) {
  const map: Record<string, string> = {
    "/": "Home",
    "/work": "Work",
    "/work/hiredesk": "HireDesk",
    "/work/booknook": "BookNook",
    "/work/portfolio": "This site",
    "/about": "About",
    "/lab": "The Lab",
    "/experience": "Experience",
    "/contact": "Contact",
    "/cv": "Curriculum vitae",
  };
  return map[pathname] ?? "Loading";
}

/** Server-only: absolute origin for metadata, sitemap and JSON-LD. */
export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}
