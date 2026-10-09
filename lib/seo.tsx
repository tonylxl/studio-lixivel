import { FORMULES } from "@/data/services";
import { SITE } from "./site";

/** Identifiant stable de l’entreprise, réutilisé par les autres données structurées. */
export const ORG_ID = `${SITE.url}/#studio`;

/** L’entreprise (sur toutes les pages) : qui, où, quelle zone, quels comptes. */
export function orgJsonLd(villes: string[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: SITE.name,
    description:
      "Studio d’architecture intérieure fondé par Cindy : agencement, décoration et rénovation, à distance partout en France ou sur place.",
    url: SITE.url,
    email: SITE.email,
    image: `${SITE.url}/images/bureau.jpg`,
    priceRange: "€€",
    address: { "@type": "PostalAddress", addressLocality: "Rouen", addressRegion: "Normandie", addressCountry: "FR" },
    areaServed: [{ "@type": "Country", name: "France" }, ...villes.map((name) => ({ "@type": "City", name }))],
    founder: { "@type": "Person", name: "Cindy", jobTitle: "Architecte d’intérieur" },
    knowsAbout: ["Architecture d’intérieur", "Décoration d’intérieur", "Aménagement de petits espaces", "Rénovation"],
    sameAs: [SITE.instagram, SITE.tiktok],
  };
}

/** Prestation d’architecture d’intérieur dans une ville, avec les tarifs « à partir de ». */
export function serviceJsonLd(ville: { nom: string; region: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Architecture d’intérieur",
    name: `Architecte d’intérieur à ${ville.nom}`,
    url: `${SITE.url}/architecte-interieur/${ville.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "City",
      name: ville.nom,
      ...(ville.region && { containedInPlace: { "@type": "AdministrativeArea", name: ville.region } }),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Formules",
      itemListElement: FORMULES.map((f) => ({
        "@type": "Offer",
        name: f.titre,
        description: f.resume,
        priceCurrency: "EUR",
        ...(f.prix
          ? { priceSpecification: { "@type": "UnitPriceSpecification", minPrice: f.prix, priceCurrency: "EUR", unitText: "m²" } }
          : f.minimum && { priceSpecification: { "@type": "PriceSpecification", minPrice: f.minimum, priceCurrency: "EUR" } }),
      })),
    },
  };
}

export function faqJsonLd(items: { q: string; r: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.r },
    })),
  };
}

export function breadcrumbJsonLd(items: [label: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE.url}${path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
