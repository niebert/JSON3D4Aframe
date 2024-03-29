vDataJSON[vSchemaID] = {
	"type": "object",
	"title": "3D Objects",
	"headerTemplate": "3D: {{self.tagname}} - {{self.comment}}",
	"type": "object",
		"format":"grid",
    "id": "https://niebert.github.io/json-editor",
		"options": {
        "disable_collapse": false,
        "disable_edit_json": false,
        "disable_properties": false,
        "collapsed": false,
        "hidden": false
    },
		"defaultProperties": [
        "id",
				"tagname",
				"comment",
				"position",
        "color",
				"opacity",
				"sizexyz",
				"rotation",
				"scale",
				"repeat",
				"repeatsteps",
				"animation"
    ],
	"properties": {
		"id": {
            "type": "string",
            "id": "/properties/id",
            "title": "ID",
            "default": "78912379812",
            "format": "text",
						"propertyOrder": 10,
						"description": "Unique ID for 3D Object",
						"options": {
        			"disable_collapse": false,
        			"disable_edit_json": false,
        			"disable_properties": false,
        			"collapsed": false,
        			"hidden": true
    				},
        },
        "comment": {
            "type": "string",
            "id": "/properties/comment",
            "title": "Name Comment:",
            "default": "",
            "format": "text",
						"propertyOrder": 20,
						"x_description": "Short comment about the 3D object."
        },
				"tagname": {
            "type": "string",
            "id": "/properties/tagname",
            "title": "Type of Object:",
  		    	"enum": [
							"-",
          		"a-box",
							"a-cone",
							"a-cylinder",
							"a-ellipsoid",
							"a-prism",
							"a-pyramid",
							"a-sphere",
          		"a-torus",
							"a-arc",
							"a-circle",
							"a-plane",
							"a-ring",
							"a-triangle",
							"a-text"
          	],
          	"options": {
       		   		"enum_titles": [
							 		"-",
									"Box",
									"Cone",
									"Cylinder",
									"Ellipsoid",
									"Prism",
									"Pyramid",
									"Sphere",
									"Torus",
									"Arc",
									"Circle",
									"Plane",
									"Ring",
									"Triangle",
									"Text"
            		]
       			},
            "default": "-",
            "format": "text",
						"propertyOrder": 30,
						"x_description": "Select the 3D object you want to add to the scene."
        },
				"position": {
            "type": "string",
            "id": "/properties/position",
            "title": "x,y,z Coordinates",
            "default": "0.0 0.5 0.0",
            "format": "text",
						"propertyOrder": 40,
						"x_description": "e.g. '0.5 2 3' means 0.5 units right (x-dimension), 2 marker units up (y-dimension) and 3 marker units depths (z-dimension) z=-3 behind screen z=3 before screen"
        },
				"sizexyz": {
						"type": "string",
				  	"id": "/properties/sizexyz",
            "title": "Size x (width/radius), Size y (height), Size z (depth)",
            "default": "1.5 1.0 0.5",
            "format": "text",
						"propertyOrder": 43,
						"description": "Sizes: BOX(x,y,z)=(width,height,depth)   SPHERE(x,y,z)=(radius,-,-)   CONE(x,y,z)=(radius-botton,radius-top,height),   TORUS(x,y,z)y=(radius-outer,tubular-radius,-), PLANE(x,y,z)=(width,height,-),  TRIANGLE(x,y,z)=(x-width,x-3-point,y-3-point)"
        },
				"rotation": {
						"type": "string",
						"id": "/properties/rotation",
						"title": "Rotation in degree in xyz-direction",
						"default": "0 0 0",
						"format": "text",
						"propertyOrder": 46,
						"description": "Defines the rotation around x-axis (horizontal), y-axis (depth), z-axis (height). For some objects rotation does not make sense to apply rotation around an axis (e.g. sphere, torus)"
				},
				"color": {
            "type": "string",
            "id": "/properties/color",
            "title": "Color",
            "default": "#4545AA",
            "format": "color",
						"propertyOrder": 50,
						"description": "Summary describes the location"
        },
        "opacity": {
            "type": "number",
            "id": "/properties/opacity",
            "title": "Opacity",
            "default": 0.5,
            "format": "text",
						"propertyOrder": 60,
						"description": "Defines how transparent the 3D object is in a camera video"
        },
				"scale": {
            "type": "number",
            "id": "/properties/scale",
            "title": "Scale Factor",
            "default": 1.0,
						"propertyOrder": 70,
						"description": "Basic size is determined by the marker size. With this factor you can scale the object"
        },
				"repeat": {
						"type": "string",
						"id": "/properties/repeat",
						"title": "Repeat 3D object in xyz-direction",
						"default": "0 0 0",
						"format": "text",
						"propertyOrder": 100,
						"description": "Defines the number of additional copies/repetitions of the 3D object in x-direction (width), y-direction (height), z-direction (depth). Default number of copies/repitiions is 0"
				},
				"repeatsteps": {
						"type": "string",
						"id": "/properties/repeatsteps",
						"title": "Repeat Steps shifts the copies of 3D object in xyz-direction",
						"default": "1.0 1.0 1.0",
						"format": "text",
						"propertyOrder": 110,
						"description": "Defines the step width (vector length) of additional copies/repetitions of the 3D object in x-direction (width), y-direction (height), z-direction (depth). Default vector length of copies/repitiions is 1.0"
				},
				"animation": {
						"type": "string",
						"id": "/properties/animation",
						"title": "Animation Properties",
						"default": "1.0 1.0 1.0",
						"format": "text",
						"propertyOrder": 120,
						"description": "Defines the animation properties of the 3D object",
						"options":{
							"hidden": true
						}
				}

 	},
  	"definitions": {
  	}
}
