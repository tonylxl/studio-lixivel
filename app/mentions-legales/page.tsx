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
    texte: `Studio Lixivel, entreprise individuelle de Cindy LIXIVEL, architecte d’intérieur. Siège : 9 rue du Renard, Rouen (76). SIRET : 91233045300024. Contact : ${SITE.email}. Directrice de la publication : Cindy LIXIVEL.`,
  },
  {
    titre: "Médiation de la consommation",
    texte:
      "Conformément aux articles L.612-1 et suivants du Code de la consommation, tout client consommateur peut recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d’un litige. Médiateur désigné : ANM Conso, 2 rue de Colmar – 94300 Vincennes. Site : ANMconso.com",
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
    texte: `Les informations transmises via le questionnaire de contact (formulaire Tally) servent uniquement à répondre à votre demande et à préparer votre projet ; elles sont conservées dans le tableau de suivi des demandes du studio (Google). La réservation d’un appel passe par Cal.com. Si vous téléchargez un guide en laissant votre email, il est enregistré chez Brevo (données hébergées dans l’Union européenne) pour vous envoyer les guides et les conseils du studio, une à deux fois par mois ; chaque email contient un lien de désinscription. Ces données ne sont ni vendues ni cédées. Conformément au RGPD, vous pouvez y accéder, les corriger ou demander leur suppression en écrivant à ${SITE.email}.`,
  },
  {
    titre: "Cookies",
    texte:
      "Ce site utilise uniquement des cookies nécessaires à son fonctionnement et une mesure d’audience anonyme. Aucun cookie publicitaire n’est déposé.",
  },
  {
    titre: "Liens affiliés",
    texte:
      "Certains articles du blog contiennent des liens affiliés. Ils ne changent rien au prix pour vous ; le studio peut percevoir une petite commission qui soutient le blog.",
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
      <Footer source="footer-mentions" />
    </>
  );
}
