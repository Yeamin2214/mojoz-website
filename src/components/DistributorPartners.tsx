"use client";

import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { distributorPartners } from "@/lib/data";
import { staggerContainer, staggerItem } from "./Reveal";
import TextReveal from "./fx/TextReveal";

export default function DistributorPartners() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <TextReveal
        as="h2"
        className="font-logo font-[800] mb-14 text-center text-4xl leading-tight tracking-tight text-[var(--color-navy)] sm:text-5xl"
      >
        CURRENT
        <br />
        DISTRIBUTOR PARTNERS
      </TextReveal>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 overflow-hidden rounded-3xl border border-[var(--color-line)] sm:grid-cols-3"
      >
        {distributorPartners.map((partner, i) => (
          <motion.div
            key={partner.id}
            variants={staggerItem}
            whileHover={{ backgroundColor: "rgba(240,252,255,0.9)" }}
            transition={{ duration: 0.25 }}
            className={
              "flex flex-col justify-between gap-6 border-[var(--color-line)] p-6 sm:p-7 " +
              // vertical divider between columns, horizontal between rows
              ((i + 1) % 3 !== 0 ? "sm:border-r " : "") +
              (i < distributorPartners.length - (distributorPartners.length % 3 === 0 ? 3 : distributorPartners.length % 3)
                ? "border-b "
                : "")
            }
          >
            <h3 className="font-body text-lg font-medium leading-snug text-[var(--color-dark)]/90">
              {partner.name}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-[var(--color-dark)]/70">
              <span className="flex items-center gap-2">
                <Phone size={16} className="text-[var(--color-navy)]" />
                {partner.phone}
              </span>
              <span className="flex items-center gap-2">
                <Mail size={16} className="text-[var(--color-navy)]" />
                {partner.email}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
