"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TONES, type Tone } from "@/lib/site";
import MaskReveal from "./MaskReveal";
import CursorVoir from "./CursorVoir";
import styles from "./ProjetsHub.module.css";

export type ProjetCard = {
  slug: string;
  titre: string;
  sousTitre: string;
  ville: string;
  annee: number;
  couleur: Tone;
  cover: string;
  coverAlt: string;
};

/** Écran partagé : colonne collante colorée à gauche (couleur du projet visible), photos qui défilent à droite. */
export default function ProjetsHub({ projets }: { projets: ProjetCard[] }) {
  const [active, setActive] = useState(0);
  const [vue, setVue] = useState<"galerie" | "liste">("galerie");
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (vue !== "galerie") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [vue, projets.length]);

  const p = projets[active] ?? projets[0];
  const dark = p?.couleur === "ardoise";
  const total = String(projets.length).padStart(2, "0");

  return (
    <div className={styles.root} data-vue={vue}>
      <div
        className={styles.left}
        style={{ backgroundColor: vue === "galerie" ? TONES[p.couleur] : TONES.rose }}
        data-dark={(vue === "galerie" && dark) || undefined}
      >
        <div className={styles.leftInner}>
          <MaskReveal as="h1" className="t-hero" lines={["Nos réalisations", "d’architecte", "d’intérieur."]} />
          <p className={`t-petit ${styles.intro}`}>
            Appartements, maisons, bureaux, ateliers : une sélection de projets menés à distance partout en France et sur
            place en Normandie.
          </p>
        </div>
        <div className={styles.leftBottom}>
          <AnimatePresence mode="wait">
            {vue === "galerie" && (
              <motion.div
                key={active}
                className={styles.current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <span className={styles.counter}>
                  {String(active + 1).padStart(2, "0")} / {total}
                </span>
                <span className="t-carte">{p.titre}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.rightTop}>
          <p className="t-petit">Projets ({projets.length})</p>
          <div className={styles.toggle} role="group" aria-label="Affichage">
            <button type="button" aria-pressed={vue === "galerie"} onClick={() => setVue("galerie")}>
              Galerie
            </button>
            <button type="button" aria-pressed={vue === "liste"} onClick={() => setVue("liste")}>
              Liste
            </button>
          </div>
        </div>
        {vue === "galerie" ? (
          <ul className={styles.gallery}>
            {projets.map((x, i) => (
              <li
                key={x.slug}
                data-index={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
              >
                <Link href={`/projets/${x.slug}`} className={styles.card}>
                  <motion.div
                    data-cursor-voir
                    className={`media ${styles.cardMedia}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className={styles.cardZoom}
                      initial={{ scale: 1.08 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image src={x.cover} alt={x.coverAlt} fill sizes="(max-width: 900px) 100vw, 50vw" priority={i < 2} />
                    </motion.div>
                  </motion.div>
                  <div className={styles.cardText}>
                    <p className="t-carte">
                      {x.titre}
                      <br />
                      <span className="c-2">{x.sousTitre}</span>
                    </p>
                    <p className="t-petit">
                      {x.ville} · {x.annee}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles.list}>
            {projets.map((x, i) => (
              <li key={x.slug}>
                <Link href={`/projets/${x.slug}`} className={styles.row}>
                  <span className="t-petit c-2">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t-accordeon">{x.titre}</span>
                  <span className="t-serre c-2">{x.sousTitre}</span>
                  <span className="t-serre c-2">
                    {x.ville} · {x.annee}
                  </span>
                  <span className={styles.thumb} aria-hidden>
                    <Image src={x.cover} alt="" fill sizes="240px" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {vue === "galerie" && <CursorVoir />}
    </div>
  );
}
