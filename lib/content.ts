import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import type { Tone } from "./site";

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
  const html = marked.parse(markdown, { async: false }) as string;
  return { html, toc };
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
  galerie: string[];
  shopping: { piece: string; ou?: string; prix?: string }[];
  avis?: { texte: string; nom: string; contexte?: string };
  detail: boolean;
};

export function getProjets(): Projet[] {
  return readCollection("projets")
    .map(({ slug, data }) => ({
      slug,
      titre: data.titre ?? slug,
      sousTitre: data.sousTitre ?? "",
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
      brief: data.brief,
      contraintes: data.contraintes ?? [],
      avant: data.avant,
      apres: data.apres,
      plan: data.plan,
      rendu: data.rendu,
      realise: data.realise,
      galerie: data.galerie ?? [],
      shopping: data.shopping ?? [],
      avis: data.avis,
      detail: Boolean(data.brief),
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

export function getArticles(): Article[] {
  return readCollection("journal")
    .map(({ slug, data, content }) => ({
      slug,
      titre: data.titre ?? slug,
      categorie: data.categorie ?? "Conseils",
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      duree: data.duree ?? "5 min",
      cover: data.cover ?? "/images/bureau.jpg",
      coverAlt: data.coverAlt ?? "",
      chapo: data.chapo ?? "",
      une: Boolean(data.une),
      reel: data.reel?.url ? data.reel : undefined,
      produits: data.produits ?? [],
      etiquettes: data.etiquettes ?? [],
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      content,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string) {
  return getArticles().find((a) => a.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
