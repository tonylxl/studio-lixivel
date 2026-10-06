"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FORMULES } from "@/data/services";
import { rdvHref } from "@/lib/site";
import styles from "./Simulateur.module.css";

const INCLUS: Record<string, string> = {
  conseils: "Plans 2D et 3D, appel de lancement, une série de modifications",
  decoration: "Plans 2D, rendus 3D en 4K, liste shopping référencée",
  "semi-complete": "Conception complète, consultation des artisans, suivi à distance",
  complete: "Visite sur place, conception, artisans et suivi de chantier",
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
  const [surface, setSurface] = useState(45);
  const [jeune, setJeune] = useState(false);

  const f = FORMULES.find((x) => x.slug === slug)!;
  const prixM2 = f.prix === null ? null : jeune && f.prixJeune ? f.prixJeune : f.prix;
  const total = prixM2 === null ? 0 : Math.round((surface * prixM2) / 10) * 10;
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

        <div className={styles.step}>
          <label htmlFor="surface" className={styles.legend}>
            <span className={styles.num}>02</span> Surface
          </label>
          <output htmlFor="surface" className={styles.surface}>
            {surface >= 200 ? "200 m² et +" : `${surface} m²`}
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
            <span>10 m²</span>
            <span>200 m² et +</span>
          </div>
        </div>

        {f.prixJeune && (
          <div className={styles.step}>
            <span className={styles.legend}>
              <span className={styles.num}>03</span> Tarif 18–29 ans
            </span>
            <label className={styles.toggle}>
              <input type="checkbox" checked={jeune} onChange={(e) => setJeune(e.target.checked)} />
              <span className={styles.switch} aria-hidden />
              <span className="t-petit c-2">
                Vous avez entre 18 et 29 ans : {f.prixJeune} €/m² au lieu de {f.prix} €/m² sur la formule Décoration.
              </span>
            </label>
          </div>
        )}
      </div>

      <div className={`${styles.card} ${styles.result}`} aria-live="polite">
        <p className="t-surtitre">Estimation des honoraires</p>
        <p className={styles.amount}>
          {prixM2 === null ? "Sur devis" : euro(shown)}
          {f.honorairesTravaux && <span className={styles.plus}> + honoraires sur travaux</span>}
        </p>
        <p className="t-petit c-2">
          {prixM2 === null
            ? `${f.titre} · conception et suivi chiffrés après notre échange`
            : `${f.titre} · ${surface} m² × ${prixM2} €/m²`}
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
          href={rdvHref("simulateur", { formule: f.slug, surface: String(surface) })}
          className="btn btn--lg"
        >
          Prendre rendez-vous avec cette estimation
        </Link>
        <p className="t-petit c-2">
          Estimation indicative, hors mobilier et travaux. Le devis définitif est établi après notre échange.
        </p>
      </div>
    </div>
  );
}
