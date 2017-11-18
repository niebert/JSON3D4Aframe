function compileHTML(pTplID,pDataJSON) {
  //----Debugging------------------------------------------
  // console.log("js/editor4json.js - Call: exporFileHTML()");
  // alert("js/editor4json.js - Call: exportData()");
  //----Create Object/Instance of Editor4JSON----
  //    var vMyInstance = new Editor4JSON();
  //    vMyInstance.exportHTML();
  //-------------------------------------------------------
	// load the 3D object template
	var objecttpl = pDataJSON["objecttpl"] || vDataJSON["objecttpl"];
	//objecttpl = correctHandleBarsTemplate(objecttpl);
	console.log("Object Template for HandleBars:\n"+objecttpl);
	//compile the template text into a function for replacing JSON content
	var objectScript = Handlebars.compile(objecttpl);
	var vARobjects = "";
	// call the objectScript for all records in the Editor4JSON array
	var vData = pDataJSON["jsondata"];
  if (vData) {
    for (var i = 0; i < vData.length; i++) {
			console.log("Data["+i+"]: "+JSON.stringify(vData[i]));
  		vARobjects += objectScript(vData[i]);
  	};
  } else {
    //alert("pData in compileHTML undefined!");
    console.log("pData in compileHTML undefined!");
  }
	// load the main Handlebars template and replace
	var template = pDataJSON[pTplID] || vDataJSON[pTplID]; // pTplID = "aframetpl" or "artpl" defined in db/handlebars_tpl.js
	console.log("HandleBars Template ["+pTplID+"]: "+template);
	console.log("AR template: "+ vDataJSON["artpl"]);
	// Compile the template data into a function
	var templateScript = Handlebars.compile(template);
	// identify the selected marker
	var vMarker = pDataJSON["marker"] || vDataJSON["marker"];
	var context = { "arobjects" : vARobjects, "marker": vMarker};
	// Perform the replacement with the "templateScript()"
	var vHTML = templateScript(context);
	//this.saveFile("ar_"+vMarker+".html",vHTML);
  return vHTML;
};
//----End compileHTML()

function parseJSON3D(pStringJSON) {
  var vJSON = null;
  try {
      vJSON = JSON.parse(pStringJSON);
  } catch(e) {
      alert(e);
      vJSON = null;
  };
  return vJSON;
}

function inject3Dmodel(pTplID,pDataJSON) {
	//-------------------------------------------------------
  // INJECT TEMPLATE: HandleBar generated HTML
  //-------------------------------------------------------
  //----- Parse the JSON data of the AR objects -----------
  // use template vDataJSON["aframetpl"] defined db/handlebars_tpl.js
	var vOut = compileHTML(pTplID,pDataJSON);
	console.log("Body Inject:\n"+vOut);
	document.getElementById("htmlbody").innerHTML = vOut;
}
