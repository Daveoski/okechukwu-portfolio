# Okechukwu Orjionuchie — Portfolio

**From molecules to modules.** The portfolio of Okechukwu David Orjionuchie, a full-stack developer with a biochemist's mind, based in Enugu, Nigeria.

The design borrows from fluorescence microscopy: bright fluorophores on a black field, with GFP green (λem ≈ 509 nm) as the signature accent.

## Highlights

- **Hand-written canvas DNA helix.** It uses B-DNA geometry: 10.5 base pairs per turn, with offset backbones that form major and minor grooves. It's depth-sorted, steered by the pointer, twisted by scroll, and pauses when off-screen.
- **Custom page transitions.** A curtain state machine (cover → navigate → wait for the route to commit → reveal), with entrance animations that wait for it.
- **Interactive lab pieces.** A 3D caffeine molecule you can drag, built from 24 atoms with tetrahedral methyl hydrogens. A Michaelis–Menten "learning curve". A periodic table of the stack.
- **Case studies.** HirePlume (Next.js and FastAPI on Vercel and Neon) and BookNook (Express on Azure App Service, Azure SQL, Key Vault and Blob Storage). Each has an architecture diagram and an interactive demo.
- **Production standards.** Every route is prerendered static HTML. Security headers ship on every response. The site works with the keyboard and screen readers, and `prefers-reduced-motion` is honoured everywhere.

## Stack

| Layer     | Tools                                                                    |
| --------- | ------------------------------------------------------------------------ |
| Framework | Next.js 16 (App Router, Cache Components, Partial Prefetching), React 19 |
| Language  | TypeScript                                                               |
| Styling   | Tailwind CSS v4 with design tokens, container queries                    |
| Motion    | Motion, Lenis smooth scroll, Canvas 2D, SVG path drawing                 |
| Hosting   | Vercel                                                                   |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerender as static)
npm run lint
npm run typecheck
```

## Structure

```text
src/
  app/                  routes: /, /work, /work/{hireplume,booknook,portfolio}, /about,
                        /lab, /experience, /contact, /cv, plus metadata files
  components/
    canvas/             DNA helix and caffeine molecule (Canvas 2D)
    transition/         curtain, preloader and transition-aware Link
    motion/             reveals, marquee, magnetic, scroll highlight, counters
    home/ work/ lab/    page sections and case-study building blocks
  lib/
    data.ts             all content: projects, experience, skills and more
    site.ts             contact details, navigation and the site URL
```

Content lives in `src/lib/data.ts`, so updating a role, certification or project is a one-file change.

## Contact

[okechukwuorjionuchie@gmail.com](mailto:okechukwuorjionuchie@gmail.com) · [LinkedIn](https://www.linkedin.com/in/okechukwu-orjionuchie-12510818a) · [GitHub](https://github.com/Daveoski)
