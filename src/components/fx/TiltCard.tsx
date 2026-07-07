"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import clsx from "clsx";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt angle in degrees. */
  intensity?: number;
  /** Show the cursor-follow sheen highlight. */
  glare?: boolean;
}

/**
 * Wraps any card in a tactile 3D hover: perspective tilt toward the cursor,
 * a floating shadow that grows on lift, and a soft light "sheen" that follows
 * the pointer across the surface. Purely additive — the child card keeps its
 * own styling.
 */
export default function TiltCard({ children, className, intensity = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 22, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 200, damping: 22, mass: 0.5 });

  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);
  const glareX = useTransform(sx, [0, 1], [15, 85]);
  const glareY = useTransform(sy, [0, 1], [15, 85]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35), transparent 55%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={clsx("group/tilt relative will-change-transform", className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        />
      )}
      {/* animated border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, transparent 20%, rgba(0,210,255,0.45), transparent 80%)",
          maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: 1.5,
        }}
      />
      {/* floating shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -bottom-4 -z-10 h-8 rounded-full bg-[var(--color-navy)]/15 blur-xl opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
      />
    </motion.div>
  );
}
