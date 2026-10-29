"use client";

import { useId, useState } from "react";
import styles from "./InclusListe.module.css";

/** Lignes affichées avant « Voir plus ». */
const LIGNES_VISIBLES = 5;

type Item = { texte: string; detail?: string };

/**
 * « Ce qui est inclus » d'une formule : 5 lignes puis « Voir plus ».
 * Une ligne qui a un descriptif (Pages CMS) devient un bouton : le + passe en − et le texte se déroule dessous.
 */
export default function InclusListe({ items }: { items: Item[] }) {
  const [tout, setTout] = useState(false);
  const [ouverte, setOuverte] = useState<number | null>(null);
  const id = useId();
  const affiches = tout ? items : items.slice(0, LIGNES_VISIBLES);

  return (
    <>
      <ul className={styles.liste}>
        {affiches.map((x, i) =>
          x.detail ? (
            <li key={x.texte}>
              <button
                type="button"
                className={styles.ligne}
                aria-expanded={ouverte === i}
                aria-controls={`${id}-${i}`}
                onClick={() => setOuverte(ouverte === i ? null : i)}
              >
                <span className={styles.signe} aria-hidden>
                  {ouverte === i ? "−" : "+"}
                </span>
                <span className={styles.texte}>{x.texte}</span>
              </button>
              <div id={`${id}-${i}`} className={styles.detail} hidden={ouverte !== i}>
                {x.detail}
              </div>
            </li>
          ) : (
            <li key={x.texte} className={styles.ligne}>
              <span className={styles.signe} aria-hidden>
                +
              </span>
              <span className={styles.texte}>{x.texte}</span>
            </li>
          ),
        )}
      </ul>
      {items.length > LIGNES_VISIBLES && (
        <button type="button" className={styles.plus} aria-expanded={tout} onClick={() => setTout(!tout)}>
          {tout ? "Voir moins" : `Voir plus (${items.length - LIGNES_VISIBLES})`}
        </button>
      )}
    </>
  );
}
