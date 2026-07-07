"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * A short brand curtain on first load: the MOJOZ wordmark pops in, then the
 * cyan curtain sweeps up to reveal the page, which fades/rises in beneath it.
 * Kept under a second so it feels premium, not obstructive.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="curtain"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: EASE_OUT } }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-cyan)]"
            aria-hidden
          >
            <motion.img
              src="/logo.webp"
              alt="MOJOZ"
              initial={{ opacity: 0, scale: 0.8, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -24, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
              className="h-16 w-auto sm:h-20"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.75, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </>
  );
}
