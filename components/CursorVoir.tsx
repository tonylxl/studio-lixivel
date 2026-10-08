"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import styles from "./CursorVoir.module.css";

/**
 * Curseur rond « Voir » : il suit la souris quand elle survole un élément
 * marqué `data-cursor-voir` (les photos du hub Projets). Un seul curseur en
 * position fixe : il n'est jamais coupé par les arrondis des photos et reste
 * juste pendant le scroll. Désactivé sur les écrans tactiles.
 */
export default function CursorVoir({ label = "Voir" }: { label?: string }) {
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.6 });
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const test = (cx: number, cy: number) => {
      const el = document.elementFromPoint(cx, cy);
      setVisible(Boolean(el?.closest("[data-cursor-voir]")));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      // Premier mouvement : le rond apparaît directement sous la souris, sans glisser depuis l'extérieur.
      if (!last.current) {
        sx.jump(e.clientX);
        sy.jump(e.clientY);
      }
      last.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      test(e.clientX, e.clientY);
    };
    // Au scroll, la souris ne bouge pas mais la photo sous elle change.
    const onScroll = () => last.current && test(last.current.x, last.current.y);
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y, sx, sy]);

  if (!enabled) return null;

  return (
    <motion.span
      className={styles.cursor}
      style={{ x: sx, y: sy }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      {label}
    </motion.span>
  );
}
