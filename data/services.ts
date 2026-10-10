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
  /** Tarif de base en €/m² pour le simulateur (« à partir de »). null = forfait minimum. */
  prix: number | null;
  /** Montant minimum des honoraires (formule complète). */
  minimum?: number;
  /** Mention affichée sous l'estimation. */
  noteTarif?: string;
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
      "Pour ceux qui ont le mobilier en tête mais pas le bon plan. Le studio repense la disposition de vos pièces en plans 2D et 3D pour optimiser chaque mètre carré, puis vous gardez la main sur le choix du mobilier. Tout se fait à distance, en 15 jours.",
    inclus: [
      "Questionnaire et appel de lancement",
      "Plans 2D et 3D de l’aménagement",
      "Planche d’ambiance (en option)",
      "Une série de modifications incluse",
    ],
    delai: "15 jours",
    tarif: "Dès 35 €/m²",
    image: "/images/plan.jpg",
    prix: 35,
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
      "La formule la plus demandée, pour aménager et décorer sans travaux. Vous recevez un plan 2D coté, des rendus 3D en 4K et une liste shopping avec toutes les références, pensée pour votre budget. Vous commandez, vous installez.",
    inclus: [
      "Plan 2D coté",
      "Rendus 3D en 4K, et vidéo en option",
      "Liste shopping avec toutes les références",
      "Modifications à partir de 90 €",
    ],
    delai: "15 jours pour l’agencement, puis 1 à 4 mois pour la décoration",
    tarif: "Dès 55 €/m²",
    image: "/images/chambre.jpg",
    prix: 55,
    noteTarif: "Le prix au m² baisse quand la surface augmente.",
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
      "Pour une rénovation que vous pilotez vous-même, avec un architecte d’intérieur à vos côtés. Le studio conçoit le projet, consulte les artisans et prépare les descriptifs de travaux ; vous restez maître d’œuvre, avec le studio en soutien à distance jusqu’à la réception du chantier.",
    inclus: [
      "Plans 2D, rendus 3D 4K et liste shopping",
      "Consultation des artisans et descriptifs de travaux",
      "Dossier administratif et devis",
      "Suivi à distance et réception des travaux",
    ],
    delai: "Environ 6 mois, selon le projet",
    tarif: "Dès 90 €/m²",
    image: "/images/lampe.png",
    illustration: true,
    prix: 90,
    noteTarif: "Le tarif dépend de l’ampleur des travaux.",
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
      "Pour une rénovation sans rien gérer. Le studio s’occupe de tout, de la visite à la remise des clés : conception, démarches, artisans et suivi de chantier sur place. Vous validez les grandes étapes, nous gérons le reste.",
    inclus: [
      "Visite et prise de mesures sur place",
      "Conception 2D puis 3D et sélection du mobilier",
      "Démarches, artisans et suivi de chantier",
      "Achats mobilier et déco (en option)",
    ],
    delai: "Environ 6 mois, selon le projet",
    tarif: "À partir de 5 000 €",
    image: "/images/bureau-nb.jpg",
    prix: null,
    minimum: 5000,
    noteTarif: "Devis personnalisé selon la surface et l’ampleur des travaux.",
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
  { label: "Tarif", valeurs: ["Dès 35 €/m²", "Dès 55 €/m²", "Dès 90 €/m²", "Dès 5 000 €"] },
  { label: "Délai", valeurs: ["15 jours", "15 jours + 1 à 4 mois", "Environ 6 mois", "Environ 6 mois"] },
];

export const ETAPES = [
  {
    titre: "Le questionnaire",
    texte: "Vos envies, vos contraintes, votre budget : cinq minutes pour tout nous raconter.",
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
