import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Opening from "@/components/Opening";
import Footer from "@/components/Footer";
import { formatDate, getArticles } from "@/lib/content";
import styles from "./apercu.module.css";

export const metadata: Metadata = {
  title: "Aperçu des brouillons",
  robots: { index: false, follow: false },
};

/**
 * Page d'aperçu pour Cindy (hors menu, non indexée, absente du sitemap) : la liste des articles en brouillon,
 * chacun avec son lien. Un article enregistré dans Pages CMS apparaît ici environ une minute plus tard.
 */
export default function ApercuPage() {
  const brouillons = getArticles({ brouillons: true }).filter((a) => a.brouillon);

  return (
    <>
      <Opening tone="doux" source="header-apercu" surtitre="Aperçu" title="Les brouillons du blog">
        <p>
          Les articles enregistrés avec la case « Brouillon » cochée. Ils sont visibles seulement par leur lien, jamais
          sur le site ni dans Google. Après un enregistrement dans Pages CMS, comptez environ une minute avant de voir la
          nouvelle version (rechargez la page).
        </p>
      </Opening>

      <main id="contenu" className="sur-blanc">
        <div className={`wrap ${styles.page}`}>
          {brouillons.length === 0 ? (
            <p className="t-serre c-2">Aucun brouillon pour le moment.</p>
          ) : (
            <ul className={styles.liste}>
              {brouillons.map((a) => (
                <li key={a.slug}>
                  <Link href={`/blog/${a.slug}`} className={styles.ligne}>
                    <span className={`media ${styles.vignette}`}>
                      <Image src={a.cover} alt="" fill sizes="120px" />
                    </span>
                    <span className={styles.texte}>
                      <span className="t-carte">{a.titre}</span>
                      <span className="t-petit c-2">
                        {a.categorie} · daté du {formatDate(a.date)} · /blog/{a.slug}
                      </span>
                    </span>
                    <span className={`t-petit ${styles.voir}`}>Voir l’aperçu →</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className="t-petit c-2">
            Pour publier : dans Pages CMS, décochez « Brouillon » puis enregistrez. L’article apparaît alors sur le blog
            et dans Google.
          </p>
        </div>
      </main>
      <Footer band={false} />
    </>
  );
}
