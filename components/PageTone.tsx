"use client";

import { useEffect } from "react";
import { TONES, type Tone } from "@/lib/site";

/**
 * Couleur d'ouverture de la page : le fond de la page prend la couleur
 * choisie au chargement, puis passe en blanc (fondu 0,6 s) dès qu'on a
 * fait défiler une partie de l'ouverture.
 */
export default function PageTone({
  tone,
  threshold = 0.35,
  scope = "opening",
}: {
  tone: Tone;
  threshold?: number;
  /** "opening" : seule l'ouverture (classe .tone-bg) prend la couleur ; "page" : toute la page. */
  scope?: "opening" | "page";
}) {
  useEffect(() => {
    const root = document.documentElement;
    const color = TONES[tone];
    let white = false;

    const apply = () => {
      const shouldBeWhite = window.scrollY > window.innerHeight * threshold;
      if (shouldBeWhite !== white) {
        white = shouldBeWhite;
        root.style.setProperty("--page-tone", white ? TONES.blanc : color);
        root.dataset.toned = white ? "false" : "true";
      }
    };

    root.style.setProperty("--page-tone", color);
    root.dataset.toned = "true";
    root.dataset.toneScope = scope;
    white = false;
    apply();

    window.addEventListener("scroll", apply, { passive: true });
    return () => {
      window.removeEventListener("scroll", apply);
      root.style.removeProperty("--page-tone");
      delete root.dataset.toned;
      delete root.dataset.toneScope;
    };
  }, [tone, threshold, scope]);

  // Rendu côté serveur : la bonne couleur est là dès le premier affichage.
  const css = `:root{--page-tone:${TONES[tone]}}` + (scope === "page" ? `body{background-color:var(--page-tone)}` : "");
  return <style>{css}</style>;
}
