function setCameraPosition() {
  console.log("Try to set Camera Position()");
  var vID = "myCameraPosition";
  var vCamera = document.getElementById(vID);
  if (vCamera) {
    var vCamPosXYZ = getValueDOM("camposxyz");
    console.log("setCameraPosition(" + vCamPosXYZ  + ")");
    vCamera.setAttribute("position",vCamPosXYZ);
  } else {
    console.warn("Aframe-Camera: [" + vID + "] is not defined in the aframe-scene");
  }
}

function readAframeCameraPosition() {
  console.log("Try to read current Camera Position for Aframe");
  var vID = "myCameraPosition";
  var vCamera = document.getElementById(vID);
  if (vCamera) {
    var vCamPosXYZ = getValueDOM("camposxyz");
    console.log("setCameraPosition(" + vCamPosXYZ + ")");
    vCamera.setAttribute("position",vCamPosXYZ);
  } else {
    console.warn("Cannot read Aframe-Camera: [" + vID + "] is not defined in the aframe-scene");
  }
}

function updateAframeScene(pEditor4JSON) {
  console.log("js/aframe4embedded.js:2 - Call: updateAframeScene()");
	//var scene = document.querySelector('a-scene');
  //var sceme = document.getElementsByTagName('a-scene')[0];
  var scene = document.querySelector('a-scene');
  var vData = pEditor4JSON.getValue();
	if (scene) {
		var vDataArr = [];
			for (var i = 0; i < vData.length; i++) {
				// the repeat count defines the number of repetitions of an 3D object
				if (vData[i].tagname !== "-") {
					vDataArr = get3DRepeatedArray(vData[i]);
					//console.log("aframe4embedded.js:15 - updateAframeScene() vDataArr[0]="+JSON.stringify(vDataArr[0],null,4));
					for (var k = 0; k < vDataArr.length; k++) {
						//create all repeated 3D objects
						//vARobjects += objectScript(vDataArr[k]);
						var vList3D = vDataArr[k].domnodes;
						var v3D = null;
						for (var j = 0; j < vList3D.length; j++) {
							v3D = vList3D[j];
              //console.log("updateAframeScene() - Tag: '" + v3D.tagName + "'");
							var vEl3D = document.createElement(v3D.tagName);
							//vEl3D.setAttribute("id",vDataArr[k].id);
							//vEl3D.setAttribute("position",vDataArr[k].position);
							//vEl3D.setAttribute("rotation",vDataArr[k].rotation);
							//vEl3D.setAttribute("material","color:" + vDataArr[k].color + ";opacity:" + vDataArr[k].opacity);
							var vAttList = v3D.attributes;
							for (var att = 0; att < vAttList.length; att++) {
                //console.log("updateAframeScene() - Attribute: " + vAttList[att].name+ "='" + vAttList[att].value+ "'");
  							vEl3D.setAttribute(vAttList[att].name+"",vAttList[att].value+"");
							};
							scene.appendChild(vEl3D);
							console.log("aframe4embedded.js:33 - Added "+v3D.tagName+" to AFrame Scene!");
						}
					};
				}
			};
	} else {
		console.warn("WARNING: Embedded Aframe Scene does not exist.");
	}
}

function clearAframeScene  () {
	console.log("js/aframe4embedded.js:44 - Call: clearAframeScene()");
	var scene = document.querySelector('a-scene');
	if (scene) {
		//----Clear Scene ----
		var max = scene.children.length;
		while (max > 0) {
			max--;
			var vTagName = scene.children[max].tagName;
			vTagName = vTagName.toUpperCase();
			if (vTagName.indexOf("A-") >= 0) {
				if (vTagName.indexOf("A-ENTITY") >= 0) {
					console.log("Tag-Name [" + max + "]='" + vTagName + "' kept.");
				} else {
					console.log("Tag-Name [" + max + "]='" + vTagName + "' deleted.");
					scene.removeChild(scene.children[max]);
				}
			} else {
				console.log("Tag-Name [" + max + "]='" + vTagName + "' kept.");
			}
		}
	} else {
		console.warn("WARNING: Embedded Aframe Scene does not exist.");
	}
};
//----End of Method clearAframeScene() Definition


function html2json(div,obj){
  if(!obj){
    obj=[];
  }
  var vJSON= {};
  vJSON.tagName = div.tagName;
  vJSON.attributes = [];
  vJSON.children = [];
  var i = 0;
  for(i = 0; i< div.children.length;i++){
     vJSON.children.push(html2json(div.children[i]));
  }
  for(i = 0; i< div.attributes.length;i++) {
     var attr= div.attributes[i];
     vJSON.attributes.push({
       "name":attr.name,
       "value":attr.value
     });
     //tag['@'+attr.name] = attr.value;
  }
  return tag;
}

function json2dom(json,domtag){
  // HTML tag to the DIV element
  var tag = null;
  domtag = domtag || document.createElement("div");
  if(!json){
    console.warn("JSON undefiend");
  } else {
    if (json.hasOwnProperty("tagName")) {
        // CREATE DOM ELEMENT
        tag = document.createElement(json.tagName);
        var i = 0;
        // ATTRIBUTES
        // add attribution to the start node
        if (json.hasOwnProperty("attributes")) {
          for(i = 0; i< json.attributes.length;i++) {
             var attr= json.attributes[i];
             tag.setAttribute(attr.name, attr.value);
             //tag['@'+attr.name] = attr.value;
          }
        }
        // CHILD NODES
        for(i = 0; i< json.children.length;i++){
          //tag.children.push(json2dom(json.children[i],tag));
          json2dom(json.children[i],tag);
        }
        // APPEND CHILD parent DIV
        domtag.appendChild(tag);
    } else {
      console.warn("WARNING: json2dom(json,div) - json.tagName undefined!");
    }
    //tag.tagName = div.tagName;
    //tag.children = [];
      // tag.children.push(htmlToJson(div.children[i]));


  }
  return tag;
}


/*
// path
var sceneEl = document.getElementsByTagName('a-scene')[0];
var pathLength = 8;


for (var i = -1; i => -pathLength; i--) {
  //wood
  var woodPathEl = document.createElement('a-box');
  woodPathEl.setAttribute("position", "0 -1 " + i);
  woodPathEl.setAttribute("src", "#wood");
  sceneEl.appendChild(woodPathEl);

  //  grass
  var grassPathEl = document.createElement('a-box');
  grassPathEl.setAttribute("position", '-1 -1 ' + i);
  grassPathEl.setAtrribute("src", '#grass');
  sceneEl.appendChild(grassPathEl);
}

*/
