"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** "mask" clips upward from a rounded window; "fade" is a softer blur/rise. */
  variant?: "mask" | "fade";
  /** Extra parallax drift (px) applied against scroll for depth. */
  parallax?: number;
}

/**
 * Ensures no section "simply appears": content enters through a rounded
 * clip-path mask (or a blur + rise), then drifts subtly against scroll for
 * parallax depth. Wraps existing sections without altering their markup.
 */
export default function SectionReveal({
  children,
  className,
  variant = "fade",
  parallax = 0,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  const initial =
    variant === "mask"
      ? { clipPath: "inset(12% 6% 12% 6% round 48px)", opacity: 0, scale: 0.97 }
      : { opacity: 0, y: 48, filter: "blur(8px)" };

  const visible =
    variant === "mask"
      ? { clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1, scale: 1 }
      : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div ref={ref} style={parallax ? { y } : undefined} className={className}>
      <motion.div
        initial={initial}
        whileInView={visible}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 1, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
