import type { MetadataRoute } from "next";
import { getArticles, getProjets, getVilles } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/projets", "/le-studio", "/journal", "/faq", "/contact", "/architecte-interieur"].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: new Date(),
  }));
  const projets = getProjets().map((p) => ({ url: `${SITE.url}/projets/${p.slug}`, lastModified: new Date() }));
  const articles = getArticles().map((a) => ({ url: `${SITE.url}/journal/${a.slug}`, lastModified: new Date(a.date) }));
  const villes = getVilles().map((v) => ({ url: `${SITE.url}/architecte-interieur/${v.slug}`, lastModified: new Date() }));
  return [...pages, ...villes, ...projets, ...articles];
}
