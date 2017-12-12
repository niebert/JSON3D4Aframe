function loadMarkerLS() {
  if (typeof(localStorage.getItem("marker")) !== undefined) {
    var vMarker = localStorage.getItem("marker");
    console.log("Marker '"+vMarker+"' try loading from Local Storage");
    switch (vMarker) {
      case "kanji":
        selectMarker(vMarker)
      break;
      default:
        vMarker = "hiro";
        selectMarker(vMarker);
    };
    $('#marker').val(vMarker);
    $('#armarker').val(vMarker);
  };
}

function saveMarkerLS() {
  saveDOMLS("marker");
}

function loadConfigLS() {
  loadMarkerLS();
  loadDOMLS("globalscale","1.0");
  loadDOMLS("globalmove","0.0 0.0 0.0");
}

function saveConfigLS() {
  saveDOMLS("marker");
  saveDOMLS("globalscale");
  saveDOMLS("globalmove");
}



function loadDOMLS(pID,pDefault) {
  if (typeof(localStorage.getItem(pID)) !== undefined) {
    var vValue = localStorage.getItem(pID);
    if (vValue != "") {
      $("#"+pID).val(vValue);
    } else {
      $("#"+pID).val(pDefault);
    }
  };
}

function saveDOMLS(pID) {
  localStorage.setItem(pID,$("#"+pID).val());
}
