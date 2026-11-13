# Mes dépenses : application hors connexion

Fonctionne sans internet. Les données restent sur l'appareil (aucun envoi nulle part).

## Tester sur l'ordinateur

1. Dézippe le dossier, ouvre un terminal dedans.
2. Lance un petit serveur local :
   - Windows : `py -m http.server 8000`
   - Mac / Linux : `python3 -m http.server 8000`
3. Ouvre `http://localhost:8000` dans Chrome.

Sans Python : dans VS Code, l'extension « Live Server » fait la même chose.

## Tester sur le téléphone Android (sans hébergement)

1. Sur le téléphone : Paramètres > Options pour les développeurs > activer le débogage USB. Branche-le à l'ordinateur.
2. Sur l'ordinateur, dans Chrome : `chrome://inspect/#devices` > Port forwarding : `8000` vers `localhost:8000`.
3. Sur le téléphone, ouvre `http://localhost:8000` dans Chrome, puis menu ⋮ > « Installer l'application ».

## Version 3 : ce qui change

- **Opérations** : trois icônes à droite de chaque ligne (à gauche en arabe) : œil pour consulter, crayon pour modifier, corbeille pour supprimer (avec confirmation). Toucher la ligne ouvre la consultation, avec aperçu de la pièce jointe.
- **Budgets** : Réglages > Catégories > Budget mensuel. Barre de progression sur l'écran principal (orange à 80 %, rouge à 100 %) et message quand tu approches ou dépasses.
- **Recherche et filtres** au-dessus de la liste : mot, compte, catégorie, type, et « Toutes les périodes ».
- **Comparaison** avec le mois précédent par catégorie, et dépenses des 6 derniers mois.
- **Remise à zéro** (Réglages, tout en bas) : « Effacer ce mois » ou « Effacer toutes les opérations », avec option pour remettre aussi les soldes de départ à 0. Deux confirmations, et une sauvegarde est téléchargée avant la suppression.
- Mention des droits réservés avec ton surnom et ton adresse e-mail en bas de page.

## Nouveautés de la version 2

- **Heure** : préremplie avec l'heure actuelle, modifiable, affichée dans la liste.
- **Sous-catégories** : Réglages > Catégories et sous-catégories (ex. Internet > Orange, Inwi). Elles se choisissent à chaque dépense et apparaissent dans le graphique.
- **Plusieurs lignes** : dans la fenêtre Ajouter, le lien « Plusieurs lignes » remplace la note par une ligne par article (nom et montant). Le montant devient la somme. « Note simple » revient à la case normale.
- **Pièce jointe lue automatiquement** : en choisissant un PDF ou une image, l'application remplit le montant, la date, l'heure et, si la note est vide, le nom du commerçant. Une note déjà écrite n'est jamais remplacée, et un montant déjà saisi non plus. Si des articles sont détectés, un bouton propose de les utiliser. Vérifie toujours les valeurs avant d'enregistrer.
- **Excel** : Réglages > Tableau Excel (.xlsx) : une seule feuille, une ligne par opération, avec filtres. La sauvegarde complète (.json) reste celle qui permet de tout restaurer.

## À savoir sur la lecture des pièces jointes

- PDF contenant du texte : lu directement, sans internet.
- Photos et PDF scannés : lecture par Tesseract.js, téléchargé une seule fois depuis internet (environ 15 Mo avec les langues), puis conservé pour la suite. Sans internet la première fois, l'application l'indique et tu remplis à la main.
- La lecture est moins fiable sur un ticket froissé, flou ou écrit à la main.

## Plus tard : hébergement

Copie tout le dossier (y compris `.htaccess`) sur ton cPanel. Le site doit être en HTTPS. Le téléphone proposera alors l'installation tout seul.

## Sauvegarde

Réglages (engrenage) > Sauvegarde complète : crée un fichier avec les opérations et les pièces jointes.
Sur un nouveau téléphone : Réglages > Importer une sauvegarde.

## Fichiers

- `index.html`, `style.css`, `app.js`, `parse.js` : l'application
- `sw.js` : le mode hors connexion
- `vendor/` : bibliothèques embarquées (Excel et lecture de PDF)
- `manifest.json` et `icon-*.png` : l'installation et l'icône

Si tu modifies un fichier, change le numéro de version dans `sw.js` (`depenses-v3` devient `depenses-v4`) pour que le téléphone recharge la nouvelle version.
