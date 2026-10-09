---
name: article-seo
description: Écrit ou optimise un article du journal de Studio Lixivel (content/journal/*.md) pour Google et pour être cité par les IA (ChatGPT, Perplexity, AI Overviews). À utiliser quand Tony demande un article, un sujet de blog, ou d’optimiser un article existant, y compris à partir d’un réel Instagram.
---

# Article du journal optimisé SEO / GEO

Les articles sont des fichiers `content/journal/{slug}.md`. Relire un article existant (ex. `amenager-studio-30-m2-bureau.md`) pour le format exact du frontmatter avant d’écrire.

## 1. Choisir l’angle

- **Une requête principale** que les gens tapent vraiment (« aménager un studio de 30 m² », « quelle couleur pour une chambre sombre »). La mettre dans le titre, le `seoTitle`, le premier paragraphe et un intertitre.
- Préférer les sujets où Cindy a une vraie expertise : petits espaces, agencement, décoration à petit budget, rénovation légère.
- Vérifier qu’aucun article existant ne vise déjà la même requête (sinon on optimise l’existant).

## 2. Structure

- `chapo` : 2-3 phrases, répond directement à la question (c’est ce que reprennent les IA).
- Intertitres H2 (`## `) formulés comme des questions ou des étapes ; ils génèrent le sommaire.
- Sous chaque H2, **la réponse en une phrase d’abord**, puis le détail. Des chiffres concrets (cotes en cm, budgets en €, délais).
- Une citation `> ` = encadré « Le conseil du studio » : 1 par article, le conseil le plus utile.
- `[[produits]]` seul sur une ligne pour placer la sélection, si l’article en a.
- 900 à 1 500 mots. Pas de remplissage.

## 3. Maillage et conversion

- 2-3 liens internes : `/services#decoration` (ou la formule adaptée), un projet `/projets/{slug}`, un autre article.
- Si le sujet a un angle local évident, un lien vers une page ville `/architecte-interieur/{slug}`.
- Une phrase de fin qui propose le questionnaire (`/contact?source=article-{slug}`), sans ton commercial lourd.

## 4. Frontmatter SEO

- `seoTitle` ≤ 60 caractères, `seoDescription` ≤ 155 caractères avec la requête et un bénéfice. Guillemets si la valeur contient « : ».
- `coverAlt` décrit vraiment l’image. `etiquettes` : 2-4.
- `categorie` parmi : Petits espaces, Salon, Chambre, Cuisine, Petit budget, Rénovation, Avant / après.

## Ton

Voix du site : « le studio » pour se décrire, « vous » pour le lecteur, français simple, phrases courtes. Ne pas inventer de témoignage client ni de chiffre de projet. Signaler à Tony ce qui est à valider par Cindy.
