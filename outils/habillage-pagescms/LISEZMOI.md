# Habillage et traduction de Pages CMS

Petite extension Chrome qui habille **app.pagescms.org** avec la police (Schibsted Grotesk) et les couleurs du site :
textes et boutons bruns, fonds crème et rose, arrondis du site, et un éditeur de texte proche du rendu des articles
(intertitres, encadré « Le conseil du studio » pour les citations). Elle ne lit ni n’envoie aucune donnée :
elle ajoute seulement une feuille de style et une traduction sur Pages CMS.

**Traduction** (`traduction.js`) : Pages CMS n’existe qu’en anglais ; le script remplace les textes de l’interface par leur version française (environ 200 textes relevés dans le code source de Pages CMS, plus les dates relatives « il y a 2 heures »). Il ne touche jamais au contenu saisi (éditeur, champs). Un texte resté en anglais : l’ajouter au dictionnaire `FR` en haut du fichier.

**Aides** (`aides.js`) : pour une personne qui découvre l’outil. En haut des collections Projets, Blog et Réels, et en haut de leurs formulaires, un bandeau rose explique quoi faire en 2 ou 3 étapes (avec les liens vers le site et vers l’aperçu des brouillons). Les longs formulaires (Projets, Blog) sont découpés en sections numérotées (« 1. L’essentiel », « 2. La photo principale »…). Les champs sont repérés par leur libellé dans `.pages.yml` : si un libellé change, le changer aussi dans `SECTIONS`. Les aides sous chaque champ, elles, s’écrivent directement dans `.pages.yml` (`description`).

**Dictée vocale** (`dictee.js`) : sur une fiche projet (ajout ou modification), un panneau « Dicter le projet » reste en haut de l’écran. On clique sur le micro et on parle :
- *mode guidé* : le champ en cours est entouré en vert ; ce qu’on dit s’y écrit, puis on passe tout seul au suivant. « Suivant », « Précédent », « Efface », « Stop » ; cliquer dans un champ le rend actif ;
- *mode libre* : une phrase qui commence par le nom d’un champ va dans ce champ, plusieurs à la fois : « ville Rouen, année 2024, surface 80 mètres carrés, formule semi-complète » ;
- mise en forme automatique : « 80 mètres carrés » → 80 m², « 45000 euros » → 45 000 €, « deux mille vingt-cinq » → 2025, formule et couleur reconnues (« vert » → sauge), ponctuation dictée (« virgule », « point », « à la ligne ») pour le brief, les légendes et l’avis (chaque phrase s’ajoute à la suite) ; une phrase par contrainte.
Les photos restent à ajouter à la main. Reconnaissance vocale de Chrome (gratuite, sans clé ; le son est transcrit par Google) : marche dans **Google Chrome**, pas forcément dans Dia. Au premier clic, Chrome demande l’autorisation du micro. Les champs sont repérés par leur libellé (`CHAMPS` en haut du fichier).

## Installer (2 minutes, sur chaque ordinateur)

1. Récupérer ce dossier `habillage-pagescms` sur l’ordinateur (Tony peut l’envoyer en .zip, à décompresser).
2. Dans Chrome, ouvrir `chrome://extensions`.
3. Activer **Mode développeur** (en haut à droite).
4. **Charger l’extension non empaquetée** → choisir le dossier `habillage-pagescms`.
5. Recharger Pages CMS : l’habillage s’applique.

Pour mettre à jour après une modification : `chrome://extensions` → bouton ↻ de l’extension, puis recharger Pages CMS.

## Modifier

Tout est dans `habillage.css` : Pages CMS se règle par variables CSS (`--primary`, `--background`, `--radius`…).
Si une mise à jour de Pages CMS change son interface, seules quelques règles de l’éditeur (`.ProseMirror`) pourraient
être à ajuster ; les couleurs, basées sur les variables, ne devraient pas bouger.
