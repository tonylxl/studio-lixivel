"use client";

import { useEffect, useId, useState } from "react";
import { SITE } from "@/lib/site";
import styles from "./RessourceForm.module.css";

const CLE = "ressources-inscrit";

/**
 * Accès à un guide de la page Ressources.
 * - Brevo branché (SITE.brevo) : email + consentement → inscription à la liste, puis lien de téléchargement.
 *   Une fois inscrit (mémorisé dans le navigateur), tous les guides se téléchargent directement.
 * - Brevo pas encore branché : téléchargement direct.
 * Envoi au formulaire Brevo hébergé (sibforms), sans serveur : fonctionne quel que soit l'hébergeur.
 */
export default function RessourceForm({ fichier, titre }: { fichier: string; titre: string }) {
  const id = useId();
  const [ouvert, setOuvert] = useState(false);
  const [inscrit, setInscrit] = useState(false);
  const [envoi, setEnvoi] = useState<"idle" | "envoi" | "ok" | "erreur">("idle");

  useEffect(() => {
    try {
      setInscrit(localStorage.getItem(CLE) === "1");
    } catch {}
  }, []);

  const telecharger = (
    <a href={fichier} download className="btn btn--sombre" data-guide={titre}>
      Télécharger le guide
    </a>
  );

  if (!SITE.brevo || inscrit) return telecharger;

  if (envoi === "ok")
    return (
      <div className={styles.merci} role="status">
        <p>Merci, c’est noté. Votre guide est prêt :</p>
        {telecharger}
      </div>
    );

  if (!ouvert)
    return (
      <button type="button" className="btn btn--sombre" onClick={() => setOuvert(true)}>
        Recevoir le guide
      </button>
    );

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const donnees = new FormData(e.currentTarget);
    donnees.set("email_address_check", ""); // piège à robots de Brevo, doit rester vide
    donnees.set("locale", "fr");
    setEnvoi("envoi");
    try {
      // no-cors : Brevo ne renvoie pas d'en-têtes CORS ; la requête part, on ne lit pas la réponse.
      await fetch(`${SITE.brevo}${SITE.brevo.includes("?") ? "&" : "?"}isAjax=1`, {
        method: "POST",
        mode: "no-cors",
        body: donnees,
      });
      try {
        localStorage.setItem(CLE, "1");
      } catch {}
      setEnvoi("ok");
    } catch {
      setEnvoi("erreur");
    }
  }

  return (
    <form className={styles.form} onSubmit={envoyer}>
      <div className={styles.champs}>
        <label className={styles.champ}>
          <span className="t-petit">Prénom</span>
          <input name="PRENOM" type="text" autoComplete="given-name" />
        </label>
        <label className={styles.champ}>
          <span className="t-petit">Email</span>
          <input name="EMAIL" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className={styles.consent} htmlFor={`${id}-optin`}>
        <input id={`${id}-optin`} name="OPT_IN" type="checkbox" value="1" required />
        <span className="t-petit">
          J’accepte de recevoir les guides et les conseils du studio par email (une à deux fois par mois). Désinscription
          en un clic.
        </span>
      </label>
      <button type="submit" className="btn btn--sombre" disabled={envoi === "envoi"}>
        {envoi === "envoi" ? "Envoi…" : "Recevoir le guide"}
      </button>
      {envoi === "erreur" && (
        <p className="t-petit" role="alert">
          L’envoi n’a pas fonctionné. Vérifiez votre connexion, ou{" "}
          <a href={fichier} download className="link">
            téléchargez le guide directement
          </a>
          .
        </p>
      )}
    </form>
  );
}
