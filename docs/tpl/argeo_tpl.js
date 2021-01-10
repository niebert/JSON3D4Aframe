vDataJSON.tpl.argeo = `
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>GeoAR - {{titlemodel}} </title>
    <meta name="createdwith" content="https://niebert.githhub.io/JSON3D4Aframe">
    <script src='https://aframe.io/releases/0.9.2/aframe.min.js'></script>
    <script src="https://raw.githack.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.min.js"></script>
    <script src="https://raw.githack.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
    <script>
        THREEx.ArToolkitContext.baseURL = 'https://raw.githack.com/jeromeetienne/ar.js/master/three.js/'
    </script>
</head>

<body style='margin: 0; overflow: hidden;'>
    <a-scene
        vr-mode-ui="enabled: false"
		embedded
        arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>

{{{arobjects}}}

        <a-camera gps-camera rotation-reader></a-camera>
	</a-scene>
</body>
</html>
`;
