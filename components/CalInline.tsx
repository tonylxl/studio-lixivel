"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import styles from "./CalInline.module.css";

type CalApi = ((...args: unknown[]) => void) & { q?: unknown[]; ns?: Record<string, unknown>; loaded?: boolean };

/**
 * Agenda Cal.com intégré (appel de lancement), prénom et email pré-remplis avec les réponses
 * au questionnaire (gardées en sessionStorage par TallyEmbed, jamais dans l'URL).
 * N'affiche rien tant que SITE.cal est vide.
 */
export default function CalInline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SITE.cal || !ref.current) return;
    let demande: { prenom?: string; nom?: string; email?: string } = {};
    try {
      demande = JSON.parse(sessionStorage.getItem("demande") ?? "{}");
    } catch {}

    // Chargeur officiel de Cal.com (file d'attente, puis embed.js).
    const w = window as unknown as { Cal?: CalApi };
    if (!w.Cal) {
      const cal = function (...args: unknown[]) {
        const c = w.Cal!;
        if (!c.loaded) {
          c.ns = {};
          c.q = c.q || [];
          const s = document.createElement("script");
          s.src = "https://app.cal.com/embed/embed.js";
          document.head.appendChild(s);
          c.loaded = true;
        }
        c.q!.push(args);
      } as CalApi;
      w.Cal = cal;
    }
    const Cal = w.Cal!;
    Cal("init", { origin: "https://cal.com" });
    Cal("inline", {
      elementOrSelector: ref.current,
      calLink: SITE.cal,
      config: {
        name: [demande.prenom, demande.nom].filter(Boolean).join(" "),
        email: demande.email ?? "",
        theme: "light",
        layout: "month_view",
      },
    });
    Cal("ui", { theme: "light", cssVarsPerTheme: { light: { "cal-brand": "#8c373c" } }, hideEventTypeDetails: false });
  }, []);

  if (!SITE.cal) return null;
  return <div ref={ref} className={styles.cal} />;
}
