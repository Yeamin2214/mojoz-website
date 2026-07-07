"use client";

import { useEffect } from "react";

/**
 * A single, module-level pointer store shared by every consumer (3D camera
 * rig, parallax layers, cursor glow). Values are normalised to [-1, 1] and
 * smoothed by the consumers themselves inside their own rAF loops, so moving
 * the mouse never triggers a React re-render.
 */
export const pointer = {
  /** Raw normalised position (-1 → 1). */
  x: 0,
  y: 0,
  /** Pixel position for DOM-based effects (cursor glow). */
  px: 0,
  py: 0,
};

let listeners = 0;

function onMove(e: PointerEvent) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  pointer.px = e.clientX;
  pointer.py = e.clientY;
}

/** Mount once anywhere in the client tree to keep the store updated. */
export function useGlobalPointer(): void {
  useEffect(() => {
    if (listeners === 0) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    listeners += 1;
    return () => {
      listeners -= 1;
      if (listeners === 0) window.removeEventListener("pointermove", onMove);
    };
  }, []);
}
