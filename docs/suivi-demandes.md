# Suivi des demandes et prise de rendez-vous

Ce qui se passe quand quelqu’un remplit le questionnaire sur `/contact` :

1. **Tally** enregistre la réponse et l’ajoute comme nouvelle ligne dans le **Google Sheet** « Demandes Studio Lixivel ».
2. Toutes les 5 minutes, le **script** du Sheet (`scripts/google-sheet/suivi-demandes.gs`) traite les nouvelles lignes :
   - colonne **« À partir de (€) »** : surface × tarif de base de la formule, arrondi à 10 € (5 000 € pour la prise en charge complète) ;
   - colonne **« Statut »** : « À rappeler » (liste déroulante : Fourchette envoyée, Devis envoyé, Signé, Sans suite) ;
   - **mail à contact@studiolixivel.com** : le prix de base, toutes les réponses, et une réponse prête à envoyer où il reste à écrire le haut de la fourchette. « Répondre » dans la boîte mail répond directement au client.
3. Le visiteur arrive sur **`/contact/merci`**, où il peut réserver l’**appel de lancement** dans l’agenda **Cal.com** (prénom et email déjà remplis).

Tout est gratuit et ne dépend pas de l’hébergeur du site.

## Installation (une seule fois, environ 15 minutes)

### 1. Relier Tally au Google Sheet
1. Sur tally.so, ouvrir le formulaire « Débuter votre projet » → onglet **Integrations** → **Google Sheets** → **Connect**.
2. Se connecter avec le compte Google de Tony, choisir **Create a new spreadsheet**, le nommer « Demandes Studio Lixivel ».
3. Laisser **Export existing submissions** activé, puis **Save changes**.
4. Ouvrir le Sheet créé (lien visible dans l’onglet Integrations de Tally).

### 2. Ajouter le script
1. Dans le Sheet : **Extensions → Apps Script**.
2. Effacer le contenu de `Code.gs`, puis coller tout le fichier `scripts/google-sheet/suivi-demandes.gs`.
3. Enregistrer (icône disquette).
4. En haut, choisir la fonction **`installer`**, puis **Exécuter**.
5. Google demande des autorisations : **Examiner les autorisations** → choisir le compte → « Google n’a pas validé cette application » → **Paramètres avancés** → **Accéder à … (non sécurisé)** → **Autoriser**. C’est normal : c’est notre propre script, il ne sert qu’à ce Sheet et à envoyer le mail de notification.
6. Les colonnes « À partir de (€) », « Statut », « Notes », « Notifié le » apparaissent à droite. Les demandes déjà présentes sont traitées (un mail par demande).

### 3. Partager avec Cindy
Bouton **Partager** du Sheet → email de Cindy → **Éditeur**. Elle met à jour la colonne « Statut » et ajoute ses notes.

### 4. Créer l’agenda Cal.com
1. Créer un compte gratuit sur cal.com (de préférence avec l’email du studio), relier le Google Agenda de Cindy pour éviter les doubles réservations.
2. Créer un type de rendez-vous : **« Appel de lancement »**, 20 minutes, **Google Meet** (ou autre visio), questions : prénom et email (par défaut).
3. Récupérer le lien, par exemple `cal.com/studiolixivel/appel-de-lancement`, et l’envoyer à Claude :
   - dans le site : `SITE.cal = "studiolixivel/appel-de-lancement"` (`lib/site.ts`) → l’agenda s’affiche sur `/contact/merci` ;
   - dans le script : `CONFIG.rdv = "https://cal.com/studiolixivel/appel-de-lancement"` → le lien est ajouté à la réponse proposée.

## Bon à savoir
- **Changer les tarifs** : les mettre à jour à la fois dans `data/services.ts` (site) et dans `TARIFS` en haut du script.
- **Ajouter une question au formulaire** : Tally ajoute une colonne au Sheet, le script la recopie automatiquement dans le mail.
- **Limites Google** : 100 mails par jour avec un compte Gmail gratuit, largement suffisant.
- **Relancer le traitement d’une ligne** : vider sa cellule « Notifié le ».
