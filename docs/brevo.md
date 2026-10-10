# Brevo : inscription aux guides de la page Ressources

Sur `/ressources`, le visiteur laisse son prénom et son email, coche le consentement, et télécharge le guide. Son contact est ajouté à la liste Brevo « Ressources du studio ». Une fois inscrit, il télécharge tous les autres guides sans formulaire (mémorisé dans son navigateur).

Tant que `SITE.brevo` est vide (`lib/site.ts`), les guides se téléchargent librement, sans formulaire.

Le site envoie les données directement au formulaire hébergé par Brevo (« sibforms »), sans serveur : ça marche sur Vercel comme sur Cloudflare.

## Installation (environ 15 minutes)

1. Créer un compte gratuit sur **brevo.com** (300 emails par jour), de préférence avec l’adresse du studio.
2. **Contacts → Listes → Créer une liste** : « Ressources du studio ».
3. **Contacts → Formulaires → Créer un formulaire d’inscription** :
   - liste : « Ressources du studio » ;
   - champs : **EMAIL** (déjà présent) et **PRENOM** (glisser le champ « Prénom » ; son nom technique doit être `PRENOM`) ;
   - case de consentement : l’activer (son nom technique est `OPT_IN`) ;
   - **double opt-in** : recommandé (Brevo envoie un mail de confirmation, c’est la bonne pratique RGPD) ;
   - le design du formulaire Brevo n’a pas d’importance : le site affiche le sien.
4. Étape **Partager** → **Code HTML** : repérer la ligne `<form id="sib-form" method="POST" action="https://…sibforms.com/serve/…"` et copier l’adresse entre les guillemets de `action`.
5. Envoyer cette adresse à Claude, qui la met dans `SITE.brevo`.

## Vérifier

Remplir le formulaire de `/ressources` avec son propre email : le contact doit apparaître dans la liste « Ressources du studio » (après confirmation si le double opt-in est activé). Le site ne peut pas lire la réponse de Brevo : si rien n’arrive dans la liste, vérifier les noms techniques des champs (`EMAIL`, `PRENOM`, `OPT_IN`).

## Ensuite (facultatif)

- **Mail de bienvenue** : Automatisations → « Message de bienvenue » quand un contact est ajouté à la liste, avec les liens vers les guides.
- **Newsletter** : un mail par mois avec les nouveaux articles du blog et le dernier guide (idée 13 de la liste).

## Ajouter un guide

1. Écrire le guide en HTML sur le modèle de `scripts/guides/bien-mesurer-sa-piece.html`, puis le convertir en PDF :
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer --print-to-pdf=public/ressources/NOM.pdf scripts/guides/NOM.html`
2. Dans Pages CMS (collection « Ressources ») : ajouter le PDF, l’aperçu de la couverture, et passer le statut à « disponible ».
