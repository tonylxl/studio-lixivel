import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Opening from "@/components/Opening";
import Footer from "@/components/Footer";
import SectionHead from "@/components/SectionHead";
import Accordion from "@/components/Accordion";
import Simulateur from "@/components/Simulateur";
import Reveal from "@/components/Reveal";
import { COMPARATIF, FORMULES } from "@/data/services";
import { FAQ_SERVICES } from "@/data/faq";
import { rdvHref } from "@/lib/site";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services d’architecte d’intérieur",
  description:
    "Quatre formules, du simple conseil à la prise en charge complète, dont trois entièrement à distance partout en France. Tarifs, délais et simulateur de budget.",
};

export default function ServicesPage() {
  return (
    <>
      <Opening
        tone="sauge"
        source="header-services"
        title="Services d’architecte d’intérieur"
        below={
          <nav className={styles.ancres} aria-label="Formules">
            {FORMULES.map((f) => (
              <a key={f.slug} href={`#${f.slug}`} className="pill">
                {f.court}
              </a>
            ))}
            <a href="#simulateur" className="pill">
              Simulateur
            </a>
          </nav>
        }
      >
        <p>
          Quatre formules, du simple conseil à la prise en charge complète. Trois d’entre elles se font entièrement à
          distance, partout en France.
        </p>
      </Opening>

      <main id="contenu">
        {FORMULES.map((f, i) => (
          <section key={f.slug} id={f.slug} className={styles.formule} aria-labelledby={`t-${f.slug}`}>
            <Reveal className={`media ${styles.formuleMedia}`}>
              {f.illustration ? (
                <div className={styles.illuWrap}>
                  <Image src={f.image} alt="" width={260} height={325} />
                </div>
              ) : (
                <Image src={f.image} alt="" fill sizes="(max-width: 760px) 100vw, 48vw" priority={i === 0} />
              )}
            </Reveal>
            <div className={styles.formuleText}>
              <p className="t-surtitre c-accent">{f.surtitre}</p>
              <h2 id={`t-${f.slug}`} className="t-section">
                {f.titre}
              </h2>
              <p className="t-intro c-2">{f.description}</p>
              <div>
                <p className="t-carte">Ce qui est inclus</p>
                <ul className="plus-list">
                  {f.inclus.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <dl className={styles.meta}>
                <div>
                  <dt className="t-petit c-2">Délai</dt>
                  <dd className="t-carte">{f.delai}</dd>
                </div>
                <div>
                  <dt className="t-petit c-2">Tarif</dt>
                  <dd className="t-carte">{f.tarif}</dd>
                </div>
              </dl>
              <Link href={rdvHref(`services-${f.slug}`, { formule: f.slug })} className="btn">
                Prendre rendez-vous
              </Link>
            </div>
          </section>
        ))}

        {/* Comparatif */}
        <section className={styles.comparatif} aria-labelledby="t-comparer">
          <SectionHead id="t-comparer" title="Comparer les formules" />
          <div className={`wrap ${styles.tableWrap}`}>
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
              <tbody>
                {COMPARATIF.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.valeurs.map((v, i) => (
                      <td key={i} data-vide={v === "—" || undefined}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Simulateur */}
        <section id="simulateur" className={styles.simulateur} aria-labelledby="t-simulateur">
          <SectionHead id="t-simulateur" title="Simulateur de budget">
            Choisissez une formule et la surface de votre projet : le simulateur estime les honoraires du studio, hors
            mobilier et travaux.
          </SectionHead>
          <div className="wrap">
            <Simulateur />
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.faq} aria-labelledby="t-faq">
          <SectionHead id="t-faq" title="Questions fréquentes">
            <p>Les réponses aux questions qu’on nous pose le plus souvent.</p>
            <Link href="/faq" className="link" style={{ color: "var(--texte)" }}>
              Voir toute la FAQ
            </Link>
          </SectionHead>
          <div className="split wrap">
            <span />
            <div className="col-2--wide">
              <Accordion items={FAQ_SERVICES} defaultOpen={0} />
            </div>
          </div>
        </section>
      </main>
      <Footer source="footer-services" />
    </>
  );
}
