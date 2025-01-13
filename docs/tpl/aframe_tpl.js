vDataJSON.tpl.aframe = `
<!DOCTYPE html>
<html>
  <head>
    <title>A-Frame - {{titlemodel}} </title>
    <meta name="description" content="A-Frame {{titlemodel}}">
    <meta name="createdwith" content="https://niebert.githhub.io/JSON3D4Aframe">
     <script src="https://aframe.io/releases/1.1.0/aframe.min.js"></script>
    <!-- <script src="./js/aframe-v1.0.4.js"></script>  -->
 </head>
  <body>
    <a-scene>
{{{arobjects}}}
{{{plane}}}
{{{sky}}}
{{{cameraposition}}}
    </a-scene>
  </body>
</html>
`;
