'use strict';
var Base64 = require('js-base64').Base64;
const fs = require('fs');
//const shell = require('shelljs')
//shell.exec('sh scan-icons.sh')
/*v
DataJSON.files4json = {
    "date": "Tue Jul 28 2020",
    "generator": "https://niehausbert.gitlab.io/loadfile4dom/demo5_file2base64_json.html",
    "files": [
        {
            "name": "jsoneditor_app.zip",
            "file": "SOSDjhjah9223...",
            "mime_type": "application/zip"
          }
        ]
      }
*/
var vDate = new Date();
var files4json = {
  "date": vDate.toUTCString(),
  "generator": "https://niehausbert.gitlab.io/loadfile4dom/demo5_file2base64_json.html",
  "files": [
  ]
}
//require('../../docs/files4files4json.js');
var vFilename = "";


function get_extension(pFilename) {
  var ext = "";
  if (pFilename) {
    ext = pFilename.substr(pFilename.lastIndexOf('.') + 1);
    ext = ext.toLowerCase();
  } else {
    console.log("CALL: get_extension(pFilename) - pFilename undefined!");
  }
  return ext;
}


function replaceString(pString,pSearch,pReplace)
// replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	var vReturnString = '';
	//alert("cstring.js - replaceString() "+pString);
	pString = pString || "undefined string parameter in replaceString() call ";
	if (!pString) {
		console.log("replaceString()-Call - pString not defined!");
	} else if (pString != '') {
		var vHelpString = '';
    var vN = pString.indexOf(pSearch);
		while ( vN+1 > 0 ) {
			if (vN > 0) {
				vReturnString += pString.substring(0, vN);
			};
			vReturnString += pReplace;
            if (vN + pSearch.length < pString.length) {
				pString = pString.substring(vN+pSearch.length, pString.length);
			} else {
				pString = ''
			}
			vN = pString.indexOf(pSearch);
		};
	};
	return (vReturnString + pString);
}


function getNameExt4URL(pURL) {
  //this gets the full url
  var url = pURL || ""; //e.g. document.location.href;
  if (typeof(url) == "string") {
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
  };
  //return
  console.log("getNameExt4URL('"+pURL+"') return '"+url+"'");
  return url;
};


function getNameExt(pFilePath) {
  //console.log("getNameExt('"+pFilePath+"')");
  return getNameExt4URL(pFilePath);
};



function load_data2json(pFilename) {
    var data = fs.readFileSync(pFilename, {encoding: 'base64'});
    var count = 0;
    console.log("Read File SYNC: '" + pFilename + "'");
    //files4json.icons[i].src = "data:image/svg+xml;utf8," + data; // SVG is a XML string so store as string
    //files4json.icons[i].src = "data:image/svg+xml;base64," + data.toString('base64'); // SVG is a XML string so store as string
    var vFileHash = {
      "name": "jsoneditor_app.zip",
      "file": "",
      "mime_type": "application/zip"
    };
    vFileHash.name = getNameExt(pFilename);
    //vFileHash.file = Base64.encode(data);
    vFileHash.file = data;
    files4json.files.push(vFileHash);
}



//==== START SCANNING IMAGES for ICON4MENU ============

function save_files4json() {
  var json_string = "// Javascript Library 'files4json.js' stores Base64 enconded Files for WebApps";
  json_string += "\n// If you want to en your own JSON Editor into this Javasript library you can create the library with";
  json_string += "\n//    URL: https://niehausbert.gitlab.io/JSON2Schema/create_files4json.html";
  json_string += "\nvDataJSON.files4json = ";
  json_string += JSON.stringify(files4json,null,4);
  json_string += ";\n\n"
  fs.writeFile('./docs/db/files4json.js', json_string, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('JSON file files4json.js saved with Base64 encoded ZIP file "jsoneditor_app"!');
  });
}

load_data2json("./zip/jsoneditor_app.zip");

setTimeout(save_files4json, 2000);
