/**
 * Studio Lixivel · suivi des demandes
 *
 * Tally écrit chaque réponse au questionnaire dans ce Google Sheet (intégration native de Tally).
 * Toutes les 5 minutes, ce script traite les nouvelles lignes :
 *   1. calcule le prix « à partir de » (surface × tarif de base de la formule, arrondi à 10 €),
 *   2. met la demande au statut « À rappeler »,
 *   3. envoie un mail à contact@ avec le résumé et une réponse prête à compléter
 *      (« Répondre » dans la boîte mail répond directement au client).
 *
 * Installation : voir docs/suivi-demandes.md (coller ce fichier dans Extensions → Apps Script,
 * puis exécuter une fois la fonction `installer`).
 *
 * Tarifs : à garder alignés avec data/services.ts (validés par Cindy le 8 oct. 2026).
 */

const CONFIG = {
  /** Adresse qui reçoit la notification de chaque nouvelle demande. */
  notifier: "contact@studiolixivel.com",
  /** Page de réservation de l'appel de lancement (vide tant que Cal.com n'est pas prêt). */
  rdv: "",
  /** Statuts proposés dans la colonne « Statut » (liste déroulante). */
  statuts: ["À rappeler", "Fourchette envoyée", "Devis envoyé", "Signé", "Sans suite"],
};

const TARIFS = {
  conseils: { nom: "Agencement & conseils", parM2: 35 },
  decoration: { nom: "Agencement & décoration", parM2: 55 },
  "semi-complete": { nom: "Prestation semi-complète", parM2: 90 },
  complete: { nom: "Prise en charge complète", forfait: 5000 },
};

/** Colonnes ajoutées par le script, à droite de celles de Tally. */
const COL = {
  prix: "À partir de (€)",
  statut: "Statut",
  notes: "Notes",
  notifie: "Notifié le",
};

/** Colonnes de Tally qu'on ne recopie pas dans le mail. */
const IGNORER = ["submission id", "respondent id", "submitted at", "article"];

/* -------------------------------------------------------------------------- */

/** À exécuter une seule fois : crée le déclencheur toutes les 5 minutes et traite l'existant. */
function installer() {
  ScriptApp.getProjectTriggers().forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("traiterNouvellesDemandes").timeBased().everyMinutes(5).create();
  traiterNouvellesDemandes();
}

function traiterNouvellesDemandes() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const entetes = assurerColonnes_(sh);
    const derniere = sh.getLastRow();
    if (derniere < 2) return;
    const lignes = sh.getRange(2, 1, derniere - 1, entetes.length).getValues();
    const col = (nom) => entetes.indexOf(nom) + 1;

    lignes.forEach((ligne, i) => {
      const r = i + 2;
      if (ligne[col(COL.notifie) - 1]) return; // déjà traitée
      const d = lire_(entetes, ligne);
      if (!valeur_(d, ["email"])) return; // ligne vide ou incomplète

      const formule = formule_(d);
      const surface = surface_(d);
      const prix = prixDeBase_(formule, surface);

      sh.getRange(r, col(COL.prix)).setValue(prix == null ? "" : prix);
      if (!ligne[col(COL.statut) - 1]) sh.getRange(r, col(COL.statut)).setValue(CONFIG.statuts[0]);
      notifier_(d, formule, surface, prix);
      sh.getRange(r, col(COL.notifie)).setValue(new Date());
    });
  } finally {
    lock.releaseLock();
  }
}

/* -------------------------------------------------------------------------- */

/** Ajoute les colonnes du script si elles manquent, avec la liste déroulante des statuts. */
function assurerColonnes_(sh) {
  let entetes = sh.getRange(1, 1, 1, Math.max(1, sh.getLastColumn())).getValues()[0].map(String);
  Object.values(COL).forEach((nom) => {
    if (entetes.indexOf(nom) === -1) {
      sh.getRange(1, entetes.length + 1).setValue(nom).setFontWeight("bold");
      entetes.push(nom);
    }
  });
  const statut = entetes.indexOf(COL.statut) + 1;
  const regle = SpreadsheetApp.newDataValidation().requireValueInList(CONFIG.statuts, true).build();
  sh.getRange(2, statut, Math.max(1, sh.getMaxRows() - 1), 1).setDataValidation(regle);
  return entetes;
}

/** { entête: valeur } pour une ligne, sans les colonnes vides. */
function lire_(entetes, ligne) {
  const d = {};
  entetes.forEach((h, i) => {
    const v = ligne[i];
    if (v !== "" && v !== null) d[h] = v;
  });
  return d;
}

function normaliser_(s) {
  return String(s)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Première valeur dont l'entête contient l'un des mots-clés (sans accents ni majuscules). */
function valeur_(d, motsCles) {
  for (const h of Object.keys(d)) {
    const n = normaliser_(h);
    if (motsCles.some((m) => n === m || n.indexOf(m) !== -1)) return d[h];
  }
  return "";
}

/** Formule choisie : champ caché `formule` (venu du site), sinon la réponse à la question. */
function formule_(d) {
  const cachee = d["formule"];
  if (cachee && TARIFS[cachee]) return cachee;
  const rep = normaliser_(valeur_(d, ["quelle formule"]));
  if (rep.indexOf("conseils") !== -1) return "conseils";
  if (rep.indexOf("decoration") !== -1) return "decoration";
  if (rep.indexOf("semi") !== -1) return "semi-complete";
  if (rep.indexOf("complete") !== -1) return "complete";
  return null; // « Je ne sais pas encore »
}

function surface_(d) {
  const v = d["surface"] || valeur_(d, ["surface concernee"]);
  const n = parseFloat(String(v).replace(",", "."));
  return isNaN(n) ? null : n;
}

/** Même calcul que le simulateur du site : surface × tarif de base, arrondi à 10 €. */
function prixDeBase_(formule, surface) {
  if (!formule) return null;
  const t = TARIFS[formule];
  if (t.forfait) return t.forfait;
  if (!surface) return null;
  return Math.round((surface * t.parM2) / 10) * 10;
}

function euros_(n) {
  return n.toLocaleString("fr-FR").replace(/\s/g, " ") + " €";
}

function echapper_(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* -------------------------------------------------------------------------- */

function notifier_(d, formule, surface, prix) {
  const prenom = valeur_(d, ["prenom"]);
  const nom = d["Nom"] || ""; // entête exact : « nom » se trouve aussi dans « Prénom »
  const email = valeur_(d, ["email"]);
  const nomFormule = formule ? TARIFS[formule].nom : "Formule à définir ensemble";
  const surfaceTxt = surface ? `${surface} m²` : "surface non précisée";

  const sujet = `Nouvelle demande · ${[prenom, nom].join(" ").trim()} · ${nomFormule} · ${surfaceTxt}`;

  let prixTxt;
  if (prix == null) prixTxt = "Pas de prix calculé (formule ou surface manquante) : à estimer.";
  else if (formule === "complete") prixTxt = `À partir de ${euros_(prix)} (forfait minimum de la prise en charge complète).`;
  else prixTxt = `À partir de ${euros_(prix)} (${surface} m² × ${TARIFS[formule].parM2} €/m², arrondi).`;

  // Réponse proposée au client : voix « nous », jamais de prénom de l'équipe.
  const fourchette =
    prix == null
      ? "entre [à compléter] et [à compléter]"
      : `entre ${euros_(prix)} et [à compléter]`;
  const reponse = [
    `Bonjour ${prenom},`,
    "",
    "Merci pour votre demande et pour le temps passé sur le questionnaire.",
    "",
    `Pour votre projet (${nomFormule.toLowerCase()}, ${surfaceTxt}), nos honoraires se situeraient ${fourchette}. Ce montant ne comprend ni le mobilier ni les travaux.`,
    "",
    CONFIG.rdv
      ? `Nous vous enverrons le tarif exact par email après un premier échange. Si ce n’est pas déjà fait, vous pouvez réserver un appel de lancement ici : ${CONFIG.rdv}`
      : "Nous vous enverrons le tarif exact par email après un premier échange.",
    "",
    "À très vite,",
    "Studio Lixivel",
  ].join("\n");

  const lignes = Object.keys(d)
    .filter((h) => IGNORER.indexOf(normaliser_(h)) === -1 && Object.values(COL).indexOf(h) === -1)
    .map(
      (h) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#5a5450;vertical-align:top">${echapper_(h)}</td>` +
        `<td style="padding:4px 0">${echapper_(d[h] instanceof Date ? d[h].toLocaleString("fr-FR") : d[h])}</td></tr>`,
    )
    .join("");

  const mailto =
    `mailto:${encodeURIComponent(email)}` +
    `?subject=${encodeURIComponent("Votre projet avec Studio Lixivel")}` +
    `&body=${encodeURIComponent(reponse)}`;

  const html = `
<div style="font-family:Helvetica,Arial,sans-serif;color:#494141;font-size:14px;line-height:1.5">
  <p style="font-size:18px;margin:0 0 4px"><b>${echapper_(prixTxt)}</b></p>
  <p style="margin:0 0 16px;color:#5a5450">Fourchette à fixer, puis à envoyer au client. Le statut est passé à « ${CONFIG.statuts[0]} » dans le Google Sheet.</p>
  <p><a href="${mailto}" style="background:#8c373c;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none">Répondre avec la fourchette</a></p>
  <p style="margin:24px 0 8px"><b>Réponse proposée</b> (à compléter aux endroits [entre crochets]) :</p>
  <pre style="font-family:inherit;white-space:pre-wrap;background:#f6f2ef;padding:16px;border-radius:12px">${echapper_(reponse)}</pre>
  <p style="margin:24px 0 8px"><b>Les réponses au questionnaire</b></p>
  <table style="border-collapse:collapse">${lignes}</table>
</div>`;

  MailApp.sendEmail({
    to: CONFIG.notifier,
    replyTo: email,
    name: "Site Studio Lixivel",
    subject: sujet,
    body: `${prixTxt}\n\nRéponse proposée :\n\n${reponse}`,
    htmlBody: html,
  });
}
