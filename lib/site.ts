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
};

export const NAV = [
  { href: "/projets", label: "Projets" },
  { href: "/services", label: "Services" },
  { href: "/le-studio", label: "Le studio" },
  { href: "/blog", label: "Blog" },
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
  ardoise: "#5d7c86",
  blanc: "#ffffff",
} as const;

export type Tone = keyof typeof TONES;
