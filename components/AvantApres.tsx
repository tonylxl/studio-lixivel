"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate } from "motion";
import styles from "./AvantApres.module.css";

type Props = {
  avant: string;
  apres: string;
  altAvant?: string;
  altApres?: string;
  depart?: number;
  className?: string;
  sizes?: string;
};

/**
 * Comparateur avant / après : on fait glisser la poignée (souris, doigt ou flèches du clavier).
 * À l’entrée à l’écran, la poignée fait un petit aller-retour pour montrer qu’on peut glisser.
 */
export default function AvantApres({
  avant,
  apres,
  altAvant = "Avant",
  altApres = "Après",
  depart = 50,
  className,
  sizes = "(max-width: 900px) 100vw, 66vw",
}: Props) {
  const [pos, setPos] = useState(depart);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const controls = animate(depart, [depart, depart + 10, depart - 8, depart], {
          duration: 1.6,
          delay: 0.3,
          ease: "easeInOut",
          onUpdate: (v) => !dragging.current && setPos(v),
        });
        stop = () => controls.stop();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop?.();
    };
  }, [depart]);

  const fromEvent = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.root} ${className ?? ""}`}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        fromEvent(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromEvent(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image src={apres} alt={altApres} fill sizes={sizes} className={styles.img} />
      <div className={styles.before} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={avant} alt={altAvant} fill sizes={sizes} className={styles.img} />
      </div>
      <span className={`${styles.label} ${styles.labelLeft}`}>Avant</span>
      <span className={`${styles.label} ${styles.labelRight}`}>Après</span>
      <div className={styles.line} style={{ left: `${pos}%` }} aria-hidden />
      <button
        type="button"
        role="slider"
        aria-label="Comparer avant et après"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        className={styles.handle}
        style={{ left: `${pos}%` }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
        }}
      >
        ↔
      </button>
    </div>
  );
}
