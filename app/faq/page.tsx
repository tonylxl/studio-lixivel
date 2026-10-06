import type { Metadata } from "next";
import Opening from "@/components/Opening";
import Footer from "@/components/Footer";
import Accordion from "@/components/Accordion";
import { FAQ } from "@/data/faq";
import { SITE } from "@/lib/site";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "Questions à votre architecte d’intérieur",
  description:
    "Formules, projets à distance, tarifs, travaux : les réponses aux questions qu’on pose le plus souvent au Studio Lixivel.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.flatMap((c) =>
      c.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.r },
      })),
    ),
  };

  return (
    <>
      <Opening
        tone="lin"
        source="header-faq"
        title={
          <>
            Questions à votre
            <br />
            architecte d’intérieur
          </>
        }
      >
        <p>
          Vous ne trouvez pas votre réponse ? Écrivez-nous à{" "}
          <a href={`mailto:${SITE.email}`} className="link">
            {SITE.email}
          </a>{" "}
          ou prenez rendez-vous.
        </p>
        <nav className={styles.ancres} aria-label="Catégories">
          {FAQ.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="pill">
              {c.titre}
            </a>
          ))}
        </nav>
      </Opening>

      <main id="contenu" className={styles.main}>
        {FAQ.map((c, i) => (
          <section key={c.id} id={c.id} className={`split ${styles.cat}`} aria-labelledby={`t-${c.id}`}>
            <h2 id={`t-${c.id}`} className="t-section">
              {c.titre}
            </h2>
            <div className="col-2--wide">
              <Accordion items={c.items} defaultOpen={i === 0 ? 0 : -1} />
            </div>
          </section>
        ))}
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Footer source="footer-faq" />
    </>
  );
}
