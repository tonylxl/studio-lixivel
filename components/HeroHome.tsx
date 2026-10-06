"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./HeroHome.module.css";

/**
 * Boucle du hero (maquette « Hero — états suivants ») : toutes les 3 s, le fond
 * et la silhouette changent ensemble (rose → moutarde → sauge), fondu 0,6 s.
 */
const ETATS = [
  { fond: "#f7dddf", objet: "#e0b8bb", forme: "tabouret" },
  { fond: "#fcc976", objet: "#d29e59", forme: "fauteuil" },
  { fond: "#bcd4b4", objet: "#91ac9f", forme: "tabouret" },
] as const;

export default function HeroHome() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % ETATS.length), 3000);
    return () => clearInterval(t);
  }, [reduce]);

  const etat = ETATS[i];

  return (
    <section className={styles.hero} style={{ ["--hero-fond" as string]: etat.fond }}>
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

      <div className={styles.objet} aria-hidden>
        {(["tabouret", "fauteuil"] as const).map((forme) => (
          <span
            key={forme}
            className={styles.objetShape}
            data-forme={forme}
            style={{ opacity: etat.forme === forme ? 1 : 0, background: etat.objet }}
          />
        ))}
      </div>
    </section>
  );
}
