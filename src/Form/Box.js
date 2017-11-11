/**
 * A class to manage radios and checkboxes.
 *
 * @author Rémi Leclerc
 */
var Lyssal_Form_Box = Object.create(Object.prototype);

/**
 * Check boxes.
 *
 * @var Element $field The boxes
 */
Lyssal_Form_Box.check = function($field)
{
    $($field).prop('checked', true);
};

/**
 * Uncheck boxes.
 *
 * @var Element $field The boxes
 */
Lyssal_Form_Box.uncheck = function($field)
{
    $($field).prop('checked', false);
};

/**
 * Check the unchecked boxes and uncheck the checked boxes.
 *
 * @var Element $field The boxes
 */
Lyssal_Form_Box.toggleCheck = function($field)
{
    $($field).prop('checked', !$($field).is(':checked'));
};

/**
 * Return all checked boxes in an element.
 *
 * @var Element container The container which contain the boxes
 */
Lyssal_Form_Box.getCheckedBoxes = function(container)
{
    return $(container).find('input[type=radio]:checked, input[type=checkbox]:checked');
};

/**
 * Retourne the count of checked boxes in the element.
 *
 * @var Element container The container which contain the boxes
 */
Lyssal_Form_Box.countCheckedBoxes = function(container)
{
    return Lyssal_Form_Box.getCheckedBoxes(container).size();
};

/**
 * Return if an element has at least one checked box.
 *
 * @var Element container The container which contain the boxes
 */
Lyssal_Form_Box.hasCheckedBox = function(container)
{
    return Lyssal_Form_Box.countCheckedBoxes(container) > 0;
};

/**
 * Check all the boxes in a container.
 *
 * @var Element container The container
 */
Lyssal_Form_Box.checkAll = function(container)
{
    $(container).find('input[type=radio], input[type=checkbox]').prop('checked', true);
};

/**
 * Uncheck all the boxes in a container.
 *
 * @var Element container The container
 */
Lyssal_Form_Box.uncheckAll = function(container)
{
    $(container).find('input[type=radio]:checked, input[type=checkbox]:checked').prop('checked', false);
};
