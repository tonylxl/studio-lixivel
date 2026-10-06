"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { rdvHref } from "@/lib/site";
import styles from "./StudioNav.module.css";

/** Menu d'ancres collant : la section visible est mise en avant en bordeaux. */
export default function StudioNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className={styles.nav} aria-label="Sommaire de la page">
      <ol>
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={styles.tile} aria-current={active === it.id ? "true" : undefined}>
              <span className={styles.num}>0{i}</span>
              <span>{it.label}</span>
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
