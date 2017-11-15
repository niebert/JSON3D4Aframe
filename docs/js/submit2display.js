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
    vRecOut = getString4Object(i+1,vData[i]);
    if (vRecOut != "") {
      vOut += vCR + vRecOut;
      vCR = ",\n";
    };
  };
  vOut = "[" + vOut + "]";
  //var vJSON = vData;
  //document.getElementById('jsondata').value = JSON.stringify(vJSON,null,4);
  document.getElementById('jsondata').value = vOut;
};

function getString4Object(pNr,pRec) {
  var vOut = "";
  vOut = JSON.stringify(pRec,null,4)
  return vOut;
}
