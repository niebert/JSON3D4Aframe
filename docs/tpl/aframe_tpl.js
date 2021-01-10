vDataJSON.tpl.aframe = `
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;A-Frame - {{titlemodel}} &lt;/title&gt;
    &lt;meta name="description" content="A-Frame {{titlemodel}}"&gt;
    &lt;meta name="createdwith" content="https://niebert.githhub.io/JSON3D4Aframe"&gt;
    &lt;script src="https://aframe.io/releases/1.1.0/aframe.min.js"&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;a-scene&gt;
{{{arobjects}}}
{{{plane}}}
{{{sky}}}
{{{cameraposition}}}
    &lt;/a-scene&gt;
  &lt;/body&gt;
&lt;/html&gt;
`;
