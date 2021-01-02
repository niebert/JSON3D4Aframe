const fs = require("fs");
const pkg = require("./package.json");
const b4c = require("build4code").codegen;

console.log("Start build4docs.js for '" + pkg.name + "' version "+pkg.version);

//-----------------------------------------
b4c.create_header(pkg);
b4c.create_tail(pkg);
//-----------------------------------------
var lib_header = b4c.get_header(pkg);
var outmain = lib_header;

var vFileName = "calcrecord.js";
fs.readFile('./docs/js/'+vFileName, 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
      var outfile = lib_header;
      outfile += "\n" + data + "\n";
      b4c.save_file('src/libs/' + vFileName, outfile);
      outmain += "\n// Library: js/" + vFileName + " \n\n" + data + "\n";
      //outmain += "\n" + data + "\n";
      vFileName = "jquery_csv.js";
      fs.readFile('./docs/js/' + vFileName, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
          var outtpl = lib_header;
          outtpl += "\n// Library: js/" + vFileName + "\n\n" + data + "\n";
          b4c.save_file('src/libs/' + vFileName, outtpl);
          //outmain += "\n" + data + "\n";
          outmain += "\n// Library: js/" + vFileName + "\n\n" + data;
          vFileName = "csv2json.js";
          fs.readFile('./docs/js/' + vFileName, 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
              var outtpl = lib_header;
              outtpl += "\n" + data + "\n";
              b4c.save_file('src/libs/' + vFileName, outtpl);
              vFileName = "exportvar.js";
              fs.readFile('./src/' + vFileName, 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                  var outtpl = "// Define Export Hash";
                  outtpl += "\n" + data + "\n";
                  console.log("SAVE: src/main.js");
                  outmain += "\n\n" + outtpl + "\n";
                  outmain += b4c.get_tail(pkg);
                  b4c.save_file('src/main.js', outmain);
                }
              });
              console.log("SAVE: src/main.js");
              outmain += "\n" + lib_header + "\n\n" + data + "\n";
              outmain += b4c.get_tail(pkg);
              b4c.save_file('src/main.js', outmain);
            }
          });
        }
      });

    }
  });
