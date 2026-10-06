import type { Metadata } from "next";
import Image from "next/image";
import PageTone from "@/components/PageTone";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudioNav from "@/components/StudioNav";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";
import styles from "./studio.module.css";

export const metadata: Metadata = {
  title: "Le studio",
  description:
    "Studio Lixivel, studio d’architecture intérieure fondé par Cindy à Rouen : une approche accessible, des intérieurs pratiques et chaleureux, à distance partout en France.",
};

const SECTIONS = [
  { id: "le-studio", label: "Le studio" },
  { id: "approche", label: "L’approche" },
  { id: "fondatrice", label: "La fondatrice" },
  { id: "chiffres", label: "En chiffres" },
  { id: "valeurs", label: "Ce qui nous guide" },
  { id: "histoire", label: "L’histoire" },
  { id: "presse", label: "Dans la presse" },
  { id: "coulisses", label: "En coulisses" },
];

const CHIFFRES = [
  { valeur: "+60", label: "projets accompagnés", couleur: "rose" },
  { valeur: "4", label: "magazines en ont parlé", couleur: "sauge" },
  { valeur: "3", label: "formules sur 4 entièrement à distance", couleur: "moutarde" },
  { valeur: "48 h", label: "pour vous répondre", couleur: "ardoise" },
];

const VALEURS = [
  {
    titre: "Le budget d’abord.",
    texte:
      "On part de ce que vous voulez dépenser, pas l’inverse. Chaque proposition tient dans l’enveloppe fixée ensemble, mobilier compris.",
  },
  {
    titre: "Beau, mais vivable.",
    texte:
      "Des rangements qui servent, des circulations simples, des matières qui vieillissent bien. Un intérieur se vit avant de se photographier.",
  },
  {
    titre: "Rien de caché.",
    texte: "Un devis clair, des délais tenus et des points réguliers : vous savez toujours où en est votre projet.",
  },
];

const PRESSE = [
  { nom: "Marie Claire", titre: "Studio Lixivel dans les adresses incontournables", lien: "#" },
  {
    nom: "Gala",
    titre: "Cette architecte d’intérieur s’est fait connaître sur TikTok et nous livre les dessous de son métier",
    lien: "#",
  },
  {
    nom: "actu.fr",
    titre: "Rouen : sur TikTok, cette architecte d’intérieur vous montre comment bien aménager votre chez-vous",
    lien: "#",
  },
  { nom: "Maison & Jardin", titre: "Design et décoration en ligne (2023)", lien: "#" },
];

const REELS = [
  { titre: "Pièce de vie de 50 m² : neutre ou couleur ?", image: "/images/chambre.jpg" },
  { titre: "Un salon déco à petits prix", image: "/images/bureau.jpg" },
  { titre: "Avant / après : studio 30 m²", image: "/images/bureau-nb.jpg" },
];

export default function StudioPage() {
  return (
    <>
      <PageTone tone="lin" />
      <Header source="header-studio" />
      <main id="contenu" className={styles.page}>
        <aside className={styles.aside}>
          <StudioNav items={SECTIONS} />
        </aside>

        <div className={styles.content}>
          {/* 00 — Ouverture */}
          <section id="le-studio" className={`${styles.card} ${styles.hero}`}>
            <p className="t-surtitre">Le studio</p>
            <h1 className="t-hero">
              Architecte d’intérieur,
              <br />à votre image.
            </h1>
            <p className={`t-intro ${styles.heroText}`}>
              Studio Lixivel est un studio d’architecture intérieure basé à Rouen. Il conçoit des intérieurs pratiques et
              chaleureux, à distance partout en France et sur place en Normandie.
            </p>
            <Image src="/images/fauteuil.png" alt="" width={441} height={502} className={styles.heroArt} priority />
          </section>

          {/* 01 — Approche */}
          <section id="approche" className={styles.card}>
            <h2 className="t-section">L’approche</h2>
            <div className={styles.cols}>
              <p className="t-serre c-2">
                Le studio conçoit des intérieurs pensés pour votre façon de vivre. Plans 2D, rendus 3D et listes shopping
                clés en main permettent d’aménager chez soi à son rythme, même à des centaines de kilomètres de Rouen.
              </p>
              <p className="t-serre c-2">
                Sur TikTok et Instagram, le studio partage chaque semaine astuces, trouvailles à petit prix et
                avant/après. Une communauté qui porte la même conviction : chacun mérite un intérieur qui lui ressemble.
              </p>
            </div>
            <div className={`media ${styles.wideImg}`}>
              <Image src="/images/bureau.jpg" alt="Bureau sur mesure dans un studio rénové" fill sizes="(max-width: 1024px) 100vw, 80vw" />
            </div>
          </section>

          {/* 02 — Fondatrice */}
          <section id="fondatrice" className={`${styles.card} ${styles.fondatrice}`}>
            <h2 className="t-section">La fondatrice</h2>
            <p className="t-intro">
              Derrière le studio, Cindy : architecte d’intérieur et créatrice de contenus déco, qui suit chaque projet de
              près.
            </p>
            <div className={styles.cols}>
              <p className="t-serre c-2">
                Cindy a fondé Studio Lixivel pour rendre l’architecture intérieure accessible au plus grand nombre. Du
                premier questionnaire à la remise des clés, elle reste votre interlocutrice.
              </p>
              <p className="t-serre c-2">
                Chaque semaine, elle partage astuces, trouvailles et avant/après sur TikTok et Instagram, avec la même
                conviction que le studio.
              </p>
            </div>
            <div className={styles.fondatriceGrid}>
              <div className={`media ${styles.portrait}`}>
                <Image src="/images/portrait.jpg" alt="Portrait de Cindy dans son bureau" fill sizes="(max-width: 760px) 100vw, 40vw" />
              </div>
              <figure className={styles.quote}>
                <blockquote className="t-citation c-accent">
                  « Un bel intérieur, ce n’est pas une question de budget. C’est un lieu qui vous ressemble, et où l’on
                  se sent bien. »
                </blockquote>
                <figcaption className="t-petit c-2">Cindy, fondatrice de Studio Lixivel</figcaption>
              </figure>
            </div>
          </section>

          {/* 03 — Chiffres */}
          <section id="chiffres" className={styles.card}>
            <h2 className="t-section">En chiffres</h2>
            <ul className={styles.chiffres}>
              {CHIFFRES.map((c, i) => (
                <Reveal as="li" key={c.label} delay={i * 0.08} className={styles.chiffre}>
                  <div data-couleur={c.couleur} className={styles.chiffreInner} style={{ rotate: `${[-3, 2, -2, 3][i]}deg` }}>
                    <span className="t-chiffre">{c.valeur}</span>
                    <span className="t-carte">{c.label}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>

          {/* 04 — Valeurs */}
          <section id="valeurs" className={styles.card}>
            <h2 className="t-section">Ce qui nous guide</h2>
            <ul className={styles.valeurs}>
              {VALEURS.map((v) => (
                <li key={v.titre}>
                  <p className="t-projet">{v.titre}</p>
                  <p className="t-serre c-2">{v.texte}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 05 — Histoire */}
          <section id="histoire" className={styles.card}>
            <h2 className="t-section">L’histoire</h2>
            <p className="t-intro">
              Studio Lixivel est né d’une idée simple : l’architecture intérieure ne devrait pas être réservée aux gros
              budgets.
            </p>
            <div className={styles.cols}>
              <p className="t-serre c-2">
                Après plusieurs années en agence, Cindy lance le studio à Rouen en 2021 et commence à partager son
                quotidien sur les réseaux. Les questions affluent : comment aménager un studio, quelle couleur choisir,
                comment rénover sans tout casser ?
              </p>
              <p className="t-serre c-2">
                Pour y répondre, le studio imagine des formules à distance : un vrai travail d’architecte d’intérieur,
                accessible partout en France, à un prix pensé pour les petits budgets.
              </p>
            </div>
          </section>

          {/* 06 — Presse */}
          <section id="presse" className={styles.card}>
            <h2 className="t-section">Dans la presse</h2>
            <ul className={styles.presse}>
              {PRESSE.map((p) => (
                <li key={p.nom}>
                  <a href={p.lien} target="_blank" rel="noopener noreferrer" className={styles.presseRow}>
                    <span className="t-accordeon">{p.nom}</span>
                    <span className="t-serre c-2">{p.titre}</span>
                    <span aria-hidden className={styles.arrow}>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* 07 — Coulisses */}
          <section id="coulisses" className={styles.card}>
            <div className={styles.coulissesHead}>
              <h2 className="t-section">En coulisses</h2>
              <div className="stack" style={{ gap: 16, alignItems: "flex-start" }}>
                <p className="t-serre c-2">
                  Astuces, avant/après et trouvailles à petit prix, chaque semaine sur Instagram et TikTok.
                </p>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link">
                  Suivre {SITE.handle}
                </a>
              </div>
            </div>
            <ul className={styles.reels}>
              {REELS.map((r) => (
                <li key={r.titre}>
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={styles.reel}>
                    <div className={`media media--l ${styles.reelMedia}`}>
                      <Image src={r.image} alt="" fill sizes="(max-width: 760px) 70vw, 25vw" />
                      <span className={`tag ${styles.reelTag}`}>▶ Reel</span>
                    </div>
                    <p className="t-petit c-2">{r.titre}</p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer source="footer-studio" />
    </>
  );
}
