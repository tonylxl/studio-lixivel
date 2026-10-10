/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Redirections permanentes : ancien journal et ancien site WordPress.
  async redirects() {
    return [
      { source: "/journal", destination: "/blog", permanent: true },
      { source: "/journal/:slug*", destination: "/blog/:slug*", permanent: true },

      // Ancien site WordPress (OVH), liste relevée dans son sitemap le 10 oct. 2026.
      { source: "/a-propos", destination: "/le-studio", permanent: true },
      { source: "/realisations", destination: "/projets", permanent: true },
      { source: "/debuter-votre-projet", destination: "/contact?source=ancien-site", permanent: true },
      { source: "/thank-you-page", destination: "/contact", permanent: true },
      // Plus de CGV ni de boutique (carte cadeau supprimée) : vers les formules.
      { source: "/cgv", destination: "/services", permanent: true },
      { source: "/shop", destination: "/services", permanent: true },
      { source: "/panier", destination: "/services", permanent: true },
      { source: "/commande", destination: "/services", permanent: true },
      { source: "/produit/:slug*", destination: "/services", permanent: true },
      { source: "/categorie-produit/:slug*", destination: "/services", permanent: true },
      // Projets : vers la page Projets (à affiner projet par projet une fois les anciens projets repris).
      { source: "/portfolio_new/:slug*", destination: "/projets", permanent: true },
      { source: "/categorie_portfolio/:slug*", destination: "/projets", permanent: true },
    ];
  },
};

export default nextConfig;
