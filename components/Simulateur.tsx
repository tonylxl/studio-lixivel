"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FORMULES, TYPES_BIEN } from "@/data/services";
import { rdvHref } from "@/lib/site";
import styles from "./Simulateur.module.css";

const INCLUS: Record<string, string> = {
  conseils: "Plan d’agencement en 2D, guide des couleurs et matériaux",
  decoration: "Plan 2D, plan 3D décoré, liste shopping, accès aux prix fournisseurs",
  "semi-complete": "Conception complète, consultation des artisans, coordination à distance",
  complete: "Conception, mise en relation avec nos artisans, coordination des intervenants",
};

const euro = (n: number) => `${new Intl.NumberFormat("fr-FR").format(n)} €`;

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

export default function Simulateur() {
  const [slug, setSlug] = useState("decoration");
  const [bien, setBien] = useState("appartement");
  const [surface, setSurface] = useState(45);

  const f = FORMULES.find((x) => x.slug === slug)!;
  const type = TYPES_BIEN.find((t) => t.slug === bien) ?? TYPES_BIEN[0];
  /** Pas de tarif au m² ni de forfait : la prestation se chiffre sur devis (prise en charge complète). */
  const surDevis = (f.prix === null && !f.minimum) || Boolean(type.surDevis);
  const prixM2 = f.prix;
  const total = surDevis
    ? 0
    : prixM2 === null
      ? (f.minimum ?? 0)
      : Math.max(f.minimum ?? 0, Math.round((surface * prixM2) / 10) * 10);
  const shown = useCountUp(total);

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <p className="t-surtitre c-2">Votre projet</p>

        <fieldset className={styles.step}>
          <legend className={styles.legend}>
            <span className={styles.num}>01</span> Formule
          </legend>
          <div className={styles.pills}>
            {FORMULES.map((x) => (
              <button
                key={x.slug}
                type="button"
                className="pill"
                aria-pressed={x.slug === slug}
                onClick={() => setSlug(x.slug)}
              >
                {x.court}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.step}>
          <legend className={styles.legend}>
            <span className={styles.num}>02</span> Type de bien
          </legend>
          <div className={styles.pills}>
            {TYPES_BIEN.map((t) => (
              <button
                key={t.slug}
                type="button"
                className="pill"
                aria-pressed={t.slug === bien}
                onClick={() => setBien(t.slug)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className={styles.step}>
          <label htmlFor="surface" className={styles.legend}>
            <span className={styles.num}>03</span> Surface
          </label>
          <output htmlFor="surface" className={styles.surface}>
            {surface >= 200 ? "200 m² et +" : `${surface} m²`}
          </output>
          <input
            id="surface"
            type="range"
            min={10}
            max={200}
            step={5}
            value={surface}
            onChange={(e) => setSurface(Number(e.target.value))}
            className={styles.range}
            style={{ ["--p" as string]: `${((surface - 10) / 190) * 100}%` }}
          />
          <div className={styles.rangeLabels}>
            <span>10 m²</span>
            <span>200 m² et +</span>
          </div>
        </div>

      </div>

      <div className={`${styles.card} ${styles.result}`} aria-live="polite">
        <p className="t-surtitre">Estimation des honoraires</p>
        <p className={styles.amount}>
          {surDevis ? (
            "Sur devis"
          ) : (
            <>
              <span className={styles.from}>À partir de</span>
              {euro(shown)}
            </>
          )}
        </p>
        <p className="t-petit c-2">
          {surDevis
            ? type.surDevis
              ? `${f.titre} · ${type.label.toLowerCase()} · les tarifs ne s’appliquent pas aux studios`
              : `${f.titre} · tarif sur devis`
            : prixM2 === null
              ? `${f.titre} · forfait minimum`
              : `${f.titre} · ${type.label.toLowerCase()} · ${surface} m² × ${prixM2} €/m²`}
          {f.noteTarif && (
            <>
              <br />
              {f.noteTarif}
            </>
          )}
        </p>

        <dl className={`info-rows ${styles.rows}`}>
          <div>
            <dt>Délai</dt>
            <dd>{f.delai}</dd>
          </div>
          <div>
            <dt>Inclus</dt>
            <dd>{INCLUS[f.slug]}</dd>
          </div>
          <div>
            <dt>Modifications</dt>
            <dd>{f.modifs}</dd>
          </div>
        </dl>

        <Link
          href={rdvHref("simulateur", { formule: f.slug, bien: type.slug, surface: String(surface) })}
          className="btn btn--lg"
        >
          Prendre rendez-vous avec cette estimation
        </Link>
        <p className="t-petit c-2">
          Estimation indicative, hors mobilier et travaux. Après le questionnaire, le studio vous envoie une fourchette de prix, puis le tarif exact par email.
        </p>
      </div>
    </div>
  );
}
