import Image from "next/image";
import Link from "next/link";
import { NAV, SITE, rdvHref } from "@/lib/site";
import styles from "./Footer.module.css";

type Props = {
  /** Affiche le bandeau rose « Un projet en tête ? » au-dessus du footer. */
  band?: boolean;
  source?: string;
};

export default function Footer({ band = true, source = "footer" }: Props) {
  return (
    <footer className={styles.footer}>
      {band && (
        <section className={styles.band} aria-labelledby="rdv-titre">
          <Image
            src="/images/fauteuil-lin.png"
            alt=""
            width={1061}
            height={1213}
            className={styles.bandArt}
            aria-hidden
          />
          <div className={`split ${styles.bandInner}`}>
            <h2 id="rdv-titre" className="t-hero">
              Un projet en tête ?<br />
              Prenons rendez-vous.
            </h2>
            <div className={`col-2 ${styles.bandText}`}>
              <p className="t-serre c-2">
                Répondez au questionnaire en 10 minutes : vos envies, vos contraintes, votre budget. Nous vous
                recontactons sous 48 h pour en parler.
              </p>
              <Link href={rdvHref(source)} className="btn">
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className={styles.infos}>
        <div className={styles.left}>
          <p className="t-surtitre">Studio Lixivel. Rouen</p>
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

        <div className={styles.symbol} aria-hidden>
          <Image src="/images/tabouret.png" alt="" width={1098} height={1100} className={styles.stool} />
        </div>

        <div className={styles.bottom}>
          <address className={styles.address}>
            <span>{SITE.ville}</span>
            <span>{SITE.zone}</span>
            <a href={`mailto:${SITE.email}`} className={styles.mail}>
              {SITE.email}
            </a>
          </address>
          <ul className={styles.legal}>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </li>
            <li>
              <Link href="/mentions-legales">Mentions légales</Link>
            </li>
            <li className="c-2">© Studio Lixivel {new Date().getFullYear()}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
