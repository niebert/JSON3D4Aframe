//---function converts a geolocation string into an array and return the map center array for openlayers 

function getGeolocArray4String(pGeolocString,pMapCenter) {
	//e.g. pGeolocString = "-1.81185,52.443141";
	var vCenter = "";
	try {
		eval("vCenter =  ["+pGeolocString+"]");
	} catch (e) {
		// eval failed and show error message
		alert(e);
		vCenter = pMapCenter;
	};
	return vCenter;
};	

//----- function return the current zoom factor of the map
function getZoom() {
	return map.getView().getZoom();
};

function saveGeolocation(pLocation) {
	localStorage.setItem("mapcenter",pLocation);
	localStorage.setItem("zoom",getZoom());
	console.log("mapcenter="+pLocation+" and zoom="+getZoom()+" settings stored in LocalStorage");
}

  
  	 