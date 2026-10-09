/**
 * Crée le questionnaire « Débuter votre projet » dans Google Forms,
 * pour l'importer ensuite dans Tally (Tally → New form → Import → Google Forms).
 *
 * Mode d'emploi :
 * 1. Ouvrir https://script.google.com → « Nouveau projet ».
 * 2. Remplacer tout le code par ce fichier, enregistrer (Cmd + S).
 * 3. Choisir la fonction « creerQuestionnaire » puis « Exécuter », autoriser l'accès.
 * 4. Le lien du formulaire s'affiche dans le « Journal d'exécution ».
 *
 * Ce que Google Forms ne sait pas faire (à ajouter ensuite dans Tally, voir docs/questionnaire-tally.md) :
 * champs cachés (source, formule, surface, article), logique conditionnelle,
 * envoi de fichiers, choix en images pour l'ambiance, page de remerciement, notification email.
 */
function creerQuestionnaire() {
  const form = FormApp.create("Débuter votre projet");
  form.setDescription("Environ 6 minutes. Le studio revient vers vous sous 48 h avec une première fourchette de prix.");

  const choixUnique = (titre, choix, obligatoire = true, aide = "") =>
    form.addMultipleChoiceItem().setTitle(titre).setHelpText(aide).setChoiceValues(choix).setRequired(obligatoire);
  const choixMultiples = (titre, choix, obligatoire = false, aide = "") =>
    form.addCheckboxItem().setTitle(titre).setHelpText(aide).setChoiceValues(choix).setRequired(obligatoire);
  const texteCourt = (titre, obligatoire = false, aide = "") =>
    form.addTextItem().setTitle(titre).setHelpText(aide).setRequired(obligatoire);
  const texteLong = (titre, aide = "") => form.addParagraphTextItem().setTitle(titre).setHelpText(aide).setRequired(false);
  const nombre = (titre, obligatoire = false, aide = "") =>
    texteCourt(titre, obligatoire, aide).setValidation(
      FormApp.createTextValidation().setHelpText("Indiquez un nombre.").requireNumber().build(),
    );
  const page = (titre) => form.addPageBreakItem().setTitle(titre);

  // 1. Votre projet
  form.addSectionHeaderItem().setTitle("Votre projet");
  choixUnique("Quelle formule vous intéresse ?", [
    "Agencement & conseils · dès 35 €/m²",
    "Agencement & décoration · dès 55 €/m²",
    "Prestation semi-complète · dès 90 €/m²",
    "Prise en charge complète · à partir de 5 000 €",
    "Je ne sais pas encore, aidez-moi à choisir",
  ]);
  choixUnique("Type de bien", ["Appartement", "Studio", "Maison", "Local professionnel"]);
  choixUnique("Usage du logement", [
    "Résidence principale",
    "Résidence secondaire",
    "Location courte durée (Airbnb, voyageurs d’affaires)",
    "Location longue durée",
    "Bien à vendre (home staging)",
  ]);
  choixUnique("Vous êtes", ["Propriétaire", "Locataire", "En cours d’achat"], false);
  texteCourt("Ville", true);

  // 2. L’espace
  page("L’espace");
  choixMultiples(
    "Pièces concernées",
    ["Pièce de vie", "Cuisine", "Chambre", "Salle de bain", "Bureau", "Entrée", "Tout le logement"],
    true,
  );
  nombre("Surface concernée (m²)", true);
  nombre("Nombre d’adultes qui vivent ou séjournent ici");
  nombre("Nombre d’enfants");
  choixMultiples("Ce qui ne va pas aujourd’hui", [
    "Manque de lumière",
    "Manque de rangements",
    "Pièce peu fonctionnelle",
    "Circulation difficile",
    "Déco datée",
    "Rien de particulier",
  ]);

  // 3. Vos envies
  page("Vos envies");
  choixMultiples(
    "Ce que vous souhaitez faire",
    [
      "Réagencer",
      "Décorer et meubler",
      "Changer les sols",
      "Peinture et revêtements",
      "Travaux (cloisons, cuisine, salle de bain)",
      "Home staging",
    ],
    true,
  );
  choixMultiples(
    "Quelle ambiance ?",
    ["Cosy", "Minimaliste", "Classique chic", "Bohème", "Coloré", "Industriel doux"],
    false,
    "Deux choix maximum.",
  );
  texteLong("Ce que vous aimez", "Matières, couleurs, un hôtel ou un lieu qui vous inspire…");
  texteLong("Ce qu’il faut absolument éviter");
  texteCourt("Un tableau Pinterest ou des photos d’inspiration ? (lien)");

  // 4. Budget et calendrier
  page("Budget et calendrier");
  choixUnique(
    "Budget global mobilier + travaux",
    ["Moins de 3 000 €", "3 000 – 8 000 €", "8 000 – 15 000 €", "15 000 – 40 000 €", "Plus de 40 000 €", "Je ne sais pas encore"],
    true,
    "Hors honoraires du studio.",
  );
  choixUnique("Quand souhaitez-vous démarrer ?", ["Dès que possible", "Dans 1 à 3 mois", "Dans 3 à 6 mois", "Pas encore défini"]);
  choixUnique("Avez-vous déjà des artisans ?", ["Oui", "Non", "En partie"], false, "Si votre projet comprend des travaux.");

  // 5. Photos et plans (l'envoi de fichiers s'ajoute dans Tally)
  page("Photos et plans");
  texteLong("Autre chose à nous dire ?");

  // 6. Vos coordonnées
  page("Vos coordonnées");
  texteCourt("Prénom", true);
  texteCourt("Nom", true);
  form
    .addTextItem()
    .setTitle("Email")
    .setRequired(true)
    .setValidation(FormApp.createTextValidation().setHelpText("Adresse email invalide.").requireTextIsEmail().build());
  texteCourt("Téléphone", false, "Pour un premier échange plus rapide.");
  choixUnique("Comment avez-vous connu le studio ?", ["Instagram", "TikTok", "Google", "Presse", "Bouche-à-oreille", "Autre"], false);
  choixMultiples("Partage sur les réseaux", ["J’accepte que le studio partage l’avant/après de mon projet sur les réseaux"]);
  choixMultiples(
    "Données personnelles",
    ["J’accepte que mes données soient utilisées pour être recontacté·e (voir studiolixivel.com/mentions-legales)"],
    true,
  );

  form.setConfirmationMessage(
    "Merci, c’est bien reçu ! Cindy revient vers vous sous 48 h avec une première fourchette de prix, puis le tarif exact par email.",
  );

  Logger.log("Formulaire à modifier : " + form.getEditUrl());
  Logger.log("Formulaire public : " + form.getPublishedUrl());
}
