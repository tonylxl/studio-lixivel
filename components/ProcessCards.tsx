"use client";

import { motion, useReducedMotion } from "motion/react";
import { ETAPES } from "@/data/services";
import styles from "./ProcessCards.module.css";

const DEPART = [-7, 5, -4, 8];

/** Les 4 étapes : les cartes arrivent inclinées puis se rangent quand on fait défiler. */
export default function ProcessCards() {
  const reduce = useReducedMotion();
  return (
    <ol className={styles.grid}>
      {ETAPES.map((e, i) => (
        <motion.li
          key={e.titre}
          className={styles.card}
          data-couleur={e.couleur}
          initial={reduce ? false : { rotate: DEPART[i], y: 60 + i * 20, opacity: 0 }}
          whileInView={{ rotate: 0, y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={`t-xxl ${styles.num}`}>0{i + 1}</span>
          <div className={styles.text}>
            <h3 className="t-accordeon">{e.titre}</h3>
            <p className="t-serre">{e.texte}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
