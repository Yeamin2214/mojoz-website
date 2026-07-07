"use client";

import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  BadgeCheck,
  WheatOff,
  Leaf,
  TreeDeciduous,
  ShieldOff,
  Sprout,
  Flag,
  ChevronDown,
} from "lucide-react";
import { standards, includingAlso } from "@/lib/data";
import { staggerContainer, staggerItem } from "./Reveal";
import TextReveal from "./fx/TextReveal";
import TiltCard from "./fx/TiltCard";

const iconMap = {
  UtensilsCrossed,
  BadgeCheck,
  WheatOff,
  Leaf,
  TreeDeciduous,
  ShieldOff,
  Sprout,
  Flag,
} as const;

export default function ProductStandards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="rounded-[40px] bg-[var(--color-cyan)] px-5 py-16 sm:px-12 sm:py-20">
        <TextReveal
          as="h2"
          mode="chars"
          stagger={0.03}
          className="font-logo font-[800] mb-14 text-center text-4xl leading-tight tracking-tight text-white sm:text-5xl"
        >
          PRODUCT
          <br />
          STANDARDS
        </TextReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {standards.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <motion.div key={item.id} variants={staggerItem}>
                <TiltCard
                  intensity={6}
                  className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-[var(--color-line)] bg-white p-6"
                >
                  <Icon
                    size={44}
                    strokeWidth={1.6}
                    className="text-[var(--color-cyan)] transition-transform duration-500 group-hover/tilt:scale-110 group-hover/tilt:-rotate-6"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-logo font-[800] text-xl uppercase text-[var(--color-dark)] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--color-dark)]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="text-white" size={28} />
          </motion.div>
          <span className="font-logo text-sm uppercase tracking-wider text-white">
            Including also
          </span>
        </motion.div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {includingAlso.map((item) => (
          <motion.div key={item.id} variants={staggerItem}>
            <TiltCard
              intensity={6}
              className="h-full rounded-3xl border border-[var(--color-line)] bg-white p-8"
            >
              <h3 className="font-display mb-4 text-xl leading-snug text-[var(--color-dark)]">
                {item.title}
              </h3>
              <p className="font-body text-base text-[var(--color-dark)]/70">
                {item.description}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
