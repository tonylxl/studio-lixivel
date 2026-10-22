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
  title: "Le studio : Cindy, architecte d’intérieur",
  description:
    "Studio Lixivel, fondé par Cindy à Rouen : une architecture intérieure accessible, plus de 300 projets, des intérieurs pratiques et chaleureux partout en France.",
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
      "Chaque projet est pensé en tenant compte de votre budget, de vos envies et de vos priorités. Cindy vous accompagne dans vos choix et vous propose des solutions adaptées, tout en veillant à trouver le meilleur équilibre entre esthétisme, fonctionnalité et faisabilité financière.",
  },
  {
    titre: "Beau, mais vivable.",
    texte:
      "Des rangements fonctionnels, des espaces où l’on circule naturellement et des matériaux choisis pour durer. Parce qu’un intérieur doit être aussi agréable à vivre qu’à regarder.",
  },
  {
    titre: "Rien de caché.",
    texte:
      "Un devis transparent, des délais prévisionnels définis ensemble et des échanges réguliers pour vous accompagner sereinement et vous tenir informé de l’avancement de votre projet.",
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
                décoration fondé par Cindy Lixivel à Rouen. Il imagine des
                intérieurs élégants, chaleureux et fonctionnels, pensés sur
                mesure pour chaque client, et accompagne des projets en
                Normandie, partout en France et à l’international.
              </p>
            </div>
          </section>

          {/* 01 — Approche */}
          <section id="approche" className={styles.section}>
            <Head title="L’approche" />
            <div className={styles.body}>
              <p className={styles.accroche}>
                Studio Lixivel est né d’une conviction simple : l’architecture
                intérieure doit être accessible au plus grand nombre, avec des
                solutions adaptées à chaque projet, à chaque besoin et à
                différents budgets.
              </p>
              <div className={styles.cols}>
                <p className="t-serre c-2">
                  Le studio conçoit des intérieurs sur mesure, pensés pour votre
                  mode de vie, vos envies et votre budget. Studio Lixivel
                  propose différentes formules, de la conception à distance,
                  accessible à partir de 35 €/m², jusqu’aux prestations
                  complètes intégrant la conception 3D, l’accompagnement et les
                  conseils tout au long des travaux. Chaque projet bénéficie
                  ainsi d’une approche personnalisée, adaptée aux besoins de
                  chacun.
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
                À la tête de Studio Lixivel, Cindy est architecte d’intérieur et
                créatrice de contenus. Passionnée par son métier, elle
                s’investit personnellement dans chaque projet, tout en
                partageant avec authenticité son quotidien de maman et de cheffe
                d’entreprise sur les réseaux sociaux.
              </p>
              <div className={styles.cols}>
                <p className="t-serre c-2">
                  Cindy a fondé Studio Lixivel avec la volonté de rendre
                  l’architecture intérieure accessible au plus grand nombre. De
                  la première prise de contact à la concrétisation du projet,
                  elle s’investit personnellement dans chaque étape pour
                  proposer un accompagnement attentif et sur mesure.
                </p>
                <p className="t-serre c-2">
                  Sur Instagram et TikTok, Cindy partage sa passion pour
                  l’architecture intérieure à travers des conseils pratiques,
                  des astuces d’aménagement, des idées déco accessibles et les
                  coulisses de ses projets. Elle y dévoile également ses
                  découvertes, ses sélections de mobilier et ses réalisations,
                  avec l’envie d’inspirer chacun à créer un intérieur qui lui
                  ressemble.
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
                  En partageant sur les réseaux sociaux sa passion pour
                  l’architecture intérieure, mais aussi son quotidien de maman
                  et de cheffe d’entreprise, Cindy crée une véritable proximité
                  avec sa communauté. Un mélange d’expertise, de spontanéité et
                  d’authenticité qui devient sa signature. Les questions
                  affluent alors sur l’aménagement, la décoration et les astuces
                  pour transformer son intérieur à moindre coût.
                </p>
                <p className="t-serre c-2">
                  Pour répondre à ces attentes, Studio Lixivel développe des
                  prestations d’architecture intérieure à distance. Une approche
                  personnalisée, avec différentes formules adaptées aux besoins,
                  aux envies et au budget de chaque projet, pour permettre au
                  plus grand nombre de bénéficier de conseils et d’une véritable
                  expertise professionnelle.
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
                Entre projets d’architecture intérieure, conseils déco, vie de
                maman et quotidien de cheffe d’entreprise, découvrez l’univers
                authentique de Cindy sur Instagram et TikTok.
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
