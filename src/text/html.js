'use strict';

/**
 * A class to manage HTML text.
 *
 * @author Rémi Leclerc
 */
var Lyssal_Text_Html = function() {};

/**
 * Encode HTML.
 *
 * @param string text The HTML text
 */
Lyssal_Text_Html.decode = function (text)
{
    return text.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
};
