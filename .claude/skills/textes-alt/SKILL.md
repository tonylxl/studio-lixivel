---
name: textes-alt
description: Repère les images de contenu du site Studio Lixivel sans description (texte alternatif) et en propose une en regardant chaque image, directement dans les fichiers de content/. À utiliser quand Tony demande « /textes-alt », de compléter les descriptions des photos, ou après l’ajout de photos (projets importés, nouvel article).
---

# Textes alternatifs des images

Les descriptions d’images servent à Google Images et aux personnes malvoyantes (lecteurs d’écran). Cindy peut les écrire dans Pages CMS ; cette commande complète celles qui manquent. Argument optionnel : un fichier ou un dossier (ex. `content/projets/loft.md`) pour limiter la recherche.

## 1. Lister ce qui manque

Chercher dans `content/` (ignorer `content/reels/` et `content/donnees/` sauf `avis.json`) :

- **Projets** (`content/projets/*.md`) : `coverAlt` vide ou égal au titre ; chaque élément de `galerie` sans `alt` (l’ancien format, une simple liste de chemins, est à convertir en `- image: … / alt: …`) ; `avant.legende` / `apres.legende` vides.
- **Articles** (`content/journal/*.md`) : `coverAlt` vide ; images du texte `![](/images/…)` avec un alt vide ; produits sans photo décrite (pas d’alt à ajouter : décoratif).
- **Villes** : rien (pas d’image propre).

Annoncer à Tony le nombre d’images à décrire, fichier par fichier, avant d’écrire.

## 2. Regarder chaque image

Ouvrir chaque image avec l’outil Read (`public` + chemin, ex. `public/images/projets/loft/salon.jpg`). Ne jamais décrire une image sans l’avoir vue. Si le fichier n’existe pas, le signaler et passer.

## 3. Écrire la description

- **Ce qu’on voit**, concret et utile : pièce, meuble principal, matières, couleurs, lumière. 80 à 140 caractères, 200 max.
- Pas de « Photo de… », « Image de… », pas de mots-clés empilés, pas de nom de client.
- Ajouter le contexte du projet quand il aide (« dans un studio de 14 m² », « salle de bain en béton ciré »), sans répéter mot pour mot le titre.
- Français simple, première lettre en majuscule, pas de point final.
- Exemples : « Coin bureau en bois clair sous la fenêtre, chaise laquée rouge et lampadaire en rotin » · « Salle de bain en béton ciré gris, vasque posée sur un meuble en chêne ».

Écrire dans le fichier en respectant le format existant (YAML du frontmatter : guillemets si la valeur contient « : »). Vérifier ensuite que le fichier se lit :
`node -e 'require("gray-matter")(require("fs").readFileSync("FICHIER","utf8"))'`

## 4. Rendre compte

Lister à Tony les descriptions écrites (fichier → image → description), et rappeler que Cindy peut les retoucher dans Pages CMS. Ne pas commiter sans l’accord de Tony.
