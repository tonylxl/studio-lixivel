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
import { PRESSE } from "@/data/presse";
import { CHIFFRES } from "@/data/chiffres";
import styles from "./studio.module.css";

export const metadata: Metadata = {
  title: "Le studio : Cindy, architecte d’intérieur",
  description:
    "Studio Lixivel, fondé par Cindy à Rouen : une architecture intérieure accessible, plus de 300 projets, des intérieurs pratiques et chaleureux partout en France.",
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

/** Inclinaison et décalage des cartes « En chiffres » (dans l'ordre), le contenu vient de Pages CMS. */
const POSE = [
  { rotate: 3, y: 60 },
  { rotate: -2, y: 20 },
  { rotate: 2, y: 90 },
  { rotate: -3, y: 40 },
];

const VALEURS = [
  {
    titre: "Le budget d’abord.",
    texte:
      "Chaque projet part de votre budget, de vos envies et de vos priorités. Nous cherchons le meilleur équilibre entre esthétique, fonctionnalité et coût.",
  },
  {
    titre: "Beau, mais vivable.",
    texte:
      "Des rangements pratiques, une circulation naturelle, des matériaux qui durent : un intérieur doit être aussi agréable à vivre qu’à regarder.",
  },
  {
    titre: "Rien de caché.",
    texte:
      "Un devis transparent, des délais fixés ensemble et des échanges réguliers pour suivre l’avancement de votre projet.",
  },
];

const REELS = [
  {
    titre: "Pièce de vie de 50 m² : neutre ou couleur ?",
    image: "/images/chambre.jpg",
  },
  { titre: "Un salon déco à petits prix", image: "/images/bureau.jpg" },
  { titre: "Avant / après : studio 30 m²", image: "/images/bureau-nb.jpg" },
];

/** En-tête de section : filet en haut, titre 40 à gauche, description éventuelle à droite. */
function Head({
  title,
  children,
  art,
}: {
  title: string;
  children?: React.ReactNode;
  art?: React.ReactNode;
}) {
  return (
    <div className={styles.head}>
      <h2 className="t-section">{title}</h2>
      {children && (
        <div className={`t-serre c-2 ${styles.headSide}`}>{children}</div>
      )}
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
            <Image
              src="/images/fauteuil-lin.png"
              alt=""
              width={1061}
              height={1213}
              className={styles.heroArt}
              priority
            />
            <div className={styles.heroText}>
              <p className="t-serre c-2">Le studio</p>
              <MaskReveal
                as="h1"
                className="t-hero"
                lines={["Architecte d’intérieur,", "à votre image."]}
                stagger={0.12}
              />
              <p className={styles.heroLead}>
                Studio Lixivel est un studio d’architecture intérieure et de
                décoration fondé par Cindy Lixivel à Rouen : des intérieurs
                élégants, chaleureux et fonctionnels, en Normandie, partout en
                France et à l’international.
              </p>
            </div>
          </section>

          {/* 01 — Approche */}
          <section id="approche" className={styles.section}>
            <Head title="L’approche" />
            <div className={styles.body}>
              <p className={styles.accroche}>
                Studio Lixivel est né d’une conviction : l’architecture
                intérieure doit être accessible au plus grand nombre, quel que
                soit le budget.
              </p>
              <div className={styles.cols}>
                <p className="t-serre c-2">
                  De la conception à distance dès 35 €/m² à l’accompagnement
                  complet des travaux, chaque formule est pensée pour votre mode
                  de vie, vos envies et votre budget.
                </p>
              </div>
            </div>
            <div className={styles.photos}>
              <div className={`media ${styles.photo}`}>
                <Image
                  src="/images/chambre.jpg"
                  alt="Chambre aux murs rouges et tête de lit en bois"
                  fill
                  sizes="(max-width: 760px) 100vw, 40vw"
                />
              </div>
              <div className={`media ${styles.photo}`}>
                <Image
                  src="/images/bureau.jpg"
                  alt="Bureau sur mesure dans un studio rénové"
                  fill
                  sizes="(max-width: 760px) 100vw, 40vw"
                />
              </div>
            </div>
          </section>

          {/* 02 — Fondatrice */}
          <section id="fondatrice" className={styles.section}>
            <Head title="La fondatrice" />
            <div className={styles.body}>
              <p className={styles.accroche}>
                Cindy est architecte d’intérieur et créatrice de contenus. Elle
                suit personnellement chaque projet, du premier contact à sa
                concrétisation.
              </p>
              <div className={styles.cols}>
                <p className="t-serre c-2">
                  Sur Instagram et TikTok, elle partage conseils d’aménagement,
                  idées déco accessibles, coulisses de ses projets et son
                  quotidien de maman et de cheffe d’entreprise.
                </p>
              </div>
            </div>
            <div className={styles.photos}>
              <SettleCard
                as="div"
                rotate={-4}
                y={0}
                className={`media ${styles.photo}`}
              >
                <Image
                  src="/images/portrait.jpg"
                  alt="Portrait de Cindy dans son bureau"
                  fill
                  sizes="(max-width: 760px) 100vw, 40vw"
                />
              </SettleCard>
            </div>
          </section>

          {/* 03 — Chiffres */}
          <section id="chiffres" className={styles.section}>
            <Head title="En chiffres" />
            <ul className={styles.chiffres}>
              {CHIFFRES.map((c, i) => (
                <SettleCard
                  key={c.label}
                  index={i}
                  {...POSE[i % POSE.length]}
                  className={styles.chiffre}
                >
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
              art={
                <Image
                  src="/images/fauteuil.png"
                  alt=""
                  width={441}
                  height={502}
                  className={styles.headArt}
                />
              }
            />
            <ul className={styles.valeurs}>
              {VALEURS.map((v) => (
                <li key={v.titre}>
                  <MaskReveal
                    as="p"
                    className={styles.valeur}
                    lines={[v.titre]}
                  />
                  <p className="t-serre c-2">{v.texte}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 05 — Histoire */}
          <section id="histoire" className={styles.section}>
            <Head title="L’histoire" />
            <div className={styles.body}>
              <p className={styles.accroche}>
                Après quelques mois en agence, Cindy lance en 2021 le Studio
                Lixivel.
              </p>
              <div className={styles.cols}>
                <p className="t-serre c-2">
                  En partageant sa passion et son quotidien sur les réseaux
                  sociaux, Cindy crée une vraie proximité avec sa communauté.
                  Les questions affluent : comment aménager, décorer,
                  transformer son intérieur à moindre coût ?
                </p>
                <p className="t-serre c-2">
                  Pour y répondre, Studio Lixivel lance ses prestations à
                  distance, avec des formules adaptées à chaque besoin et à
                  chaque budget.
                </p>
              </div>
            </div>
          </section>

          {/* 06 — Presse */}
          <section id="presse" className={styles.section}>
            <Head title="Dans la presse" />
            <ul className={styles.presse}>
              {PRESSE.filter((p) => p.lien).map((p) => (
                <li key={p.nom}>
                  <a
                    href={p.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.presseRow}
                  >
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
              <p>
                Projets, conseils déco et coulisses du studio : suivez Cindy sur
                Instagram et TikTok.
              </p>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
                style={{ color: "var(--texte)" }}
              >
                Suivre {SITE.handle}
              </a>
            </Head>
            <ul className={styles.reels}>
              {REELS.map((r) => (
                <li key={r.titre}>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.reel}
                  >
                    <div className={`media ${styles.reelMedia}`}>
                      <Image
                        src={r.image}
                        alt=""
                        fill
                        sizes="(max-width: 760px) 80vw, 25vw"
                      />
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
