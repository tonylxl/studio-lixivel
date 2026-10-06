"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/content";
import styles from "./ArticleAside.module.css";

type Props = {
  toc: TocItem[];
  titre: string;
  reel?: { url?: string; vignette?: string; legende?: string };
};

/** Colonne collante de l'article : sommaire (section active en bordeaux), partage, lien vers le réel. */
export default function ArticleAside({ toc, titre, reel }: Props) {
  const [active, setActive] = useState(toc[0]?.id);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible */
    }
  };

  const enc = encodeURIComponent;

  return (
    <aside className={styles.aside}>
      {toc.length > 0 && (
        <nav aria-label="Sommaire">
          <p className="t-surtitre">Sommaire</p>
          <ol className={styles.toc}>
            {toc.map((t, i) => (
              <li key={t.id}>
                <a href={`#${t.id}`} aria-current={active === t.id ? "true" : undefined}>
                  <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className={styles.share}>
        <span className="t-surtitre">Partager</span>
        <a
          className="link"
          href={`https://pinterest.com/pin/create/button/?url=${enc(url)}&description=${enc(titre)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pinterest
        </a>
        <a
          className="link"
          href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <button type="button" className="link" onClick={copy}>
          {copied ? "Lien copié !" : "Copier le lien"}
        </button>
      </div>

      {reel?.url && (
        <a href={reel.url} target="_blank" rel="noopener noreferrer" className={styles.reel}>
          <span className="t-surtitre">Le réel</span>
          <span className={`media media--l ${styles.reelMedia}`}>
            {reel.vignette && <Image src={reel.vignette} alt="" fill sizes="220px" />}
            <span className={`tag ${styles.reelTag}`}>Réel</span>
            <span className={styles.play} aria-hidden>
              ▶
            </span>
            {reel.legende && <span className={styles.reelLegende}>{reel.legende}</span>}
          </span>
          <span className="link link--accent">Voir le réel sur Instagram ↗</span>
        </a>
      )}
    </aside>
  );
}
