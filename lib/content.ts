import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import type { Tone } from "./site";
import { typo } from "./typo";

export { typo };

const CONTENT = path.join(process.cwd(), "content");

/* --------------------------------------------------------------------------
   Utilitaires
   -------------------------------------------------------------------------- */

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readCollection(dir: string) {
  const folder = path.join(CONTENT, dir);
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(folder, file), "utf8");
      const { data, content } = matter(raw);
      return { slug: file.replace(/\.md$/, ""), data, content };
    });
}

/** Même chose sur du HTML, seulement dans le texte (jamais dans les balises ni les attributs). */
function typoHtml(html: string) {
  return html.replace(/>([^<]+)</g, (_m, t: string) => `>${typo(t)}<`);
}

export type TocItem = { id: string; label: string };

/** Markdown → HTML, avec ancres sur les H2 et encadrés « Le conseil du studio ». */
export function renderMarkdown(markdown: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading(token) {
        const text = this.parser.parseInline(token.tokens);
        const plain = token.text.replace(/<[^>]+>/g, "");
        if (token.depth === 2) {
          const id = slugify(plain.replace(/^\d+\.\s*/, ""));
          toc.push({ id, label: plain.replace(/^\d+\.\s*/, "") });
          return `<h2 id="${id}">${text}</h2>\n`;
        }
        return `<h${token.depth}>${text}</h${token.depth}>\n`;
      },
      blockquote(token) {
        const body = this.parser.parse(token.tokens);
        return `<aside class="conseil"><span class="conseil__art" aria-hidden="true"></span><div><p class="conseil__titre">Le conseil du studio</p>${body}</div></aside>\n`;
      },
      image(token) {
        const caption = token.title ? `<figcaption>${token.title}</figcaption>` : "";
        return `<figure class="article-figure"><img src="${token.href}" alt="${token.text ?? ""}" loading="lazy" />${caption}</figure>`;
      },
    },
  });
  let html = marked.parse(markdown, { async: false }) as string;

  // Contenu saisi dans le CMS en HTML : on ajoute aussi les ancres et les encadrés.
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
    const plain = inner.replace(/<[^>]+>/g, "").replace(/^\d+\.\s*/, "");
    const id = slugify(plain);
    toc.push({ id, label: plain });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  html = html.replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/g,
    (_m, inner: string) =>
      `<aside class="conseil"><span class="conseil__art" aria-hidden="true"></span><div><p class="conseil__titre">Le conseil du studio</p>${inner}</div></aside>`,
  );
  return { html: typoHtml(html), toc: toc.map((t) => ({ ...t, label: typo(t.label) })) };
}

/* --------------------------------------------------------------------------
   Projets
   -------------------------------------------------------------------------- */

export type Projet = {
  slug: string;
  titre: string;
  sousTitre: string;
  ville: string;
  lieu: string;
  annee: number;
  surface?: string;
  formule?: string;
  duree?: string;
  budget?: string;
  couleur: Tone;
  ordre: number;
  cover: string;
  coverAlt: string;
  brief?: string;
  contraintes: string[];
  avant?: { image: string; legende?: string };
  apres?: { image: string; legende?: string };
  plan?: string;
  rendu?: string;
  realise?: string;
  galerie: { image: string; alt: string }[];
  shopping: { piece: string; ou?: string; prix?: string }[];
  avis?: { texte: string; nom: string; contexte?: string };
};

export function getProjets(): Projet[] {
  return readCollection("projets")
    .map(({ slug, data }) => ({
      slug,
      titre: typo(data.titre ?? slug),
      sousTitre: typo(data.sousTitre ?? ""),
      ville: data.ville ?? "",
      lieu: data.lieu ?? data.ville ?? "",
      annee: Number(data.annee ?? new Date().getFullYear()),
      surface: data.surface,
      formule: data.formule,
      duree: data.duree,
      budget: data.budget,
      couleur: (data.couleur ?? "rose") as Tone,
      ordre: Number(data.ordre ?? 99),
      cover: data.cover ?? "/images/bureau.jpg",
      coverAlt: data.coverAlt ?? data.titre ?? "",
      brief: typo(data.brief),
      contraintes: data.contraintes ?? [],
      avant: data.avant,
      apres: data.apres,
      plan: data.plan,
      rendu: data.rendu,
      realise: data.realise,
      // Ancien format accepté : simple liste de chemins d'images.
      galerie: ((data.galerie ?? []) as (string | { image?: string; alt?: string })[])
        .map((g) => (typeof g === "string" ? { image: g, alt: "" } : { image: g?.image ?? "", alt: g?.alt ?? "" }))
        .filter((g) => g.image),
      shopping: data.shopping ?? [],
      avis: data.avis,
    }))
    .sort((a, b) => a.ordre - b.ordre);
}

export function getProjet(slug: string) {
  return getProjets().find((p) => p.slug === slug);
}

/* --------------------------------------------------------------------------
   Journal
   -------------------------------------------------------------------------- */

export type Article = {
  slug: string;
  titre: string;
  categorie: string;
  date: string;
  duree: string;
  cover: string;
  coverAlt: string;
  chapo: string;
  une: boolean;
  /** Brouillon : la page existe (aperçu par son lien, non indexée) mais n’apparaît nulle part sur le site. */
  brouillon: boolean;
  /** Photos au format vertical (article tiré d’un réel) : affichées sans recadrage. */
  vertical: boolean;
  reel?: { url?: string; vignette?: string; legende?: string };
  produits: { titre: string; prix?: string; image?: string; lien?: string }[];
  etiquettes: string[];
  seoTitle?: string;
  seoDescription?: string;
  content: string;
};

export const CATEGORIES = [
  "Petits espaces",
  "Salon",
  "Chambre",
  "Cuisine",
  "Petit budget",
  "Rénovation",
  "Avant / après",
];

/** Articles publiés ; `brouillons: true` pour inclure aussi les brouillons (aperçu). */
export function getArticles({ brouillons = false } = {}): Article[] {
  return readCollection("journal")
    .map(({ slug, data, content }) => ({
      slug,
      titre: typo(data.titre ?? slug),
      categorie: data.categorie ?? "Conseils",
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      duree: data.duree ?? "5 min",
      cover: data.cover ?? "/images/bureau.jpg",
      coverAlt: data.coverAlt ?? "",
      chapo: typo(data.chapo ?? ""),
      une: Boolean(data.une),
      brouillon: Boolean(data.brouillon),
      vertical: Boolean(data.vertical),
      reel: data.reel?.url ? { ...data.reel, legende: typo(data.reel.legende) } : undefined,
      produits: data.produits ?? [],
      etiquettes: data.etiquettes ?? [],
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      content,
    }))
    .filter((a) => brouillons || !a.brouillon)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string) {
  return getArticles({ brouillons: true }).find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

/* --------------------------------------------------------------------------
   Villes (pages locales « Architecte d’intérieur à … »)
   -------------------------------------------------------------------------- */

export type Ville = {
  slug: string;
  nom: string;
  region: string;
  ordre: number;
  couleur: Tone;
  intro: string;
  deplacement: string;
  quartiers: string[];
  faq: { q: string; r: string }[];
  seoTitle?: string;
  seoDescription?: string;
  content: string;
};

export function getVilles(): Ville[] {
  return readCollection("villes")
    .map(({ slug, data, content }) => ({
      slug,
      nom: data.nom ?? slug,
      region: data.region ?? "",
      ordre: Number(data.ordre ?? 99),
      couleur: (data.couleur ?? "doux") as Tone,
      intro: typo(data.intro ?? ""),
      deplacement: typo(data.deplacement ?? ""),
      quartiers: data.quartiers ?? [],
      faq: (data.faq ?? []).filter((f: { q?: string; r?: string }) => f?.q && f?.r),
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      content,
    }))
    .sort((a, b) => a.ordre - b.ordre || a.nom.localeCompare(b.nom, "fr"));
}

export function getVille(slug: string) {
  return getVilles().find((v) => v.slug === slug);
}


/* --------------------------------------------------------------------------
   Ressources (guides à télécharger, page /ressources)
   -------------------------------------------------------------------------- */

export type Ressource = {
  slug: string;
  titre: string;
  description: string;
  fichier?: string;
  /** Image de la couverture du guide (aperçu sur la carte). */
  apercu?: string;
  format: string;
  couleur: Tone;
  disponible: boolean;
  ordre: number;
};

export function getRessources(): Ressource[] {
  return readCollection("ressources")
    .map(({ slug, data }) => ({
      slug,
      titre: typo(data.titre ?? slug),
      description: typo(data.description ?? ""),
      fichier: data.fichier || undefined,
      apercu: data.apercu || undefined,
      format: data.format ?? "PDF",
      couleur: (data.couleur ?? "rose") as Tone,
      // Disponible seulement avec un fichier : un guide « bientôt » s'affiche sans bouton.
      disponible: data.statut !== "bientôt" && Boolean(data.fichier),
      ordre: Number(data.ordre ?? 99),
    }))
    .sort((a, b) => a.ordre - b.ordre);
}
