//var vCreator3D = {}; Defined in index.html

vCreator3D.curved_plane = function (v3DOutArr,vData,fCurveTop,fCurveBottom,pSegmentation) {
  /*
  fCurveTop,fCurveBottom are functions with the domain [0,1]
  implementing a convexcombination in IR^3
  pSegmentation is an integer number defines the number of segnments in which
  the interval [0,1] is decomposed, default value is 5, i.e. it decomposes the
  interval [0,1] in 6 values t=0.0, 0.2, 0.4, 0.6, 0.8, 1.0 with t_step=1/5
  the plane will be triangluated with the vertices defined by
  - fCurveTop(t) at the top
  - fCurveBottom(t) at the bottom

  vData defines the sizes of the source object defined in JSON3D4Aframe

  the generated triangles will be pushed to the array "v3DOutArr" of AFrame primitives
  */

  var vSegmentation = pSegmentation || 5;
  if (vSegmentation < 2) {
    vSegmentation = 2;
  }
  var t_step = 1/vSegmentation;
};

vCreator3D.arc = function (v3DOutArr,vData,vSizeXYZS) {
  // Global scaling will be performed in calcRecordJSON() with push to v3DOutArr.
  var vGlobalScale = getGlobalScale();
  var vScale = vData.scale || parseFloatBig("1.0");
  vScale *= vGlobalScale; //
  console.log("a-arc: Global Scale="+vGlobalScale+" Object Scale="+(vData.scale || 1.0));
  vData.tagname = "a-triangle";
  var vCount = 0;
  var vDOMID = vData.id;
  // size x,z bottom rectangle
  // y height of arc

  /* Calculate x-,y- axis center is for both arcs is
     FRONT (0,0,sizez/2)
     BACK (0,0,-sizez/2)

     radius is r = min{ sisex/2 , sizey/2 }

     S segments stored in sizec as 4th component of vSizeXYZS

     default number of segments are 4

  */
  // create 4 triangles
  //math.bignumber() with higher precision
  var vSizeTriangle = [];
  var vZero = parseFloatBig("0.0");
  var v__SizeXYZS = [-1.0,-1.0,-1.0, 6];
  // half size positive for centre of 3D object 0.5
  // incorporate scaling of object and global scale
  //vSizeXYZS[0] = multBig(multBig("0.5",vScale),vSizeXYZS[0]);
  //vSizeXYZS[1] = multBig(multBig("0.5",vScale),vSizeXYZS[1]);
  //vSizeXYZS[2] = multBig(multBig("0.5",vScale),vSizeXYZS[2]);
  vSizeXYZS[0] = multBig(parseFloatBig("0.5"),vSizeXYZS[0]);
  vSizeXYZS[1] = multBig(parseFloatBig("0.5"),vSizeXYZS[1]);
  vSizeXYZS[2] = multBig(parseFloatBig("0.5"),vSizeXYZS[2]);
  vSizeXYZS[3] = parseIntBig(vSizeXYZS[3]);
  // create negative value for pyramdid 3D object
  v__SizeXYZS[0] = multBig(parseFloatBig("-1"),vSizeXYZS[0]);
  v__SizeXYZS[1] = multBig(parseFloatBig("-1"),vSizeXYZS[1]);
  v__SizeXYZS[2] = multBig(parseFloatBig("-1"),vSizeXYZS[2]);
  v__SizeXYZS[3] = parseIntBig(vSizeXYZS[3]);
  /*
  var peak = [
    divideBig(vSizeXYZS[0],2),
    vSizeXYZS[1],
    divideBig(vSizeXYZS[2],2)
  ];
  */
  var peak = [
    vZero,
    vSizeXYZS[1],
    vZero
  ];
  console.log("PYRAMID get3DRepeatedArray(): "+JSON.stringify(vData,null,4));
  console.log("PYRAMID get3DRepeatedArray(): Peak="+JSON.stringify(peak,null,4));
  /* OK
    center peak
      (0,-sizey,0)
    1. Triangle
      (-sizex,-sizey,sizez)
      (sizex,-sizey,sizez)
      peak
  */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T1";
  //vSizeTriangle.push(peak[0],peak[1],peak[2]);
  vSizeTriangle.push(v__SizeXYZS[0] , v__SizeXYZS[1] , vSizeXYZS[2]);
  vSizeTriangle.push(  vSizeXYZS[0] , v__SizeXYZS[1] , vSizeXYZS[2]);
  vSizeTriangle.push(peak[0],peak[1],peak[2]);
  //vSizeTriangle = cloneJSON(peak);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PYRAMID - TRIANGLE 1 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));
  /* OK
    2. Triangle
      peak
      (sizex,-sizey,  sizez)
      (sizex,-sizey, -sizez)
  */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T2";
  vSizeTriangle = cloneJSON(peak);
  vSizeTriangle.push( vSizeXYZS[0] , v__SizeXYZS[1] ,   vSizeXYZS[2]);
  vSizeTriangle.push( vSizeXYZS[0] , v__SizeXYZS[1] , v__SizeXYZS[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PYRAMID - TRIANGLE 2 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  /*
  3. Triangle
    peak
    ( sizex,-sizey, -sizez)
    (-sizex,-sizey, -sizez)
  */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T3";
  vSizeTriangle = cloneJSON(peak);
  vSizeTriangle.push(   vSizeXYZS[0] , v__SizeXYZS[1] , v__SizeXYZS[2]);
  vSizeTriangle.push( v__SizeXYZS[0] , v__SizeXYZS[1] , v__SizeXYZS[2]);
  //vSizeTriangle.push(peak[0],peak[1],peak[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PYRAMID - TRIANGLE 3 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  /* OK
   4. Triangle
      peak
      (-sizex,-sizey, -sizez)
      (-sizex,-sizey,  sizez)
    */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T4";
  vSizeTriangle = cloneJSON(peak);
  vSizeTriangle.push( v__SizeXYZS[0] , v__SizeXYZS[1] , v__SizeXYZS[2]);
  vSizeTriangle.push( v__SizeXYZS[0] , v__SizeXYZS[1] ,   vSizeXYZS[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PYRAMID - TRIANGLE 4 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  /*
   5. Bottom Triangle
    ( sizex, -sizey,  sizez)
    (-sizex, -sizey,  sizez)
    (-sizex, -sizey, -sizez)
    */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T5";
  vSizeTriangle = [];
  vSizeTriangle.push(  vSizeXYZS[0] , v__SizeXYZS[1] , vSizeXYZS[2]);
  vSizeTriangle.push(v__SizeXYZS[0] , v__SizeXYZS[1] , vSizeXYZS[2]);
  vSizeTriangle.push(v__SizeXYZS[0] , v__SizeXYZS[1] , v__SizeXYZS[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PYRAMID - TRIANGLE 5 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  /*
   6. Bottom Triangle
      ( sizex, -sizey, -sizez)
      ( sizex, -sizey,  sizez)
      (-sizex, -sizey, -sizez)
  */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T6";
  vSizeTriangle = [];
  vSizeTriangle.push(  vSizeXYZS[0] , v__SizeXYZS[1] , v__SizeXYZS[2]);
  vSizeTriangle.push(  vSizeXYZS[0] , v__SizeXYZS[1] ,   vSizeXYZS[2]);
  vSizeTriangle.push(v__SizeXYZS[0] , v__SizeXYZS[1] , v__SizeXYZS[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PYRAMID - TRIANGLE 6 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  // v3DOutArr.push(calcRecordJSON(vData))
  // v3DOutArr.push(calcRecordJSON(vTriangle2))
  // v3DOutArr.push(calcRecordJSON(vTriangle3))
  // v3DOutArr.push(calcRecordJSON(vTriangle4))

};
