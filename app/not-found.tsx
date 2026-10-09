import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTone from "@/components/PageTone";

export default function NotFound() {
  return (
    <>
      <PageTone tone="rose" />
      <Header />
      <main
        id="contenu"
        style={{
          minHeight: "80svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 32,
          padding: "calc(var(--header-h) + 64px) var(--g) 120px",
        }}
      >
        <p className="t-surtitre c-accent">Erreur 404</p>
        <h1 className="t-hero">Cette pièce n’existe pas (encore).</h1>
        <p className="t-intro c-2">La page que vous cherchez a peut-être été déplacée.</p>
        <Link href="/" className="btn">
          Retour à l’accueil
        </Link>
      </main>
      <Footer band={false} />
    </>
  );
}
