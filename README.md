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

* `Lyssal_Form.submitForm(form, confirmationMessage)` : Soumet un formulaire avec éventuellement un message de confirmation
* `Lyssal_Form.cleanField(field, confirmationMessage)` : Vide un champ avec éventuellement un message de confirmation

### Box

Classe de gestion des boutons de type radio et checkbox.

* `Lyssal_Form_Box.check(field)` : Coche une case
* `Lyssal_Form_Box.uncheck(field)` : Décoche une case
* `Lyssal_Form_Box.toggleCheck(field)` : Coche une case si décochée ou la décoche si cochée
* `Lyssal_Form_Box.getCheckedBoxes(parent)` : Retourne tous les boutons de type radio/checkbox cochés dans un élément
* `Lyssal_Form_Box.countCheckedBoxes(parent)` : Retourne le nombre de boutons de type radio/checkbox cochés dans un élément
* `Lyssal_Form_Box.hasCheckedBox(parent)` : Retourne si l'élément contient au moins un boutons de type radio/checkbox coché

### Do

Classe ajoutant automatiquement un champ caché "do" dans un formulaire. Cela permet notamment d'ajouter simplement des boutons de soumission en dehors du formulaire ; ces boutons peuvent avoir des fonctions différentes (que vous devrez gérer dans le code côté serveur) selon la valeur "do" que vous leur attribuez (un bouton redirige par exemple vers telle page et un autre vers telle autre page).

* `Lyssal_Form_Do.setDoAndSubmit(valeurDo, formulaire)` : Spécifie une valeur au champ "do" et soumet le formulaire
* `Lyssal_Form_Do.setDo(valeurDo, formulaire)` : Spécifie juste une valeur au champ "do"

### Select

Classe permettant de gérer les listes de sélection (champs de type SELECT).

* `Lyssal_Form_Select.prototype.getValue()` : Retourne la valeur (attribut value de l'option sélectionné)
* `Lyssal_Form_Select.prototype.setValue(optionValue)` : Sélectionne une unique option
* `Lyssal_Form_Select.prototype.addValue(optionValue)` : Sélectionne une option
* `Lyssal_Form_Select.prototype.removeValue(optionValue)` : Désélectionne une option
* `Lyssal_Form_Select.prototype.hasValue(optionValue)` : Retourne si la liste possède une option avec l'attribut value d'une certaine valeur
* `Lyssal_Form_Select.prototype.clear()` : Supprime tous les options de la liste
* `Lyssal_Form_Select.prototype.addOption(optionValue, optionTexte)` : Ajoute une option à la liste
* `Lyssal_Form_Select.prototype.addOptions(optionsTab)` : Ajoute des options à la liste

Exemples d'utilisation :
```js
var select = new Lyssal_Form_Select('#mon-select');
select.addValue('value-toto');
```


## Géolocalisation

Classe permettant de récupérer des coordonnées.

* `Lyssal_Geolocalisation.getCoordonneesByAdresse(caracteristiques)` : Retourne les coordonnées (latitude et longitude) en degrés à partir d'une adresse


## OpenLayers3

Permet de traiter simplement une carte avec OpenLayers3. Nécessite OpenLayers3.

* `new Lyssal_OpenLayers3_Map(elementCarteId, positionCentre, zoom)` : Met en place une carte
* `monObjetLyssalOpenLayers3.addMarker(imageSrc, position, titre, contenu)` : Ajoute un marker sur la carte


## Clignotement

Classe permettant de faire clignoter un élément. Cette classe peut par exemple être utilisée pour faire clignoter un élément pendant une attente AJAX.

* `new Lyssal_Clignotement(element)` : Fait clignoter l'élément
* `Lyssal_Clignotement.ANIMATION_TIME` : (variable) Durée en secondes d'un seul clignotement
* `Lyssal_Clignotement.prototype.setElement(element)` : Spécifie l'élément à faire clignoter
* `Lyssal_Clignotement.prototype.start()` : Commence le clignotement
* `Lyssal_Clignotement.prototype.stop()` : Arrête le clignotement

Exemples d'utilisation :
```js
var monClignotement = new Lyssal_Clignotement($('.mon-element'));
setTimeout(function() { monClignotement.stop(); }, 4000);
```

```js
var monClignotement = new Lyssal_Clignotement();
monClignotement.setElement($('.mon-element'));
monClignotement.start();
setTimeout(function() { monClignotement.stop(); }, 4000);
```
