"use client";

import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type Props = {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3";
};

/** Paragraphe révélé ligne par ligne (fondu + montée de 16 px) quand il entre à l'écran. */
export default function LineReveal({ text, className, as = "p" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const words = text.split(" ");
  const [lines, setLines] = useState<number[]>(() => words.map(() => 0));

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
      const tops = [...new Set(spans.map((s) => s.offsetTop))].sort((a, b) => a - b);
      setLines(spans.map((s) => tops.indexOf(s.offsetTop)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  const Tag = motion[as];
  return (
    <Tag ref={ref as never} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
        <motion.span
          data-word
          style={{ display: "inline-block" }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: lines[i] * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}
        </motion.span>
        {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
