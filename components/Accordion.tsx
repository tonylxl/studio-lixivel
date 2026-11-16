"use client";

import { useId, useState } from "react";
import styles from "./Accordion.module.css";

type Item = { q: string; r: string };

/** Réponses saisies dans Pages CMS : un lien s’écrit [texte](/adresse). */
function avecLiens(texte: string) {
  return texte.split(/(\[[^\]]+\]\([^)]+\))/).map((morceau, i) => {
    const m = morceau.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return m ? (
      <a key={i} href={m[2]} className="link link--accent">
        {m[1]}
      </a>
    ) : (
      morceau
    );
  });
}

export default function Accordion({ items, defaultOpen = -1 }: { items: Item[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number>(defaultOpen);
  const baseId = useId();

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-p${i}`;
        const btnId = `${baseId}-b${i}`;
        return (
          <div key={item.q} className={styles.item} data-open={isOpen || undefined}>
            <h3 className={styles.heading}>
              <button
                id={btnId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="t-accordeon">{item.q}</span>
                <span className={styles.icon} aria-hidden />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className={styles.panel}>
              <div className={styles.panelInner}>
                <p className="t-corps c-2">{avecLiens(item.r)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
