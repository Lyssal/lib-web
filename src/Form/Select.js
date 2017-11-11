/**
 * A class which permits to manage select fields.
 *
 * @author Rémi Leclerc
 *
 * @var Element select The select field
 */
var Lyssal_Form_Select = function(select)
{
    this.select = select;
};


/**
 * @var Element The select field
 */
Lyssal_Form_Select.prototype.select = null;


/**
 * Get the selected value.
 *
 * @return string The value
 */
Lyssal_Form_Select.prototype.getValue = function()
{
    return ($(this.select).val());
};

/**
 * Select one value.
 *
 * @var string value The value of the option to select
 * @return Lyssal_Form_Select This
 */
Lyssal_Form_Select.prototype.selectValue = function(value)
{
    $(this.select).val(value);

    return this;
};

/**
 * Select a value (if the select is multiple).
 *
 * @var string value The value of the option to select
 * @return Lyssal_Form_Select This
 */
Lyssal_Form_Select.prototype.addSelectedValue = function(value)
{
    $(this.select).find('option[value="' + value + '"]').prop('selected', true);

    return this;
};

/**
 * Unselect a value.
 *
 * @var string value The value of the option to unselect
 * @return Lyssal_Form_Select This
 */
Lyssal_Form_Select.prototype.unselectValue = function(value)
{
    $(this.select).find('option[value="' + value + '"]').prop('selected', false);

    return this;
};

/**
 * Return if the select has an option with a specified value.
 *
 * @var string value The value to search
 * @return bool If the option has been found
 */
Lyssal_Form_Select.prototype.hasValue = function(value)
{
    return (0 != ($(this.select).find('option[value="' + value + '"]').size()));
};


/**
 * Delete all options in the select.
 *
 * @return Lyssal_Form_Select This
 */
Lyssal_Form_Select.prototype.clear = function()
{
    $(this.select).empty();

    return this;
};

/**
 * Add an option.
 *
 * @var string value The option's value
 * @var string text  The option's text
 * @return Lyssal_Form_Select This
 */
Lyssal_Form_Select.prototype.addOption = function(value, text)
{
    $(this.select).append(
        $('<option></option>', {
            value: value,
            text: text
        })
    );

    return this;
};

/**
 * Add options in the select.
 *
 * @var Array options The array of options (keys are values)
 * @return Lyssal_Form_Select This
 */
Lyssal_Form_Select.prototype.addOptions = function(options)
{
    $.each(
        options,
        function(optionValue, optionText) {
            this.addOption(optionValue, optionText);
        }
    );

    return this;
};
