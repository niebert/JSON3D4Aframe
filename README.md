## JSON3D4Aframe <span id4marker="version" style="display: inline-block">3.0.15</span>

The abbreviation stands for **JSON** editor  for **3D** objects generate **FOR** (4) **Aframe**. Furthermore [JSON3D4Aframe](https://niebert.github.io/JSON3D4Aframe) is able to export the 3D model in JSON format to [`ÀR.js`](https://ar-js-org.github.io/AR.js-Docs/), which is a library created by Jermome Etienne and the GeoAR capabilities are added by Nicolo Carpignoli et.al.. Without their great work this small tool for the [Wikiversity learning resource about 3D Modelling](https://en.wikiversity.org/wiki/3D_Modelling) would not exist.

This repository provides a generator for a 3D scene in [AFrame](https://www.aframe.io) with primitives like cubes, planes, spheres or general boxes. Color, position, and size  can be controlled, loaded and saved as JSON and exported to [`AFrame`](https://aframe.io) and [`AR.js`](https://ar-js-org.github.io/AR.js-Docs/)


## Online Demo

https://niebert.github.io/JSON3D4Aframe


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Main Library for Large Arrays](#main-library-for-large-arrays)
- [Screenshots Examples](#screenshots-examples)
- [Example 3D Output of JSON3D4Aframe](#example-3d-output-of-json3d4aframe)
  - [AFrame 3D - Standard](#aframe-3d---standard)
  - [AFrame 3D - with Sky and 360 Degree Image](#aframe-3d---with-sky-and-360-degree-image)
  - [Marker Print Out](#marker-print-out)
  - [Hiro Marker](#hiro-marker)
  - [Kanji Marker](#kanji-marker)
- [Molecule Models](#molecule-models)
- [Images for the AFrame Sky](#images-for-the-aframe-sky)
- [Lesson Result of 3D Geometry](#lesson-result-of-3d-geometry)
  - [See also](#see-also)
- [UML Diagram of Editor4JSON Class](#uml-diagram-of-editor4json-class)
- [JSON to Schema Generator](#json-to-schema-generator)
- [Python Web-Server for Testing from shell](#python-web-server-for-testing-from-shell)
- [Acknowledgement](#acknowledgement)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Demo Files
Demo 3D files are provided to you in the folder `json3d/`. The files can be loaded with [JSON3D4Aframe](https://niebert.github.io/JSON3D4Aframe) and you can use them for a quick start, modifiy the 3D models and export them to
* [Aframe](https://aframe.io),
* [Marker based AR](https://ar-js-org.github.io/AR.js-Docs/) or
* [Location based AR](https://ar-js-org.github.io/AR.js-Docs/)

## Location based AR
[JSON3D4Aframe](https://niebert.github.io/JSON3D4Aframe) is able to generate a location based AR, i.e. you can place the generated 3D model a specific geolocation (e.g. the school yard or at a [Real World Lab](https://en.wikiversity.org/wiki/Real_World_Lab). The exported GeoAR files (e.g. `snowman_argeo.html`) can be placed on a web server with `https://` and then you display the website with your browser on you mobile device e.g. with the URL `https://www.example.com/snowman_argeo.html`. For testing you can store your 3D models on GitHub [pages](https://pages.github.com/) or [GitLab](https://www.gitlab.com) repository and host your files there for testing purpose.

## Main Library for Large Arrays

Main library to handle large arrays is `docs/js/editor4json.js`
https://github.com/niebert/JSON3D4Aframe/tree/master/docs

## Screenshots Examples
![AFrame Example](https://niebert.github.io/SamplesAR/img/water_molecule_aframe.png)
![AR.js Kanji Marker Example](https://niebert.github.io/SamplesAR/img/water_molecule_kanji.png)


## Example 3D Output of JSON3D4Aframe

### AFrame 3D - Standard
* [Water Molecule - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/water_molecule_aframe.html)
* [Cristal Lattice - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/cristal_lattice_aframe.html)
* [Snow Man - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/snowman_aframe.html)

### AFrame 3D - with Sky and 360 Degree Image
* [Water Molecule - Sky 360 Degree - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/water_molecule_sky_aframe.html)
* [Cristal Lattice - Sky 360 Degree - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/cristal_lattice_sky_aframe.html)
* [Snow Man - Sky 360 Degree - AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/snowman_sky_aframe.html)


### AR Geolocation 3D - Examples
Copy the source code of the files and replace the geolocation for latitude and longitude to your geolocation where you want to place the snowman.
* [Snow Man - AR Geolocation - Durlach Saumarkt](https://niebert.github.io/JSON3D4Aframe/mods3d/snowman_argeo_saumarkt.html)


### Marker Print Out
For the following examples you need a printout of markers that are place in front of your webcam of your laptop, tablet or smartphone camera. You can print out the [PDF document](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf). Instead holding the marker in the web camera image you can place the marker on the table and view the selected marker in the camera image of your tablet or smartphone. You can also use a VR headset  with the following examples:

### Hiro Marker
Print out the [PDF](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf) with markers and use the **Hiro marker** in your webcam to display the 3D model.
**Pattern Source:** [Hiro Pattern from AR-Toolkit](https://github.com/artoolkit/ARToolKit5/blob/master/doc/patterns/Hiro%20pattern.pdf)
* [Water Molecule - Hiro Marker](https://niebert.github.io/JSON3D4Aframe/mods3d/water_molecule_ar_hiro.html) - Marker: [PDF](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf)
* [Cristal Lattice - Hiro Marker](https://niebert.github.io/JSON3D4Aframe/mods3d/cristal_lattice_ar_hiro.html) - Marker: [PDF](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf)
* [Planet System - Hiro Marker](https://niebert.github.io/JSON3D4Aframe/mods3d/planetsystem_ar_hiro.html) - Marker: [PDF](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf) - by Ina Shashkova (2021) - see [Wikiversity](https://de.wikiversity.org/wiki/AR_VR_in_der_Grundschule)
* [Snow Man - Hiro Marker](https://niebert.github.io/JSON3D4Aframe/mods3d/snowman_ar_hiro.html) - Marker: [PDF](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf)

### Kanji Marker
Print out the [PDF](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf) with markers and use the **Kanji marker** in your webcam to display the 3D model.
**Pattern Source:** [Kanji Pattern from AR-Toolkit](https://github.com/artoolkit/ARToolKit5/blob/master/doc/patterns/Kanji%20pattern.pdf)
* [Water Molecule - Kanji Marker](https://niebert.github.io/JSON3D4Aframe/mods3d/water_molecule_ar_kanji.html) - Marker: [PDF](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf)
* [Cristal Lattice - Kanji Marker](https://niebert.github.io/JSON3D4Aframe/mods3d/cristal_lattice_ar_kanji.html) - Marker: [PDF](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf)
* [Snow Man - Kanji Marker](https://niebert.github.io/JJSON3D4Aframe/mods3d/snowman_ar_kanji.html) - Marker: [PDF](https://niebert.github.io/JSON3D4Aframe/pdf/marker_hiro_kanji_printout.pdf)


## Molecule Models
Molecule Models can be turn and viewed from all sides. With AR.js you need to place the specified marker in the camera image
* [Molecule Model Water - AFrame 3D Model](https://niebert.github.io/SampleAR/water_aframe.html) create with [JSON3D4Aframe](https://niebert.github.io/JSON3D4Aframe/index.html) this 3D-Model does not need mobile phone camera or marker to viewing the 3D model.
* [Molecule Model Water - Kanji-Marker](https://niebert.github.io/SampleAR/water_hiro.html) place a printed paper version of the  [Kanji-Marker](https://github.com/artoolkit/artoolkit5/blob/master/doc/patterns/Kanji%20pattern.pdf) in front of you mobile phone camera or webcam. Size of print-out 6cm x 6cm of black box.
* Created with [JSON3D4Aframe](https://niebert.github.io/JSON3D4Aframe)

## Images for the AFrame Sky
The following equirectangular images are used as 360 degree sky background:
* [Cloud/Grass](https://niebert.github.io/HuginSample/img/cloud_grass.jpg) - Part of the [HuginSample GitHub-Repository](https://www.github.com/niebert/HuginSample/)
* [Aldara Park - WikiCommons](https://upload.wikimedia.org/wikipedia/commons/d/d8/Aldara_parks.jpg) - WikiCommon Info: [Aldara Park](https://commons.wikimedia.org/wiki/File:Aldara_parks.jpg)
<!-- Low Resolution Amphiteater Berlin
[](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Amphiteater_im_Mauerpark%2C_Berlin%2C_360x180%2C_1705280617%2C_ako.jpg/1280px-Amphiteater_im_Mauerpark%2C_Berlin%2C_360x180%2C_1705280617%2C_ako.jpg)Amphiteater - Berlin
-->
* [Amphiteater im Mauerpark - Berlin - Wiki Commons](https://upload.wikimedia.org/wikipedia/commons/8/8d/Amphiteater_im_Mauerpark%2C_Berlin%2C_360x180%2C_1705280617%2C_ako.jpg) - WikiCommons Info: [Amphiteater - Berlin](https://commons.wikimedia.org/wiki/File:Amphiteater_im_Mauerpark,_Berlin,_360x180,_1705280617,_ako.jpg)
* [Magpupungko Beach 1 -  WikiCommons](https://upload.wikimedia.org/wikipedia/commons/5/56/Magpupungko_beach_area_spherical_360-degree_08-23-2017.jpg) - WikiCommons Info:
* [Magpupungko Beach 2](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Magpupungko_beach_area_02_spherical_360-degree_08-23-2017.jpg/1024px-Magpupungko_beach_area_02_spherical_360-degree_08-23-2017.jpg) - WikiCommons Info: (https://commons.wikimedia.org/wiki/File:Magpupungko_beach_area_02_spherical_360-degree_08-23-2017.jpg)
* [River Rhine 1 - Cologne](https://niebert.github.io/HuginSample/img/rhein1_rodenkirchen.jpg) - GitHub Repository [HuginSample](https://www.github.com/niebert/HuginSample)
* [River Rhine 2 - Cologne](https://niebert.github.io/HuginSample/img/rhein2_rodenkirchen.jpg) - GitHub Repository [HuginSample](https://www.github.com/niebert/HuginSample)
* [River Rhine 3 - Cologne](https://niebert.github.io/HuginSample/img/rhein3_rodenkirchen.jpg) - GitHub Repository [HuginSample](https://www.github.com/niebert/HuginSample)
* [River Rhine 4 - Cologne](https://niebert.github.io/HuginSample/img/rhein4_rodenkirchen.jpg) - GitHub Repository [HuginSample](https://www.github.com/niebert/HuginSample)

![equirectangular image](https://niebert.github.io/HuginSample/img/rhein1_rodenkirchen.jpg)

### Equirectangular Scene in AFrame
Equirectangular images can be used in [AFrame](https://aframe.io) for a 360-degree panorama view.
* [**AFrame Example** - Puy de Sancy](https://aframe.io/examples/showcase/sky/)
* [**Durlach - Saumarkt** - Karlsruhe, Germany](https://niebert.github.io/HuginSample/durlach_saumarkt.html)  - [Equirectangular Image](https://niebert.github.io/HuginSample/img/durlach_saumarkt.jpg) - image is licensed under the [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en)
* [**Rieselfelder Münster**](https://niebert.github.io/HuginSample/rieselfelder1.html) - [Equirectangular Image](https://niebert.github.io/HuginSample/img/rhein1_rodenkirchen.jpg) - image is licensed under the [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en).
* [**Rheinauen - Cologne 1**](https://niebert.github.io/HuginSample/rhein1_rodenkirchen.html) - [Equirectangular Image](https://niebert.github.io/HuginSample/img/rhein1_rodenkirchen.jpg) - image is licensed under the [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en).
* [**Rheinauen - Cologne 2**](https://niebert.github.io/HuginSample/rhein2_rodenkirchen.html) - [Equirectangular Image](https://niebert.github.io/HuginSample/img/rhein1_rodenkirchen.jpg) - image is licensed under the [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en).
* [**Rheinauen - Cologne 3**](https://niebert.github.io/HuginSample/rhein3_rodenkirchen.html) - [Equirectangular Image](https://niebert.github.io/HuginSample/img/rhein1_rodenkirchen.jpg) - image is licensed under the [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en).
* [**Rheinauen - Cologne 4**](https://niebert.github.io/HuginSample/rhein4_rodenkirchen.html) - [Equirectangular Image](https://niebert.github.io/HuginSample/img/rhein1_rodenkirchen.jpg) - image is licensed under the [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en).
* [**Foschungsanlage Eusserthal**](https://niebert.github.io/HuginSample/eusserthal.html)
* [**Jelgava Palace**](https://niebert.github.io/HuginSample/Jelgavas_pils.html) - [WikiCommons Source File](https://commons.wikimedia.org/wiki/File:Jelgavas_pils.jpg) - Uldins Bardins (2011) - image is licensed under the [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en). [GeoLoc](https://commons.wikimedia.org/wiki/File:Jelgavas_pils.jpg#/maplink/0)
* [**Aldara Park**](https://niebert.github.io/HuginSample/Aldara_parks.html) - [WikiCommons Source File](https://commons.wikimedia.org/wiki/File:Aldara_parks.jpg) - Uldins Bardins (2011) image is licensed under the [Creative Commons](https://en.wikipedia.org/wiki/en:Creative_Commons) [Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en). [GeoLoc](https://commons.wikimedia.org/wiki/File:Aldara_parks.jpg#/maplink/0)


## Images for Planet Surface 
* [Earth Surface equirectangular](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Color_etopo1_ice_low.jpg/2560px-Color_etopo1_ice_low.jpg) Creative Commons on [WikiCommons](https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Land_shallow_topo_2048.jpg/2560px-Land_shallow_topo_2048.jpg)
* [Moon Surface - equirectangular](https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Solarsystemscope_texture_2k_moon.jpg/320px-Solarsystemscope_texture_2k_moon.jpg)

## Lesson Result of 3D Geometry
This tool was developed as support tool for a learning resource about 3D modelling in Wikiversity. Think of using 3D models in a seasonal context:
* [Snowman AFrame](https://niebert.github.io/JSON3D4Aframe/mods3d/snowman_aframe.html) no markers required - direct display
* The mathematical learning objective is to plan and organize geometric primitives like spheres, boxes, cones, planes, triangle in a 3D coordinate system and see how a special target 3D model evolves.
* start with an initialize model and explore the **Save 3D** export options for the pre-loaded 3D models. You can also press **Examples 3D** to explore the basic concept of using [`AFrame`](https://aframe.io) models and [`AR.js`](https://ar-js-org.github.io/AR.js-Docs/) in [JSON3D4Aframe](https://niebert.github.io/JSON3D4Aframe)

### See also
* [HuginSample](https://www.github.com/niebert/HuginSample) for example of 360 degree images that can be used as sky `a-sky` in AFrame.
* See [WikiCommons2AFrame](https://www.github.com/niebert/WikiCommons2AFrame) for generating 360 degree image views for a geo location.
* This repository was created for the [Wikiversity learning resource about 3D Modelling](https://en.wikiversity.org/wiki/3D_Modelling).
* See also [Link Traversal Example in Aframe][Repository on GitHub](https://www.github.com/niebert/aframe360navigation)

## Rapid prototype
This is an rapid prototype as proof of concept for a learning resource. Some information about the code:

### Editor4JSON
The Javascript class `Editor4JSON` is a JSON editor for large arrays. 3D models can have a large number of 3D primitives. The JSON editor create by Jeremy Dorn is great library, but the browsers will run out of memory if the JSON is too large.

`Editor4JSON` is specially design for large arrays.

Generation of HTML code for Aframe is created by a method of the JSON Editor `Editor4JSON` and only the editing of a single Object will be performed in the underlying JSON editor. The function of the library is defined with method `generateHTML()` in the file `docs/js/editor4json.js`.


## UML Diagram of Editor4JSON Class

![UML Diagram of JS Class Editor4JSON](https://niebert.github.io/JSON3D4Aframe/Editor4JSON_UML.png)

## JSON to Schema Generator

Used the following tool that creates a [JSON schema](http://json-schema.org/) for a provided JSON file. Used the given JSON file to create the JSON Schema with [JSON2schema.html](https://niebert.github.io/json-editor/plugins/json2schema.html).

## Python Web-Server for Testing from shell
Some Aframe 3D-objects are visisible if the aframe 3D scene was loaded from a web server (due to cross-site scripting security feature). E.g. text elements with fonts will not be displayed. To check the Aframe 3D scene with all feature start a webserver with python from shell. the current directory is used as root directory for the web server.
* Linux/Mac:  `python -m SimpleHTTPServer 8000`
* Windows (install python): `python -m http.server 8000`
* Check Aframe scene with: `http://localhost:8000`

## See also
* [HuginSample](https://www.github.com/niebert/HuginSample) - for examples to create your own 360-degree equirectangular images for sky-tag in Aframe.
* [AR-Examples](https://niebert.github.io/AR-Examples/) - Fork of [Lee Stemkoskis](https://github.com/stemkoski) repositories for AR.js and three.js examples  ([GitHub-Repo](https://www.github.com/niebert/AR-Examples))

## Acknowledgement
Special thanks to the following individual developers and teams of OpenSource JavaScript projects:
* [AFrame](https://aframe.io) is the WebVR framework that renders the geometric primitives on HTML canvas handles the 3D operations in the space for the defined 3D elements in the `Aframe` scene.
* [JSON-Editor](https://github.com/jdorn/json-editor) by Jeremy Dorn. The JSON Editor takes a JSON Schema and uses it to generate an HTML form. The JSON-Editor is partially used to edit JSON file of the Javascript Project in `JSCC` . The schemes of the JSON subtree are stored in the folder `/tpl` of the JavascriptClassCreator. The full potential of the JSON-Editor was not used in `JSCC` . This can be approved in the future.
The JSON-Editor of Jeremy Dorn has full support for JSON Schema version 3 and 4 and can integrate with several popular CSS frameworks (bootstrap, foundation, and jQueryUI). This would lead to major code reduction of `JSCC` . Refactoring of `JSCC` would make more use of the JSON-Editor features. Check out an interactive demo (demo.html): http://jeremydorn.com/json-editor/
* Developer [Mihai Bazon](http://lisperator.net/) create UglifyJS, a great tool to handle and parse Javascript Code and minify the Javascript code (see [Source Code of UglifyJS](https://github.com/mishoo/UglifyJS2)).
* The wrapper for UglifyJS is written [Dan Wolff](http://danwolff.se/). His UglifyJS-Online example is used to minify/compress the exported Javascript code of generated JS Classes (For Online Example of the [UglifyJS-Wrapper](https://skalman.github.io/UglifyJS-online/) see source code on https://github.com/Skalman/UglifyJS-online for the Online-Version of the Wrapper.
* Developers of ACE Code Editor https://ace.c9.io (Javascript Editing uses the Editor in iFrames)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js) Developer Eli Grey provided the `FileSaver.js` that is used to store created `JSCC` files to the local filesystem. `JSCC` uses the same mechanism of browsers, that allows a `Save as...` in the context menu of a web pages or image. So not uncontrolled write access to your file system is implemented, because users have to select the locations in which the user whats to store the file (e.g. JSON, Javascript or HTML).
* [JointJS](https://github.com/clientIO/joint) JointJS is a JavaScript diagramming library. It can be used to create either static diagrams. JointJS is used in this project to create UML-diagrams, that are interactive diagramming in conjunction and application builder in Javascript.
* [Inheritage for JavaScript with protoypes](http://phrogz.net/js/classes/OOPinJS2.html) by Gavin Kistner
* [Jquery Plugin for CSV](https://github.com/evanplaice/jquery-csv) to load and save CSV files for interoperability
* [3 ways to define a JavaScript class](https://www.phpied.com/3-ways-to-define-a-javascript-class/) by Stoyan Stefanov
* [JQuery](https://jqueryui.com) is used for the theme and standard operations in the Document Object Model (DOM) of HTML-pages. The [JQuery-Themeroller](https://jqueryui.com/themeroller/) was used to create a JQuery theme for JSCC.
* [FontAwesome](http://fontawesome.io/icons/) by Dave Gandy used for the icons in HTML buttons


