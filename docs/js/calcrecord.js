function calcRecordJSON(pData) {
  // pData is a pointer to a Hash of a 3D object
  var vData = cloneJSON(pData);
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
  switch (vData["scale"]) {
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
      };
      vAttribs += getAttribAframe("radius",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe("radius-tubular",vSizeXYZ,1,vScale);
    break;
    case "a-cylinder":
      vAttribs += getAttribAframe("radius",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe("height",vSizeXYZ,1,vScale);
    break;
    case "a-cone":
      vAttribs += getAttribAframe("radius",vSizeXYZ,0,vScale);
      vAttribs += getAttribAframe("height",vSizeXYZ,1,vScale);
    break;
    case "a-triangle":
      vAttribs += " vertex-a=\"0 0 0\"";
      vAttribs += " vertex-b=\""+real2str(vSizeXYZ[0])+" 0 0\"";
      vAttribs += " vertex-c=\""+real2str(vSizeXYZ[1])+" "+real2str(vSizeXYZ[2])+" 0\"";
    break;
    default:

  };
  vAttribs += " ";
  // set the value attributes for replacement with the HandleBars
  vData["attributes"] = vAttribs;
  return vData
};

function checkAttribs3D(pData) {
  if (pData["rotation"]) {
    if (pData["rotation"].length < 5) {
      pData["rotation"] = "0 0 0";
    };
  } else {
    pData["rotation"] = "0 0 0";
  }
}

function getArraySizeXYZ(pData) {
  // pData is Hash for one 3D object/primitive
  // String attribute "sizexyz" will be extracted by getArraySizeXYZ() and
  // parsed into an array of real values, that can be scaled
  var vSizeXYZstr = pData["sizexyz"] || "3.0 2.0 1.0";
  //remove ledading and tailing white spaces
  vSizeXYZstr = vSizeXYZstr.replace(/^\s+|\s+$/g,'');
  // replace german comma "," by a decimal point "."
  vSizeXYZstr = vSizeXYZstr.replace(/,/g,'.');
  // split String into array at whitespace
  var vSizeArr = vSizeXYZstr.split(/\s+/);
  var vOutXYZ = [];
  var vDefaultValue = 1.0;
  for (var i = 0; i < vSizeArr.length; i++) {
    if (isNaN(vSizeArr[i])) {
      console.log("getArraySizeXYZ() parsing Float for '"+vSizeArr[i]+"' undefined");
      vDefaultValue = 3-i;
      vOutXYZ.push(vDefaultValue);
    } else {
      vOutXYZ.push(parseFloat(vSizeArr[i]));
    };
  };
  while (vOutXYZ.length < 3) {
    vDefaultValue = 3-vOutXYZ.length;
    vOutXYZ.push(vDefaultValue);
  };
  return vOutXYZ;
};

function real2str(pVal) {
  return pVal.toFixed(4);
}

function getAttribAframe(pAtt,pSizeXYZ,i,pScale) {
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
        };
      } else {
        console.log("getAttribAframe() calculated vSize undefined");
      }
    } else {
      console.log("getAttribAframe() index i out of range");
    }
  } else {
    console.log("getAttribAframe() pSizeXYZ undefined");
  };
  return vOut;
}
