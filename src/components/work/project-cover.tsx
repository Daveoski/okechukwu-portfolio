import Image from "next/image";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { HelixGlyph } from "./helix-glyph";

/** Visual for a project card. Sized with container-query units so it scales with its frame. */
export function ProjectCover({
  slug,
  sizes,
  preload,
  className,
}: {
  slug: Project["slug"];
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  if (slug === "hiredesk") return <HireDeskCover sizes={sizes} preload={preload} className={className} />;
  if (slug === "booknook") return <BookNookCover className={className} />;
  return <PortfolioCover className={className} />;
}

function HireDeskCover({ sizes, preload, className }: { sizes: string; preload?: boolean; className?: string }) {
  return (
    <div className={cn("absolute inset-0 bg-ink-900", className)}>
      <Image
        src="/images/work/hiredesk-hero.jpg"
        alt="HireDesk landing page: “Hire the right people, with confidence.” with a candidate pipeline card"
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink-950/60 via-transparent to-transparent" />
    </div>
  );
}

const bookJson: [string, string, "str" | "num" | "null"][] = [
  ["Id", "1", "num"],
  ["Title", "The Double Helix", "str"],
  ["Author", "James D. Watson", "str"],
  ["Genre", "Science", "str"],
  ["Status", "To Read", "str"],
  ["Rating", "null", "null"],
];

const spines = [
  { h: "62%", c: "bg-cyan/80", t: "Express" },
  { h: "78%", c: "bg-bone/85", t: "Azure SQL" },
  { h: "54%", c: "bg-dapi/80", t: "Key Vault" },
  { h: "70%", c: "bg-gfp/80", t: "Blob" },
  { h: "46%", c: "bg-amber/80", t: "CI/CD" },
];

function BookNookCover({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "@container absolute inset-0 overflow-hidden bg-[radial-gradient(110%_90%_at_85%_0%,rgba(68,225,255,0.2),transparent_60%),linear-gradient(160deg,#08151b,#04090b)]",
        className,
      )}
    >
      <div className="hairline-grid absolute inset-0 opacity-50" />
      <div className="absolute left-[7%] top-[12%] w-[60%] rounded-[2.4cqw] border border-white/10 bg-ink-950/85 p-[3.2cqw] font-mono text-[2.05cqw] leading-[1.65] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
        <div className="mb-[2.2cqw] flex gap-[1cqw]">
          <span className="size-[1.4cqw] rounded-full bg-cherry/80" />
          <span className="size-[1.4cqw] rounded-full bg-amber/80" />
          <span className="size-[1.4cqw] rounded-full bg-gfp/80" />
        </div>
        <p>
          <span className="text-cyan">GET</span> <span className="text-bone">/api/books/1</span>{" "}
          <span className="text-gfp">200 OK</span>
        </p>
        <p className="text-mute">{"{"}</p>
        {bookJson.map(([key, value, kind], i) => (
          <p key={key} className="pl-[3cqw]">
            <span className="text-dapi">&quot;{key}&quot;</span>
            <span className="text-mute">: </span>
            <span className={kind === "str" ? "text-gfp" : kind === "num" ? "text-amber" : "text-cherry"}>
              {kind === "str" ? `"${value}"` : value}
            </span>
            {i < bookJson.length - 1 ? <span className="text-mute">,</span> : null}
          </p>
        ))}
        <p className="text-mute">{"}"}</p>
      </div>

      <div className="absolute bottom-[14%] right-[7%] flex h-[56%] items-end gap-[1.2cqw]">
        {spines.map((spine) => (
          <div
            key={spine.t}
            className={cn("relative flex w-[5.2cqw] items-center justify-center rounded-[0.8cqw]", spine.c)}
            style={{ height: spine.h }}
          >
            <span className="rotate-180 font-mono text-[1.5cqw] font-medium tracking-[0.12em] text-ink-950 uppercase [writing-mode:vertical-rl]">
              {spine.t}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-[14%] left-[7%] right-[7%] h-px bg-white/15" />
      <p className="absolute bottom-[6%] left-[7%] font-mono text-[1.7cqw] uppercase tracking-[0.18em] text-bone-dim">
        App Service · Azure SQL · Key Vault · Blob Storage
      </p>
    </div>
  );
}

const swatches = [
  { c: "bg-gfp", n: "GFP", w: "509" },
  { c: "bg-cyan", n: "CFP", w: "475" },
  { c: "bg-dapi", n: "DAPI", w: "461" },
  { c: "bg-amber", n: "YFP", w: "527" },
  { c: "bg-cherry", n: "mCherry", w: "610" },
];

function PortfolioCover({ className }: { className?: string }) {
  return (
    <div className={cn("@container absolute inset-0 overflow-hidden bg-ink-950", className)}>
      <div className="hairline-grid absolute inset-0 opacity-60" />
      <div className="absolute right-[-6%] top-[-12%] aspect-square w-[70%] rounded-full bg-dapi/15 blur-[8cqw]" />
      <HelixGlyph className="absolute right-[8%] top-[-18%] h-[136%] w-[26%] rotate-[22deg]" />
      <div className="absolute left-[7%] top-[11%]">
        <p className="font-serif text-[13cqw] italic leading-[0.85] text-bone">
          Aa<span className="text-gfp">.</span>
        </p>
        <p className="mt-[1.6cqw] font-mono text-[1.75cqw] uppercase tracking-[0.16em] text-mute">
          Instrument Serif · Geist · Geist Mono
        </p>
      </div>
      <div className="absolute bottom-[9%] left-[7%] flex gap-[1.6cqw]">
        {swatches.map((s) => (
          <div key={s.n} className="flex flex-col gap-[0.9cqw]">
            <span className={cn("block size-[6.4cqw] rounded-[1.4cqw]", s.c)} />
            <span className="font-mono text-[1.45cqw] leading-tight text-bone-dim">
              {s.n}
              <br />
              <span className="text-mute">{s.w} nm</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
