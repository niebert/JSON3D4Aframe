function loadMarkerLS(pConfig) {
  if (typeof(localStorage.getItem("marker")) !== undefined) {
    var vMarker = localStorage.getItem("marker");
    console.log("Marker '"+vMarker+"' try loading from Local Storage");
    switch (vMarker) {
      case "kanji":
        selectMarker(vMarker);
        pConfig["marker"] = vMarker;
      break;
      default:
        vMarker = "hiro";
        selectMarker(vMarker);
        pConfig["marker"] = vMarker;
    };
    $('#marker').val(vMarker);
    $('#armarker').val(vMarker);
  };
}

function saveMarkerLS(pConfig) {
  saveDOMLS(pConfig,"marker");
}

function loadConfigLS(pConfig) {
  loadMarkerLS(pConfig);
  loadDOMLS(pConfig,"globalscale","1.0");
  loadDOMLS(pConfig,"globalmove","0.0 0.0 0.0");
}

function saveConfigLS(pConfig) {
  saveDOMLS(pConfig,"marker");
  saveDOMLS(pConfig,"globalscale");
  saveDOMLS(pConfig,"globalmove");
}



function loadDOMLS(pConfig,pID,pDefault) {
  if (typeof(localStorage.getItem(pID)) !== undefined) {
    var vValue = localStorage.getItem(pID);
    if (vValue != "") {
      $("#"+pID).val(vValue);
      pConfig[pID] = vValue;
    } else {
      $("#"+pID).val(pDefault);
      pConfig[pID] = pDefault;
    }
  };
}

function saveDOMLS(pConfig,pID) {
  localStorage.setItem(pID,$("#"+pID).val());
  pConfig[pID] = $("#"+pID).val();
}
