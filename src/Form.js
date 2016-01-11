/**
 * Classe générale de gestion des formulaires.
 * 
 * @author Rémi Leclerc
 */
var Lyssal_Form = function() {};

/**
 * Soumet un formulaire avec éventuellement un message de confirmation.
 * 
 * @param Element form                Formulaire
 * @param string  confirmationMessage (optional) Message de confirmation
 */
Lyssal_Form.submitForm = function(form, confirmationMessage)
{
    if (undefined === confirmationMessage || confirm(confirmationMessage)) {
        $(form).submit();
    }
};

/**
 * Vide un champ avec éventuellement un message de confirmation.
 * 
 * @param Element field               Champ à vider
 * @param string  confirmationMessage (optional) Message de confirmation
 */
Lyssal_Form.cleanField = function(field, confirmationMessage)
{
    if (undefined === confirmationMessage || confirm(confirmationMessage)) {
        $(field).val('');
    }
};

/**
 * Coche une case.
 * 
 * @param Element field Case à cocher
 */
Lyssal_Form.check = function(field)
{
    $(field).prop('checked', true);
};

/**
 * Décoche une case.
 * 
 * @param Element field Case à cocher
 */
Lyssal_Form.uncheck = function(field)
{
    $(field).prop('checked', false);
};

/**
 * Coche une case si décochée ou la décoche si cochée.
 * 
 * @param Element field Case à cocher
 */
Lyssal_Form.toggleCheck = function(field)
{
    $(field).prop('checked', !$(field).is(':checked'));
};

