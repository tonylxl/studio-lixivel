"use client";

import { useMemo, useState } from "react";
import ArticleCard, { type ArticleCardData } from "./ArticleCard";
import styles from "./JournalList.module.css";

const PAGE = 6;

/** Filtres par catégorie + grille d'articles avec « Voir plus ». */
export default function JournalList({
  articles,
  categories,
}: {
  articles: ArticleCardData[];
  categories: string[];
}) {
  const [cat, setCat] = useState<string | null>(null);
  const [count, setCount] = useState(PAGE);
  const list = useMemo(() => (cat ? articles.filter((a) => a.categorie === cat) : articles), [articles, cat]);

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filtrer par catégorie">
        <button type="button" className="pill" aria-pressed={cat === null} onClick={() => setCat(null)}>
          Tous les articles
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className="pill"
            aria-pressed={cat === c}
            onClick={() => {
              setCat(c);
              setCount(PAGE);
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className={`t-intro c-2 ${styles.empty}`}>Pas encore d’article dans cette catégorie. Ça arrive bientôt.</p>
      ) : (
        <ul className={styles.grid}>
          {list.slice(0, count).map((a) => (
            <li key={a.slug}>
              <ArticleCard a={a} />
            </li>
          ))}
        </ul>
      )}

      {list.length > count && (
        <div className={styles.more}>
          <button type="button" className="btn" onClick={() => setCount((n) => n + PAGE)}>
            Voir plus d’articles
          </button>
        </div>
      )}
    </>
  );
}
