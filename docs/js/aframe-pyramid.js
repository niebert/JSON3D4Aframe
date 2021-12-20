//var vCreator3D = {}; Defined in index.html

vCreator3D.pyramid = function (v3DOutArr,vData,vSizeXYZ) {
  var vSizeXYZ = cloneJSON(pSizeXYZ);
  // Global scaling will be performed in calcRecordJSON() with push to v3DOutArr.
  var vGlobalScale = getGlobalScale();
  var vScale = vData.scale || parseFloatBig("1.0");
  vScale *= vGlobalScale; //
  console.log("a-pyramid: Global Scale="+vGlobalScale+" Object Scale="+(vData.scale || 1.0));
  vData.tagname = "a-triangle";
  var vDOMID = vData.id;
  // size x,z bottom rectangle
  // y height of pyramid
  // create 4 triangles
  //math.bignumber() with higher precision
  var vSizeTriangle = [];
  var vZero = parseFloatBig("0.0");
  var v__SizeXYZ = [-1.0,-1.0,-1.0];
  // half size positive for centre of 3D object 0.5
  // incorporate scaling of object and global scale
  //vSizeXYZ[0] = multBig(multBig("0.5",vScale),vSizeXYZ[0]);
  //vSizeXYZ[1] = multBig(multBig("0.5",vScale),vSizeXYZ[1]);
  //vSizeXYZ[2] = multBig(multBig("0.5",vScale),vSizeXYZ[2]);
  vSizeXYZ[0] = multBig(parseFloatBig("0.5"),vSizeXYZ[0]);
  vSizeXYZ[1] = multBig(parseFloatBig("0.5"),vSizeXYZ[1]);
  vSizeXYZ[2] = multBig(parseFloatBig("0.5"),vSizeXYZ[2]);
  // create negative value for pyramdid 3D object
  v__SizeXYZ[0] = multBig(parseFloatBig("-1"),vSizeXYZ[0]);
  v__SizeXYZ[1] = multBig(parseFloatBig("-1"),vSizeXYZ[1]);
  v__SizeXYZ[2] = multBig(parseFloatBig("-1"),vSizeXYZ[2]);
  /*
  var peak = [
    divideBig(vSizeXYZ[0],2),
    vSizeXYZ[1],
    divideBig(vSizeXYZ[2],2)
  ];
  */
  var peak = [
    vZero,
    vSizeXYZ[1],
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
  vSizeTriangle.push(v__SizeXYZ[0] , v__SizeXYZ[1] , vSizeXYZ[2]);
  vSizeTriangle.push(  vSizeXYZ[0] , v__SizeXYZ[1] , vSizeXYZ[2]);
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
  vSizeTriangle.push( vSizeXYZ[0] , v__SizeXYZ[1] ,   vSizeXYZ[2]);
  vSizeTriangle.push( vSizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
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
  vSizeTriangle.push(   vSizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  vSizeTriangle.push( v__SizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
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
  vSizeTriangle.push( v__SizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  vSizeTriangle.push( v__SizeXYZ[0] , v__SizeXYZ[1] ,   vSizeXYZ[2]);
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
  vSizeTriangle.push(  vSizeXYZ[0] , v__SizeXYZ[1] , vSizeXYZ[2]);
  vSizeTriangle.push(v__SizeXYZ[0] , v__SizeXYZ[1] , vSizeXYZ[2]);
  vSizeTriangle.push(v__SizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
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
  vSizeTriangle.push(  vSizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  vSizeTriangle.push(  vSizeXYZ[0] , v__SizeXYZ[1] ,   vSizeXYZ[2]);
  vSizeTriangle.push(v__SizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PYRAMID - TRIANGLE 6 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  // v3DOutArr.push(calcRecordJSON(vData))
  // v3DOutArr.push(calcRecordJSON(vTriangle2))
  // v3DOutArr.push(calcRecordJSON(vTriangle3))
  // v3DOutArr.push(calcRecordJSON(vTriangle4))

};
