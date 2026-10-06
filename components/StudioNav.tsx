"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { rdvHref } from "@/lib/site";
import styles from "./StudioNav.module.css";

export type StudioNavItem = { id: string; label: string; couleur: string };

/**
 * Menu en tuiles (maquette « Le studio ») : colonne collante de tuiles arrondies,
 * une couleur par section, numéro en haut, nom en bas. La tuile de la section
 * visible est entourée ; clic = défilement doux vers la section.
 * Sur mobile, le menu devient une barre de tuiles en bas d'écran et la tuile active s'élargit.
 */
export default function StudioNav({ items }: { items: StudioNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  // Barre mobile : la tuile active reste visible.
  useEffect(() => {
    const list = listRef.current;
    const tile = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !tile || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tile.offsetLeft - (list.clientWidth - tile.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav className={styles.nav} aria-label="Sommaire de la page">
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
            </a>
          </li>
        ))}
      </ol>
      <Link href={rdvHref("le-studio-menu")} className={`btn ${styles.cta}`}>
        Prendre rendez-vous
      </Link>
    </nav>
  );
}
