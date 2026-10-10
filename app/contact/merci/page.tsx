import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalInline from "@/components/CalInline";
import { SITE } from "@/lib/site";
import styles from "../contact.module.css";

export const metadata: Metadata = {
  title: "Merci, c’est bien reçu",
  description: "Votre demande est bien arrivée au studio : nous revenons vers vous sous 48 h avec une première fourchette de prix.",
  robots: { index: false, follow: false },
};

/** Page affichée après l'envoi du questionnaire (TallyEmbed y redirige), avec la réservation de l'appel de lancement. */
export default function MerciPage() {
  return (
    <>
      <Header source="header-merci" />
      <main id="contenu" className={styles.page}>
        <div className={styles.left}>
          <h1 className="t-hero">
            Merci, c’est
            <br />
            bien reçu.
          </h1>
          <p className={`t-serre c-2 ${styles.intro}`}>
            Nous revenons vers vous sous 48 h avec une première fourchette de prix, puis le tarif exact par email.
            {SITE.cal && " Pour gagner du temps, vous pouvez déjà réserver votre appel de lancement (20 minutes, en visio)."}
          </p>
          <dl className={`info-rows ${styles.infos}`}>
            <div>
              <dt>En attendant</dt>
              <dd>
                <Link href="/projets" className="link">
                  Nos projets
                </Link>{" "}
                ·{" "}
                <Link href="/blog" className="link">
                  Le blog
                </Link>{" "}
                ·{" "}
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link">
                  Instagram
                </a>
              </dd>
            </div>
            <div>
              <dt>Une question ?</dt>
              <dd>
                <a href={`mailto:${SITE.email}`} className="link">
                  {SITE.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className={styles.right}>
          <CalInline />
        </div>
      </main>
      <Footer band={false} />
    </>
  );
}
