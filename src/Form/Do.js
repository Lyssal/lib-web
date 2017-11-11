/**
 * A class which create if necessary and initialize an hidden field "do" in a form.
 *
 * @author Rémi Leclerc
 */
var Lyssal_Form_Do = Object.create(Object.prototype);


/**
 * Set a value into do and submit the form.
 *
 * @var string  value The value of do
 * @var Element form  The form
 */
Lyssal_Form_Do.setDoAndSubmit = function(value, form)
{
    Lyssal_Form_Do.setDo(value, form);
    $(form).submit();
};

/**
 * Set the value.
 *
 * @var string  value The value of do
 * @var Element form  The form
 */
Lyssal_Form_Do.setDo = function(value, form)
{
    Lyssal_Form_Do.createFieldDoIfNoExists(form);

    $(form).find('input[name=do]').val(value);
};

/**
 * Create the do field if not present in the form.
 *
 * @var Element form The form
 */
Lyssal_Form_Do.createFieldDoIfNoExists = function(form)
{
    if (0 === $(form).find('input[name=do]').size()) {
        $('<input/>', {
            type: 'hidden',
            name: 'do'
        }).appendTo(form);
    }
};
