/* ---------------------------------------
 Exported Module Variable: JSON3D4Aframe
 Package:  json3d4aframe
 Version:  2.0.3  Date: 2021/01/04 8:55:13
 Homepage: https://github.com/niebert/JSON3D4Aframe#readme
 Author:   Engelbert Niehaus
 License:  MIT
 Date:     2021/01/04 8:55:13
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

