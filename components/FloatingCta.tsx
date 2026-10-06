"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { rdvHref } from "@/lib/site";
import styles from "./FloatingCta.module.css";

/**
 * CTA flottant « Prendre rendez-vous » : fixe en bas à droite, posé sur le hero
 * puis présent pendant toute la lecture, il se masque quand le footer est visible.
 */
export default function FloatingCta({ source = "cta-flottant" }: { source?: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("[data-footer]");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0 });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <Link href={rdvHref(source)} className={styles.cta} data-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined}>
      Prendre rendez-vous
    </Link>
  );
}
