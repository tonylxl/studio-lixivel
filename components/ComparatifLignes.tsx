"use client";

import { Fragment, useState } from "react";
import styles from "./ComparatifLignes.module.css";

type Ligne = { label: string; valeurs: string[] };

/** Nombre de lignes affichées avant « Voir plus » : les différences principales entre les formules. */
const LIGNES_VISIBLES = 9;
/** Le tarif et le délai restent toujours affichés, même replié. */
const TOUJOURS_VISIBLES = ["Tarif", "Délai"];

/** Corps du comparatif : replié sur les différences principales, « Voir plus » pour le détail. */
export default function ComparatifLignes({ lignes, formules }: { lignes: Ligne[]; formules: { court: string }[] }) {
  const [ouvert, setOuvert] = useState(false);
  const detailCache = lignes.slice(LIGNES_VISIBLES).some((l) => !TOUJOURS_VISIBLES.includes(l.label));

  return (
    <tbody>
      {lignes.map((row, index) => {
        const cachee = index >= LIGNES_VISIBLES && !TOUJOURS_VISIBLES.includes(row.label) && !ouvert;
        return (
          <Fragment key={row.label}>
            {index === LIGNES_VISIBLES && detailCache && (
              <tr className={styles.plus}>
                <td colSpan={formules.length + 1}>
                  <button type="button" className={styles.bouton} aria-expanded={ouvert} onClick={() => setOuvert(!ouvert)}>
                    {ouvert ? "Voir moins" : "Voir plus"}
                  </button>
                </td>
              </tr>
            )}
            {!cachee && (
              <tr data-tarif={row.label === "Tarif" || undefined}>
                <th scope="row">{row.label}</th>
                {row.valeurs.map((v, i) => (
                  <td
                    key={i}
                    data-formule={formules[i].court}
                    data-vide={v === "—" || undefined}
                    data-check={v === "✓" || undefined}
                  >
                    {v === "—" ? <span aria-label="Non inclus">—</span> : v === "✓" ? <span aria-label="Inclus">✓</span> : v}
                  </td>
                ))}
              </tr>
            )}
          </Fragment>
        );
      })}
    </tbody>
  );
}
