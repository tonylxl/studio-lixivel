# Questionnaire « Débuter votre projet » (Tally)

Remplace l’ancien formulaire (`studiolixivel.com/debuter-votre-projet`). Objectif : des réponses exploitables sans relance, en environ 5 minutes. Le studio reçoit ensuite assez d’infos pour envoyer une fourchette de prix.

## Ce qui n’allait pas dans l’ancien formulaire (constaté sur une vraie réponse)

| Ancienne question | Problème constaté | Correction |
|---|---|---|
| Coordonnées en premier | Fait fuir avant d’avoir parlé du projet | Coordonnées à la fin |
| « Quelle est la pièce à modifier ? » | La cliente a coché « Studio » (un type de bien, pas une pièce) | « Studio » passe dans *Type de bien* ; liste de pièces claire |
| « Nombre d’habitants et âges » (texte libre) | Réponse « 1/2 23/50ans », illisible | Deux nombres : adultes, enfants |
| Prestations avec longues descriptions + case « J’ai bien lu le prix (60–120 €/2) » | Lourd, prix obsolète, case inutile | Un seul choix avec le prix « dès … » ; case supprimée |
| Superficie (texte libre) | « 25,26 » | Champ *Nombre* (décimales autorisées), unité m² |
| Budget (texte libre) | « 10000/11000€ » | Tranches à cocher |
| Date de début (texte libre) | « 1/2mois » | Choix fermés |
| « Contraintes du projet » + « Contraintes spatiales » | Doublon (« Aucune » à la 2e) | Une seule question |
| Usage du logement non demandé | L’info clé (location courte durée) n’est apparue qu’en remarque libre | Nouvelle question *Usage du logement* |
| « Termes et conditions » | Pas de CGV | Supprimé, on garde seulement la case RGPD |

## Réglages Tally

1. **Nouveau formulaire** → titre : « Débuter votre projet ». Pagination : 4 pages + remerciement. Formulaire en ligne : `obr965` (tally.so/forms/obr965/edit). Sous le titre : « Environ 5 minutes · 4 étapes · réponse sous 48 h ».
2. **Champs cachés** (bloc *Hidden fields*, en haut) : `source`, `formule`, `surface`, `article`. Le site les remplit tout seul via l’URL (bouton cliqué, simulateur, article du journal).
3. **Logique** : la question *Formule* ne s’affiche que si `formule` est vide ; la question *Surface* ne s’affiche que si `surface` est vide (sinon la valeur du simulateur est déjà connue).
4. **Notifications** (Integrations → Email notifications) : envoyer chaque réponse à `contact@studiolixivel.com`, avec *Reply-to* = l’email du client (Cindy répond directement depuis sa boîte).
5. **Apparence** : police *Schibsted Grotesk* si disponible (sinon Inter), bouton bordeaux `#8c373c`, texte `#494141`, fond blanc. Masquer le titre (le site l’affiche déjà).
6. **Publier**, puis copier l’identifiant dans l’URL `tally.so/r/XXXXXX` → variable `NEXT_PUBLIC_TALLY_FORM_ID` dans Vercel.

## Page 1 — Votre projet

1. **Quelle formule vous intéresse ?** *(choix unique, obligatoire, affichée seulement si `formule` vide)*
   - Agencement & conseils · dès 35 €/m²
   - Agencement & décoration · dès 55 €/m²
   - Prestation semi-complète · dès 90 €/m²
   - Prise en charge complète · à partir de 5 000 €
   - Je ne sais pas encore, aidez-moi à choisir
2. **Type de bien** *(choix unique, obligatoire)* : Appartement / Studio / Maison / Local professionnel
3. **Usage du logement** *(choix unique, obligatoire)* : Résidence principale / Résidence secondaire / Location courte durée (Airbnb, voyageurs d’affaires) / Location longue durée / Bien à vendre (home staging)
4. **Vous êtes** *(choix unique)* : Propriétaire / Locataire / En cours d’achat
5. **Ville** *(texte court, obligatoire)*

## Page 2 — L’espace et vos envies

6. **Pièces concernées** *(choix multiples, obligatoire)* : Pièce de vie / Cuisine / Chambre / Salle de bain / Bureau / Entrée / Tout le logement
7. **Surface concernée** *(nombre, m², obligatoire, affichée seulement si `surface` vide)*
8. **Qui vit (ou séjourne) ici ?** *(deux champs nombre côte à côte, facultatifs)* : Adultes · Enfants
9. **Ce qui ne va pas aujourd’hui** *(choix multiples, facultatif)* : Manque de lumière / Manque de rangements / Pièce peu fonctionnelle / Circulation difficile / Déco datée / Rien de particulier
10. **Ce que vous souhaitez faire** *(choix multiples, obligatoire)* : Réagencer / Décorer et meubler / Changer les sols / Peinture et revêtements / Travaux (cloisons, cuisine, salle de bain) / Home staging
11. **Quelle ambiance ?** *(choix multiples, 2 max, facultatif ; en images quand on aura 6 photos du studio)* : Cosy / Minimaliste / Classique chic / Bohème / Coloré / Industriel doux
12. **Ce que vous aimez** *(texte long, facultatif)* : « Matières, couleurs, un hôtel ou un lieu qui vous inspire… »
13. **Ce qu’il faut absolument éviter** *(texte long, facultatif)*
14. **Un tableau Pinterest ou des photos d’inspiration ?** *(lien, facultatif)*

## Page 3 — Budget, calendrier et photos

15. **Budget global mobilier + travaux** *(choix unique, obligatoire)* : Moins de 3 000 € / 3 000 – 8 000 € / 8 000 – 15 000 € / 15 000 – 40 000 € / Plus de 40 000 € / Je ne sais pas encore
   *Aide sous la question : « Hors honoraires du studio. »*
16. **Quand souhaitez-vous démarrer ?** *(choix unique, obligatoire)* : Dès que possible / Dans 1 à 3 mois / Dans 3 à 6 mois / Pas encore défini
17. **Avez-vous déjà des artisans ?** *(choix unique ; logique : affichée seulement si la formule est semi-complète ou complète, ou si « Travaux » est coché en 10)* : Oui / Non / En partie


18. **Vos photos et plans** *(envoi de fichiers, facultatif, plusieurs fichiers)* : « **Avec des photos, notre fourchette de prix sera bien plus précise.** Une photo par mur, prise depuis un coin de la pièce, c’est l’idéal. Un plan ou un croquis coté aide aussi. 10 Mo max par fichier. »
19. **Autre chose à nous dire ?** *(texte long, facultatif)*

## Page 4 — Vos coordonnées

20. **Prénom** · **Nom** *(texte court, obligatoires)*
21. **Email** *(email, obligatoire)*
22. **Téléphone** *(téléphone, facultatif)* : « Pour un premier échange plus rapide. »
23. **Comment nous avez-vous connus ?** *(choix unique)* : Instagram / TikTok / Google / Presse / Bouche-à-oreille / Autre
24. **J’accepte que vous partagiez l’avant/après de mon projet sur vos réseaux** *(case, facultative)*
25. **J’accepte que mes données soient utilisées pour être recontacté·e** *(case, obligatoire)* + lien vers `https://studiolixivel.com/mentions-legales`

## Page de remerciement

> **Merci, c’est bien reçu !**
> Nous revenons vers vous sous 48 h avec une première fourchette de prix, puis le tarif exact par email.
> En attendant, retrouvez nos astuces et nos avant/après sur Instagram : @studiolixivel

## Données personnelles

Les réponses contiennent des données de clients (nom, email, téléphone, photos du logement) : ne pas les copier dans le repo ni dans des documents partagés.
