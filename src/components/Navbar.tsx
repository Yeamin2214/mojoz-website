"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, ShoppingBag, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  // Scroll state: shrink after 24px, hide when scrolling down, show on up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 160 && y > lastY + 4);
      if (y < lastY - 4 || y <= 160) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section indicator driven by IntersectionObserver.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6"
    >
      <div
        className={
          "flex w-full max-w-[1209px] items-center gap-2 transition-all duration-300"
        }
      >
        <nav
          className={
            "flex flex-1 items-center justify-between gap-6 rounded-full px-4 transition-all duration-500 sm:px-6 " +
            (scrolled
              ? "bg-white/40 py-1.5 shadow-lg shadow-black/10 backdrop-blur-2xl border border-white/30"
              : "bg-white/30 py-2 shadow-none backdrop-blur-lg border border-white/20")
          }
        >
          <a
            href="#home"
            className="flex items-center"
          >
            <img
              src="/logo.webp"
              alt="MOJOZ"
              className="h-8 w-auto sm:h-10"
            />
          </a>

          <ul className="hidden items-center gap-4 md:gap-6 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={
                      "font-display relative px-1.5 md:px-2 py-2 text-xs md:text-sm uppercase tracking-wide transition-colors duration-300 " +
                      (isActive
                        ? "text-[var(--color-navy)]"
                        : "text-[var(--color-dark)]/50 hover:text-[var(--color-navy)]")
                    }
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-x-2 -bottom-0.5 h-[2.5px] rounded-full bg-[var(--color-cyan)]"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <MagneticButton className="!py-3">
              <MessageCircle size={16} strokeWidth={2.5} />
              Let&rsquo;s Talk
            </MagneticButton>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center rounded-full p-2 text-[var(--color-navy)] lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        <button
          aria-label="Cart"
          className="hidden h-[54px] w-[64px] shrink-0 items-center justify-center gap-1 rounded-full bg-white font-display text-xs text-[var(--color-dark)]/50 sm:flex"
        >
          <ShoppingBag size={20} className="text-[var(--color-navy)]" />
          (0)
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-[76px] rounded-3xl bg-white p-6 shadow-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display block rounded-xl px-3 py-3 text-base uppercase tracking-wide text-[var(--color-dark)]/70 hover:bg-neutral-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <MagneticButton className="mt-4 w-full">
              <MessageCircle size={16} strokeWidth={2.5} />
              Let&rsquo;s Talk
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
