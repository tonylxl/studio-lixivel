import donnees from "@/content/donnees/formules.json";
import { typo } from "@/lib/typo";

export type Formule = {
  slug: string;
  court: string;
  titre: string;
  surtitre: string;
  resume: string;
  description: string;
  /** « Ce qui est inclus » : `detail` = petit descriptif qui se déroule au clic sur le + (facultatif). */
  inclus: { texte: string; detail?: string }[];
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

/** Champ nombre de Pages CMS : vide (null ou "") → null. */
const nombre = (v: unknown) => (typeof v === "number" && v > 0 ? v : null);

/**
 * Formules, comparatif et étapes : modifiables par Cindy dans Pages CMS (« Réglages du site → Formules et tarifs »,
 * fichier content/donnees/formules.json). Le `slug` ne se modifie pas (ancres #conseils…, simulateur, questionnaire).
 * Les tarifs sont aussi recopiés dans le script du Google Sheet (scripts/google-sheet/suivi-demandes.gs).
 */
export const FORMULES: Formule[] = donnees.formules.map((f) => ({
  slug: f.slug,
  court: f.court,
  titre: f.titre,
  surtitre: f.surtitre,
  resume: typo(f.resume),
  description: typo(f.description),
  inclus: (f.inclus as ({ texte?: string; detail?: string } | string)[])
    .map((x) => (typeof x === "string" ? { texte: x } : { texte: x.texte ?? "", detail: x.detail?.trim() ? typo(x.detail) : undefined }))
    .filter((x) => x.texte),
  delai: f.delai,
  tarif: f.tarif,
  image: f.image,
  illustration: "illustration" in f ? Boolean(f.illustration) : undefined,
  prix: nombre(f.prixM2),
  minimum: nombre(f.minimum) ?? undefined,
  noteTarif: "noteTarif" in f && f.noteTarif ? typo(String(f.noteTarif)) : undefined,
  modifs: f.modifs,
}));

/** Tableau comparatif : une valeur par formule, dans l'ordre conseils, décoration, semi-complète, complète. */
export const COMPARATIF: { label: string; valeurs: string[] }[] = donnees.comparatif.map((l) => ({
  label: l.label,
  valeurs: [l.conseils, l.decoration, l.semiComplete, l.complete],
}));

export const ETAPES: { titre: string; texte: string; couleur: string }[] = donnees.etapes.map((e) => ({
  titre: e.titre,
  texte: typo(e.texte),
  couleur: e.couleur,
}));

/**
 * Type de bien du simulateur. Le PDF précise : « Les tarifs indiqués ne s’appliquent pas aux studios »,
 * donc un studio n’a pas d’estimation affichée (devis sur demande).
 */
export const TYPES_BIEN: { slug: string; label: string; surDevis?: boolean }[] = [
  { slug: "appartement", label: "Appartement" },
  { slug: "maison", label: "Maison" },
  { slug: "studio", label: "Studio", surDevis: true },
];
