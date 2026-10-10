import { ETAPES, FORMULES } from "@/data/services";
import { FAQ } from "@/data/faq";
import { getArticles, getProjets, getGuides, getVilles } from "@/lib/content";
import { SITE } from "@/lib/site";
import { PRESSE } from "@/data/presse";

export const dynamic = "force-static";

/** Résumé du site pour les assistants IA (ChatGPT, Perplexity…), au format llms.txt. */
export function GET() {
  const u = (path: string) => `${SITE.url}${path}`;
  const lignes = [
    `# ${SITE.name}`,
    "",
    "> Studio d’architecture intérieure fondé par Cindy, basé à Rouen (Normandie). Agencement, décoration et rénovation d’intérieurs, à distance partout en France ou sur place pour les projets avec travaux. Plus de 60 projets réalisés.",
    "",
    `Contact : ${SITE.email} · Instagram : ${SITE.instagram} · TikTok : ${SITE.tiktok}`,
    "",
    "## En bref",
    "",
    "- Fondatrice : Cindy, architecte d’intérieur et créatrice de contenus déco (TikTok, Instagram).",
    "- Basé à Rouen (Normandie) ; trois formules sur quatre entièrement à distance, partout en France.",
    "- Tarifs (honoraires, hors mobilier et travaux) : dès 35 €/m², 55 €/m², 90 €/m², prise en charge complète à partir de 5 000 €.",
    "- Délais : 15 jours pour un plan d’aménagement, environ 6 mois pour une rénovation.",
    "- Plus de 60 projets accompagnés ; cité par Marie Claire, Gala, Forbes, ICI Normandie (radio), actu.fr et Maison & Jardin.",
    "- Premier contact : questionnaire en 5 minutes, réponse sous 48 h, sans engagement.",
    "",
    "## Formules et tarifs",
    "",
    ...FORMULES.map((f) => `- [${f.titre}](${u(`/services#${f.slug}`)}) : ${f.tarif}. ${f.surtitre}. Délai : ${f.delai}. ${f.resume}`),
    "",
    "## Guides gratuits",
    "",
    ...getGuides()
      .filter((r) => r.disponible)
      .map((r) => `- [${r.titre}](${u(`/guides#${r.slug}`)}) : ${r.description}`),
    "",
    "## Dans la presse",
    "",
    ...PRESSE.map((p) => (p.lien ? `- ${p.nom} : [${p.titre}](${p.lien})` : `- ${p.nom} : ${p.titre}`)),
    "",
    "## Comment se passe un projet",
    "",
    ...ETAPES.map((e, i) => `${i + 1}. ${e.titre} : ${e.texte}`),
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
    "## Questions fréquentes",
    "",
    ...FAQ.flatMap((c) => c.items.map((it) => `- **${it.q}** ${it.r}`)),
    "",
    "## Projets",
    "",
    ...getProjets().map((p) => `- [${p.titre}](${u(`/projets/${p.slug}`)}) : ${p.sousTitre}, ${p.ville}, ${p.annee}.`),
    "",
    "## Blog",
    "",
    ...getArticles().map((a) => `- [${a.titre}](${u(`/blog/${a.slug}`)}) : ${a.chapo}`),
    "",
  ];
  return new Response(lignes.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
