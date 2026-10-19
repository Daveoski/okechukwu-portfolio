"use client";

import { motion, useInView, type UseInViewOptions } from "motion/react";
import { Fragment, useMemo, useRef, type ReactNode } from "react";
import { usePageReady } from "@/components/transition/transition-provider";
import { parseAccent, plainText } from "@/lib/text";
import { cn, EASE_EXPO } from "@/lib/utils";

/** In view *and* the curtain/preloader is out of the way. */
function useShow(amount: number, margin: UseInViewOptions["margin"] = "0px 0px -8% 0px") {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount, margin });
  const ready = usePageReady();
  return { ref, show: inView && ready };
}

const tags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  p: motion.p,
  article: motion.article,
  figure: motion.figure,
  span: motion.span,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
  as?: keyof typeof tags;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  duration = 1.1,
  amount = 0.12,
  as = "div",
}: RevealProps) {
  const { ref, show } = useShow(amount);
  const Component = tags[as] as typeof motion.div;
  return (
    <Component
      ref={ref}
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, ease: EASE_EXPO, delay: show ? delay : 0 }}
    >
      {children}
    </Component>
  );
}

/** Wipes content in from the bottom edge with a clip-path. */
export function RevealMask({
  children,
  className,
  delay = 0,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const { ref, show } = useShow(amount);
  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={{ clipPath: "inset(18% 8% 0% 8% round 28px)", opacity: 0.2 }}
      animate={
        show
          ? { clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 }
          : { clipPath: "inset(18% 8% 0% 8% round 28px)", opacity: 0.2 }
      }
      transition={{ duration: 1.4, ease: EASE_EXPO, delay: show ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}

const textTags = { h1: "h1", h2: "h2", h3: "h3", p: "p", span: "span", div: "div" } as const;

type RevealTextProps = {
  text: string;
  as?: keyof typeof textTags;
  id?: string;
  className?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
};

/** Word-by-word masked reveal. Screen readers get the plain sentence. */
export function RevealText({
  text,
  as = "span",
  id,
  className,
  accentClassName = "font-serif font-normal italic text-gfp",
  delay = 0,
  stagger = 0.045,
}: RevealTextProps) {
  const { ref, show } = useShow(0.35);
  const words = useMemo(() => parseAccent(text), [text]);
  // Every option is a plain block/inline element; typing it as one keeps the ref simple.
  const Tag = textTags[as] as "div";

  return (
    <Tag ref={ref} id={id} className={className}>
      <span className="sr-only">{plainText(text)}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word.text}-${i}`}>
            {word.space ? " " : null}
            <span
              className={cn(
                "mb-[-0.14em] inline-block overflow-hidden pb-[0.14em] align-top",
                word.accent && "mx-[-0.06em] px-[0.06em]",
              )}
            >
              <motion.span
                data-reveal
                className={cn("inline-block will-change-transform", word.accent && accentClassName)}
                initial={{ y: "118%" }}
                animate={{ y: show ? "0%" : "118%" }}
                transition={{ duration: 1.15, ease: EASE_EXPO, delay: show ? delay + i * stagger : 0 }}
              >
                {word.text}
              </motion.span>
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
