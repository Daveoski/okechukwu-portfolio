"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { TransitionProvider } from "@/components/transition/transition-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.1, stopInertiaOnNavigate: true }}>
      <MotionConfig reducedMotion="user">
        <TransitionProvider>{children}</TransitionProvider>
      </MotionConfig>
    </ReactLenis>
  );
}
