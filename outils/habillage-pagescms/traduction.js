/*
 * Traduction française de l'interface de Pages CMS (qui n'existe qu'en anglais).
 * Remplace les textes de l'interface au fur et à mesure qu'ils s'affichent, par correspondance exacte.
 * Ne touche jamais au contenu saisi : éditeur de texte, champs de formulaire et zones modifiables sont ignorés.
 * Textes relevés dans le code source de Pages CMS (github.com/hunvreus/pagescms), oct. 2026.
 */
(() => {
  const FR = {
    // Navigation, menus
    "About Pages CMS": "À propos de Pages CMS",
    Account: "Compte",
    Actions: "Actions",
    "All actions": "Toutes les actions",
    "All projects": "Tous les projets",
    "All statuses": "Tous les statuts",
    "Back to collection": "Retour à la collection",
    Branch: "Branche",
    Branches: "Branches",
    "Choose another repository": "Choisir un autre dépôt",
    Collaborators: "Collaborateurs",
    Configuration: "Configuration",
    Content: "Contenu",
    Docs: "Documentation",
    "Go home": "Retour à l’accueil",
    "Go to configuration": "Ouvrir la configuration",
    "Go to settings": "Ouvrir les réglages",
    "Log out": "Se déconnecter",
    "Sign out": "Se déconnecter",
    "Manage branches": "Gérer les branches",
    More: "Plus",
    "More pages": "Plus de pages",
    "Open a project": "Ouvrir un projet",
    "Open default branch": "Ouvrir la branche principale",
    "Open media root": "Ouvrir la médiathèque",
    Overview: "Vue d’ensemble",
    Profile: "Profil",
    Projects: "Projets",
    "Recently visited": "Consultés récemment",
    Settings: "Réglages",
    Sidebar: "Menu",
    "Toggle Sidebar": "Afficher le menu",
    "Toggle menu": "Afficher le menu",
    Theme: "Thème",
    Light: "Clair",
    Dark: "Sombre",
    System: "Système",
    "View on GitHub": "Voir sur GitHub",
    "View image on GitHub": "Voir l’image sur GitHub",
    "View docs": "Voir la documentation",
    Website: "Site",

    // Collections et entrées
    "Add an entry": "Ajouter un contenu",
    "Add an item": "Ajouter un élément",
    "Add children entry": "Ajouter un sous-contenu",
    "New entry": "Nouveau contenu",
    Entries: "Contenus",
    "Entries in the": "Contenus de",
    "No entries": "Aucun contenu",
    "Creating entries is disabled": "La création de contenus est désactivée",
    "New entries are not allowed for this collection.": "Cette collection n’accepte pas de nouveaux contenus.",
    "Search entries...": "Rechercher…",
    Search: "Rechercher",
    Filters: "Filtres",
    "Open filters": "Afficher les filtres",
    "Reset filters": "Réinitialiser les filtres",
    "No results": "Aucun résultat",
    "No options found.": "Aucune option.",
    Name: "Nom",
    Filename: "Nom du fichier",
    Created: "Créé",
    Updated: "Modifié",
    Status: "Statut",
    Source: "Source",
    "Show hidden segments": "Afficher tout le chemin",

    // Édition
    Save: "Enregistrer",
    "Saving your file": "Enregistrement en cours",
    "Please fix the errors before saving.": "Corrigez les erreurs avant d’enregistrer.",
    "This field is required": "Ce champ est obligatoire",
    Required: "Obligatoire",
    Readonly: "Lecture seule",
    Edit: "Modifier",
    Rename: "Renommer",
    "Rename file": "Renommer le fichier",
    "Rename this file first?": "Renommer ce fichier d’abord ?",
    Renaming: "Renommage",
    "Create copy": "Dupliquer",
    Delete: "Supprimer",
    Remove: "Retirer",
    "Remove item": "Retirer l’élément",
    "Remove this item?": "Retirer cet élément ?",
    "Remove block": "Retirer le bloc",
    "Remove this block?": "Retirer ce bloc ?",
    "Choose content block:": "Choisir un bloc :",
    "Please select a block.": "Choisissez un bloc.",
    "Block style": "Style du bloc",
    "Are you sure?": "Vous êtes sûr ?",
    "Are you sure you want to delete this file?": "Voulez-vous vraiment supprimer ce fichier ?",
    "This action cannot be undone.": "Cette action est définitive.",
    Cancel: "Annuler",
    Close: "Fermer",
    Open: "Ouvrir",
    Select: "Choisir",
    Create: "Créer",
    "Creating...": "Création…",
    "See all changes": "Voir l’historique",
    "Generate new UUID": "Générer un nouvel identifiant",
    True: "Oui",
    False: "Non",
    "Maximum value is": "Valeur maximale :",
    "Field requires at least one item.": "Ajoutez au moins un élément.",
    "Invalid email": "Email invalide",
    "Invalid name": "Nom invalide",
    "Invalid file extension": "Extension de fichier non autorisée",
    "Columns:": "Colonnes :",
    "Rows:": "Lignes :",

    // Images et médias
    "Media not configured": "Médiathèque non configurée",
    "Media folder not found": "Dossier de médias introuvable",
    "No media folder is configured for this repository.": "Aucun dossier de médias n’est configuré pour ce dépôt.",
    Upload: "Importer",
    "Drop files here to upload": "Déposez les fichiers ici pour les importer",
    "Drag and drop files here, or use Upload to add files to this folder.":
      "Glissez-déposez des fichiers ici, ou cliquez sur Importer pour les ajouter à ce dossier.",
    "Select images": "Choisir des images",
    "Remove image": "Retirer l’image",
    "No image": "Aucune image",
    "Image alt text": "Description de l’image",
    "Describe image": "Décrire l’image",
    Picture: "Image",
    "Create a folder": "Créer un dossier",
    "Create folder": "Créer le dossier",
    "Creating folder": "Création du dossier",
    "Folder name is required.": "Le nom du dossier est obligatoire.",
    "Empty folder": "Dossier vide",
    Folder: "Dossier",
    File: "Fichier",
    "Create file": "Créer le fichier",

    // Pagination, chargement, erreurs
    Loading: "Chargement",
    "Loading...": "Chargement…",
    "Loading options...": "Chargement…",
    Next: "Suivant",
    Previous: "Précédent",
    "Go to next page": "Page suivante",
    "Go to previous page": "Page précédente",
    "Something went wrong": "Une erreur est survenue",
    "Try again": "Réessayer",
    "Page not found": "Page introuvable",
    "The page or resource you requested could not be found.": "La page demandée est introuvable.",
    "It may have been removed, renamed, or the URL may be incorrect.":
      "Elle a peut-être été supprimée, renommée, ou l’adresse est incorrecte.",
    "Access denied": "Accès refusé",
    "You do not have permission to access this repository.": "Vous n’avez pas accès à ce dépôt.",
    "Repository not found": "Dépôt introuvable",
    "Repository not configured": "Dépôt non configuré",
    "Configuration unavailable": "Configuration indisponible",
    "Check your settings": "Vérifiez les réglages",
    "Branch not found": "Branche introuvable",
    "No branches found.": "Aucune branche.",
    "No branches.": "Aucune branche.",
    "Search branches by name": "Rechercher une branche",
    "GitHub session expired": "Session GitHub expirée",
    "Waiting for the repository to be ready": "En attente du dépôt",
    "Unknown time": "Date inconnue",

    // Connexion
    "Sign in": "Se connecter",
    "Sign in to Pages CMS": "Connexion à Pages CMS",
    "Sign in with GitHub": "Se connecter avec GitHub",
    "Continue with email": "Continuer avec un email",
    "Sign in another way": "Se connecter autrement",
    "We sent you a sign-in code.": "Nous vous avons envoyé un code de connexion.",
    "Enter the 6-digit code.": "Saisissez le code à 6 chiffres.",
    "Verify your login": "Vérifiez votre connexion",
    "This code will expire in 5 minutes.": "Ce code expire dans 5 minutes.",
    "Unable to send sign-in code.": "Impossible d’envoyer le code.",
    "Unable to verify code.": "Code incorrect.",
    "Wrong account": "Mauvais compte",
    "Terms of Service": "Conditions d’utilisation",
    "Privacy Policy": "Politique de confidentialité",
    OR: "OU",
    Or: "Ou",
    or: "ou",
    "By clicking continue, you agree to our": "En continuant, vous acceptez nos",
    and: "et",

    // Collaborateurs
    "Invite collaborators": "Inviter des collaborateurs",
    "Invite collaborators to give them access to this repository.": "Invitez des collaborateurs pour leur donner accès à ce dépôt.",
    "No collaborators": "Aucun collaborateur",
    "Remove collaborator": "Retirer le collaborateur",
    "Resend invitation": "Renvoyer l’invitation",
    Email: "Email",

    // Actions GitHub
    "Run actions": "Lancer des actions",
    "Run again": "Relancer",
    "Cancel run": "Annuler l’exécution",
    "View all actions": "Voir toutes les actions",
    Pending: "En attente",
    Starting: "Démarrage",
    Succeeded: "Réussi",
    Failed: "Échec",
    Triggered: "Déclenché",
    "Triggered by": "Déclenché par",
  };

  // Textes avec une partie variable, et dates relatives (date-fns).
  const UNITES = { second: "seconde", minute: "minute", hour: "heure", day: "jour", week: "semaine", month: "mois", year: "an" };
  const pluriel = (u, n) => (n > 1 && u !== "mois" ? u + "s" : u);
  const MOTIFS = [
    [/^Uploading (.+)$/, (m) => `Import de ${m[1]}`],
    [/^Deleting (.+)$/, (m) => `Suppression de ${m[1]}`],
    [/^Creating (.+)\.\.\.$/, (m) => `Création de ${m[1]}…`],
    [/^Created (.+)\. Opening\.\.\.$/, (m) => `${m[1]} créé. Ouverture…`],
    [/^Opening (.+)\.\.\.$/, (m) => `Ouverture de ${m[1]}…`],
    [/^Minimum value is (.+)$/, (m) => `Valeur minimale : ${m[1]}`],
    [/^Maximum value is (.+)$/, (m) => `Valeur maximale : ${m[1]}`],
    [/^less than a minute ago$/, () => "il y a moins d’une minute"],
    [/^less than a minute$/, () => "moins d’une minute"],
    [
      /^(about |over |almost )?(\d+|a|an) (second|minute|hour|day|week|month|year)s? ago$/,
      (m) => {
        const n = /^\d+$/.test(m[2]) ? Number(m[2]) : 1;
        const u = UNITES[m[3]];
        const approx = m[1] ? (m[1].trim() === "over" ? "plus de " : m[1].trim() === "almost" ? "près de " : "environ ") : "";
        return `il y a ${approx}${n} ${pluriel(u, n)}`;
      },
    ],
    [/^in (\d+) (second|minute|hour|day)s?$/, (m) => `dans ${m[1]} ${pluriel(UNITES[m[2]], Number(m[1]))}`],
    [/^yesterday$/i, () => "hier"],
    [/^today$/i, () => "aujourd’hui"],
  ];

  const traduire = (texte) => {
    const t = texte.trim();
    if (!t || !/[a-z]/i.test(t)) return null;
    let fr = FR[t];
    if (fr === undefined) {
      for (const [re, f] of MOTIFS) {
        const m = t.match(re);
        if (m) {
          fr = f(m);
          break;
        }
      }
    }
    if (fr === undefined || fr === t) return null;
    return texte.replace(t, fr);
  };

  // Ne jamais toucher au contenu saisi par l'utilisateur.
  const IGNORER = ".ProseMirror, [contenteditable], textarea, input, select, code, pre, .cm-editor, .monaco-editor";
  const ATTRIBUTS = ["placeholder", "title", "aria-label"];

  const traiterTexte = (n) => {
    if (n.parentElement?.closest(IGNORER)) return;
    const fr = traduire(n.nodeValue);
    if (fr !== null) n.nodeValue = fr;
  };

  const traiterElement = (el) => {
    if (el.closest?.(".ProseMirror, [contenteditable], .cm-editor")) return;
    for (const a of ATTRIBUTS) {
      const v = el.getAttribute?.(a);
      if (v) {
        const fr = traduire(v);
        if (fr !== null) el.setAttribute(a, fr);
      }
    }
  };

  const parcourir = (racine) => {
    if (racine.nodeType === Node.TEXT_NODE) return traiterTexte(racine);
    if (racine.nodeType !== Node.ELEMENT_NODE) return;
    traiterElement(racine);
    racine.querySelectorAll?.("[placeholder],[title],[aria-label]").forEach(traiterElement);
    const w = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) traiterTexte(n);
  };

  const demarrer = () => {
    document.documentElement.lang = "fr";
    parcourir(document.body);
    new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "characterData") traiterTexte(m.target);
        else if (m.type === "attributes") traiterElement(m.target);
        else m.addedNodes.forEach(parcourir);
      }
    }).observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRIBUTS,
    });
  };

  if (document.body) demarrer();
  else document.addEventListener("DOMContentLoaded", demarrer);
})();
