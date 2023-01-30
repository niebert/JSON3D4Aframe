vDataJSON.tpl.ar = `
<!doctype HTML>
<html>
    <head>
      <meta name="createdwith" content="https://niebert.githhub.io/JSON3D4Aframe">
        <!--
      <script src="https://aframe.io/releases/1.1.0/aframe.min.js"></script>
      <script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.5.0/aframe/build/aframe-ar.js"> </script>
      -->
      <script src="./js/aframe-v1.0.4.js"></script>
      <script src="./js/aframe-ar.js"></script>
    <title>
            AR {{marker}} Marker - {{titlemodel}}
      </title>
    </head>
    <body style='margin : 0px; overflow: hidden;'>
      <a-scene>
          <a-marker id="mymarker" preset="{{marker}}">
{{{arobjects}}}
          </a-marker>
          <a-entity camera ></a-entity>
      </a-scene>
    </body>
</html>
`;
