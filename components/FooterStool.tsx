"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Tabouret du pied de page : incliné de 8°, il tourne lentement au scroll. */
export default function FooterStool({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-16, 32]);

  return (
    <motion.div ref={ref} className={className} style={{ rotate: reduce ? 8 : rotate }}>
      <Image src="/images/tabouret.png" alt="" width={1462} height={1469} sizes="300px" />
    </motion.div>
  );
}
