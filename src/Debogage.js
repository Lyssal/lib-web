/**
 * Classe permettant d'aider à déboguer en JavaScript.
 * 
 * @author Rémi Leclerc
 */
var Lyssal_Debogage = function() {};

/**
 * Alias de Lyssal_Debogage.alert().
 */
function alerte(objet)
{
    Lyssal_Debogage.alert(objet);
}

/**
 * Affiche en détail dans une fenêtre le contenu d'un objet JavaScript.
 * 
 * @param objet L'objet à afficher
 * @return void
 */
Lyssal_Debogage.AFFICHE_PROPRIETES_VIDES = false;

/**
 * Affiche le détails d'une variables (propriétés s'il s'agit d'un objet, méthodes associées...).
 * 
 * @param object objet L'objet à afficher.
 */
Lyssal_Debogage.alert = function(objet)
{
    var texteAlerte = 'Type : ' + Lyssal_Debogage.getTypeObjet(objet) + "\n\n";

    if (objet instanceof jQuery) {
        if (objet.length != undefined)
        {
            texteAlerte += 'Longueur du tableau : ' + objet.length + "\n\n";
            $.each(objet, function(indice, objetJquery) {
                texteAlerte += '----' + "\n\n" + 'Élément #' + (indice + 1) + ' (' + Lyssal_Debogage.getTypeObjet(objetJquery) + ')' + "\n\n";
                texteAlerte += Lyssal_Debogage.getChaineProprietesEtFonctions(objetJquery) + "\n\n";
            });
        }
        else texteAlerte += Lyssal_Debogage.getChaineProprietesEtFonctions(objet);
    } else if (objet instanceof Array) {
        texteAlerte += 'Longueur du tableau : ' + objet.length + "\n\n";
        for (var i in objet) {
            texteAlerte += i + (Lyssal_Debogage.AFFICHE_PROPRIETES_VIDES ? '' : ' : ' + objet[i]) + "\n";
        }
    } else if ((typeof objet) == 'string' || (typeof objet) == 'number' || (typeof objet) == 'boolean') {
        texteAlerte += objet;
    } else {
        for (var i in objet) {
            texteAlerte += i + (Lyssal_Debogage.AFFICHE_PROPRIETES_VIDES ? '' : ' : ' + objet[i]) + "\n";
        }
    }

    alert(texteAlerte);
};

/**
 * Retourne le type d'un objet.
 * 
 * @param object objet L'objet dont il faut retourner le type
 * @return string Le type de l'objet
 */
Lyssal_Debogage.getTypeObjet = function(objet)
{
    if ((typeof objet) == 'string')
        return 'Chaîne de caractères';
    if ((typeof objet) == 'number')
        return 'Nombre';
    if (objet instanceof jQuery)
        return 'Objet jQuery';
    if (objet instanceof Array) {
        return 'Tableau';
    }
    if (objet instanceof Element)
    {
        if (objet.tagName.toLowerCase() == 'input')
            return 'input[type=' + $(objet).attr('type').toLowerCase() + ']';
        return objet.tagName.toLowerCase();
    }
    switch (objet)
    {
        case 'object':
            return 'Objet';
        default:
            return (typeof objet);
    }
};

/**
 * Retourne la liste des fonctions de l'objet.
 * 
 * @param object objet L'objet dont il faut retourner les fonctions
 * @return string Les fonctions de l'objet
 */
Lyssal_Debogage.getChaineProprietesEtFonctions = function(objet)
{
    return 'PROPRIÉTÉS' + "\n\n" + Lyssal_Debogage.getChaineProprietes(objet) + "\n\n" + 'FONCTIONS' + "\n\n" + Lyssal_Debogage.getChaineFonctions(objet);
};

/**
 * Retourne la liste des propriétés de l'objet.
 * 
 * @param object objet L'objet dont il faut retourner les propriétés
 * @return string Les propriétés de l'objet
 */
Lyssal_Debogage.getChaineProprietes = function(objet)
{
    var proprietes = '';
        try
        {
            $.each(objet, function(propriete, valeur) {
                if (typeof valeur != 'function' && (Lyssal_Debogage.AFFICHE_PROPRIETES_VIDES || (valeur != '' && valeur != null)))
                    proprietes += propriete + ' : ' + valeur + "\n";
            });
        }
        catch (erreur)
        {
            proprietes += '### ERREUR ### ' + erreur + "\n";
        }
        return proprietes;
    };
    
/**
 * Retourne la liste des fonctions de l'objet.
 * 
 * @param object objet L'objet dont il faut retourner les fonctions
 * @return string Les fonctions de l'objet
 */
Lyssal_Debogage.getChaineFonctions = function(objet)
{
    var fonctions = '';
    try
    {
        $.each(objet, function(propriete, valeur) {
            if (typeof valeur == 'function')
                fonctions += propriete + '()' + "\n";
        });
    }
    catch (erreur)
    {
        fonctions += '### ERREUR ### ' + erreur + "\n";
    }
    return fonctions;
};
