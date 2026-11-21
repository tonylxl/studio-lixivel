/*
 * Dictée vocale d'une fiche projet dans Pages CMS.
 *
 * Un panneau « Dicter le projet » s'affiche en haut du formulaire Projets (ajout et modification).
 * On clique sur le micro, puis on parle :
 *   - mode guidé : le panneau propose les champs un par un ; ce qu'on dit remplit le champ en cours,
 *     « suivant » / « précédent » pour avancer ou revenir, « efface » pour vider le champ ;
 *   - mode libre : une phrase qui commence par le nom d'un champ va directement dans ce champ,
 *     ex. « ville Rouen, année 2024, surface 80 mètres carrés » remplit les trois champs d'un coup.
 * Cliquer dans un champ pendant la dictée en fait le champ en cours.
 *
 * Reconnaissance vocale : celle de Chrome (webkitSpeechRecognition, gratuite, sans clé). Le son est
 * transcrit par Google ; rien d'autre n'est lu ni envoyé, et rien n'est enregistré sans le bouton
 * « Enregistrer » de Pages CMS.
 *
 * Les champs sont repérés par leur libellé (« label » dans .pages.yml), comme dans aides.js :
 * si un libellé change là-bas, le changer aussi dans CHAMPS.
 */
(() => {
  const Reconnaissance = window.SpeechRecognition || window.webkitSpeechRecognition;

  // ---------- Les champs dictables, dans l'ordre du formulaire ----------
  // label : libellé du champ ; parent : libellé du bloc qui le contient (photo avant, avis…) ;
  // mots : ce qu'on peut dire pour aller dans ce champ ; type : court | long (on ajoute à la suite) | liste | choix ;
  // format : mise en forme de ce qui a été dit.
  const FORMULES = ["Agencement & conseils à distance", "Agencement & décoration", "Prestation semi-complète", "Prise en charge complète"];
  const COULEURS = { rose: "rose", sauge: "sauge", vert: "sauge", moutarde: "moutarde", jaune: "moutarde", lin: "lin", beige: "lin", doux: "doux", creme: "doux", blanc: "doux", ardoise: "ardoise", bleu: "ardoise" };

  // ---------- Petits outils de texte ----------
  const sansAccent = (c) => {
    const s = c.normalize("NFD").replace(/[̀-ͯ]/g, "");
    return s.length === 1 ? s : c;
  };
  // Même longueur que le texte d'origine (pour découper le texte original aux mêmes positions).
  const plat = (t) => Array.from(t.toLowerCase()).map(sansAccent).join("").replace(/[’']/g, "'");
  const normaliser = (t) => (t || "").replace(/'/g, "’").replace(/\s+/g, " ").trim();
  const majuscule = (t) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : t);
  const titreVille = (t) => t.replace(/[.!?]+$/, "").replace(/(^|[\s-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase()).replace(/\b(Sur|En|De|Du|La|Le|Les|Et)\b(?!$)/g, (m) => m.toLowerCase()).replace(/^./, (c) => c.toUpperCase());
  const insec = (t) => t.replace(/ ([:;!?])/g, " $1");
  const m2 = (t) => t.replace(/(\d)\s*(m(e|è)tres?\s*carr(e|é)s?|m\s?2|m²)/gi, "$1 m²");
  const milliers = (n) => n.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Ponctuation dictée (« virgule », « point »…) et majuscules en début de phrase.
  const phrase = (t) => {
    let s = " " + t + " ";
    const regles = [
      [/\s+point d'interrogation\b/gi, " ?"],
      [/\s+point d'exclamation\b/gi, " !"],
      [/\s+points de suspension\b/gi, "…"],
      [/\s+deux points\b/gi, " :"],
      [/\s+point[- ]virgule\b/gi, " ;"],
      [/\s+virgule\b/gi, ","],
      [/\s+(point )?(a|à) la ligne\b/gi, ".\n"],
      [/\s+point final\b/gi, "."],
      [/\s+point(?=\s*$)/gi, "."],
      // « point » au milieu : ponctuation, sauf s'il s'agit du nom (« un point de vue », « le point important »).
      [/(^|\s)(\S+)\s+point(?=\s+(?!(de|d'|d’|du|des)\s))/giu, (m, a, avant) =>
        /^(un|le|ce|au|du|mon|ton|son|notre|votre|leur|premier|dernier|bon|seul|quel|chaque|tout|a|à|en)$/i.test(avant) ? m : `${a}${avant}.`],
      [/\s+ouvrez les guillemets\s+/gi, " « "],
      [/\s+fermez les guillemets\b/gi, " »"],
    ];
    for (const [re, r] of regles) s = s.replace(re, r);
    s = s.replace(/\s+([,.…])/g, "$1").replace(/[ \t]+/g, " ").trim();
    s = s.replace(/(^|[.!?…]\s+|\n)(\p{Ll})/gu, (m, a, b) => a + b.toUpperCase());
    return insec(m2(s));
  };

  const NOMBRES = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10, onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, trente: 30, quarante: 40, cinquante: 50, soixante: 60 };
  const annee = (t) => {
    const chiffres = t.match(/\b(19|20)\d{2}\b/);
    if (chiffres) return chiffres[0];
    const p = plat(t).replace(/-/g, " ").split(/\s+/);
    const i = p.indexOf("mille");
    if (i < 0) return t.trim();
    let total = (NOMBRES[p[i - 1]] || 1) * 1000;
    for (const mot of p.slice(i + 1)) {
      if (mot === "cent") total += 100;
      else if (mot === "et") continue;
      else if (NOMBRES[mot]) total += NOMBRES[mot];
    }
    return String(total);
  };
  const couleur = (t) => {
    for (const mot of plat(t).split(/[^a-z]+/)) if (COULEURS[mot]) return COULEURS[mot];
    return null;
  };
  const formule = (t) => {
    const p = plat(t);
    if (/semi/.test(p)) return FORMULES[2];
    if (/complet/.test(p)) return FORMULES[3];
    if (/deco/.test(p)) return FORMULES[1];
    if (/conseil/.test(p)) return FORMULES[0];
    return majuscule(t);
  };
  const budget = (t) => {
    let s = t.replace(/\s*(euros?|€)/gi, " €").replace(/(\d)[\s .](?=\d{3}\b)/g, "$1");
    s = s.replace(/\d{4,}/g, milliers).replace(/(\d)\s€/g, "$1 €");
    return s.trim();
  };

  const CHAMPS = [
    { label: "Nom du projet", mots: ["nom du projet", "titre"], dire: "Le nom court du projet, ex. « Studio 30 m² ».", format: (t) => majuscule(m2(t)) },
    { label: "Sous-titre", mots: ["sous-titre", "sous titre"], dire: "Le type de travaux, ex. « Rénovation complète ».", format: (t) => majuscule(t) },
    { label: "Ville", mots: ["ville"], dire: "Juste la ville, ex. « Rouen ».", format: (t) => titreVille(t) },
    { label: "Lieu (sur la fiche)", mots: ["lieu"], dire: "Le lieu précis, ex. « Bois-Guillaume, Normandie ».", format: (t) => titreVille(t) },
    { label: "Année", mots: ["annee"], dire: "L’année de fin du projet, ex. « 2025 ».", format: annee },
    { label: "Couleur de la page", mots: ["couleur"], type: "choix", dire: "Rose, sauge, moutarde, lin, doux ou ardoise.", format: couleur },
    { label: "Ce qu’on voit sur la photo principale", mots: ["description de la photo", "photo principale"], dire: "Décris la photo en une phrase, ex. « Bureau en bois sous une fenêtre ».", format: phrase },
    { label: "Surface", mots: ["surface"], dire: "Avec l’unité, ex. « 30 mètres carrés ».", format: (t) => m2(t) },
    { label: "Formule", mots: ["formule"], dire: "Conseils, décoration, semi-complète ou complète.", format: formule },
    { label: "Durée", mots: ["duree"], dire: "Ex. « 4 mois dont 6 semaines de travaux ».", format: (t) => majuscule(t) },
    { label: "Budget indicatif", mots: ["budget"], dire: "Ex. « 25 000 euros travaux et mobilier ».", format: budget },
    { label: "Le brief", mots: ["le brief", "brief"], type: "long", dire: "Ce que voulait le client, en 2 ou 3 phrases. Dis « point » ou « virgule » pour la ponctuation.", format: phrase },
    { label: "Contraintes", mots: ["contrainte", "contraintes"], type: "liste", dire: "Une contrainte par phrase, ex. « Une seule fenêtre, plein nord ».", format: phrase },
    { label: "Légende", parent: "Photo avant", nom: "Légende de la photo avant", mots: ["legende avant", "photo avant", "avant"], type: "long", dire: "L’état de départ, ex. « Une cloison qui coupait la lumière ».", format: phrase },
    { label: "Légende", parent: "Photo après", nom: "Légende de la photo après", mots: ["legende apres", "photo apres", "apres"], type: "long", dire: "Ce qui a changé, ex. « Cloison supprimée, bureau sur mesure ».", format: phrase },
    { label: "Ce qu’a dit le client", parent: "Avis du client", nom: "Avis du client", mots: ["avis du client", "avis"], type: "long", dire: "Ce qu’a dit le client, sans guillemets.", format: phrase },
    { label: "Prénom", parent: "Avis du client", nom: "Prénom du client", mots: ["prenom"], dire: "Le prénom seul, ex. « Clara ».", format: (t) => titreVille(t) },
    { label: "Projet en quelques mots", parent: "Avis du client", nom: "Projet en quelques mots", mots: ["contexte"], dire: "Ex. « Studio 30 m² · Rouen ».", format: (t) => majuscule(m2(t)) },
  ];

  // ---------- Repérer les champs dans le formulaire ----------
  const libelle = (item) => normaliser(item.querySelector(":scope label, label")?.textContent);
  const items = () => Array.from(document.querySelectorAll('#entry-form [data-slot="form-item"]'));
  const premierNiveau = (item) => !item.parentElement?.closest('[data-slot="form-item"]');

  const trouverItem = (champ) => {
    if (!champ.parent) return items().find((i) => premierNiveau(i) && libelle(i) === champ.label) || null;
    const bloc = items().find((i) => premierNiveau(i) && libelle(i) === champ.parent);
    if (!bloc) return null;
    return Array.from(bloc.querySelectorAll('[data-slot="form-item"]')).find((i) => libelle(i) === champ.label) || null;
  };

  const champDeItem = (item) => CHAMPS.find((c) => trouverItem(c) === item);

  const saisie = (item) => item.querySelector("textarea, input:not([type=hidden]):not([type=checkbox]):not([type=file]), [contenteditable=true]");

  // Écrire dans un champ géré par React : passer par le « setter » natif puis signaler la saisie.
  const ecrire = (el, valeur) => {
    if (el.isContentEditable) {
      el.focus();
      document.execCommand("selectAll");
      document.execCommand("insertText", false, valeur);
      return;
    }
    const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(el, valeur);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const pause = (ms) => new Promise((r) => setTimeout(r, ms));
  const cliquer = (el) => {
    for (const type of ["pointerdown", "mousedown", "pointerup", "mouseup", "click"]) {
      const E = type.startsWith("pointer") ? PointerEvent : MouseEvent;
      el.dispatchEvent(new E(type, { bubbles: true, cancelable: true, button: 0, pointerType: "mouse" }));
    }
  };

  // Liste déroulante : <select> natif, ou liste « shadcn » (bouton + options dans une fenêtre).
  const choisir = async (item, valeur) => {
    const select = item.querySelector("select");
    if (select) {
      const opt = Array.from(select.options).find((o) => plat(o.textContent.trim()) === valeur || o.value === valeur);
      if (!opt) return false;
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value").set.call(select, opt.value);
      select.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    }
    const bouton = item.querySelector('[role="combobox"], button');
    if (!bouton) return false;
    cliquer(bouton);
    await pause(200);
    const option = Array.from(document.querySelectorAll('[role="option"]')).find((o) => plat(o.textContent.trim()) === valeur);
    if (option) {
      cliquer(option);
      return true;
    }
    // Liste avec zone de recherche (taper puis Entrée).
    const recherche = item.querySelector("input") || document.activeElement;
    if (recherche instanceof HTMLInputElement) {
      ecrire(recherche, valeur);
      await pause(150);
      recherche.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      return true;
    }
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    return false;
  };

  // Liste de textes (Contraintes) : remplir la dernière ligne vide, sinon cliquer « Ajouter un élément ».
  const ajouterALaListe = async (item, valeur) => {
    const vide = () => Array.from(item.querySelectorAll("input:not([type=hidden]), textarea")).find((e) => !e.value);
    let cible = vide();
    if (!cible) {
      const bouton = Array.from(item.querySelectorAll("button")).find((b) => /ajouter|add/i.test(b.textContent));
      if (!bouton) return false;
      bouton.click();
      await pause(200);
      cible = vide();
    }
    if (!cible) return false;
    ecrire(cible, valeur);
    return true;
  };

  // ---------- Comprendre une phrase ----------
  const COMMANDES = [
    { re: /^(champ )?suivant$|^ensuite$|^passe$|^on passe$/, action: "suivant" },
    { re: /^(champ )?precedent$|^retour$|^reviens$/, action: "precedent" },
    { re: /^efface(r)?( tout| le champ)?$|^recommence$/, action: "effacer" },
    { re: /^(arrete|stop|termine|fin)( la dictee)?$/, action: "stop" },
  ];

  // Mots-clés de tous les champs, les plus longs d'abord (« photo avant » avant « avant »).
  const MOTS = CHAMPS.flatMap((c) => c.mots.map((m) => ({ mot: m, champ: c }))).sort((a, b) => b.mot.length - a.mot.length);
  const LIAISON = /^\s*(:|,|est|c'est|sera|de|d'|du|en|=)?\s*/;

  // Découpe « ville Rouen année 2024 surface 80 m² » en [ville → Rouen], [année → 2024], [surface → 80 m²].
  // Seulement si la phrase commence par un mot-clé ; un champ long (brief, légendes, avis) prend toute la suite.
  const decouper = (texte) => {
    const p = plat(texte);
    const debut = p.match(/^\s*(le |la |l'|les )?/)[0].length;
    const trouverA = (pos) => MOTS.find(({ mot }) => p.startsWith(mot, pos) && !/[a-z0-9]/.test(p.charAt(pos + mot.length) || " "));
    if (!trouverA(debut)) return null;
    const morceaux = [];
    let pos = debut;
    while (pos < p.length) {
      const m = trouverA(pos);
      const finMot = pos + m.mot.length;
      const liaison = p.slice(finMot).match(LIAISON)[0].length;
      let fin = p.length;
      if (m.champ.type !== "long") {
        for (let i = finMot + liaison; i < p.length; i++) {
          if (/[\s,]/.test(p[i - 1] || " ")) {
            const art = p.slice(i).match(/^(le |la |l'|les )?/)[0].length;
            if (trouverA(i + art)) {
              fin = i;
              break;
            }
          }
        }
      }
      const valeur = texte.slice(finMot + liaison, fin).replace(/[\s,]+$/, "").replace(/\s+(le|la|les|l')$/i, "");
      morceaux.push({ champ: m.champ, valeur });
      if (fin >= p.length) break;
      pos = fin + p.slice(fin).match(/^(le |la |l'|les )?/)[0].length;
    }
    return morceaux;
  };

  // ---------- Le panneau ----------
  let panneau = null;
  let reco = null;
  let ecoute = false;
  let courant = 0;
  let file = Promise.resolve(); // les phrases sont traitées une par une, dans l’ordre

  const champCourant = () => CHAMPS[courant];
  const nomChamp = (c) => c.nom || c.label;

  const surligner = (defiler = true) => {
    document.querySelectorAll(".lx-dictee-actif").forEach((e) => e.classList.remove("lx-dictee-actif"));
    const c = champCourant();
    const item = trouverItem(c);
    panneau.querySelector(".lx-dictee__champ").textContent = nomChamp(c);
    panneau.querySelector(".lx-dictee__dire").textContent = item ? c.dire : "Ce champ est introuvable sur la page : dis « suivant ».";
    panneau.querySelector(".lx-dictee__position").textContent = `${courant + 1} / ${CHAMPS.length}`;
    if (!item) return;
    item.classList.add("lx-dictee-actif");
    if (defiler) {
      const haut = item.getBoundingClientRect().top + window.scrollY - panneau.offsetHeight - 40;
      window.scrollTo({ top: haut, behavior: "smooth" });
    }
  };

  const message = (texte, type = "") => {
    const el = panneau.querySelector(".lx-dictee__message");
    el.textContent = texte;
    el.dataset.type = type;
  };

  const aller = (i) => {
    courant = (i + CHAMPS.length) % CHAMPS.length;
    surligner();
  };

  const remplir = async (champ, brut) => {
    const item = trouverItem(champ);
    if (!item) return message(`Je ne trouve pas le champ « ${nomChamp(champ)} » sur la page.`, "erreur");
    let valeur = champ.format ? champ.format(brut.trim()) : brut.trim();
    if (!valeur) return message(`Je n’ai pas compris la valeur pour « ${nomChamp(champ)} ».`, "erreur");

    if (champ.type === "choix") {
      const ok = await choisir(item, valeur);
      return ok ? message(`${nomChamp(champ)} : ${valeur}`, "ok") : message(`Choisis « ${valeur} » dans la liste à la main.`, "erreur");
    }
    if (champ.type === "liste") {
      const ok = await ajouterALaListe(item, valeur);
      return ok ? message(`Contrainte ajoutée : ${valeur}`, "ok") : message("Je n’arrive pas à ajouter la ligne : clique sur « Ajouter un élément ».", "erreur");
    }
    const el = saisie(item);
    if (!el) return message(`Je ne trouve pas où écrire dans « ${nomChamp(champ)} ».`, "erreur");
    const avant = el.isContentEditable ? el.textContent : el.value;
    if (champ.type === "long" && avant.trim()) valeur = avant.trim() + (/[.!?…]$/.test(avant.trim()) ? " " : ". ") + majuscule(valeur);
    if (el.type === "number") valeur = valeur.replace(/[^\d.,-]/g, "");
    ecrire(el, valeur);
    message(`${nomChamp(champ)} : ${valeur}`, "ok");
  };

  const effacer = () => {
    const item = trouverItem(champCourant());
    const el = item && saisie(item);
    if (!el) return;
    ecrire(el, "");
    message(`« ${nomChamp(champCourant())} » est vidé.`, "ok");
  };

  const traiter = async (texte) => {
    const p = plat(texte).replace(/[.!?,]+$/, "").trim();
    const commande = COMMANDES.find((c) => c.re.test(p));
    if (commande) {
      if (commande.action === "suivant") aller(courant + 1);
      else if (commande.action === "precedent") aller(courant - 1);
      else if (commande.action === "effacer") effacer();
      else if (commande.action === "stop") arreter();
      return;
    }
    // « aller à la surface », « champ budget » : changer de champ sans rien écrire.
    const saut = p.match(/^(va|aller|passe|on passe|champ)( a| au| a la| aux)?\s+(.*)$/);
    if (saut) {
      const cible = MOTS.find(({ mot }) => saut[3].replace(/^(le |la |l'|les )/, "") === mot);
      if (cible) return aller(CHAMPS.indexOf(cible.champ));
    }
    const morceaux = decouper(texte);
    if (morceaux) {
      for (const { champ, valeur } of morceaux) {
        courant = CHAMPS.indexOf(champ);
        if (valeur) await remplir(champ, valeur);
      }
      const dernier = morceaux[morceaux.length - 1];
      // Un champ court rempli : on passe au suivant. Un champ long ou une liste : on y reste.
      if (dernier.valeur && !["long", "liste"].includes(dernier.champ.type)) courant++;
      courant = Math.min(courant, CHAMPS.length - 1);
      surligner(true);
      return;
    }
    // Mode guidé : la phrase va dans le champ en cours.
    const c = champCourant();
    await remplir(c, texte);
    if (["long", "liste"].includes(c.type)) return;
    if (courant < CHAMPS.length - 1) aller(courant + 1);
    else message("C’était le dernier champ. Relis la fiche, puis clique sur « Enregistrer ».", "ok");
  };

  const majBouton = () => {
    const b = panneau.querySelector(".lx-dictee__micro");
    b.dataset.ecoute = ecoute ? "oui" : "non";
    b.querySelector("span").textContent = ecoute ? "Arrêter la dictée" : "Commencer la dictée";
    panneau.classList.toggle("lx-dictee--ecoute", ecoute);
  };

  const demarrer = () => {
    if (!Reconnaissance) return message("Ce navigateur ne propose pas la dictée : utilise Google Chrome.", "erreur");
    reco = new Reconnaissance();
    reco.lang = "fr-FR";
    reco.continuous = true;
    reco.interimResults = true;
    reco.onresult = (e) => {
      let provisoire = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          const t = r[0].transcript.trim();
          file = file.then(() => traiter(t)).catch(() => {});
        }
        else provisoire += r[0].transcript;
      }
      panneau.querySelector(".lx-dictee__direct").textContent = provisoire;
    };
    reco.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        ecoute = false;
        majBouton();
        message("Le micro est bloqué : clique sur le cadenas à gauche de l’adresse, autorise le micro, puis recharge la page.", "erreur");
      } else if (e.error === "audio-capture") {
        message("Aucun micro trouvé : vérifie qu’il est branché.", "erreur");
      }
    };
    // Chrome coupe l'écoute après un silence : on relance tant que la dictée est active.
    reco.onend = () => {
      if (ecoute) setTimeout(() => ecoute && reco.start(), 250);
    };
    ecoute = true;
    reco.start();
    majBouton();
    surligner();
    message("Je t’écoute. Dis ce qu’il faut écrire dans le champ entouré.", "");
  };

  const arreter = () => {
    ecoute = false;
    reco?.stop();
    majBouton();
    panneau.querySelector(".lx-dictee__direct").textContent = "";
    document.querySelectorAll(".lx-dictee-actif").forEach((e) => e.classList.remove("lx-dictee-actif"));
    message("Dictée arrêtée. Relis la fiche, puis clique sur « Enregistrer ».", "ok");
  };

  const creerPanneau = () => {
    const el = document.createElement("div");
    el.className = "lx-dictee";
    el.dataset.lxCle = "dictee";
    el.innerHTML = `
      <div class="lx-dictee__haut">
        <button type="button" class="lx-dictee__micro" data-ecoute="non">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2Z"/></svg>
          <span>Commencer la dictée</span>
        </button>
        <div class="lx-dictee__texte">
          <p class="lx-dictee__titre">Dicter le projet</p>
          <p class="lx-dictee__intro">Clique sur le micro et parle : je remplis la fiche pour toi.</p>
        </div>
      </div>
      <div class="lx-dictee__guide">
        <div class="lx-dictee__ligne">
          <p><span class="lx-dictee__position"></span> · Champ en cours : <b class="lx-dictee__champ"></b></p>
          <div class="lx-dictee__nav">
            <button type="button" data-action="precedent">‹ Précédent</button>
            <button type="button" data-action="effacer">Effacer</button>
            <button type="button" data-action="suivant">Suivant ›</button>
          </div>
        </div>
        <p class="lx-dictee__dire"></p>
        <p class="lx-dictee__direct" aria-live="polite"></p>
        <p class="lx-dictee__message" aria-live="polite"></p>
      </div>
      <details class="lx-dictee__aide">
        <summary>Ce que tu peux dire</summary>
        <ul>
          <li>Ce qu’il faut écrire dans le champ entouré, puis attends une seconde : je passe tout seul au champ suivant.</li>
          <li>« <b>Suivant</b> », « <b>Précédent</b> » pour changer de champ, « <b>Efface</b> » pour le vider, « <b>Stop</b> » pour arrêter.</li>
          <li>Le nom d’un champ, puis sa valeur : « <b>ville</b> Rouen, <b>année</b> 2024, <b>surface</b> 80 mètres carrés ». Ça marche dans n’importe quel ordre.</li>
          <li>Pour le brief et les légendes, parle en plusieurs fois : chaque phrase s’ajoute à la suite. Dis « virgule », « point » ou « à la ligne ».</li>
          <li>Les photos, elles, s’ajoutent toujours à la main.</li>
          <li>Rien n’est publié tant que tu n’as pas cliqué sur « Enregistrer ».</li>
        </ul>
      </details>`;
    el.querySelector(".lx-dictee__micro").addEventListener("click", () => (ecoute ? arreter() : demarrer()));
    el.querySelector(".lx-dictee__nav").addEventListener("click", (e) => {
      const a = e.target.closest("button")?.dataset.action;
      if (a === "suivant") aller(courant + 1);
      else if (a === "precedent") aller(courant - 1);
      else if (a === "effacer") effacer();
    });
    return el;
  };

  // Cliquer dans un champ pendant la dictée en fait le champ en cours.
  document.addEventListener("focusin", (e) => {
    if (!ecoute || !panneau || panneau.contains(e.target)) return;
    const item = e.target.closest?.('[data-slot="form-item"]');
    const champ = item && champDeItem(item);
    if (champ) {
      courant = CHAMPS.indexOf(champ);
      surligner(false);
    }
  });

  // ---------- Afficher le panneau sur les fiches Projets ----------
  const surFicheProjet = () => {
    const p = location.pathname.split("/").filter(Boolean);
    const i = p.indexOf("collection");
    return i >= 0 && p[i + 1] === "projets" && (p[i + 2] === "new" || p[i + 2] === "edit");
  };

  const appliquer = () => {
    const form = document.getElementById("entry-form");
    if (!surFicheProjet() || !form) {
      if (panneau) {
        if (ecoute) arreter();
        panneau.remove();
        panneau = null;
      }
      return;
    }
    if (panneau && form.contains(panneau)) return;
    panneau = creerPanneau();
    const bandeau = form.querySelector(':scope > .lx-bandeau');
    if (bandeau) bandeau.after(panneau);
    else form.prepend(panneau);
    courant = 0;
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

  const lancer = () => {
    appliquer();
    new MutationObserver(planifier).observe(document.body, { subtree: true, childList: true });
  };
  if (document.body) lancer();
  else document.addEventListener("DOMContentLoaded", lancer);

  // Accès aux fonctions pour les tester depuis la console de la page.
  window.__lxDictee = { decouper, phrase, annee, budget, couleur, formule, m2, traiter };
})();
