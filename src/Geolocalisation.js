/**
 * Classe permettant de récupérer des coordonnées.
 * 
 * @author Rémi Leclerc
 */
var Lyssal_Geolocalisation = new function() {};

/**
 * Retourne les coordonnées (latitude et longitude) en degrés à partir d'une adresse.
 * 
 * @param array caracteristiques (clefs utilisables parmi street, city, county, state, contry)
 * @return integer[]|NULL Coordonnées
 */
Lyssal_Geolocalisation.getCoordonneesByAdresse = function(caracteristiques)
{
	var informations = Lyssal_Geolocalisation.getInformationsByAdresse(caracteristiques);
	
	if (informations.length > 0)
	{
		return new Array(informations[0].lon, informations[0].lat);
	}
	
	return null;
};

/**
 * Retourne diverses informations depuis une adresse.
 * 
 * @param array caracteristiques (clefs utilisables parmi street, city, county, state, contry)
 * @return array Informations
 */
Lyssal_Geolocalisation.getInformationsByAdresse = function(caracteristiques)
{
	
	var nominatimUrl = 'http://nominatim.openstreetmap.org/search?';
		
	$.each(caracteristiques, function(option, valeur) {
		if ('' != valeur)
			nominatimUrl += option + '=' + encodeURI(valeur) + '&';
	});
	
	nominatimUrl += 'limit=1&format=json';
	
	var nominatimReponse = null;
	$.ajax({
		url:nominatimUrl,
		dataType:'json',
		async:false
	}).done(function(reponse) {
		nominatimReponse = reponse;
	});
	
	return nominatimReponse;
};
