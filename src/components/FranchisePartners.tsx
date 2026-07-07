"use client";

import { motion } from "framer-motion";
import { franchisePartners } from "@/lib/data";
import { staggerContainer, staggerItem } from "./Reveal";
import TextReveal from "./fx/TextReveal";

export default function FranchisePartners() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center gap-14 rounded-[40px] bg-[var(--color-sky-light)] px-5 py-16 sm:px-12 sm:py-20">
        <TextReveal
          as="h2"
          className="font-logo font-[800] max-w-2xl text-center text-4xl leading-tight tracking-tight text-[var(--color-navy)] sm:text-5xl"
        >
          CURRENT FRANCHISE PARTNERS
        </TextReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid w-full grid-cols-2 overflow-hidden rounded-3xl bg-white sm:grid-cols-4"
        >
          {franchisePartners.map((partner, i) => (
            <motion.div
              key={partner.id}
              variants={staggerItem}
              whileHover={{ scale: 1.04 }}
              className={
                "flex h-[139px] items-center justify-center gap-2 border-[var(--color-line)] px-6 " +
                (i % 2 === 0 ? "border-r " : "") +
                (i % 4 !== 3 ? "sm:border-r " : "sm:border-r-0 ") +
                (i < franchisePartners.length - 4 ? "border-b " : "")
              }
            >
              <span
                aria-hidden
                className="h-4 w-4 rounded-sm"
                style={{ background: partner.color }}
              />
              <span className="font-body text-lg font-semibold text-neutral-400">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
