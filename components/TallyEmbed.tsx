"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./TallyEmbed.module.css";

/** Questionnaire « Débuter votre projet » (public : il apparaît dans la page). Une variable d'environnement peut le remplacer. */
const FORM_ID = process.env.NEXT_PUBLIC_TALLY_FORM_ID || "obr965";

const DEMO_CHOIX = [
  "Aménager ou décorer une pièce",
  "Aménager tout un appartement ou une maison",
  "Rénover avec des travaux",
  "Un local professionnel",
];

/**
 * Formulaire Tally intégré. Les paramètres de l'URL (source, formule, surface)
 * sont transmis au formulaire en champs cachés.
 * Si FORM_ID est vide, une maquette s'affiche.
 * Une fois le questionnaire envoyé, on passe à /contact/merci (réservation de l'appel de lancement) ;
 * prénom, nom et email y sont transmis par sessionStorage, jamais dans l'URL.
 */
export default function TallyEmbed() {
  const [query, setQuery] = useState("");
  const [choice, setChoice] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    setQuery(window.location.search.replace(/^\?/, ""));
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://tally.so" || typeof e.data !== "string" || !e.data.includes("Tally.FormSubmitted")) return;
      try {
        type Champ = { title?: string; answer?: { value?: unknown } };
        const champs: Champ[] = JSON.parse(e.data)?.payload?.fields ?? [];
        const val = (titre: string) => {
          const v = champs.find((c) => c.title?.trim().toLowerCase() === titre)?.answer?.value;
          return typeof v === "string" ? v : "";
        };
        sessionStorage.setItem("demande", JSON.stringify({ prenom: val("prénom"), nom: val("nom"), email: val("email") }));
      } catch {}
      router.push("/contact/merci");
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  if (!FORM_ID) {
    return (
      <div className={styles.mock}>
        <p className="t-petit c-2">Question 1 sur 4</p>
        <span className={styles.progress} aria-hidden>
          <span style={{ width: "25%" }} />
        </span>
        <p className={styles.question}>Quel est votre projet ?</p>
        <div className={styles.choices}>
          {DEMO_CHOIX.map((c, i) => (
            <button
              key={c}
              type="button"
              className={styles.choice}
              aria-pressed={choice === i}
              onClick={() => setChoice(i)}
            >
              <span className={styles.radio} aria-hidden />
              {c}
            </button>
          ))}
        </div>
        <div className={styles.mockFooter}>
          <span className="t-petit c-2">Environ 5 minutes</span>
          <button type="button" className="btn" disabled={choice === null}>
            Continuer
          </button>
        </div>
        <p className={styles.note}>Aperçu : le formulaire Tally s’affichera ici une fois relié.</p>
      </div>
    );
  }

  const params = new URLSearchParams(query);
  params.set("alignLeft", "1");
  params.set("hideTitle", "1");
  params.set("transparentBackground", "1");
  params.set("dynamicHeight", "1");

  return (
    <div className={styles.wrap}>
      {(
        <iframe
          data-tally-src={`https://tally.so/embed/${FORM_ID}?${params.toString()}`}
          src={`https://tally.so/embed/${FORM_ID}?${params.toString()}`}
          loading="lazy"
          width="100%"
          height="620"
          title="Questionnaire Studio Lixivel"
          className={styles.iframe}
        />
      )}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          (window as unknown as { Tally?: { loadEmbeds: () => void } }).Tally?.loadEmbeds();
        }}
      />
    </div>
  );
}
