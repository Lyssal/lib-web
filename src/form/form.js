/**
 * A class to manage forms.
 *
 * @author Rémi Leclerc
 */
var Lyssal_Form = Object.create(Object.prototype);

/**
 * Submit a form, eventually with a confirmation message.
 *
 * @var Element form                The form
 * @var string  confirmationMessage (optional) The confirmation message
 */
Lyssal_Form.submitForm = function(form, confirmationMessage)
{
    if (undefined === confirmationMessage || confirm(confirmationMessage)) {
        $(form).submit();
    }
};

/**
 * Empty a field, eventually with a confirmation message.
 *
 * @var Element field               The field
 * @var string  confirmationMessage (optional) The confirmation message
 */
Lyssal_Form.emptyField = function(field, confirmationMessage)
{
    if (undefined === confirmationMessage || confirm(confirmationMessage)) {
        $(field).val('');
    }
};

/**
 * Get the form date in an associative array.
 * Ne fonctionne pas pour les tableaux car les names sont identiques
 *
 * @var Element form The form
 *
 * @return array The data
 */
// Lyssal_Form.getData = function (form)
// {
//     var data = {}, serializedForm = $(form).serializeArray();
//
//     $.each(serializedForm, function (i, field) {
//         console.log(field)
//         data[field.name] = field.value;
//     });
//
//     return data;
// };
