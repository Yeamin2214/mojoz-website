"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { chatBubbles, flavours } from "@/lib/data";
import Reveal from "./Reveal";
import TextReveal from "./fx/TextReveal";

export default function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [currentFlavourIndex, setCurrentFlavourIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Depth stack: circle drifts slower than bubbles for parallax layering.
  const circleY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const bubbleY = useTransform(scrollYProgress, [0, 1], [46, -46]);
  const coneRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  // Rotate through flavours every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFlavourIndex((prev) => (prev + 1) % flavours.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentFlavour = flavours[currentFlavourIndex];

  // Map flavours to their background colors
  const flavourBgColors: Record<string, string> = {
    "mango": "var(--color-mango-bg)",
    "strawberry": "var(--color-strawberry-bg)",
    "lemon": "var(--color-lemon-bg)",
    "blue-raspberry": "var(--color-blueraspberry-bg)",
  };

  return (
    <section id="company" ref={ref} className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-body mb-3 text-base sm:text-lg md:text-xl text-[var(--color-dark)]/70">
          The world&rsquo;s 1st &amp; only candy ice cream cone.
        </p>
        <TextReveal
          as="h2"
          className="font-logo font-[800] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-[var(--color-navy)]"
        >
          Introducing the Mojoz GummiCone
        </TextReveal>
      </Reveal>

      <div className="relative mx-auto mt-10 sm:mt-14 md:mt-16 flex max-w-3xl items-center justify-center">
        <motion.div
          style={{ 
            y: circleY,
            backgroundColor: flavourBgColors[currentFlavour.id] as any
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex h-[260px] w-[220px] items-center justify-center rounded-full sm:h-[340px] sm:w-[280px] md:h-[380px] md:w-[320px] lg:h-[420px] lg:w-[360px]"
        >
          <motion.div
            style={{ rotate: coneRotate }}
            key={currentFlavourIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="animate-none"
          >
            <img
              src={currentFlavour.image}
              alt={`${currentFlavour.name} GummiCone`}
              className="h-56 w-auto sm:h-72 md:h-80 lg:h-96"
            />
          </motion.div>
        </motion.div>

        {chatBubbles.map((bubble, i) => (
          <motion.div
            key={bubble.id}
            style={{ y: bubbleY }}
            initial={{ opacity: 0, x: bubble.align === "left" ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
            className={`absolute z-20 w-[200px] rounded-2xl border border-[var(--color-line)] bg-white p-3 shadow-lg sm:w-[240px] sm:p-4 md:w-[280px] md:p-5 ${
              bubble.align === "left"
                ? "-left-1 bottom-4 sm:-left-12 sm:bottom-6 md:-left-16"
                : "-right-1 top-0 sm:-right-12 sm:top-2 md:-right-16"
            }`}
          >
            <p className="font-display mb-2 text-xs sm:text-sm md:text-base leading-snug text-[var(--color-cyan)]">
              {bubble.question}
            </p>
            <p className="font-body text-xs sm:text-sm md:text-base text-[var(--color-dark)]/70">
              {bubble.answer}
            </p>
          </motion.div>
        ))}

        {/* Flavour indicator dots */}
        <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-16 sm:translate-y-20 flex gap-2">
          {flavours.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentFlavourIndex(i)}
              className={`h-1.5 rounded-full transition-all sm:h-2 ${
                i === currentFlavourIndex
                  ? "w-6 sm:w-8 bg-[var(--color-navy)]"
                  : "w-1.5 sm:w-2 bg-[var(--color-navy)]/30 hover:bg-[var(--color-navy)]/50"
              }`}
              whileHover={{ scale: 1.2 }}
              aria-label={`Go to ${flavours[i].name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
