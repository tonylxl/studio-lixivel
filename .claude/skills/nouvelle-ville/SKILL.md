---
name: nouvelle-ville
description: Crée une page locale « Architecte d’intérieur à {ville} » (content/villes/*.md) pour Studio Lixivel, avec un contenu vraiment propre à la ville. À utiliser quand Tony demande d’ajouter une ville, une page locale ou une zone d’intervention.
---

# Ajouter une page ville

Une page ville = un fichier `content/villes/{slug}.md` (slug sans accents, ex. `saint-etienne`). La page `/architecte-interieur/{slug}`, le sitemap, `llms.txt`, la page « Zones d’intervention » et les données structurées se mettent à jour seuls. Ne pas toucher au code.

## Règle n° 1 : pas de page satellite

Google pénalise les pages où seul le nom de la ville change. Chaque page doit apporter un contenu **propre à la ville**. Avant d’écrire, relire 2 fichiers existants de `content/villes/` et vérifier que rien n’est recopié (même structure de phrases, mêmes listes).

Contenu local attendu :
- les **logements typiques** et leurs contraintes (ex. échoppe bordelaise, canut lyonnais, toulousaine, trois-fenêtres marseillais) ;
- 6 à 8 **quartiers ou communes** réels ;
- 3 à 4 problèmes concrets que le studio résout dans ce type de logement ;
- 2 ou 3 **questions de FAQ** spécifiques (pas les questions génériques de `data/faq.ts`).

Ne jamais inventer de projet, de client, de chiffre ou d’avis dans la ville. Pas de « Rouen » dans les pages des autres villes, sauf pour situer le studio.

## Façon d’intervenir (décision du 9 oct. 2026)

Mixte : conseils et décoration 100 % à distance partout ; pour semi-complète et complète, visite ou déplacement possible selon le projet, à discuter au premier échange. Tarifs identiques partout (voir CLAUDE.md, ne pas les réécrire autrement).

## Gabarit

```markdown
---
nom: Saint-Étienne
region: Auvergne-Rhône-Alpes
ordre: 9
couleur: sauge            # rose, sauge, moutarde, lin, doux, ardoise
intro: "1 à 2 phrases, ce qui caractérise les intérieurs de la ville + à distance."
deplacement: "Comment le studio intervient ici."
quartiers:
  - Quartier 1
seoTitle: "Architecte d’intérieur à {Ville} · {angle local}"     # ≤ 60 caractères si possible
seoDescription: "≤ 155 caractères, avec « architecte d’intérieur », la ville, un bénéfice et « dès 35 €/m² »."
faq:
  - q: "Question ?"
    r: "Réponse factuelle en 2-3 phrases."
---

## Les intérieurs {de la ville}

## Ce que le studio vous propose à {Ville}

- …

## Comment ça se passe
```

## Pièges

- **YAML** : toute valeur qui contient « : » doit être entre guillemets, sinon toutes les pages du site tombent en erreur 500. Mettre des guillemets par défaut sur `intro`, `deplacement`, `seo*`, `q`, `r`.
- Apostrophes typographiques ’ et espaces avant « : ; ? ! » comme le reste du site.
- Vérifier : `node -e 'require("gray-matter")(require("fs").readFileSync("content/villes/{slug}.md","utf8"))'` puis `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/architecte-interieur/{slug}` → 200.
- Signaler à Tony que le texte est à faire relire par Cindy.
