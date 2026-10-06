"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Image qui dézoome légèrement (1,08 → 1) pendant qu'elle traverse l'écran. */
export default function ScrollZoom({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div style={{ position: "absolute", inset: 0, scale: reduce ? 1 : scale }}>{children}</motion.div>
    </div>
  );
}
