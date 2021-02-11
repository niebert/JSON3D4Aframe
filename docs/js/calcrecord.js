// HTML Code is generated with the method Editor4JSON.generateHTML() in file js/editor4json.js


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
    // position is the (x.y.z) positions in your coordinate system.
    pData.position  = floatArr2String(pPosArray);
    console.log("CALL: expandGeoLocation() - "+JSON.stringify(pData,null,4));
  }
  return pData;
}

function getGeoLocationHash() {
  //var vLatitude = parseFloat(getValueDOM("ar_latitude"));
  //var vLongitude = parseFloat(getValueDOM("ar_longitude"));
  //math.js  see https://mathjs.org/docs/datatypes/bignumbers.html
  var vLatitude = math.bignumber(getValueDOM("ar_latitude"));
  var vLongitude = math.bignumber(getValueDOM("ar_longitude"));
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
  var vUnit = math.bignumber(getValueDOM("ar_unit_length"));
  // vGeoHash contains math.js bignumber for highter precision
  var vGeoHash = {
    "longitude":vLongitude,
    "latitude":vLatitude,
    "unit":vUnit
  };
  return vGeoHash;
}

function get3DRepeatedArray(pData) {
  console.log("GEN3D: get3DRepeatedArray('<" + pData.tagname + ">')");
  // Is used to populate ARobjects
  var v3DOutArr = []; // Array of repeated 3D objects
  var vCountArr = getRepeatCount(pData); // Array of integers [0,2,0] 2 attiional copies in y-driection
  var vStepsArr = getRepeatSteps(pData); //Array of Real
  var vPositionArr = string2FloatArray(pData.position);
  var vSizeXYZ = getArraySizeXYZ(pData);
  //var vSizeTriangle = null;
  while (vPositionArr.length < 3) {
    vDefaultValue = 0.0; // default 0 repetitions copies of 3D object
    vPositionArr.push(vDefaultValue);
  }
  var vPosIteration = [0.0,0.0,0.0];
  // vGeoHash contains math.js bignumber for highter precision
  var vGeoHash = getGeoLocationHash();
  // vLatitude and vLongitude are of math.js bignumber type
  var vLatitude = vGeoHash.latitude;
  var vLongitude = vGeoHash.longitude;
  var vData = null;
  for (var ix = 0; ix <= vCountArr[0]; ix++) {
    // Count x-direction
    vPosIteration[0] = addBig(vPositionArr[0] , multBig(ix, vStepsArr[0]));
    for (var iy = 0; iy <= vCountArr[1]; iy++) {
      // Count y-direction
      vPosIteration[1] = addBig(vPositionArr[1] , multBig(iy ,vStepsArr[1]));
      for (var iz = 0; iz <= vCountArr[2]; iz++) {
        // Count z-direction
        vPosIteration[2] = addBig(vPositionArr[2] , multBig(iz , vStepsArr[2]));
        vData = cloneJSON(pData);
        vData.class = pData.id;
        console.log("vData['position']='" + vData.position + "' new position");
        vData.position = floatArr2String(vPosIteration);
        // Global scaling will be performed in calcRecordJSON
        vData = expandGeoLocation(vData,vGeoHash,vPosIteration,getValueDOM("arselect"));
        // set reference geolocation for the coordinate system.
        // see math.js - https://mathjs.org/docs/datatypes/bignumbers.html
        vData.ar_latitude  = vLatitude.toString();
        vData.ar_longitude = vLongitude.toString();
        // vLatitude and vLongitude are of math.js bignumber type
        console.log("SWITCH get3DRepeatedArray(): "+vData.tagname);
        if (vData.tagname == "a-pyramid") {
            vData.name4type = "PYRAMID";
            // vCreator3D.pyramid() defined in js/aframe_pyramid.js
            vCreator3D.pyramid(v3DOutArr,vData,vSizeXYZ);
        } else if (vData.tagname == "a-ellipsoid") {
            vData.name4type = "ELLIPSOID";
            // vCreator3D.ellipsoid() defined in js/aframe_pyramid.js
            //vCreator3D.ellipsoid(v3DOutArr,vData,vSizeXYZ);
            v3DOutArr.push(calcRecordJSON(vData));
        } else {
            v3DOutArr.push(calcRecordJSON(vData));
        }
      }
    }
  }
  return v3DOutArr;
}

function create3DTag(pTagName) {
  //return document.createElement(pTagName);
  if (pTagName == "a-ellipsoid") {
    pTagName = "a-sphere";
  }
  return {
    "tagName":pTagName,
    "attributes":[],
    "children":[]
  };
}

function calcRecordJSON(pData) {
  // pData is a clone Hash of a SINGLE 3D object
  var vGlobalScale = getGlobalScale();
  var vScale = pData.scale || parseFloatBig("1.0");
  vScale *= vGlobalScale; //
  //var vData = cloneJSON(pData);
  var vData = pData;
  //global scaling of position
  //math.bignumber() with higher precision
  scalePosition(vData,vGlobalScale);
  movePosition(vData,getGlobalMove());
  checkAttribs3D(vData);
  // String attribute "sizexyz" will be extracted by getArraySizeXYZ() and
  // parsed into an array of real values, that can be scaled
  var vSizeXYZ = getArraySizeXYZ(pData);
  // This is the length of the source array - which might be shorter than extended array pSizeXYZ (which is extended to minimal length 3)
  var sizexyz_src = [];
  if (pData && pData.sizexyz) {
      pData.sizexyz = pData.sizexyz.replace(/\s+$/,"");
      sizexyz_src = pData.sizexyz.split(/\s+/);
  }
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
  var vTagName = vData.tagname;
  var vTag = create3DTag(vTagName);
  vTag.attributes.push({
      "name":"position",
      "value":vData.position
  });
  vTag.attributes.push({
      "name":"rotation",
      "value":vData.rotation
  });
  vTag.attributes.push({
      "name":"material",
      "value": ("color:" + vData.color + ";opacity:" + vData.opacity)
  });
  //vEl3D.setAttribute("position",vDataArr[k].position);
  //vEl3D.setAttribute("rotation",vDataArr[k].rotation);
  //vEl3D.setAttribute("material","color:" + vDataArr[k].color + ";opacity:" + vDataArr[k].opacity);

  vData.domnodes = vData.domnodes || [];
  console.log("calcRecordJSON(pData) - Tag:<" + vTagName + ">");
  if (vTagName == "a-box") {
    vData.name4type = "BOX";
    vAttribs += getAttribAframe(vTag,"width",vSizeXYZ,0,vScale);
    vAttribs += getAttribAframe(vTag,"height",vSizeXYZ,1,vScale);
    vAttribs += getAttribAframe(vTag,"depth",vSizeXYZ,2,vScale);
  } else if (vTagName == "a-image"){
    vData.name4type = "IMAGE";
    vAttribs += getAttribAframe(vTag,"width",vSizeXYZ,0,vScale);
    vAttribs += getAttribAframe(vTag,"height",vSizeXYZ,1,vScale);
  } else if (vTagName == "a-plane") {
      vData.name4type = "PLANE";
      vAttribs += getAttribAframe(vTag,"width",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe(vTag,"height",vSizeXYZ,1,vScale);
  } else if (vTagName == "a-sphere") {
      vData.name4type = "SPHERE";
      vAttribs += getAttribAframe(vTag,"radius",vSizeXYZ,0,vScale);
  } else if (vTagName == "a-ellipsoid") {
      console.log("ELLIPSOID: vSizeXYZ=["+vSizeXYZ.join(",") + "]");
      vAttribs += getAttribAframe(vTag,"radius",[parseFloatBig("1.0")],0,vScale);
      // getAttribAframe() parameter pi=-1 means all components in attribute - blank separated
      // vAttribs += getAttribAframe(vTag,"scale",vSizeXYZ,-1,vScale);
      vAttribs += getAttribAframeConst(vTag,"scale",real2str(vSizeXYZ[0]*vGlobalScale)+" "+real2str(vSizeXYZ[1]*vGlobalScale)+" "+real2str(vSizeXYZ[2]*vGlobalScale));
      vData.name4type = "ELLIPSOID";
      vData.tagname   = "a-sphere";
  } else if (vTagName == "a-circle") {
      vData.name4type = "CICRLE";
      vAttribs += getAttribAframe(vTag,"radius",vSizeXYZ,0,vScale);
  } else if (vTagName == "a-ring") {
      vData.name4type = "RING";
      vSizeXYZ[1] +=  vSizeXYZ[0];
      vAttribs += getAttribAframe(vTag,"radius-inner",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe(vTag,"radius-outer",vSizeXYZ,1,vScale);
  } else if (vTagName == "a-torus") {
      console.log("CASE: <a-torus>");
      vData.name4type = "TORUS";
      /*
      if (vSizeXYZ[1] > (vSizeXYZ[0]/2)) {
        vSizeXYZ[1] = vSizeXYZ[0]/3;
      }
      */
      vAttribs += getAttribAframe(vTag,"radius",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe(vTag,"radius-tubular",vSizeXYZ,1,vScale);
      console.log("CASE: <a-torus> = "+JSON.stringify(vTag,null,4));
  } else if (vTagName == "a-cylinder") {
      vData.name4type = "CYLINDER";
      vAttribs += getAttribAframe(vTag,"radius",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe(vTag,"height",vSizeXYZ,1,vScale);
  } else if (vTagName == "a-cone") {
      vData.name4type = "CONE";
      vAttribs += getAttribAframe(vTag,"radius-bottom",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe(vTag,"radius-top",vSizeXYZ,1,vScale);
      vAttribs += getAttribAframe(vTag,"height",vSizeXYZ,2,vScale);
  } else if (vTagName == "a-triangle") {
      vData.name4type = "TRIANGLE";
      if (sizexyz_src.length >= 9) {
        vAttribs += getAttribAframeConst(vTag,"vertex-a",real2str(vSizeXYZ[0]*vGlobalScale)+" "+real2str(vSizeXYZ[1]*vGlobalScale)+" "+real2str(vSizeXYZ[2]*vGlobalScale));
        vAttribs += getAttribAframeConst(vTag,"vertex-b",real2str(vSizeXYZ[3]*vGlobalScale)+" "+real2str(vSizeXYZ[4]*vGlobalScale)+" "+real2str(vSizeXYZ[5]*vGlobalScale));
        vAttribs += getAttribAframeConst(vTag,"vertex-c",real2str(vSizeXYZ[6]*vGlobalScale)+" "+real2str(vSizeXYZ[7]*vGlobalScale)+" "+real2str(vSizeXYZ[8]*vGlobalScale));
      } else if (sizexyz_src.length >= 6) {
        vAttribs += getAttribAframeConst(vTag,"vertex-a","0 0 0");
        vAttribs += getAttribAframeConst(vTag,"vertex-b",real2str(vSizeXYZ[0]*vGlobalScale)+" "+real2str(vSizeXYZ[1]*vGlobalScale)+" "+real2str(vSizeXYZ[2]*vGlobalScale));
        vAttribs += getAttribAframeConst(vTag,"vertex-c",real2str(vSizeXYZ[3]*vGlobalScale)+" "+real2str(vSizeXYZ[4]*vGlobalScale)+" "+real2str(vSizeXYZ[5]*vGlobalScale));
      } else if (sizexyz_src.length >= 3) {
        vAttribs += getAttribAframeConst(vTag,"vertex-a","0 0 0");
        vAttribs += getAttribAframeConst(vTag,"vertex-b",real2str(vSizeXYZ[0]*vGlobalScale)+" 0 0");
        vAttribs += getAttribAframeConst(vTag,"vertex-c",real2str(vSizeXYZ[1]*vGlobalScale)+" "+real2str(vSizeXYZ[2]*vGlobalScale)+" 0");
      } else {
        vAttribs += getAttribAframeConst(vTag,"vertex-a","0 0 0");
        vAttribs += getAttribAframeConst(vTag,"vertex-b","3 0 0");
        vAttribs += getAttribAframeConst(vTag,"vertex-c","2 1 0");
      }
  } else if (vTagName == "a-text") {
      vData.name4type = "TEXT";
      var vText = pData.comment;
      vText = vText.replace(/"/g,'\"');
      //vAttribs += " value=\""+vText+"\"";
      vAttribs += getAttribAframeConst(vTag,"value",vText);
      //vAttribs += " color=\"" + pData.color + "\"";
      vAttribs += getAttribAframeConst(vTag,"color",pData.color);
      vAttribs += getAttribAframe(vTag,"height",vSizeXYZ,1,vScale);
  } else {
    console.warn("calcRecordJSON('" + vTagName + "') Undefined Tag ");
  }
  // vTag contains the DOM Tag
  vData.domnodes.push(vTag);
  vAttribs += " ";
  // set the value attributes for replacement with the HandleBars
  vData.attributes = vAttribs;
  /*
  if (vData.tagname == "a-ellipsoid") {
    vData.tagname   = "a-sphere";
  }
  */
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

function parseFloatBig(pString) {
  //return math.bignumber(pString);
  return parseFloat(pString);
}

function multBig(a,b) {
  return a * b;
}

function addBig(a,b) {
  return a + b;
}

function divideBig(a,b) {
  var q = 0.0;
  if (b != 0.0) {
    q = a / b;
  } else {
    console.error("CALL: devideBig(a,b) b=0.0 devision undefined return 0.0 instead.");
  }
  return q;
}
function getGlobalScale() {
  var vFloatStr = $("#globalscale").val() || "1.0";
  return parseFloatBig(vFloatStr) || 1.0;
}

function getGlobalMove() {
  var vFloatStrArr = $("#globalmove").val() || "0.0 0.0 0.0";
  return string2FloatArray(vFloatStrArr) || [0.0,0.0,0.0];
}

function scaleBig(pFloat,pScale) {
  // return math.multiply(pFloat,pScale);
  return pFloat *= pScale;
}

function scaleStringArray(pStringArr,pScale) {
  //var vScale = math.bignumber("1.0");
  var vScale = 1.0;
  if (pScale) {
    vScale = pScale;
  }
  var vFloatArr = string2FloatArray(pStringArr);
  for (var i = 0; i < vFloatArr.length; i++) {
    vFloatArr[i] = scaleBig(vFloatArr[i],vScale);
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
  var vSizeXYZstr = pData.sizexyz || "1.0 1.0 1.0";
  var vOutXYZ = string2FloatArray(vSizeXYZstr);
  // extend array to length 3
  var vDefaultValue = vOutXYZ[0] || parseFloatBig("1.0");

  while (vOutXYZ.length < 3) {
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
    // use bignumber of math.js output
    //vValue = math.format(pVal);
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
      vFloatArr.push(parseFloatBig(vStringArr[i]));
      //var x = math.bignumber('0.2222222222222222222')
      //vFloatArr.push(math.bignumber(vStringArr[i]));
    }
  }
  //console.log("string2FloatArray() Array of Floats: ["+vFloatArr.join(",")+"] result!");

  return vFloatArr;
}

function string2PrecisionFloatArray(pString) {
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
      //vFloatArr.push(parseFloat(vStringArr[i]));
      //var x = math.bignumber('0.2222222222222222222')
      vFloatArr.push(math.bignumber(vStringArr[i]));
    }
  }
  //console.log("string2FloatArray() Array of Floats: ["+vFloatArr.join(",")+"] result!");

  return vFloatArr;
}

function getAttribAframeConst(pTag,pAtt,pValue) {
  console.log("getAttribAframeConst(pTag,'"+pAtt+"','"+pValue+"')");
  var vOut = "";
  var vValue = pValue || "undefined_value";
  if (!pTag) {
    console.warn("getAttribAframeConst(pTag,...) pTag.attributes undefined");
    pTag = {
      "attributes":[],
      "children": []
    };
  } else {
    if (!pTag.hasOwnProperty("attributes")) {
      console.warn("WARNING: getAttribAframeConst(pTag,'"+pAtt+"','"+pValue+"') - attributes are not defined in pTag");
      pTag.attributes = [];
    }
  }
  vOut = " "+pAtt+"=\""+vValue+"\"";
  if (pTag && pTag.attributes) {
    pTag.attributes.push({
      "name":pAtt,
      "value":vValue
    });
  }
  return vOut;
}

function getAttribAframe(pTag,pAtt,pSizeXYZ,pi,pScale) {
  var vScale = pScale || parseFloatBig("1.0");
  var vOut = "";
  var vSize = null;
  if (!pTag) {
    console.warn("getAttribAframe(pTag,...) pTag.attributes undefined");
    pTag = {
      "attributes":[],
      "children": []
    };
  }
  if (pSizeXYZ) {
    if (pi>=0) {

      // pi is an index within the range of the array
      if (pi < pSizeXYZ.length) {
        // bignumber multiply
        vSize = multBig(pSizeXYZ[pi], pScale);
        if (vSize) {
          var vValue = real2str(vSize);
          if (pAtt && (pAtt != "")) {
            vOut = " "+pAtt+"=\""+vValue+"\"";
            if (pTag && pTag.attributes) {
              pTag.attributes.push({
                "name":pAtt,
                "value":vValue
              });
            }
          } else {
            console.warn("WARNING: getAttribAframe(pTag,pAtt,...) - pAtt undefined");
            vOut = " "+vOut;
          }
        } else {
          console.warn("getAttribAframe() calculated vSize undefined");
        }
      } else {
        console.warn("getAttribAframe() index i out of range");
      }
    } else {
      // export all components X,Y,Z into one attributes
      console.log("getAttribAframe() all components it attribute '" + pAtt + "' vSizeXYZ=[" + (pSizeXYZ.join(",")) + "]");
      vOut = "";
      var vSep = "";
      var vValueList = "";
      for (var k = 0; k < pSizeXYZ.length; k++) {
        // bignumber multiply
        vSize = pSizeXYZ[k] * pScale;
        vValueList += vSep + real2str(vSize);
        vSep = " ";
      }
      vOut = " "+pAtt+"=\""+vValueList+"\"";
      if (pTag && pTag.attributes) {
        pTag.attributes.push({
          "name":pAtt,
          "value":vValueList
        });
      }
    }
  } else {
    console.log("getAttribAframe() pSizeXYZ undefined");
  };
  console.log("getAttribAframe() JSON-Out="+JSON.stringify(pTag,null,4));
  return vOut;
}
