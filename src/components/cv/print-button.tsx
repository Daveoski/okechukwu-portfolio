"use client";

import { PrinterIcon } from "@/components/ui/icons";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-11 items-center gap-2.5 rounded-full bg-gfp px-5 text-[14px] font-semibold text-ink-950 transition-colors duration-300 hover:bg-bone"
    >
      <PrinterIcon className="size-4" />
      Print / save as PDF
    </button>
  );
}
