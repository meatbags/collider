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
      x: 100,
      y: 100,
      z: 100
    }
  },
  plane: {
    dotBuffer: 0.0001 // account for dot product precision limitations
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

  a.x /= mag;
  a.y /= mag;
  a.z /= mag;

  return a;
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

exports.distanceBetween2D = distanceBetween2D;
exports.minAngleDifference = minAngleDifference;
exports.dotProduct = dotProduct;
exports.addVector = addVector;
exports.subtractVector = subtractVector;
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

  check: function check(point) {
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
        if (!this.planes[_i3].culled && this.planes[_i3].isPointAboveOrEqual(point)) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  },

  getCeiling: function getCeiling(point) {
    // get ceiling above point

    var y = null;

    for (var i = 0; i < this.planes.length; i += 1) {
      var plane = this.planes[i];

      if ((point.y <= plane.p1.y || point.y <= plane.p2.y || point.y <= plane.p3.y) && plane.containsPointXZ(point) && plane.isPointBelowOrEqual(point)) {
        var newY = plane.getY(point.x, point.z);

        if (y === null || newY < y) {
          y = newY;
        }
      }
    }

    //console.log(y)

    return y;
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
  this.above = false;
  this.below = false;
  this.generatePlane();
};

Plane.prototype = {
  generatePlane: function generatePlane() {
    // generate a plane

    var edge12 = Maths.subtractVector(this.p2, this.p1);
    var edge13 = Maths.subtractVector(this.p3, this.p1);

    // get normal
    this.normal = Maths.normalise(Maths.crossProduct(edge12, edge13));

    // reverse naughty normals
    if (Maths.dotProduct(this.normal, this.n1) < 0) {
      this.normal = Maths.reverseVector(this.normal);
    }

    // get position
    this.position = new THREE.Vector3((this.p1.x + this.p2.x + this.p3.x) / 3, (this.p1.y + this.p2.y + this.p3.y) / 3, (this.p1.z + this.p2.z + this.p3.z) / 3);

    // cache D for solving plane
    this.D = -(this.normal.x * this.position.x) - this.normal.y * this.position.y - this.normal.z * this.position.z;

    // create bounding box
    var points = [this.p1, this.p2, this.p3];
    this.box = new THREE.Box3().setFromPoints(points);
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

  getIntersect: function getIntersect(p1, p2) {},

  getY: function getY(x, z) {
    // solve plane for x, z

    var y = (this.normal.x * x + this.normal.z * z + this.D) / -this.normal.y;

    return y;
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
    ceiling: []
  };
  this.isColliderSystem = true;
};

System.prototype = {
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

  check: function check(point) {
    // search for collisions at point

    // check cache
    if (isCached(point, this.cache.mesh)) {
      return true;
    }

    // search meshes
    var collision = false;
    var quadrant = this.quadrants.getQuadrant(point);

    for (var i = 0; i < quadrant.length; i += 1) {
      var mesh = quadrant[i];

      if (mesh.check(point)) {
        collision = true;
        this.cacheItem(this.cache.mesh, point, mesh);
        break;
      }
    }

    return collision;
  },

  getCeiling: function getCeiling(point) {
    // get height of plane above point

    // check cache
    if (isCached(point, this.cache.ceiling)) {
      return this.cache.ceiling[0].item;
    }

    // search
    var quadrant = this.quadrants.getQuadrant(point);
    var y = null;

    for (var i = 0; i < quadrant.length; i += 1) {
      var mesh = quadrant[i];

      if (mesh.check(point)) {
        var newY = mesh.getCeiling(point);

        if (y === null || newY > y) {
          y = newY;
        }
      }
    }

    // cache
    this.cacheItem(this.cache.ceiling, point, y);

    return y;
  },

  cacheItem: function cacheItem(cache, point, item) {
    cache.unshift({
      point: new THREE.Vector3(point.x, point.y, point.z),
      item: item
    });

    if (cache.length > _Config2.default.system.cacheSize) {
      cache.mesh.splice(cache.mesh.length - 1, 1);
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

var Player = function Player(domElement) {
  this.domElement = domElement;
  this.position = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(0, 0, 0);
  this.offset = {
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.target = {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(0, 0, 0),
    offset: {
      rotation: new THREE.Vector3(0, 0, 0)
    }
  };
  this.attributes = {
    speed: 4,
    height: 1.8,
    climb: 1,
    rotation: Math.PI * 0.85,
    fov: 50,
    cameraThreshold: 0.33,
    maxRotationOffset: Math.PI * 0.25,
    adjust: 0.05,
    adjustFast: 0.09
  };
  this.camera = new THREE.PerspectiveCamera(this.attributes.fov, 1, 0.1, 10000);
  this.camera.up = new THREE.Vector3(0, 1, 0);
  this.init();
};

Player.prototype = {
  init: function init() {
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
      right: false
    };
    document.addEventListener("keydown", function (e) {
      self.handleKeyDown(e);
    }, false);
    document.addEventListener("keyup", function (e) {
      self.handleKeyUp(e);
    }, false);
  },

  update: function update(delta, collider) {
    if (this.keys.up || this.keys.down) {
      var move = (this.keys.up ? 1 : 0) + (this.keys.down ? -1 : 0);
      var dx = Math.sin(this.rotation.y) * this.attributes.speed * delta * move;
      var dz = Math.cos(this.rotation.y) * this.attributes.speed * delta * move;
      var nextX = this.position.x + dx;
      var nextZ = this.position.z + dz;
      var testX = { x: nextX, y: this.position.y, z: this.position.z };
      var testZ = { x: this.position.x, y: this.position.y, z: nextZ };
      var collisionX = false;
      var collisionZ = false;

      // XZ collisions
      /*
      for (let i=0; i<objects.length; i+=1) {
      const obj = objects[i];
      if (obj.type === TYPE_BOX || obj.type === TYPE_RAMP) {
      // test next X position
      if (obj.collision(testX)) {
      const y = obj.getTop(testX);
      		if (Math.abs(this.position.y - y) > this.climbThreshold) {
      	collisionX = true;
      }
      }
      	// test next Z position
      if (obj.collision(testZ)) {
      const y = obj.getTop(testZ);
      		if (Math.abs(this.position.y - y) > this.climbThreshold) {
      	collisionZ = true;
      }
      }
      }
      }
      */

      // update XZ position
      this.position.x = collisionX ? this.position.x : nextX;
      this.position.z = collisionZ ? this.position.z : nextZ;
    } else {
      this.target.speed = 0;
    }

    var y = collider.getCeiling(this.position);

    if (y != null) {
      this.position.y = y;
    }

    // get next Y position
    /*
    let nextY = 0;
    for (let i=0; i<objects.length; i+=1) {
    const obj = objects[i];
    	if (obj.type === TYPE_BOX || obj.type === TYPE_RAMP) {
    if (obj.collision2D(this.position)) {
    	const y = obj.getTop(this.position);
    			if (Math.abs(this.position.y - y) <= this.climbThreshold && y > nextY) {
    		nextY = y;
    	}
    }
    }
    }
    */

    //this.position.y += (nextY - this.position.y) * 0.3;

    // get next rotation
    if (this.keys.left || this.keys.right) {
      var rotate = (this.keys.left ? 1 : 0) + (this.keys.right ? -1 : 0);
      this.target.rotation.y += this.attributes.rotation * delta * rotate;
    }

    // update rotation
    this.rotation.y += (0, _Maths.minAngleDifference)(this.rotation.y, this.target.rotation.y) * this.attributes.adjustFast;
    this.offset.rotation.x += (this.target.offset.rotation.x - this.offset.rotation.x) * this.attributes.adjust;
    this.offset.rotation.y += (this.target.offset.rotation.y - this.offset.rotation.y) * this.attributes.adjust;

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