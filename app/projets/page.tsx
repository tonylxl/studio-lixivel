import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjetsHub from "@/components/ProjetsHub";
import { getProjets } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projets d’architecture intérieure",
  description:
    "Appartements, maisons, bureaux, ateliers : une sélection de projets menés par Studio Lixivel, à distance partout en France et sur place en Normandie.",
};

export default function ProjetsPage() {
  const projets = getProjets().map(({ slug, titre, sousTitre, ville, annee, couleur, cover, coverAlt }) => ({
    slug,
    titre,
    sousTitre,
    ville,
    annee,
    couleur,
    cover,
    coverAlt,
  }));
  return (
    <>
      <Header source="header-projets" />
      <main id="contenu">
        <ProjetsHub projets={projets} />
      </main>
      <Footer source="footer-projets" />
    </>
  );
}
