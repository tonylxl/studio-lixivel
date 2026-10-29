"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { FORMULES, TYPES_BIEN } from "@/data/services";
import { rdvHref } from "@/lib/site";
import styles from "./Simulateur.module.css";

/** Bornes du curseur de surface (m²). */
const SURFACE_MIN = 40;
const SURFACE_MAX = 200;
/** Lignes de « Ce qui est inclus » reprises dans le récapitulatif. */
const INCLUS_VISIBLES = 4;

const euro = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n)} €`;

/** « Dès 35 €/m² », « Sur devis » : le prix d'appel d'une formule. */
function prixCourt(f: { prix: number | null; minimum?: number }) {
  if (f.prix !== null) return `Dès ${f.prix} €/m²`;
  if (f.minimum) return `Dès ${euro(f.minimum)}`;
  return "Sur devis";
}

function useCountUp(target: number, duration = 400) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const origin = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = origin + (target - origin) * eased;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      from.current = target;
    };
  }, [target, duration]);
  return Math.round(value / 10) * 10;
}

type Option = { value: string; label: string; aside?: string };

/** Groupe de choix : vrais boutons radio (clavier, lecteurs d'écran), masqués visuellement. */
function Choix({
  legend,
  options,
  value,
  onChange,
  groupe,
  option,
}: {
  legend: React.ReactNode;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  groupe: string;
  option: string;
}) {
  const name = useId();
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.question}>{legend}</legend>
      <div className={groupe}>
        {options.map((o) => (
          <label key={o.value} className={option} data-actif={o.value === value || undefined}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={o.value === value}
              onChange={() => onChange(o.value)}
              className={styles.radio}
            />
            <span data-role="label">{o.label}</span>
            {o.aside && <span data-role="aside">{o.aside}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const Etape = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <>
    <span className={styles.num}>{n}</span>
    {children}
  </>
);

/**
 * Simulateur de la page Services : trois étapes à gauche (formule, type de bien, surface),
 * un récapitulatif à droite (prix « à partir de », rendez-vous, ce qui est inclus).
 * Honoraires seulement : surface × tarif de base, arrondi à 10 €. Les choix sont transmis au questionnaire.
 */
export default function Simulateur() {
  const [slug, setSlug] = useState("decoration");
  const [bien, setBien] = useState("appartement");
  const [surface, setSurface] = useState(SURFACE_MIN);
  const surfaceId = useId();

  const f = FORMULES.find((x) => x.slug === slug)!;
  const type = TYPES_BIEN.find((t) => t.slug === bien) ?? TYPES_BIEN[0];
  /** Formule sans tarif au m² (complète) : la surface ne change rien, l'étape disparaît. */
  const sansSurface = f.prix === null;
  const surDevis = (f.prix === null && !f.minimum) || Boolean(type.surDevis);
  const total = surDevis
    ? 0
    : f.prix === null
      ? (f.minimum ?? 0)
      : Math.max(f.minimum ?? 0, Math.round((surface * f.prix) / 10) * 10);
  const affiche = useCountUp(total);
  const pourcent = ((surface - SURFACE_MIN) / (SURFACE_MAX - SURFACE_MIN)) * 100;

  const lien = rdvHref("simulateur", {
    formule: f.slug,
    bien: type.slug,
    ...(sansSurface ? {} : { surface: String(surface) }),
  });

  return (
    <div className={styles.root}>
      <div className={styles.reglages}>
        <Choix
          legend={<Etape n={1}>Choisissez une formule</Etape>}
          value={slug}
          onChange={setSlug}
          options={FORMULES.map((x) => ({ value: x.slug, label: x.court, aside: prixCourt(x) }))}
          groupe={styles.tuiles}
          option={styles.tuile}
        />
        <Choix
          legend={<Etape n={2}>Type de bien</Etape>}
          value={bien}
          onChange={setBien}
          options={TYPES_BIEN.map((t) => ({ value: t.slug, label: t.label }))}
          groupe={styles.segments}
          option={styles.segment}
        />
        {!sansSurface && (
          <div className={styles.surface}>
            <label htmlFor={surfaceId} className={styles.question}>
              <Etape n={3}>Surface</Etape>
              <output htmlFor={surfaceId} className={styles.surfaceValeur}>
                {surface >= SURFACE_MAX ? `${SURFACE_MAX} m² et +` : `${surface} m²`}
              </output>
            </label>
            <input
              id={surfaceId}
              type="range"
              min={SURFACE_MIN}
              max={SURFACE_MAX}
              step={5}
              value={surface}
              onChange={(e) => setSurface(Number(e.target.value))}
              className={styles.range}
              style={{ ["--p" as string]: `${pourcent}%` }}
            />
            <div className={styles.bornes} aria-hidden>
              <span>{SURFACE_MIN}&nbsp;m²</span>
              <span>{SURFACE_MAX}&nbsp;m² et +</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.recap} aria-live="polite">
        <div className={styles.tete}>
          <p className={styles.sur}>Votre estimation</p>
          <p className={styles.formule}>{f.titre}</p>
        </div>

        <div className={styles.prix}>
          {surDevis ? (
            <p className={styles.montant} data-texte>
              Sur devis
            </p>
          ) : (
            <>
              <p className={styles.sur}>À partir de</p>
              <p className={styles.montant}>{euro(affiche)}</p>
            </>
          )}
          <p className={styles.aide}>
            {surDevis
              ? type.surDevis
                ? "Nos tarifs au m² ne s’appliquent pas aux studios."
                : "Chaque projet complet est chiffré sur mesure."
              : `${surface} m² × ${f.prix} €/m², hors mobilier et travaux`}
          </p>
        </div>

        <Link href={lien} className={`btn btn--lg ${styles.cta}`}>
          Prendre rendez-vous
        </Link>

        <div className={styles.detail}>
          <p className={styles.detailTitre}>Ce qui est inclus</p>
          <ul className={styles.coches}>
            {f.inclus.slice(0, INCLUS_VISIBLES).map((x) => (
              <li key={x.texte}>{x.texte}</li>
            ))}
          </ul>
          <p className={styles.aide}>Délai&nbsp;: {f.delai.toLowerCase()}</p>
        </div>
      </div>
    </div>
  );
}
