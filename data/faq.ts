import donnees from "@/content/donnees/faq.json";
import { typo } from "@/lib/typo";

export type QR = { q: string; r: string };

/**
 * Questions fréquentes, modifiables par Cindy dans Pages CMS (« Réglages du site → FAQ »,
 * fichier content/donnees/faq.json). Chaque réponse commence par la réponse directe, en une phrase
 * (c'est ce que reprennent Google et les IA), puis donne le détail. Pas de bouton dans les réponses.
 * Les cases « accueil » et « services » choisissent les questions reprises sur ces pages.
 */
type Question = { question: string; reponse: string; accueil?: boolean; services?: boolean };

const CATEGORIES = donnees.categories.map((c) => ({
  id: c.id,
  titre: c.titre,
  questions: (c.questions as Question[]).filter((x) => x.question && x.reponse),
}));

const qr = (x: Question): QR => ({ q: typo(x.question), r: typo(x.reponse) });

export const FAQ: { id: string; titre: string; items: QR[] }[] = CATEGORIES.map((c) => ({
  id: c.id,
  titre: c.titre,
  items: c.questions.map(qr),
}));

const toutes = CATEGORIES.flatMap((c) => c.questions);

/** Extrait affiché sur la page Services. */
export const FAQ_SERVICES: QR[] = toutes.filter((x) => x.services).map(qr);

/** Extrait affiché sur l'accueil. */
export const FAQ_ACCUEIL: QR[] = toutes.filter((x) => x.accueil).map(qr);
