export type QR = { q: string; r: string };

/**
 * Chaque réponse commence par la réponse directe, en une phrase (c'est ce que reprennent
 * Google et les IA), puis donne le détail. Pas de bouton dans les réponses.
 */
export const FAQ: { id: string; titre: string; items: QR[] }[] = [
  {
    id: "studio",
    titre: "Le studio",
    items: [
      {
        q: "Qui est derrière Studio Lixivel ?",
        r: "Cindy, architecte d’intérieur et créatrice de contenus déco, qui a fondé le studio à Rouen. Elle suit chaque projet de près, du premier questionnaire à la remise des clés. Le studio a accompagné plus de 60 projets et a été cité par Marie Claire, Gala, Forbes, actu.fr et Maison & Jardin.",
      },
      {
        q: "Quelle différence entre un architecte d’intérieur et un décorateur ?",
        r: "Le décorateur travaille surtout l’ambiance (couleurs, mobilier, objets), l’architecte d’intérieur travaille aussi l’espace lui-même : plans, circulations, cloisons, lumière et, si besoin, travaux. Le studio fait les deux, de l’agencement d’une pièce à la rénovation complète d’un logement.",
      },
      {
        q: "Travaillez-vous aussi pour les professionnels ?",
        r: "Oui. En plus des logements, le studio aménage des locaux professionnels : bureaux, agence, atelier ou studio photo. Indiquez-le dans le questionnaire, nous adaptons la proposition à votre activité.",
      },
    ],
  },
  {
    id: "formules",
    titre: "Les formules",
    items: [
      {
        q: "Quelle formule choisir ?",
        r: "Tout dépend de votre projet : Agencement & conseils pour réorganiser l’espace, Agencement & décoration pour savoir aussi quoi acheter, la semi-complète ou la complète dès qu’il y a des travaux. En cas de doute, le questionnaire nous aide à vous orienter.",
      },
      {
        q: "Quelle différence entre conseils et décoration ?",
        r: "La formule Conseils s’arrête au plan, la formule Décoration va jusqu’à la liste d’achats. Avec Conseils, vous recevez des plans 2D et 3D pour repenser la disposition de vos pièces et vous gardez la main sur le choix du mobilier. Avec Décoration, vous recevez en plus des rendus 3D en 4K et une liste shopping complète : il ne vous reste plus qu’à commander.",
      },
      {
        q: "Faut-il faire des travaux ?",
        r: "Non. Les formules Conseils et Décoration se font sans travaux : on réorganise, on meuble, on décore. Les formules semi-complète et complète sont pensées pour les projets avec travaux, de la rénovation légère à la rénovation complète.",
      },
      {
        q: "Que contient la liste shopping ?",
        r: "Toutes les références des meubles, luminaires et objets déco du projet, choisies pour tenir dans votre budget. Elle est incluse à partir de la formule Agencement & décoration : vous commandez à votre rythme, puis vous installez.",
      },
      {
        q: "Peut-on changer de formule en cours de route ?",
        r: "Oui. Si, après les premiers plans, vous avez envie d’aller plus loin, nous passons à la formule supérieure et ce qui a déjà été réglé est déduit du nouveau tarif.",
      },
    ],
  },
  {
    id: "distance",
    titre: "À distance",
    items: [
      {
        q: "Comment se passe un projet à distance ?",
        r: "Tout se fait par mail et en visio, sans que le studio ait besoin de venir chez vous. Vous remplissez le questionnaire, vous nous envoyez photos et mesures, puis nous vous livrons plans, rendus 3D et liste shopping selon la formule choisie.",
      },
      {
        q: "Quelles informations dois-je fournir ?",
        r: "Un plan ou les mesures de la pièce, des photos de chaque mur, le mobilier que vous gardez et quelques images qui vous inspirent. Pour les mesures : longueurs, hauteur sous plafond, emplacement des fenêtres, portes et prises. Nous vous envoyons un guide pour ne rien oublier.",
      },
      {
        q: "Travaillez-vous partout en France ?",
        r: "Oui : trois formules sur quatre se font entièrement à distance, partout en France. La prise en charge complète, avec suivi de chantier sur place, est proposée en Normandie ; ailleurs, un déplacement est possible selon le projet.",
      },
    ],
  },
  {
    id: "tarifs",
    titre: "Tarifs et paiement",
    items: [
      {
        q: "Combien coûte un architecte d’intérieur ?",
        r: "Au Studio Lixivel, à partir de 35 €/m² pour un plan d’aménagement, 55 €/m² avec la décoration et la liste shopping, 90 €/m² pour une rénovation suivie à distance, et à partir de 5 000 € pour une prise en charge complète. Ce sont les honoraires du studio, hors mobilier et travaux.",
      },
      {
        q: "Comment est calculé le prix ?",
        r: "Les honoraires sont calculés au mètre carré, selon la formule choisie. Pour la décoration, le prix au m² baisse quand la surface augmente ; la prise en charge complète fait l’objet d’un devis personnalisé. Après le questionnaire, nous vous envoyons une fourchette, puis le tarif exact par email.",
      },
      {
        q: "Le simulateur donne-t-il le prix exact ?",
        r: "Non, il donne un ordre de grandeur « à partir de ». Le simulateur de la page Services multiplie la surface par le tarif de base de la formule. Le prix exact dépend de votre projet : nous vous l’envoyons par email après le questionnaire.",
      },
      {
        q: "Faut-il un gros budget ?",
        r: "Non. Nous partons de ce que vous voulez dépenser, pas l’inverse : chaque proposition tient dans l’enveloppe fixée ensemble, mobilier compris. Beaucoup de nos projets se font avec des pièces chinées ou à petit prix.",
      },
      {
        q: "Combien de modifications sont incluses ?",
        r: "Une série de modifications est incluse dans la formule Conseils. Pour la formule Décoration, les modifications sont possibles à partir de 90 €. Pour les formules avec travaux, les ajustements font partie du suivi.",
      },
    ],
  },
  {
    id: "travaux",
    titre: "Travaux",
    items: [
      {
        q: "Trouvez-vous les artisans ?",
        r: "Oui, à partir de la formule semi-complète. Nous consultons les artisans, préparons les descriptifs de travaux et vous aidons à comparer les devis.",
      },
      {
        q: "Qui suit le chantier ?",
        r: "Cela dépend de la formule : vous avec le soutien du studio pour la semi-complète, le studio sur place pour la complète. Avec la semi-complète, vous restez maître d’œuvre et nous vous accompagnons à distance ; avec la prise en charge complète, nous suivons le chantier jusqu’à la réception des travaux.",
      },
      {
        q: "Quels sont les délais ?",
        r: "De 15 jours pour un plan d’aménagement à environ 6 mois pour une rénovation. Comptez 15 jours pour la formule Conseils ; pour la Décoration, 15 jours pour l’agencement puis 1 à 4 mois pour la décoration, selon les modifications ; pour la semi-complète et la complète, environ 6 mois selon l’ampleur du projet.",
      },
    ],
  },
  {
    id: "contact",
    titre: "Premier contact",
    items: [
      {
        q: "Comment démarrer un projet avec le studio ?",
        r: "En répondant au questionnaire de la page Contact, en 5 minutes environ. Vous y décrivez vos envies, vos contraintes et votre budget ; nous vous recontactons sous 48 h pour en parler et vous orienter vers la bonne formule, sans engagement.",
      },
      {
        q: "Sous combien de temps répondez-vous ?",
        r: "Sous 48 h. Après le questionnaire, nous vous recontactons pour échanger sur votre projet, puis nous vous envoyons une fourchette de prix et le tarif exact par email.",
      },
    ],
  },
];

const q = (question: string) => FAQ.flatMap((c) => c.items).find((it) => it.q === question)!;

/** Extrait affiché sur la page Services. */
export const FAQ_SERVICES: QR[] = [
  q("Combien coûte un architecte d’intérieur ?"),
  q("Quelle formule choisir ?"),
  q("Comment se passe un projet à distance ?"),
  q("Le simulateur donne-t-il le prix exact ?"),
  q("Combien de modifications sont incluses ?"),
];

/** Extrait affiché sur l'accueil. */
export const FAQ_ACCUEIL: QR[] = [
  q("Combien coûte un architecte d’intérieur ?"),
  q("Quelle différence entre un architecte d’intérieur et un décorateur ?"),
  q("Travaillez-vous partout en France ?"),
  q("Comment démarrer un projet avec le studio ?"),
];
