/**
 * Some web functionalities.
 *
 * @author Rémi Leclerc
 */
var Lyssal_Web = function() {};


/**
 * Print the current page.
 */
Lyssal_Web.print = function()
{
    window.print();
};

/**
 * Return the value of a GET parameter.
 *
 * @var name The name of the parameter
 */
Lyssal_Web.getQueryParameterByName = function(name)
{
    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");

    var regex = new RegExp('[\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.href);

    if (null != results) {
        return decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    return null;
};

/**
 * Block the context menu for images.
 *
 * @var string   message  (optioanl) The message of the alert
 */
Lyssal_Web.blockImagesContextMenu = function(message)
{
    Lyssal_Web.blockElementsContextMenu(['img'], message);
};

/**
 * Block the context menu for some elements.
 *
 * @var string[] tagNames The tag names
 * @var string   message  (optioanl) The message of the alert
 */
Lyssal_Web.blockElementsContextMenu = function(tagNames, message)
{
    var bodies = document.getElementsByTagName('body');

    for (var i = 0; i < bodies.length; i++) {
        bodies[i].oncontextmenu = function (e) {
            var tagName = e.target.tagName.toLowerCase();
            if (jQuery.inArray(tagName, tagNames)) {
                if ('undefined' !== typeof message) {
                    alert(message);
                }
                return false;
           }
       };
    }
};
