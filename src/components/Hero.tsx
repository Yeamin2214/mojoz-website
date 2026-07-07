"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextReveal from "./fx/TextReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const candy = [
  { color: "#7ED957", top: "18%", left: "6%", size: 56, rotate: -12 },
  { color: "#FF7A45", top: "10%", left: "78%", size: 44, rotate: 18 },
  { color: "#FFC24B", top: "46%", left: "88%", size: 62, rotate: -6 },
  { color: "#FF5C7A", top: "58%", left: "4%", size: 50, rotate: 10 },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const coneY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden rounded-b-[40px] bg-gradient-to-b from-[var(--color-lavender)] to-[var(--color-cream)] pb-16 pt-32 sm:pb-20 sm:pt-40"
    >
      {/* ambient blob (original) */}
      <motion.div
        style={{ y }}
        aria-hidden
        className="absolute -top-[420px] left-1/2 h-[900px] w-[1400px] -translate-x-1/2 rounded-full bg-[var(--color-sky)] blur-0"
      />

      {/* headline section */}
      <motion.div
        style={{ y: headlineY, opacity: fade }}
        className="relative z-20 mx-auto max-w-4xl px-6 text-center mb-8 sm:mb-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="font-logo mx-auto mb-3 sm:mb-4 inline-block rounded-md bg-[var(--color-cyan)] px-4 py-1.5 text-xs sm:text-sm text-white"
        >
          GUMMICONE
        </motion.div>

        <TextReveal
          as="h1"
          mode="words"
          delay={0.9}
          stagger={0.08}
          className="font-logo font-[800] text-2xl leading-[1.1] tracking-tight text-[var(--color-navy)] sm:text-4xl md:text-5xl lg:text-[70px]"
        >
          THIS AIN&rsquo;T YOUR
          <br />
          GRANDMA&rsquo;S CONE
        </TextReveal>
      </motion.div>

      {/* product hero image — larger and more prominent */}
      {!reduced && (
        <motion.div
          style={{ y: coneY, opacity: fade }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative z-20 mx-auto flex w-full items-center justify-center px-4 sm:px-6"
        >
          <motion.img
            src="/hero-cone.png"
            alt="GummiCone product in hand"
            style={{ opacity: fade }}
            className="h-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl drop-shadow-2xl"
          />
        </motion.div>
      )}

      {/* floating flat candy pieces — kept for depth on top of the product image */}
      {candy.map((c, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute z-10 rounded-2xl shadow-lg"
          style={{
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.size * 0.6,
            background: c.color,
            rotate: c.rotate,
          }}
          animate={{ y: [0, -14, 0], rotate: [c.rotate, c.rotate + 6, c.rotate] }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-8"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[var(--color-navy)]/30 p-1.5"
        >
          <div className="h-2 w-1 rounded-full bg-[var(--color-navy)]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
