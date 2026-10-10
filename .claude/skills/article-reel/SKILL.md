---
name: article-reel
description: Transforme un réel Instagram de Studio Lixivel en article complet du journal, optimisé SEO/GEO, avec liens internes et champ « réel » rempli. À utiliser quand Tony donne un lien de réel Instagram (instagram.com/reel/…) et veut un article.
---

# Article à partir d’un réel Instagram

Entrée : un lien `https://www.instagram.com/reel/…` (ou `/p/…`), **ou rien** : traiter alors la file d’attente `content/reels/*.md` (demandes ajoutées par Cindy dans Pages CMS, collection « Réels à transformer en article »). Sortie : `content/journal/{slug}.md` **en brouillon** + images dans `public/images/journal/{slug}/`, vérifié en local. Pas de commit sans l’accord de Tony.

## 0. File d’attente (sans argument)

Lister les fichiers de `content/reels/` dont `statut` vaut « à traiter ». Pour chacun : lire `url` et `notes` (les consignes de Cindy priment : angle, ville, budget, marques, liens produits, choses à ne pas dire), faire les étapes 1 à 6, puis mettre à jour la demande : `statut: brouillon créé` et `article: {slug}` (ou `statut: erreur` + la raison dans `notes`). S’il n’y a rien à traiter, le dire.

## 1. Préparer le réel

```bash
scripts/reel.sh "<lien>" "<scratchpad>/reel-<id>"
```

Le script télécharge le réel et produit `infos.json` (légende, date, durée), `transcription.txt` (ce que dit Cindy, en français), `images/image-XX.jpg` (une image toutes les 2 s) et `vignette.jpg`. S’il échoue parce qu’Instagram bloque : demander à Tony de se connecter à Instagram dans Chrome ou Safari, puis relancer. Si les outils manquent : `brew install yt-dlp ffmpeg whisper-cpp` et le modèle `ggml-large-v3-turbo-q5_0.bin` dans `~/.cache/whisper-cpp/`.

## 2. Analyser

- Lire `infos.json` et `transcription.txt` en entier. La transcription peut contenir des erreurs de reconnaissance (noms de marques, termes techniques) : corriger d’après le contexte, sans inventer.
- Regarder **toutes** les images (outil Read) : pièce, avant/après, meubles, couleurs, matières, texte affiché à l’écran.
- Pour regarder vite les ~30 images : les assembler en planches (`ffmpeg -i images/image-%02d.jpg -frames:v 1 -vf "scale=300:-2,tile=8x2" planche.jpg`, avec `-start_number 17` pour la 2e). Le `ffmpeg` de Homebrew n’a pas `drawtext`.
- Les réels de Cindy ont des **sous-titres incrustés** : ils complètent la transcription (Whisper saute parfois une phrase, souvent la phrase finale) ; extraire 2-3 images/s sur les passages flous pour les lire.
- Distinguer un projet **réalisé** (vidéo du chantier, photos) d’un projet **présenté en rendus 3D** : dans ce cas, l’écrire clairement (« conçu en 3D »), ne jamais le présenter comme terminé.
- En tirer : le sujet, le problème résolu, chaque conseil donné, les chiffres (cotes, prix, délais), les produits montrés.

## 3. Choisir l’angle SEO

Une requête principale que les gens tapent vraiment, liée au sujet du réel (ex. réel « mon astuce pour agrandir une entrée » → « aménager une petite entrée »). Vérifier dans `content/journal/` qu’aucun article ne vise déjà cette requête. Si le sujet du réel correspond à une ligne de `docs/plan-editorial.md`, reprendre sa requête et mettre la ligne à jour (« Brouillon »). Annoncer la requête choisie à Tony en une ligne.

## 4. Rédiger

Suivre la skill `article-seo` (structure, maillage, frontmatter, ton). En plus :
- Le réel est la **base** : chaque conseil de Cindy devient une section. On complète par de l’expertise générale (méthode, cotes standard, erreurs fréquentes) pour atteindre 900-1 500 mots, sans inventer de projet, de client ni de chiffre attribué au studio.
- Ses formulations fortes peuvent servir de citation « Le conseil du studio » (`> `).
- `date` = date de publication du réel. `categorie` d’après le sujet.
- Champ `reel` : `url` = lien du réel, `vignette` = `/images/journal/{slug}/vignette.jpg`, `legende` = 1re ligne de la légende (raccourcie, entre guillemets).
- `vertical: true` et **`brouillon: true`** : l’article n’apparaît nulle part sur le site (journal, sitemap, llms.txt, « À lire aussi ») ; Cindy le relit et le modifie dans Pages CMS, puis décoche « Brouillon » pour le publier. En attendant, il est visible par son lien, avec un bandeau « Brouillon », et non indexé.
- `cover` : la meilleure image (nette, pièce entière, après si avant/après), copiée en `cover.jpg` ; `coverAlt` la décrit vraiment. 1 à 3 autres images dans le texte avec `![description](/images/journal/{slug}/xx.jpg "légende")` aux bons endroits (ex. avant/après).
- `produits` : seulement ceux montrés ou nommés dans le réel ; `lien` vide si inconnu, à compléter par Tony.
- Les hashtags de la légende aident à choisir `etiquettes`, pas à remplir le texte.

## 5. Images

```bash
mkdir -p public/images/journal/{slug}
cp <dossier>/vignette.jpg public/images/journal/{slug}/vignette.jpg
cp <dossier>/images/image-XX.jpg public/images/journal/{slug}/cover.jpg   # etc.
```

**Toutes les photos de l’article sont verticales, au format 4:5**, pour rester raccord avec le réel, et `vertical: true` dans le frontmatter : les images du texte s’affichent alors sans recadrage. La couverture, elle, reste en hero pleine largeur (recadrée en paysage au centre) : choisir une image dont le sujet est au milieu de la hauteur. Le script télécharge la vidéo en 1080 × 1920 (vérifier avec `ffprobe`) ; les images du dossier `images/` ne sont qu’un aperçu en 720 px avec sous-titres. Pour chaque photo retenue, réextraire depuis `video.mp4` à l’instant voulu, en 4:5 au-dessus des sous-titres (qui commencent vers 72 % de la hauteur) : `ffmpeg -ss 44 -i video.mp4 -frames:v 1 -vf "crop=1080:1350:0:10" -q:v 2 cover.jpg`. Si une bande noire apparaît sur un bord (transition), décaler et réduire en gardant le 4:5 (ex. `crop=1056:1320:20:10`). Vérifier chaque image (pas de sous-titre, pas de flou de mouvement).

Ne copier que les images utilisées. Ne rien mettre dans le repo depuis le dossier de travail en dehors de ça (pas la vidéo).

## 6. Vérifier et rendre la main

- YAML valide (guillemets si « : » dans une valeur) : `node -e 'require("gray-matter")(require("fs").readFileSync("content/journal/{slug}.md","utf8"))'`.
- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/blog/{slug}` → 200, et les liens internes de l’article répondent 200. Si un nouvel article répond 404 alors que le fichier est valide, le serveur de dev a gardé l’ancienne liste : `touch "app/blog/[slug]/page.tsx"` puis réessayer.
- Résumé pour Tony : requête visée, titre, lien local, nombre de mots, liens ajoutés, et la liste **à valider par Cindy** (passages complétés hors réel, produits sans lien, mots mal transcrits incertains).
