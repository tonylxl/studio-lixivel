"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
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
        {/* Apparition en CSS (pas en JS) : le titre s'affiche dès le premier rendu, sans attendre l'hydratation (LCP). */}
        <h1 className={`t-hero ${styles.titre}`}>
          Architecte d’intérieur,
          <br />
          des lieux qui vous racontent.
        </h1>
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
