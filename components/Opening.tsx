import type { ReactNode } from "react";
import PageTone from "./PageTone";
import Header from "./Header";
import type { Tone } from "@/lib/site";
import styles from "./Opening.module.css";

type Props = {
  tone: Tone;
  title: ReactNode;
  surtitre?: string;
  children?: ReactNode;
  /** Contenu pleine largeur sous le titre (filtres, image…) */
  below?: ReactNode;
  source?: string;
  className?: string;
};

/** Ouverture de page : couleur de fond (qui passe au blanc au scroll), header, H1 à gauche, texte à droite. */
export default function Opening({ tone, title, surtitre, children, below, source, className }: Props) {
  const dark = tone === "ardoise";
  return (
    <>
      <PageTone tone={tone} />
      <Header variant={dark ? "dark" : "light"} source={source} />
      <section className={`${styles.opening} ${className ?? ""}`} data-dark={dark || undefined}>
        <div className="split">
          <div className={styles.titleCol}>
            {surtitre && <p className="t-surtitre">{surtitre}</p>}
            <h1 className="t-hero">{title}</h1>
          </div>
          {children && <div className={`col-2 ${styles.side}`}>{children}</div>}
        </div>
        {below}
      </section>
    </>
  );
}
