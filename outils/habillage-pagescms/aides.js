/*
 * Aides pour remplir le site : un bandeau « mode d'emploi » en haut des collections et des formulaires,
 * et des intertitres numérotés qui découpent les longs formulaires (Projets, Blog).
 * Les champs sont repérés par leur libellé (« label » dans .pages.yml) : si un libellé change là-bas,
 * le changer aussi ici. Aucune donnée n'est lue ni envoyée.
 */
(() => {
  const SITE = "https://studio-lixivel.vercel.app";

  // Bandeaux : `liste` = page qui liste les contenus, `fiche` = formulaire d'un contenu.
  const BANDEAUX = {
    projets: {
      liste: {
        titre: "Les projets du studio",
        etapes: [
          "Pour compléter une fiche : clique sur le nom du projet.",
          "Pour ajouter un projet : bouton « Ajouter un contenu » en haut à droite.",
          `Le résultat : <a href="${SITE}/projets" target="_blank" rel="noopener">la page Projets du site</a>.`,
        ],
      },
      fiche: {
        titre: "Remplir une fiche projet",
        etapes: [
          "Avance de haut en bas, section par section. Seuls le nom, l’année et la photo principale sont obligatoires.",
          "Une case vide n’apparaît pas sur le site : tu peux compléter la fiche en plusieurs fois.",
          "Clique sur « Enregistrer » (en haut à droite) régulièrement. Le site se met à jour environ 1 minute après.",
        ],
      },
    },
    journal: {
      liste: {
        titre: "Les articles du blog",
        etapes: [
          "Du plus récent au plus ancien. La colonne « Brouillon » indique ceux qui ne sont pas encore publiés.",
          "Pour écrire un article : bouton « Ajouter un contenu » en haut à droite.",
          `Pour relire tous les brouillons comme sur le site : <a href="${SITE}/apercu" target="_blank" rel="noopener">la page Aperçu</a>.`,
        ],
      },
      fiche: {
        titre: "Écrire ou relire un article",
        etapes: [
          "Un article reste invisible sur le site tant que la case « Brouillon » est cochée : pas de risque à enregistrer.",
          `Relis-le sur <a href="${SITE}/apercu" target="_blank" rel="noopener">la page Aperçu</a> (environ 1 minute après avoir enregistré).`,
          "Pour le publier : décoche « Brouillon », puis « Enregistrer ».",
        ],
      },
    },
    reels: {
      liste: {
        titre: "Transformer un réel en article",
        etapes: [
          "Bouton « Ajouter un contenu », colle le lien du réel, ajoute des consignes si besoin, puis « Enregistrer ».",
          "Tony lance la transformation : l’article arrive dans Blog, en brouillon.",
          "Il ne reste qu’à le relire et le publier.",
        ],
      },
      fiche: {
        titre: "Déposer un réel",
        etapes: [
          "Sur Instagram : ⋯ sous le réel, puis « Copier le lien ». Colle-le ci-dessous.",
          "Laisse le statut sur « à traiter », puis « Enregistrer ».",
        ],
      },
    },
  };

  // Intertitres : libellé du premier champ de la section → titre et phrase d'explication.
  const SECTIONS = {
    projets: {
      "Nom du projet": ["1. L’essentiel", "Ce qui s’affiche sur la page Projets, sous la photo."],
      "Photo principale": ["2. La photo principale", "Elle représente le projet partout sur le site."],
      Surface: ["3. Le tableau de la fiche", "Les chiffres du projet. Une ligne vide n’apparaît pas."],
      "Le brief": ["4. Le brief", "La demande du client et les difficultés du projet."],
      "Photo avant": ["5. Avant / après", "Le curseur qu’on fait glisser entre les deux photos."],
      "Plan initial (avant le projet)": ["6. Du plan au réalisé", "Jusqu’à 4 images. Une image vide n’apparaît pas."],
      "Galerie de photos": ["7. La galerie", "Les photos du projet terminé."],
      "Liste shopping": ["8. La liste shopping", "Les meubles et objets choisis, avec leur prix."],
      "Avis du client": ["9. L’avis du client", "Facultatif."],
    },
    journal: {
      "Titre de l’article": ["1. L’essentiel", "Titre, rubrique et date."],
      "Brouillon (pas encore publié)": ["2. Publication", "Quand et comment l’article apparaît sur le site."],
      "Photo de couverture": ["3. La photo de couverture", "La grande photo en haut de l’article."],
      Introduction: ["4. Le texte", "L’introduction, puis l’article lui-même."],
      "Sélection de produits": ["5. En plus", "Facultatif : produits conseillés, réel Instagram, mots-clés."],
      "Titre pour Google": ["6. Pour Google", "Facultatif : le plus souvent, laisse vide, tout est repris automatiquement."],
    },
  };

  // URL de Pages CMS : /{compte}/{dépôt}/{branche}/collection/{nom}[/new | /edit/{fichier}]
  const route = () => {
    const p = location.pathname.split("/").filter(Boolean);
    const i = p.indexOf("collection");
    if (i < 0 || !p[i + 1]) return null;
    return { nom: p[i + 1], vue: p[i + 2] === "new" || p[i + 2] === "edit" ? "fiche" : "liste" };
  };

  const normaliser = (t) => (t || "").replace(/'/g, "’").replace(/\s+/g, " ").trim();

  const creerBandeau = ({ titre, etapes }, cle) => {
    const el = document.createElement("div");
    el.className = "lx-aide lx-bandeau";
    el.dataset.lxCle = cle;
    el.innerHTML = `<p class="lx-bandeau__titre">${titre}</p><ol>${etapes.map((e) => `<li>${e}</li>`).join("")}</ol>`;
    return el;
  };

  const creerSection = ([titre, texte], cle) => {
    const el = document.createElement("div");
    el.className = "lx-aide lx-section";
    el.dataset.lxCle = cle;
    el.innerHTML = `<p class="lx-section__titre">${titre}</p><p class="lx-section__texte">${texte}</p>`;
    return el;
  };

  const appliquer = () => {
    const r = route();
    const cleRoute = r ? `${r.nom}:${r.vue}` : "";

    // Retirer les aides d'une page précédente (navigation sans rechargement).
    document.querySelectorAll(".lx-aide").forEach((el) => {
      if (!el.dataset.lxCle.startsWith(cleRoute + "|") || !cleRoute) el.remove();
    });
    if (!r) return;

    const bandeau = BANDEAUX[r.nom]?.[r.vue];
    if (r.vue === "fiche") {
      const form = document.getElementById("entry-form");
      if (!form) return;
      const cle = `${cleRoute}|bandeau`;
      if (bandeau && !form.querySelector(`:scope > [data-lx-cle="${cle}"]`)) form.prepend(creerBandeau(bandeau, cle));

      const sections = SECTIONS[r.nom];
      if (!sections) return;
      form.querySelectorAll('[data-slot="form-item"]').forEach((item) => {
        // Seulement les champs de premier niveau (pas les sous-champs d'une galerie, d'un objet…).
        if (item.parentElement?.closest('[data-slot="form-item"]')) return;
        const label = normaliser(item.querySelector("label")?.textContent);
        const section = sections[label];
        if (!section) return;
        const cleS = `${cleRoute}|${label}`;
        const prec = item.previousElementSibling;
        if (prec?.dataset?.lxCle === cleS) return;
        item.before(creerSection(section, cleS));
      });
    } else if (bandeau) {
      const cle = `${cleRoute}|bandeau`;
      if (document.querySelector(`[data-lx-cle="${cle}"]`)) return;
      const table = document.querySelector('[data-slot="table-container"]');
      if (table) table.before(creerBandeau(bandeau, cle));
    }
  };

  let prevu = false;
  const planifier = () => {
    if (prevu) return;
    prevu = true;
    requestAnimationFrame(() => {
      prevu = false;
      appliquer();
    });
  };

  const demarrer = () => {
    appliquer();
    new MutationObserver(planifier).observe(document.body, { subtree: true, childList: true });
  };

  if (document.body) demarrer();
  else document.addEventListener("DOMContentLoaded", demarrer);
})();
