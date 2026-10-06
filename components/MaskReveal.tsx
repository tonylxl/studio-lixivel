"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  /** Chaque élément est une ligne qui monte dans son propre masque. */
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  id?: string;
  delay?: number;
  /** Écart entre deux lignes (s). */
  stagger?: number;
};

/** Texte qui « monte en masque », ligne par ligne, quand il entre à l'écran. */
export default function MaskReveal({ lines, className, lineClassName, as = "div", id, delay = 0, stagger = 0.08 }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em", marginBottom: "-0.08em" }}>
          <motion.span
            className={lineClassName}
            style={{ display: "block" }}
            variants={{
              hidden: reduce ? { y: 0 } : { y: "105%" },
              visible: { y: 0, transition: { duration: 0.9, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
