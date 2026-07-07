"use client";

import { motion } from "framer-motion";
import { flavours } from "@/lib/data";
import { staggerContainer, staggerItem } from "./Reveal";
import TiltCard from "./fx/TiltCard";
import TextReveal from "./fx/TextReveal";

export default function FlavoursSection() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <TextReveal
        as="h2"
        className="font-logo font-[800] mb-14 text-center text-4xl leading-tight tracking-tight text-[var(--color-navy)] sm:text-5xl"
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
        className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
      >
        {flavours.map((f) => (
          <motion.div key={f.id} variants={staggerItem}>
            <TiltCard
              className={`group flex h-full flex-col items-center overflow-hidden rounded-3xl ${f.bg} px-4 pb-8 pt-6 text-center shadow-sm`}
            >
              <span
                className={`font-logo mb-4 rounded-full bg-white/70 px-4 py-1.5 text-xs uppercase tracking-wide sm:text-sm ${f.accent}`}
              >
                {f.name}
              </span>
              <img
                src={f.image}
                alt={`${f.name} GummiCone`}
                className="h-36 w-auto transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-hover:rotate-2 sm:h-44"
              />
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
