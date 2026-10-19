import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { Journey } from "@/components/home/journey";
import { Method } from "@/components/home/method";
import { PeriodicStack } from "@/components/home/periodic-stack";
import { StackMarquee } from "@/components/home/stack-marquee";
import { Stats } from "@/components/home/stats";
import { education } from "@/lib/data";
import { site, siteUrl } from "@/lib/site";

export default function HomePage() {
  const url = siteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.displayName,
    url,
    image: `${url}/images/okechukwu-portrait.jpg`,
    jobTitle: site.role,
    description: site.description,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Enugu", addressCountry: "NG" },
    alumniOf: { "@type": "CollegeOrUniversity", name: education[0].org },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Cybersecurity",
      "Cloud computing",
      "Biochemistry",
    ],
    sameAs: [site.socials.github, site.socials.linkedin],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <StackMarquee />
      <Intro />
      <FeaturedWork />
      <Method />
      <PeriodicStack />
      <Journey />
      <Stats />
    </>
  );
}
