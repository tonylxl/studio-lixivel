import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { NAV, SITE, rdvHref } from "@/lib/site";
import MaskReveal from "./MaskReveal";
import FooterStool from "./FooterStool";
import styles from "./Footer.module.css";

type Props = {
  /** Affiche le bandeau rose « Un projet en tête ? » au-dessus du footer. */
  band?: boolean;
  source?: string;
  /** Titre du bandeau, une ligne par élément. */
  bandTitle?: ReactNode[];
  bandText?: string;
};

const TITRE_DEFAUT: ReactNode[] = [
  "Un projet en tête ?",
  <Fragment key="l2">
    Prenons <span className={styles.nowrap}>rendez-vous.</span>
  </Fragment>,
];

export default function Footer({
  band = true,
  source = "footer",
  bandTitle = TITRE_DEFAUT,
  bandText = "Répondez au questionnaire en 5 minutes : vos envies, vos contraintes, votre budget. Nous vous recontactons sous 48 h pour en parler.",
}: Props) {
  return (
    <footer className={styles.footer} data-footer>
      {band && (
        <section className={styles.band} aria-labelledby="rdv-titre">
          <div className="split">
            <MaskReveal as="h2" id="rdv-titre" className="t-hero" lines={bandTitle} />
            <div className={`col-2 ${styles.bandText}`}>
              <p className="t-serre">{bandText}</p>
              <Link href={rdvHref(source)} className="btn">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className={styles.infos}>
        <div className={styles.left}>
          <div>
            <p className="t-carte">Studio Lixivel. Rouen</p>
            <nav aria-label="Navigation du pied de page">
              <ul className={styles.nav}>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <address className={styles.address}>
            <span>{SITE.ville}</span>
            <span>{SITE.zone}</span>
            <a href={`mailto:${SITE.email}`} className={`${styles.lien} ${styles.mail}`}>
              {SITE.email}
            </a>
          </address>
        </div>

        <div className={styles.symbol} aria-hidden>
          <FooterStool className={styles.stool} />
        </div>

        <ul className={styles.legal}>
          <li>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={styles.lien}>
              Instagram
            </a>
          </li>
          <li>
            <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" className={styles.lien}>
              TikTok
            </a>
          </li>
          <li>
            <Link href="/architecte-interieur" className={styles.lien}>
              Zones d’intervention
            </Link>
          </li>
          <li>
            <Link href="/mentions-legales" className={styles.lien}>
              Mentions légales
            </Link>
          </li>
          <li>© Studio Lixivel {new Date().getFullYear()}</li>
        </ul>
      </div>
    </footer>
  );
}
