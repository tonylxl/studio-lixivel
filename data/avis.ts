import donnees from "@/content/donnees/avis.json";
import type { AvisItem } from "@/components/Avis";
import { typo } from "@/lib/typo";

/** Avis clients de l'accueil (slider avant/après), modifiables dans Pages CMS (content/donnees/avis.json). */
export const AVIS: AvisItem[] = donnees
  .filter((a) => a.nom && a.texte)
  .map((a) => ({ ...a, texte: typo(a.texte) }));
