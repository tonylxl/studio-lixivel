"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StudioNav.module.css";

export type StudioNavItem = { id: string; label: string; couleur: string };

/** Ligne de lecture : une section est active dès que son haut passe à 40 % de la hauteur d'écran. */
const ANCRE = 0.4;

/**
 * Menu en tuiles (maquette « Le studio ») : colonne collante de tuiles arrondies,
 * une couleur par section, numéro en haut, nom en bas. La tuile de la section
 * visible s'agrandit (elle prend la hauteur libre de la colonne, avec un léger rebond,
 * comme un meuble qui se cale) et une jauge montre où l'on en est dans la section.
 * Clic = défilement doux vers la section.
 * Sur mobile, le menu devient une barre de tuiles en bas d'écran et la tuile active s'élargit.
 */
export default function StudioNav({ items }: { items: StudioNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // Section active + progression dans cette section (variable CSS --p, sans re-rendu).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const ligne = window.innerHeight * ANCRE;
      let current: HTMLElement | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= ligne) current = el;
      }
      current ??= document.getElementById(items[0].id);
      if (!current) return;
      const r = current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (ligne - r.top) / Math.max(1, r.height)));
      navRef.current?.style.setProperty("--p", p.toFixed(3));
      setActive(current.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  // Barre mobile : la tuile active reste visible.
  useEffect(() => {
    const list = listRef.current;
    const tile = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !tile || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tile.offsetLeft - (list.clientWidth - tile.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Sommaire de la page">
      <ol ref={listRef} className={styles.list}>
        {items.map((it, i) => (
          <li key={it.id} className={styles.item} data-active={active === it.id || undefined}>
            <a
              href={`#${it.id}`}
              data-id={it.id}
              data-couleur={it.couleur}
              className={styles.tile}
              aria-current={active === it.id ? "true" : undefined}
            >
              <span className={styles.num}>0{i}</span>
              <span className={styles.label}>{it.label}</span>
              <span aria-hidden className={styles.jauge}>
                <span className={styles.jaugeFill} />
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
