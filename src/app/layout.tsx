import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { SkipLink } from "@/components/layout/footer-actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { INTRO_KEY, site, siteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const title = "Okechukwu Orjionuchie — Full-Stack Developer & Biochemist";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: title, template: "%s — Okechukwu Orjionuchie" },
  description: site.description,
  applicationName: site.displayName,
  authors: [{ name: site.name, url: site.socials.github }],
  creator: site.name,
  keywords: [
    "Okechukwu Orjionuchie",
    "Okechukwu David Orjionuchie",
    "Full-stack developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "FastAPI",
    "Python",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Biochemist",
    "Enugu",
    "Nigeria",
    "HirePlume",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: site.displayName,
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#040706",
  colorScheme: "dark",
};

/* Runs before first paint: hides the intro on repeat visits this session. */
const introScript = `(function(){try{if(sessionStorage.getItem("${INTRO_KEY}")==="1")document.documentElement.classList.add("intro-seen")}catch(e){}})()`;

const noScriptStyles =
  "[data-preloader]{display:none!important}[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <noscript>
          <style>{noScriptStyles}</style>
        </noscript>
        <AppProviders>
          <SkipLink />
          <SiteHeader />
          <main
            id="main"
            tabIndex={-1}
            className="relative z-10 min-h-screen overflow-clip rounded-b-4xl border-b border-line bg-ink-950 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] outline-none md:rounded-b-[3rem]"
          >
            {children}
          </main>
          <SiteFooter />
          <CustomCursor />
          <div
            aria-hidden="true"
            data-print-hide
            className="grain pointer-events-none fixed inset-0 z-70 opacity-[0.045]"
          />
        </AppProviders>
      </body>
    </html>
  );
}
