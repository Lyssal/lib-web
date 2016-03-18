/**
 * Classe de gestion des boutons de type radio et checkbox.
 * 
 * @author Rémi Leclerc
 */
var Lyssal_Form_Box = function() {};

/**
 * Coche une case.
 * 
 * @param Element field Case à cocher
 */
Lyssal_Form_Box.check = function(field)
{
    $(field).prop('checked', true);
};

/**
 * Décoche une case.
 * 
 * @param Element field Case à cocher
 */
Lyssal_Form_Box.uncheck = function(field)
{
    $(field).prop('checked', false);
};

/**
 * Coche une case si décochée ou la décoche si cochée.
 * 
 * @param Element field Case à cocher
 */
Lyssal_Form_Box.toggleCheck = function(field)
{
    $(field).prop('checked', !$(field).is(':checked'));
};

/**
 * Retourne tous les boutons de type radio/checkbox cochés dans un élément.
 * 
 * @param Element parent Élément qui contient les boutons
 */
Lyssal_Form_Box.getCheckedBoxes = function(parent)
{
    return $(parent).find('input[type=radio]:checked, input[type=checkbox]:checked');
};

/**
 * Retourne le nombre de boutons de type radio/checkbox cochés dans un élément.
 * 
 * @param Element parent Élément qui contient les boutons
 */
Lyssal_Form_Box.countCheckedBoxes = function(parent)
{
    return Lyssal_Form_Box.getCheckedBoxes(parent).size();
};

/**
 * Retourne si l'élément contient au moins un boutons de type radio/checkbox coché.
 * 
 * @param Element parent Élément qui contient les boutons
 */
Lyssal_Form_Box.hasCheckedBox = function(parent)
{
    return Lyssal_Form_Box.countCheckedBoxes(parent) > 0;
};

/**
 * Coche toutes les cases à l'intérieur d'un élément du DOM.
 *
 * @param Element container Container
 */
Lyssal_Form_Box.checkAll = function(container)
{
    $(container).find('input[type=radio], input[type=checkbox]').prop('checked', true);
};

/**
 * Décoche toutes les cases à l'intérieur d'un élément du DOM.
 *
 * @param Element container Container
 */
Lyssal_Form_Box.uncheckAll = function(container)
{
    $(container).find('input[type=radio]:checked, input[type=checkbox]:checked').prop('checked', false);
};
