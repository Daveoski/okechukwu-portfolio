import { cn } from "@/lib/utils";

/** A benzene ring: hexagon, aromatic circle and one "excited" atom. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <g className="origin-center transition-transform duration-700 ease-expo group-hover:rotate-[60deg]">
        <path
          d="M16 2.5 27.69 9.25v13.5L16 29.5 4.31 22.75V9.25Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16" r="5.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="2.5" r="2.5" className="fill-gfp" />
      </g>
    </svg>
  );
}
