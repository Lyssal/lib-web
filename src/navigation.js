/**
 * A class to manage the user navigation.
 *
 * @author Rémi Leclerc
 */
var Lyssal_Navigation = function() {};


/**
 * Get the current URL.
 *
 * @return string The current URL
 */
Lyssal_Navigation.getCurrentUrl = function()
{
    return window.location.href;
};

/**
 * Redirect the user.
 *
 * @var string url The redirect URL
 */
Lyssal_Navigation.redirect = function(url)
{
    window.location = url;
};

/**
 * Reload the current page.
 */
Lyssal_Navigation.reload = function()
{
    window.location.href = window.location.href;
};

/**
 * Return to the back page.
 */
Lyssal_Navigation.back = function()
{
    window.history.back();
};

/**
 * Scroll to the top of the page.
 */
Lyssal_Navigation.scrollToTop = function()
{
    window.scrollTo(0, 0);
};

/**
 * Change the title of the page.
 *
 * @param string title The title
 */
Lyssal_Navigation.setStateTitle = function(title)
{
    document.title = title;
};

/**
 * Change the browser URL without redirection.
 *
 * @param string url The URL
 */
Lyssal_Navigation.setStateUrl = function(url)
{
    history.pushState({}, null, url);
};
