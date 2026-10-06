"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type Props = {
  children: ReactNode;
  /** Rotation de départ (°), entre −9 et +9. */
  rotate: number;
  /** Décalage vertical de départ (px). */
  y: number;
  /** Rang de la carte : décale légèrement le moment où elle se range. */
  index?: number;
  /** Part du trajet (0–1) pendant laquelle la carte reste en désordre avant de se ranger. */
  hold?: number;
  className?: string;
  as?: "li" | "div";
  [key: `data-${string}`]: string | undefined;
};

/**
 * Carte « posée en vrac » : inclinée et décalée en entrant à l'écran, elle se range
 * au fil du scroll et finit parfaitement alignée (0°) quand elle atteint le centre de l'écran.
 */
export default function SettleCard({ children, rotate, y, index = 0, hold = 0, className, as = "li", ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const start = Math.min(hold + index * 0.06, 0.9);
  const r = useTransform(scrollYProgress, [start, 1], [rotate, 0]);
  const ty = useTransform(scrollYProgress, [start, 1], [y, 0]);
  const Tag = motion[as];
  return (
    <Tag
      ref={ref as never}
      className={className}
      style={reduce ? undefined : { rotate: r, y: ty }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
