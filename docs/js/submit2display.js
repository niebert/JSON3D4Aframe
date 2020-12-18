/**
* Extend object 'a' with the properties of object 'b'.
* If there's a conflict, content of object 'b' overwrites content of 'a'
*/

function displaySettings(vExportID,pToggle) {
  console.log("Display Settings for Export Mode '" + vExportID + "'");
  switch (vExportID) {
    case "aframe":
      if (pToggle) {
        $('#aframe_settings').toggle();
      } else {
        $('#aframe_settings').show();
      }
      $('#ar_settings').hide();
      $('#argeo_settings').hide();
    break;
    case "ar":
      if (pToggle) {
        $('#ar_settings').toggle();
      } else {
        $('#ar_settings').show();
      }
      $('#aframe_settings').hide();
      $('#argeo_settings').hide();
    break;
    case "argeo":
      if (pToggle) {
        $('#argeo_settings').toggle();
      } else {
        $('#argeo_settings').show();
      }
      $('#aframe_settings').hide();
      $('#ar_settings').hide();
    break;
    default:

  }
}

function el4id(pID) {
   var vNode = document.getElementById(pID);
   if (vNode) {
     console.log("DOM Node ["+pID+"] exists!");
   } else {
     console.log("ERROR: DOM Node ["+pID+"] does not exist!");
   };
   return vNode
}

function copyMarker3D() {
  console.log("copyMarker3D");
  //el4id("aframemarker").value = el4id("marker").value;
  //el4id("viewmarker").value = el4id("marker").value;
  console.log("copyMarker3D after");
};

function setTimeID() {
  write2value("timeaframe", Date.now());
  write2value("timear", Date.now());
}

function populateDataJSON(pTextareaID) {
  vEditor4JSON.saveLS(); // save JSON Data to Local Storage
  //copyMarker3D();
  setTimeID();
  var vData = vEditor4JSON.aData;
    //document.getElementById('jsondata').value = vOut;
  el4id(pTextareaID).value = JSON.stringify(vData,null,2);
};


function geolocation2mapcenter() {
  write2value("selectmapcenter",getValueDOM("ar_longitude")+", "+getValueDOM("ar_latitude"));
  console.log("MapCenter for Select is '"+getValueDOM("selectmapcenter")+"'");
}

function populateGeoJSON(pTextareaID) {
  vEditor4JSON.saveLS(); // save JSON Data to Local Storage
  /*
  JSON to display the GeoAR Model
  -------------------------------
  [
    {
        "geolocation": [
            -0.14467470703124907,
            51.493889053694915
        ],
        "name": "The City of London <a href=\"https://en.wikipedia.org/wiki/London\" target=\"_blank\">Link to Wikipedia</a>"
    }
  ]
  */
  geolocation2mapcenter();
  setTimeID();
  write2value("viewmapcenter",getValueDOM("selectmapcenter"));
  write2value("viewzoom",getValueDOM("selectzoom"));
  var vLatitude = parseFloat(getValueDOM("ar_latitude"));
  var vLongitude = parseFloat(getValueDOM("ar_longitude"));
  var vGeoJSON = [
    {
      "time": Date.now(),
      "geolocation":[vLongitude,vLatitude],
      "name": "The marker defines the geographic reference for the Augmented Reality model at geolocation Latitude: "+getValueDOM("ar_latitude")+ " and Longitude "+ getValueDOM("ar_longitude")+"."
    }
  ];
  //document.getElementById('jsondata').value = vOut;
  el4id(pTextareaID).value = JSON.stringify(vGeoJSON,null,4);
};

function getString4Object(pNr,pRec) {
  var vOut = "";
  vOut = JSON.stringify(pRec,null,4)
  return vOut;
}
