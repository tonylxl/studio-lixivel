import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Opening from "@/components/Opening";
import Footer from "@/components/Footer";
import SectionHead from "@/components/SectionHead";
import JournalList from "@/components/JournalList";
import { CATEGORIES, getArticles } from "@/lib/content";
import styles from "./journal.module.css";

export const metadata: Metadata = {
  title: "Conseils d’architecte d’intérieur · Le journal",
  description:
    "Aménager, décorer, rénover : les conseils du Studio Lixivel pour des intérieurs pratiques et chaleureux, même avec un petit budget.",
};

export default function JournalPage() {
  const articles = getArticles();
  const une = articles.find((a) => a.une) ?? articles[0];
  const reste = articles
    .filter((a) => a.slug !== une?.slug)
    .map(({ slug, titre, categorie, duree, cover, coverAlt }) => ({ slug, titre, categorie, duree, cover, coverAlt }));
  const categories = CATEGORIES.filter((c) => articles.some((a) => a.categorie === c));

  return (
    <>
      <Opening tone="ardoise" source="header-journal" surtitre="Le journal" title="Conseils d’architecte d’intérieur">
        <p>
          Aménager, décorer, rénover : les astuces du studio pour des intérieurs pratiques et chaleureux, même avec un
          petit budget. Un nouvel article chaque mois.
        </p>
      </Opening>

      <main id="contenu">
        {une && (
          <section className={styles.une} aria-label="À la une">
            <Link href={`/journal/${une.slug}`} className={`media ${styles.uneMedia}`}>
              <Image src={une.cover} alt={une.coverAlt} fill priority sizes="(max-width: 760px) 100vw, 48vw" />
            </Link>
            <div className={styles.uneText}>
              <p className={styles.meta}>
                <span className="t-surtitre">À la une</span>
                <span className="t-surtitre c-accent">{une.categorie}</span>
                <span className="t-surtitre c-2">{une.duree}</span>
              </p>
              <h2 className="t-projet">
                <Link href={`/journal/${une.slug}`}>{une.titre}</Link>
              </h2>
              <p className="t-corps c-2">{une.chapo}</p>
              <Link href={`/journal/${une.slug}`} className="link link--accent">
                Lire l’article
              </Link>
            </div>
          </section>
        )}

        <section className={styles.tous} aria-labelledby="t-tous">
          <SectionHead id="t-tous" title="Tous les articles" plain>
            Des conseils concrets, issus des projets du studio et des questions que vous nous posez sur Instagram et
            TikTok.
          </SectionHead>
          <JournalList articles={reste} categories={categories} />
        </section>
      </main>
      <Footer source="footer-journal" />
    </>
  );
}
