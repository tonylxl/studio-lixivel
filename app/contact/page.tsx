import type { Metadata } from "next";
import PageTone from "@/components/PageTone";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TallyEmbed from "@/components/TallyEmbed";
import { ETAPES } from "@/data/services";
import { SITE } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description:
    "Répondez au questionnaire en 10 minutes : vos envies, vos contraintes, votre budget. Le studio vous recontacte sous 48 h, sans engagement.",
};

export default function ContactPage() {
  return (
    <>
      <PageTone tone="moutarde" />
      <Header source="header-contact" />
      <main id="contenu" className={styles.page}>
        <div className={styles.left}>
          <h1 className="t-hero">
            Prenons
            <br />
            rendez-vous.
          </h1>
          <p className="t-intro">
            Répondez au questionnaire en 10 minutes : vos envies, vos contraintes, votre budget. Nous vous recontactons
            ensuite pour en parler, sans engagement.
          </p>

          <section aria-labelledby="t-etapes" className={styles.etapes}>
            <h2 id="t-etapes" className="t-carte">
              Comment ça se passe
            </h2>
            <ol className={styles.cards}>
              {ETAPES.slice(0, 3).map((e, i) => (
                <li key={e.titre} className={styles.card} data-couleur={e.couleur} style={{ rotate: `${[-3, 2, -1.5][i]}deg` }}>
                  <span className={styles.num}>0{i + 1}</span>
                  <p className="t-carte">{e.titre}</p>
                  <p className="t-petit">{e.texte}</p>
                </li>
              ))}
            </ol>
          </section>

          <dl className={`info-rows ${styles.infos}`}>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${SITE.email}`} className="link">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt>Studio</dt>
              <dd>{SITE.ville}</dd>
            </div>
            <div>
              <dt>Zone</dt>
              <dd>Partout en France à distance, Normandie sur place</dd>
            </div>
            <div>
              <dt>Réseaux</dt>
              <dd>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link">
                  Instagram
                </a>{" "}
                ·{" "}
                <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" className="link">
                  TikTok
                </a>{" "}
                {SITE.handle}
              </dd>
            </div>
          </dl>
        </div>

        <div className={styles.right}>
          <TallyEmbed />
        </div>
      </main>
      <Footer band={false} />
    </>
  );
}
