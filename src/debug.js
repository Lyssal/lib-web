/**
 * A class which permits to display an alert with some debugging information about an object.
 *
 * @author Rémi Leclerc
 */
var Lyssal_Debug = function() {};

/**
 * @see Lyssal_Debug.alert()
 */
function alerte(value)
{
    Lyssal_Debug.alert(value);
}

/**
 * @var boolean If the empty properties are displayed
 */
Lyssal_Debug.DISPLAY_EMPTY_PROPERTIES = false;


/**
 * Display in a JavaScript alert details about a variable (type, properties, methods...).
 *
 * @var mixed value The value to display
 */
Lyssal_Debug.alert = function(value)
{
    var alertText = 'Type: ' + Lyssal_Debug.getType(value) + "\n\n";

    if (value instanceof jQuery) {
        if (value.length != undefined) {
            alertText += 'Array size: ' + value.length + "\n\n";
            $.each(value, function(index, jqueryObject) {
                alertText += '----' + "\n\n" + 'Element #' + (index + 1) + ' (' + Lyssal_Debug.getType(jqueryObject) + ')' + "\n\n";
                alertText += Lyssal_Debug.getPropertiesAndMethodsString(jqueryObject) + "\n\n";
            });
        } else {
            alertText += Lyssal_Debug.getPropertiesAndMethodsString(value);
        }
    } else if (value instanceof Array) {
        alertText += 'Array size: ' + value.length + "\n\n";
        for (var i in value) {
            alertText += i + (Lyssal_Debug.DISPLAY_EMPTY_PROPERTIES ? '' : ' : ' + value[i]) + "\n";
        }
    } else if ((typeof value) == 'string' || (typeof value) == 'number' || (typeof value) == 'boolean') {
        alertText += value;
    } else {
        for (var i in value) {
            alertText += i + (Lyssal_Debug.DISPLAY_EMPTY_PROPERTIES ? '' : ' : ' + value[i]) + "\n";
        }
    }

    alert(alertText);
};

/**
 * Return the type of a value.
 *
 * @var object value The value
 * @return string The type
 */
Lyssal_Debug.getType = function(value)
{
    if ((typeof value) == 'string') {
        return 'String';
    }
    if ((typeof value) == 'number') {
        return 'Number';
    }
    if (value instanceof jQuery) {
        return 'jQuery object';
    }
    if (value instanceof Array) {
        return 'Array';
    }
    if (value instanceof Element) {
        if (value.tagName.toLowerCase() == 'input') {
            return 'input[type=' + $(value).attr('type').toLowerCase() + ']';
        }
        return value.tagName.toLowerCase();
    }
    if (null === value) {
        return 'NULL';
    }
    switch (value) {
        case 'object':
            return 'Object';
        default:
            return (typeof value);
    }
};

/**
 * Return the list of properties and methods of the object.
 *
 * @var object object The object
 * @return string The string with the properties and the methods
 */
Lyssal_Debug.getPropertiesAndMethodsString = function(object)
{
    return 'PROPERTIES' + "\n\n" + Lyssal_Debug.getPropertiesString(object) + "\n\n" + 'METHODS' + "\n\n" + Lyssal_Debug.getFunctionsString(object);
};

/**
 * Return the string with the properties.
 *
 * @var object object The object
 * @return string The string with the properties
 */
Lyssal_Debug.getPropertiesString = function(object)
{
    var properties = '';

    try {
        $.each(object, function(key, value) {
            if (typeof value != 'function' && (Lyssal_Debug.DISPLAY_EMPTY_PROPERTIES || (value != '' && value != null)))
                properties += key + ' : ' + value + "\n";
        });
    } catch (e) {
        properties += '### ERROR ### ' + e + "\n";
    }

    return properties;
};

/**
 * Return the string with the methods.
 *
 * @var object object The object
 * @return string The string with the methods
 */
Lyssal_Debug.getFunctionsString = function(object)
{
    var methods = '';

    try {
        $.each(object, function(key, value) {
            if (typeof value == 'function')
                methods += key + '()' + "\n";
        });
    } catch (e) {
        methods += '### ERREUR ### ' + e + "\n";
    }

    return methods;
};
