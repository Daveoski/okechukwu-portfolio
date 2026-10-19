import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Expo-out easing shared by every reveal so motion feels like one system. */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
/** Symmetric in-out easing used for curtains and covers. */
export const EASE_LAB = [0.76, 0, 0.24, 1] as const;

export function pad(n: number, size = 2) {
  return String(n).padStart(size, "0");
}

/** Deterministic PRNG so canvas scenes look identical on every load. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
