/**
 * A class which permits to manage an OpenLayers3 map.
 * Requires OpenLayers3.
 *
 * @author Rémi Leclerc
 */
var Lyssal_OpenLayers3 = new function() {};

/**
 * Install a map.
 *
 * @var string   mapElementId   The ID of the element where the map will be
 * @var number[] centerPosition The latitude et longitude in degree
 * @var int      zoom           The zoom
 * @return Map The created map
 */
Lyssal_OpenLayers3.addMap = function(mapElementId, centerPosition, zoom)
{
    var $mapElement = $('#' + mapElementId);
    $mapElement.addClass('lyssal_openlayers3');
    $mapElement.html('<div class="popup"><div id="map_popup_' + mapElementId + '"></div><div class="fleche"><div class="f-1"></div><div class="f-2"></div><div class="f-3"></div><div class="f-4"></div><div class="f-5"></div></div></div>');

    var map = new ol.Map({
        target: mapElementId,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.transform(centerPosition, 'EPSG:4326', 'EPSG:3857'),
            zoom: zoom
        }),
        controls: [
            new ol.control.FullScreen({
              tipLabel: 'Activer/Désactiver le plein écran'
            }),
            new ol.control.Zoom({
                zoomInTipLabel: 'Zoom +',
                zoomOutTipLabel: 'Zoom -'
            })
        ]
    });

    map.on('click', function(evt) {
        //var latitudeLongitude = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');

        var feature = map.forEachFeatureAtPixel(
            evt.pixel,
            function(feature, layer) {
                return feature;
            }
        );

        var $popup = $('#' + mapElementId + ' .popup');
        if (feature) {
            var geometry = feature.getGeometry();
            var coord = geometry.getCoordinates();
            var pixel = map.getPixelFromCoordinate(coord);

            $('#map_popup_' + mapElementId).html('<div class="title">' + feature.get('name') + '</div><div class="content">' + feature.get('content') + '</div>');

            var left = pixel[0] - parseInt($popup.width()) / 2;
            var top = pixel[1] - parseInt($popup.height()) - 17;

            $popup.css({
                left: left + 'px',
                top: top + 'px',
                display: 'block'
            });
        } else {
            $popup.css({
                display:'none'
            });
        }
    });

    map.on('pointermove', function(e) {
        var target = (typeof e.map.getTarget() == 'string' ? $('#' + e.map.getTarget()) : e.map.getTarget());

        $(target).css({ cursor:'default' });
        e.map.forEachFeatureAtPixel(
            e.map.getEventPixel(e.originalEvent),
            function() {
                $(target).css({ cursor:'pointer' });
                return;
            }
        );
    });

    map.on('moveend', function(e) {
        $('#' + mapElementId + ' .popup').css({
            display:'none'
        });
    });

    return map;
};


/**
 * Constructor.
 *
 * @var string   mapElementId   The ID of the element where the map will be
 * @var number[] centerPosition The latitude et longitude in degree
 * @var int      zoom           The zoom
 */
function Lyssal_OpenLayers3_Map(mapElementId, centerPosition, zoom)
{
    this.map = Lyssal_OpenLayers3.addMap(mapElementId, centerPosition, zoom);
};

/**
 * @var Map The OpenLayers3 map
 */
Lyssal_OpenLayers3_Map.prototype.map = null;

/**
 * @var Vector The markers
 */
Lyssal_OpenLayers3_Map.prototype.markers = new Array();


/**
 * Add a marker in the map.
 *
 * @var string   imageSrc The image URL of the marker
 * @var number[] position The latitude et longitude in degree
 * @var string   title    The title of the marker
 * @var string   content  The content of the marker
 */
Lyssal_OpenLayers3_Map.prototype.addMarker = function(imageSrc, position, title, content)
{
    var vectorSource = new ol.source.Vector({ });

    var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(
            new Array(parseFloat(position[0]), parseFloat(position[1])),
            'EPSG:4326',
            'EPSG:3857'
        )),
        name: title,
        content: content,
        population: 4000,
        rainfall: 500
    });
    vectorSource.addFeature(iconFeature);

    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
            src: imageSrc
        })
    });
    iconFeature.setStyle(iconStyle);

    var vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });

    this.map.addLayer(vectorLayer);
};
