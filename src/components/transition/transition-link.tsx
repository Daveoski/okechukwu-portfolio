"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePageTransition } from "./transition-provider";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * Drop-in `next/link` that routes through the curtain transition. Modifier
 * clicks, new tabs and downloads keep native behaviour because `onNavigate`
 * only fires for client-side navigations.
 */
export function TransitionLink({ href, onNavigate, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  return (
    <Link
      href={href}
      onNavigate={(event) => {
        onNavigate?.(event);
        event.preventDefault();
        navigate(href);
      }}
      {...props}
    />
  );
}
