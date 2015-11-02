/**
 * Permet de traiter simplement une carte avec OpenLayers3.
 * Nécessite OpenLayers3.
 * 
 * @author Rémi Leclerc
 */
var Lyssal_OpenLayers3 = new function() {};

/**
 * Met en place une carte.
 * 
 * @param string   elementCarteId ID de la balise où installer la carte
 * @param number[] positionCentre Latitude et longitude en degrés
 * @param integer  zoom           Zoom
 * @return Map Carte créée
 */
Lyssal_OpenLayers3.addMap = function(elementCarteId, positionCentre, zoom)
{
    $('#' + elementCarteId).addClass('lyssal_openlayers3');
    $('#' + elementCarteId).html('<div class="popup"><div id="map_popup_' + elementCarteId + '"></div><div class="fleche"><div class="f-1"></div><div class="f-2"></div><div class="f-3"></div><div class="f-4"></div><div class="f-5"></div></div></div>');
    
    var map = new ol.Map
    ({
        target: elementCarteId,
        layers:
        [
            new ol.layer.Tile
            ({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View
        ({
            center: ol.proj.transform(positionCentre, 'EPSG:4326', 'EPSG:3857'),
            zoom: zoom
        }),
        controls: 
        [
         	new ol.control.FullScreen({
         		tipLabel:'Activer/Désactiver le plein écran'
         	}),
            new ol.control.Zoom({
                zoomInTipLabel:'Zoom +',
                zoomOutTipLabel:'Zoom -'
            })
        ]
    });
    
    map.on('click', function(evt)
    {
        var latitudeLongitude = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');

        var feature = map.forEachFeatureAtPixel
        (
            evt.pixel,
            function(feature, layer)
            {
                return feature;
            }
        );

        if (feature)
        {
            var geometry = feature.getGeometry();
            var coord = geometry.getCoordinates();
            var pixel = map.getPixelFromCoordinate(coord);

            $('#map_popup_' + elementCarteId).html('<div class="title">' + feature.get('name') + '</div><div class="content">' + feature.get('content') + '</div>');

            var left = pixel[0] - parseInt($('#' + elementCarteId + ' .popup').width()) / 2;
            var top = pixel[1] - parseInt($('#' + elementCarteId + ' .popup').height()) - 17;

            $('#' + elementCarteId + ' .popup').css({
                left:left + 'px',
                top:top + 'px',
                display:'block'
            });
        }
        else
        {
        	$('#' + elementCarteId + ' .popup').css({
                left:left + 'px',
                top:top + 'px',
                display:'none'
            });
        }
    });
    
    map.on('pointermove', function(e)
	{
	    var target = (typeof e.map.getTarget() == 'string' ? $('#' + e.map.getTarget()) : e.map.getTarget());

	    $(target).css({ cursor:'default' });
	    e.map.forEachFeatureAtPixel
	    (
    		e.map.getEventPixel(e.originalEvent),
    		function()
    		{
    			$(target).css({ cursor:'pointer' });
    			return;
    		}
		);
	});
    
    map.on('moveend', function(e)
	{
    	$('#' + elementCarteId + ' .popup').css({
            display:'none'
        });
	});
    
    return map;
};




/**
 * Constructeur d'une carte.
 * 
 * @param string   elementCarteId ID de la balise où installer la carte
 * @param number[] positionCentre Latitude et longitude en degrés
 * @param integer  zoom           Zoom
 */
function Lyssal_OpenLayers3_Map(elementCarteId, positionCentre, zoom)
{
    this.map = Lyssal_OpenLayers3.addMap(elementCarteId, positionCentre, zoom);
};

/**
 * @var Map Carte OpenLayers3
 */
Lyssal_OpenLayers3_Map.prototype.map = null;

/**
 * @var Vector Markers
 */
Lyssal_OpenLayers3_Map.prototype.markers = new Array();


/**
 * Ajoute un marker sur la carte.
 * 
 * @param string   imageSrc URL de l'image du marker
 * @param number[] position Latitude et longitude en degrés
 * @param string   titre    Titre du marker
 * @param string   contenu  Contenu du marker
 */
Lyssal_OpenLayers3_Map.prototype.addMarker = function(imageSrc, position, titre, contenu)
{
    var vectorSource = new ol.source.Vector({
        
    });

	var iconFeature = new ol.Feature
    ({
        geometry: new ol.geom.Point(ol.proj.transform(new Array(parseFloat(position[0]), parseFloat(position[1])), 'EPSG:4326', 'EPSG:3857')),
        name: titre,
        content: contenu,
        population: 4000,
        rainfall: 500
    });
	vectorSource.addFeature(iconFeature)

    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
            src:imageSrc
        })
    });
    iconFeature.setStyle(iconStyle);

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
    });
    
    this.map.addLayer(vectorLayer);
};
