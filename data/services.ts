export type Formule = {
  slug: string;
  court: string;
  titre: string;
  surtitre: string;
  resume: string;
  description: string;
  inclus: string[];
  delai: string;
  tarif: string;
  image: string;
  illustration?: boolean;
  /** Tarif en €/m² pour le simulateur (null = sur devis). */
  prix: number | null;
  prixJeune?: number;
  honorairesTravaux?: boolean;
  modifs: string;
};

export const FORMULES: Formule[] = [
  {
    slug: "conseils",
    court: "Conseils",
    titre: "Agencement & conseils",
    surtitre: "100 % à distance",
    resume:
      "Plans 2D et 3D pour repenser la disposition de vos pièces et optimiser chaque mètre carré. Vous gardez la main sur le choix du mobilier.",
    description:
      "Vous avez le mobilier en tête, il vous manque le bon plan. Nous repensons la disposition de vos pièces pour optimiser chaque mètre carré.",
    inclus: [
      "Questionnaire et appel de lancement",
      "Plans 2D et 3D de l’aménagement",
      "Planche d’ambiance (en option)",
      "Une série de modifications incluse",
    ],
    delai: "1 à 2 mois",
    tarif: "Dès 40 €/m²",
    image: "/images/plan.jpg",
    prix: 40,
    modifs: "Une série incluse",
  },
  {
    slug: "decoration",
    court: "Décoration",
    titre: "Agencement & décoration",
    surtitre: "100 % à distance",
    resume:
      "Plan 2D, rendus 3D en 4K et liste shopping complète avec toutes les références : il ne vous reste plus qu’à commander.",
    description:
      "La formule la plus demandée : tout ce qu’il faut pour aménager et décorer, avec la liste shopping clé en main. Vous commandez, vous installez.",
    inclus: [
      "Plan 2D coté",
      "Rendus 3D en 4K, et vidéo en option",
      "Liste shopping avec toutes les références",
      "Modifications à partir de 90 €",
    ],
    delai: "1 à 5 mois",
    tarif: "Dès 50 €/m², 45 €/m² pour les 18–29 ans",
    image: "/images/chambre.jpg",
    prix: 50,
    prixJeune: 45,
    modifs: "À partir de 90 €",
  },
  {
    slug: "semi-complete",
    court: "Semi-complète",
    titre: "Prestation semi-complète",
    surtitre: "Conception + suivi à distance",
    resume:
      "Nous concevons votre projet, sélectionnons les artisans et vous accompagnons à distance pendant les travaux, que vous pilotez vous-même.",
    description:
      "Nous concevons le projet et préparons le terrain pour les travaux. Vous restez maître d’œuvre, avec le studio en soutien tout au long du chantier.",
    inclus: [
      "Plans 2D, rendus 3D 4K et liste shopping",
      "Consultation des artisans et descriptifs de travaux",
      "Dossier administratif et devis",
      "Suivi à distance et réception des travaux",
    ],
    delai: "1 à 4 mois pour la conception",
    tarif: "Sur devis",
    image: "/images/lampe.png",
    illustration: true,
    prix: null,
    modifs: "Incluses dans le suivi",
  },
  {
    slug: "complete",
    court: "Complète",
    titre: "Prise en charge complète",
    surtitre: "Sur place",
    resume:
      "Nous nous occupons de tout : conception, démarches, artisans, suivi de chantier quotidien et réception des travaux.",
    description:
      "Nous nous occupons de tout, de la visite à la remise des clés. Vous validez les grandes étapes, nous gérons le reste sur le chantier.",
    inclus: [
      "Visite et prise de mesures sur place",
      "Conception 2D puis 3D et sélection du mobilier",
      "Démarches, artisans et suivi de chantier",
      "Achats mobilier et déco (en option)",
    ],
    delai: "Devis sous 48 h",
    tarif: "Dès 70 €/m² + honoraires sur travaux",
    image: "/images/bureau-nb.jpg",
    prix: 70,
    honorairesTravaux: true,
    modifs: "Incluses dans le suivi",
  },
];

export const COMPARATIF: { label: string; valeurs: string[] }[] = [
  { label: "Plans 2D et 3D", valeurs: ["✓", "✓", "✓", "✓"] },
  { label: "Rendus 3D en 4K", valeurs: ["—", "✓", "✓", "✓"] },
  { label: "Liste shopping référencée", valeurs: ["—", "✓", "✓", "✓"] },
  { label: "Recherche des artisans", valeurs: ["—", "—", "✓", "✓"] },
  { label: "Suivi de chantier", valeurs: ["—", "—", "À distance", "Sur place"] },
  { label: "Visite et mesures sur place", valeurs: ["—", "—", "—", "✓"] },
  { label: "Tarif", valeurs: ["Dès 40 €/m²", "Dès 50 €/m²", "Sur devis", "Dès 70 €/m²"] },
];

export const ETAPES = [
  {
    titre: "Le questionnaire",
    texte: "Vos envies, vos contraintes, votre budget : dix minutes pour tout nous raconter.",
    couleur: "sauge",
  },
  {
    titre: "On échange",
    texte: "Nous vous rappelons sous 48 h pour affiner le projet et choisir la formule qui vous convient.",
    couleur: "rose",
  },
  {
    titre: "Nous concevons",
    texte: "Plans 2D, rendus 3D en 4K et sélection de mobilier pensée pour vous.",
    couleur: "ardoise",
  },
  {
    titre: "Vous concrétisez",
    texte: "Vous aménagez à votre rythme, ou nous pilotons les travaux pour vous.",
    couleur: "moutarde",
  },
] as const;
