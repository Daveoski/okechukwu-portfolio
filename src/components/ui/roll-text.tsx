import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Text that rolls up to a copy of itself on parent `group` hover. */
export function RollText({
  children,
  className,
  hoverClassName,
}: {
  children: ReactNode;
  className?: string;
  hoverClassName?: string;
}) {
  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <span className="transition-transform duration-500 ease-expo group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0",
          hoverClassName,
        )}
      >
        {children}
      </span>
    </span>
  );
}
