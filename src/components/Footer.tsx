"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { footerLinks } from "@/lib/data";
import Reveal from "./Reveal";
import { SocialIcon, type SocialName } from "./SocialIcon";

const socials: { name: SocialName; label: string }[] = [
  { name: "twitter", label: "Twitter" },
  { name: "instagram", label: "Instagram" },
  { name: "linkedin", label: "LinkedIn" },
  { name: "threads", label: "Threads" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  }

  return (
    <footer className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
      <div className="flex flex-col gap-16 rounded-t-[40px] bg-[var(--color-dark)] px-6 py-16 sm:px-12 sm:py-20">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <Reveal className="max-w-md">
            <img
              src="/logo.webp"
              alt="MOJOZ"
              className="h-12 w-auto sm:h-16 md:h-20"
            />
          </Reveal>

          <Reveal delay={0.1} className="w-full max-w-md">
            <p className="font-body mb-3 sm:mb-4 text-base sm:text-lg font-bold text-white/90">
              Subscribe our newsletter
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex items-center justify-between gap-2 rounded-full bg-white/[0.14] p-1 pl-4 sm:gap-3 sm:p-1.5 sm:pl-5"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Mail address"
                aria-label="Email address"
                className="font-form w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-white/60 focus:outline-none"
              />
              <motion.button
                whileTap={{ scale: 0.94 }}
                type="submit"
                className="font-logo shrink-0 rounded-full bg-[var(--color-cyan)] px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm uppercase tracking-wide text-white"
              >
                {subscribed ? "Thanks!" : "Subscribe"}
              </motion.button>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-y-6 sm:gap-y-8 sm:max-w-xl sm:grid-cols-2 sm:gap-x-20">
            {footerLinks.map((col) => (
              <div key={col[0]} className="flex flex-col gap-6 sm:gap-8">
                {col.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="font-display text-base sm:text-lg md:text-xl text-white transition-colors hover:text-[var(--color-cyan)] lg:text-2xl"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-form text-sm text-white/70">
            Mojoz Copyright © {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ name, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-[var(--color-cyan)] transition-colors hover:bg-white/20"
              >
                <SocialIcon name={name} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
