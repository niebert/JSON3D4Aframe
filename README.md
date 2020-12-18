# JSON3D4Aframe
The abbreviation stands for **JSON** editor  for **3D** objects generate **FOR** (4) **Aframe**.

This repository provides a generator for a 3D scene in [AFrame](https://www.aframe.io) with primitives like cubes, planes, spheres or general boxes. Color, position, and size  can be controlled, loaded and saved as JSON and exported to AFrame and AR.js


## Online Demo

https://niebert.github.io/JSON3D4Aframe

## Main Library for Large Arrays

Main library to handle large arrays is `docs/js/editor4json.js`
https://github.com/niebert/JSON3D4Aframe/tree/master/docs

## Screenshots Examples
![AFrame Example](https://niebert.github.io/JSON3D4Aframe/img/water_molecule_aframe.png)
![AR.js Kanji Marker Example](https://niebert.github.io/JSON3D4Aframe/img/water_molecule_kanji.png)


## Example 3D Output of JSON3D4Aframe

### AFrame 3D - Standard
* [Water Molecule - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/water_molecule_aframe.html)
* [Cristal Lattice - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/cristal_lattice_aframe.html)
* [Snow Man - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/snowman_aframe.html)

### AFrame 3D - with Sky and 360 Degree Image
* [Water Molecule - Sky 360 Degree - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/water_molecule_sky_aframe.html)
* [Cristal Lattice - Sky 360 Degree - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/cristal_lattice_sky_aframe.html)
* [Snow Man - Sky 360 Degree - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/snowman_sky_aframe.html)

### Marker Print Out
For the following examples you need a printout of markers that are place in front of your webcam of your laptop, tablet or smartphone camera. You can print out the [PDF document](https://niebert.github.io/JSON2Schema/pdf/marker_hiro_kanji_printout.pdf). Instead holding the marker in the web camera image you can place the marker on the table and view the selected marker in the camera image of your tablet or smartphone. You can also use a VR headset  with the following examples:

### Hiro Marker
**Pattern Source:** [Hiro Pattern from AR-Toolkit](https://github.com/artoolkit/ARToolKit5/blob/master/doc/patterns/Hiro%20pattern.pdf)
* [Water Molecule - Hiro Marker](https://niebert.github.io/JSON3D4Aframe/mods3d/water_molecule_ar_hiro.html)
* [Cristal Lattice - Hiro Marker](https://niebert.github.io/JSON3D4Aframe/mods3d/cristal_lattice_ar_hiro.html)
* [Snow Man - Hiro Marker](https://niebert.github.io/JSON3D4Aframe/mods3d/snowman_ar_hiro.html)

### Kanji Marker
**Pattern Source:** [Kanji Pattern from AR-Toolkit](https://github.com/artoolkit/ARToolKit5/blob/master/doc/patterns/Kanji%20pattern.pdf)
* [Water Molecule - Kanji Marker](https://niebert.github.io/JSON3D4Aframe/mods3d/water_molecule_ar_kanji.html)
* [Cristal Lattice - Kanji Marker](https://niebert.github.io/JSON3D4Aframe/mods3d/cristal_lattice_ar_kanji.html)
* [Snow Man - Kanji Marker](https://niebert.github.io/JJSON3D4Aframe/mods3d/snowman_ar_kanji.html)


## Molecule Models
Molecule Models can be turn and viewed from all sides. With AR.js you need to place the specified marker in the camera image
* [Molecule Model Water - AFrame 3D Model](https://niebert.github.io/SampleAR/water_aframe.html) create with [JSON3D4Aframe](https://niebert.github.io/JSON3D4Aframe/index.html) this 3D-Model does not need mobile phone camera or marker to viewing the 3D model.
* [Molecule Model Water - Kanji-Marker](https://niebert.github.io/SampleAR/water_hiro.html) place a printed paper version of the  [Kanji-Marker](https://github.com/artoolkit/artoolkit5/blob/master/doc/patterns/Kanji%20pattern.pdf) in front of you mobile phone camera or webcam. Size of print-out 6cm x 6cm of black box.
* Created with [JSON3D4Aframe](https://niebert.github.io/JSON3D4Aframe)

## Lesson Result of 3D Geometry
Think of using 3D models in a seasonal context:
* [Snowman AFrame](https://niebert.github.io/JSON3D4Aframe/mods) no markers required - direct display

## UML Diagram of Editor4JSON Class

![UML Diagram of JS Class Editor4JSON](https://niebert.github.io/JSON3D4Aframe/Editor4JSON_UML.png)

## JSON to Schema Generator

Used the following tool that creates a [JSON schema](http://json-schema.org/) for a provided JSON file. Used the given JSON file to create the JSON Schema with [JSON2schema.html](https://niebert.github.io/json-editor/plugins/json2schema.html).

## Python Web-Server for Testing from shell
Some Aframe 3D-objects are visisible if the aframe 3D scene was loaded from a web server (duer to cross-site scripting security feature). E.g. text elements with fonts will not be displayed. To check the Aframe 3D scene with all feature start a webserver with python from shell. the current directory is used as root directory for the web server.
* Linux/Mac:  `python -m SimpleHTTPServer 8000`
* Windows (install python): `python -m http.server 8000`
* Check Aframe scene with: `http://localhost:8000`

## Acknowledgement
Special thanks to the following individual developers and teams of OpenSource JavaScript projects:
* [JSON-Editor](https://github.com/jdorn/json-editor) by Jeremy Dorn. The JSON Editor takes a JSON Schema and uses it to generate an HTML form. The JSON-Editor is partially used to edit JSON file of the Javascript Project in `JSCC` . The schemes of the JSON subtree are stored in the folder `/tpl` of the JavascriptClassCreator. The full potential of the JSON-Editor was not used in `JSCC` . This can be approved in the future.
The JSON-Editor of Jeremy Dorn has full support for JSON Schema version 3 and 4 and can integrate with several popular CSS frameworks (bootstrap, foundation, and jQueryUI). This would lead to major code reduction of `JSCC` . Refactoring of `JSCC` would make more use of the JSON-Editor features. Check out an interactive demo (demo.html): http://jeremydorn.com/json-editor/
* Developer [Mihai Bazon](http://lisperator.net/) create UglifyJS, a great tool to handle and parse Javascript Code and minify the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2)).
* The wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is used to minify/compress the exported Javascript code of generated JS Classes (For Online Example of the [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) see source code on https://github.com/Skalman/UglifyJS-online for the Online-Version of the Wrapper.
* Developers of ACE Code Editor https://ace.c9.io (Javascript Editing uses the Editor in iFrames)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js) Developer Eli Grey provided the `FileSaver.js` that is used to store created `JSCC` files to the local filesystem. `JSCC` uses the same mechanism of browsers, that allows a `Save as...` in the context menu of a web pages or image. So not uncontrolled write access to your file system is implemented, because users have to select the locations in which the user whats to store the file (e.g. JSON, Javascript or HTML).
* [JointJS](https://github.com/clientIO/joint) JointJS is a JavaScript diagramming library. It can be used to create either static diagrams. JointJS is used in this project to create UML-diagrams, that are interactive diagramming in conjunction and application builder in Javascript.
* [Inheritage for JavaScript with protoypes](http://phrogz.net/js/classes/OOPinJS2.html) by Gavin Kistner
* [3 ways to define a JavaScript class](https://www.phpied.com/3-ways-to-define-a-javascript-class/) by Stoyan Stefanov
* [JQuery](https://jqueryui.com) is used for the theme and standard operations in the Document Object Model (DOM) of HTML-pages. The [JQuery-Themeroller](https://jqueryui.com/themeroller/) was used to create a JQuery theme for JSCC.
* [FontAwesome](http://fontawesome.io/icons/) by Dave Gandy used for the icons in HTML buttons
