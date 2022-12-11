// ARC = ENITITY
// -------------
// arc will be stored in an entity and then handled as entity
// handling an entity means moving, scaling, ...



function add_3D_point(pVert4Triangle,p3D_point) {
  // add vertices for a triangle
  pVert4Triangle.push(p3D_point[0],p3D_point[1],p3D_point[2]);
  return pVert4Triangle;
}
//var vCreator3D = {}; Defined in index.html
function add_polygon4(v3DOutArr,vData,pTopRight,pTopLeft,pBottomLeft,pBottomRight) {
  //alert("add_polygon4() - TL=("+pTopLeft.join(",")+") TR=("+pTopRight.join(",")+")\nBL=("+pBottomLeft.join(",")+") BR=("+pBottomRight.join(",")+")")
  // fCurveTop(t) and fCurveBottom(t) define a mapping from intervall t in [0,1] to f(t) in IR^3
  // the polygon consists of 4 points in the 3D space
  // the polygon consists of 2 triangles in the 3D space
  var vDOMID = vData.id;
  // add 1. triangle in the front view
  //    bottom 1 point at pStart
  //    top 2 points at pStart and pEnd
  // Coordinate System left - to right +
  // a triangle consists of vertex-a,vetex-b, vertex-c
  // with the defaults relative to the 3D reference point [0,0,0]
  //   vertex-a=[0,0.5.0]
  //   vertex-a=[-0.5,-0.5.0]
  //   vertex-a=[0.5,-0.5.0]
  // The vertices are generated with the curve functions that return 3D points
  // at the curve.
  // two triangles a create polygon with 4 vertices (quadrilateral)
  vTriangle = cloneJSON(vData);
  vTriangle.tagname = "a-triangle";
  vTriangle.id = vDOMID + "ARC4T1";
  // vSizeTriangle is an array of three 3D points (=9 real value)
  // vSizeTriangle will be used to create vertex-a, vertex-b, vertex-c
  // for the triangle
  var vVert4Triangle1 = [];
  vVert4Triangle1 = add_3D_point(vVert4Triangle1,pTopRight);
  vVert4Triangle1 = add_3D_point(vVert4Triangle1,pTopLeft);
  vVert4Triangle1 = add_3D_point(vVert4Triangle1,pBottomLeft);
  //vSizeTriangle = cloneJSON(peak);
  vTriangle.sizexyz = floatArr2String(vVert4Triangle1);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("ARC4 - POLYGON 1: "+JSON.stringify(vTriangle,null,4));

  // add 2. triangle in the front view
  //    bottom 2 points at pStart and pEnd
  //   top 1 point at pEnd
  vTriangle = cloneJSON(vData);
  vTriangle.tagname = "a-triangle";
  vTriangle.id = vDOMID + "ARC4T2";
  // vSizeTriangle is an array of three 3D points (=9 real value)
  // vSizeTriangle will be used to create vertex-a, vertex-b, vertex-c
  // for the triangle
  var vVert4Triangle2 = [];
  vVert4Triangle2 = add_3D_point(vVert4Triangle2,pBottomLeft);
  vVert4Triangle2 = add_3D_point(vVert4Triangle2,pBottomRight);
  vVert4Triangle2 = add_3D_point(vVert4Triangle2,pTopRight);
  //vSizeTriangle = cloneJSON(peak);
  vTriangle.sizexyz = floatArr2String(vVert4Triangle2);
  v3DOutArr.push(calcRecordJSON(vTriangle));
  console.log("ARC4 - POLYGON 2: "+JSON.stringify(vTriangle,null,4));
  return v3DOutArr;
};

function get_3D_point4size(vSizeXYZS,vPosXYZ) {
  // vPosXYZ is a 3D vector that contains real values as string
  // that express the position relatively to the Size
  var vPoint = ["x","y","z"];
  for (var i = 0; i < vPosXYZ.length; i++) {
    vPoint[i] = multBig(parseFloatBig(vPosXYZ[i]),vSizeXYZS[i]);
  }
  return vPoint;
};

function convexcombination(t,vLeft,vRight) {
  var vPoint = ["1.0","2.0","3.0"];
  //alert("t="+t+" Left=("+vLeft.join(",")+") Right=("+vRight.join(",")+")");
  if (vLeft && vRight) {
    var tc = 1-t;
    for (var i = 0; i < 3; i++) {
      vPoint[i] = addBig( multBig(parseFloatBig(""+tc),vLeft[i]) , multBig(parseFloatBig(""+t), vRight[i]) );
    };
    //alert("convexcombination(t) t="+t+" Point=("+vPoint.join(",")+") Left=("+vLeft.join(",")+") Right=("+vRight.join(",")+")");
  } else {
    console.error("js/aframe-arc.js:82 - Missing parameters in convexcombination");
  }
  return vPoint;
};

function point_of_line4size(t,vSizeXYZS,vPos1XYZ,vPos2XYZ) {
  /*
    Left=(-sizex, sizey, 0.5*sizez)
    Right=(sizex, sizey, 0.5*sizez)
  */
  var vLeft = get_3D_point4size(vSizeXYZS,vPos1XYZ);
  var vRight = get_3D_point4size(vSizeXYZS,vPos2XYZ);
  var vPoint = convexcombination(t,vLeft,vRight);
  /*
  vLeft[0] = multBig(parseFloatBig("-1.0"),vSizeXYZS[0]);
  vLeft[1] = multBig(parseFloatBig("1.0"),vSizeXYZS[1]);
  vLeft[2] = multBig(parseFloatBig("0.5"),vSizeXYZS[2]);

  vRight[0] = multBig(parseFloatBig("1.0"),vSizeXYZS[0]);
  vRight[1] = multBig(parseFloatBig("1.0"),vSizeXYZS[1]);
  vRight[2] = multBig(parseFloatBig("0.5"),vSizeXYZS[2]);

  var tc = 1-t;
  vLeft[0] = multBig(parseFloatBig(""+tc),vLeft[0]);
  vLeft[1] = multBig(parseFloatBig(""+tc),vLeft[1]);
  vLeft[2] = multBig(parseFloatBig(""+tc),vLeft[2]);

  vRight[0] = multBig(parseFloatBig(""+t),vRight[0]);
  vRight[1] = multBig(parseFloatBig(""+t),vRight[1]);
  vRight[2] = multBig(parseFloatBig(""+t),vRightt[2]);

  vPoint[0] = addBig(vLeft[0],vRight[0]);
  vPoint[1] = addBig(vLeft[1],vRight[1]);
  vPoint[2] = addBig(vLeft[2],vRightt[2]);
  */
  return vPoint;
}

function curved_plane (v3DOutArr,vData,pSizeXYZS,options) {
  //alert("curved_plane(pSizeXYZS) pSizeXYZS=("+pSizeXYZS.join(",")+")")
  /*
  fCurveTop,fCurveBottom are functions with the domain [0,1]
  implementing a convexcombination in IR^3
  pSegmentation is an integer number defines the number of segnments in which
  the interval [0,1] is decomposed, default value is 5, i.e. it decomposes the
  interval [0,1] in 6 values t=0.0, 0.2, 0.4, 0.6, 0.8, 1.0 with t_step=1/5
  the plane will be triangluated with the vertices defined by
  - fCurveTop(t) at the top
  -++ fCurveBottom(t) at the bottom

  vData defines the sizes of the source object defined in JSON3D4Aframe

  the generated triangles will be pushed to the array "v3DOutArr" of AFrame primitives
  */
  if (options) {
    var fCurveTop = options.fCurveTop;
    var fCurveBottom = options.fCurveBottom;

    var vSegmentation = options.segmentation || 4;
    if (vSegmentation < 1) {
      vSegmentation = 1;
    }
    var t_step = 1/(vSegmentation);
    for (var i = 0; i < vSegmentation; i++) {
      var vSizeXYZS = cloneJSON(pSizeXYZS);
      //alert("("+i+") curved_plane(pSizeXYZS) vSizeXYZS=("+vSizeXYZS.join(",")+")")
      // calculate the 4 points of a polygon (quadrilateral)
      // by the  bottom and top curve
      //alert("(0) curved_plane(pSizeXYZS) vSizeXYZS=("+vSizeXYZS.join(",")+")")
      var vTopLeft     = fCurveTop(i*t_step,vSizeXYZS);
      //alert("(1) curved_plane(pSizeXYZS) vSizeXYZS=("+vSizeXYZS.join(",")+")")
      var vTopRight    = fCurveTop((i+1)*t_step,vSizeXYZS);
      //alert("(2) curved_plane(pSizeXYZS) conv_comb done - TL=("+vTopLeft.join(",")+") TR=("+vTopRight.join(",")+")")
      //alert("(2) curved_plane(pSizeXYZS) vSizeXYZS=("+vSizeXYZS.join(",")+")")
      var vBottomLeft  = fCurveBottom(i*t_step,vSizeXYZS);
      //alert("(3) curved_plane(pSizeXYZS) vSizeXYZS=("+vSizeXYZS.join(",")+")")
      var vBottomRight = fCurveBottom((i+1)*t_step,vSizeXYZS);
      //alert("(4) curved_plane(pSizeXYZS) vBottomRight=("+vBottomRight.join(",")+")")
      //alert("(4) curved_plane(pSizeXYZS) vSizeXYZS=("+vSizeXYZS.join(",")+")")
      // add the polygon to the 3D objects
      //alert("curved_plane("+i+") t="+(i*t_step)+"\nTL=("+vTopLeft.join(",")+") TR=("+vTopRight.join(",")+")\nBL=("+vBottomLeft.join(",")+") BR=("+vBottomRight.join(",")+")")
      // (v3DOutArr,vData,pTopRight,pTopLeft,pBottomLeft,pBottomRight)
      v3DOutArr = add_polygon4(v3DOutArr,vData,vTopRight,vTopLeft,vBottomLeft,vBottomRight);
    }
  } else {
    alert("CALL: curved_plane() options not defined")
  }
  return v3DOutArr;
};

function oval4arc (t,pSizeXYZS,pPos4Z,pStartAngle,pStopAngle) {
  //alert("oval4arc(oval4arc ("+t+",pSizeXYZS,"+pPos4Z+","+pStartAngle+","+pStopAngle+")");
  var x = Math.PI*2*(pStartAngle/360 *(1-t) + t * pStopAngle/360);
  //var x = tAngle;
  // creates an oval in the x,y plane
  // zPos = 1 -1  0 of z-Size places the oval
  // options.angle4start is the start angle
  // options.angle4stop is the stop angle
  // 360 degrees is a full oval
  // half size positive for centre of 3D object 0.5
  // incorporate scaling of object and global scale
  //vSizeXYZS[0] = multBig(multBig("0.5",vScale),vSizeXYZS[0]);
  //vSizeXYZS[1] = multBig(multBig("0.5",vScale),vSizeXYZS[1]);
  //vSizeXYZS[2] = multBig(multBig("0.5",vScale),vSizeXYZS[2]);

  var vRadiusX = multBig(parseFloatBig("0.5"),pSizeXYZS[0]);
  var vRadiusY = multBig(parseFloatBig("0.5"),pSizeXYZS[1]);
  var vSizeZ   = multBig(parseFloatBig("0.5"),pSizeXYZS[2]);
  //vSizeXYZS[3] = parseIntBig(vSizeXYZS[3]);
  // create negative value for pyramdid 3D object
  //v__SizeXYZS[0] = multBig(parseFloatBig("-1"),vSizeXYZS[0]);
  //__SizeXYZS[1] = multBig(parseFloatBig("-1"),vSizeXYZS[1]);
  // z-ccordinate is constant
  var vPoint = ["1.0","1.0","1.0"];
  //vPoint[0] = ""+(Math.cos(x)*vRadiusX);
  //vPoint[1] = ""+(Math.sin(x),vRadiusY);
  //vPoint[2] = ""+(parseFloat(pPos4Z),vSizeZ); // this means front trace of arc
  vPoint[0] = multBig(""+Math.cos(x),vRadiusX);
  vPoint[1] = multBig(""+Math.sin(x),vRadiusY);
  vPoint[2] = multBig(parseFloatBig(pPos4Z),vSizeZ); // this means front trace of arc

  // arc will be stored in an entity and then handled as entity
  //alert("oval4arc("+t+",("+pSizeXYZS.join(",")+"),"+pPos4Z+","+pStartAngle+","+pStopAngle+")\nvPoint=("+vPoint.join(",")+")");
  return vPoint;
};

function oval4arc_explicit (t,pSizeXYZS,pPos4Z,pStartAngle,pStopAngle) {
  //alert("oval4arc(oval4arc ("+t+",pSizeXYZS,"+pPos4Z+","+pStartAngle+","+pStopAngle+")");
  //var vStart2Pi = Math.PI*2*(pStartAngle/360);
  //var vStop2Pi  = Math.PI*2*(pStopAngle/360);
  var vSizeZ   = multBig(parseFloatBig("0.5"),pSizeXYZS[2]);
  var tx = (2.0*t-1.0)*(-1);
  var x = (t-0.5)*parseFloat(pSizeXYZS[0]);
  var b = (0.5)*parseFloat(pSizeXYZS[1]);
  var y = b* Math.sqrt(1-tx^2);
  var z = multBig(parseFloatBig(pPos4Z),vSizeZ); // this means front trace of arc
  //alert("x="+x+" y="+y+" z="+z);
  var vPoint = [x,y,z];
  //var vPoint = oval4arc_trigonometric(tAngle,pSizeXYZS,pPos4Z,pStartAngle,pStopAngle);
  // arc will be stored in an entity and then handled as entity
  //alert("oval4arc("+t+",("+pSizeXYZS.join(",")+"),"+pPos4Z+","+pStartAngle+","+pStopAngle+")\nvPoint=("+vPoint.join(",")+")");
  return vPoint;
};

function calc_point4curve (pPoint,pSize_XYZS) {
  pPoint[0] = multBig(parseFloatBig(pPoint[0]),pSize_XYZS[0]);
  pPoint[1] = multBig(parseFloatBig(pPoint[1]) ,pSize_XYZS[1]);
  pPoint[2] = multBig(parseFloatBig(pPoint[2]) ,pSize_XYZS[2]);
  return pPoint;
}

function curve_top_front(t,pSize_XYZS) {
  //alert("arc_front() fCurveTop("+t+",pSize_XYZS) pSize_XYZS=("+pSize_XYZS.join(",")+")")
  var vLeft  = calc_point4curve(["-0.5","0.5","0.5"],pSize_XYZS); // front left
  var vRight = calc_point4curve(["0.5","0.5","0.5"],pSize_XYZS);
  var vPoint = convexcombination(t,vLeft,vRight);
  //alert("arc_front() fCurveTop("+t+",pSize_XYZS) vPoint=("+vPoint.join(",")+")\nvLeft=("+vLeft.join(",")+") vRight=("+vRight.join(",")+")")
  return vPoint;
  //return oval4arc(t,pSize_XYZS,"+1",0,180);
};

function curve_top_rear(t,pSize_XYZS) {
  //alert("arc_front() fCurveTop("+t+",pSize_XYZS) pSize_XYZS=("+pSize_XYZS.join(",")+")")
  var vLeft  = calc_point4curve(["-0.5","0.5","-0.5"],pSize_XYZS); // front left
  var vRight = calc_point4curve(["0.5","0.5","-0.5"],pSize_XYZS);
  var vPoint = convexcombination(t,vLeft,vRight);
  //alert("arc_front() fCurveTop("+t+",pSize_XYZS) vPoint=("+vPoint.join(",")+")\nvLeft=("+vLeft.join(",")+") vRight=("+vRight.join(",")+")")
  return vPoint;
  //return oval4arc(t,pSize_XYZS,"+1",0,180);
};

function curve_top_right(t,pSize_XYZS) {
  //alert("arc_front() fCurveTop("+t+",pSize_XYZS) pSize_XYZS=("+pSize_XYZS.join(",")+")")
  var vFront  = calc_point4curve(["0.5","0.5","0.5"],pSize_XYZS); // front left
  var vRear = calc_point4curve(["0.5","0.5","-0.5"],pSize_XYZS);
  var vPoint = convexcombination(t,vFront,vRear);
  //alert("curve_top_right("+t+",pSize_XYZS) vPoint=("+vPoint.join(",")+")")
  return vPoint;
  //return oval4arc(t,pSize_XYZS,"+1",0,180);
};
function curve_top_left(t,pSize_XYZS) {
  //alert("arc_front() fCurveTop("+t+",pSize_XYZS) pSize_XYZS=("+pSize_XYZS.join(",")+")")
  var vFront  = calc_point4curve(["-0.5","0.5","0.5"],pSize_XYZS); // front left
  var vRear = calc_point4curve(["-0.5","0.5","-0.5"],pSize_XYZS);
  var vPoint = convexcombination(t,vFront,vRear);
  //alert("arc_front() fCurveTop("+t+",pSize_XYZS) vPoint=("+vPoint.join(",")+")\nvLeft=("+vLeft.join(",")+") vRight=("+vRight.join(",")+")")
  return vPoint;
  //return oval4arc(t,pSize_XYZS,"+1",0,180);
};

vCreator3D.get_segmentation4curve = function () {
  return 20;
}

vCreator3D.arc_front = function (v3DOutArr,vData,pSizeXYZS) {
  var vSizeXYZS = cloneJSON(pSizeXYZS);
  var options = {
    "segmentation": this.get_segmentation4curve(),
    "sizexyz": vSizeXYZS
  };

  options.fCurveBottom = function (t,pSize_XYZS) {
      return oval4arc(1-t,pSize_XYZS,"+1",0,180);
  };
  options.fCurveTop = function (t,pSize_XYZS) {
    var vPoint = oval4arc(1-t,pSize_XYZS,"+1",0,180);
    vPoint[1] = multBig(parseFloatBig("0.5") ,pSize_XYZS[1]);
    return vPoint;
  };
  v3DOutArr = curved_plane (v3DOutArr,vData,vSizeXYZS,options);

  return v3DOutArr;
};

vCreator3D.arc_bottom = function (v3DOutArr,vData,pSizeXYZS) {
  var vSizeXYZS = cloneJSON(pSizeXYZS);
  var options = {
    "segmentation": this.get_segmentation4curve(),
    "sizexyz": vSizeXYZS
  };

  options.fCurveBottom = function (t,pSize_XYZS) {
      return oval4arc(t,pSize_XYZS,"+1",0,180);
  };
  options.fCurveTop = function (t,pSize_XYZS) {
    return oval4arc(t,pSize_XYZS,"-1",0,180);
  };
  v3DOutArr = curved_plane (v3DOutArr,vData,vSizeXYZS,options);

  return v3DOutArr;
};

vCreator3D.arc_rear = function (v3DOutArr,vData,pSizeXYZS) {
  var vSizeXYZS = cloneJSON(pSizeXYZS);
  var options = {
    "segmentation":this.get_segmentation4curve(),
    "sizexyz": vSizeXYZS
  };

  options.fCurveBottom = function (t,pSize_XYZS) {
      return oval4arc(t,pSize_XYZS,"-1",0,180);
  };
  options.fCurveTop = function (t,pSize_XYZS) {
    var vPoint = oval4arc(t,pSize_XYZS,"-1",0,180);
    vPoint[1] = multBig(parseFloatBig("0.5") ,pSize_XYZS[1]);
    return vPoint;
  }
  v3DOutArr = curved_plane (v3DOutArr,vData,vSizeXYZS,options);

  return v3DOutArr;
};

vCreator3D.arc_top = function (v3DOutArr,vData,pSizeXYZS) {
  var vSizeXYZS = cloneJSON(pSizeXYZS);
  var options = {
    "segmentation":1,
    "sizexyz": vSizeXYZS
  };

  options.fCurveBottom = function (t,pSize_XYZS) {
      return curve_top_rear(1-t,pSize_XYZS);
  };
  options.fCurveTop = function (t,pSize_XYZS) {
    return curve_top_front(1-t,pSize_XYZS);
  }
  v3DOutArr = curved_plane (v3DOutArr,vData,vSizeXYZS,options);

  return v3DOutArr;
};

vCreator3D.arc_right = function (v3DOutArr,vData,pSizeXYZS) {
  var vSizeXYZS = cloneJSON(pSizeXYZS);
  var options = {
    "segmentation":1,
    "sizexyz": vSizeXYZS
  };

  options.fCurveTop = function (t,pSize_XYZS) {
      return curve_top_right(t,pSize_XYZS);
  };
  options.fCurveBottom = function (t,pSize_XYZS) {
    var vPoint = curve_top_right(t,pSize_XYZS);
    vPoint[1] =  0;//multBig(parseFloatBig("0.5") ,pSize_XYZS[1]);
    return vPoint;
  }
  v3DOutArr = curved_plane (v3DOutArr,vData,vSizeXYZS,options);

  return v3DOutArr;
};

vCreator3D.arc_left = function (v3DOutArr,vData,pSizeXYZS) {
  var vSizeXYZS = cloneJSON(pSizeXYZS);
  var options = {
    "segmentation":1,
    "sizexyz": vSizeXYZS
  };

  options.fCurveTop = function (t,pSize_XYZS) {
      return curve_top_left(1-t,pSize_XYZS);
  };
  options.fCurveBottom = function (t,pSize_XYZS) {
    var vPoint = curve_top_left(1-t,pSize_XYZS);
    vPoint[1] =  0;//multBig(parseFloatBig("0.5") ,pSize_XYZS[1]);
    return vPoint;
  }
  v3DOutArr = curved_plane (v3DOutArr,vData,vSizeXYZS,options);

  return v3DOutArr;
};

vCreator3D.arc = function (v3DOutArr,vData,pSizeXYZS) {
  var vSizeXYZS = cloneJSON(pSizeXYZS);
  // Global scaling will be performed in calcRecordJSON() with push to v3DOutArr.
  var vGlobalScale = getGlobalScale();
  var vScale = vData.scale || parseFloatBig("1.0");
  //vScale = multBig(vScale,vGlobalScale); //
  vScale *= vGlobalScale; //
  console.log("a-arc: Global Scale="+vGlobalScale+" Object Scale="+(vData.scale || 1.0));
  vData.tagname = "a-triangle";
  var vCount = 0;
  var vDOMID = vData.id;

  v3DOutArr = this.arc_front(v3DOutArr,vData,vSizeXYZS);
  v3DOutArr = this.arc_rear(v3DOutArr,vData,pSizeXYZS);
  v3DOutArr = this.arc_top(v3DOutArr,vData,pSizeXYZS);
  v3DOutArr = this.arc_bottom(v3DOutArr,vData,pSizeXYZS);
  v3DOutArr = this.arc_left(v3DOutArr,vData,pSizeXYZS);
  v3DOutArr = this.arc_right(v3DOutArr,vData,pSizeXYZS);

  return v3DOutArr;
}
