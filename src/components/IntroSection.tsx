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
    <section id="company" ref={ref} className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-body mb-4 text-lg text-[var(--color-dark)]/70 sm:text-xl">
          The world&rsquo;s 1st &amp; only candy ice cream cone.
        </p>
        <TextReveal
          as="h2"
          className="font-logo font-[800] text-3xl leading-tight tracking-tight text-[var(--color-navy)] sm:text-5xl"
        >
          Introducing the Mojoz GummiCone
        </TextReveal>
      </Reveal>

      <div className="relative mx-auto mt-16 flex max-w-3xl items-center justify-center">
        <motion.div
          style={{ 
            y: circleY,
            backgroundColor: flavourBgColors[currentFlavour.id] as any
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex h-[340px] w-[280px] items-center justify-center rounded-full sm:h-[420px] sm:w-[360px]"
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
              className="h-72 w-auto sm:h-96"
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
            className={`absolute z-20 w-[240px] rounded-2xl border border-[var(--color-line)] bg-white p-5 shadow-lg sm:w-[280px] ${
              bubble.align === "left"
                ? "-left-2 bottom-6 sm:-left-16"
                : "-right-2 top-2 sm:-right-16"
            }`}
          >
            <p className="font-display mb-2 text-base leading-snug text-[var(--color-cyan)] sm:text-lg">
              {bubble.question}
            </p>
            <p className="font-body text-base text-[var(--color-dark)]/70 sm:text-lg">
              {bubble.answer}
            </p>
          </motion.div>
        ))}

        {/* Flavour indicator dots */}
        <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-20 flex gap-2">
          {flavours.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentFlavourIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentFlavourIndex
                  ? "w-8 bg-[var(--color-navy)]"
                  : "w-2 bg-[var(--color-navy)]/30 hover:bg-[var(--color-navy)]/50"
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
