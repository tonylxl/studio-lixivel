import donnees from "@/content/donnees/chiffres.json";

/** « En chiffres » (page Le studio), modifiables dans Pages CMS (content/donnees/chiffres.json). */
export const CHIFFRES: { valeur: string; label: string }[] = donnees.filter((c) => c.valeur && c.label);
