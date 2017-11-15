/**
* Extend object 'a' with the properties of object 'b'.
* If there's a conflict, content of object 'b' overwrites content of 'a'
*/

function el4id(pID) {
  return document.getElementById(pID);
}

function copyMarker3D() {
  console.log("copyMarker3D");
  el4id("aframemarker").value = el4id("mymarker").value;
  el4id("viewmarker").value = el4id("mymarker").value;
  console.log("copyMarker3D after");

}

function populateDataJSON(pTextareaID) {
  vEditor4JSON.saveLS(); // save JSON Data to Local Storage
  copyMarker3D();
  var vData = vEditor4JSON.aData;
  var vOut = "";
  var vCR = "";
  var vRecOut = "";
  var vMapCenterMissing = true;
  for (var i = 0; i < vData.length; i++) {
    vRecOut = getMarkerString(i+1,vData[i]);
    if (vRecOut != "") {
      vOut += vCR + vRecOut;
      vCR = ",\n";
      if (vMapCenterMissing) {
        el4id("mymapcenter").value = vData[i].lng+","+vData[i].lat;
        vMapCenterMissing = false;
      }
    };
  };
  vOut = "[" + vOut + "]";
  //var vJSON = vData;
  //document.getElementById('jsondata').value = JSON.stringify(vJSON,null,4);
  document.getElementById('jsondata').value = vOut;
};

function getMarkerString(pNr,pRec) {
  var vOut = "";
  if ((pRec.lat != "") && (pRec.lng != "")) {
    vOut += "{ \"geolocation\" : ["+pRec.lng+","+pRec.lat+"],";
    vOut += "\"name\" : \"";
    vOut +="<b>";
    if (pRec.webpage != "") {
      vOut += "<a href=\\\""+pRec.webpage+"\\\" target=\\\"_blank\\\">"+pRec.title+"</a>";
    } else {
      vOut += pRec.title;
    };
    vOut +="</b>";
    if (pRec.hasOwnProperty("summary")) {
      if (pRec.summary != "") {
        vOut +="<br>";
        vOut += pRec.summary.replace(/"/g,'\"');
        vOut +="\"";
      }
    };
    vOut +="}";

  } else {
    //console.log("("+pNr+") missing geolocation in record");
    alert("("+pNr+") missing geolocation in record");
  };
  return vOut;
}
