const w4f = require('walker4folder');

function replace_in_file(file,pathFile,dirAppend,options) {

  var ext = w4f.get_extension(pathFile);
  // Select HTML files only with extension "html" e.g. "index.html"
  if (ext == "html") {
    console.log("Found File:  '" + pathFile + "' with extension '" + ext + "'");
    // load file
    var vContent = w4f.load_file(pathFile);
    // replace the library name "lib-v0.7.1.min.js" by "lib-v1.0.4.js" in HTML
    vContent = vContent.replace(/releases\/[0-9]\.[0-9]\.[0-9]\/aframe/g,"releases/1.1.0/aframe");
    // save the modified file will the updated content to e.g. "index.html.out".

    // Test the output and write a new file
    // w4f.save_file(pathFile+".out",vContent);
    // console.log("Check Output: "+ vContent);

    // Overwrite the old file with the replaced file
    // removed extension ".out" after testing
    // if you want to save and overwrite in the source file.
    w4f.save_file(pathFile,vContent);

  }
}

w4f.walker4folder("./docs/mods3d",replace_in_file);
