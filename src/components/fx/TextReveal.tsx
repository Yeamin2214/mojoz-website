"use client";

import { Children, isValidElement, useMemo, type ReactNode, type ElementType } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface TextRevealProps {
  children: ReactNode;
  /** Wrapper element — keep the semantic tag of the original heading. */
  as?: ElementType;
  className?: string;
  /** "words" (default) or "chars" for character-level reveals. */
  mode?: "words" | "chars";
  delay?: number;
  stagger?: number;
  once?: boolean;
}

const parentVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const unitVariants: Variants = {
  hidden: { y: "110%", opacity: 0, rotate: 2 },
  visible: {
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

/**
 * Splits its text content into words (or characters) wrapped in overflow-clip
 * masks and staggers them upward on scroll into view. Non-string children
 * (e.g. <br/>, emoji spans) are passed through untouched, which lets the
 * existing headings keep their exact markup:
 *
 *   <TextReveal as="h2" className="...">MOST 🤤 CRAVED<br/>FLAVOURS</TextReveal>
 */
export default function TextReveal({
  children,
  as: Tag = "span",
  className,
  mode = "words",
  delay = 0,
  stagger = 0.045,
  once = true,
}: TextRevealProps) {
  const units = useMemo(() => {
    const out: ReactNode[] = [];
    let key = 0;
    Children.forEach(children, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        const text = String(child);
        const pieces = mode === "chars" ? Array.from(text) : text.split(/(\s+)/);
        pieces.forEach((piece) => {
          if (piece === "") return;
          if (/^\s+$/.test(piece)) {
            out.push(<span key={`s-${key++}`}> </span>);
            return;
          }
          out.push(
            <span key={`m-${key++}`} className="inline-block overflow-hidden align-baseline pb-[0.08em] -mb-[0.08em]">
              <motion.span variants={unitVariants} className="inline-block will-change-transform">
                {piece}
              </motion.span>
            </span>
          );
        });
      } else if (isValidElement(child)) {
        // <br/> and other inline elements pass straight through.
        out.push(<span key={`e-${key++}`}>{child}</span>);
      }
    });
    return out;
  }, [children, mode]);

  // Cast keeps the polymorphic `as` prop ergonomic while satisfying JSX types.
  const Wrapper = Tag as ElementType<{ className?: string; children?: ReactNode }>;

  return (
    <Wrapper className={className}>
      <motion.span
        className="inline-block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.5 }}
        variants={parentVariants(stagger, delay)}
      >
        {units}
      </motion.span>
    </Wrapper>
  );
}
