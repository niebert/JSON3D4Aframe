// File: db/templates.js
// ---------------------
// by Engelbert Niehaus (2017) MIT license
// This File db/templates.js contain templates with comments for 3D objects
// with tabs and newlines. The exported output is easier to maintain
// but contains more bytes.
vDataJSON["marker"] = "hiro";
vDataJSON["aframetpl"] = "\n\t<a-scene>\n{{{arobjects}}}\n\t</a-scene>";
vDataJSON["artpl"] = "\n\t<a-scene>\n\t\t<a-marker id=\"mymarker\" preset=\"{{marker}}\">\n{{{arobjects}}}\n\t\t<a-entity camera></a-entity>\n\t\t</a-marker>\n\t</a-scene>";
vDataJSON["objecttpl"] = "\n\t\t<!-- 3D-Object: {{tagname}} - {{comment}} -->\n\t\t<{{tagname}} position=\"{{position}}\" material=\"color: {{color}};opacity:{{opacity}}\" width=\"{{scale}}\" height=\"{{scale}}\" depth=\"{{scale}}\"></{{tagname}}>";
