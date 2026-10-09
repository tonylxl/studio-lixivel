import { FORMULES } from "@/data/services";
import { getArticles, getProjets, getVilles } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/** Résumé du site pour les assistants IA (ChatGPT, Perplexity…), au format llms.txt. */
export function GET() {
  const u = (path: string) => `${SITE.url}${path}`;
  const lignes = [
    `# ${SITE.name}`,
    "",
    "> Studio d’architecture intérieure fondé par Cindy, basé à Rouen (Normandie). Agencement, décoration et rénovation d’intérieurs, à distance partout en France ou sur place pour les projets avec travaux. Plus de 60 projets réalisés.",
    "",
    `Contact : ${SITE.email} · Instagram : ${SITE.instagram}`,
    "",
    "## Formules et tarifs",
    "",
    ...FORMULES.map((f) => `- [${f.titre}](${u(`/services#${f.slug}`)}) : ${f.tarif}. ${f.surtitre}. Délai : ${f.delai}. ${f.resume}`),
    "",
    "## Zones d’intervention",
    "",
    `- [Toutes les zones](${u("/architecte-interieur")}) : à distance partout en France, sur place pour les chantiers.`,
    ...getVilles().map((v) => `- [Architecte d’intérieur à ${v.nom}](${u(`/architecte-interieur/${v.slug}`)}) : ${v.intro}`),
    "",
    "## Pages principales",
    "",
    `- [Services](${u("/services")}) : les quatre formules, comparatif et simulateur de budget.`,
    `- [Projets](${u("/projets")}) : réalisations du studio.`,
    `- [Le studio](${u("/le-studio")}) : Cindy et sa façon de travailler.`,
    `- [FAQ](${u("/faq")}) : formules, projets à distance, tarifs, travaux.`,
    `- [Contact](${u("/contact")}) : questionnaire de prise de rendez-vous.`,
    "",
    "## Projets",
    "",
    ...getProjets().map((p) => `- [${p.titre}](${u(`/projets/${p.slug}`)}) : ${p.sousTitre}, ${p.ville}, ${p.annee}.`),
    "",
    "## Journal",
    "",
    ...getArticles().map((a) => `- [${a.titre}](${u(`/journal/${a.slug}`)}) : ${a.chapo}`),
    "",
  ];
  return new Response(lignes.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
