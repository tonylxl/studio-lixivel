"use client";

import { useState } from "react";
import styles from "./ComparatifLignes.module.css";

type Ligne = { label: string; valeurs: string[] };

/** Nombre de lignes affichées avant « Voir plus » : les différences principales entre les formules. */
const LIGNES_VISIBLES = 9;
/** Le tarif et le délai restent toujours affichés, juste après les lignes visibles, avant « Voir plus ». */
const toujoursVisible = (label: string) => /^(Tarif|Délai)/.test(label);

/** Corps du comparatif : replié sur les différences principales, tarif et délai, puis « Voir plus » pour le détail. */
export default function ComparatifLignes({ lignes, formules }: { lignes: Ligne[]; formules: { court: string }[] }) {
  const [ouvert, setOuvert] = useState(false);
  const prestations = lignes.filter((l) => !toujoursVisible(l.label));
  const fin = lignes.filter((l) => toujoursVisible(l.label));
  const detailCache = prestations.length > LIGNES_VISIBLES;
  const affichees = [...(ouvert ? prestations : prestations.slice(0, LIGNES_VISIBLES)), ...fin];

  return (
    <tbody>
      {affichees.map((row) => (
        <tr key={row.label} data-tarif={row.label.startsWith("Tarif") || undefined}>
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
      ))}
      {detailCache && (
        <tr className={styles.plus}>
          <td colSpan={formules.length + 1}>
            <button type="button" className={styles.bouton} aria-expanded={ouvert} onClick={() => setOuvert(!ouvert)}>
              {ouvert ? "Voir moins" : "Voir plus"}
            </button>
          </td>
        </tr>
      )}
    </tbody>
  );
}
