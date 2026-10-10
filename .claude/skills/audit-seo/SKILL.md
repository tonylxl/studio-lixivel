---
name: audit-seo
description: Audit SEO / GEO technique du site Studio Lixivel (titres, descriptions, H1, données structurées, sitemap, liens internes, images, llms.txt) sur le serveur local ou le site en ligne. À utiliser quand Tony demande un audit, un check SEO, ou avant une mise en ligne importante.
---

# Audit SEO du site

Par défaut sur `http://localhost:3000` (le `npm run dev` de Tony). Si Tony le demande, sur l’URL en ligne. Ne rien modifier pendant l’audit : rendre un rapport, puis proposer les corrections.

## 1. Lister les pages

`curl -s {base}/sitemap.xml` → toutes les URL. Vérifier que chaque page de `app/` et chaque fichier de `content/` y figure, et qu’aucune URL ne répond autre chose que 200 (remplacer le domaine du sitemap par la base testée).

## 2. Pour chaque page

Récupérer le HTML (`curl -s`) et vérifier :
- `<title>` présent, unique, ≤ 60 caractères, contient « architecte d’intérieur » sur les pages clés ;
- `<meta name="description">` unique, 120-160 caractères ;
- **un seul `<h1>`** ; la home sans « Rouen » (décision de Cindy), les pages villes avec la ville ;
- `<link rel="canonical">` sur les pages villes ;
- images : `alt` présent (vide accepté seulement pour les images décoratives) ;
- `application/ld+json` : JSON valide, types attendus (`ProfessionalService` partout ; `Service` + `BreadcrumbList` + `FAQPage` sur les villes ; `FAQPage` sur /faq ; article sur le journal) ;
- liens internes cassés (href internes qui renvoient 404).

Faire un petit script Node dans le scratchpad plutôt que des dizaines de curl à la main.

## 3. Contenu

- Doublons : comparer les pages villes deux à deux (phrases identiques en dehors du nom de la ville) → risque de pages satellites.
- Titres ou descriptions en double entre pages.
- Pages orphelines (aucun lien interne vers elles).

## 4. GEO (IA)

- `{base}/llms.txt` répond et liste formules, villes, projets, articles.
- `robots.txt` n’interdit pas GPTBot, ClaudeBot, PerplexityBot, Google-Extended. Exception voulue : tant que `NEXT_PUBLIC_SITE_URL` n’est pas renseigné dans Vercel (ou en local), tout est en `Disallow` + `noindex` (`INDEXABLE` dans `lib/site.ts`).
- Les réponses de FAQ et les chapôs donnent une réponse directe en 1-2 phrases.

## 5. Hors code (à rappeler, pas à vérifier)

Google Search Console + sitemap envoyé, fiche Google Business Profile, avis Google, redirections 301 de l’ancien site, `NEXT_PUBLIC_SITE_URL` sur Vercel.

## Rapport

En français, trié par impact : **Bloquant** (erreurs, pages absentes, JSON-LD invalide), **Important** (titres/descriptions, doublons), **Bonus**. Pour chaque point : page, problème, correction proposée. Demander à Tony avant de corriger.
