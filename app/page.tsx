import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroHome from "@/components/HeroHome";
import FloatingCta from "@/components/FloatingCta";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import LineReveal from "@/components/LineReveal";
import MaskReveal from "@/components/MaskReveal";
import ScrollZoom from "@/components/ScrollZoom";
import ProcessCards from "@/components/ProcessCards";
import Avis, { type AvisItem } from "@/components/Avis";
import { FORMULES } from "@/data/services";
import { getProjets } from "@/lib/content";
import { SITE } from "@/lib/site";
import styles from "./home.module.css";

const PRESSE = ["Marie Claire", "Gala", "actu.fr", "Maison & Jardin"];

const AVIS: AvisItem[] = [
  {
    nom: "Matthieu",
    projet: "Pièce de vie",
    contexte: "Pièce de vie · Rouen · Agencement & décoration",
    texte:
      "Très à l’écoute, chaleureuse et inspirante, elle a su me proposer un projet en parfaite adéquation avec mes attentes.",
    avant: "/images/bureau-nb.jpg",
    apres: "/images/bureau.jpg",
  },
  {
    nom: "Véronique",
    projet: "Studio photo",
    contexte: "Studio photo · Rouen · Agencement & décoration",
    texte:
      "Un vrai sens de l’espace : mon studio est enfin pratique pour travailler, et beau pour recevoir mes clients.",
    avant: "/images/plan.jpg",
    apres: "/images/chambre.jpg",
  },
  {
    nom: "Kevin",
    projet: "Studio 14 m²",
    contexte: "Studio 14 m² · Lille · Agencement & conseils",
    texte: "Je pensais qu’on ne pouvait rien faire de 14 m². Les plans m’ont prouvé le contraire, et sans exploser mon budget.",
    avant: "/images/bureau-nb.jpg",
    apres: "/images/chambre.jpg",
  },
  {
    nom: "Fatoumata",
    projet: "Appartement entier",
    contexte: "Appartement entier · Paris · Prestation semi-complète",
    texte: "Disponible, rigoureuse et pleine d’idées. Le suivi à distance des travaux m’a enlevé un poids énorme.",
    avant: "/images/plan.jpg",
    apres: "/images/bureau.jpg",
  },
];

const INSTA = [
  { type: "Reel", titre: "Pièce de vie de 50 m² : neutre ou couleur ?", image: "/images/chambre.jpg" },
  { type: "Post", titre: "Studio 30 m² : le plan avant les travaux", image: "/images/plan.jpg" },
  { type: "Reel", titre: "Un bureau caché dans 30 m²", image: "/images/bureau.jpg" },
  { type: "Post", titre: "Quelle couleur pour ma table basse ?", image: null },
  { type: "Reel", titre: "Avant / après : studio 30 m²", image: "/images/bureau-nb.jpg" },
];

export default function Home() {
  const projets = getProjets().slice(0, 3);

  return (
    <>
      <Header source="header-accueil" variant="home" />
      <main id="contenu">
        <HeroHome />

        {/* Presse */}
        <section className={styles.presse} aria-label="Ils parlent du studio">
          <p className="t-serre c-2">Vu dans</p>
          {PRESSE.map((p) => (
            <p key={p} className={`t-accordeon ${styles.presseNom}`}>
              {p}
            </p>
          ))}
        </section>

        {/* Intro */}
        <section className={`wrap ${styles.intro}`}>
          <LineReveal
            className="t-projet"
            text="Studio Lixivel est un studio d’architecture intérieure basé à Rouen. Agencement, décoration, rénovation : nous concevons des lieux pratiques et chaleureux, à distance partout en France ou sur place en Normandie, quel que soit votre budget."
          />
          <Link href="/le-studio" className="link">
            En savoir plus sur le studio
          </Link>
        </section>

        {/* Projets */}
        <section aria-labelledby="titre-projets">
          <SectionHead id="titre-projets" title="Projets sélectionnés">
            <Link href="/projets" className="link" style={{ color: "var(--texte)" }}>
              Voir tous les projets
            </Link>
          </SectionHead>
          <div className={styles.projets}>
            {projets.map((p, i) => (
              <Link
                key={p.slug}
                href={p.detail ? `/projets/${p.slug}` : "/projets"}
                className={styles.projet}
                style={{ zIndex: i + 1 }}
              >
                <span className={styles.projetFond}>
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="100vw"
                    className={styles.projetImg}
                    priority={i === 0}
                  />
                </span>
                <div className={styles.projetVoile} aria-hidden />
                <div className={styles.projetTop}>
                  <span className="t-carte">{p.ville}</span>
                  <span className="t-carte">{p.annee}</span>
                </div>
                <MaskReveal
                  as="h3"
                  className={`t-hero ${styles.projetTitre}`}
                  lines={[p.titre, <span key="s" style={{ opacity: 0.55 }}>{p.sousTitre}</span>]}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className={styles.services} aria-labelledby="titre-services">
          <SectionHead id="titre-services" title="Services" plain>
            De l’idée au lieu fini, le studio conçoit et pilote vos projets d’aménagement : à votre rythme, dans le
            respect du brief et du budget. À distance partout en France, ou sur place en Normandie.
          </SectionHead>
          <ul className={styles.servicesGrid}>
            {FORMULES.map((f, i) => (
              <Reveal as="li" key={f.slug} delay={i * 0.06} className={styles.service}>
                <Link href={`/services#${f.slug}`} className={styles.serviceLink}>
                  <div className={`media ${styles.serviceMedia}`} data-illu={f.illustration || undefined}>
                    {f.illustration ? (
                      <Image src={f.image} alt="" width={200} height={250} className={styles.serviceIllu} />
                    ) : (
                      <Image src={f.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                    )}
                  </div>
                  <p className="t-surtitre c-accent">
                    {f.surtitre} · {f.tarif.split(",")[0].toLowerCase()}
                  </p>
                  <h3 className="t-accordeon">{f.titre}</h3>
                  <p className="t-serre c-2">{f.resume}</p>
                  <span className="link">En savoir plus</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Le studio */}
        <section className={styles.studio} aria-labelledby="titre-studio">
          <SectionHead id="titre-studio" title="Le studio">
            Architecte d’intérieur, créatrice de contenus déco et défenseuse des beaux intérieurs à petit budget.
          </SectionHead>
          <div className={styles.studioImgs}>
            <figure>
              <ScrollZoom className={styles.studioImg}>
                <Image src="/images/portrait.jpg" alt="Cindy, fondatrice du studio, à son bureau" fill sizes="(max-width: 760px) 100vw, 50vw" />
              </ScrollZoom>
              <figcaption className="t-carte">Cindy, fondatrice</figcaption>
            </figure>
            <figure>
              <ScrollZoom className={styles.studioImg}>
                <Image src="/images/plan.jpg" alt="Plan 2D d’un appartement" fill sizes="(max-width: 760px) 100vw, 50vw" />
              </ScrollZoom>
              <figcaption className="t-carte">Plans &amp; rendus 3D</figcaption>
            </figure>
          </div>
          <div className={`split wrap ${styles.studioText}`}>
            <span />
            <div className="col-2 stack" style={{ gap: 24, alignItems: "flex-start" }}>
              <p className="t-serre c-2">
                Remarquée sur TikTok et Instagram, relayée par Marie Claire, Gala et Maison &amp; Jardin, Cindy partage
                chaque semaine ses astuces pour un intérieur réussi sans exploser son budget.
              </p>
              <Link href="/le-studio" className="link">
                Découvrir le studio
              </Link>
            </div>
          </div>
        </section>

        {/* Processus */}
        <section className={styles.processus} aria-labelledby="titre-processus">
          <SectionHead id="titre-processus" title="Processus">
            Quatre étapes simples, du premier message à la remise des clés. Vous savez toujours où en est votre projet.
          </SectionHead>
          <ProcessCards />
        </section>

        {/* Avis */}
        <section className={styles.avis} aria-labelledby="titre-avis">
          <SectionHead id="titre-avis" title="Avant / après" plain>
            Ce qu’ils en disent, et ce que ça donne. Faites glisser pour comparer.
          </SectionHead>
          <Avis items={AVIS} />
        </section>

        {/* Instagram */}
        <section className={styles.insta} aria-labelledby="titre-insta">
          <SectionHead id="titre-insta" title="Sur Instagram" plain>
            <p>Astuces, avant/après et trouvailles déco à petit prix : rejoignez la communauté du studio.</p>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="link" style={{ color: "var(--texte)" }}>
              Suivre {SITE.handle}
            </a>
          </SectionHead>
          <ul className={styles.instaList}>
            {INSTA.map((post) => (
              <li key={post.titre}>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={styles.instaCard}>
                  <div className={`media media--l ${styles.instaMedia}`} data-illu={!post.image || undefined}>
                    {post.image ? (
                      <Image src={post.image} alt="" fill sizes="(max-width: 640px) 240px, 20vw" />
                    ) : (
                      <Image src="/images/lampe.png" alt="" width={140} height={175} className={styles.instaIllu} />
                    )}
                    <span className={`tag ${styles.instaTag}`}>{post.type}</span>
                  </div>
                  <p className={`t-petit ${styles.instaLegende}`}>{post.titre}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <FloatingCta source="hero" />
      <Footer source="footer-accueil" />
    </>
  );
}
