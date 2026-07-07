"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import TextReveal from "./fx/TextReveal";

const fields = [
  { id: "name", label: "Business Name", placeholder: "First and Last Name", type: "text" },
  { id: "email", label: "Email Address", placeholder: "chat@lumora.com", type: "email" },
  { id: "phone", label: "Phone Number", placeholder: "+92 9029 9202", type: "tel" },
];

export default function WholesaleForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => setStatus("sent"), 900);
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Reveal className="mb-14 text-center">
        <TextReveal
          as="h2"
          className="font-display mb-4 text-4xl leading-tight tracking-tight text-[var(--color-navy)] sm:text-5xl"
        >
          WHOLESALE
          <br />
          ORDERING INQUIRIES
        </TextReveal>
        <p className="font-body text-lg text-[var(--color-dark)]/70">
          Distributor, Franchise, &amp; Supplier sales only (*ask your local
          parlor to stock us)
        </p>
        <div aria-hidden className="divider-glow mx-auto mt-8 h-px w-40" />
      </Reveal>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="font-form flex flex-col gap-10"
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.id} className="flex flex-col gap-4">
              <label
                htmlFor={f.id}
                className="font-display text-base text-[var(--color-dark)]"
              >
                {f.label}
              </label>
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                required
                placeholder={f.placeholder}
                className="w-full border-b border-[var(--color-dark)]/20 bg-transparent pb-2 text-base text-neutral-700 placeholder:text-neutral-400 focus:border-[var(--color-cyan)] focus:outline-none"
              />
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <label
              htmlFor="location"
              className="font-display text-base text-[var(--color-dark)]"
            >
              Location
            </label>
            <div className="relative">
              <select
                id="location"
                name="location"
                defaultValue="Mexico"
                className="w-full appearance-none border-b border-[var(--color-dark)]/20 bg-transparent pb-2 text-base text-neutral-700 focus:border-[var(--color-cyan)] focus:outline-none"
              >
                <option>United States</option>
                <option>Mexico</option>
                <option>Canada</option>
                <option>Other</option>
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-0 top-0.5 text-neutral-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label
            htmlFor="message"
            className="font-display text-base text-[var(--color-dark)]"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={2}
            placeholder="Type your message"
            className="w-full resize-none border-b border-[var(--color-dark)]/20 bg-transparent pb-2 text-base text-neutral-700 placeholder:text-neutral-400 focus:border-[var(--color-cyan)] focus:outline-none"
          />
        </div>

        <div className="flex justify-center pt-2">
          <MagneticButton type="submit" disabled={status !== "idle"}>
            {status === "sent" ? "Message Sent" : "Send Message"}
          </MagneticButton>
        </div>
      </motion.form>
    </section>
  );
}
