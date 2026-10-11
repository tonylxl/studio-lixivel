import type { MetadataRoute } from "next";
import { INDEXABLE, SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: INDEXABLE ? { userAgent: "*", allow: "/", disallow: ["/apercu", "/contact/merci"] } : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
