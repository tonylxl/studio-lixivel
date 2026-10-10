import Link from "next/link";
import { RESSOURCES } from "@/lib/site";
import styles from "./RessourcesOnglets.module.css";

/** Onglets du hub Ressources (Articles / Guides), en haut des pages /blog et /guides. */
export default function RessourcesOnglets({ actif, inverse }: { actif: string; inverse?: boolean }) {
  return (
    <nav aria-label="Ressources" className={styles.onglets}>
      {RESSOURCES.map((r) => (
        <Link
          key={r.href}
          href={r.href}
          className={`pill ${inverse ? "pill--inverse" : ""} ${r.href === actif ? "is-active" : ""}`}
          aria-current={r.href === actif ? "page" : undefined}
        >
          {r.label}
        </Link>
      ))}
    </nav>
  );
}
