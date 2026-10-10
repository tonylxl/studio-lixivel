/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Le journal est devenu « Blog » (10 oct. 2026) : les anciennes adresses redirigent en 301.
  async redirects() {
    return [
      { source: "/journal", destination: "/blog", permanent: true },
      { source: "/journal/:slug*", destination: "/blog/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
