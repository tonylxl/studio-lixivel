import type { Metadata } from "next";
import Image from "next/image";
import PageTone from "@/components/PageTone";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudioNav, { type StudioNavItem } from "@/components/StudioNav";
import MaskReveal from "@/components/MaskReveal";
import SettleCard from "@/components/SettleCard";
import CountUp from "@/components/CountUp";
import { SITE } from "@/lib/site";
import styles from "./studio.module.css";

export const metadata: Metadata = {
  title: "Le studio : Cindy, architecte d’intérieur",
  description:
    "Studio Lixivel, fondé par Cindy à Rouen : une architecture intérieure accessible, plus de 60 projets, des intérieurs pratiques et chaleureux partout en France.",
};

const SECTIONS: StudioNavItem[] = [
  { id: "le-studio", label: "Studio Lixivel", couleur: "blanc" },
  { id: "approche", label: "L’approche", couleur: "sauge" },
  { id: "fondatrice", label: "La fondatrice", couleur: "rose" },
  { id: "chiffres", label: "En chiffres", couleur: "sombre" },
  { id: "valeurs", label: "Ce qui nous guide", couleur: "moutarde" },
  { id: "histoire", label: "L’histoire", couleur: "ardoise" },
  { id: "presse", label: "Dans la presse", couleur: "ocre" },
  { id: "coulisses", label: "En coulisses", couleur: "lin" },
];

const CHIFFRES = [
  { valeur: "+60", label: "projets accompagnés", rotate: 3, y: 60 },
  { valeur: "5", label: "médias en ont parlé", rotate: -2, y: 20 },
  { valeur: "3", label: "formules sur 4 entièrement à distance", rotate: 2, y: 90 },
  { valeur: "48 h", label: "pour vous répondre", rotate: -3, y: 40 },
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
  { titre: "Pièce de vie de 50 m² : neutre ou couleur ?", image: "/images/chambre.jpg" },
  { titre: "Un salon déco à petits prix", image: "/images/bureau.jpg" },
  { titre: "Avant / après : studio 30 m²", image: "/images/bureau-nb.jpg" },
];

/** En-tête de section : filet en haut, titre 40 à gauche, description éventuelle à droite. */
function Head({ title, children, art }: { title: string; children?: React.ReactNode; art?: React.ReactNode }) {
  return (
    <div className={styles.head}>
      <h2 className="t-section">{title}</h2>
      {children && <div className={`t-serre c-2 ${styles.headSide}`}>{children}</div>}
      {art}
    </div>
  );
}

export default function StudioPage() {
  return (
    <>
      <PageTone tone="doux" />
      <Header source="header-studio" />
      <main id="contenu" className={styles.page}>
        <aside className={styles.aside}>
          <StudioNav items={SECTIONS} />
        </aside>

        <div className={styles.content}>
          {/* 00 — Ouverture */}
          <section id="le-studio" className={styles.hero}>
            <Image src="/images/fauteuil-lin.png" alt="" width={1061} height={1213} className={styles.heroArt} priority />
            <div className={styles.heroText}>
              <p className="t-serre c-2">Le studio</p>
              <MaskReveal
                as="h1"
                className="t-hero"
                lines={["Architecte d’intérieur,", "à votre image."]}
                stagger={0.12}
              />
              <p className={styles.heroLead}>
                Studio Lixivel est un studio d’architecture intérieure fondé par Cindy à Rouen. Il conçoit des
                intérieurs pratiques et chaleureux, à distance partout en France et sur place en Normandie.
              </p>
            </div>
          </section>

          {/* 01 — Approche */}
          <section id="approche" className={styles.section}>
            <Head title="L’approche" />
            <p className={styles.accroche}>
              Studio Lixivel est né d’une idée simple : l’architecture intérieure ne devrait pas être réservée aux gros
              budgets.
            </p>
            <div className={styles.cols}>
              <p className="t-serre c-2">
                Le studio conçoit des intérieurs pensés pour votre façon de vivre, à partir de 35 €/m². Plans 2D, rendus
                3D et listes shopping clés en main permettent d’aménager chez soi à son rythme, même à des centaines de
                kilomètres de Rouen.
              </p>
              <p className="t-serre c-2">
                Sur TikTok et Instagram, le studio partage chaque semaine astuces, trouvailles à petit prix et
                avant/après. Une communauté qui porte la même conviction : chacun mérite un intérieur qui lui ressemble.
              </p>
            </div>
            <div className={styles.photos}>
              <div className={`media ${styles.photo}`}>
                <Image src="/images/chambre.jpg" alt="Chambre aux murs rouges et tête de lit en bois" fill sizes="(max-width: 760px) 100vw, 40vw" />
              </div>
              <div className={`media ${styles.photo}`}>
                <Image src="/images/bureau.jpg" alt="Bureau sur mesure dans un studio rénové" fill sizes="(max-width: 760px) 100vw, 40vw" />
              </div>
            </div>
          </section>

          {/* 02 — Fondatrice */}
          <section id="fondatrice" className={styles.section}>
            <Head title="La fondatrice" />
            <p className={styles.accroche}>
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
            <div className={styles.photos}>
              <SettleCard as="div" rotate={-4} y={0} className={`media ${styles.photo}`}>
                <Image src="/images/portrait.jpg" alt="Portrait de Cindy dans son bureau" fill sizes="(max-width: 760px) 100vw, 40vw" />
              </SettleCard>
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
          <section id="chiffres" className={styles.section}>
            <Head title="En chiffres" />
            <ul className={styles.chiffres}>
              {CHIFFRES.map((c, i) => (
                <SettleCard key={c.label} index={i} rotate={c.rotate} y={c.y} className={styles.chiffre}>
                  <CountUp value={c.valeur} className="t-chiffre" />
                  <span className={styles.chiffreLabel}>{c.label}</span>
                </SettleCard>
              ))}
            </ul>
          </section>

          {/* 04 — Valeurs */}
          <section id="valeurs" className={styles.section}>
            <Head
              title="Ce qui nous guide"
              art={<Image src="/images/fauteuil.png" alt="" width={441} height={502} className={styles.headArt} />}
            />
            <ul className={styles.valeurs}>
              {VALEURS.map((v) => (
                <li key={v.titre}>
                  <MaskReveal as="p" className={styles.valeur} lines={[v.titre]} />
                  <p className="t-serre c-2">{v.texte}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 05 — Histoire */}
          <section id="histoire" className={styles.section}>
            <Head title="L’histoire" />
            <p className={styles.accroche}>
              Après plusieurs années en agence, Cindy lance le studio à Rouen en 2021.
            </p>
            <div className={styles.cols}>
              <p className="t-serre c-2">
                Elle commence à partager son quotidien sur les réseaux. Les questions affluent : comment aménager un
                studio, quelle couleur choisir, comment rénover sans tout casser ?
              </p>
              <p className="t-serre c-2">
                Pour y répondre, le studio imagine des formules à distance : un vrai travail d’architecte d’intérieur,
                accessible partout en France, à un prix pensé pour les petits budgets.
              </p>
            </div>
          </section>

          {/* 06 — Presse */}
          <section id="presse" className={styles.section}>
            <Head title="Dans la presse" />
            <ul className={styles.presse}>
              {PRESSE.map((p) => (
                <li key={p.nom}>
                  <a href={p.lien} target="_blank" rel="noopener noreferrer" className={styles.presseRow}>
                    <span className={styles.presseNom}>{p.nom}</span>
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
          <section id="coulisses" className={styles.section}>
            <Head title="En coulisses">
              <p>Astuces, avant/après et trouvailles à petit prix, chaque semaine sur Instagram et TikTok.</p>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link" style={{ color: "var(--texte)" }}>
                Suivre {SITE.handle}
              </a>
            </Head>
            <ul className={styles.reels}>
              {REELS.map((r) => (
                <li key={r.titre}>
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={styles.reel}>
                    <div className={`media ${styles.reelMedia}`}>
                      <Image src={r.image} alt="" fill sizes="(max-width: 760px) 80vw, 25vw" />
                      <span className={styles.reelTag}>▶ Reel</span>
                    </div>
                    <p className="t-serre c-2">{r.titre}</p>
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
