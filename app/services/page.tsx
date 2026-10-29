import type { Metadata } from "next";
import Link from "next/link";
import Opening from "@/components/Opening";
import Footer from "@/components/Footer";
import SectionHead from "@/components/SectionHead";
import ComparatifLignes from "@/components/ComparatifLignes";
import Accordion from "@/components/Accordion";
import FormulesOnglets from "@/components/FormulesOnglets";
import Simulateur from "@/components/Simulateur";
import { COMPARATIF, FORMULES } from "@/data/services";
import { FAQ_SERVICES } from "@/data/faq";
import { rdvHref } from "@/lib/site";
import { JsonLd, faqJsonLd, servicesJsonLd } from "@/lib/seo";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Tarifs et formules d’architecte d’intérieur",
  description:
    "Quatre formules d’architecte d’intérieur, de la conception à l’accompagnement des travaux, à partir de 35 €/m². Délais, tarifs et simulateur de budget.",
};

export default function ServicesPage() {
  return (
    <>
      <Opening
        tone="sauge"
        source="header-services"
        title="Services d’architecte d’intérieur"
      >
        <p className="c-2">
          Des prestations d’architecture intérieure modulables, de la conception à l’accompagnement des travaux, avec une
          formule à distance à partir de 35 €/m².
        </p>
        <nav className={styles.ancres} aria-label="Formules">
          {FORMULES.map((f) => (
            <a key={f.slug} href={`#${f.slug}`} className="link">
              {f.court}
            </a>
          ))}
          <a href="#simulateur" className="link">
            Simulateur
          </a>
        </nav>
      </Opening>

      <main id="contenu">
        <section className={styles.formules} aria-label="Nos formules">
          <div className="wrap">
            <FormulesOnglets formules={FORMULES} />
          </div>
        </section>

        {/* Comparatif */}
        <section className={styles.comparatif} aria-labelledby="t-comparer">
          <SectionHead id="t-comparer" title="Comparer les formules" plain>
            Ce que comprend chaque formule, en un coup d’œil. Les tarifs correspondent à nos honoraires, hors mobilier
            et travaux.
          </SectionHead>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Prestation</span>
                </th>
                {FORMULES.map((f) => (
                  <th key={f.slug} scope="col" className="t-carte">
                    {f.court}
                  </th>
                ))}
              </tr>
            </thead>
            <ComparatifLignes lignes={COMPARATIF} formules={FORMULES} />
          </table>
        </section>

        {/* Simulateur */}
        <section id="simulateur" className={styles.simulateur} aria-labelledby="t-simulateur">
          <SectionHead id="t-simulateur" title="Simulateur de budget" plain>
            Choisissez une formule et la surface de votre projet : le simulateur estime nos honoraires pour votre projet, hors
            mobilier et travaux. Les tarifs indiqués ne s’appliquent pas aux studios.
          </SectionHead>
          <div className="wrap">
            <Simulateur />
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faq} aria-labelledby="t-faq">
          <SectionHead id="t-faq" title="Questions fréquentes" plain>
            <p>Les réponses aux questions qu’on nous pose le plus souvent.</p>
            <Link href="/faq" className="link" style={{ color: "var(--texte)" }}>
              Voir toute la FAQ
            </Link>
          </SectionHead>
          <Accordion items={FAQ_SERVICES} />
        </section>
      </main>
      <JsonLd data={[servicesJsonLd(), faqJsonLd(FAQ_SERVICES)]} />
      <Footer source="footer-services" />
    </>
  );
}
