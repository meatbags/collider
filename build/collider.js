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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(6);

Object.keys(_config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _config[key];
    }
  });
});

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

var scaleByVector = function scaleByVector(v, scale) {
  var vec = new THREE.Vector3(v.x * scale.x, v.y * scale.y, v.z * scale.z);

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
exports.scaleByVector = scaleByVector;
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
exports.Collider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(0);

var _general = __webpack_require__(1);

var Maths = _interopRequireWildcard(_general);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collider = function () {
  function Collider(position, motion) {
    _classCallCheck(this, Collider);

    // collision object

    this.position = position;
    this.motion = motion;
    this.falling = false;
    this.config = { physics: _conf.Config.sandbox.physics };
  }

  _createClass(Collider, [{
    key: 'gravity',
    value: function gravity(delta) {
      this.falling = this.motion.y < 0;
      this.motion.y = Math.max(this.motion.y - this.config.physics.gravity * delta, -this.config.physics.maxVelocity);
    }
  }, {
    key: 'move',
    value: function move(delta, system) {
      // move against the collider system

      var position = Maths.addVector(this.position, Maths.scaleVector(this.motion, delta));

      this.gravity(delta);
      var meshes = system.getCollisionMeshes(position);

      if (meshes.length > 0) {
        // upward slopes

        if (this.stepUpSlopes(position, meshes)) {
          meshes = system.getCollisionMeshes(position);
        }

        // walls

        if (this.feel(position, meshes, system)) {
          meshes = system.getCollisionMeshes(position);
          this.stepUpSlopes(position, meshes);
        }
      } else if (this.motion.y < 0 && !this.falling) {
        // downward slopes

        var under = Maths.copyVector(position);
        under.y -= this.config.physics.snapDown;
        var mesh = system.getCeilingPlane(under);
        this.stepDownSlope(position, mesh);
      }

      this.position.x = position.x;
      this.position.y = position.y;
      this.position.z = position.z;

      // spatial limit

      if (this.position.y < this.config.physics.floor) {
        this.motion.y = 0;
        this.position.y = this.config.physics.floor;
      }
    }
  }, {
    key: 'feel',
    value: function feel(position, meshes, system) {
      // test for obstructions

      var obstruction = false;
      var extruded = false;

      for (var i = 0; i < meshes.length; i += 1) {
        var ceiling = meshes[i].getCeilingPlane(position);

        // get first obstruction

        if (ceiling != null && (ceiling.plane.normal.y < this.config.physics.minSlope || ceiling.y - this.position.y > this.config.physics.snapUp)) {
          obstruction = meshes[i];
          break;
        }
      }

      // change vector or stop

      if (obstruction) {
        var extrude = Maths.copyVector(position);
        var intersectPlane = obstruction.getIntersectPlane2D(this.position, position);

        if (intersectPlane != null) {
          position.x = intersectPlane.intersect.x;
          position.z = intersectPlane.intersect.z;

          // get collisions at *new* point

          var hits = 0;
          meshes = system.getCollisionMeshes(position);

          for (var _i = 0; _i < meshes.length; _i += 1) {
            var _ceiling = meshes[_i].getCeilingPlane(position);

            // ignore if climbable

            if (_ceiling != null && (_ceiling.plane.normal.y < this.config.physics.minSlope || _ceiling.y - this.position.y > this.config.physics.snapUp)) {
              hits += 1;
            }
          }

          // stop motion if more than one collision (corner)

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
    }
  }, {
    key: 'setPhysics',
    value: function setPhysics(params) {
      for (var key in params) {
        if (params.hasOwnProperty(key) && this.config.physics.hasOwnProperty(key)) {
          this.config.physics[key] = params[key];
        }
      }
    }
  }, {
    key: 'stepUpSlopes',
    value: function stepUpSlopes(position, meshes) {
      // check for upward slopes in meshes

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
    }
  }, {
    key: 'stepDownSlope',
    value: function stepDownSlope(position, ceilingPlane) {
      // descend a given slope

      var success = false;

      if (ceilingPlane != null && ceilingPlane.plane.normal.y >= this.config.physics.minSlope) {
        position.y = ceilingPlane.y;
        this.motion.y = 0;
        success = true;
      }

      return success;
    }
  }]);

  return Collider;
}();

exports.Collider = Collider;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _general = __webpack_require__(1);

Object.keys(_general).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _general[key];
    }
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mesh = __webpack_require__(5);

Object.keys(_mesh).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mesh[key];
    }
  });
});

var _file = __webpack_require__(17);

Object.keys(_file).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _file[key];
    }
  });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collider = __webpack_require__(2);

Object.keys(_collider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collider[key];
    }
  });
});

var _mesh = __webpack_require__(7);

Object.keys(_mesh).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mesh[key];
    }
  });
});

var _player = __webpack_require__(10);

Object.keys(_player).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _player[key];
    }
  });
});

var _system = __webpack_require__(15);

Object.keys(_system).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _system[key];
    }
  });
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = {
  system: {
    maxPlanesPerMesh: 250
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
        maxPitch: Math.PI * 0.3,
        minPitch: Math.PI * -0.3
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
      far: 1000
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

exports.Config = Config;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mesh = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(0);

var _plane = __webpack_require__(8);

var _transformer = __webpack_require__(9);

var _maths = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mesh = function () {
  function Mesh(object) {
    _classCallCheck(this, Mesh);

    // collision mesh

    this.isColliderMesh = true;

    if (object.geometry.isBufferGeometry) {
      this.object = object;
      this.geometry = object.geometry;
      this.box = new THREE.Box3().setFromBufferAttribute(object.geometry.attributes.position);
      this.min = this.box.min;
      this.max = this.box.max;
      this.planes = [];
      this.transform = new _transformer.Transformer(object);
      this.generatePlanes();
      this.conformPlanes();
    } else {
      throw 'Error: Input is not THREE.BufferGeometry';
    }
  }

  _createClass(Mesh, [{
    key: 'generatePlanes',
    value: function generatePlanes() {
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

          this.planes.push(new _plane.Plane(new THREE.Vector3(verts[j], verts[j + 1], verts[j + 2]), new THREE.Vector3(verts[k], verts[k + 1], verts[k + 2]), new THREE.Vector3(verts[l], verts[l + 1], verts[l + 2]), new THREE.Vector3(norms[j], norms[j + 1], norms[j + 2]), new THREE.Vector3(norms[k], norms[k + 1], norms[k + 2]), new THREE.Vector3(norms[l], norms[l + 1], norms[l + 2])));
        }
      } else {
        var _step = 9;

        for (var _i = 0; _i < verts.length; _i += _step) {
          this.planes.push(new _plane.Plane(new THREE.Vector3(verts[_i + 0], verts[_i + 1], verts[_i + 2]), new THREE.Vector3(verts[_i + 3], verts[_i + 4], verts[_i + 5]), new THREE.Vector3(verts[_i + 6], verts[_i + 7], verts[_i + 8]), new THREE.Vector3(norms[_i + 0], norms[_i + 1], norms[_i + 2]), new THREE.Vector3(norms[_i + 3], norms[_i + 4], norms[_i + 5]), new THREE.Vector3(norms[_i + 6], norms[_i + 7], norms[_i + 8])));
        }
      }
    }
  }, {
    key: 'conformPlanes',
    value: function conformPlanes() {
      var conformed = false;

      // conform scale
      if (!this.transform.default.scale) {
        for (var i = 0; i < this.planes.length; i += 1) {
          this.transform.bakeScale(this.planes[i]);
        }
        conformed = true;
      }

      // conform rotation
      if (!this.transform.default.rotation) {
        for (var _i2 = 0; _i2 < this.planes.length; _i2 += 1) {
          this.transform.bakeRotation(this.planes[_i2]);
        }
        conformed = true;
      }

      if (conformed) {
        // get new plane data
        for (var _i3 = 0; _i3 < this.planes.length; _i3 += 1) {
          this.planes[_i3].generatePlane();
        }

        // set new collision box
        this.setBoxFromPlanes();
      }
    }
  }, {
    key: 'setBoxFromPlanes',
    value: function setBoxFromPlanes() {
      var array = [];

      for (var i = 0; i < this.planes.length; i += 1) {
        var p = this.planes[i];

        array.push(p.p1);
        array.push(p.p2);
        array.push(p.p3);
      }

      this.box.setFromPoints(array);
    }
  }, {
    key: 'getCollision',
    value: function getCollision(point) {
      this.transform.set(point);

      if (this.box.containsPoint(this.transform.point)) {
        // reset
        for (var i = 0; i < this.planes.length; i += 1) {
          this.planes[i].culled = false;
        }

        // first pass - cull faces
        for (var _i4 = 0; _i4 < this.planes.length; _i4 += 1) {
          if (!this.planes[_i4].culled && this.planes[_i4].isPointBelowOrEqual(this.transform.point)) {
            // cull planes above plane
            for (var j = 0; j < this.planes.length; j += 1) {
              if (!this.planes[j].culled && j != _i4 && this.planes[_i4].isPlaneAbove(this.planes[j])) {
                this.planes[j].culled = true;
              }
            }
          }
        }

        // second pass - get result
        for (var _i5 = 0; _i5 < this.planes.length; _i5 += 1) {
          if (!this.planes[_i5].culled && !this.planes[_i5].isPointBelowOrEqual(this.transform.point)) {
            return false;
          }
        }

        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'getCollision2D',
    value: function getCollision2D(point) {
      this.transform.set(point);

      return this.transform.point.x >= this.min.x && this.transform.point.x <= this.max.x && this.transform.point.z >= this.min.z && this.transform.point.z <= this.max.z;
    }
  }, {
    key: 'getCeiling2D',
    value: function getCeiling2D(point) {
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
    }
  }, {
    key: 'getCeiling',
    value: function getCeiling(point) {
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
    }
  }, {
    key: 'getCeilingPlane',
    value: function getCeilingPlane(point) {
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
    }
  }, {
    key: 'getIntersectPlane',
    value: function getIntersectPlane(p1, p2) {
      var tp1 = this.transform.getTransformedPoint(p1);
      var tp2 = this.transform.getTransformedPoint(p2);
      var box = new THREE.Box3().setFromPoints([tp1, tp2]);
      var intersectPlane = null;

      for (var i = 0; i < this.planes.length; i += 1) {
        if (this.planes[i].intersectsBox(box) || this.planes[i].containsBox(box)) {
          var intersect = this.planes[i].getIntersect(tp1, tp2);

          if (intersect != null) {
            var distance = (0, _maths.distanceBetween)(tp1, intersect);

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
    }
  }, {
    key: 'getIntersectPlane2D',
    value: function getIntersectPlane2D(p1, p2) {
      // find 2D intersect *nearest* to p2

      var tp1 = this.transform.getTransformedPoint(p1);
      var tp2 = this.transform.getTransformedPoint(p2);
      var box = new THREE.Box3().setFromPoints([tp1, tp2]);
      var intersectPlane = null;

      for (var i = 0; i < this.planes.length; i += 1) {
        if (this.planes[i].intersectsBox(box) || this.planes[i].containsBox(box)) {
          var intersect2D = this.planes[i].getNormalIntersect2D(tp2);

          if (intersect2D != null) {
            var distance = (0, _maths.distanceBetween)(tp2, intersect2D);

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
  }]);

  return Mesh;
}();

exports.Mesh = Mesh;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plane = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _general = __webpack_require__(1);

var Maths = _interopRequireWildcard(_general);

var _conf = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plane = function () {
  function Plane(p1, p2, p3, n1, n2, n3) {
    _classCallCheck(this, Plane);

    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.n1 = n1;
    this.n2 = n2;
    this.n3 = n3;
    this.culled = false;

    // generate plane

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
  }

  _createClass(Plane, [{
    key: 'isPointAbove',
    value: function isPointAbove(point) {
      // is point above plane

      var vec = Maths.subtractVector(point, this.position);
      var dot = Maths.dotProduct(vec, this.normal);
      var res = dot > 0;

      return res;
    }
  }, {
    key: 'isPointBelow',
    value: function isPointBelow(point) {
      // is point below plane

      var vec = Maths.subtractVector(point, this.position);
      var dot = Maths.dotProduct(vec, this.normal);
      var res = dot < 0;

      return res;
    }
  }, {
    key: 'isPointAboveOrEqual',
    value: function isPointAboveOrEqual(point) {
      // is point above plane or on surface

      var vec = Maths.subtractVector(point, this.position);
      var dot = Maths.dotProduct(vec, this.normal);
      var res = dot >= -_conf.Config.plane.dotBuffer;

      return res;
    }
  }, {
    key: 'isPointBelowOrEqual',
    value: function isPointBelowOrEqual(point) {
      // is point below plane or on surface

      var vec = Maths.subtractVector(point, this.position);
      var dot = Maths.dotProduct(vec, this.normal);
      var res = dot <= _conf.Config.plane.dotBuffer;

      return res;
    }
  }, {
    key: 'isPointOnSurface',
    value: function isPointOnSurface(point) {
      var vec = Maths.subtractVector(point, this.position);
      var dot = Maths.dotProduct(vec, this.normal);
      var res = dot <= _conf.Config.plane.dotBuffer && dot >= -_conf.Config.plane.dotBuffer;

      return res;
    }
  }, {
    key: 'isPlaneAbove',
    value: function isPlaneAbove(plane) {
      // check if whole plane is above

      return this.isPointAboveOrEqual(plane.p1) && this.isPointAboveOrEqual(plane.p2) && this.isPointAboveOrEqual(plane.p3);
    }
  }, {
    key: 'containsPoint',
    value: function containsPoint(point) {
      return this.box.containsPoint(point);
    }
  }, {
    key: 'containsBox',
    value: function containsBox(box) {
      return this.box.containsBox(box);
    }
  }, {
    key: 'intersectsBox',
    value: function intersectsBox(box) {
      return this.box.intersectsBox(box);
    }
  }, {
    key: 'containsPoint2D',
    value: function containsPoint2D(point) {
      // is x, z inside bounding box

      return this.box.min.x <= point.x && this.box.max.x >= point.x && this.box.min.z <= point.z && this.box.max.z >= point.z;
    }
  }, {
    key: 'containsPointPrecise2D',
    value: function containsPointPrecise2D(point) {
      if (Maths.dotProduct2({ x: point.x - this.e1.centre.x, y: point.z - this.e1.centre.z }, this.e1.norm2) < _conf.Config.plane.dotBuffer && Maths.dotProduct2({ x: point.x - this.e2.centre.x, y: point.z - this.e2.centre.z }, this.e2.norm2) < _conf.Config.plane.dotBuffer && Maths.dotProduct2({ x: point.x - this.e3.centre.x, y: point.z - this.e3.centre.z }, this.e3.norm2) < _conf.Config.plane.dotBuffer) {
        return true;
      }

      return false;
    }
  }, {
    key: 'distanceToPlane',
    value: function distanceToPlane(point) {
      return Math.abs(this.normal.x * point.x + this.normal.y * point.y + this.normal.z * point.z + this.D);
    }
  }, {
    key: 'getIntersect',
    value: function getIntersect(p1, p2) {
      // get intersection of plane and line between p1, p2

      var vec = Maths.subtractVector(p2, p1);
      var dot = Maths.dotProduct(this.normal, Maths.normalise(vec));

      // check for parallel lines
      if (Math.abs(dot) <= _conf.Config.plane.dotBuffer) {
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
    }
  }, {
    key: 'getNormalIntersect',
    value: function getNormalIntersect(point) {
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
    }
  }, {
    key: 'getNormalIntersect2D',
    value: function getNormalIntersect2D(point) {
      // get 2D (xz) intersect which extends from point to surface

      var numPart = this.normal.x * point.x + this.normal.y * point.y + this.normal.z * point.z + this.D;
      var denom = this.normal.x * this.normal.x + this.normal.z * this.normal.z;

      if (denom == 0) {
        return null;
      } else {
        return new THREE.Vector3(point.x - this.normal.x * numPart / denom, point.y, point.z - this.normal.z * numPart / denom);
      }
    }
  }, {
    key: 'getY',
    value: function getY(x, z) {
      // solve plane for x, z
      if (this.normal.y != 0) {
        return (this.normal.x * x + this.normal.z * z + this.D) / -this.normal.y;
      } else {
        return null;
      }
    }
  }, {
    key: 'getPerpendicularNormals',
    value: function getPerpendicularNormals() {
      return {
        right: new THREE.Vector3(-this.normal.z, 0, this.normal.x),
        left: new THREE.Vector3(this.normal.z, 0, -this.normal.x)
      };
    }
  }]);

  return Plane;
}();

exports.Plane = Plane;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transformer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _maths = __webpack_require__(3);

var Maths = _interopRequireWildcard(_maths);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transformer = function () {
  function Transformer(object) {
    _classCallCheck(this, Transformer);

    this.point = new THREE.Vector3();
    this.position = object.position;
    this.rotation = object.rotation;
    this.scale = object.scale;
    this.rotationOrder = object.rotation.order.split('');
    this.axis = {
      x: new THREE.Vector3(1, 0, 0),
      y: new THREE.Vector3(0, 1, 0),
      z: new THREE.Vector3(0, 0, 1)
    };
    this.checkDefault();
  }

  _createClass(Transformer, [{
    key: 'set',
    value: function set(point) {
      // transform point
      this.point.x = point.x - this.position.x;
      this.point.y = point.y - this.position.y;
      this.point.z = point.z - this.position.z;
    }
  }, {
    key: 'getTransformedPoint',
    value: function getTransformedPoint(point) {
      var transformed = {
        x: point.x - this.position.x,
        y: point.y - this.position.y,
        z: point.z - this.position.z
      };

      return transformed;
    }
  }, {
    key: 'reverseY',
    value: function reverseY(y) {
      var newY = y + this.position.y;

      return newY;
    }
  }, {
    key: 'reverse',
    value: function reverse(point) {
      var transformed = {
        x: point.x + this.position.x,
        y: point.y + this.position.y,
        z: point.z + this.position.z
      };

      return transformed;
    }
  }, {
    key: 'bakeRotation',
    value: function bakeRotation(plane) {
      for (var i = this.rotationOrder.length - 1; i > -1; i -= 1) {
        if (this.rotationOrder[i] == 'X') {
          plane.p1.applyAxisAngle(this.axis.x, this.rotation.x);
          plane.p2.applyAxisAngle(this.axis.x, this.rotation.x);
          plane.p3.applyAxisAngle(this.axis.x, this.rotation.x);
          plane.n1.applyAxisAngle(this.axis.x, this.rotation.x);
          plane.n2.applyAxisAngle(this.axis.x, this.rotation.x);
          plane.n3.applyAxisAngle(this.axis.x, this.rotation.x);
        } else if (this.rotationOrder[i] == 'Y') {
          plane.p1.applyAxisAngle(this.axis.y, this.rotation.y);
          plane.p2.applyAxisAngle(this.axis.y, this.rotation.y);
          plane.p3.applyAxisAngle(this.axis.y, this.rotation.y);
          plane.n1.applyAxisAngle(this.axis.y, this.rotation.y);
          plane.n2.applyAxisAngle(this.axis.y, this.rotation.y);
          plane.n3.applyAxisAngle(this.axis.y, this.rotation.y);
        } else if (this.rotationOrder[i] == 'Z') {
          plane.p1.applyAxisAngle(this.axis.z, this.rotation.z);
          plane.p2.applyAxisAngle(this.axis.z, this.rotation.z);
          plane.p3.applyAxisAngle(this.axis.z, this.rotation.z);
          plane.n1.applyAxisAngle(this.axis.z, this.rotation.z);
          plane.n2.applyAxisAngle(this.axis.z, this.rotation.z);
          plane.n3.applyAxisAngle(this.axis.z, this.rotation.z);
        }
      }
    }
  }, {
    key: 'bakeScale',
    value: function bakeScale(plane) {
      plane.p1 = Maths.scaleByVector(plane.p1, this.scale);
      plane.p2 = Maths.scaleByVector(plane.p2, this.scale);
      plane.p3 = Maths.scaleByVector(plane.p3, this.scale);
    }
  }, {
    key: 'checkDefault',
    value: function checkDefault() {
      // check if transforms are set to default
      this.default = {
        position: this.position.x == 0 && this.position.y == 0 && this.position.z == 0,
        rotation: this.rotation.x == 0 && this.rotation.y == 0 && this.rotation.z == 0,
        scale: this.scale.x == 1 && this.scale.y == 1 && this.scale.z == 1
      };
    }
  }]);

  return Transformer;
}();

exports.Transformer = Transformer;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _general = __webpack_require__(1);

var Maths = _interopRequireWildcard(_general);

var _collider = __webpack_require__(2);

var _conf = __webpack_require__(0);

var _io = __webpack_require__(11);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(domElement) {
    _classCallCheck(this, Player);

    // player handler

    this.domElement = domElement;
    this.config = _conf.Config.sandbox.player;

    // physical props

    this.config.adjust = _conf.Config.sandbox.adjust;
    this.config.physics = _conf.Config.sandbox.physics;
    this.minPitch = this.config.rotation.minPitch;
    this.maxPitch = this.config.rotation.maxPitch;
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

    // world

    this.collider = new _collider.Collider(this.target.position, this.motion);
    this.object = new THREE.Group();
    this.camera = new THREE.PerspectiveCamera(_conf.Config.sandbox.camera.fov, _conf.Config.sandbox.camera.aspect, _conf.Config.sandbox.camera.near, _conf.Config.sandbox.camera.far);
    this.camera.up = new THREE.Vector3(0, 1, 0);

    // set up

    this.events();
    this.resizeCamera();
  }

  _createClass(Player, [{
    key: 'update',
    value: function update(delta, objects) {
      // apply input, compute physics, move

      this.input(delta);
      this.collider.move(delta, objects);
      this.move();
    }
  }, {
    key: 'input',
    value: function input(delta) {
      // handle directional input

      if (this.keyboard.keys.left || this.keyboard.keys.right) {
        // pan left/ right

        var dir = (this.keyboard.keys.left ? 1 : 0) + (this.keyboard.keys.right ? -1 : 0);
        this.target.rotation.yaw += this.config.speed.rotation * delta * dir;
      }

      if (this.keyboard.keys.up || this.keyboard.keys.down) {
        // move forward/ back

        var speed = this.config.physics.noclip ? this.config.speed.noclip * (1 - Math.abs(Math.sin(this.target.rotation.pitch))) : this.config.speed.normal;
        var _dir = (this.keyboard.keys.up ? 1 : 0) + (this.keyboard.keys.down ? -1 : 0);
        var yaw = this.rotation.yaw + this.offset.rotation.yaw;
        var dx = Math.sin(yaw) * speed * _dir;
        var dz = Math.cos(yaw) * speed * _dir;
        this.target.motion.x = dx;
        this.target.motion.z = dz;
      } else {
        // stop moving

        this.target.motion.x = 0;
        this.target.motion.z = 0;
      }

      // handle jump key

      if (this.keyboard.keys.jump) {
        if (this.motion.y == 0 || this.fallTimer < this.config.speed.fallTimerThreshold) {
          // jump

          this.motion.y = this.config.speed.jump;

          // prevent double jump

          this.fallTimer = this.config.speed.fallTimerThreshold;
        }

        // release key

        this.keyboard.releaseKey('jump');
      }

      // compute falling

      this.falling = this.motion.y != 0;
      this.fallTimer = this.falling ? this.fallTimer + delta : 0;

      // toggle noclip

      if (this.keyboard.keys.x) {
        this.keyboard.releaseKey('x');
        this.config.physics.noclip = this.config.physics.noclip == false;
      }

      // handle noclip

      if (this.config.physics.noclip) {
        if (this.keyboard.keys.up || this.keyboard.keys.down) {
          var _dir2 = (this.keyboard.keys.up ? 1 : 0) + (this.keyboard.keys.down ? -1 : 0);
          var pitch = this.target.rotation.pitch;
          this.target.motion.y = Math.sin(pitch) * this.config.speed.noclip * _dir2;
        } else {
          this.target.motion.y = 0;
        }

        this.falling = false;
        this.motion.y = this.target.motion.y;
      }

      // reduce input if falling

      if (!this.falling) {
        this.motion.x = this.target.motion.x;
        this.motion.z = this.target.motion.z;
      } else {
        this.motion.x += (this.target.motion.x - this.motion.x) * this.config.adjust.slow;
        this.motion.z += (this.target.motion.z - this.motion.z) * this.config.adjust.slow;
      }
    }
  }, {
    key: 'move',
    value: function move() {
      // move

      this.position.x += (this.target.position.x - this.position.x) * this.config.adjust.veryFast;
      this.position.y += (this.target.position.y - this.position.y) * this.config.adjust.veryFast;
      this.position.z += (this.target.position.z - this.position.z) * this.config.adjust.veryFast;

      // rotate

      this.rotation.yaw += Maths.minAngleDifference(this.rotation.yaw, this.target.rotation.yaw) * this.config.adjust.fast;
      this.offset.rotation.yaw += (this.target.offset.rotation.yaw - this.offset.rotation.yaw) * this.config.adjust.normal;
      this.rotation.yaw += this.rotation.yaw < 0 ? Maths.twoPi : this.rotation.yaw > Maths.twoPi ? -Maths.twoPi : 0;
      this.rotation.pitch += (this.target.rotation.pitch - this.rotation.pitch) * this.config.adjust.normal;
      this.offset.rotation.pitch += (this.target.offset.rotation.pitch - this.offset.rotation.pitch) * this.config.adjust.normal;
      this.rotation.roll += (this.target.rotation.roll - this.rotation.roll) * this.config.adjust.fast;

      // set camera from position/ rotation

      var pitch = this.rotation.pitch + this.offset.rotation.pitch;
      var yaw = this.rotation.yaw + this.offset.rotation.yaw;
      var height = this.position.y + this.config.height;
      var offxz = 1 - Math.abs(Math.sin(pitch));
      var offy = 1;

      // adjust camera roll for direction

      this.camera.up.z = -Math.sin(this.rotation.yaw) * this.rotation.roll;
      this.camera.up.x = Math.cos(this.rotation.yaw) * this.rotation.roll;

      // set position

      this.camera.position.set(this.position.x - Math.sin(yaw) * offxz / 4, height - Math.sin(pitch) * offy / 4, this.position.z - Math.cos(yaw) * offxz / 4);

      // look at target

      this.camera.lookAt(new THREE.Vector3(this.position.x + Math.sin(yaw) * offxz, height + Math.sin(pitch) * offy, this.position.z + Math.cos(yaw) * offxz));

      // move scene object

      this.object.position.set(this.position.x, this.position.y, this.position.z);
    }
  }, {
    key: 'resizeCamera',
    value: function resizeCamera() {
      // resize camera

      var bound = this.domElement.getBoundingClientRect();
      var w = bound.width;
      var h = bound.height;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }, {
    key: 'events',
    value: function events() {
      var _this = this;

      // hook up doc events
      this.mouse = new _io.Mouse(this.domElement);
      this.onMouseDown = function (e) {
        // mouse down

        if (!_this.mouse.isLocked()) {
          _this.mouse.start(e, _this.rotation.pitch, _this.rotation.yaw);
        }
      };
      this.onMouseMove = function (e) {
        // mouse moved

        if (_this.mouse.isActive() && !(_this.keyboard.keys.left || _this.keyboard.keys.right)) {
          _this.mouse.move(e);

          // set targets from delta

          _this.target.rotation.yaw = _this.mouse.getYaw();
          _this.target.rotation.pitch = _this.mouse.getPitch(_this.minPitch, _this.maxPitch);
        }
      };
      this.onMouseUp = function (e) {
        // mouse up

        _this.mouse.stop();
      };
      this.domElement.addEventListener('mousedown', this.onMouseDown, false);
      this.domElement.addEventListener('mousemove', this.onMouseMove, false);
      this.domElement.addEventListener('mouseup', this.onMouseUp, false);
      this.domElement.addEventListener('mouseleave', this.onMouseUp, false);

      // mobile TODO make robust
      this.onMobileDown = function (e) {
        _this.onMouseDown(e.touches[0]);
      };
      this.onMobileMove = function (e) {
        _this.onMouseMove(e.touches[0]);
      };
      this.onMobileUp = function (e) {
        _this.onMouseUp(e.touches[0]);
      };
      this.domElement.addEventListener('touchstart', this.onMobileDown, false);
      this.domElement.addEventListener('touchmove', this.onMobileMove, false);
      this.domElement.addEventListener('touchend', this.onMobileUp, false);

      // keyboard
      this.keyboard = new _io.Keyboard();
      document.addEventListener('keydown', this.keyboard.onKeyDown, false);
      document.addEventListener('keyup', this.keyboard.onKeyUp, false);
    }
  }]);

  return Player;
}();

;

exports.Player = Player;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyboard = __webpack_require__(12);

Object.keys(_keyboard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _keyboard[key];
    }
  });
});

var _logger = __webpack_require__(13);

Object.keys(_logger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _logger[key];
    }
  });
});

var _mouse = __webpack_require__(14);

Object.keys(_mouse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mouse[key];
    }
  });
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    // keyboard handler

    this.keys = {};
    this._events();
  }

  _createClass(Keyboard, [{
    key: "_events",
    value: function _events() {
      var _this = this;

      // hook events

      this.onKeyDown = function (e) {
        // key press

        switch (e.keyCode) {
          case 38:case 87:
            _this.keys.up = true;
            break;
          case 37:case 65:
            _this.keys.left = true;
            break;
          case 40:case 83:
            _this.keys.down = true;
            break;
          case 39:case 68:
            _this.keys.right = true;
            break;
          case 32:
            _this.keys.jump = true;
            break;
          case 88:
            _this.keys.x = true;
          default:
            break;
        }
      };
      this.onKeyUp = function (e) {
        // key release

        switch (e.keyCode) {
          case 38:case 87:
            _this.keys.up = false;
            break;
          case 37:case 65:
            _this.keys.left = false;
            break;
          case 40:case 83:
            _this.keys.down = false;
            break;
          case 39:case 68:
            _this.keys.right = false;
            break;
          default:
            break;
        }
      };
      this.pressKey = function (key) {
        // simulate key press

        _this.keys[key] = true;
      };
      this.releaseKey = function (key) {
        // simulate key release

        _this.keys[key] = false;
      };
    }
  }]);

  return Keyboard;
}();

exports.Keyboard = Keyboard;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);

    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d');
    this.disabled = false;
    document.body.appendChild(this.cvs);
    this.setStyle();
  }

  _createClass(Logger, [{
    key: 'setStyle',
    value: function setStyle() {
      this.cvs.style.position = 'fixed';
      this.cvs.width = window.innerWidth;
      this.cvs.style.pointerEvents = 'none';
      this.cvs.height = 400;
      this.cvs.style.zIndex = 10;
      this.cvs.style.top = 0;
      this.cvs.style.left = 0;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    }
  }, {
    key: 'format',
    value: function format(value) {
      return Math.floor(value * 10) / 10;
    }
  }, {
    key: 'formatVector',
    value: function formatVector(vec) {
      return this.format(vec.x) + ', ' + this.format(vec.y) + ', ' + this.format(vec.z);
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.disabled = true;
    }
  }, {
    key: 'print',
    value: function print() {
      if (!this.disabled) {
        this.clear();

        for (var i = 0; i < arguments.length; i += 1) {
          this.ctx.fillText(arguments[i], 20, 20 + i * 20);
        }
      }
    }
  }]);

  return Logger;
}();

exports.Logger = Logger;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mouse = function () {
  function Mouse(domElement) {
    _classCallCheck(this, Mouse);

    // mouse handler

    this.domElement = domElement;
    this.x = 0;
    this.y = 0;
    this.origin = new THREE.Vector2(0, 0);
    this.delta = new THREE.Vector2(0, 0);
    this.rotation = { pitch: 0, yaw: 0, roll: 0 };
    this.locked = false;
    this.active = false;
  }

  _createClass(Mouse, [{
    key: "start",
    value: function start(e, pitch, yaw) {
      // set mouse position [-1, 1]

      this.active = true;
      var bound = this.domElement.getBoundingClientRect();
      this.origin.x = (e.clientX - bound.x) / bound.width * 2 - 1;
      this.origin.y = (e.clientY - bound.y) / bound.height * 2 - 1;
      this.rotation.pitch = pitch;
      this.rotation.yaw = yaw;
    }
  }, {
    key: "move",
    value: function move(e) {
      // move mouse

      var bound = this.domElement.getBoundingClientRect();
      this.x = (e.clientX - bound.x) / bound.width * 2 - 1;
      this.y = (e.clientY - bound.y) / bound.height * 2 - 1;
      this.delta.x = this.x - this.origin.x;
      this.delta.y = this.y - this.origin.y;
    }
  }, {
    key: "stop",
    value: function stop() {
      // flag off

      this.active = false;
    }
  }, {
    key: "getPitch",
    value: function getPitch(min, max) {
      // get clamped pitch

      var pitch = Math.max(min, Math.min(max, this.rotation.pitch + this.delta.y));

      if (pitch == min || pitch == max) {
        // reset start

        this.origin.y = this.y;
        this.rotation.pitch = pitch;
      }

      return pitch;
    }
  }, {
    key: "getYaw",
    value: function getYaw() {
      // get yaw

      return this.rotation.yaw + this.delta.x;
    }
  }, {
    key: "isActive",
    value: function isActive() {
      return this.active;
    }
  }, {
    key: "isLocked",
    value: function isLocked() {
      return this.locked;
    }
  }]);

  return Mouse;
}();

exports.Mouse = Mouse;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.System = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(0);

var _quadrants = __webpack_require__(16);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var System = function () {
  function System() {
    _classCallCheck(this, System);

    // collider mesh system

    this.quadrants = new _quadrants.Quadrants();
    this.meshes = [];
    this.isColliderSystem = true;
  }

  _createClass(System, [{
    key: 'add',
    value: function add() {
      // add mesh to quadrants

      for (var i = 0; i < arguments.length; i += 1) {
        var mesh = arguments[i];

        if (mesh.isColliderMesh) {
          if (mesh.planes.length <= _conf.Config.system.maxPlanesPerMesh) {
            this.quadrants.add(mesh);
            this.meshes.push(mesh.object);
          } else {
            console.warn('Warning: Mesh not included - plane count exceeds maximum (%s).', _conf.Config.system.maxPlanesPerMesh);
          }
        } else {
          throw 'Error: Input must be Collider.Mesh';
        }
      }
    }
  }, {
    key: 'getCollision',
    value: function getCollision(point) {
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
    }
  }, {
    key: 'getCollisionMeshes',
    value: function getCollisionMeshes(point) {
      // get all meshes which collide with point

      var collisions = [];
      var meshes = this.quadrants.getQuadrantMeshes(point);

      for (var i = 0; i < meshes.length; i += 1) {
        if (meshes[i].getCollision(point)) {
          collisions.push(meshes[i]);
        }
      }

      return collisions;
    }
  }, {
    key: 'getCeilingPlane',
    value: function getCeilingPlane(point) {
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
  }, {
    key: 'getMeshes',
    value: function getMeshes() {
      // return three meshes

      return this.meshes;
    }
  }]);

  return System;
}();

exports.System = System;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Quadrants = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quadrants = function () {
  function Quadrants() {
    _classCallCheck(this, Quadrants);

    // index meshes into quadrants

    this.q = [];
  }

  _createClass(Quadrants, [{
    key: 'positionToQuadrant',
    value: function positionToQuadrant(point) {
      // convert point to quadrant keys

      var keys = {
        x: Math.floor(point.x / _conf.Config.quadrants.size.x),
        y: Math.floor(point.y / _conf.Config.quadrants.size.y),
        z: Math.floor(point.z / _conf.Config.quadrants.size.z)
      };

      return keys;
    }
  }, {
    key: 'add',
    value: function add(mesh) {
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
    }
  }, {
    key: 'addToQuadrant',
    value: function addToQuadrant(x, y, z, mesh) {
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
    }
  }, {
    key: 'getQuadrantMeshes',
    value: function getQuadrantMeshes(point) {
      // get quadrant for point

      var pq = this.positionToQuadrant(point);

      if (this.q[pq.x] && this.q[pq.x][pq.y] && this.q[pq.x][pq.y][pq.z]) {
        return this.q[pq.x][pq.y][pq.z];
      } else {
        return [];
      }
    }
  }]);

  return Quadrants;
}();

;

exports.Quadrants = Quadrants;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loader = __webpack_require__(18);

Object.keys(_loader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loader[key];
    }
  });
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = function () {
  function Loader(basePath) {
    _classCallCheck(this, Loader);

    this.basePath = basePath;
    this.FBXLoader = new THREE.FBXLoader();

    // default envmap

    this.envTextureCube = new THREE.CubeTextureLoader().load([this.basePath + 'envmap/horizontal.jpg', // +x
    this.basePath + 'envmap/horizontal.jpg', // -x
    this.basePath + 'envmap/posy.jpg', this.basePath + 'envmap/negy.jpg', this.basePath + 'envmap/horizontal.jpg', // +z
    this.basePath + 'envmap/horizontal.jpg'] // -z
    );
    //this.envTextureCube.format = THREE.RGBFormat;
    //this.envTextureCube.mapping = THREE.CubeReflectionMapping;
  }

  _createClass(Loader, [{
    key: 'loadFBX',
    value: function loadFBX(filename) {
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
    }
  }, {
    key: 'process',
    value: function process(obj, materials) {
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
          child.material.lightMapIntensity = _conf.Config.Loader.lightMapIntensity;
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
            child.material.opacity = _conf.Config.Loader.glassOpacity;
          }
        } else {
          // no texture, set colour
          //child.material.emissive = child.material.color;
        }
      }
    }
  }, {
    key: 'loadOBJ',
    value: function loadOBJ(filename) {
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
  }]);

  return Loader;
}();

exports.Loader = Loader;

/***/ })
/******/ ]);