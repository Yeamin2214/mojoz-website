"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGlobalPointer } from "@/hooks/useGlobalPointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Module-level scroll store. The 3D scenes read these values inside their own
 * render loops (no React re-renders on scroll).
 */
export const scrollStore = {
  /** Absolute scroll position in px. */
  y: 0,
  /** 0 → 1 progress through the whole document. */
  progress: 0,
  /** Signed scroll velocity from Lenis (px/frame-ish). */
  velocity: 0,
};

let lenisInstance: Lenis | null = null;

/** Programmatic smooth scroll used by nav links etc. */
export function scrollToTarget(target: string | number): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.4, easing: (t) => 1 - Math.pow(2, -10 * t) });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}

/**
 * Wraps the app with Lenis smooth scrolling, keeps GSAP ScrollTrigger in sync
 * with it, and intercepts same-page anchor clicks so `#section` navigation
 * glides instead of jumping. Falls back to native scrolling when the user
 * prefers reduced motion.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  useGlobalPointer();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;

    lenis.on("scroll", (e: Lenis) => {
      scrollStore.y = e.scroll;
      scrollStore.velocity = e.velocity;
      scrollStore.progress = e.limit > 0 ? e.scroll / e.limit : 0;
      ScrollTrigger.update();
    });

    // Drive Lenis from GSAP's ticker so ScrollTrigger and Lenis share a clock.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor navigation for all in-page hash links.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, {
        offset: -96,
        duration: 1.4,
        easing: (t) => 1 - Math.pow(2, -10 * t),
      });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reduced]);

  return <>{children}</>;
}
