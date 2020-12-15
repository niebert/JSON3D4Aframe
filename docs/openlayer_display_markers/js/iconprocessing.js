var olview = new ol.View({
    //center: [-9120944.666442728, 2653259.4403269454],
    center: ol.proj.transform(vMapCenter, 'EPSG:4326', 'EPSG:3857'),
    zoom: vZoom,
    //resolution: 39135.75848201024,
    //minZoom: 2,
    //maxZoom: 20
});

var sourceFeatures = new ol.source.Vector(),
    layerFeatures = new ol.layer.Vector({source: sourceFeatures});

var map = new ol.Map({
    target: document.getElementById('map'),
    loadTilesWhileAnimating: true,
    loadTilesWhileInteracting: true,
    view: olview,
    renderer: 'canvas',
    layers: [
      new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        layerFeatures
    ]
});

var popup = new ol.Overlay.Popup;
popup.setOffset([0, -55]);
map.addOverlay(popup);


var style1 = [
    new ol.style.Style({
        image: new ol.style.Icon(({
            scale: 0.2,
            rotateWithView: false,
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 1,
            src: vIconURL
        })),
        zIndex: 5
    }),
    new ol.style.Style({
        image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
                xcolor: 'rgba(255,255,255,1)',
                color: 'blue'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0,0,0,1)'
            })
        })
    })
];


for (var i = 0; i < vIconArray.length; i++) {
		
    console.log("Display Icon Name: "+vIconArray[i].name )
     var feature = new ol.Feature({
    	type: 'click',
    	desc: vIconArray[i].name,
    	geometry: new ol.geom.Point(ol.proj.transform(vIconArray[i].geolocation, 'EPSG:4326', 'EPSG:3857'))
	});
	feature.setStyle(style1);
	sourceFeatures.addFeature(feature);
}
      

map.on('click', function(evt) {
    var f = map.forEachFeatureAtPixel(
        evt.pixel,
        function(ft, layer){return ft;}
    );
    if (f && f.get('type') == 'click') {
        var geometry = f.getGeometry();
        var coord = geometry.getCoordinates();
        
        var content = '<p>'+f.get('desc')+'</p>';
        
        popup.show(coord, content);
        
    } else { popup.hide(); }
    
});
map.on('pointermove', function(e) {
    if (e.dragging) { popup.hide(); return; }
    
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

