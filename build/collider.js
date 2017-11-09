var Collider =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = {
  system: {
    maxPlanesPerMesh: 100
  },
  quadrants: {
    size: {
      x: 100,
      y: 100,
      z: 100
    }
  },
  plane: {
    dotBuffer: 0.001,
    collisionThreshold: 0.5
  },
  sandbox: {
    physics: {
      gravity: 20,
      maxVelocity: 50,
      floor: -0.5,
      snapUp: 1,
      snapDown: 0.5,
      minSlope: Math.PI / 5,
      noclip: false
    },
    player: {
      height: 2,
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      rotation: {
        pitch: 0,
        yaw: Math.PI,
        roll: 0,
        maxPitch: Math.PI * 0.4,
        minPitch: Math.PI * -0.4
      },
      speed: {
        normal: 8,
        slowed: 4,
        noclip: 20,
        rotation: Math.PI * 0.75,
        jump: 10,
        fallTimerThreshold: 0.2
      }
    },
    camera: {
      fov: 60,
      aspect: 1,
      near: 0.1,
      far: 10000
    },
    adjust: {
      verySlow: 0.01,
      slow: 0.025,
      normal: 0.05,
      fast: 0.09,
      rapid: 0.12,
      veryFast: 0.2
    }
  }
};

exports.default = Config;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var twoPi = Math.PI * 2;

var copyVector = function copyVector(vec) {
  var copied = new THREE.Vector3(vec.x, vec.y, vec.z);

  return copied;
};

var addVector = function addVector(a, b) {
  var c = new THREE.Vector3(a.x + b.x, a.y + b.y, a.z + b.z);

  return c;
};

var subtractVector = function subtractVector(a, b) {
  var c = new THREE.Vector3(a.x - b.x, a.y - b.y, a.z - b.z);

  return c;
};

var normalise = function normalise(a) {
  var mag = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);

  if (mag == 0) {
    return new THREE.Vector3(0, 0, 0);
  } else {
    return new THREE.Vector3(a.x / mag, a.y / mag, a.z / mag);
  }
};

var normalise2 = function normalise2(a) {
  var mag = Math.sqrt(a.x * a.x + a.y * a.y);

  if (mag == 0) {
    return new THREE.Vector2(0, 0);
  } else {
    return new THREE.Vector2(a.x / mag, a.y / mag);
  }
};

var reverseVector = function reverseVector(a) {
  a.x *= -1;
  a.y *= -1;
  a.z *= -1;

  return a;
};

var distanceBetween = function distanceBetween(a, b) {
  var d = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2));

  return d;
};

var distanceBetween2D = function distanceBetween2D(a, b) {
  var dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2));

  return dist;
};

var pitchBetween = function pitchBetween(a, b) {
  var xz = distanceBetween2D(a, b);
  var y = b.y - a.y;
  var pitch = Math.atan2(y, xz);

  return pitch;
};

var scaleVector = function scaleVector(v, scale) {
  var vec = new THREE.Vector3(v.x * scale, v.y * scale, v.z * scale);

  return vec;
};

var isVectorEqual = function isVectorEqual(a, b) {
  return a.x === b.x && a.y === b.y & a.z === b.z;
};

var crossProduct = function crossProduct(a, b) {
  var c = new THREE.Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);

  return c;
};

var minAngleDifference = function minAngleDifference(a1, a2) {
  var angle = Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1));

  return angle;
};

var dotProduct = function dotProduct(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

var dotProduct2 = function dotProduct2(a, b) {
  return a.x * b.x + a.y * b.y;
};

exports.copyVector = copyVector;
exports.isVectorEqual = isVectorEqual;
exports.pitchBetween = pitchBetween;
exports.twoPi = twoPi;
exports.distanceBetween = distanceBetween;
exports.distanceBetween2D = distanceBetween2D;
exports.minAngleDifference = minAngleDifference;
exports.dotProduct = dotProduct;
exports.dotProduct2 = dotProduct2;
exports.addVector = addVector;
exports.subtractVector = subtractVector;
exports.scaleVector = scaleVector;
exports.crossProduct = crossProduct;
exports.reverseVector = reverseVector;
exports.normalise = normalise;
exports.normalise2 = normalise2;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Logger = function Logger() {
  this.cvs = document.createElement('canvas');
  this.ctx = this.cvs.getContext('2d');
  this.init();
};

Logger.prototype = {
  init: function init() {
    document.body.append(this.cvs);
    this.setStyle();
  },

  setStyle: function setStyle() {
    this.cvs.style.position = 'fixed';
    this.cvs.width = window.innerWidth;
    this.cvs.style.pointerEvents = 'none';
    this.cvs.height = 400;
    this.cvs.style.zIndex = 10;
    this.cvs.style.top = 0;
    this.cvs.style.left = 0;
  },

  clear: function clear() {
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
  },

  format: function format(value) {
    return Math.floor(value * 10) / 10;
  },

  formatVector: function formatVector(vec) {
    return this.format(vec.x) + ', ' + this.format(vec.y) + ', ' + this.format(vec.z);
  },

  print: function print() {
    this.clear();

    for (var i = 0; i < arguments.length; i += 1) {
      this.ctx.fillText(arguments[i], 20, 20 + i * 20);
    }
  }
};

exports.default = Logger;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = exports.Logger = exports.Player = exports.System = exports.Mesh = undefined;

var _Mesh = __webpack_require__(4);

var _Mesh2 = _interopRequireDefault(_Mesh);

var _System = __webpack_require__(7);

var _System2 = _interopRequireDefault(_System);

var _Player = __webpack_require__(9);

var _Player2 = _interopRequireDefault(_Player);

var _Logger = __webpack_require__(2);

var _Logger2 = _interopRequireDefault(_Logger);

var _Loader = __webpack_require__(11);

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Mesh = _Mesh2.default;
exports.System = _System2.default;
exports.Player = _Player2.default;
exports.Logger = _Logger2.default;
exports.Loader = _Loader2.default;

// graphics
/**
 * @author meatbags / https://github.com/meatbags
*/

// physics

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Config = __webpack_require__(0);

var _Config2 = _interopRequireDefault(_Config);

var _Plane = __webpack_require__(5);

var _Plane2 = _interopRequireDefault(_Plane);

var _Transformer = __webpack_require__(6);

var _Transformer2 = _interopRequireDefault(_Transformer);

var _Maths = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mesh = function Mesh(object) {
  this.isColliderMesh = true;

  if (object.geometry.isBufferGeometry) {
    this.geometry = object.geometry;
    this.box = new THREE.Box3().setFromBufferAttribute(object.geometry.attributes.position);
    this.min = this.box.min;
    this.max = this.box.max;
    this.planes = [];
    this.transform = new _Transformer2.default(object);
    this.generatePlanes();
  } else {
    throw 'Error: Input is not THREE.BufferGeometry';
  }
};

Mesh.prototype = {
  generatePlanes: function generatePlanes() {
    // create planes from buffer geometry attribute

    var verts = this.geometry.attributes.position.array;
    var norms = this.geometry.attributes.normal.array;

    if (this.geometry.index) {
      // handle indexed geometry
      var indices = this.geometry.index.array;
      var size = this.geometry.attributes.position.itemSize;
      var step = 3;

      for (var i = 0; i < indices.length; i += step) {
        var j = indices[i] * size;
        var k = indices[i + 1] * size;
        var l = indices[i + 2] * size;

        this.planes.push(new _Plane2.default(new THREE.Vector3(verts[j], verts[j + 1], verts[j + 2]), new THREE.Vector3(verts[k], verts[k + 1], verts[k + 2]), new THREE.Vector3(verts[l], verts[l + 1], verts[l + 2]), new THREE.Vector3(norms[j], norms[j + 1], norms[j + 2]), new THREE.Vector3(norms[k], norms[k + 1], norms[k + 2]), new THREE.Vector3(norms[l], norms[l + 1], norms[l + 2])));
      }
    } else {
      var _step = 9;

      for (var _i = 0; _i < verts.length; _i += _step) {
        this.planes.push(new _Plane2.default(new THREE.Vector3(verts[_i + 0], verts[_i + 1], verts[_i + 2]), new THREE.Vector3(verts[_i + 3], verts[_i + 4], verts[_i + 5]), new THREE.Vector3(verts[_i + 6], verts[_i + 7], verts[_i + 8]), new THREE.Vector3(norms[_i + 0], norms[_i + 1], norms[_i + 2]), new THREE.Vector3(norms[_i + 3], norms[_i + 4], norms[_i + 5]), new THREE.Vector3(norms[_i + 6], norms[_i + 7], norms[_i + 8])));
      }
    }
  },

  getCollision: function getCollision(point) {
    this.transform.set(point);

    if (this.box.containsPoint(this.transform.point)) {
      // reset
      for (var i = 0; i < this.planes.length; i += 1) {
        this.planes[i].culled = false;
      }

      // first pass - cull faces
      for (var _i2 = 0; _i2 < this.planes.length; _i2 += 1) {
        if (!this.planes[_i2].culled && this.planes[_i2].isPointBelowOrEqual(this.transform.point)) {
          // cull planes above plane
          for (var j = 0; j < this.planes.length; j += 1) {
            if (!this.planes[j].culled && j != _i2 && this.planes[_i2].isPlaneAbove(this.planes[j])) {
              this.planes[j].culled = true;
            }
          }
        }
      }

      // second pass - get result
      for (var _i3 = 0; _i3 < this.planes.length; _i3 += 1) {
        if (!this.planes[_i3].culled && !this.planes[_i3].isPointBelowOrEqual(this.transform.point)) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  },

  getCollision2D: function getCollision2D(point) {
    this.transform.set(point);

    return this.transform.point.x >= this.min.x && this.transform.point.x <= this.max.x && this.transform.point.z >= this.min.z && this.transform.point.z <= this.max.z;
  },

  getCeiling2D: function getCeiling2D(point) {
    this.transform.set(point);
    var y = null;

    for (var i = 0; i < this.planes.length; i += 1) {
      if (this.planes[i].containsPoint2D(this.transform.point)) {
        var planeCeiling = plane.getY(this.transform.point.x, this.transform.point.z);

        if (y === null || planeCeiling > y) {
          y = planeCeiling;
        }
      }
    }

    return y == null ? null : this.transform.reverseY(y);
  },

  getCeiling: function getCeiling(point) {
    // get ceiling *above* point
    this.transform.set(point);
    var y = null;

    for (var i = 0; i < this.planes.length; i += 1) {
      if (this.planes[i].containsPoint2D(this.transform.point) && this.planes[i].isPointBelowOrEqual(this.transform.point)) {
        var planeCeiling = plane.getY(this.transform.point.x, this.transform.point.z);

        if (planeCeiling >= this.transform.point.y && (y === null || planeCeiling < y)) {
          y = planeCeiling;
        }
      }
    }

    return y == null ? null : this.transform.reverseY(y);
  },

  getCeilingPlane: function getCeilingPlane(point) {
    // get ceiling and plane *above* point
    this.transform.set(point);
    var ceiling = null;

    for (var i = 0; i < this.planes.length; i += 1) {
      // check general box, then precise, then for ceiling
      if (this.planes[i].containsPoint2D(this.transform.point)) {

        if (this.planes[i].containsPointPrecise2D(this.transform.point) && this.planes[i].isPointBelowOrEqual(this.transform.point)) {
          var planeCeiling = this.planes[i].getY(this.transform.point.x, this.transform.point.z);

          if (planeCeiling != null && planeCeiling >= this.transform.point.y && (ceiling == null || planeCeiling > ceiling.y)) {
            ceiling = {
              y: planeCeiling,
              plane: this.planes[i]
            };
          }
        }
      }
    }

    return ceiling == null ? null : {
      y: this.transform.reverseY(ceiling.y),
      plane: ceiling.plane
    };
  },

  getIntersectPlane: function getIntersectPlane(p1, p2) {
    var tp1 = this.transform.getTransformedPoint(p1);
    var tp2 = this.transform.getTransformedPoint(p2);
    var box = new THREE.Box3().setFromPoints([tp1, tp2]);
    var intersectPlane = null;

    for (var i = 0; i < this.planes.length; i += 1) {
      if (this.planes[i].intersectsBox(box) || this.planes[i].containsBox(box)) {
        var intersect = this.planes[i].getIntersect(tp1, tp2);

        if (intersect != null) {
          var distance = (0, _Maths.distanceBetween)(tp1, intersect);

          if (intersectPlane === null || distance < intersectPlane.distance) {
            intersectPlane = {
              intersect: intersect,
              plane: this.planes[i],
              distance: distance
            };
          }
        }
      }
    }

    return intersectPlane == null ? null : {
      intersect: this.transform.reverse(intersectPlane.intersect),
      plane: intersectPlane.plane,
      distance: intersectPlane.distance
    };
  },

  getIntersectPlane2D: function getIntersectPlane2D(p1, p2) {
    // find 2D intersect *nearest* to p2
    var tp1 = this.transform.getTransformedPoint(p1);
    var tp2 = this.transform.getTransformedPoint(p2);
    var box = new THREE.Box3().setFromPoints([tp1, tp2]);
    var intersectPlane = null;

    for (var i = 0; i < this.planes.length; i += 1) {
      if (this.planes[i].intersectsBox(box) || this.planes[i].containsBox(box)) {
        var intersect2D = this.planes[i].getNormalIntersect2D(tp2);

        if (intersect2D != null) {
          var distance = (0, _Maths.distanceBetween)(tp2, intersect2D);

          if (intersectPlane === null || distance < intersectPlane.distance) {
            intersectPlane = {
              plane: this.planes[i],
              intersect: intersect2D,
              distance: distance
            };
          }
        }
      }
    }

    return intersectPlane == null ? null : {
      intersect: this.transform.reverse(intersectPlane.intersect),
      plane: intersectPlane.plane,
      distance: intersectPlane.distance
    };
  }
};

exports.default = Mesh;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Maths = __webpack_require__(1);

var Maths = _interopRequireWildcard(_Maths);

var _Config = __webpack_require__(0);

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Plane = function Plane(p1, p2, p3, n1, n2, n3) {
  this.p1 = p1;
  this.p2 = p2;
  this.p3 = p3;
  this.n1 = n1;
  this.n2 = n2;
  this.n3 = n3;
  this.culled = false;
  this.generatePlane();
};

Plane.prototype = {
  generatePlane: function generatePlane() {
    // edge data
    this.e1 = {};
    this.e2 = {};
    this.e3 = {};
    this.e1.centre = Maths.scaleVector(Maths.addVector(this.p1, this.p2), 0.5);
    this.e2.centre = Maths.scaleVector(Maths.addVector(this.p2, this.p3), 0.5);
    this.e3.centre = Maths.scaleVector(Maths.addVector(this.p3, this.p1), 0.5);
    this.e1.vec = Maths.subtractVector(this.p2, this.p1);
    this.e2.vec = Maths.subtractVector(this.p3, this.p2);
    this.e3.vec = Maths.subtractVector(this.p1, this.p3);

    // get 2D component & normal
    this.e1.vec2 = new THREE.Vector2(this.e1.vec.x, this.e1.vec.z);
    this.e2.vec2 = new THREE.Vector2(this.e2.vec.x, this.e2.vec.z);
    this.e3.vec2 = new THREE.Vector2(this.e3.vec.x, this.e3.vec.z);
    this.e1.norm2 = new THREE.Vector2(-this.e1.vec.z, this.e1.vec.x);
    this.e2.norm2 = new THREE.Vector2(-this.e2.vec.z, this.e2.vec.x);
    this.e3.norm2 = new THREE.Vector2(-this.e3.vec.z, this.e3.vec.x);

    // get normal
    this.normal = Maths.normalise(Maths.crossProduct(this.e3.vec, this.e1.vec));
    this.normalXZ = new THREE.Vector3(this.normal.x, 0, this.normal.z);

    // reverse naughty normals
    if (Maths.dotProduct(this.normal, this.n1) < 0 && Maths.dotProduct(this.normal, this.n2) < 0 && Maths.dotProduct(this.normal, this.n3) < 0) {
      this.normal = Maths.reverseVector(this.normal);
    }

    // get position
    this.position = new THREE.Vector3((this.p1.x + this.p2.x + this.p3.x) / 3, (this.p1.y + this.p2.y + this.p3.y) / 3, (this.p1.z + this.p2.z + this.p3.z) / 3);

    // cache D for solving plane
    this.D = -(this.normal.x * this.position.x) - this.normal.y * this.position.y - this.normal.z * this.position.z;

    // create bounding box
    this.box = new THREE.Box3().setFromPoints([this.p1, this.p2, this.p3]);
    this.boxExpanded = new THREE.Box3().setFromPoints([this.p1, this.p2, this.p3]).expandByScalar(_Config2.default.plane.surfaceCollisionThreshold);
  },

  isPointAbove: function isPointAbove(point) {
    // is point above plane

    var vec = Maths.subtractVector(point, this.position);
    var dot = Maths.dotProduct(vec, this.normal);
    var res = dot > 0;

    return res;
  },

  isPointBelow: function isPointBelow(point) {
    // is point below plane

    var vec = Maths.subtractVector(point, this.position);
    var dot = Maths.dotProduct(vec, this.normal);
    var res = dot < 0;

    return res;
  },

  isPointAboveOrEqual: function isPointAboveOrEqual(point) {
    // is point above plane or on surface

    var vec = Maths.subtractVector(point, this.position);
    var dot = Maths.dotProduct(vec, this.normal);
    var res = dot >= -_Config2.default.plane.dotBuffer;

    return res;
  },

  isPointBelowOrEqual: function isPointBelowOrEqual(point) {
    // is point below plane or on surface

    var vec = Maths.subtractVector(point, this.position);
    var dot = Maths.dotProduct(vec, this.normal);
    var res = dot <= _Config2.default.plane.dotBuffer;

    return res;
  },

  isPointOnSurface: function isPointOnSurface(point) {
    var vec = Maths.subtractVector(point, this.position);
    var dot = Maths.dotProduct(vec, this.normal);
    var res = dot <= _Config2.default.plane.dotBuffer && dot >= -_Config2.default.plane.dotBuffer;

    return res;
  },

  isPlaneAbove: function isPlaneAbove(plane) {
    // check if whole plane is above

    return this.isPointAboveOrEqual(plane.p1) && this.isPointAboveOrEqual(plane.p2) && this.isPointAboveOrEqual(plane.p3);
  },

  containsPoint: function containsPoint(point) {
    return this.box.containsPoint(point);
  },

  containsBox: function containsBox(box) {
    return this.box.containsBox(box);
  },

  intersectsBox: function intersectsBox(box) {
    return this.box.intersectsBox(box);
  },

  containsPoint2D: function containsPoint2D(point) {
    // is x, z inside bounding box
    return this.box.min.x <= point.x && this.box.max.x >= point.x && this.box.min.z <= point.z && this.box.max.z >= point.z;
  },

  containsPointPrecise2D: function containsPointPrecise2D(point) {
    if (Maths.dotProduct2({ x: point.x - this.e1.centre.x, y: point.z - this.e1.centre.z }, this.e1.norm2) < _Config2.default.plane.dotBuffer && Maths.dotProduct2({ x: point.x - this.e2.centre.x, y: point.z - this.e2.centre.z }, this.e2.norm2) < _Config2.default.plane.dotBuffer && Maths.dotProduct2({ x: point.x - this.e3.centre.x, y: point.z - this.e3.centre.z }, this.e3.norm2) < _Config2.default.plane.dotBuffer) {
      return true;
    }

    return false;
  },

  containsPointThreshold: function containsPointThreshold(point) {
    return this.boxExpanded.containsPoint(point);
  },

  distanceToPlane: function distanceToPlane(point) {
    return Math.abs(this.normal.x * point.x + this.normal.y * point.y + this.normal.z * point.z + this.D);
  },

  getIntersect: function getIntersect(p1, p2) {
    // get intersection of plane and line between p1, p2

    var vec = Maths.subtractVector(p2, p1);
    var dot = Maths.dotProduct(this.normal, Maths.normalise(vec));

    // check for parallel lines
    if (Math.abs(dot) <= _Config2.default.plane.dotBuffer) {
      return null;
    }

    var numPart = this.normal.x * p1.x + this.normal.y * p1.y + this.normal.z * p1.z + this.D;
    var denom = this.normal.x * vec.x + this.normal.y * vec.y + this.normal.z * vec.z;

    // invalid
    if (denom == 0) {
      return null;
    }

    var x = p1.x - vec.x * numPart / denom;
    var y = p1.y - vec.y * numPart / denom;
    var z = p1.z - vec.z * numPart / denom;
    var point = new THREE.Vector3(x, y, z);

    // return intersect if point is inside verts & line
    if (this.containsPoint(point)) {
      var box = new THREE.Box3().setFromPoints([p2, p1]).expandByScalar(0.05);

      if (box.containsPoint(point)) {
        return point;
      }
    }

    return null;
  },

  getNormalIntersect: function getNormalIntersect(point) {
    // get intersect which extends normal vector (or inverse) to point

    var point2 = Maths.addVector(point, this.normal);
    var vec = Maths.subtractVector(point2, point);
    var numPart = this.normal.x * point.x + this.normal.y * point.y + this.normal.z * point.z + this.D;
    var denom = this.normal.x * vec.x + this.normal.y * vec.y + this.normal.z * vec.z;
    var x = point.x - vec.x * numPart / denom;
    var y = point.y - vec.y * numPart / denom;
    var z = point.z - vec.z * numPart / denom;
    var intersect = new THREE.Vector3(x, y, z);

    return intersect;
  },

  getNormalIntersect2D: function getNormalIntersect2D(point) {
    // get 2D (xz) intersect which extends from point to surface

    var numPart = this.normal.x * point.x + this.normal.y * point.y + this.normal.z * point.z + this.D;
    var denom = this.normal.x * this.normal.x + this.normal.z * this.normal.z;

    if (denom == 0) {
      return null;
    } else {
      return new THREE.Vector3(point.x - this.normal.x * numPart / denom, point.y, point.z - this.normal.z * numPart / denom);
    }
  },


  getY: function getY(x, z) {
    // solve plane for x, z
    if (this.normal.y != 0) {
      return (this.normal.x * x + this.normal.z * z + this.D) / -this.normal.y;
    } else {
      return null;
    }
  },

  getPerpendicularNormals: function getPerpendicularNormals() {
    return {
      right: new THREE.Vector3(-this.normal.z, 0, this.normal.x),
      left: new THREE.Vector3(this.normal.z, 0, -this.normal.x)
    };
  }
};

exports.default = Plane;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Transformer = function Transformer(object) {
  this.point = new THREE.Vector3();
  this.position = object.position;
  this.rotation = object.rotation;
  this.scale = object.scale;
};

Transformer.prototype = {
  set: function set(point) {
    // transform point
    this.point.x = point.x - this.position.x;
    this.point.y = point.y - this.position.y;
    this.point.z = point.z - this.position.z;
  },

  getTransformedPoint: function getTransformedPoint(point) {
    var transformed = {
      x: point.x - this.position.x,
      y: point.y - this.position.y,
      z: point.z - this.position.z
    };

    return transformed;
  },

  reverseY: function reverseY(y) {
    var newY = y + this.position.y;

    return newY;
  },

  reverse: function reverse(point) {
    var transformed = {
      x: point.x + this.position.x,
      y: point.y + this.position.y,
      z: point.z + this.position.z
    };

    return transformed;
  }
};

exports.default = Transformer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Config = __webpack_require__(0);

var _Config2 = _interopRequireDefault(_Config);

var _Quadrants = __webpack_require__(8);

var _Quadrants2 = _interopRequireDefault(_Quadrants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// collision system - checks against all meshes
// meshes are divided into quadrants for efficiency
// recent collisions are cached

var System = function System() {
  this.quadrants = new _Quadrants2.default();
  this.isColliderSystem = true;
};

System.prototype = {
  add: function add() {
    // add mesh to quadrants

    for (var i = 0; i < arguments.length; i += 1) {
      var mesh = arguments[i];

      if (mesh.isColliderMesh) {
        if (mesh.planes.length <= _Config2.default.system.maxPlanesPerMesh) {
          this.quadrants.add(mesh);
        } else {
          console.warn('Warning: Mesh not included - plane count exceeds maximum (%s).', _Config2.default.system.maxPlanesPerMesh);
        }
      } else {
        throw 'Error: Input must be Collider.Mesh';
      }
    }
  },

  getCollision: function getCollision(point) {
    // check for collision at point

    var collision = false;
    var meshes = this.quadrants.getQuadrantMeshes(point);

    for (var i = 0; i < meshes.length; i += 1) {
      if (meshes[i].getCollision(point)) {
        collision = true;
        break;
      }
    }

    return collision;
  },

  getCollisionMeshes: function getCollisionMeshes(point) {
    // get all meshes which collide with point

    var collisions = [];
    var meshes = this.quadrants.getQuadrantMeshes(point);

    for (var i = 0; i < meshes.length; i += 1) {
      if (meshes[i].getCollision(point)) {
        collisions.push(meshes[i]);
      }
    }

    return collisions;
  },

  getCeilingPlane: function getCeilingPlane(point) {
    // get ceiling and corresponding plane *above* point

    var ceiling = null;
    var meshes = this.quadrants.getQuadrantMeshes(point);

    for (var i = 0; i < meshes.length; i += 1) {
      if (meshes[i].getCollision(point)) {
        var result = meshes[i].getCeilingPlane(point);

        if (result != null) {
          if (ceiling === null || result.y > ceiling.y) {
            ceiling = {
              y: result.y,
              plane: result.plane
            };
          }
        }
      }
    }

    return ceiling === null ? null : ceiling;
  }
};

exports.default = System;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Config = __webpack_require__(0);

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Quadrants = function Quadrants() {
  this.q = [];
}; // quadrant system for indexing large polygon groups

Quadrants.prototype = {
  positionToQuadrant: function positionToQuadrant(point) {
    // convert point to quadrant keys

    var keys = {
      x: Math.floor(point.x / _Config2.default.quadrants.size.x),
      y: Math.floor(point.y / _Config2.default.quadrants.size.y),
      z: Math.floor(point.z / _Config2.default.quadrants.size.z)
    };

    return keys;
  },

  add: function add(mesh) {
    // add a mesh to quadrant/s

    var min = this.positionToQuadrant(mesh.min);
    var max = this.positionToQuadrant(mesh.max);

    for (var x = min.x; x <= max.x; x += 1) {
      for (var y = min.y; y <= max.y; y += 1) {
        for (var z = min.z; z <= max.z; z += 1) {
          this.addToQuadrant(x, y, z, mesh);
        }
      }
    }
  },

  addToQuadrant: function addToQuadrant(x, y, z, mesh) {
    // if quadrant does not exist, create it

    if (!this.q[x]) {
      this.q[x] = [];
    }

    if (!this.q[x][y]) {
      this.q[x][y] = [];
    }

    if (!this.q[x][y][z]) {
      this.q[x][y][z] = [];
    }

    // add mesh to quadrant

    this.q[x][y][z].push(mesh);
  },


  getQuadrantMeshes: function getQuadrantMeshes(point) {
    // get quadrant for point

    var pq = this.positionToQuadrant(point);

    if (this.q[pq.x] && this.q[pq.x][pq.y] && this.q[pq.x][pq.y][pq.z]) {
      return this.q[pq.x][pq.y][pq.z];
    } else {
      return [];
    }
  }
};

exports.default = Quadrants;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Maths = __webpack_require__(1);

var Maths = _interopRequireWildcard(_Maths);

var _Interaction = __webpack_require__(10);

var _Interaction2 = _interopRequireDefault(_Interaction);

var _Config = __webpack_require__(0);

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Player = function Player(domElement) {
  this.domElement = domElement;
  this.config = _Config2.default.sandbox.player;
  this.config.adjust = _Config2.default.sandbox.adjust;
  this.config.physics = _Config2.default.sandbox.physics;
  this.position = new THREE.Vector3(this.config.position.x, this.config.position.y, this.config.position.z);
  this.rotation = {
    pitch: this.config.rotation.pitch,
    yaw: this.config.rotation.yaw,
    roll: this.config.rotation.roll
  };
  this.motion = new THREE.Vector3(0, 0, 0);
  this.offset = {
    rotation: {
      pitch: 0,
      yaw: 0,
      roll: 0
    }
  };
  this.target = {
    position: new THREE.Vector3(this.config.position.x, this.config.position.y, this.config.position.z),
    rotation: {
      pitch: this.config.rotation.pitch,
      yaw: this.config.rotation.yaw,
      roll: this.config.rotation.roll
    },
    motion: new THREE.Vector3(0, 0, 0),
    offset: {
      rotation: {
        pitch: 0,
        yaw: 0,
        roll: 0
      }
    }
  };
  this.falling = false;
  this.fallTimer = 0;
  this.camera = new THREE.PerspectiveCamera(_Config2.default.sandbox.camera.fov, _Config2.default.sandbox.camera.aspect, _Config2.default.sandbox.camera.near, _Config2.default.sandbox.camera.far);
  this.camera.up = new THREE.Vector3(0, 1, 0);
  this.object = new THREE.Group();
  this.interaction = new _Interaction2.default(this.target.position, this.target.rotation, this.motion);
  this.init();
};

Player.prototype = {
  init: function init() {
    this.bindControls();
    this.resizeCamera();
  },

  update: function update(delta, objects) {
    // handle mkb input and move player
    this.handleInput(delta);

    // apply physics
    this.interaction.computeNextPosition(delta, objects);

    // move player & camera
    this.move();
  },

  handleInput: function handleInput(delta) {
    // left/ right keys
    if (this.keys.left || this.keys.right) {
      var dir = (this.keys.left ? 1 : 0) + (this.keys.right ? -1 : 0);
      this.target.rotation.yaw += this.config.speed.rotation * delta * dir;
    }

    // up/ down keys
    if (this.keys.up || this.keys.down) {
      var speed = this.config.physics.noclip ? this.config.speed.noclip : this.config.speed.normal;
      var _dir = (this.keys.up ? 1 : 0) + (this.keys.down ? -1 : 0);
      var yaw = this.rotation.yaw + this.offset.rotation.yaw;
      var dx = Math.sin(yaw) * speed * _dir;
      var dz = Math.cos(yaw) * speed * _dir;
      this.target.motion.x = dx;
      this.target.motion.z = dz;
    } else {
      this.target.motion.x = 0;
      this.target.motion.z = 0;
    }

    // jumping
    if (this.keys.jump) {
      this.keys.jump = false;

      // jump if not falling
      if (this.motion.y == 0 || this.fallTimer < this.config.speed.fallTimerThreshold) {
        this.motion.y = this.config.speed.jump;
      }
    }

    // falling
    this.falling = this.motion.y != 0;
    this.fallTimer = this.falling ? this.fallTimer + delta : 0;

    // noclip
    if (this.keys.x) {
      this.keys.x = false;
      this.config.physics.noclip = this.config.physics.noclip == false;
    }

    if (this.config.physics.noclip) {
      this.falling = false;

      if (this.keys.up || this.keys.down) {
        var _dir2 = (this.keys.up ? 1 : 0) + (this.keys.down ? -1 : 0);
        var pitch = this.target.rotation.pitch;
        this.target.motion.y = Math.sin(pitch) * this.config.speed.noclip * _dir2;
      } else {
        this.target.motion.y = 0;
      }

      this.motion.y = this.target.motion.y;
    }

    // reduce motion if falling
    if (!this.falling) {
      this.motion.x = this.target.motion.x;
      this.motion.z = this.target.motion.z;
    } else {
      this.motion.x += (this.target.motion.x - this.motion.x) * this.config.adjust.slow;
      this.motion.z += (this.target.motion.z - this.motion.z) * this.config.adjust.slow;
    }
  },

  move: function move() {
    // move
    this.position.x += (this.target.position.x - this.position.x) * this.config.adjust.veryFast;
    this.position.y += (this.target.position.y - this.position.y) * this.config.adjust.rapid;
    this.position.z += (this.target.position.z - this.position.z) * this.config.adjust.veryFast;

    // rotate
    this.rotation.yaw += Maths.minAngleDifference(this.rotation.yaw, this.target.rotation.yaw) * this.config.adjust.fast;
    this.offset.rotation.yaw += (this.target.offset.rotation.yaw - this.offset.rotation.yaw) * this.config.adjust.normal;
    this.rotation.yaw += this.rotation.yaw < 0 ? Maths.twoPi : this.rotation.yaw > Maths.twoPi ? -Maths.twoPi : 0;
    this.rotation.pitch += (this.target.rotation.pitch - this.rotation.pitch) * this.config.adjust.normal;
    this.offset.rotation.pitch += (this.target.offset.rotation.pitch - this.offset.rotation.pitch) * this.config.adjust.normal;
    this.rotation.roll += (this.target.rotation.roll - this.rotation.roll) * this.config.adjust.fast;

    // set camera
    var pitch = this.rotation.pitch + this.offset.rotation.pitch;
    var yaw = this.rotation.yaw + this.offset.rotation.yaw;
    var height = this.position.y + this.config.height;

    // set camera roll
    this.camera.up.z = -Math.sin(this.rotation.yaw) * this.rotation.roll;
    this.camera.up.x = Math.cos(this.rotation.yaw) * this.rotation.roll;

    // set position
    this.camera.position.set(this.position.x, height, this.position.z);

    // look
    this.camera.lookAt(new THREE.Vector3(this.position.x + Math.sin(yaw), height + Math.sin(pitch), this.position.z + Math.cos(yaw)));

    // set world object
    this.object.position.set(this.position.x, this.position.y, this.position.z);
  },

  handleKeyDown: function handleKeyDown(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        this.keys.up = true;
        break;
      case 37:
      case 65:
        this.keys.left = true;
        break;
      case 40:
      case 83:
        this.keys.down = true;
        break;
      case 39:
      case 68:
        this.keys.right = true;
        break;
      case 32:
        this.keys.jump = true;
        break;
      case 88:
        this.keys.x = true;
      default:
        break;
    }
  },
  handleKeyUp: function handleKeyUp(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        this.keys.up = false;
        break;
      case 37:
      case 65:
        this.keys.left = false;
        break;
      case 40:
      case 83:
        this.keys.down = false;
        break;
      case 39:
      case 68:
        this.keys.right = false;
        break;
      default:
        break;
    }
  },
  handleMouseDown: function handleMouseDown(e) {
    if (!this.mouse.locked) {
      var self = this;
      var bound = this.domElement.getBoundingClientRect();

      this.mouse.active = true;
      this.mouse.rotation.pitch = this.rotation.pitch;
      this.mouse.rotation.yaw = this.rotation.yaw;
      this.mouse.start.x = e.clientX / this.domElement.width * 2 - 1;
      this.mouse.start.y = (e.clientY - bound.y) / this.domElement.height * 2 - 1;
    }
  },
  handleMouseMove: function handleMouseMove(e) {
    if (this.mouse.active && !(this.keys.left || this.keys.right)) {
      var bound = this.domElement.getBoundingClientRect();

      this.mouse.x = e.clientX / this.domElement.width * 2 - 1;
      this.mouse.y = (e.clientY - bound.y) / this.domElement.height * 2 - 1;
      this.mouse.delta.x = this.mouse.x - this.mouse.start.x;
      this.mouse.delta.y = this.mouse.y - this.mouse.start.y;

      // target rotation yaw
      this.target.rotation.yaw = this.mouse.rotation.yaw + this.mouse.delta.x;

      // target rotation pitch
      var pitch = this.mouse.rotation.pitch + this.mouse.delta.y;

      // if limit reached, reset start point
      if (pitch > this.config.rotation.maxPitch || pitch < this.config.rotation.minPitch) {
        pitch = Math.max(this.config.rotation.minPitch, Math.min(this.config.rotation.maxPitch, pitch));
        this.mouse.start.y = this.mouse.y;
        this.mouse.rotation.pitch = pitch;
      }

      this.target.rotation.pitch = pitch;
    }
  },
  handleMouseUp: function handleMouseUp(e) {
    this.mouse.active = false;
  },


  resizeCamera: function resizeCamera() {
    var w = this.domElement.width;
    var h = this.domElement.height;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  },

  bindControls: function bindControls() {
    var self = this;

    // keys
    self.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      jump: false,
      x: false
    };
    self.mouse = {
      x: 0,
      y: 0,
      start: {
        x: 0,
        y: 0
      },
      delta: {
        x: 0,
        y: 0
      },
      rotation: {
        pitch: 0,
        yaw: 0
      },
      locked: false,
      active: false
    };

    // mouse
    self.domElement.addEventListener('click', function (e) {
      //  console.log(self)
    }, false);
    self.domElement.addEventListener('mousedown', function (e) {
      self.handleMouseDown(e);
    }, false);
    self.domElement.addEventListener('mousemove', function (e) {
      self.handleMouseMove(e);
    }, false);
    self.domElement.addEventListener('mouseup', function (e) {
      self.handleMouseUp(e);
    }, false);
    self.domElement.addEventListener('mouseleave', function (e) {
      self.handleMouseUp(e);
    }, false);

    // keyboard
    document.addEventListener('keydown', function (e) {
      self.handleKeyDown(e);
    }, false);
    document.addEventListener('keyup', function (e) {
      self.handleKeyUp(e);
    }, false);
  }
};

exports.default = Player;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Config = __webpack_require__(0);

var _Config2 = _interopRequireDefault(_Config);

var _Maths = __webpack_require__(1);

var Maths = _interopRequireWildcard(_Maths);

var _Logger = __webpack_require__(2);

var _Logger2 = _interopRequireDefault(_Logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Interaction = function Interaction(position, rotation, motion) {
  this.position = position;
  this.rotation = rotation;
  this.motion = motion;
  this.falling = false;
  this.config = {};
  this.config.physics = _Config2.default.sandbox.physics;
  this.logger = new _Logger2.default();
}; // interaction object for building physical systems

Interaction.prototype = {
  applyPhysics: function applyPhysics(delta) {
    this.falling = this.motion.y < 0;
    this.motion.y = Math.max(this.motion.y - this.config.physics.gravity * delta, -this.config.physics.maxVelocity);
  },

  setPhysics: function setPhysics(params) {
    this.config.physics.gravity = params.gravity ? params.gravity : this.config.physics.gravity;
    this.config.physics.floor = params.floor ? params.floor : this.config.physics.floor;
    this.config.physics.snapUp = params.snapUp ? params.snapUp : this.config.physics.snapUp;
    this.config.physics.snapDown = params.snapDown ? params.snapDown : this.config.physics.snapDown;
  },

  computeNextPosition: function computeNextPosition(delta, system) {
    // move
    var position = Maths.addVector(this.position, Maths.scaleVector(this.motion, delta));

    // collision system
    if (!this.config.physics.noclip) {
      var meshes = system.getCollisionMeshes(position);

      // apply gravity
      this.applyPhysics(delta);

      if (meshes.length > 0) {
        // check for slopes
        if (this.stepUpSlopes(position, meshes)) {
          meshes = system.getCollisionMeshes(position);
        }

        // check for walls
        if (this.testObstructions(position, meshes, system)) {
          // check for slopes
          meshes = system.getCollisionMeshes(position);
          this.stepUpSlopes(position, meshes);
        }
      } else if (this.motion.y < 0 && !this.falling) {
        // check under position
        var under = Maths.copyVector(position);
        under.y -= this.config.physics.snapDown;
        var mesh = system.getCeilingPlane(under);

        // check for slopes
        this.stepDownSlope(position, mesh);
      }
    }

    // move
    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;

    // limit
    if (this.position.y < this.config.physics.floor) {
      this.motion.y = 0;
      this.position.y = this.config.physics.floor;
    }

    // dev
    this.logger.print('M ' + this.logger.formatVector(this.motion), 'P ' + this.logger.formatVector(this.position), 'V ' + this.logger.formatVector({ x: this.rotation.pitch, y: this.rotation.yaw, z: this.rotation.roll }));
  },

  testObstructions: function testObstructions(position, meshes, system) {
    // check for obstructions
    var obstruction = false;
    var extruded = false;

    for (var i = 0; i < meshes.length; i += 1) {
      var ceiling = meshes[i].getCeilingPlane(position);

      if (ceiling != null && (ceiling.plane.normal.y < this.config.physics.minSlope || ceiling.y - this.position.y > this.config.physics.snapUp)) {
        obstruction = meshes[i];
        break; // only one obstruction needed
      }
    }

    // handle obstruction
    if (obstruction) {
      var extrude = Maths.copyVector(position);
      var intersectPlane = obstruction.getIntersectPlane2D(this.position, position);

      // extrude position from object
      if (intersectPlane != null) {
        position.x = intersectPlane.intersect.x;
        position.z = intersectPlane.intersect.z;

        // get collisions at *new* point
        var hits = 0;
        meshes = system.getCollisionMeshes(position);

        for (var _i = 0; _i < meshes.length; _i += 1) {
          var _ceiling = meshes[_i].getCeilingPlane(position);

          // if position is climbable, ignore
          if (_ceiling != null && (_ceiling.plane.normal.y < this.config.physics.minSlope || _ceiling.y - this.position.y > this.config.physics.snapUp)) {
            hits += 1;
          }
        }

        // stop motion if cornered (collisions > 1)
        if (hits > 1) {
          position.x = this.position.x;
          position.z = this.position.z;
        } else {
          extruded = true;
        }
      } else {
        position.x = this.position.x;
        position.z = this.position.z;
      }
    }

    return extruded;
  },

  stepUpSlopes: function stepUpSlopes(position, meshes) {
    // check for upward slopes
    var success = false;

    for (var i = 0; i < meshes.length; i += 1) {
      var ceiling = meshes[i].getCeilingPlane(position);

      // climb
      if (ceiling != null && ceiling.plane.normal.y >= this.config.physics.minSlope && ceiling.y - this.position.y <= this.config.physics.snapUp) {
        if (ceiling.y >= position.y) {
          success = true;
          position.y = ceiling.y;
          this.motion.y = 0;
        }
      }
    }

    return success;
  },

  stepDownSlope: function stepDownSlope(position, ceilingPlane) {
    var success = false;

    if (ceilingPlane != null && ceilingPlane.plane.normal.y >= this.config.physics.minSlope) {
      position.y = ceilingPlane.y;
      this.motion.y = 0;
      success = true;
    }

    return success;
  }
};

exports.default = Interaction;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Config = __webpack_require__(0);

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = function Loader(basePath) {
  this.basePath = basePath;
  this.init();
};

Loader.prototype = {
  init: function init() {
    // FBX Loader (animation + PBR support)
    this.FBXLoader = new THREE.FBXLoader();

    // default envmap
    this.envTextureCube = new THREE.CubeTextureLoader().load([this.basePath + 'envmap/posx.jpg', this.basePath + 'envmap/negx.jpg', this.basePath + 'envmap/posy.jpg', this.basePath + 'envmap/negy.jpg', this.basePath + 'envmap/posz.jpg', this.basePath + 'envmap/negz.jpg']);
    //this.envTextureCube.format = THREE.RGBFormat;
    //this.envTextureCube.mapping = THREE.CubeReflectionMapping;
  },

  loadFBX: function loadFBX(filename) {
    var self = this;

    return new Promise(function (resolve, reject) {
      try {
        self.FBXLoader.load(self.basePath + filename, function (object) {
          var meshes = [];

          // get meshes (ignore lights, etc)
          for (var i = 0; i < object.children.length; i += 1) {
            if (object.children[i].type == 'Mesh') {
              meshes.push(object.children[i]);
            } else if (object.children[i].type == 'Group') {
              for (var j = 0; j < object.children[i].children.length; j += 1) {
                if (object.children[i].children[j].type == 'Mesh') {
                  meshes.push(object.children[i].children[j]);
                }
              }
            }
          }

          // set defualts (env map, normal scale etc)
          for (var _i = 0; _i < meshes.length; _i += 1) {
            var mat = meshes[_i].material;

            mat.envMap = self.envTextureCube;
            mat.envMapIntensity = 0.25; //mat.metalness;
            mat.bumpScale = 0.01;
            mat.normalScale = new THREE.Vector2(0.1, 0.1);
          }

          resolve(meshes);
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  process: function process(obj, materials) {
    for (var i = 0; i < obj.children.length; i += 1) {
      var child = obj.children[i];
      var meta = materials.materialsInfo[child.material.name];

      // set material
      child.material = materials.materials[child.material.name];

      console.log(meta, child.material);

      // load lightmaps
      if (meta.map_ka) {
        var uvs = child.geometry.attributes.uv.array;
        var src = meta.map_ka;
        var tex = new THREE.TextureLoader().load(self.basePath + src);

        child.material.lightMap = tex;
        child.material.lightMapIntensity = _Config2.default.Loader.lightMapIntensity;
        child.geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs, 2));
      }

      // make glass translucent
      if (child.material.map) {
        // if textured, set full colour
        child.material.color = new THREE.Color(0xffffff);

        // set transparent for .png
        if (child.material.map.image.src.indexOf('.png') !== -1) {
          child.material.transparent = true;
          child.material.side = THREE.DoubleSide;
        }

        // for glass
        if (child.material.map.image.src.indexOf('glass') != -1) {
          child.material.transparent = true;
          child.material.opacity = _Config2.default.Loader.glassOpacity;
        }
      } else {
        // no texture, set colour
        //child.material.emissive = child.material.color;
      }
    }
  },

  loadOBJ: function loadOBJ(filename) {
    var self = this;

    return new Promise(function (resolve, reject) {
      try {
        self.materialLoader.load(filename + '.mtl', function (materials) {
          materials.preload();
          //self.objectLoader.setMaterials(materials);
          self.objectLoader.load(filename + '.obj', function (obj) {
            self.process(obj, materials);
            resolve(obj);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};

exports.default = Loader;

/***/ })
/******/ ]);