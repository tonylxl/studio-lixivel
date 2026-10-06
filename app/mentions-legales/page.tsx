import type { Metadata } from "next";
import Opening from "@/components/Opening";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";
import styles from "./mentions.module.css";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

const BLOCS = [
  {
    titre: "Éditeur du site",
    texte: `Studio Lixivel, entreprise individuelle de Cindy [Nom], architecte d’intérieur. Siège : [adresse], Rouen (76). SIRET : [à compléter]. Contact : ${SITE.email}. Directrice de la publication : Cindy [Nom].`,
  },
  {
    titre: "Hébergement",
    texte: "Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.",
  },
  {
    titre: "Propriété intellectuelle",
    texte:
      "Les textes, photographies, plans et illustrations de ce site sont la propriété du Studio Lixivel, sauf mention contraire. Toute reproduction, même partielle, nécessite notre accord écrit.",
  },
  {
    titre: "Données personnelles",
    texte: `Les informations transmises via le questionnaire de contact servent uniquement à répondre à votre demande et à préparer votre projet. Elles ne sont ni vendues ni cédées. Conformément au RGPD, vous pouvez y accéder, les corriger ou demander leur suppression en écrivant à ${SITE.email}.`,
  },
  {
    titre: "Cookies",
    texte:
      "Ce site utilise uniquement des cookies nécessaires à son fonctionnement et une mesure d’audience anonyme. Aucun cookie publicitaire n’est déposé.",
  },
  {
    titre: "Liens affiliés",
    texte:
      "Certains articles du journal contiennent des liens affiliés. Ils ne changent rien au prix pour vous ; le studio peut percevoir une petite commission qui soutient le journal.",
  },
];

export default function MentionsPage() {
  return (
    <>
      <Opening tone="doux" title="Mentions légales" surtitre="Informations légales" />
      <main id="contenu" className={styles.main}>
        {BLOCS.map((b) => (
          <section key={b.titre} className={`split ${styles.bloc}`}>
            <h2 className="t-accordeon">{b.titre}</h2>
            <p className="col-2--wide t-article">{b.texte}</p>
          </section>
        ))}
      </main>
      <Footer band={false} />
    </>
  );
}
