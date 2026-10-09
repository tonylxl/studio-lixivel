import type { Metadata } from "next";
import Link from "next/link";
import Opening from "@/components/Opening";
import Footer from "@/components/Footer";
import SectionHead from "@/components/SectionHead";
import Accordion from "@/components/Accordion";
import { FAQ } from "@/data/faq";
import { FORMULES } from "@/data/services";
import { getVilles } from "@/lib/content";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { rdvHref } from "@/lib/site";
import styles from "./villes.module.css";

export const metadata: Metadata = {
  title: "Architecte d’intérieur partout en France",
  description:
    "Studio Lixivel accompagne vos projets d’aménagement et de décoration à distance dans toute la France, et sur place pour les rénovations. Paris, Lyon, Bordeaux, Nantes, Lille…",
  alternates: { canonical: "/architecte-interieur" },
};

export default function ZonesPage() {
  const villes = getVilles();
  const distance = FAQ.find((c) => c.id === "distance")?.items ?? [];

  return (
    <>
      <Opening
        tone="doux"
        source="header-zones"
        title={
          <>
            Architecte d’intérieur
            <br />
            partout en France
          </>
        }
      >
        <p className="c-2">
          Le studio est basé à Rouen et accompagne des projets dans toute la France : à distance pour l’agencement et la
          décoration, sur place quand il y a des travaux.
        </p>
        <Link href={rdvHref("zones")} className="btn">
          Prendre rendez-vous
        </Link>
      </Opening>

      <main id="contenu" className="sur-blanc">
        <section className={styles.block} aria-labelledby="t-villes">
          <SectionHead id="t-villes" title="Villes où le studio intervient">
            <p>Votre ville n’est pas dans la liste ? Les formules à distance fonctionnent partout en France.</p>
          </SectionHead>
          <ul className={styles.lignes}>
            {villes.map((v) => (
              <li key={v.slug}>
                <Link href={`/architecte-interieur/${v.slug}`} className={`split ${styles.ligne}`}>
                  <span className="t-projet">{v.nom}</span>
                  <span className={`col-2--wide t-petit c-2 ${styles.ligneInfo}`}>
                    <span>{v.region}</span>
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.block} aria-labelledby="t-comment">
          <SectionHead id="t-comment" title="À distance ou sur place">
            <p>
              Trois formules sur quatre se font entièrement à distance, par mail et en visio. Pour la prise en charge
              complète, le studio se déplace pour suivre le chantier.
            </p>
          </SectionHead>
          <ul className={`wrap ${styles.formules}`}>
            {FORMULES.map((f) => (
              <li key={f.slug} className={styles.formule}>
                <p className="t-surtitre c-accent">{f.surtitre}</p>
                <h3 className="t-carte">
                  <Link href={`/services#${f.slug}`}>{f.titre}</Link>
                </h3>
                <p className="t-petit c-2">{f.tarif}</p>
              </li>
            ))}
          </ul>
        </section>

        {distance.length > 0 && (
          <section className={styles.block} aria-labelledby="t-faq">
            <SectionHead id="t-faq" title="Un projet à distance, comment ça marche ?" />
            <Accordion items={distance} />
          </section>
        )}
      </main>

      <JsonLd
        data={[
          breadcrumbJsonLd([
            ["Accueil", "/"],
            ["Zones d’intervention", "/architecte-interieur"],
          ]),
          ...(distance.length > 0 ? [faqJsonLd(distance)] : []),
        ]}
      />
      <Footer source="footer-zones" />
    </>
  );
}
