/**
 * Shared motion constants used across Framer Motion, GSAP, and R3F code so
 * every animation on the site eases and times the same way.
 */

/** Signature "premium" ease — identical to the cubic-bezier used before. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** GSAP-flavoured equivalent of EASE_OUT. */
export const GSAP_EASE = "expo.out";

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 1.2,
} as const;

/** Linear interpolation used by camera + mouse-follow code. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Frame-rate independent damping factor (for use inside rAF loops). */
export function damp(current: number, target: number, lambda: number, delta: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * delta));
}

/** Clamp helper. */
export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}
