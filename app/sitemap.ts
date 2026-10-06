import type { MetadataRoute } from "next";
import { getArticles, getProjets } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/projets", "/le-studio", "/journal", "/faq", "/contact"].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: new Date(),
  }));
  const projets = getProjets()
    .filter((p) => p.detail)
    .map((p) => ({ url: `${SITE.url}/projets/${p.slug}`, lastModified: new Date() }));
  const articles = getArticles().map((a) => ({ url: `${SITE.url}/journal/${a.slug}`, lastModified: new Date(a.date) }));
  return [...pages, ...projets, ...articles];
}
