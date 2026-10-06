"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import ArticleCard, { type ArticleCardData } from "./ArticleCard";
import styles from "./JournalList.module.css";

const PAGE = 6;

type Filtre = { cat: string | null; setCat: (c: string | null) => void };
const FiltreContext = createContext<Filtre>({ cat: null, setCat: () => {} });

/** Partage la catégorie choisie entre les filtres (dans l'ouverture) et la grille. */
export function JournalProvider({ children }: { children: ReactNode }) {
  const [cat, setCat] = useState<string | null>(null);
  return <FiltreContext.Provider value={{ cat, setCat }}>{children}</FiltreContext.Provider>;
}

/** Pastilles de catégorie, posées dans l'ouverture ardoise (style inversé). */
export function JournalFilters({ categories }: { categories: string[] }) {
  const { cat, setCat } = useContext(FiltreContext);
  const choose = (c: string | null) => {
    setCat(c);
    document.getElementById("tous")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className={styles.filters} role="group" aria-label="Filtrer par catégorie">
      <button type="button" className={`pill pill--inverse ${cat === null ? "is-active" : ""}`} aria-pressed={cat === null} onClick={() => choose(null)}>
        Tous les articles
      </button>
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          className={`pill pill--inverse ${cat === c ? "is-active" : ""}`}
          aria-pressed={cat === c}
          onClick={() => choose(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

/** Grille d'articles filtrée, avec « Voir plus ». */
export default function JournalList({ articles }: { articles: ArticleCardData[] }) {
  const { cat, setCat } = useContext(FiltreContext);
  const [count, setCount] = useState(PAGE);
  const list = useMemo(() => (cat ? articles.filter((a) => a.categorie === cat) : articles), [articles, cat]);

  return (
    <>
      {cat && (
        <p className={`t-petit ${styles.current}`}>
          Catégorie : <strong>{cat}</strong> ·{" "}
          <button type="button" className="link" onClick={() => setCat(null)}>
            Tout afficher
          </button>
        </p>
      )}
      {list.length === 0 ? (
        <p className={`t-intro c-2 ${styles.empty}`}>Pas encore d’article dans cette catégorie. Ça arrive bientôt.</p>
      ) : (
        <motion.ul className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {list.slice(0, count).map((a) => (
              <motion.li
                key={a.slug}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ArticleCard a={a} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
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
