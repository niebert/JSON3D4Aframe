//var vCreator3D = {}; Defined in index.html
// Pyramid does not respect size for repeating objects
// pyramids increase in size if they are far away.
// scale factor is not respected - pyramids do not scale for scale factor

vCreator3D.prism = function (v3DOutArr,vData,pSizeXYZ) {
  // Global scaling will be performed in calcRecordJSON() with push to v3DOutArr.
  var vSizeXYZ = cloneJSON(pSizeXYZ);
  var vGlobalScale = getGlobalScale();
  var vScale = vData.scale || parseFloatBig("1.0");
  vScale *= vGlobalScale; //
  console.log("a-prism: Global Scale="+vGlobalScale+" Object Scale="+(vData.scale || 1.0));
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
  var peak_front = [
    vZero,
    vSizeXYZ[1],
    vSizeXYZ[2] //front
  ];
  var peak_back = [
    vZero,
    vSizeXYZ[1],
    v__SizeXYZ[2] //back
  ];
  console.log("PRISM get3DRepeatedArray(): "+JSON.stringify(vData,null,4));
  //console.log("PRISM get3DRepeatedArray(): Peak Front="+JSON.stringify(peak_front,null,4));
  /* OK
    center peak
      (0,-sizey,0)
    1. Triangle
      (-sizex,-sizey,sizez)
      (sizex,-sizey,sizez)
      peak_front
  */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T1";
  //vSizeTriangle.push(peak[0],peak[1],peak[2]);
  vSizeTriangle.push(v__SizeXYZ[0] , v__SizeXYZ[1] , vSizeXYZ[2]);
  vSizeTriangle.push(  vSizeXYZ[0] , v__SizeXYZ[1] , vSizeXYZ[2]);
  vSizeTriangle.push(peak_front[0],peak_front[1],peak_front[2]);
  //vSizeTriangle = cloneJSON(peak);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PRISM - TRIANGLE 1 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));
  /* Right1
    2. Triangle back
      peak_back
      (sizex,-sizey,  sizez)
      (sizex,-sizey, -sizez)
  */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T2R1"; //side right
  vSizeTriangle = cloneJSON(peak_back);
  vSizeTriangle.push( vSizeXYZ[0] , v__SizeXYZ[1] ,   vSizeXYZ[2]);
  vSizeTriangle.push( vSizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PRISM - TRIANGLE 2R1 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));
  /* Right2
    2. Triangle back
      peak_back
      peak_front
      (sizex,-sizey,  sizez)
  */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T2R1"; //side right
  vSizeTriangle = cloneJSON(peak_back);
  //vSizeTriangle.push(cloneJSON(peak_front));
  vSizeTriangle.push(peak_front[0],peak_front[1],peak_front[2]);
  vSizeTriangle.push( vSizeXYZ[0] , v__SizeXYZ[1] ,   vSizeXYZ[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PRISM - TRIANGLE 2R2 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  /*
  3. Triangle
    peak_back
    ( sizex,-sizey, -sizez)
    (-sizex,-sizey, -sizez)
  */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T3";
  vSizeTriangle = cloneJSON(peak_back);
  vSizeTriangle.push(   vSizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  vSizeTriangle.push( v__SizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  //vSizeTriangle.push(peak[0],peak[1],peak[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PRISM - TRIANGLE 3 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  /* Left1
   4. Triangle left1
      peak_front
      (-sizex,-sizey, -sizez)
      (-sizex,-sizey,  sizez)
    */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T4L1"; //side left
  vSizeTriangle = cloneJSON(peak_front);
  vSizeTriangle.push( v__SizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  vSizeTriangle.push( v__SizeXYZ[0] , v__SizeXYZ[1] ,   vSizeXYZ[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PRISM - TRIANGLE 4L1 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  /* Left2
   4. Triangle left2
      peak_front
      peak_back
      (-sizex,-sizey, -sizez)
    */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T4L2"; //side left
  vSizeTriangle = cloneJSON(peak_front);
  //vSizeTriangle.push( cloneJSON(peak_back));
  vSizeTriangle.push(peak_back[0],peak_back[1],peak_back[2]);
  vSizeTriangle.push( v__SizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PRISM - TRIANGLE 4L2 get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  /*
   5. Bottom Triangle
    ( sizex, -sizey,  sizez)
    (-sizex, -sizey,  sizez)
    (-sizex, -sizey, -sizez)
    */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T5B"; //bottom
  vSizeTriangle = [];
  vSizeTriangle.push(  vSizeXYZ[0] , v__SizeXYZ[1] , vSizeXYZ[2]);
  vSizeTriangle.push(v__SizeXYZ[0] , v__SizeXYZ[1] , vSizeXYZ[2]);
  vSizeTriangle.push(v__SizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PRISM - TRIANGLE 5B get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  /*
   6. Bottom Triangle
      ( sizex, -sizey, -sizez)
      ( sizex, -sizey,  sizez)
      (-sizex, -sizey, -sizez)
  */
  vTriangle = cloneJSON(vData);
  vTriangle.id = vDOMID + "T6B"; //bottom
  vSizeTriangle = [];
  vSizeTriangle.push(  vSizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  vSizeTriangle.push(  vSizeXYZ[0] , v__SizeXYZ[1] ,   vSizeXYZ[2]);
  vSizeTriangle.push(v__SizeXYZ[0] , v__SizeXYZ[1] , v__SizeXYZ[2]);
  vTriangle.sizexyz = floatArr2String(vSizeTriangle);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("PRISM - TRIANGLE 6B get3DRepeatedArray(): "+JSON.stringify(vTriangle,null,4));

  // v3DOutArr.push(calcRecordJSON(vData))
  // v3DOutArr.push(calcRecordJSON(vTriangle2))
  // v3DOutArr.push(calcRecordJSON(vTriangle3))
  // v3DOutArr.push(calcRecordJSON(vTriangle4))
  return v3DOutArr;
};
