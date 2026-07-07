"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  strength?: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

let rippleId = 0;

/**
 * The site's core CTA. Extended (not replaced) with:
 *  - magnetic cursor attraction (existing behaviour, kept)
 *  - click ripple
 *  - hover glow halo + animated gradient sheen
 *  - springy scale on press
 */
export default function MagneticButton({
  children,
  className,
  variant = "primary",
  strength = 0.35,
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const ripple: Ripple = {
        id: rippleId++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setRipples((r) => [...r, ripple]);
      window.setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== ripple.id)), 650);
    }
    onClick?.(e);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 380, damping: 18 }}
      className={clsx(
        "group/btn font-logo relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm uppercase tracking-wide transition-colors duration-200",
        variant === "primary" &&
          "bg-[var(--color-cyan)] text-white shadow-[0_0_0_0_rgba(0,210,255,0)] hover:bg-[var(--color-cyan-dark)] hover:shadow-[0_8px_32px_-4px_rgba(0,210,255,0.55)]",
        variant === "ghost" &&
          "bg-white text-[var(--color-navy)] hover:bg-neutral-50 hover:shadow-[0_8px_28px_-6px_rgba(15,43,142,0.25)]",
        className
      )}
      {...props}
    >
      {/* animated gradient sheen sweeping across on hover */}
      <span
        aria-hidden
        className="btn-sheen pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
      />
      {/* click ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className="btn-ripple pointer-events-none absolute rounded-full bg-white/40"
          style={{ left: r.x, top: r.y }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
