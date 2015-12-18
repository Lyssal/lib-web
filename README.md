# Librairies JavaScript de Lyssal


## Debogage

Classe permettant d'aider à déboguer en JavaScript.

* `Lyssal_Debogage.alert(objet)` : Affiche le détails d'une variables (propriétés s'il s'agit d'un objet, méthodes associées...)
* `alerte(objet)` : Alias de `Lyssal_Debogage.alert(objet)`
* `Lyssal_Debogage.getTypeObjet(objet)` : Retourne le type d'un objet


## Web

Classe permettant de gérer des fonctionnalités web (navigation, redirection...).

* `Lyssal_Web.redirect(url)` : Redirige l'internaute vers une autre page
* `Lyssal_Web.reload()` : Recharge la page en cours
* `Lyssal_Web.back()` : Redirige l'utilisateur vers la page précédente
* `Lyssal_Web.print()` : Imprime la page en cours


## Form

Ensemble de classes permettant de gérer des formulaires.

### Do

Classe ajoutant automatiquement un champ caché "do" dans un formulaire. Cela permet notamment d'ajouter simplement des boutons de soumission en dehors du formulaire ; ces boutons peuvent avoir des fonctions différentes (que vous devrez gérer dans le code côté serveur) selon la valeur "do" que vous leur attribuez (un bouton redirige par exemple vers telle page et un autre vers telle autre page).

* `Lyssal_Form_Do.setDoAndSubmit(valeurDo, formulaire)` : Spécifie une valeur au champ "do" et soumet le formulaire
* `Lyssal_Form_Do.setDo(valeurDo, formulaire)` : Spécifie juste une valeur au champ "do"


## Géolocalisation

Classe permettant de récupérer des coordonnées.

* `Lyssal_Geolocalisation.getCoordonneesByAdresse(caracteristiques)` : Retourne les coordonnées (latitude et longitude) en degrés à partir d'une adresse


## OpenLayers3

Permet de traiter simplement une carte avec OpenLayers3. Nécessite OpenLayers3.

* `new Lyssal_OpenLayers3_Map(elementCarteId, positionCentre, zoom)` : Met en place une carte
* `monObjetLyssalOpenLayers3.addMarker(imageSrc, position, titre, contenu)` : Ajoute un marker sur la carte
