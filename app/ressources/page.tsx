import type { Metadata } from "next";
import Opening from "@/components/Opening";
import Footer from "@/components/Footer";
import Image from "next/image";
import RessourceForm from "@/components/RessourceForm";
import { getRessources } from "@/lib/content";
import { SITE } from "@/lib/site";
import styles from "./ressources.module.css";

export const metadata: Metadata = {
  title: "Guides gratuits d’architecte d’intérieur",
  description:
    "Les guides du Studio Lixivel à télécharger gratuitement : bien mesurer sa pièce, les cotes à connaître, choisir ses couleurs, préparer sa rénovation.",
  alternates: { canonical: "/ressources" },
};

export default function RessourcesPage() {
  const ressources = getRessources();

  return (
    <>
      <Opening tone="moutarde" source="header-ressources" surtitre="Ressources" title="Les guides du studio">
        <p>
          Les méthodes que le studio utilise sur chaque projet, en quelques pages à garder sous la main. Gratuits, à
          télécharger{SITE.brevo ? " en laissant votre email" : ""}.
        </p>
      </Opening>

      <main id="contenu" className="sur-blanc">
        <ul className={`wrap ${styles.grille}`}>
          {ressources.map((r) => (
            <li key={r.slug} id={r.slug} className={styles.carte} data-couleur={r.couleur} data-bientot={!r.disponible || undefined}>
              <div className={styles.haut}>
                <p className="t-surtitre">{r.disponible ? r.format : "Bientôt disponible"}</p>
                <h2 className={styles.titre}>{r.titre}</h2>
                <p className={styles.description}>{r.description}</p>
              </div>
              {r.disponible && r.fichier && <RessourceForm fichier={r.fichier} titre={r.titre} />}
              {r.apercu && (
                <Image src={r.apercu} alt={`Couverture du guide « ${r.titre} »`} width={300} height={424} className={styles.apercu} />
              )}
            </li>
          ))}
        </ul>
      </main>
      <Footer source="footer-ressources" />
    </>
  );
}
