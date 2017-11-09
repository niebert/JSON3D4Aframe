## Javascript Class: Editor4JSON
created Javascript Class Creator JSCC 2017/07/06 6:50:57
https://niebert.github.io/JavascriptClassCreator
File: js/editor4json.js

[GitHub Repository Mapper4SDG](https://www.github.com/niebert/Mapper4SDG)

### Attributes: Editor4JSON

#### aEditor:JSONEditor
* Default value: null
* Visibility: public
* Comment: is the instance of the JSON editor developed by Jeremy Dorn

#### aName:String
* Default value: "myjson"
* Visibility: public
* Comment: the attribute 'aName' stores the base name of the JSON file. it used for base name for export files.

#### aData:Array
* Default value: []
* Visibility: public
* Comment: the attribute 'aData' is a array of JSON records that are edited with the JSON editor by Jeremy Dorn

#### current: 
* Default value: -1
* Visibility: public
* Comment: the attribute 'current' stores the current selected index in the array, -1 means no JSON record selected in array or array is empty

#### aSchemaJSON: 
* Default value: null
* Visibility: public
* Comment: the attribute 'aSchemaJSON' stores in JSON schema that defines the structure of JSON records in the array

#### aEditURL:String
* Default value: ""
* Visibility: public
* Comment: the attribute 'aEditURL' stores the URL to the JSON Editor developed by Jeremy Dorn

#### aDOMID:Hash
* Default value: null
* Visibility: public
* Comment: the attribute 'aDOMID' stores in ids of DOM element, e.g. editor_holder, valid ... 

### Methods: Editor4JSON

#### init(pDOMID:Hash,pData:Array,pSchema:Hash)
* Visibility: public
(1)pDOMID is hash with DOM ids that contains the following key/value pairs
 - "name" is the name of JSON database that is used for the exported filename for JSON
 - "editor" the DOM element where the JSON editor is injected (editor_holder of JSON editor).
 - "validator" is the DOM element to "valid" or "not valid" to (innerHTML) used in updateDOM()
 - "current" is the DOM element to write the currently selected array index into a text input box (value) used in updateDOM()
 - "length" is the DOM element to write the current array length to (innerHTML) used in updateDOM()
(2) pData is the large array that is edited and 
(3) pSchema defines the JSON schema of a single record in the large thisarray) 

#### prev()
* Visibility: public
goto previous record) 

#### next()
* Visibility: public
Goto next record) 

#### goto(i)
* Visibility: public
goto record with index i) 

#### first()
* Visibility: public
shows the first element in the large record) 

#### last()
* Visibility: public
goes to the last record in large array) 

#### edit()
* Visibility: public
edit calls the JSON editor of Jeremy Dorn for the selected record. It sets the init value of the JSON editor.  ) 

#### setSchema(pSchemaJSON:Hash)
* Visibility: public
setSchema() sets a new schema for the JSON editor and the records of the array. If the editor this.aEditor exists, setSchema will destroy the current JSON editor to free some resources otherwise it will call the init method again.) 

#### getSchema():Hash
* Return Type: :Hash
* Visibility: public
getSchema() just return the JSON schema this.aSchemaJSON):Hash 

#### export()
* Visibility: public
export() uses the FileSaver.js to create a download of exported JSON pJSON after the JSON was stringified) 

#### exportData()
* Visibility: public
exportData() exports the JSON data in this.aData as file. The filename is defined by this.aName. if aName="myjson" the filename is "myjson.json") 

#### exportSchema()
* Visibility: public
exportSchema() exports the JSON schema in this.aSchemaJSON as file. The filename is defined by this.aName. if aName="myjson" the filename is "myjson_schema.json") 

#### getLocalStorageID4Name(pName:String):String
* Return Type: :String
* Visibility: public
the LocalStorageID for an item may not contain a dot . Name):String 

#### loadLS()
* Visibility: public
loadLS() loads the JSON file from Local Storage) 

#### saveLS()
* Visibility: public
saveLS() stores the JSON file in Local Storage) 

#### validate():Boolean
* Return Type: :Boolean
* Visibility: public
validates the current record in the large array against the schema. 
Returns true if record in JSON editor valid according to the JSON schema in this.aSchemaJSON):Boolean 

#### onChange()
* Visibility: public
handle onChange event from the JSON editor developed by Jeremy Dorn. This method updates the content in the editor with the record in this.aData[this.current] ) 

#### deleteRecord()
* Visibility: public
delete current record in array and decrease current if is the last) 

#### deleteAsk()
* Visibility: public
deleteAsk() asks the user if deleteRecord() should be performed) 

#### check()
* Visibility: public
checks if the index of the array is between 0 and this.aData.lenth) 

#### updateDOM()
* Visibility: public
updateDOM() updates the index of the currently edited record from the array and updates the length of the array e.g. if a new record was pushed the array this.aData) 

#### setEditorData(pEditorData:Hash)
* Visibility: public
setEditorData() sets the Editor with current, data and schema) 

#### getEditorData():Hash
* Return Type: :Hash
* Visibility: public
getEditorData() create a Hash for this.current, this.aData and this.aSchema):Hash 

#### load()
* Visibility: public
loads the file from Local Storage and updates the DOM values with current, aData loadLS() and load() cannot be merged because loadLS() is called in the this.init() without the possibility to edit() due to the fact that the JSON editor is not created and dependent on the loaded values of the schema) 

#### save()
* Visibility: public
save() stores current index, JSON data and JSON schema with storeLS() into local storage and exports the current JSON data as file) 