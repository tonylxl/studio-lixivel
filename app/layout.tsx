import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { INDEXABLE, SITE } from "@/lib/site";
import { getVilles } from "@/lib/content";
import { JsonLd, orgJsonLd } from "@/lib/seo";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-schibsted",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...(!INDEXABLE && { robots: { index: false, follow: false } }),
  title: {
    default: "Studio Lixivel · Architecte d’intérieur dès 35 €/m²",
    template: "%s · Studio Lixivel",
  },
  description:
    "Studio Lixivel, architecte d’intérieur fondé par Cindy : agencement, décoration et rénovation dès 35 €/m², à distance en France ou sur place en Normandie.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Studio Lixivel",
    images: ["/images/bureau.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f7dddf",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={schibsted.variable}>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        {children}
        <JsonLd data={orgJsonLd(getVilles().map((v) => v.nom))} />
      </body>
    </html>
  );
}
