"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useMemo, useRef } from "react";
import { parseAccent, plainText, type AccentWord } from "@/lib/text";
import { cn } from "@/lib/utils";

/** Paragraph whose words light up one by one as it scrolls through view. */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = useMemo(() => parseAccent(text), [text]);

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{plainText(text)}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word.text}-${i}`}>
            {word.space ? " " : null}
            <HighlightWord
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            />
          </Fragment>
        ))}
      </span>
    </p>
  );
}

function HighlightWord({
  word,
  progress,
  range,
}: {
  word: AccentWord;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={cn(word.accent && "font-serif font-normal italic text-gfp")}>
      {word.text}
    </motion.span>
  );
}
