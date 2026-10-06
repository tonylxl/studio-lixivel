"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AvantApres from "./AvantApres";
import { rdvHref } from "@/lib/site";
import styles from "./Avis.module.css";

export type AvisItem = {
  nom: string;
  projet: string;
  contexte: string;
  texte: string;
  avant: string;
  apres: string;
};

export default function Avis({ items }: { items: AvisItem[] }) {
  const [i, setI] = useState(0);
  const a = items[i];
  const go = (d: number) => setI((n) => (n + d + items.length) % items.length);

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.sliderWrap}>
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              className={styles.sliderLayer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <AvantApres avant={a.avant} apres={a.apres} className={styles.slider} depart={48} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.side}>
          <div className={styles.top}>
            <div className={styles.controls}>
              <span className="t-serre c-2" aria-live="polite">
                0{i + 1} / 0{items.length}
              </span>
              <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label="Avis précédent">
                ←
              </button>
              <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label="Avis suivant">
                →
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                className="t-citation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                « {a.texte} »
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className={styles.bottom}>
            <div>
              <p className="t-accordeon">{a.nom}</p>
              <p className="t-serre c-2">{a.contexte}</p>
            </div>
            <Link href={rdvHref("avis")} className="btn">
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </div>

      <ul className={styles.list}>
        {items.map((it, n) => (
          <li key={it.nom}>
            <button
              type="button"
              className={styles.client}
              aria-current={n === i || undefined}
              onClick={() => setI(n)}
            >
              {n === i && <motion.span layoutId="avis-barre" className={styles.bar} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />}
              <span className="t-carte">{it.nom}</span>
              <span className="t-serre c-2">{it.projet}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
