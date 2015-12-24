/**
 * Classe permettant de faire clignoter un élément.
 *
 * @author Rémi Leclerc
 * @param Element element (optionnel) Élément à faire clignoter
 */
var Lyssal_Clignotement = function(element) {
    this.onGoing = false;

    if (undefined !== element) {
        this.element = element;
        this.start();
    }
};

/**
 * @var integer Durée en secondes d'un seul clignotement
 */
Lyssal_Clignotement.ANIMATION_TIME = 1500;

/**
 * Spécifie l'élément à faire clignoter.
 *
 * @param Element element Élément à faire clignoter
 */
Lyssal_Clignotement.prototype.setElement = function(element) {
  this.element = element;
};

/**
 * Commence le clignotement.
 */
Lyssal_Clignotement.prototype.start = function() {
  this.onGoing = true;
  this.clignote();
};


/**
 * Effectue le clignotement jusqu'à la demande d'arrêt.
 */
Lyssal_Clignotement.prototype.clignote = function() {
  if (this.onGoing) {
     var instance = this;
      $(this.element).animate({ opacity:0.1 }, parseInt(Lyssal_Clignotement.ANIMATION_TIME / 2)).delay(100).animate({ opacity:1 }, parseInt(Lyssal_Clignotement.ANIMATION_TIME / 2), function() { instance.clignote(); });
  }
};


/**
 * Arrête le clignotement.
 */
Lyssal_Clignotement.prototype.stop = function() {
  this.onGoing = false;
};
