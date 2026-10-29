"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Formule } from "@/data/services";
import { rdvHref } from "@/lib/site";
import InclusListe from "./InclusListe";
import styles from "./FormulesOnglets.module.css";

/** Formule ouverte par défaut (la plus demandée), sauf si l'adresse en désigne une (#conseils…). */
const PAR_DEFAUT = "decoration";

const normaliser = (t: string) => t.trim().toLowerCase().replace(/’/g, "'");

/**
 * Pour chaque formule, les lignes de « Ce qui est inclus » (Pages CMS) absentes des formules précédentes :
 * on affiche « Tout ce qui est inclus dans Conseils, plus : » au lieu de répéter toute la liste.
 */
function nouveautes(formules: Formule[]) {
  const vus = new Set<string>();
  return formules.map((f) => {
    const nouveaux = f.inclus.filter((x) => !vus.has(normaliser(x.texte)));
    f.inclus.forEach((x) => vus.add(normaliser(x.texte)));
    return nouveaux;
  });
}

/**
 * Les 4 formules de la page Services : onglets (nom + tarif) en haut, détail de la formule choisie dessous.
 * Les 4 panneaux restent dans la page (cachés), donc lus par Google. Les liens /services#conseils, #decoration…
 * (accueil, villes, blog, llms.txt) ouvrent le bon onglet.
 */
export default function FormulesOnglets({ formules }: { formules: Formule[] }) {
  const [actif, setActif] = useState(
    formules.some((f) => f.slug === PAR_DEFAUT) ? PAR_DEFAUT : formules[0].slug,
  );
  const ajouts = nouveautes(formules);
  const bloc = useRef<HTMLDivElement>(null);
  const onglets = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const depuisAdresse = () => {
      const slug = window.location.hash.slice(1);
      if (!formules.some((f) => f.slug === slug)) return;
      setActif(slug);
      requestAnimationFrame(() =>
        bloc.current?.scrollIntoView({ block: "start" }),
      );
    };
    depuisAdresse();
    window.addEventListener("hashchange", depuisAdresse);
    return () => window.removeEventListener("hashchange", depuisAdresse);
  }, [formules]);

  /** Flèches gauche / droite entre les onglets (comportement attendu d'une liste d'onglets). */
  const clavier = (e: React.KeyboardEvent, i: number) => {
    const sens = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!sens) return;
    e.preventDefault();
    const j = (i + sens + formules.length) % formules.length;
    setActif(formules[j].slug);
    onglets.current[j]?.focus();
  };

  return (
    <div ref={bloc} className={styles.root}>
      <div className={styles.barre} role="tablist" aria-label="Formules">
        {formules.map((f, i) => (
          <button
            key={f.slug}
            ref={(el) => {
              onglets.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`onglet-${f.slug}`}
            aria-selected={actif === f.slug}
            aria-controls={f.slug}
            tabIndex={actif === f.slug ? 0 : -1}
            className={styles.onglet}
            onClick={() => setActif(f.slug)}
            onKeyDown={(e) => clavier(e, i)}
          >
            <span className={styles.ongletNom}>{f.court}</span>
            <span className={styles.ongletTarif}>{f.tarif}</span>
          </button>
        ))}
      </div>

      {formules.map((f, i) => (
        <div
          key={f.slug}
          role="tabpanel"
          id={f.slug}
          aria-labelledby={`onglet-${f.slug}`}
          hidden={actif !== f.slug}
          className={styles.panneau}
        >
          <div
            className={`media ${styles.image}`}
            data-contain={f.illustration || f.slug === "conseils" || undefined}
            data-fond={f.slug === "conseils" ? "blanc" : undefined}
          >
            <Image
              src={f.image}
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
              priority={f.slug === PAR_DEFAUT}
            />
          </div>
          <div className={styles.texte}>
            <p className={styles.surtitre}>{f.surtitre}</p>
            <h2 className="t-projet">{f.titre}</h2>
            <p className={styles.description}>{f.description}</p>
            <div className={styles.inclus}>
              <p className={styles.inclusTitre}>
                {i === 0 ? (
                  "Ce qui est inclus"
                ) : (
                  <>
                    Tout ce qui est inclus dans{" "}
                    <button
                      type="button"
                      className={styles.inclusLien}
                      onClick={() => setActif(formules[i - 1].slug)}
                    >
                      {formules[i - 1].court}
                    </button>
                    , plus&nbsp;:
                  </>
                )}
              </p>
              <InclusListe items={ajouts[i]} />
            </div>
            <dl className={styles.meta}>
              <div>
                <dt>Délai</dt>
                <dd>{f.delai}</dd>
              </div>
              <div>
                <dt>{f.prix === null ? "Tarif" : "Tarif (hors studio)"}</dt>
                <dd>{f.tarif}</dd>
              </div>
            </dl>
            <Link
              href={rdvHref(`services-${f.slug}`, { formule: f.slug })}
              className="btn"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
