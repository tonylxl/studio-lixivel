"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV, SITE, rdvHref } from "@/lib/site";
import styles from "./Header.module.css";

type Props = {
  /**
   * "dark" : textes clairs sur une ouverture foncée (ardoise).
   * "overlay" : nav transparente au-dessus d'une ouverture qui a sa propre couleur (hero de l'accueil, hub Projets).
   * Sinon la nav prend la couleur d'ouverture de la page (PageTone) et passe au blanc au premier scroll.
   */
  variant?: "light" | "dark" | "overlay";
  /** Source envoyée au formulaire quand on clique sur « Prendre rendez-vous ». */
  source?: string;
};

export default function Header({ variant = "light", source = "header" }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const anchorY = useRef(0);

  useEffect(() => {
    // Disparaît quand on descend, revient dès qu'on remonte. On cumule le déplacement
    // depuis le dernier changement de sens, pour réagir aussi aux scrolls lents (trackpad).
    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      setScrolled(y > 8);
      if (y === lastY.current) return;
      const goingDown = y > lastY.current;
      const wasGoingDown = lastY.current > anchorY.current;
      if (goingDown !== wasGoingDown) anchorY.current = lastY.current;
      const delta = y - anchorY.current;
      if (y < 80) setHidden(false);
      else if (delta > 12) setHidden(true);
      else if (delta < -12) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={styles.header}
        data-variant={variant}
        data-scrolled={scrolled || undefined}
        data-hidden={(hidden && !open) || undefined}
      >
        <Link href="/" className={styles.brand} aria-label="Studio Lixivel, accueil">
          Studio Lixivel<span className={styles.brandMore}>, architecte d’intérieur</span>
        </Link>
        <div className={styles.actions}>
          <Link href={rdvHref(source)} className={`btn ${styles.cta}`}>
            <span className={styles.ctaLong}>Prendre rendez-vous</span>
            <span className={styles.ctaShort}>Rendez-vous</span>
          </Link>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen(true)}
          >
            Menu <span className={styles.dot} aria-hidden />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-principal"
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.overlayTop}>
              <Link href="/" className={styles.brand}>
                Studio Lixivel<span className={styles.brandMore}>, architecte d’intérieur</span>
              </Link>
              <button type="button" className={styles.menuBtn} onClick={() => setOpen(false)}>
                Fermer <span className={styles.cross} aria-hidden />
              </button>
            </div>

            <nav className={styles.nav} aria-label="Navigation principale">
              <ul>
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      className={styles.navLink}
                      aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                    >
                      <span className={styles.navIndex}>0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className={styles.overlayBottom}>
              <div className={styles.overlayInfos}>
                <a href={`mailto:${SITE.email}`} className={styles.lien}>
                  {SITE.email}
                </a>
                <span className="c-2">{SITE.ville} · {SITE.zone}</span>
              </div>
              <div className={styles.overlaySocial}>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={styles.lien}>
                  Instagram
                </a>
                <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" className={styles.lien}>
                  TikTok
                </a>
                <Link href={rdvHref("menu")} className="btn">
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
