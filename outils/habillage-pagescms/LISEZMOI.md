# Habillage de Pages CMS aux couleurs du studio

Petite extension Chrome qui habille **app.pagescms.org** avec la police (Schibsted Grotesk) et les couleurs du site :
textes et boutons bruns, fonds crème et rose, arrondis du site, et un éditeur de texte proche du rendu des articles
(intertitres, encadré « Le conseil du studio » pour les citations). Elle ne lit ni n’envoie aucune donnée :
elle ajoute seulement une feuille de style sur Pages CMS.

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
