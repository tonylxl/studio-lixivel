import type { Metadata } from "next";
import { titreSeo } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageTone from "@/components/PageTone";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHead from "@/components/SectionHead";
import AvantApres from "@/components/AvantApres";
import Reveal from "@/components/Reveal";
import ScrollZoom from "@/components/ScrollZoom";
import LineReveal from "@/components/LineReveal";
import { getProjet, getProjets } from "@/lib/content";
import styles from "./projet.module.css";

type Params = { slug: string };

export function generateStaticParams() {
  return getProjets().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjet(slug);
  if (!p) return {};
  return {
    title: titreSeo(`${p.titre} à ${p.ville}`),
    description: (
      p.brief ??
      `${p.titre} à ${p.ville} (${p.annee}) : un projet d’architecture intérieure en formule « ${p.sousTitre} » par Studio Lixivel. Le projet en images.`
    ).slice(0, 160),
    openGraph: { images: [p.cover] },
  };
}

export default async function ProjetPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProjet(slug);
  if (!p) notFound();

  const all = getProjets();
  const idx = all.findIndex((x) => x.slug === p.slug);
  const suivant = all.slice(idx + 1).concat(all.slice(0, idx)).find((x) => x.slug !== p.slug);

  const fiche = [
    ["Lieu", p.lieu],
    ["Surface", p.surface],
    ["Formule", p.formule],
    ["Durée", p.duree],
    ["Budget indicatif", p.budget],
    ["Année", String(p.annee)],
  ].filter(([, v]) => v) as [string, string][];

  const etapes = [
    ["Plan 2D", p.plan],
    ["Rendu 3D", p.rendu],
    ["Réalisé", p.realise],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <>
      <PageTone tone={p.couleur} />
      <Header variant={p.couleur === "ardoise" ? "dark" : "light"} source={`projet-${p.slug}`} />
      <main id="contenu">
        <section className={`tone-bg ${styles.top}`} data-dark={p.couleur === "ardoise" || undefined}>
          <Link href="/projets" className={`t-petit trait ${styles.back}`}>
            ← Tous les projets
          </Link>
          <div className="split">
            <h1 className="t-hero">
              {p.titre}
              <span className={styles.sub}>{p.sousTitre}</span>
            </h1>
            <dl className={`info-rows col-2--wide ${styles.fiche}`}>
              {fiche.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <ScrollZoom className={styles.cover}>
          <Image src={p.cover} alt={p.coverAlt} fill priority sizes="100vw" />
        </ScrollZoom>

        {p.brief && (
          <section className={`sur-blanc ${styles.block}`} aria-labelledby="t-brief">
            <SectionHead id="t-brief" title="Le brief" />
            <div className="split wrap">
              <span />
              <div className="col-2--wide stack" style={{ gap: 48 }}>
                <LineReveal className="t-intro" text={p.brief} />
                {p.contraintes.length > 0 && (
                  <div>
                    <p className="t-petit c-2">Les contraintes</p>
                    <ul className={styles.contraintes}>
                      {p.contraintes.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {p.avant && p.apres && (
          <section className={`${styles.block} ${styles.aaBlock}`} aria-labelledby="t-aa">
            <SectionHead id="t-aa" title="Avant / après" plain>
              Même pièce, même angle. Faites glisser pour comparer.
            </SectionHead>
            <div className={`wrap ${styles.aa}`}>
              <AvantApres avant={p.avant.image} apres={p.apres.image} className={styles.aaSlider} />
              <div className={styles.aaLegendes}>
                <div>
                  <p className="t-carte">Avant</p>
                  <p className="t-serre c-2">{p.avant.legende}</p>
                </div>
                <div>
                  <p className="t-carte">Après</p>
                  <p className="t-serre c-2">{p.apres.legende}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {etapes.length > 0 && (
          <section className={`sur-blanc ${styles.block}`} aria-labelledby="t-plan">
            <SectionHead id="t-plan" title="Du plan au réalisé">
              Ce que vous recevez avec la formule : le plan 2D, les rendus 3D en 4K, puis la pièce terminée.
            </SectionHead>
            <ol className={`wrap ${styles.etapes}`}>
              {etapes.map(([label, src], i) => (
                <Reveal as="li" key={label} delay={i * 0.1}>
                  <div className={`media ${styles.etapeImg}`} data-plan={label === "Plan 2D" || undefined}>
                    <Image src={src} alt={label} fill sizes="(max-width: 760px) 100vw, 33vw" />
                  </div>
                  <p className="t-petit">{label}</p>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {p.galerie.length > 0 && (
          <section className={`sur-blanc ${styles.block}`} aria-labelledby="t-images">
            <SectionHead id="t-images" title="En images" />
            <ul className={`wrap ${styles.galerie}`}>
              {p.galerie.map((src, i) => (
                <Reveal as="li" key={`${src}-${i}`} className={`media ${styles.galImg}`}>
                  <Image src={src} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {p.shopping.length > 0 && (
          <section className={`sur-blanc ${styles.block}`} aria-labelledby="t-shopping">
            <SectionHead id="t-shopping" title="La liste shopping">
              Les pièces choisies pour ce projet. Avec la formule décoration, vous recevez la liste complète avec les
              liens.
            </SectionHead>
            <div className="wrap">
              <table className={styles.shopping}>
                <thead>
                  <tr>
                    <th scope="col">Pièce</th>
                    <th scope="col">Où la trouver</th>
                    <th scope="col">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {p.shopping.map((s) => (
                    <tr key={s.piece}>
                      <td className="t-carte">{s.piece}</td>
                      <td>{s.ou}</td>
                      <td>{s.prix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {p.avis && (
          <section className={`sur-blanc ${styles.block}`} aria-labelledby="t-avis">
            <SectionHead id="t-avis" title={`L’avis de ${p.avis.nom}`} />
            <figure className={`wrap ${styles.avis}`}>
              <blockquote className={styles.avisTexte}>« {p.avis.texte} »</blockquote>
              <figcaption className={styles.avisAuteur}>
                <span className={styles.avatar} aria-hidden />
                <span>
                  <span className="t-carte">{p.avis.nom}</span>
                  <br />
                  <span className="t-petit c-2">{p.avis.contexte}</span>
                </span>
              </figcaption>
            </figure>
          </section>
        )}

        {suivant && (
          <Link href={`/projets/${suivant.slug}`} className={`sur-blanc ${styles.next}`}>
            <span className="t-petit c-2">Projet suivant</span>
            <span className={styles.nextTitle}>
              <span className={`media ${styles.nextThumb}`} aria-hidden>
                <Image src={suivant.cover} alt="" fill sizes="120px" />
              </span>
              <span>
                <span className={styles.nextNom}>{suivant.titre}</span>
                <span className={`${styles.nextNom} c-2`}>{suivant.sousTitre}</span>
              </span>
            </span>
            <span className={styles.nextArrow} aria-hidden>
              →
            </span>
          </Link>
        )}
      </main>
      <Footer source={`footer-projet-${p.slug}`} />
    </>
  );
}
