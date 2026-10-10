"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Nombre qui compte de 0 à sa valeur quand il entre à l'écran (« +60 », « 48 h »…). */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const [n, setN] = useState(m ? 0 : null);

  useEffect(() => {
    if (!m || !inView) return;
    const target = Number(m[2]);
    if (reduce) return setN(target);
    const c = animate(0, target, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {m ? (
        <>
          {/* La vraie valeur, pour les lecteurs d'écran, Google et les IA (l'animation part de 0). */}
          <span className="sr-only">{value}</span>
          <span aria-hidden>
            {m[1]}
            {n}
            {m[3]}
          </span>
        </>
      ) : (
        value
      )}
    </span>
  );
}
