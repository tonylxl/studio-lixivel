import Image from "next/image";
import Link from "next/link";
import styles from "./ArticleCard.module.css";

export type ArticleCardData = {
  slug: string;
  titre: string;
  categorie: string;
  duree: string;
  cover: string;
  coverAlt: string;
};

export default function ArticleCard({ a }: { a: ArticleCardData }) {
  return (
    <Link href={`/journal/${a.slug}`} className={styles.card}>
      <div className={`media ${styles.media}`}>
        <Image src={a.cover} alt={a.coverAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      </div>
      <p className={styles.meta}>
        <span className="t-surtitre c-accent">{a.categorie}</span>
        <span className="t-surtitre c-2">{a.duree}</span>
      </p>
      <h3 className="t-accordeon">
        <span className="trait">{a.titre}</span>
      </h3>
    </Link>
  );
}
