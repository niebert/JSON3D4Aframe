# JSON3D4Aframe
This repository provides a generator for a 3D scene in AFrame with primitives like cubes, planes, spheres or general boxes. Color, position, and size  can be controlled, loaded and saved as JSON and exported to AFrame and AR.js


## Online Demo

https://niebert.github.io/JSON3D4Aframe

## Main Library for Large Arrays

Main library to handle large arrays is ___docs/js/editor4json.js___
https://github.com/niebert/JSON3D4Aframe/tree/master/docs

## Screenshot Examples
![AFrame Example](https://raw.githubusercontent.com/niebert/SamplesAR/master/images/water_molecule_aframe.png)
![AR.js Kanji Marker Example](https://raw.githubusercontent.com/niebert/SamplesAR/master/images/water_molecule_kanji.png)


## Molecule Models
Molecule Models can be turn and viewed from all sides. With AR.js you need to place the specified marker in the camera image
* [Molecule Model Water - AFrame 3D Model](https://niebert.github.io/SampleAR/water_aframe.html) create with [JSON3D4Aframe](https://niebert.github.io/JSON3D4Aframe/index.html) this 3D-Model does not need mobile phone camera or marker to viewing the 3D model.
* [Molecule Model Water - Kanji-Marker](https://niebert.github.io/SampleAR/water_hiro.html) place a printed paper version of the  [Kanji-Marker](https://github.com/artoolkit/artoolkit5/blob/master/doc/patterns/Kanji%20pattern.pdf) in front of you mobile phone camera or webcam. Size of print-out 6cm x 6cm of black box.
* Created with [JSON3D4Aframe](https://niebert.github.io/JSON3D4Aframe)

## UML Diagram of Editor4JSON Class

![UML Diagram of JS Class Editor4JSON](https://niebert.github.io/JSON3D4Aframe/Editor4JSON_UML.png)

## JSON to Schema Generator

Used the following tool that creates a [JSON schema](http://json-schema.org/) for a provided JSON file. Used the given JSON file to create the JSON Schema with [JSON2schema.html](https://niebert.github.io/json-editor/plugins/json2schema.html).

## Acknowledgement
Special thanks to the following individual developers and teams of OpenSource JavaScript projects:
* [JSON-Editor](https://github.com/jdorn/json-editor) by Jeremy Dorn. The JSON Editor takes a JSON Schema and uses it to generate an HTML form. The JSON-Editor is partially used to edit JSON file of the Javascript Project in ___JSCC___ . The schemes of the JSON subtree are stored in the folder ___/tpl___ of the JavascriptClassCreator. The full potential of the JSON-Editor was not used in ___JSCC___ . This can be approved in the future.
The JSON-Editor of Jeremy Dorn has full support for JSON Schema version 3 and 4 and can integrate with several popular CSS frameworks (bootstrap, foundation, and jQueryUI). This would lead to major code reduction of ___JSCC___ . Refactoring of ___JSCC___ would make more use of the JSON-Editor features. Check out an interactive demo (demo.html): http://jeremydorn.com/json-editor/
* Developer [Mihai Bazon](http://lisperator.net/) create UglifyJS, a great tool to handle and parse Javascript Code and minify the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2)).
* The wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is used to minify/compress the exported Javascript code of generated JS Classes (For Online Example of the [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) see source code on https://github.com/Skalman/UglifyJS-online for the Online-Version of the Wrapper.
* Developers of ACE Code Editor https://ace.c9.io (Javascript Editing uses the Editor in iFrames)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js) Developer Eli Grey provided the ___FileSaver.js___ that is used to store created ___JSCC___ files to the local filesystem. ___JSCC___ uses the same mechanism of browsers, that allows a ___Save as...___ in the context menu of a web pages or image. So not uncontrolled write access to your file system is implemented, because users have to select the locations in which the user whats to store the file (e.g. JSON, Javascript or HTML).
* [JointJS](https://github.com/clientIO/joint) JointJS is a JavaScript diagramming library. It can be used to create either static diagrams. JointJS is used in this project to create UML-diagrams, that are interactive diagramming in conjunction and application builder in Javascript.
* [Inheritage for JavaScript with protoypes](http://phrogz.net/js/classes/OOPinJS2.html) by Gavin Kistner
* [3 ways to define a JavaScript class](https://www.phpied.com/3-ways-to-define-a-javascript-class/) by Stoyan Stefanov
* [JQuery](https://jqueryui.com) is used for the theme and standard operations in the Document Object Model (DOM) of HTML-pages. The [JQuery-Themeroller](https://jqueryui.com/themeroller/) was used to create a JQuery theme for JSCC.
* [FontAwesome](http://fontawesome.io/icons/) by Dave Gandy used for the icons in HTML buttons
