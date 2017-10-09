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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
    cacheSize: 10
  },
  quadrants: {
    size: {
      x: 50,
      y: 10,
      z: 50
    }
  },
  plane: {
    dotBuffer: 0.001,
    collisionThreshold: 0.5
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
    return a;
  }

  var normal = new THREE.Vector3(a.x / mag, a.y / mag, a.z / mag);

  return normal;
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

exports.copyVector = copyVector;
exports.isVectorEqual = isVectorEqual;
exports.pitchBetween = pitchBetween;
exports.twoPi = twoPi;
exports.distanceBetween = distanceBetween;
exports.distanceBetween2D = distanceBetween2D;
exports.minAngleDifference = minAngleDifference;
exports.dotProduct = dotProduct;
exports.addVector = addVector;
exports.subtractVector = subtractVector;
exports.scaleVector = scaleVector;
exports.crossProduct = crossProduct;
exports.reverseVector = reverseVector;
exports.normalise = normalise;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = exports.System = exports.Mesh = undefined;

var _Mesh = __webpack_require__(3);

var _Mesh2 = _interopRequireDefault(_Mesh);

var _System = __webpack_require__(5);

var _System2 = _interopRequireDefault(_System);

var _Player = __webpack_require__(7);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Mesh = _Mesh2.default;
exports.System = _System2.default;
exports.Player = _Player2.default; /**
                                    * @author meatbags / https://github.com/meatbags
                                   */

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Config = __webpack_require__(0);

var _Config2 = _interopRequireDefault(_Config);

var _Plane = __webpack_require__(4);

var _Plane2 = _interopRequireDefault(_Plane);

var _Maths = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mesh = function Mesh(geometry) {
  this.isColliderMesh = true;

  if (geometry.isBufferGeometry) {
    this.geometry = geometry;
    this.box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position);
    this.min = this.box.min;
    this.max = this.box.max;
    this.planes = [];
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

  collision: function collision(point) {
    if (this.box.containsPoint(point)) {
      // reset
      for (var i = 0; i < this.planes.length; i += 1) {
        this.planes[i].culled = false;
      }

      // first pass - cull faces
      for (var _i2 = 0; _i2 < this.planes.length; _i2 += 1) {
        if (!this.planes[_i2].culled && this.planes[_i2].isPointBelowOrEqual(point)) {
          // cull planes above plane
          for (var j = 0; j < this.planes.length; j += 1) {
            if (!this.planes[j].culled && j != _i2 && this.planes[_i2].isPlaneAbove(this.planes[j])) {
              this.planes[j].culled = true;
            }
          }
        }
      }

      // second pass - get res
      for (var _i3 = 0; _i3 < this.planes.length; _i3 += 1) {
        if (!this.planes[_i3].culled && !this.planes[_i3].isPointBelowOrEqual(point)) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  },

  ceiling: function ceiling(point) {
    // get closest ceiling above point

    var y = null;

    for (var i = 0; i < this.planes.length; i += 1) {
      var plane = this.planes[i];

      if (plane.containsPointXZ(point) && plane.isPointBelowOrEqual(point) && plane.normal.y >= 0) {
        var newY = plane.getY(point.x, point.z);

        if (newY >= point.y && (y === null || newY < y)) {
          y = newY;
        }
      }
    }

    return y;
  },

  ceilingPlane: function ceilingPlane(point) {
    // get closest ceiling plane

    var yPlane = null;
    var y = null;

    for (var i = 0; i < this.planes.length; i += 1) {
      var plane = this.planes[i];

      if (plane.containsPointXZ(point) && plane.isPointBelowOrEqual(point) && plane.normal.y >= 0) {
        var newY = plane.getY(point.x, point.z);

        if (newY >= point.y && (y == null || newY < y)) {
          y = newY;
          yPlane = plane;
        }
      }
    }

    return {
      y: y,
      plane: yPlane
    };
  },

  intersect: function intersect(p1, p2) {
    // get intersect of mesh and line

    var intersect = null;

    for (var i = 0; i < this.planes.length; i += 1) {
      var res = this.planes[i].intersect(p1, p2);

      if (res != null) {
        var dist = (0, _Maths.distanceBetween)(p1, res);

        if (intersect == null || dist < intersect.distance) {
          intersect = {
            intersect: res,
            plane: this.planes[i],
            distance: dist
          };
        }
      }
    }

    return intersect;
  },

  nearest2DIntersect: function nearest2DIntersect(p1, p2) {
    var intersect = p2;
    var distance = null;
    var pointBox = new THREE.Box3().setFromPoints([p1, p2]);

    for (var i = 0; i < this.planes.length; i += 1) {
      if (pointBox.intersectsBox(this.planes[i].box)) {
        if (this.planes[i].distanceToPlane(p2) <= _Config2.default.plane.collisionThreshold) {
          var contact = this.planes[i].getNormalIntersectXZ(p2);
          var dist = (0, _Maths.distanceBetween)(contact, p2);

          if (distance == null || dist < distance) {
            distance = dist;
            intersect = contact;
          }
        }
      }
    }

    return intersect;
  }
};

exports.default = Mesh;

/***/ }),
/* 4 */
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
    // edge vectors
    var e12 = Maths.subtractVector(this.p2, this.p1);
    var e13 = Maths.subtractVector(this.p3, this.p1);

    // get normal
    this.normal = Maths.normalise(Maths.crossProduct(e12, e13));
    this.normalXZ = new THREE.Vector3(this.normal.x, 0, this.normal.z);

    // reverse naughty normals
    if (Maths.dotProduct(this.normal, this.n1) < 0) {
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
    // is inside bounding box

    return this.box.containsPoint(point);
  },

  containsPointXZ: function containsPointXZ(point) {
    // is X, Z inside bounding box

    return this.box.containsPoint(new THREE.Vector3(point.x, this.position.y, point.z));
  },

  containsPointThreshold: function containsPointThreshold(point) {
    return this.boxExpanded.containsPoint(point);
  },

  distanceToPlane: function distanceToPlane(point) {
    return Math.abs(this.normal.x * point.x + this.normal.y * point.y + this.normal.z * point.z + this.D);
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

  getNormalIntersectXZ: function getNormalIntersectXZ(point) {
    // get 2D (xz) intersect which extends from point to surface

    var numPart = this.normal.x * point.x + this.normal.y * point.y + this.normal.z * point.z + this.D;
    var denom = this.normal.x * this.normal.x + this.normal.z * this.normal.z;
    var x = point.x - this.normal.x * numPart / denom;
    var z = point.z - this.normal.z * numPart / denom;
    var intersect = new THREE.Vector3(x, point.y, z);

    return intersect;
  },


  intersect: function intersect(p1, p2) {
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

  getY: function getY(x, z) {
    // solve plane for x, z

    var y = (this.normal.x * x + this.normal.z * z + this.D) / -this.normal.y;

    return y;
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Config = __webpack_require__(0);

var _Config2 = _interopRequireDefault(_Config);

var _Quadrants = __webpack_require__(6);

var _Quadrants2 = _interopRequireDefault(_Quadrants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// collision system - checks against all meshes
// meshes are divided into quadrants for efficiency
// recent collisions are cached

var System = function System() {
  this.quadrants = new _Quadrants2.default();
  this.cache = {
    mesh: [],
    ceiling: [],
    floor: [],
    intersect: []
  };
  this.isColliderSystem = true;
  this.init();
};

System.prototype = {
  init: function init() {
    this.devCvs = document.getElementById('canvas');
    this.devCtx = this.devCvs.getContext('2d');
  },

  add: function add() {
    // add mesh to quadrants

    for (var i = 0; i < arguments.length; i += 1) {
      var mesh = arguments[i];

      if (mesh.isColliderMesh) {
        this.quadrants.add(mesh);
      } else {
        throw 'Error: Input must be Collider.Mesh';
      }
    }
  },

  collision: function collision(point) {
    // search for collisions at point
    // check cache
    if (this.isCached(point, this.cache.mesh)) {
      return true;
    }

    // search meshes
    var collision = false;
    var quadrant = this.quadrants.getQuadrant(point);

    for (var i = 0; i < quadrant.length; i += 1) {
      var mesh = quadrant[i];

      if (mesh.collision(point)) {
        collision = true;
        this.cacheItem(this.cache.mesh, point, mesh);
        break;
      }
    }

    return collision;
  },

  collisions: function collisions(point) {
    // get all meshes which collide

    var collisions = [];
    var quadrant = this.quadrants.getQuadrant(point);

    for (var i = 0; i < quadrant.length; i += 1) {
      var mesh = quadrant[i];

      if (mesh.collision(point)) {
        collisions.push(mesh);
      }
    }

    return collisions;
  },

  ceiling: function ceiling(point) {
    // get height of plane above point

    // check ceiling cache
    if (this.isCached(point, this.cache.ceiling)) {
      return this.cache.ceiling[0].item;
    }

    // search
    var quadrant = this.quadrants.getQuadrant(point);
    var y = null;

    for (var i = 0; i < quadrant.length; i += 1) {
      var mesh = quadrant[i];

      if (mesh.collision(point)) {
        var newY = mesh.ceiling(point);

        if (y === null || newY > y) {
          y = newY;
        }
      }
    }

    // cache
    this.cacheItem(this.cache.ceiling, point, y);

    return y;
  },

  ceilingPlane: function ceilingPlane(point) {
    // search
    var quadrant = this.quadrants.getQuadrant(point);
    var y = null;
    var plane = null;

    for (var i = 0; i < quadrant.length; i += 1) {
      var mesh = quadrant[i];

      if (mesh.collision(point)) {
        var res = mesh.ceilingPlane(point);

        if (y === null || res.y > y) {
          y = res.y;
          plane = res.plane;
        }
      }
    }

    return {
      y: y,
      plane: plane
    };
  },

  ceilingPlanes: function ceilingPlanes(point) {
    // search
    var quadrant = this.quadrants.getQuadrant(point);
    var planes = [];

    for (var i = 0; i < quadrant.length; i += 1) {
      var mesh = quadrant[i];

      if (mesh.collision(point)) {
        var res = mesh.ceilingPlane(point);

        if (res.y != null) {
          planes.push({
            y: res.y,
            plane: res.plane
          });
        }
      }
    }

    return planes;
  },

  intersect: function intersect(from, to) {
    // get intersect of geometry and line

    // check intersect cache for intersect
    if (this.isCached(from, this.cache.intersect)) {
      var cached = this.cache.intersect[0];

      if (to.x === cached.item.to.x && to.y === cached.item.to.y && to.z === cached.item.to.z) {
        return cached.item.intersect;
      }
    }

    // search
    var quadrant = this.quadrants.getQuadrant(to);
    var intersect = null;

    for (var i = 0; i < quadrant.length; i += 1) {
      var mesh = quadrant[i];

      if (mesh.collision(to)) {
        var res = mesh.intersect(from, to);

        if (res != null && (intersect === null || res.distance < intersect.distance)) {
          intersect = res;
        }
      }
    }

    // cache
    this.cacheItem(this.cache.intersect, from, {
      to: to,
      intersect: intersect
    });

    return intersect;
  },

  intersects: function intersects(from, to) {
    // get array of intersects between points
    var quadrant = this.quadrants.getQuadrant(to);
    var intersects = [];

    for (var i = 0; i < quadrant.length; i += 1) {
      var mesh = quadrant[i];

      if (mesh.collision(to)) {
        var res = mesh.intersect(from, to);

        if (res != null) {
          intersects.push(res);
        }
      }
    }

    return intersects;
  },

  countIntersects: function countIntersects(from, to) {
    // get n intersects between points in geometric set

    var quadrant = this.quadrants.getQuadrant(to);
    var count = 0;

    for (var i = 0; i < quadrant.length; i += 1) {
      var mesh = quadrant[i];

      if (mesh.collision(to)) {
        var res = mesh.intersect(from, to);

        if (res != null) {
          count += 1;
        }
      }
    }

    return count;
  },

  countCollisions: function countCollisions(point) {
    // get n collisions

    var collisions = 0;
    var quadrant = this.quadrants.getQuadrant(point);

    for (var i = 0; i < quadrant.length; i += 1) {
      var mesh = quadrant[i];

      if (mesh.collision(point)) {
        collisions += 1;
      }
    }

    return collisions;
  },

  cacheItem: function cacheItem(cache, point, item) {
    cache.unshift({
      point: new THREE.Vector3(point.x, point.y, point.z),
      item: item
    });

    if (cache.length > _Config2.default.system.cacheSize) {
      cache.splice(cache.length - 1, 1);
    }
  },

  isCached: function isCached(point, cache) {
    return cache.length > 0 && point.x === cache[0].point.x && point.y === cache[0].point.y && point.z === cache[0].point.z;
  }
};

exports.default = System;

/***/ }),
/* 6 */
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


  getQuadrant: function getQuadrant(point) {
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Maths = __webpack_require__(1);

var Maths = _interopRequireWildcard(_Maths);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Player = function Player(domElement) {
  this.domElement = domElement;
  this.position = new THREE.Vector3(0, 0, 0);
  this.movement = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(0, Math.PI, 0);
  this.offset = {
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.target = {
    position: new THREE.Vector3(0, 0, 0),
    movement: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(0, Math.PI, 0),
    offset: {
      rotation: new THREE.Vector3(0, 0, 0)
    }
  };
  this.attributes = {
    speed: 8,
    speedWhileJumping: 4,
    height: 1.8,
    rotation: Math.PI * 0.75,
    fov: 58,
    cameraThreshold: 0.4,
    maxRotationOffset: Math.PI * 0.3,
    falling: false,
    adjust: {
      slow: 0.02,
      normal: 0.05,
      fast: 0.09,
      veryFast: 0.2
    },
    climb: {
      up: 1,
      down: 0.5,
      minYNormal: 0.5
    },
    gravity: {
      accel: 10,
      maxVelocity: 50,
      jumpVelocity: 5
    }
  };
  this.outputLog = [];
  this.camera = new THREE.PerspectiveCamera(this.attributes.fov, 1, 0.1, 10000);
  this.camera.up = new THREE.Vector3(0, 1, 0);
  this.init();
};

Player.prototype = {
  init: function init() {
    this.object = new THREE.Mesh(new THREE.SphereBufferGeometry(0.05), new THREE.MeshPhongMaterial());
    this.bindControls();
    this.resizeCamera();
  },

  resizeCamera: function resizeCamera() {
    var w = this.domElement.width;
    var h = this.domElement.height;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  },

  bindControls: function bindControls() {
    var self = this;

    // mouse
    self.domElement.addEventListener('mousemove', function (e) {
      self.handleMouseMove(e);
    }, false);
    self.domElement.addEventListener('mousedown', function (e) {
      self.handleMouseDown(e);
    }, false);

    // keyboard
    self.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      jump: false
    };
    document.addEventListener("keydown", function (e) {
      self.handleKeyDown(e);
    }, false);
    document.addEventListener("keyup", function (e) {
      self.handleKeyUp(e);
    }, false);
  },

  log: function log() {
    var text = '';
    for (var i = 0; i < arguments.length; i += 1) {
      text += arguments[i] + ' ';
    }
    this.outputLog.push(text);
  },

  update: function update(delta, collider) {
    // handle key presses and move player

    this.outputLog = [];

    // get movement vector from controls
    if (this.keys.up || this.keys.down) {
      var dir = (this.keys.up ? 1 : 0) + (this.keys.down ? -1 : 0);
      var _yaw = this.rotation.y + this.offset.rotation.y;
      var dx = Math.sin(_yaw) * this.attributes.speed * dir;
      var dz = Math.cos(_yaw) * this.attributes.speed * dir;
      this.target.movement.x = dx;
      this.target.movement.z = dz;
    } else {
      this.target.movement.x = 0;
      this.target.movement.z = 0;
    }

    // jump key
    if (this.keys.jump) {
      this.keys.jump = false;

      // jump if not falling
      if (this.movement.y == 0) {
        this.movement.y = this.attributes.gravity.jumpVelocity;
      }
    }

    // set falling
    this.falling = this.movement.y != 0;

    // reduce movement if falling
    if (!this.falling) {
      this.movement.x = this.target.movement.x;
      this.movement.z = this.target.movement.z;
    } else {
      this.movement.x += (this.target.movement.x - this.movement.x) * this.attributes.adjust.slow;
      this.movement.z += (this.target.movement.z - this.movement.z) * this.attributes.adjust.slow;
    }

    // check next position for collision
    var next = Maths.addVector(Maths.scaleVector(this.movement, delta), this.target.position);
    var collisions = collider.collisions(next);

    // apply gravity
    this.movement.y = Math.max(this.movement.y - this.attributes.gravity.accel * delta, -this.attributes.gravity.maxVelocity);

    if (collisions.length > 0) {
      this.log('Collisions', collisions.length);

      // check for floor

      for (var i = 0; i < collisions.length; i += 1) {
        var ceiling = collisions[i].ceilingPlane(next);

        if (ceiling.y != null && ceiling.plane.normal.y >= this.attributes.climb.minYNormal && ceiling.y - this.target.position.y <= this.attributes.climb.up) {
          // ground
          this.movement.y = 0;

          // ascend
          if (ceiling.y >= next.y) {
            next.y = ceiling.y;
            this.log('CLIMBED');
          }
        }
      }

      // check for walls

      collisions = collider.collisions(next);
      var walls = [];

      for (var _i = 0; _i < collisions.length; _i += 1) {
        var _ceiling = collisions[_i].ceilingPlane(next);

        if (_ceiling.y != null && (_ceiling.plane.normal.y < this.attributes.climb.minYNormal || _ceiling.y - this.target.position.y > this.attributes.climb.up)) {
          walls.push(collisions[_i]);
        }
      }

      // if inside a wall, extrude out

      if (walls.length > 0) {
        var extrude = Maths.copyVector(next);

        for (var _i2 = 0; _i2 < walls.length; _i2 += 1) {
          var mesh = walls[_i2];
          extrude = mesh.nearest2DIntersect(this.target.position, next);
        }

        next.x = extrude.x;
        next.z = extrude.z;

        // helper

        this.object.position.set(next.x, next.y, next.z);

        // check extruded point for collisions

        var hits = 0;
        collisions = collider.collisions(next);

        for (var _i3 = 0; _i3 < collisions.length; _i3 += 1) {
          var _ceiling2 = collisions[_i3].ceilingPlane(next);

          if (_ceiling2.y != null && (_ceiling2.plane.normal.y < this.attributes.climb.minYNormal || _ceiling2.y - this.target.position.y > this.attributes.climb.up)) {
            hits += 1;
          }
        }

        // if contact with > 1 walls, stop motion

        if (hits > 1) {
          next.x = this.target.position.x;
          next.z = this.target.position.z;
        }
      }
    } else {
      // check if on downward slope
      var testUnder = Maths.copyVector(next);
      testUnder.y -= this.attributes.climb.down;

      if (!this.falling && collider.collision(testUnder)) {
        var _ceiling3 = collider.ceilingPlane(testUnder);

        // snap to slope if not too steep
        if (_ceiling3.plane.normal.y >= this.attributes.climb.minYNormal) {
          next.y = _ceiling3.y;
          this.movement.y = 0;
        }
      }
    }

    // set new position target
    this.target.position.x = next.x;
    this.target.position.y = next.y;
    this.target.position.z = next.z;

    // smooth motion a little
    this.position.x += (this.target.position.x - this.position.x) * this.attributes.adjust.veryFast;
    this.position.y += (this.target.position.y - this.position.y) * this.attributes.adjust.veryFast;
    this.position.z += (this.target.position.z - this.position.z) * this.attributes.adjust.veryFast;

    // update rotation vector
    if (this.keys.left || this.keys.right) {
      var _dir = (this.keys.left ? 1 : 0) + (this.keys.right ? -1 : 0);
      this.target.rotation.y += this.attributes.rotation * delta * _dir;
    }

    this.rotation.y += Maths.minAngleDifference(this.rotation.y, this.target.rotation.y) * this.attributes.adjust.fast;
    this.offset.rotation.x += (this.target.offset.rotation.x - this.offset.rotation.x) * this.attributes.adjust.normal;
    this.offset.rotation.y += (this.target.offset.rotation.y - this.offset.rotation.y) * this.attributes.adjust.normal;
    this.rotation.y += this.rotation.y < 0 ? Maths.twoPi : this.rotation.y > Maths.twoPi ? -Maths.twoPi : 0;

    // set new camera position
    var yaw = this.rotation.y + this.offset.rotation.y;
    var pitch = this.rotation.x + this.offset.rotation.x;
    var height = this.position.y + this.attributes.height;

    this.camera.position.set(this.position.x, height, this.position.z);
    this.camera.lookAt(new THREE.Vector3(this.position.x + Math.sin(yaw), height + Math.sin(pitch), this.position.z + Math.cos(yaw)));
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
    }
  },
  handleMouseDown: function handleMouseDown(e) {
    var bound = this.domElement.getBoundingClientRect();
    var w = this.domElement.width;
    var x = (e.clientX - bound.left) / w;
    var t = this.attributes.cameraThreshold;

    // adjust camera
    if (x < t) {
      this.target.rotation.y = this.rotation.y + (t - x) / t * this.attributes.maxRotationOffset;
    } else if (x > 1 - t) {
      this.target.rotation.y = this.rotation.y + (x - (1 - t)) / t * -this.attributes.maxRotationOffset;
    } else {
      this.target.rotation.y = this.rotation.y;
    }
  },
  handleMouseMove: function handleMouseMove(e) {
    var bound = this.domElement.getBoundingClientRect();
    var w = this.domElement.width;
    var h = this.domElement.height;
    var x = (e.clientX - bound.left) / w;
    var y = (e.clientY - bound.top) / h;
    var t = this.attributes.cameraThreshold;

    // adjust camera
    if (x < t) {
      this.target.offset.rotation.y = (t - x) / t * this.attributes.maxRotationOffset;
    } else if (x > 1 - t) {
      this.target.offset.rotation.y = (x - (1 - t)) / t * -this.attributes.maxRotationOffset;
    } else {
      this.target.offset.rotation.y = 0;
    }

    if (y < t) {
      this.target.offset.rotation.x = (t - y) / t * this.attributes.maxRotationOffset;
    } else if (y > 1 - t) {
      this.target.offset.rotation.x = (y - (1 - t)) / t * -this.attributes.maxRotationOffset;
    } else {
      this.target.offset.rotation.x = 0;
    }
  }
};

exports.default = Player;

/***/ })
/******/ ]);