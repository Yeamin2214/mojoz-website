"use client";

import { motion } from "framer-motion";
import { flavours } from "@/lib/data";
import { staggerContainer, staggerItem } from "./Reveal";
import TiltCard from "./fx/TiltCard";
import TextReveal from "./fx/TextReveal";

export default function FlavoursSection() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <TextReveal
        as="h2"
        className="font-logo font-[800] mb-10 sm:mb-14 text-center text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-[var(--color-navy)]"
      >
        MOST 🤤 CRAVED
        <br />
        FLAVOURS
      </TextReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4"
      >
        {flavours.map((f) => (
          <motion.div key={f.id} variants={staggerItem}>
            <TiltCard
              className={`group flex h-full flex-col items-center overflow-hidden rounded-3xl ${f.bg} px-3 pb-6 pt-5 text-center shadow-sm sm:px-4 sm:pb-8 sm:pt-6`}
            >
              <span
                className={`font-logo mb-3 rounded-full bg-white/70 px-3 py-1 text-xs uppercase tracking-wide sm:mb-4 sm:px-4 sm:py-1.5 ${f.accent}`}
              >
                {f.name}
              </span>
              <img
                src={f.image}
                alt={`${f.name} GummiCone`}
                className="h-32 w-auto transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:rotate-2 sm:h-40 md:h-44"
              />
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
