/**
 * Le site n'est indexable que sur le vrai domaine : en production Vercel ET avec NEXT_PUBLIC_SITE_URL renseigné.
 * Tant que l'ancien site tourne sur le domaine, l'adresse .vercel.app reste invisible pour Google (pas de contenu en double).
 * Migration vers Cloudflare : remplacer VERCEL_ENV par la variable équivalente (CF_PAGES_BRANCH === "main").
 */
export const INDEXABLE = process.env.VERCEL_ENV === "production" && Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE = {
  name: "Studio Lixivel",
  baseline: "Architecte d’intérieur",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiolixivel.com",
  email: "contact@studiolixivel.com",
  ville: "Rouen, Normandie",
  zone: "Partout en France à distance",
  instagram: "https://www.instagram.com/studiolixivel/",
  tiktok: "https://www.tiktok.com/@studiolixivel",
  handle: "@studiolixivel",
  /** Appel de lancement sur Cal.com, au format « utilisateur/type-de-rdv ». Vide tant que le compte n'existe pas. */
  cal: "",
  /**
   * Adresse du formulaire Brevo (« https://….sibforms.com/serve/… ») qui inscrit à la liste « Ressources du studio ».
   * Vide : les guides se téléchargent librement, sans formulaire.
   */
  brevo: "",
};

/** Hub « Ressources » : deux pages, articles du blog et guides à télécharger (onglets en haut de chacune). */
export const RESSOURCES = [
  { href: "/blog", label: "Articles" },
  { href: "/guides", label: "Guides" },
];

export const NAV: { href: string; label: string; sous?: typeof RESSOURCES }[] = [
  { href: "/projets", label: "Projets" },
  { href: "/services", label: "Services" },
  { href: "/le-studio", label: "Le studio" },
  { href: "/blog", label: "Ressources", sous: RESSOURCES },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/**
 * Titre de page SEO : « titre · Studio Lixivel » si ça tient dans les 60 caractères
 * qu'affiche Google, sinon le titre seul (le mot-clé reste en tête).
 */
export function titreSeo(titre: string) {
  const complet = `${titre} · ${SITE.name}`;
  return { absolute: complet.length <= 60 ? complet : titre };
}

/**
 * Description pour Google : coupée proprement à la fin d'un mot (avec « … ») si elle dépasse `max`,
 * au lieu d'être tronquée au milieu d'un mot.
 */
export function descriptionSeo(texte: string, max = 158) {
  const t = texte.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/[\s,;:.!?\u00a0]+\S*$/, "") + "…";
}

/** Lien vers la page de prise de rendez-vous, avec la source du clic (suivi). */
export function rdvHref(source: string, extra?: Record<string, string>) {
  const params = new URLSearchParams({ source, ...(extra ?? {}) });
  return `/contact?${params.toString()}`;
}

/** Couleurs d'ouverture de page (fond qui passe au blanc au scroll). */
export const TONES = {
  rose: "#f7dddf",
  lin: "#e0d9d2",
  doux: "#f6f2ef",
  sauge: "#bcd4b4",
  moutarde: "#fcc976",
  ardoise: "#4f6c78",
  blanc: "#ffffff",
} as const;

export type Tone = keyof typeof TONES;
