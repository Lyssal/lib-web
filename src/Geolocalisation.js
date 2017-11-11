/**
 * A class to get coordinates.
 *
 * @author Rémi Leclerc
 */
var Lyssal_Geolocalisation = new function() {};

/**
 * Return the coordinates (latitude and longitude) in degree with an address.
 *
 * @var array caracteristics An array of geographical coordinates. Key may be street, city, county, state, contry.
 * @return integer[]|null The coordinates
 */
Lyssal_Geolocalisation.getCoordinatesByAddress = function(caracteristics)
{
    var informations = Lyssal_Geolocalisation.getInformationsByAddress(caracteristics);

    if (informations.length > 0) {
        return new Array(informations[0].lon, informations[0].lat);
    }

    return null;
};

/**
 * Get some informations by an address.
 *
 * @var Array caracteristics An array of geographical coordinates. Key may be street, city, county, state, contry.
 * @return array The informations
 */
Lyssal_Geolocalisation.getInformationsByAddress = function(caracteristics)
{
    var nominatimUrl = 'http://nominatim.openstreetmap.org/search?';

    $.each(caracteristics, function(option, value) {
        if ('' != value) {
            nominatimUrl += option + '=' + encodeURI(value) + '&';
        }
    });

    nominatimUrl += 'limit=1&format=json';

    var nominatimResponse = null;
    $.ajax({
        url: nominatimUrl,
        dataType: 'json',
        async: false
    }).done(function(reponse) {
        nominatimReponse = reponse;
    });

    return nominatimResponse;
};
