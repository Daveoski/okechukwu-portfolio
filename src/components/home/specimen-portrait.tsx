"use client";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { usePageReady } from "@/components/transition/transition-provider";
import { LiveDot } from "@/components/ui/section-label";
import { cn, EASE_LAB } from "@/lib/utils";

const fields = [
  { label: "Specimen", value: "Okechukwu D. Orjionuchie" },
  { label: "Origin", value: "Enugu, Nigeria" },
  { label: "Classification", value: "Biochemist → Developer" },
  { label: "Status", value: "Available for work", live: true },
];

/** Portrait framed like a microscope capture, revealed by a scanning line. */
export function SpecimenPortrait({
  src = "/images/okechukwu-portrait.jpg",
  alt = "Portrait of Okechukwu David Orjionuchie in a navy suit and light-blue shirt",
  figure = "Fig. 02",
  className,
}: {
  src?: string;
  alt?: string;
  figure?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const ready = usePageReady();
  const show = inView && ready;

  return (
    <figure className={cn("relative", className)}>
      <div className="type-label flex items-center justify-between text-mute">
        <span>{figure} — Specimen</span>
        <span className="flex items-center gap-2 text-gfp">
          <LiveDot /> Live
        </span>
      </div>

      <div
        ref={ref}
        className="relative mt-3 aspect-4/5 overflow-hidden rounded-3xl border border-line bg-ink-850"
      >
        <motion.div
          data-reveal
          className="absolute inset-0"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: show ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 1.6, ease: EASE_LAB }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 90vw"
            className="object-cover object-[50%_30%] grayscale-[0.25] transition-[filter] duration-700 hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink-950/50 via-transparent to-transparent" />
        </motion.div>

        {/* Scan bar that leads the reveal, then idles. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] bg-gfp shadow-[0_0_24px_6px_rgba(92,255,176,0.45)]"
          initial={{ top: "0%", opacity: 0 }}
          animate={show ? { top: ["0%", "100%"], opacity: [1, 1, 0] } : { top: "0%", opacity: 0 }}
          transition={{ duration: 1.6, ease: EASE_LAB }}
        />

        {/* Viewfinder corners. */}
        {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map(
          (pos) => (
            <span key={pos} aria-hidden="true" className={cn("absolute size-5 border-gfp/70", pos)} />
          ),
        )}
        <span className="type-label absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink-950/70 px-3 py-1 text-[10px] text-bone-dim backdrop-blur">
          ×1 · 1080 × 1045
        </span>
      </div>

      <figcaption className="mt-5">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
          {fields.map((field) => (
            <div key={field.label}>
              <dt className="type-label text-mute">{field.label}</dt>
              <dd className={cn("mt-1 flex items-center gap-2 text-[15px]", field.live ? "text-gfp" : "text-bone")}>
                {field.live ? <LiveDot /> : null}
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      </figcaption>
    </figure>
  );
}
