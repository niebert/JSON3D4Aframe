/* ---------------------------------------
 Exported Module Variable: JSON3D4Aframe
 Package:  json3d4aframe
 Version:  2.0.1  Date: 2021/01/02 18:12:29
 Homepage: https://github.com/niebert/JSON3D4Aframe#readme
 Author:   Engelbert Niehaus
 License:  MIT
 Date:     2021/01/02 18:12:29
 Require Module with:
    const JSON3D4Aframe = require('json3d4aframe');
 JSHint: installation with 'npm install jshint -g'
 ------------------------------------------ */

/*jshint  laxcomma: true, asi: true, maxerr: 150 */
/*global alert, confirm, console, prompt */

// Library: js/calcrecord.js 

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


// Library: js/jquery_csv.js

/* eslint no-prototype-builtins: 0 */
/**
 * jQuery-csv (jQuery Plugin)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Acknowledgements:
 * The original design and influence to implement this library as a jquery
 * plugin is influenced by jquery-json (http://code.google.com/p/jquery-json/).
 * If you're looking to use native JSON.Stringify but want additional backwards
 * compatibility for browsers that don't support it, I highly recommend you
 * check it out.
 *
 * A special thanks goes out to rwk@acm.org for providing a lot of valuable
 * feedback to the project including the core for the new FSM
 * (Finite State Machine) parsers. If you're looking for a stable TSV parser
 * be sure to take a look at jquery-tsv (http://code.google.com/p/jquery-tsv/).

 * For legal purposes I'll include the "NO WARRANTY EXPRESSED OR IMPLIED.
 * USE AT YOUR OWN RISK.". Which, in 'layman's terms' means, by using this
 * library you are accepting responsibility if it breaks your code.
 *
 * Legal jargon aside, I will do my best to provide a useful and stable core
 * that can effectively be built on.
 *
 * Copyrighted 2012 by Evan Plaice.
 */

RegExp.escape = function (s) {
  return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};

(function () {
  'use strict';

  var $;

  // to keep backwards compatibility
  if (typeof jQuery !== 'undefined' && jQuery) {
    console.log("JQuery defined");
    $ = jQuery;
  } else {
    console.error("JQuery undefined");
    $ = {};
  }

  /**
   * jQuery.csv.defaults
   * Encapsulates the method paramater defaults for the CSV plugin module.
   */

  $.csv = {
    defaults: {
      separator: ',',
      delimiter: '"',
      headers: true
    },

    hooks: {
      castToScalar: function (value, state) {
        var hasDot = /\./;
        if (isNaN(value)) {
          return value;
        } else {
          if (hasDot.test(value)) {
            return parseFloat(value);
          } else {
            var integer = parseInt(value);
            if (isNaN(integer)) {
              return null;
            } else {
              return integer;
            }
          }
        }
      }
    },

    parsers: {
      parse: function (csv, options) {
        // cache settings
        var separator = options.separator;
        var delimiter = options.delimiter;

        // set initial state if it's missing
        if (!options.state.rowNum) {
          options.state.rowNum = 1;
        }
        if (!options.state.colNum) {
          options.state.colNum = 1;
        }

        // clear initial state
        var data = [];
        var entry = [];
        var state = 0;
        var value = '';
        var exit = false;

        function endOfEntry () {
          // reset the state
          state = 0;
          value = '';

          // if 'start' hasn't been met, don't output
          if (options.start && options.state.rowNum < options.start) {
            // update global state
            entry = [];
            options.state.rowNum++;
            options.state.colNum = 1;
            return;
          }

          if (options.onParseEntry === undefined) {
            // onParseEntry hook not set
            data.push(entry);
          } else {
            var hookVal = options.onParseEntry(entry, options.state); // onParseEntry Hook
            // false skips the row, configurable through a hook
            if (hookVal !== false) {
              data.push(hookVal);
            }
          }
          // console.log('entry:' + entry);

          // cleanup
          entry = [];

          // if 'end' is met, stop parsing
          if (options.end && options.state.rowNum >= options.end) {
            exit = true;
          }

          // update global state
          options.state.rowNum++;
          options.state.colNum = 1;
        }

        function endOfValue () {
          if (options.onParseValue === undefined) {
            // onParseValue hook not set
            entry.push(value);
          } else if (options.headers && options.state.rowNum === 1) {
            // don't onParseValue object headers
            entry.push(value);
          } else {
            var hook = options.onParseValue(value, options.state); // onParseValue Hook
            // false skips the row, configurable through a hook
            if (hook !== false) {
              entry.push(hook);
            }
          }
          // console.log('value:' + value);
          // reset the state
          value = '';
          state = 0;
          // update global state
          options.state.colNum++;
        }

        // escape regex-specific control chars
        var escSeparator = RegExp.escape(separator);
        var escDelimiter = RegExp.escape(delimiter);

        // compile the regEx str using the custom delimiter/separator
        var match = /(D|S|\r\n|\n|\r|[^DS\r\n]+)/;
        var matchSrc = match.source;
        matchSrc = matchSrc.replace(/S/g, escSeparator);
        matchSrc = matchSrc.replace(/D/g, escDelimiter);
        match = new RegExp(matchSrc, 'gm');

        // put on your fancy pants...
        // process control chars individually, use look-ahead on non-control chars
        csv.replace(match, function (m0) {
          if (exit) {
            return;
          }
          switch (state) {
            // the start of a value
            case 0:
              // null last value
              if (m0 === separator) {
                value += '';
                endOfValue();
                break;
              }
              // opening delimiter
              if (m0 === delimiter) {
                state = 1;
                break;
              }
              // null last value
              if (/^(\r\n|\n|\r)$/.test(m0)) {
                endOfValue();
                endOfEntry();
                break;
              }
              // un-delimited value
              value += m0;
              state = 3;
              break;

            // delimited input
            case 1:
              // second delimiter? check further
              if (m0 === delimiter) {
                state = 2;
                break;
              }
              // delimited data
              value += m0;
              state = 1;
              break;

            // delimiter found in delimited input
            case 2:
              // escaped delimiter?
              if (m0 === delimiter) {
                value += m0;
                state = 1;
                break;
              }
              // null value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // end of entry
              if (/^(\r\n|\n|\r)$/.test(m0)) {
                endOfValue();
                endOfEntry();
                break;
              }
              // broken paser?
              throw Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');

            // un-delimited input
            case 3:
              // null last value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // end of entry
              if (/^(\r\n|\n|\r)$/.test(m0)) {
                endOfValue();
                endOfEntry();
                break;
              }
              if (m0 === delimiter) {
              // non-compliant data
                throw Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
              }
              // broken parser?
              throw Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
            default:
              // shenanigans
              throw Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
          }
          // console.log('val:' + m0 + ' state:' + state);
        });

        // submit the last entry
        // ignore null last line
        if (entry.length !== 0) {
          endOfValue();
          endOfEntry();
        }

        return data;
      },

      // a csv-specific line splitter
      splitLines: function (csv, options) {
        if (!csv) {
          return undefined;
        }

        options = options || {};

        // cache settings
        var separator = options.separator || $.csv.defaults.separator;
        var delimiter = options.delimiter || $.csv.defaults.delimiter;

        // set initial state if it's missing
        options.state = options.state || {};
        if (!options.state.rowNum) {
          options.state.rowNum = 1;
        }

        // clear initial state
        var entries = [];
        var state = 0;
        var entry = '';
        var exit = false;

        function endOfLine () {
          // reset the state
          state = 0;

          // if 'start' hasn't been met, don't output
          if (options.start && options.state.rowNum < options.start) {
            // update global state
            entry = '';
            options.state.rowNum++;
            return;
          }

          if (options.onParseEntry === undefined) {
            // onParseEntry hook not set
            entries.push(entry);
          } else {
            var hookVal = options.onParseEntry(entry, options.state); // onParseEntry Hook
            // false skips the row, configurable through a hook
            if (hookVal !== false) {
              entries.push(hookVal);
            }
          }

          // cleanup
          entry = '';

          // if 'end' is met, stop parsing
          if (options.end && options.state.rowNum >= options.end) {
            exit = true;
          }

          // update global state
          options.state.rowNum++;
        }

        // escape regex-specific control chars
        var escSeparator = RegExp.escape(separator);
        var escDelimiter = RegExp.escape(delimiter);

        // compile the regEx str using the custom delimiter/separator
        var match = /(D|S|\n|\r|[^DS\r\n]+)/;
        var matchSrc = match.source;
        matchSrc = matchSrc.replace(/S/g, escSeparator);
        matchSrc = matchSrc.replace(/D/g, escDelimiter);
        match = new RegExp(matchSrc, 'gm');

        // put on your fancy pants...
        // process control chars individually, use look-ahead on non-control chars
        csv.replace(match, function (m0) {
          if (exit) {
            return;
          }
          switch (state) {
            // the start of a value/entry
            case 0:
              // null value
              if (m0 === separator) {
                entry += m0;
                state = 0;
                break;
              }
              // opening delimiter
              if (m0 === delimiter) {
                entry += m0;
                state = 1;
                break;
              }
              // end of line
              if (m0 === '\n') {
                endOfLine();
                break;
              }
              // phantom carriage return
              if (/^\r$/.test(m0)) {
                break;
              }
              // un-delimit value
              entry += m0;
              state = 3;
              break;

            // delimited input
            case 1:
              // second delimiter? check further
              if (m0 === delimiter) {
                entry += m0;
                state = 2;
                break;
              }
              // delimited data
              entry += m0;
              state = 1;
              break;

            // delimiter found in delimited input
            case 2:
              // escaped delimiter?
              var prevChar = entry.substr(entry.length - 1);
              if (m0 === delimiter && prevChar === delimiter) {
                entry += m0;
                state = 1;
                break;
              }
              // end of value
              if (m0 === separator) {
                entry += m0;
                state = 0;
                break;
              }
              // end of line
              if (m0 === '\n') {
                endOfLine();
                break;
              }
              // phantom carriage return
              if (m0 === '\r') {
                break;
              }
              // broken paser?
              throw Error('CSVDataError: Illegal state [Row:' + options.state.rowNum + ']');

            // un-delimited input
            case 3:
              // null value
              if (m0 === separator) {
                entry += m0;
                state = 0;
                break;
              }
              // end of line
              if (m0 === '\n') {
                endOfLine();
                break;
              }
              // phantom carriage return
              if (m0 === '\r') {
                break;
              }
              // non-compliant data
              if (m0 === delimiter) {
                throw Error('CSVDataError: Illegal quote [Row:' + options.state.rowNum + ']');
              }
              // broken parser?
              throw Error('CSVDataError: Illegal state [Row:' + options.state.rowNum + ']');
            default:
              // shenanigans
              throw Error('CSVDataError: Unknown state [Row:' + options.state.rowNum + ']');
          }
          // console.log('val:' + m0 + ' state:' + state);
        });

        // submit the last entry
        // ignore null last line
        if (entry !== '') {
          endOfLine();
        }

        return entries;
      },

      // a csv entry parser
      parseEntry: function (csv, options) {
        // cache settings
        var separator = options.separator;
        var delimiter = options.delimiter;

        // set initial state if it's missing
        if (!options.state.rowNum) {
          options.state.rowNum = 1;
        }
        if (!options.state.colNum) {
          options.state.colNum = 1;
        }

        // clear initial state
        var entry = [];
        var state = 0;
        var value = '';

        function endOfValue () {
          if (options.onParseValue === undefined) {
            // onParseValue hook not set
            entry.push(value);
          } else {
            var hook = options.onParseValue(value, options.state); // onParseValue Hook
            // false skips the value, configurable through a hook
            if (hook !== false) {
              entry.push(hook);
            }
          }
          // reset the state
          value = '';
          state = 0;
          // update global state
          options.state.colNum++;
        }

        // checked for a cached regEx first
        if (!options.match) {
          // escape regex-specific control chars
          var escSeparator = RegExp.escape(separator);
          var escDelimiter = RegExp.escape(delimiter);

          // compile the regEx str using the custom delimiter/separator
          var match = /(D|S|\n|\r|[^DS\r\n]+)/;
          var matchSrc = match.source;
          matchSrc = matchSrc.replace(/S/g, escSeparator);
          matchSrc = matchSrc.replace(/D/g, escDelimiter);
          options.match = new RegExp(matchSrc, 'gm');
        }

        // put on your fancy pants...
        // process control chars individually, use look-ahead on non-control chars
        csv.replace(options.match, function (m0) {
          switch (state) {
            // the start of a value
            case 0:
              // null last value
              if (m0 === separator) {
                value += '';
                endOfValue();
                break;
              }
              // opening delimiter
              if (m0 === delimiter) {
                state = 1;
                break;
              }
              // skip un-delimited new-lines
              if (m0 === '\n' || m0 === '\r') {
                break;
              }
              // un-delimited value
              value += m0;
              state = 3;
              break;

            // delimited input
            case 1:
              // second delimiter? check further
              if (m0 === delimiter) {
                state = 2;
                break;
              }
              // delimited data
              value += m0;
              state = 1;
              break;

            // delimiter found in delimited input
            case 2:
              // escaped delimiter?
              if (m0 === delimiter) {
                value += m0;
                state = 1;
                break;
              }
              // null value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // skip un-delimited new-lines
              if (m0 === '\n' || m0 === '\r') {
                break;
              }
              // broken paser?
              throw Error('CSVDataError: Illegal State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');

            // un-delimited input
            case 3:
              // null last value
              if (m0 === separator) {
                endOfValue();
                break;
              }
              // skip un-delimited new-lines
              if (m0 === '\n' || m0 === '\r') {
                break;
              }
              // non-compliant data
              if (m0 === delimiter) {
                throw Error('CSVDataError: Illegal Quote [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
              }
              // broken parser?
              throw Error('CSVDataError: Illegal Data [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
            default:
              // shenanigans
              throw Error('CSVDataError: Unknown State [Row:' + options.state.rowNum + '][Col:' + options.state.colNum + ']');
          }
          // console.log('val:' + m0 + ' state:' + state);
        });

        // submit the last value
        endOfValue();

        return entry;
      }
    },

    helpers: {

      /**
       * $.csv.helpers.collectPropertyNames(objectsArray)
       * Collects all unique property names from all passed objects.
       *
       * @param {Array} objects Objects to collect properties from.
       *
       * Returns an array of property names (array will be empty,
       * if objects have no own properties).
       */
      collectPropertyNames: function (objects) {
        var o = [];
        var propName = [];
        var props = [];
        for (o in objects) {
          for (propName in objects[o]) {
            if ((objects[o].hasOwnProperty(propName)) &&
                (props.indexOf(propName) < 0) &&
                (typeof objects[o][propName] !== 'function')) {
              props.push(propName);
            }
          }
        }
        return props;
      }
    },

    /**
     * $.csv.toArray(csv)
     * Converts a CSV entry string to a javascript array.
     *
     * @param {Array} csv The string containing the CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     *
     * This method deals with simple CSV strings only. It's useful if you only
     * need to parse a single entry. If you need to parse more than one line,
     * use $.csv2Array instead.
     */
    toArray: function (csv, options, callback) {
      // if callback was passed to options swap callback with options
      if (options !== undefined && typeof (options) === 'function') {
        if (callback !== undefined) {
          return console.error('You cannot 3 arguments with the 2nd argument being a function');
        }
        callback = options;
        options = {};
      }

      options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof (callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      var state = (options.state !== undefined ? options.state : {});

      // setup
      options = {
        delimiter: config.delimiter,
        separator: config.separator,
        onParseEntry: options.onParseEntry,
        onParseValue: options.onParseValue,
        state: state
      };

      var entry = $.csv.parsers.parseEntry(csv, options);

      // push the value to a callback if one is defined
      if (!config.callback) {
        return entry;
      } else {
        config.callback('', entry);
      }
    },

    /**
     * $.csv.toArrays(csv)
     * Converts a CSV string to a javascript array.
     *
     * @param {String} csv The string containing the raw CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     *
     * This method deals with multi-line CSV. The breakdown is simple. The first
     * dimension of the array represents the line (or entry/row) while the second
     * dimension contains the values (or values/columns).
     */
    toArrays: function (csv, options, callback) {
      if (typeof(csv) === "string") {
        console.log("CALL toArrays() with 'csv' is of type string:\n"+JSON.stringify(csv));
      } else {
        console.error("ERROR: csv is not of type string");
        csv = "\"csv\",\"was\",\"not\"\n\"of\",\"the\"\"type\"\n\"string\",\" - \",\"warning\"";
      };

      // if callback was passed to options swap callback with options
      if (options !== undefined && typeof (options) === 'function') {
        if (callback !== undefined) {
          return console.error('You cannot 3 arguments with the 2nd argument being a function');
        }
        callback = options;
        options = {};
      }

      options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof (callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;

      // setup
      var data = [];
      options = {
        delimiter: config.delimiter,
        separator: config.separator,
        onPreParse: options.onPreParse,
        onParseEntry: options.onParseEntry,
        onParseValue: options.onParseValue,
        onPostParse: options.onPostParse,
        start: options.start,
        end: options.end,
        state: {
          rowNum: 1,
          colNum: 1
        }
      };

      // onPreParse hook
      if (options.onPreParse !== undefined) {
        csv = options.onPreParse(csv, options.state);
      }

      // parse the data
      data = $.csv.parsers.parse(csv, options);

      // onPostParse hook
      if (options.onPostParse !== undefined) {
        data = options.onPostParse(data, options.state);
      }

      // push the value to a callback if one is defined
      if (!config.callback) {
        return data;
      } else {
        config.callback('', data);
      }
    },

    /**
     * $.csv.toObjects(csv)
     * Converts a CSV string to a javascript object.
     * @param {String} csv The string containing the raw CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     * @param {Boolean} [headers] Indicates whether the data contains a header line. Defaults to true.
     *
     * This method deals with multi-line CSV strings. Where the headers line is
     * used as the key for each value per entry.
     */
    toObjects: function (csv, options, callback) {
      // if callback was passed to options swap callback with options
      if (options !== undefined && typeof (options) === 'function') {
        if (callback !== undefined) {
          return console.error('You cannot 3 arguments with the 2nd argument being a function');
        }
        callback = options;
        options = {};
      }

      options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof (callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      config.headers = 'headers' in options ? options.headers : $.csv.defaults.headers;
      options.start = 'start' in options ? options.start : 1;

      // account for headers
      if (config.headers) {
        options.start++;
      }
      if (options.end && config.headers) {
        options.end++;
      }

      // setup
      var lines = [];
      var data = [];

      options = {
        delimiter: config.delimiter,
        separator: config.separator,
        onPreParse: options.onPreParse,
        onParseEntry: options.onParseEntry,
        onParseValue: options.onParseValue,
        onPostParse: options.onPostParse,
        start: options.start,
        end: options.end,
        state: {
          rowNum: 1,
          colNum: 1
        },
        match: false,
        transform: options.transform
      };

      // fetch the headers
      var headerOptions = {
        delimiter: config.delimiter,
        separator: config.separator,
        start: 1,
        end: 1,
        state: {
          rowNum: 1,
          colNum: 1
        },
        headers: true
      };

      // onPreParse hook
      if (options.onPreParse !== undefined) {
        csv = options.onPreParse(csv, options.state);
      }

      // parse the csv
      var headerLine = $.csv.parsers.splitLines(csv, headerOptions);
      var headers = $.csv.toArray(headerLine[0], headerOptions);

      // fetch the data
      lines = $.csv.parsers.splitLines(csv, options);

      // reset the state for re-use
      options.state.colNum = 1;
      if (headers) {
        options.state.rowNum = 2;
      } else {
        options.state.rowNum = 1;
      }

      // convert data to objects
      for (var i = 0, len = lines.length; i < len; i++) {
        var entry = $.csv.toArray(lines[i], options);
        var object = {};
        for (var j = 0; j < headers.length; j++) {
          object[headers[j]] = entry[j];
        }
        if (options.transform !== undefined) {
          data.push(options.transform.call(undefined, object));
        } else {
          data.push(object);
        }

        // update row state
        options.state.rowNum++;
      }

      // onPostParse hook
      if (options.onPostParse !== undefined) {
        data = options.onPostParse(data, options.state);
      }

      // push the value to a callback if one is defined
      if (!config.callback) {
        return data;
      } else {
        config.callback('', data);
      }
    },

    /**
    * $.csv.fromArrays(arrays)
    * Converts a javascript array to a CSV String.
    *
    * @param {Array} arrays An array containing an array of CSV entries.
    * @param {Object} [options] An object containing user-defined options.
    * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
    * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
    *
    * This method generates a CSV file from an array of arrays (representing entries).
    */
    fromArrays: function (arrays, options, callback) {
      // if callback was passed to options swap callback with options
      if (options !== undefined && typeof (options) === 'function') {
        if (callback !== undefined) {
          return console.error('You cannot 3 arguments with the 2nd argument being a function');
        }
        callback = options;
        options = {};
      }

      options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof (callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;

      var output = '';
      var line;
      var lineValues;
      var i;
      var j;

      for (i = 0; i < arrays.length; i++) {
        line = arrays[i];
        lineValues = [];
        for (j = 0; j < line.length; j++) {
          var strValue = (line[j] === undefined || line[j] === null) ? '' : line[j].toString();
          if (strValue.indexOf(config.delimiter) > -1) {
            strValue = strValue.replace(new RegExp(config.delimiter, 'g'), config.delimiter + config.delimiter);
          }

          var escMatcher = '\n|\r|S|D';
          escMatcher = escMatcher.replace('S', config.separator);
          escMatcher = escMatcher.replace('D', config.delimiter);

          if (strValue.search(escMatcher) > -1) {
            strValue = config.delimiter + strValue + config.delimiter;
          }
          lineValues.push(strValue);
        }
        output += lineValues.join(config.separator) + '\n';
      }

      // push the value to a callback if one is defined
      if (!config.callback) {
        return output;
      } else {
        config.callback('', output);
      }
    },

    /**
     * $.csv.fromObjects(objects)
     * Converts a javascript dictionary to a CSV string.
     *
     * @param {Object} objects An array of objects containing the data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     * @param {Character} [sortOrder] Sort order of columns (named after
     *   object properties). Use 'alpha' for alphabetic. Default is 'declare',
     *   which means, that properties will _probably_ appear in order they were
     *   declared for the object. But without any guarantee.
     * @param {Character or Array} [manualOrder] Manually order columns. May be
     * a strin in a same csv format as an output or an array of header names
     * (array items won't be parsed). All the properties, not present in
     * `manualOrder` will be appended to the end in accordance with `sortOrder`
     * option. So the `manualOrder` always takes preference, if present.
     *
     * This method generates a CSV file from an array of objects (name:value pairs).
     * It starts by detecting the headers and adding them as the first line of
     * the CSV file, followed by a structured dump of the data.
     */
    fromObjects: function (objects, options, callback) {
      // if callback was passed to options swap callback with options
      if (options !== undefined && typeof (options) === 'function') {
        if (callback !== undefined) {
          return console.error('You cannot 3 arguments with the 2nd argument being a function');
        }
        callback = options;
        options = {};
      }

      options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof (callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      config.headers = 'headers' in options ? options.headers : $.csv.defaults.headers;
      config.sortOrder = 'sortOrder' in options ? options.sortOrder : 'declare';
      config.manualOrder = 'manualOrder' in options ? options.manualOrder : [];
      config.transform = options.transform;

      if (typeof config.manualOrder === 'string') {
        config.manualOrder = $.csv.toArray(config.manualOrder, config);
      }

      if (config.transform !== undefined) {
        var origObjects = objects;
        objects = [];

        var i;
        for (i = 0; i < origObjects.length; i++) {
          objects.push(config.transform.call(undefined, origObjects[i]));
        }
      }

      var props = $.csv.helpers.collectPropertyNames(objects);

      if (config.sortOrder === 'alpha') {
        props.sort();
      } // else {} - nothing to do for 'declare' order

      if (config.manualOrder.length > 0) {
        var propsManual = [].concat(config.manualOrder);
        var p;
        for (p = 0; p < props.length; p++) {
          if (propsManual.indexOf(props[p]) < 0) {
            propsManual.push(props[p]);
          }
        }
        props = propsManual;
      }

      var o;
      var line;
      var output = [];
      var propName;
      if (config.headers) {
        output.push(props);
      }

      for (o = 0; o < objects.length; o++) {
        line = [];
        for (p = 0; p < props.length; p++) {
          propName = props[p];
          if (propName in objects[o] && typeof objects[o][propName] !== 'function') {
            line.push(objects[o][propName]);
          } else {
            line.push('');
          }
        }
        output.push(line);
      }

      // push the value to a callback if one is defined
      return $.csv.fromArrays(output, options, config.callback);
    }
  };

  // Maintenance code to maintain backward-compatibility
  // Will be removed in release 1.0
  $.csvEntry2Array = $.csv.toArray;
  $.csv2Array = $.csv.toArrays;
  $.csv2Dictionary = $.csv.toObjects;

  // CommonJS module is defined
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = $.csv;
  }
}).call(this);

/* ---------------------------------------
 Exported Module Variable: JSON3D4Aframe
 Package:  json3d4aframe
 Version:  2.0.1  Date: 2021/01/02 18:12:29
 Homepage: https://github.com/niebert/JSON3D4Aframe#readme
 Author:   Engelbert Niehaus
 License:  MIT
 Date:     2021/01/02 18:12:29
 Require Module with:
    const JSON3D4Aframe = require('json3d4aframe');
 JSHint: installation with 'npm install jshint -g'
 ------------------------------------------ */

/*jshint  laxcomma: true, asi: true, maxerr: 150 */
/*global alert, confirm, console, prompt */


// var csv is the CSV file with headers
// csv2json.js builds on js/jquery_csv.js
// which is a JQuery Plugin that should be loaded after jquery.js
function CSV2JSON () {
  this.csv_defaults = {
      separator: ',',
      delimiter: '"',
      headers: true
  };
  this.check_newline = function (csv,options) {
    console.log("csv:\n"+csv);
    //var csv_ret = csv.replace(/([\n \r]+)/g,"\n");
    var csv_ret = csv.replace(/([\n\r|\r\n|\n|\r]+)/g,"\n");
    csv_ret = csv_ret.replace(/\n[ ]+/g,"\n");
    console.log("csv_ret:\n"+csv_ret);
    return csv_ret;
  };
  this.rows = function (csv,options){
    // newline symbol
    var vNewLine = pNewLine || "\n";
    // seperator e.g.
    // Comma pSep=",",
    // Tab pSep="\t",
    // Pipe pSep="|"
    var vSep = pSep || ",";
    var lines=csv.split(vNewLine);

    var result = [];

    var headers=lines[0].split(vSep);

    for(var i=1;i<lines.length;i++){

  	  var obj = {};
  	  var currentline=lines[i].split(vSep);
      // remove all
  	  for(var j=0;j<headers.length;j++){
  		  obj[headers[j]] = currentline[j];
  	  }

  	  result.push(obj);

    }

    return result; //JavaScript object
    //return JSON.stringify(result); //JSON
  },
  this.cols = function (csv,pSep,pNewline){
    // newline symbol
    var vNewLine = pNewLine || "\n";
    // seperator e.g.
    // Comma pSep=",",
    // Tab pSep="\t",
    // Pipe pSep="|"
    var vSep = pSep || ",";
    var lines=csv.split(vNewLine);

    var result = {};

    var headers=lines[0].split(vSep);
    for (var h = 0; h < headers.length; h++) {
      // create an array for each column of length lines -1
      // -1 because header line is used for header names for the columns
      result[headers[h]]= new Array(lines.length - 1);
    }
    for(var i=1;i<lines.length;i++){
      // split the line
      var currentline=lines[i].split(vSep);
      // remove all
      for(var j=0;j<headers.length;j++){
        result[headers[j]][i] = currentline[j];
      }

      result.push(obj);

    }

    return result; //JavaScript object
    //return JSON.stringify(result); //JSON
  };

  this.array2d = function (pCSV, options, callback) {
    console.log("CALL: CSV2JSON.array2d()");
    var csv_ret = [];
    var csv_clean = this.check_newline(pCSV);
    console.log("csv_clean="+JSON.stringify(csv_clean));
    if ($) {
      console.log("JQuery '$' exists!");
      if ($.csv) {
        console.log("JQuery '$.csv' exists!");
        if ($.csv.toArrays) {
          console.log("JQuery '$.csv.toArrays' exists!");
          csv_ret = $.csv.toArrays(csv_clean, options, callback);
          console.log("toArray()-Call finished");
        } else {
          console.error("JQuery '$.csv.toArrays' does not exist!");
        }
      } else {
        console.error("JQuery '$.csv' does not exist!");
      }
    } else {
      console.error("JQuery '$' does not exist!");
    }
    //csv_ret = csv_clean;
    return csv_ret;
  };

  this.german_decimals_convert = function (pString) {
    var vValue = null;
    var vString = "";
    if (pString && (typeof(pString) === "string")) {
      vString = pString.replace(/,/g,".");
      vValue = parseFloat(vString);
      if (isNaN(vValue)) {// vString is  not a number
        console.error("ERROR: pString='" + pString + "' is not a number  -Type: '" + typeof(pString) + "'");
        vValue = null;
      } else {
        // parsing of number sucessful
        //console.log("pString='" + pString +"' was parsed to float "+ vValue);
      }

    } else {
      console.error("ERROR: pString: " + pString + "' is not a String");
    }
    return vValue;
  }

  this.convert = function (csv, options, callback) {
    console.log("CALL: CSV2JSON.convert()");
    var colors = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf","#ff0000","#00ff00","#0000ff","#c0c0c0"];
    if (options) {
      if (options.colors) {
        colors = options.colors;
      } else {
        console.log("CSV2JSON.convert() options.colors undefined - use default colors");
      }
    } else {
      console.log("CSV2JSON.convert() options undefined - use default colors");
    }
    var csv_ret = this.array2d(csv, options, callback);
    var header = csv_ret[0];
    //console.log("Type of header='" + typeof(header) + "' header="+JSON.stringify(csv_ret,null,4));
    var index = 0;
    var colorindex = 0;
    var data = [];
    var color4curve = "#00000";
    for (var i = 0; i < header.length; i++) {
      index++;
      console.log("Populated Data of Column y"+index+ " with header '" + header[i] + "' of header=[" +  header.join(",")+ "]");
      var rec = {
          "name": "y"+index,
          "collist": "",
          "col": [],
          "color": colors[i],
          "title": header[i]
      };
      // i is column index of the array
      // i=0 contains the headers
      // k defines the row of the matrix of data.
      for (var k = 1; k < csv_ret.length; k++) {
        csv_ret[k][i] = this.german_decimals_convert(csv_ret[k][i]);
        rec.col.push(((csv_ret[k][i]) || " NA "));
      }
      rec.collist = rec.col.join(",");
      data.push(rec);
    }
    return data;
  };

}

var test1csv= `"var1","var2","time"\r
"8293","12.3","45,45","true","5:34"\r\n\n
"18293","112.3","145,45","false","15:45"
"1.2","12.3"
`;

if ($.csv) {
  console.log("$.csv defined");
} else {
  console.log("$.csv undefined");
}

var csv2json = new CSV2JSON();
var test1clean = csv2json.check_newline(test1csv);
console.log("test1clean="+JSON.stringify(test1clean));
console.log("CALL: toArray() in Library");
var arr = $.csv.toArrays(test1clean);
console.log("After toArrays() CALL");
console.log("CSV JQuery: " + JSON.stringify($.csv.toArrays(test1clean),null,4))


/* Output:
CSV JQuery: [
    [
        "var1",
        "var2",
        "time"
    ],
    [
        "8293",
        "12.3",
        "45,45",
        "true",
        "5:34"
    ],
    [
        "18293",
        "112.3",
        "145,45",
        "false",
        "15:45"
    ]
]
*/
console.log("CSV Convert: " + JSON.stringify(csv2json.convert(test1csv),null,4))

/*
CSV Convert: [
    {
        "name": "y1",
        "collist": "8293,18293,1.2",
        "col": [
            "8293",
            "18293",
            "1.2"
        ],
        "color": "#1f77b4",
        "title": "var1"
    },
    {
        "name": "y2",
        "collist": "12.3,112.3,12.3",
        "col": [
            "12.3",
            "112.3",
            "12.3"
        ],
        "color": "#ff7f0e",
        "title": "var2"
    },
    {
        "name": "y3",
        "collist": "45,45,145,45, NA ",
        "col": [
            "45,45",
            "145,45",
            " NA "
        ],
        "color": "#2ca02c",
        "title": "time"
    }
]
*/



// -------NPM Export Variable: JSON3D4Aframe---------------
module.exports = JSON3D4Aframe;

// Define Export Hash
// Geneate the expport modules
JSON3D4Aframe = {
  "expandGeoLocation": expandGeoLocation,
  "get3DRepeatedArray": get3DRepeatedArray,
  "calcRecordJSON": calcRecordJSON,
  "getRepeatCount": getRepeatCount,
  "getRepeatSteps": getRepeatSteps,
  "floatArr2String": floatArr2String,
  "scalePosition": scalePosition,
  "movePosition": movePosition
};




// -------NPM Export Variable: JSON3D4Aframe---------------
module.exports = JSON3D4Aframe;