# Studio Lixivel — site web

Site de **Studio Lixivel**, studio d’architecture intérieure de **Cindy** (sœur de Tony), basé à Rouen. Projet piloté par Tony. Toutes les réponses et tous les textes du site sont **en français**.

## Historique du projet

1. Maquettes faites dans **Figma** (fichier `lk7wByl71xrJAmiZKAN84P`, page « Web » : home « Home V4 — Desktop 1440 », section « Pages intérieures — Desktop » avec Services, Projets, Projet détail, Le studio, Contact, FAQ, Mentions légales, Journal, Article, Simulateur).
2. Première tentative dans **Framer**, abandonnée (limites du plugin MCP).
3. Décision du 6 oct. 2026 : **site custom en Next.js**, hébergé sur **Vercel**, contenus éditables par Cindy via **Pages CMS** (fichiers Markdown dans le repo).
4. Le code a d’abord été écrit sans pouvoir lancer `npm`. Premier build réussi le 6 oct. 2026, puis passe de conformité aux maquettes (frames « Home V4 » et « Pages intérieures — Desktop ») et à leurs annotations « Motion — … ».

## Stack

- Next.js (App Router) + React 19 + TypeScript, CSS Modules + `app/globals.css` (tokens en variables CSS), pas de Tailwind.
- `motion` (ex-Framer Motion) pour les animations, `gray-matter` + `marked` pour le Markdown.
- Police : Schibsted Grotesk via `next/font/google`.

## Arborescence

- `app/` : pages (`page.tsx` accueil, `services`, `faq`, `contact`, `le-studio`, `projets` + `[slug]`, `journal` + `[slug]`, `mentions-legales`, `sitemap.ts`, `robots.ts`, `not-found.tsx`).
- `components/` : Header (menu plein écran), Footer (+ bandeau RDV rose, prop `band`), Opening (ouverture de page colorée), PageTone (fond coloré → blanc au scroll), SectionHead, Reveal, Accordion, AvantApres (slider), Simulateur, TallyEmbed, HeroHome (boucle de couleurs + tabouret ton sur ton via mask CSS), ProcessCards, Avis, ProjetsHub (écran partagé), StudioNav, JournalList, ArticleCard, ArticleAside.
- `lib/site.ts` : constantes (nav, email, réseaux, couleurs d’ouverture `TONES`, `rdvHref(source)`).
- `lib/content.ts` : lecture des collections Markdown, rendu Markdown (ancres H2 → sommaire, citation → encadré « Le conseil du studio », marqueur `[[produits]]`).
- `data/` : `services.ts` (4 formules, comparatif, étapes), `faq.ts`.
- `content/projets/*.md`, `content/journal/*.md` : contenus (frontmatter).
- `public/images/` : visuels provisoires exportés de Figma (bureau, bureau-nb, chambre, plan, portrait, tabouret, tabouret-rose, fauteuil, fauteuil-lin, lampe).
- `.pages.yml` : configuration Pages CMS (à tester en vrai).

## Règles de design (issues des maquettes)

- Grille desktop 1440 : gouttière 40 px, titre à gauche (695 px), texte/description à partir de x = 735 (`--col: 51.1%`), description 330 px. Tablette : gouttière 24 px. Mobile : 20 px, une colonne.
- En-tête de section : filet fin en haut, titre 40 semi-gras à gauche, texte à droite.
- **Arrondis** : ≥ 300 px → 70 (`--r-xl`), 200–299 → 40, 80–199 → 24, < 80 → 12, pastilles → 999.
- **Une couleur d’ouverture par page** (effet inspiré de cri-sf.com) : toute la page, nav comprise, est colorée tant qu’on est en haut, et repasse en blanc (fondu 0,6 s) dès qu’on commence à défiler (`<PageTone>`, seuil 8 px) ; elle revient en remontant tout en haut. Services sauge, FAQ lin, Contact moutarde, Le studio crème (doux), Journal & articles ardoise, Projets couleur du projet, Mentions doux, 404 rose. Accueil et hub Projets : leur ouverture a sa propre couleur, nav transparente (`variant="overlay"`). Ouvertures ardoise : texte clair (`data-dark`) qui repasse en brun sur blanc ; le contenu sous l’ouverture reste sur blanc (`.sur-blanc`).
- Motion (annotations Figma) : CTA flottant (masqué près du footer et sur mobile), presse 60 → 100 % au survol, intro ligne par ligne, titres de projets en masque, cartes Processus / En chiffres qui se rangent au scroll (`SettleCard`), zoom 1,08 → 1 (`ScrollZoom`), slider avant/après qui fait un aller-retour à l’entrée, « Prenons rendez-vous » en masque et tabouret qui tourne au scroll (`FooterStool`).
- Couleurs : fond rose #f7dddf, lin #e0d9d2, doux #f6f2ef, sombre #494141, accent bordeaux #8c373c, texte #494141 / #726d67, inverse #ffe5e3, sauge #bcd4b4, ardoise #5d7c86, moutarde #fcc976.
- Survol des lignes : rose pâle #fff2f2. Illustrations au trait bordeaux (tabouret, fauteuil, lampe).

## Décisions éditoriales

- Voix : « Le studio » pour se décrire, « nous » quand on s’adresse au client ; mettre en avant la fondatrice, Cindy.
- Navigation dans le menu burger (Projets, Services, Le studio, Journal, FAQ, Contact). Pas de carte cadeau, pas de CGV.
- « +60 projets ». Pas de bouton dans les réponses de la FAQ.
- SEO : H1 avec « architecte d’intérieur », **sans** « Rouen » (Cindy vise plus large). Stratégie SEO à définir plus tard avec Tony.
- Tous les boutons « Prendre rendez-vous » mènent à `/contact?source=…` (formulaire Tally intégré, la source est transmise au formulaire).
- **Tarifs (validés par Cindy le 8 oct. 2026)**, toujours affichés « à partir de » : Agencement & conseils **35 €/m²** ; Agencement & décoration **dès 55 €/m²** (dégressif quand la surface augmente) ; Semi-complète **dès 90 €/m²** ; Prise en charge complète **à partir de 5 000 €**. **Plus d’offre 18–29 ans / étudiants / nouveaux propriétaires.**
- **Délais** : Conseils 15 jours ; Décoration 15 jours pour l’agencement puis 1 à 4 mois pour la déco (selon les modifications) ; Semi-complète et Complète environ 6 mois selon le projet.
- Process tarifaire de Cindy : après le questionnaire, elle envoie une fourchette, puis le prix exact par email (le simulateur sert à prévenir, pas à chiffrer).
- Simulateur (page Services, ancre `#simulateur`) : honoraires du studio seulement, « À partir de » = surface × tarif de base (min. 5 000 € pour la complète), arrondi à 10 € ; CTA vers le formulaire avec formule + surface.
- Journal : un article peut être écrit à partir d’un réel Instagram ; champ « réel » (lien, vignette, légende) affiché dans la colonne de gauche de l’article.

## À faire / à valider

- [x] **Premier build** et corrections (`npm run build`), vérification visuelle desktop (1440) et mobile (390).
- [ ] Vérification visuelle tablette (768–1024).
- [ ] Projet Vercel relié au repo (import par Tony) ; variable `NEXT_PUBLIC_TALLY_FORM_ID` (formulaire Tally à refaire d’après `docs/questionnaire-tally.md`) ; `NEXT_PUBLIC_SITE_URL` une fois le domaine choisi.
- [ ] Tester Pages CMS (app.pagescms.org) : vérifier que le champ `body` en rich-text s’affiche bien (intertitres, citation → encadré, `[[produits]]`).
- [ ] Contenus inventés à valider avec Cindy : réponses FAQ, 3 avis sur 4 (seul Matthieu est réel), texte « L’histoire », chiffres, fiche projet « Studio 30 m² », villes/années des projets, 6 articles d’exemple du journal, liens presse (actuellement `#`), comptes Instagram/TikTok.
- [ ] Mentions légales : nom, adresse, SIRET (champs entre crochets).
- [ ] Remplacer les photos provisoires par les vraies photos de Cindy, logos presse en SVG, logo.
- [ ] Domaine, redirections 301 depuis l’ancien site, analytics.
