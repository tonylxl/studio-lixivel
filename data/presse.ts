import donnees from "@/content/donnees/presse.json";
import { typo } from "@/lib/typo";

/**
 * Articles et émissions sur le studio (page Le studio, llms.txt), du plus récent au plus ancien.
 * Modifiables dans Pages CMS (content/donnees/presse.json).
 * Sans `lien`, le média n'apparaît pas sur la page Le studio (seulement dans llms.txt).
 * Les logos de l'accueil restent dans app/page.tsx (fichiers et réglages de taille).
 */
export const PRESSE: { nom: string; titre: string; lien?: string }[] = donnees
  .filter((p) => p.nom)
  .map((p) => ({ nom: p.nom, titre: typo(p.titre), lien: p.lien || undefined }));
