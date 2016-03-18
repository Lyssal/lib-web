/**
 * Classe permettant de gérer les listes de sélection (champs de type SELECT).
 * 
 * @author Rémi Leclerc
 * 
 * @param Element select Liste de sélection (select)
 */
var Lyssal_Form_Select = function(select)
{
    this.select = select;
};


/**
 * @var Element Champ de type SELECT
 */
Lyssal_Form_Select.prototype.select;


/**
 * Retourne la valeur (attribut value de l'option sélectionné).
 * 
 * @return string Valeur
 */
Lyssal_Form_Select.prototype.getValue = function()
{
    return ($(this.select).val());
};

/**
 * Sélectionne une unique option.
 * 
 * @param string optionValue Valeur (attribut value) de l'option à sélectionner
 * @return Lyssal_Form_Select
 */
Lyssal_Form_Select.prototype.setValue = function(optionValue)
{
    $(this.select).val(optionValue);
    
    return this;
};

/**
 * Sélectionne une option.
 * 
 * @param string optionValue Valeur (attribut value) de l'option à sélectionner
 * @return Lyssal_Form_Select
 */
Lyssal_Form_Select.prototype.addValue = function(optionValue)
{
    $(this.select).find('option[value="' + optionValue + '"]').prop('selected', true);
    
    return this;
};

/**
 * Désélectionne une option.
 * 
 * @param string optionValue Valeur (attribut value) de l'option à désélectionner
 * @return Lyssal_Form_Select
 */
Lyssal_Form_Select.prototype.removeValue = function(optionValue)
{
    $(this.select).find('option[value="' + optionValue + '"]').prop('selected', false);
    
    return this;
};

/**
 * Retourne si la liste possède une option avec l'attribut value d'une certaine valeur.
 * 
 * @param string optionValue Valeur à rechercher
 * @return boolean VRAI si au moins une option est trouvée avec value=optionValue 
 */
Lyssal_Form_Select.prototype.hasValue = function(optionValue)
{
    return (0 != ($(this.select).find('option[value="' + optionValue + '"]').size()));
};


/**
 * Supprime tous les options de la liste.
 * 
 * @return Lyssal_Form_Select
 */
Lyssal_Form_Select.prototype.clear = function()
{
    $(this.select).empty();
    
    return this;
};

/**
 * Ajoute une option à la liste.
 * 
 * @param string optionValue Valeur de l'attribut 'value' de l'option
 * @param string optionTexte Texte de l'option
 * @return Lyssal_Form_Select
 */
Lyssal_Form_Select.prototype.addOption = function(optionValue, optionTexte)
{
    $(this.select).append(
        $('<option></option>', {
            value: optionValue,
            text: optionTexte
        })
    );

    return this;
};

/**
 * Ajoute des options à la liste.
 * 
 * @param Array optionsTab Tableaux dynamiques (l'index étant l'attribut 'value' des options)
 * @return Lyssal_Form_Select
 */
Lyssal_Form_Select.prototype.addOptions = function(optionsTab)
{
    $.each(
        optionsTab,
        function(optionValue, optionTexte) {
            this.addOption(optionValue, optionTexte);
        }
    );

    return this;
};
