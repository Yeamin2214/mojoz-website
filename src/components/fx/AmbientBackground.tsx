"use client";

import { useEffect, useRef } from "react";
import { pointer } from "@/hooks/useGlobalPointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A fixed, understated background atmosphere: two slowly drifting gradient
 * blobs, a faint animated grain, and a soft radial glow that follows the
 * cursor. Sits at z-index 0 behind the ambient candy canvas and content.
 */
export default function AmbientBackground() {
  const glow = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const loop = () => {
      // Ease toward the pointer for a weighty light feel.
      x += (pointer.px - x) * 0.06;
      y += (pointer.py - y) * 0.06;
      if (glow.current) {
        glow.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* drifting brand blobs */}
      <div className="bg-blob absolute -left-[15%] top-[5%] h-[55vmax] w-[55vmax] rounded-full opacity-40 blur-3xl" />
      <div className="bg-blob-alt absolute -right-[20%] top-[45%] h-[60vmax] w-[60vmax] rounded-full opacity-30 blur-3xl" />
      {/* cursor-follow light */}
      <div
        ref={glow}
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(0,210,255,0.35), transparent 65%)",
        }}
      />
      {/* animated grain */}
      <div className="bg-grain absolute inset-0 opacity-[0.05]" />
    </div>
  );
}
