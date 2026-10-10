import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Opening from "@/components/Opening";
import Footer from "@/components/Footer";
import SectionHead from "@/components/SectionHead";
import Accordion from "@/components/Accordion";
import Reveal from "@/components/Reveal";
import { FORMULES } from "@/data/services";
import { getProjets, getVille, getVilles, renderMarkdown } from "@/lib/content";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { rdvHref, titreSeo } from "@/lib/site";
import styles from "../villes.module.css";

type Params = { ville: string };

export function generateStaticParams() {
  return getVilles().map((v) => ({ ville: v.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { ville } = await params;
  const v = getVille(ville);
  if (!v) return {};
  return {
    title: titreSeo(v.seoTitle ?? `Architecte d’intérieur à ${v.nom}`),
    description: (
      v.seoDescription ??
      `Architecte d’intérieur à ${v.nom} : agencement, décoration et rénovation, à distance ou sur place. Plans 2D, rendus 3D, liste shopping. Dès 35 €/m².`
    ).slice(0, 160),
    alternates: { canonical: `/architecte-interieur/${v.slug}` },
  };
}

export default async function VillePage({ params }: { params: Promise<Params> }) {
  const { ville } = await params;
  const v = getVille(ville);
  if (!v) notFound();

  const projets = getProjets()
    .sort((a, b) => b.annee - a.annee || a.ordre - b.ordre)
    .slice(0, 6);
  const { html } = renderMarkdown(v.content);
  const autres = getVilles().filter((x) => x.slug !== v.slug);
  const source = `ville-${v.slug}`;

  return (
    <>
      <Opening
        tone={v.couleur}
        source={`header-${source}`}
        surtitre={v.region || undefined}
        title={
          <>
            Architecte d’intérieur
            <br />à {v.nom}
          </>
        }
      >
        <p className="c-2">{v.intro}</p>
        <Link href={rdvHref(source, { ville: v.nom })} className="btn">
          Prendre rendez-vous
        </Link>
      </Opening>

      <main id="contenu" className="sur-blanc">
        <section className={styles.block} aria-labelledby="t-intervention">
          <SectionHead id="t-intervention" title={`Comment le studio intervient à ${v.nom}`}>
            {v.deplacement && <p>{v.deplacement}</p>}
            <Link href="/services" className="link" style={{ color: "var(--texte)" }}>
              Détail des formules
            </Link>
          </SectionHead>
          <ul className={`wrap ${styles.formules}`}>
            {FORMULES.map((f, i) => (
              <Reveal as="li" key={f.slug} delay={i * 0.06} className={styles.formule}>
                <p className="t-surtitre c-accent">{f.surtitre}</p>
                <h3 className="t-carte">
                  <Link href={`/services#${f.slug}`}>{f.titre}</Link>
                </h3>
                <p className="t-petit c-2">{f.resume}</p>
                <dl className={styles.meta}>
                  <div>
                    <dt className="t-petit c-2">Tarif</dt>
                    <dd>{f.tarif}</dd>
                  </div>
                  <div>
                    <dt className="t-petit c-2">Délai</dt>
                    <dd>{f.delai}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className={styles.block} aria-labelledby="t-projets">
          <SectionHead id="t-projets" title="Derniers projets du studio">
            <Link href="/projets" className="link" style={{ color: "var(--texte)" }}>
              Tous les projets
            </Link>
          </SectionHead>
          <ul className={`wrap ${styles.projets}`}>
            {projets.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.08}>
                <Link href={`/projets/${p.slug}`} className={styles.projet}>
                  <div className={`media media--l ${styles.projetImg}`}>
                    <Image src={p.cover} alt={p.coverAlt} fill sizes="(max-width: 760px) 100vw, 33vw" />
                  </div>
                  <p className="t-carte">{p.titre}</p>
                  <p className="t-petit c-2">
                    {p.sousTitre} · {p.ville}, {p.annee}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>

        {(html.trim() || v.quartiers.length > 0) && (
          <section className={styles.block} aria-labelledby="t-local">
            <SectionHead id="t-local" title={`Votre intérieur à ${v.nom}`} />
            <div className="split wrap">
              <div className={styles.aside}>
                {v.quartiers.length > 0 && (
                  <>
                    <p className="t-petit c-2">Quartiers et communes</p>
                    <ul className={styles.quartiers}>
                      {v.quartiers.map((q) => (
                        <li key={q}>{q}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div className={`col-2--wide ${styles.prose}`} dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </section>
        )}

        {v.faq.length > 0 && (
          <section className={styles.block} aria-labelledby="t-faq">
            <SectionHead id="t-faq" title={`Questions fréquentes à ${v.nom}`}>
              <Link href="/faq" className="link" style={{ color: "var(--texte)" }}>
                Voir toute la FAQ
              </Link>
            </SectionHead>
            <Accordion items={v.faq} />
          </section>
        )}

        {autres.length > 0 && (
          <nav className={styles.block} aria-labelledby="t-autres">
            <SectionHead id="t-autres" title="Le studio intervient aussi à">
              <Link href="/architecte-interieur" className="link" style={{ color: "var(--texte)" }}>
                Toutes les zones d’intervention
              </Link>
            </SectionHead>
            <ul className={`wrap ${styles.villes}`}>
              {autres.map((x) => (
                <li key={x.slug}>
                  <Link href={`/architecte-interieur/${x.slug}`} className={styles.ville}>
                    {x.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </main>

      <JsonLd
        data={[
          serviceJsonLd(v),
          breadcrumbJsonLd([
            ["Accueil", "/"],
            ["Zones d’intervention", "/architecte-interieur"],
            [v.nom, `/architecte-interieur/${v.slug}`],
          ]),
          ...(v.faq.length > 0 ? [faqJsonLd(v.faq)] : []),
        ]}
      />
      <Footer
        source={`footer-${source}`}
        bandText={`Que vous soyez à ${v.nom} ou ailleurs, répondez au questionnaire en 5 minutes : vos envies, vos contraintes, votre budget. Nous vous recontactons sous 48 h.`}
      />
    </>
  );
}
