/**
 * Classe permettant de gérer des fonctionnalités web (navigation, redirection...).
 * 
 * @author Rémi Leclerc
 */
var Lyssal_Web = function() {};

/**
 * Redirige l'internaute vers une autre page.
 * 
 * @param string url L'URL vers laquelle l'internaute sera redirigé
 * @return void
 */
Lyssal_Web.redirect = function(url)
{
    window.location = url;
};

/**
 * Recharge la page en cours.
 * 
 * @return void
 */
Lyssal_Web.reload = function()
{
    window.location.href = window.location.href;
};

/**
 * Redirige l'utilisateur vers la page précédente.
 * 
 * @return void
 */
Lyssal_Web.back = function()
{
    window.history.back();
};

/**
 * Imprime la page en cours.
 * 
 * @return void
 */
Lyssal_Web.print = function()
{
    window.print();
};
