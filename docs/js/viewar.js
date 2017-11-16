function compileHTML(pTplID,pData,pMarker) {
  //----Debugging------------------------------------------
  // console.log("js/editor4json.js - Call: exporFileHTML()");
  // alert("js/editor4json.js - Call: exportData()");
  //----Create Object/Instance of Editor4JSON----
  //    var vMyInstance = new Editor4JSON();
  //    vMyInstance.exportHTML();
  //-------------------------------------------------------
	// load the 3D object template
	var objecttpl = vDataJSON["objecttpl"];
	//objecttpl = correctHandleBarsTemplate(objecttpl);
	console.log(objecttpl);
	//compile the template text into a function for replacing JSON content
	var objectScript = Handlebars.compile(objecttpl);
	var vARobjects = "";
	// call the objectScript for all records in the Editor4JSON array
  if (pData) {
    for (var i = 0; i < pData.length; i++) {
  		vARobjects += objectScript(pData[i]);
  	};
  } else {
    //alert("pData in compileHTML undefined!");
    console.log("pData in compileHTML undefined!");
  }
	// load the main Handlebars template and replace
	var template =vDataJSON[pTplID]; // pTplID = "aframetpl" or "artpl" defined in db/handlebars_tpl.js
	//alert("Template:"+template);
	// Compile the template data into a function
	var templateScript = Handlebars.compile(template);
	// identify the selected marker
	var vMarker = pMarker || vDataJSON["marker"];
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

function inject3Dmodel(pTplID) {
	//-------------------------------------------------------
  // INJECT TEMPLATE: HandleBar generated HTML
  //-------------------------------------------------------
  //----- Parse the JSON data of the AR objects -----------
  // use template vDataJSON["aframetpl"] defined db/handlebars_tpl.js
	var vOut = compileHTML(pTplID,vDataJSON["jsondata"],vDataJSON["marker"]);
}
