"use client";

import { useEffect } from "react";
import { TONES, type Tone } from "@/lib/site";

/** Distance de scroll (px) au-delà de laquelle la page repasse en blanc. */
const SEUIL = 8;

/**
 * Couleur d'ouverture de la page (inspirée de cri-sf.com) : toute la page,
 * nav comprise, prend la couleur au chargement, puis repasse en blanc
 * (fondu 0,6 s) dès qu'on commence à défiler, et reprend la couleur en haut de page.
 * `html[data-toned="false"]` sert aux textes clairs (ouvertures foncées) à repasser en brun.
 */
export default function PageTone({ tone }: { tone: Tone }) {
  useEffect(() => {
    const root = document.documentElement;
    const color = TONES[tone];
    let toned: boolean | null = null;

    const apply = () => {
      const next = window.scrollY <= SEUIL;
      if (next === toned) return;
      toned = next;
      root.style.setProperty("--page-tone", next ? color : TONES.blanc);
      root.dataset.toned = next ? "true" : "false";
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    return () => {
      window.removeEventListener("scroll", apply);
      root.style.removeProperty("--page-tone");
      delete root.dataset.toned;
    };
  }, [tone]);

  // Rendu côté serveur : la bonne couleur est là dès le premier affichage.
  // Sur le lin, la pastille « Menu » (lin elle aussi) passe en blanc pour rester visible.
  const css = `:root{--page-tone:${TONES[tone]};${tone === "lin" ? "--menu-toned:#fff;" : ""}}`;
  return <style>{css}</style>;
}
