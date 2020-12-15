# Select a Geolocation with OpenLayers and CallBack
Demo that creates a selector for a geolocation on a map by using [OpenLayers](https://www.openlayers.org). Geolocation Button allows to center map on current geolocation and callback url shows how to call this tool remotely and return the selected geolocation.

## [Geolocation Select Demo](https://niebert.github.io/openlayer_selectlocation)


## Files of Demo
This demo consists of two file stored in `/docs`
* `index.html` and
* `selectlocation.html`.
`index.html` calls `selectlocation.html` and lets the user select a geolocation. After the users clicks on the map in `selectlocation.html` the OpenLayers map returns the selected geolocation back to `index.html`. In this example `index.html` reads the geolocation from the LinkParameter e.g. `index.html?geolocation=-12.213,65.123` and stores the geolocation in a input text element with the ID=mygeolocation in the HTML file `index.html`.

### Libraries
* `linkparam.js` The LinkParameter parameter are handled with a Javascript Class `docs/js/linkparam.js`.
* `openlayers3.js` is the OpenLayers3 version as JavaScript library. See [OpenLayers](https://www.openlayers.org) for more details.

### CSS
* `font-awesome` Font AweSome is preinstalled for offline use of buttons and further tests.


### Demo
* [Geolocation Select Demo](https://niebert.github.io/openlayer_selectlocation)
* [Download Demo](https://github.com/niebert/openlayer_selectlocation/archive/master.zip) unzip file and checkout the subdirectory `/docs`. The demo is stored in `/docs` because it is used at the same time as root directory for https://niebert.github.io/openlayer_selectlocation

### See also
* Open Layers - Display Markers with Popups on the Map [Demo Display Markers](https://niebert.github.io/openlayer_diplay_markers) - [Source Code](https://github.com/niebert/openlayer_diplay_markers) - [ZIP](https://github.com/niebert/openlayer_diplay_markers/archive/master.zip)
* Mapper4SDG - [Demo](https://niebert.github.io/Mapper4SDG) - [Source Code](https://github.com/niebert/Mapper4SDG) - [ZIP](https://github.com/niebert/Mapper4SDG/archive/master.zip)  
* [Mixare](https://www.mixare.org) is an Augemented Reality App, that allows to place digital content in a camera image. [Demo](https://niebert.github.io/Mixare4JSON) - [Source Code](https://github.com/niebert/Mixare4JSON) - [ZIP](https://github.com/niebert/Mixare4JSON/archive/master.zip)
