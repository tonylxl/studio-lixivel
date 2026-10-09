import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageTone from "@/components/PageTone";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleAside from "@/components/ArticleAside";
import ArticleCard from "@/components/ArticleCard";
import SectionHead from "@/components/SectionHead";
import { formatDate, getArticle, getArticles, renderMarkdown } from "@/lib/content";
import { SITE, rdvHref } from "@/lib/site";
import styles from "./article.module.css";

type Params = { slug: string };

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: { absolute: `${a.seoTitle ?? a.titre} · Conseils d’architecte d’intérieur · Studio Lixivel` },
    description: a.seoDescription ?? a.chapo.slice(0, 155),
    openGraph: { type: "article", images: [a.cover], publishedTime: a.date },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const { html, toc } = renderMarkdown(a.content);
  const [avant, apres] = html.split(/<p>\s*\[\[produits\]\]\s*<\/p>/);

  const autres = getArticles().filter((x) => x.slug !== a.slug);
  const lire = [...autres.filter((x) => x.categorie === a.categorie), ...autres.filter((x) => x.categorie !== a.categorie)].slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.titre,
      description: a.chapo,
      image: `${SITE.url}${a.cover}`,
      datePublished: a.date,
      author: { "@type": "Person", name: "Cindy", jobTitle: "Architecte d’intérieur" },
      publisher: { "@type": "Organization", name: SITE.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Journal", item: `${SITE.url}/journal` },
        { "@type": "ListItem", position: 2, name: a.titre, item: `${SITE.url}/journal/${a.slug}` },
      ],
    },
  ];

  const produits =
    a.produits.length > 0 ? (
      <div className={styles.produits}>
        <ul>
          {a.produits.map((p) => {
            const inner = (
              <>
                <span className={`media media--m ${styles.produitImg}`}>
                  {p.image && <Image src={p.image} alt="" fill sizes="220px" />}
                </span>
                <span className="t-serre">{p.titre}</span>
                <span className={styles.prix}>
                  <span className="t-petit c-2">{p.prix}</span>
                  {p.lien && <span className="link link--accent t-petit">Voir</span>}
                </span>
              </>
            );
            return (
              <li key={p.titre}>
                {p.lien ? (
                  <a href={p.lien} target="_blank" rel="sponsored noopener noreferrer" className={styles.produit}>
                    {inner}
                  </a>
                ) : (
                  <div className={styles.produit}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="t-petit c-2">Liens affiliés : ils ne changent rien au prix pour vous et soutiennent le journal.</p>
      </div>
    ) : null;

  return (
    <>
      <PageTone tone="ardoise" />
      <Header variant="dark" source={`journal-${a.slug}`} />
      <main id="contenu">
        <header className={`tone-bg ${styles.hero}`} data-dark>
          <nav className={`t-surtitre ${styles.ariane}`} aria-label="Fil d’Ariane">
            <Link href="/journal">Journal</Link>
            <span aria-hidden>/</span>
            <span>{a.categorie}</span>
          </nav>
          <h1 className="t-hero">{a.titre}</h1>
          <div className={styles.auteur}>
            <span className={styles.avatar}>
              <Image src="/images/portrait.jpg" alt="" fill sizes="44px" />
            </span>
            <span className="t-petit">
              Par Cindy, architecte d’intérieur · {formatDate(a.date)} · {a.duree} de lecture
            </span>
          </div>
        </header>

        <div className={`wrap ${styles.coverWrap}`}>
          <span className={`tone-bg ${styles.coverFond}`} aria-hidden />
          <div className={`media ${styles.cover}`}>
            <Image src={a.cover} alt={a.coverAlt} fill priority sizes="100vw" />
          </div>
        </div>

        <div className={`sur-blanc ${styles.body}`}>
          <div className={styles.asideCol}>
            <ArticleAside toc={toc} titre={a.titre} reel={a.reel} />
          </div>
          <article className={styles.content}>
            {a.chapo && <p className={`t-intro ${styles.chapo}`}>{a.chapo}</p>}
            <div className={styles.prose} dangerouslySetInnerHTML={{ __html: avant }} />
            {apres !== undefined && (
              <>
                {produits}
                <div className={styles.prose} dangerouslySetInnerHTML={{ __html: apres }} />
              </>
            )}
            {apres === undefined && produits}
            {a.etiquettes.length > 0 && (
              <ul className={styles.tags}>
                {a.etiquettes.map((t) => (
                  <li key={t} className="pill">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </div>

        <section className={`sur-blanc ${styles.cta}`} aria-labelledby="t-cta">
          <div className={styles.ctaCard}>
            <h2 id="t-cta" className="t-section">
              Un plan sur mesure
              <br />
              pour votre intérieur ?
            </h2>
            <div className={styles.ctaText}>
              <p className="t-serre">
                Un article donne des pistes, un plan règle tout. Le studio conçoit le vôtre à distance, dès 35 €/m², plans
                et liste shopping compris.
              </p>
              <div className={styles.ctaActions}>
                <Link href={rdvHref("journal", { article: a.slug })} className="btn btn--rose">
                  Débuter votre projet
                </Link>
                <Link href="/services#simulateur" className="link">
                  Estimer mon budget
                </Link>
              </div>
            </div>
          </div>
        </section>

        {lire.length > 0 && (
          <section className={`sur-blanc ${styles.lire}`} aria-labelledby="t-lire">
            <SectionHead id="t-lire" title="À lire aussi">
              D’autres idées pour {a.categorie.toLowerCase() === "petits espaces" ? "les petits espaces" : "votre intérieur"}.
            </SectionHead>
            <ul className={styles.lireGrid}>
              {lire.map((x) => (
                <li key={x.slug}>
                  <ArticleCard a={x} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Footer band={false} />
    </>
  );
}
