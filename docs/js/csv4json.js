// var csv is the CSV file with headers
// csv4json.js builds on js/jquery_csv.js
// which is a JQuery Plugin that should be loaded after jquery.js
function CSV4JSON () {
  this.csv_defaults = {
      separator: ',',
      delimiter: '"',
      newline: "\n",
      headers: true
  };
  this.check_newline = function (csv,pNewLine) {
    var vNewLine = pNewLine || "\n";
    console.log("csv:\n"+csv);
    //var csv_ret = csv.replace(/([\n \r]+)/g,"\n");
    var csv_ret = csv.replace(/([\n\r|\r\n|\n|\r]+)/g,vNewLine);
    csv_ret = csv_ret.replace(/\n[ ]+/g,vNewLine);
    console.log("csv_ret:\n"+csv_ret);
    return csv_ret;
  };
  this.rows = function (csv,pSep,pNewline){
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
    console.log("CALL: CSV4JSON.array2d()");
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
    var vValue = " ";
    var vString = "";
    if (pString && (typeof(pString) === "string")) {
      vString = pString.replace(/,/g,".");
      vValue = parseFloat(vString);
      if (isNaN(vValue)) {// vString is  not a number
        console.log("WARNING: pString='" + pString + "' is not a number  -Type: '" + typeof(pString) + "'");
        vValue =pString;
      } else {
        vValue = " ";
        // parsing of number sucessful
        //console.log("pString='" + pString +"' was parsed to float "+ vValue);
      }

    } else {
      //console.error("ERROR: pString: " + pString + "' is not a String");
    }
    return vValue;
  }

  this.get_json_headers = function (pArray,options) {
    console.log("CALL: CSV4JSON.get_json_headers()");
    var headers = [];
    if (Array.isArray(pArray) == true) {
      for (var i = 0; i < pArray.length; i++) {
         // array may contain more different records in each array element
         // loop over all array elements to find all used keys for the header.
        var obj = pArray[i];
        if (typeof(obj) == "object") {
          // record in array are of type "object"
          for (var key in obj) {
              // push "key" to headers if not already exists in headers
              if (key && headers.indexOf(key) < 0) {
                headers.push(key);
              }
          } // check for additional attributes in all array lines
        } // check for keys if record in of type "object"
      } // loop over all array record to find all used keys
    }
    return headers;
  }

  this.toCSV = function (pArray, options, callback) {
    console.log("CALL: CSV4JSON.toJSON()");
    var outCSV = "ERROR: exporting array of objects to CSV file";
    if (Array.isArray(pArray) == true) {
      options = this.expand_options(options);

      // export headers - collect header keys of key/value pairs in pArray first
      var headers = this.get_json_headers(pArray,options);
      // add CSV header to the output string outCSV
      outCSV = headers.join(options.delimiter+options.separator+options.delimiter);
      outCSV = options.delimiter + outCSV + options.delimiter;
      for (var i = 0; i < pArray.length; i++) {
        console.log("Populated Data of Record "+i+ " with headers=[" +  headers.join(",")+ "]");
        outCSV += "\n" ;
        var vSep = "";
        var vRec = pArray[i];
        for (var k = 0; k < headers.length; k++) {
          outCSV +=  vSep + options.delimiter + vRec[headers[k]] + options.delimiter;
          vSep = options.separator;
        }
      }
    }

    return outCSV;
  };

  this.expand_options = function (options) {
    console.log("CALL: CSV4JSON.expand_options()");
    options = options || {};
    options.newline = options.newline || this.csv_defaults.newline || "\n";
    options.separator = options.separator || this.csv_defaults.separator || ",";
    options.delimiter = options.delimiter || this.csv_defaults.delimiter || '"';
    return options;
  };

  this.get_csv_headers = function (csv,options) {
      console.log("CALL: CSV4JSON.get_csv_headers()");
      var csv_ret = this.array2d(csv, options, callback);
      var headers = csv_ret[0];
      return headers;
  }

  this.toJSON = function (csv, options, callback) {
    console.log("CALL: CSV4JSON.toJSON()");
    var csv_ret = this.array2d(csv, options, callback);
    //alert(JSON.stringify(csv_ret[0],null,4));
    var headers = csv_ret[0];
    // expand options if necessary
    options = this.expand_options(options);
    var out_array = [];
    for (var i = 1; i < csv_ret.length; i++) {
      // create a record (object) for all csv lines in csv_ret 2D array
      if (csv_ret[i]) {
        var rec = {};
        // loop over headers and use as keys for object
        //alert("csv_ret["+i+"]"+JSON.stringify(csv_ret[i],null,4));
        var line = csv_ret[i];
        for (var k = 0; k < headers.length; k++) {
          rec[headers[k]] = line[k] || " ";
        }
        out_array.push(rec);
      }
    }
    return out_array;
  }

  this.convert = function (csv, options, callback) {
    // used in CSV2Chart csv2wikichart_app - see https://niebert.github.io/csv2wikichart_app/
    console.log("CALL: CSV4JSON.convert()");
    var colors = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf","#ff0000","#00ff00","#0000ff","#c0c0c0"];
    if (options) {
      if (options.colors) {
        colors = options.colors;
      } else {
        console.log("CSV4JSON.convert() options.colors undefined - use default colors");
      }
    } else {
      console.log("CSV4JSON.convert() options undefined - use default colors");
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

var csv4json = new CSV4JSON();
var test1clean = csv4json.check_newline(test1csv);
console.log("test1clean="+JSON.stringify(test1clean));
//alert("test1clean="+JSON.stringify(test1clean));
console.log("CALL: toArray() in Library");
var arr = csv4json.toJSON(test1clean);
console.log("After toJSON() CALL");
console.log("CSV JQuery: " + JSON.stringify(arr,null,4))


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
console.log("CSV Convert: " + JSON.stringify(csv4json.convert(test1csv),null,4))

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
