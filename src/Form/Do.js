/**
 * Classe JS initialisant un nouveau champ caché à la soumission du formulaire.
 *
 * @author Rémi Leclerc
 */
var Lyssal_Form_Do = function() {};


/**
 * Spécifie une valeur au champ "do" et soumet le formulaire.
 * 
 * @param string  valeurDo   Valeur du do
 * @param Element formulaire Formulaire du do
 */
Lyssal_Form_Do.setDoAndSubmit = function(valeurDo, formulaire)
{
    Lyssal_Form_Do.setDo(valeurDo, formulaire);
    $(formulaire).submit();
};

/**
 * Spécifie juste une valeur au champ "do".
 * 
 * @param string  valeurDo   Valeur du do
 * @param Element formulaire Formulaire du do
 */
Lyssal_Form_Do.setDo = function(valeurDo, formulaire)
{
    Lyssal_Form_Do.createFieldDoIfNoExists(formulaire);

    $(formulaire).find('input[name=do]').val(valeurDo);
};

/**
 * Crée le champ "do" s'il n'existe pas dans le formulaire.
 */
Lyssal_Form_Do.createFieldDoIfNoExists = function(formulaire)
{
    if (0 === $(formulaire).find('input[name=do]').size()) {
        $('<input/>', {
            type: 'hidden',
            name: 'do'
        }).appendTo(formulaire);
    }
};
