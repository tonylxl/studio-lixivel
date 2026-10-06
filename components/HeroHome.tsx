"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { rdvHref } from "@/lib/site";
import styles from "./HeroHome.module.css";

/** Boucle de couleurs du hero : aplat + tabouret ton sur ton. */
const ETATS = [
  { fond: "#f7dddf", objet: "#ecc9cc" },
  { fond: "#fcc976", objet: "#f2b85a" },
  { fond: "#bcd4b4", objet: "#a9c6a0" },
];

export default function HeroHome() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 900], [0, -14]);
  const y = useTransform(scrollY, [0, 900], [0, 120]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % ETATS.length), 4500);
    return () => clearInterval(t);
  }, [reduce]);

  const etat = ETATS[i];

  return (
    <section
      className={styles.hero}
      style={{ ["--hero-fond" as string]: etat.fond, ["--hero-objet" as string]: etat.objet }}
    >
      <div className={styles.inner}>
        <motion.h1
          className="t-hero"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Architecte d’intérieur,
          <br />
          des lieux qui vous racontent.
        </motion.h1>
      </div>

      <motion.div className={styles.objet} style={reduce ? undefined : { rotate, y }} aria-hidden>
        <motion.span
          className={styles.objetShape}
          initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: 8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      <Link href={rdvHref("hero")} className={`btn btn--lg ${styles.cta}`}>
        Prendre rendez-vous
      </Link>
    </section>
  );
}
