/* ---------------------------------------
 Exported Module Variable: JSON3D4Aframe
 Package:  json3d4aframe
 Version:  2.0.1  Date: 2021/01/02 18:06:17
 Homepage: https://github.com/niebert/JSON3D4Aframe#readme
 Author:   Engelbert Niehaus
 License:  MIT
 Date:     2021/01/02 18:06:17
 Require Module with:
    const JSON3D4Aframe = require('json3d4aframe');
 JSHint: installation with 'npm install jshint -g'
 ------------------------------------------ */

/*jshint  laxcomma: true, asi: true, maxerr: 150 */
/*global alert, confirm, console, prompt */

function expandGeoLocation(pData,pGeoHash,pPosArray,pARSelect) {
  if (pARSelect == "argeo") {
    // expand if and only if output is geolocated AR
    // [x-direction,y-direction,z-direction]
    //pData.latitude = pGeoHash.latitude + pPosArray[0] * pGeoHash.unit;
    //pData.longitude = pGeoHash.longitude + pPosArray[2] * pGeoHash.unit;
    //pPosArray[0] = 0.0;
    //pPosArray[2] = 0.0;
    pData.latitude  = pGeoHash.latitude;
    pData.longitude = pGeoHash.longitude;
    pData.position  = floatArr2String(pPosArray);
    console.log("CALL: expandGeoLocation() - "+JSON.stringify(pData,null,4));
  }
  return pData;
}

function getGeoLocationHash() {
  var vLatitude = parseFloat(getValueDOM("ar_latitude"));
  var vLongitude = parseFloat(getValueDOM("ar_longitude"));
  if (isNaN(vLatitude)) {
    console.error("ERROR: getGeoLocationHash() - Float for ar_latitude is not a number!");
  } else {
    console.log("CALL: getGeoLocationHash() - Latitude="+vLatitude);
  }
  if (isNaN(vLongitude)) {
    console.error("ERROR: getGeoLocationHash() - Float for ar_longitude is not a number!");
  } else {
    console.log("CALL: getGeoLocationHash() - Longitude="+vLongitude);
  }
  var vUnit = parseFloat(getValueDOM("ar_unit_length"));
  var vGeoHash = {
    "longitude":vLongitude,
    "latitude":vLatitude,
    "unit":vUnit
  };
  return vGeoHash
}

function get3DRepeatedArray(pData) {
  var v3DOutArr = [];
  var vCountArr = getRepeatCount(pData); // Array of integers [0,2,0] 2 attiional copies in y-driection
  var vStepsArr = getRepeatSteps(pData); //Array of Real
  var vPositionArr = string2FloatArray(pData.position);
  while (vPositionArr.length < 3) {
    vDefaultValue = 0.0; // default 0 repetitions copies of 3D object
    vPositionArr.push(vDefaultValue);
  }
  var vPosIteration = [0.0,0.0,0.0];
  var vGeoHash = getGeoLocationHash();
  var vLatitude = vGeoHash.latitude;
  var vLongitude = vGeoHash.longitude;
  var vData = null;
  for (var ix = 0; ix <= vCountArr[0]; ix++) { // Count x-direction
    vPosIteration[0] = vPositionArr[0] + ix * vStepsArr[0];
    for (var iy = 0; iy <= vCountArr[1]; iy++) { // Count y-direction
      vPosIteration[1] = vPositionArr[1] + iy * vStepsArr[1];
      for (var iz = 0; iz <= vCountArr[2]; iz++) { // Count z-direction
        vPosIteration[2] = vPositionArr[2] + iz * vStepsArr[2];
        vData = cloneJSON(pData);
        console.log("vData['position']='" + vData.position + "' new position");
        vData.position = floatArr2String(vPosIteration);
        // Global scaling will be performed in calcRecordJSON
        vData = expandGeoLocation(vData,vGeoHash,vPosIteration,getValueDOM("arselect"));
        // set reference geolocation for the coordinate system.
        vData.ar_latitude = vLatitude;
        vData.ar_longitude = vLongitude;

        v3DOutArr.push(calcRecordJSON(vData));
      }
    }
  }
  return v3DOutArr;
}


function calcRecordJSON(pData) {
  // pData is a clone Hash of a SINGLE 3D object
  var vGlobalScale = getGlobalScale();
  var vScale = pData.scale || 1.0;
  vScale *= vGlobalScale; //
  //var vData = cloneJSON(pData);
  var vData = pData;
  //global scaling of position
  scalePosition(vData,vGlobalScale);
  movePosition(vData,getGlobalMove());
  checkAttribs3D(vData);
  // String attribute "sizexyz" will be extracted by getArraySizeXYZ() and
  // parsed into an array of real values, that can be scaled
  var vSizeXYZ = getArraySizeXYZ(pData);
  // "a-box",
  // "a-sphere",
  // "a-cylinder",
  // "a-cone",
  // "a-plane",
  // "a-triangle",
  // "a-circle",
  // "a-image"
  // "a-torus"
  // "a-ring"
  // "a-sky" set global "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Newman_University_Church_Interior_360x180%2C_Dublin%2C_Ireland_-_Diliff.jpg/1280px-Newman_University_Church_Interior_360x180%2C_Dublin%2C_Ireland_-_Diliff.jpg"
  var vAttribs = "";
  switch (vData["tagname"]) {
    case "a-box":
      vAttribs += getAttribAframe("width",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe("height",vSizeXYZ,1,vScale);
      vAttribs += getAttribAframe("depth",vSizeXYZ,2,vScale);
    break;
    case "a-image":
      vAttribs += getAttribAframe("width",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe("height",vSizeXYZ,1,vScale);
    break;
    case "a-plane":
      vAttribs += getAttribAframe("width",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe("height",vSizeXYZ,1,vScale);
    break;
    case "a-sphere":
      vAttribs += getAttribAframe("radius",vSizeXYZ,0,vScale);
    break;
    case "a-ellipsoid":
      vAttribs += getAttribAframe("width",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe("height",vSizeXYZ,1,vScale);
      vAttribs += getAttribAframe("depth",vSizeXYZ,2,vScale);
      vSizeXYZ[0] = 1.0; 
      vAttribs += getAttribAframe("radius",vSizeXYZ,0,vScale);

    break;
    case "a-circle":
      vAttribs += getAttribAframe("radius",vSizeXYZ,0,vScale);
    break;
    case "a-ring":
      vSizeXYZ[1] +=  vSizeXYZ[0];
      vAttribs += getAttribAframe("radius-inner",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe("radius-outer",vSizeXYZ,1,vScale);
    break;
    case "a-torus":
      if (vSizeXYZ[1] > (vSizeXYZ[0]/2)) {
        vSizeXYZ[1] = vSizeXYZ[0]/3;
      }
      vAttribs += getAttribAframe("radius",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe("radius-tubular",vSizeXYZ,1,vScale);
    break;
    case "a-cylinder":
      vAttribs += getAttribAframe("radius",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe("height",vSizeXYZ,1,vScale);
    break;
    case "a-cone":
    vAttribs += getAttribAframe("radius-bottom",vSizeXYZ,0,vScale);
    vAttribs += getAttribAframe("radius-top",vSizeXYZ,1,vScale);
    vAttribs += getAttribAframe("height",vSizeXYZ,2,vScale);
    break;
    case "a-triangle":
      vAttribs += " vertex-a=\"0 0 0\"";
      vAttribs += " vertex-b=\""+real2str(vSizeXYZ[0]*vGlobalScale)+" 0 0\"";
      vAttribs += " vertex-c=\""+real2str(vSizeXYZ[1]*vGlobalScale)+" "+real2str(vSizeXYZ[2]*vGlobalScale)+" 0\"";
    break;
    case "a-text":
      var vText = pData.comment;
      vText = vText.replace(/"/g,'\"');
      vAttribs += " value=\""+vText+"\"";
      vAttribs += " color=\"" + pData.color + "\"";
      vAttribs += getAttribAframe("height",vSizeXYZ,1,vScale);
    break;
    default:

  }
  vAttribs += " ";
  // set the value attributes for replacement with the HandleBars
  vData.attributes = vAttribs;
  if (vData.tagname == "a-ellipsoid") {
    vData.tagname   = "a-sphere";
  }

  return vData;
}

function getRepeatCount(pData) {
  // extend array to length 3
  var vCountXYZstr = pData.repeat || "0 0 0";
  var vCountXYZ = string2FloatArray(vCountXYZstr);
  while (vCountXYZ.length < 3) {
    vDefaultValue = 0; // default 0 repetitions copies of 3D object
    vCountXYZ.push(vDefaultValue);
  }
  return vCountXYZ;
}

function getRepeatSteps(pData) {
  // extend array to length 3
  var vStepsXYZstr = pData.repeatsteps || "1.0 1.0 1.0";
  //if (pData.hasOwnProperty("repeatsteps")) {
  //  vStepsXYZstr = pData["repeatsteps"];
  //};
  var vStepsXYZ = string2FloatArray(vStepsXYZstr);
  while (vStepsXYZ.length < 3) {
    vDefaultValue = 1.0; // default step width 1.0 for repetitions/copies of 3D object
    vStepsXYZ.push(vDefaultValue);
  }
  return vStepsXYZ;
}


function getGlobalScale() {
  var vFloatStr = $("#globalscale").val() || "1.0";
  return parseFloat(vFloatStr) || 1.0;
}

function getGlobalMove() {
  var vFloatStrArr = $("#globalmove").val() || "0.0 0.0 0.0";
  return string2FloatArray(vFloatStrArr) || [0.0,0.0,0.0];
}

function scaleStringArray(pStringArr,pScale) {
  var vScale = pScale || 1.0;
  var vFloatArr = string2FloatArray(pStringArr);
  for (var i = 0; i < vFloatArr.length; i++) {
    vFloatArr[i] *= vScale;
  }
  return floatArr2String(vFloatArr);
}


function floatArr2String(pFloatArr) {
  var vOut = "";
  var vSep = "";
  for (var i = 0; i < pFloatArr.length; i++) {
    vOut += vSep + real2str(pFloatArr[i]);
    vSep = " ";
  }
  return vOut;
}

function scalePosition(pData,pGlobalScale) {
  var vGlobalScale = pGlobalScale || 1.0;
  pData.position = scaleStringArray(pData.position,vGlobalScale);
}

function movePosition(pData,pGlobalMove) {
  var vFloatArr = string2FloatArray(pData.position);
  var vMoveVal = 0.0;
  for (var i = 0; i < vFloatArr.length; i++) {
    vMoveVal = pGlobalMove[i] || 0.0;
    vFloatArr[i] += vMoveVal;
  }
  pData.position = floatArr2String(vFloatArr);
}

function transformPosition(pData,pGlobalScale,pGlobalMove) {
  var vScale = pGlobalScale || 1.0;
  var vFloatArr = string2FloatArray(pData.position);
  var vMoveVal = 0.0;
  for (var i = 0; i < vFloatArr.length; i++) {
    vFloatArr[i] *= vScale;
    vMoveVal = pGlobalMove[i] || 0.0;
    vFloatArr[i] += vMoveVal;
  }
  pData.position = floatArr2String(vFloatArr);
}

function checkAttribs3D(pData) {
  setUndefinedDefault(pData,"rotation","0 0 0");
  setUndefinedDefault(pData,"position","0.0 0.0 0.0");
  setUndefinedDefault(pData,"repeat","0 0 0");
  setUndefinedDefault(pData,"repeatsteps","1.0 1.0 1.0");
};

function setUndefinedDefault(pData,pID,pDefault) {
  if (pData[pID]) {
    if (pData[pID].length < 5) {
      pData[pID] = pDefault;
    }
  } else {
    pData[pID] = pDefault;
  }
}


function getArraySizeXYZ(pData) {
  // pData is Hash for one 3D object/primitive
  // String attribute "sizexyz" will be extracted by getArraySizeXYZ() and
  // parsed into an array of real values, that can be scaled
  var vSizeXYZstr = pData.sizexyz || "3.0 2.0 1.0";
  var vOutXYZ = string2FloatArray(vSizeXYZstr);
  // extend array to length 3
  while (vOutXYZ.length < 3) {
    vDefaultValue = 3-vOutXYZ.length;
    vOutXYZ.push(vDefaultValue);
    console.error("ERROR: getArraySizeXYZ(pData) pData does not have a sufficient length - current length=" + vOutXYZ.length +  "<3 - expand length by error correction!");
  }
  return vOutXYZ;
}

function real2str(pVal) {
  var vValue = 0.0;
  if (isNaN(pVal)) {
    console.error("ERROR: real2str(" + pVal + ") - calcrecord.js - parameter is not a number!");
  } else {
    vValue = pVal.toFixed(2);
  }
  return vValue;
}

function string2FloatArray(pString) {
  //console.log("string2FloatArray('" + pString + "')");
  var vString = pString || "3.0 2.0 1.0";
  //remove ledading and tailing white spaces
  vString = vString.replace(/^\s+|\s+$/g,'');
  // replace german comma "," by a decimal point "."
  vString = vString.replace(/,/g,'.');
  // split String into array at whitespace
  var vStringArr = vString.split(/\s+/);
  var vFloatArr = [];
  var vDefaultValue = 1.0;
  for (var i = 0; i < vStringArr.length; i++) {
    if (isNaN(vStringArr[i])) {
      console.warn("WARNING: string2FloatArray() parsing Float for '"+vStringArr[i]+"' undefined");
      vDefaultValue = 3-i;
      vFloatArr.push(vDefaultValue);
    } else {
      vFloatArr.push(parseFloat(vStringArr[i]));
    }
  }
  //console.log("string2FloatArray() Array of Floats: ["+vFloatArr.join(",")+"] result!");

  return vFloatArr;
}

function getAttribAframe(pAtt,pSizeXYZ,i,pScale) {
  var vScale = pScale || 1.0;
  var vOut = "";
  if (pSizeXYZ) {
    if ((i>=0) && (i < pSizeXYZ.length)) {
      var vSize = pSizeXYZ[i] * pScale;
      if (vSize) {
        vOut = real2str(vSize);
        if (pAtt && (pAtt != "")) {
          vOut = " "+pAtt+"=\""+vOut+"\"";
        } else {
          vOut = " "+vOut;
        }
      } else {
        console.log("getAttribAframe() calculated vSize undefined");
      }
    } else {
      console.log("getAttribAframe() index i out of range");
    }
  } else {
    console.log("getAttribAframe() pSizeXYZ undefined");
  }
  return vOut;
}

