export type QR = { q: string; r: string };

export const FAQ: { id: string; titre: string; items: QR[] }[] = [
  {
    id: "formules",
    titre: "Les formules",
    items: [
      {
        q: "Quelle formule choisir ?",
        r: "Si vous voulez surtout réorganiser l’espace, prenez Agencement & conseils. Si vous voulez aussi savoir quoi acheter, Agencement & décoration. Pour des travaux, la semi-complète ou la complète. En cas de doute, le questionnaire nous aide à vous orienter.",
      },
      {
        q: "Quelle différence entre conseils et décoration ?",
        r: "La formule Conseils porte sur l’agencement : plans 2D et 3D pour repenser la disposition de vos pièces, vous gardez la main sur le choix du mobilier. La formule Décoration va plus loin, avec des rendus 3D en 4K et une liste shopping complète : il ne vous reste plus qu’à commander.",
      },
      {
        q: "Peut-on changer de formule en cours de route ?",
        r: "Oui. Si, après les premiers plans, vous avez envie d’aller plus loin, nous passons à la formule supérieure et ce qui a déjà été réglé est déduit du nouveau tarif.",
      },
    ],
  },
  {
    id: "distance",
    titre: "À distance",
    items: [
      {
        q: "Comment se passe un projet à distance ?",
        r: "Tout se fait par mail et en visio : vous remplissez le questionnaire, nous envoyez photos et mesures, puis nous vous livrons plans, rendus 3D et liste shopping.",
      },
      {
        q: "Quelles informations dois-je fournir ?",
        r: "Un plan ou des mesures de la pièce (longueurs, hauteur sous plafond, emplacement des fenêtres, portes et prises), des photos de chaque mur, le mobilier que vous gardez, et quelques images qui vous inspirent. Nous vous envoyons un guide pour ne rien oublier.",
      },
      {
        q: "Travaillez-vous partout en France ?",
        r: "Oui : trois formules sur quatre se font entièrement à distance, partout en France. La prise en charge complète, avec suivi de chantier sur place, est proposée en Normandie.",
      },
    ],
  },
  {
    id: "tarifs",
    titre: "Tarifs et paiement",
    items: [
      {
        q: "Comment est calculé le prix ?",
        r: "Les honoraires sont calculés au mètre carré, selon la formule : dès 35 €/m² pour les conseils, dès 55 €/m² pour la décoration (le prix au m² baisse pour les grandes surfaces), dès 90 €/m² pour la semi-complète. La prise en charge complète démarre à 5 000 €. Le simulateur de la page Services donne une première estimation ; après le questionnaire, nous vous envoyons une fourchette, puis le tarif exact.",
      },
      {
        q: "Faut-il un gros budget ?",
        r: "Non. Nous partons de ce que vous voulez dépenser, pas l’inverse : chaque proposition tient dans l’enveloppe fixée ensemble, mobilier compris. Beaucoup de nos projets se font avec des pièces chinées ou à petit prix.",
      },
      {
        q: "Combien de modifications sont incluses ?",
        r: "Une série de modifications est incluse dans la formule Conseils. Pour la formule Décoration, les modifications sont possibles à partir de 90 €. Pour les formules avec travaux, les ajustements font partie du suivi.",
      },
    ],
  },
  {
    id: "travaux",
    titre: "Travaux",
    items: [
      {
        q: "Trouvez-vous les artisans ?",
        r: "Oui, à partir de la formule semi-complète : nous consultons les artisans, préparons les descriptifs de travaux et vous aidons à comparer les devis.",
      },
      {
        q: "Qui suit le chantier ?",
        r: "Avec la semi-complète, vous restez maître d’œuvre et le studio vous accompagne à distance. Avec la prise en charge complète, nous suivons le chantier sur place, jusqu’à la réception des travaux.",
      },
      {
        q: "Quels sont les délais ?",
        r: "Comptez 15 jours pour la formule Conseils. Pour la Décoration, 15 jours pour l’agencement, puis 1 à 4 mois pour la décoration selon les modifications. Pour la semi-complète et la complète, environ 6 mois, selon l’ampleur du projet.",
      },
    ],
  },
];

/** Extrait affiché sur la page Services. */
export const FAQ_SERVICES: QR[] = [FAQ[1].items[0], FAQ[2].items[1], FAQ[2].items[2]];
