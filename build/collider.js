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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(8);

Object.keys(_config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _config[key];
    }
  });
});

var _physics = __webpack_require__(9);

Object.keys(_physics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _physics[key];
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
  return new THREE.Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
};

var averageVectors = function averageVectors(a, b) {
  return new THREE.Vector3((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
};

var subtractVector = function subtractVector(a, b) {
  var c = new THREE.Vector3(a.x - b.x, a.y - b.y, a.z - b.z);

  return c;
};

var mulVector = function mulVector(a, b) {
  var v = new THREE.Vector3(a.x * b.x, a.y * b.y, a.z * b.z);

  return v;
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
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2));
};

var distanceBetween2D = function distanceBetween2D(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2));
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

exports.addVector = addVector;
exports.averageVectors = averageVectors;
exports.copyVector = copyVector;
exports.crossProduct = crossProduct;
exports.distanceBetween = distanceBetween;
exports.distanceBetween2D = distanceBetween2D;
exports.dotProduct = dotProduct;
exports.dotProduct2 = dotProduct2;
exports.isVectorEqual = isVectorEqual;
exports.minAngleDifference = minAngleDifference;
exports.mulVector = mulVector;
exports.normalise = normalise;
exports.normalise2 = normalise2;
exports.pitchBetween = pitchBetween;
exports.reverseVector = reverseVector;
exports.subtractVector = subtractVector;
exports.scaleVector = scaleVector;
exports.scaleByVector = scaleByVector;
exports.twoPi = twoPi;

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mesh = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(0);

var _plane = __webpack_require__(10);

var _box = __webpack_require__(4);

var _transformer = __webpack_require__(11);

var _maths = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mesh = function () {
  function Mesh(object) {
    _classCallCheck(this, Mesh);

    // collision mesh

    if (!object.geometry.isBufferGeometry) {
      throw 'Error: THREE.BufferGeometry not found';
    }

    this.id = object.uuid;
    this.isColliderMesh = true;
    this.object = object;
    this.geometry = object.geometry;
    this.box = new _box.Box(object);
    this.planes = [];
    this.transform = new _transformer.Transformer(object);
    this.generatePlanes();
    this.conformPlanes();
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
      // NOTE: translation is handled during collision check
      // TODO: bake all translations
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
        // regenerate plane attributes
        for (var _i3 = 0; _i3 < this.planes.length; _i3 += 1) {
          this.planes[_i3].generatePlane();
        }
      }

      // reset collision box
      this.setBoxFromPlanes();
    }
  }, {
    key: 'setBoxFromPlanes',
    value: function setBoxFromPlanes() {
      var array = [];

      for (var i = 0, len = this.planes.length; i < len; ++i) {
        var p = this.planes[i];
        array.push(p.p1);
        array.push(p.p2);
        array.push(p.p3);
      }

      this.box.setFromPoints(array);
      this.updateBoxPosition();
    }
  }, {
    key: 'updateBoxPosition',
    value: function updateBoxPosition() {
      this.box.setPosition(this.transform.getPosition());
    }
  }, {
    key: 'getCollision',
    value: function getCollision(point) {
      if (!this.box.containsPoint(point)) {
        return false;
      } else {
        // transform point to put inside baked position
        this.transform.set(point);

        // reset
        for (var i = 0, len = this.planes.length; i < len; ++i) {
          this.planes[i].culled = false;
        }

        // first pass - cull faces
        for (var i = 0, len = this.planes.length; i < len; ++i) {
          if (!this.planes[i].culled && this.planes[i].isPointBelowOrEqual(this.transform.point)) {
            // cull planes above plane
            for (var j = 0, jlen = this.planes.length; j < jlen; ++j) {
              if (!this.planes[j].culled && j != i && this.planes[i].isPlaneAbove(this.planes[j])) {
                this.planes[j].culled = true;
              }
            }
          }
        }

        // second pass - get result
        for (var i = 0, len = this.planes.length; i < len; ++i) {
          if (!this.planes[i].culled && !this.planes[i].isPointBelowOrEqual(this.transform.point)) {
            return false;
          }
        }

        return true;
      }
    }
  }, {
    key: 'getCeilingPlane',
    value: function getCeilingPlane(point) {
      // get ceiling, plane above a given point
      this.transform.set(point);
      var ceiling = null;

      for (var i = 0, len = this.planes.length; i < len; i += 1) {
        // check general box, then precise, then for ceiling
        if (this.planes[i].containsPoint2D(this.transform.point)) {
          if (this.planes[i].projectedTriangleContainsPoint2D(this.transform.point) && this.planes[i].isPointBelowOrEqual(this.transform.point)) {
            var planeCeiling = this.planes[i].getY(this.transform.point.x, this.transform.point.z);

            if (planeCeiling != null && planeCeiling >= this.transform.point.y && (ceiling == null || planeCeiling > ceiling.y)) {
              ceiling = { y: planeCeiling, plane: this.planes[i] };
            }
          }
        }
      }

      return ceiling == null ? null : {
        y: this.transform.getReverseTransformedY(ceiling.y),
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
        intersect: this.transform.getReverseTransformedPoint(intersectPlane.intersect),
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
        intersect: this.transform.getReverseTransformedPoint(intersectPlane.intersect),
        plane: intersectPlane.plane,
        distance: intersectPlane.distance
      };
    }
  }, {
    key: 'getProjected',
    value: function getProjected(point, plane) {
      // get point projected onto plane

      var p = this.transform.getTransformedPoint(point);
      var proj = plane.getProjected(p);
      return this.transform.getReverseTransformedPoint(proj);
    }
  }]);

  return Mesh;
}();

exports.Mesh = Mesh;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Box = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _maths = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Box = function (_THREE$Box) {
  _inherits(Box, _THREE$Box);

  function Box(object) {
    _classCallCheck(this, Box);

    var _this = _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this));
    // THREE.Box3 + functions


    _this.setFromBufferAttribute(object.geometry.attributes.position);
    _this.position = new THREE.Vector3();
    return _this;
  }

  _createClass(Box, [{
    key: 'setPosition',
    value: function setPosition(p) {
      // update position if not set
      if (!(0, _maths.isVectorEqual)(this.position, p)) {
        this.translate((0, _maths.subtractVector)(p, this.position));
        this.position = p.clone();
      }
    }
  }]);

  return Box;
}(THREE.Box3);

exports.Box = Box;

/***/ }),
/* 5 */
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

    this.position = position;
    this.motion = motion;
    this.config = _conf.Physics;
  }

  _createClass(Collider, [{
    key: 'setPhysics',
    value: function setPhysics(params) {
      for (var key in params) {
        if (params.hasOwnProperty(key) && this.config.hasOwnProperty(key)) {
          this.config[key] = params[key];
        }
      }
    }
  }, {
    key: 'applyPhysics',
    value: function applyPhysics(delta) {
      this.falling = this.motion.y < 0;
      this.motion.y = Math.max(this.motion.y - this.config.gravity * delta, -this.config.maxVelocity);
    }
  }, {
    key: 'move',
    value: function move(delta, system) {
      // move collider against the system
      var p = Maths.addVector(this.position, Maths.scaleVector(this.motion, delta));
      this.applyPhysics(delta);
      var collisions = system.getCollisionMeshes(p);

      // interact with slopes, walls
      if (collisions.length > 0) {
        if (this.stepUpSlopes(p, collisions)) {
          collisions = system.getCollisionMeshes(p);
        }
        if (this.extrudeFrom(p, collisions, system)) {
          this.stepUpSlopes(p, system.getCollisionMeshes(p));
        }
      } else if (this.motion.y < 0 && !this.falling) {
        this.stepDownSlope(p, system.getCeilingPlane(new THREE.Vector3(p.x, p.y - this.config.snapDown, p.z)));
      }

      // global floor
      if (p.y < this.config.floor) {
        this.motion.y = 0;
        p.y = this.config.floor;
      }

      // set final position
      this.position.copy(p);
    }
  }, {
    key: 'getValidCollisions',
    value: function getValidCollisions(p, meshes) {
      // get n collisions with meshes that can't be climbed
      var hits = 0;

      for (var i = 0, len = meshes.length; i < len; ++i) {
        var ceiling = meshes[i].getCeilingPlane(p);
        if (ceiling != null && (ceiling.plane.normal.y < this.config.minSlope || ceiling.y - this.position.y > this.config.snapUp)) {
          hits++;
        }
      }

      return hits;
    }
  }, {
    key: 'extrudeFrom',
    value: function extrudeFrom(p, meshes, system) {
      // extrude position from obstructions
      var isExtruded = false;
      var mesh = false;

      for (var i = 0, len = meshes.length; i < len; ++i) {
        var ceiling = meshes[i].getCeilingPlane(p);
        if (ceiling != null && (ceiling.plane.normal.y < this.config.minSlope || ceiling.y - this.position.y > this.config.snapUp)) {
          mesh = meshes[i];
          break;
        }
      }

      // extrude from mesh
      if (mesh) {
        var intersectPlane = mesh.getIntersectPlane2D(this.position, p);

        if (intersectPlane != null) {
          var intersect = intersectPlane.intersect;
          var plane = intersectPlane.plane;

          if (plane.normal.y < -0.5) {
            // project in 3D, if other mesh collisions, try 2D
            // NOTE: needs refinement

            var proj = mesh.getProjected(p, plane);
            var hits = this.getValidCollisions(proj, system.getCollisionMeshes(proj));

            // stop motion if cornered
            if (hits > 1) {
              p.x = this.position.x;
              p.z = this.position.z;
            } else {
              p.x = proj.x;
              p.y = proj.y;
              p.z = proj.z;
              // reduce jump motion
              this.motion.y = this.motion.y > 0 ? this.motion.y * 0.75 : this.motion.y;
              //this.motion.y = Math.min(-0.01, this.motion.y);
              isExtruded = true;
            }
          } else {
            p.x = intersect.x;
            p.z = intersect.z;
            var _hits = this.getValidCollisions(p, system.getCollisionMeshes(p));

            // stop motion if cornered
            if (_hits > 1) {
              p.x = this.position.x;
              p.z = this.position.z;
            } else {
              isExtruded = true;
            }
          }
        } else {
          p.x = this.position.x;
          p.z = this.position.z;
        }
      }

      return isExtruded;
    }
  }, {
    key: 'stepUpSlopes',
    value: function stepUpSlopes(position, meshes) {
      var steppedUp = false;

      for (var i = 0, len = meshes.length; i < len; ++i) {
        var ceiling = meshes[i].getCeilingPlane(position);
        // climb up slopes
        if (ceiling != null && ceiling.plane.normal.y >= this.config.minSlope && ceiling.y - this.position.y <= this.config.snapUp) {
          if (ceiling.y >= position.y) {
            steppedUp = true;
            position.y = ceiling.y;
            this.motion.y = 0;
          }
        }
      }

      return steppedUp;
    }
  }, {
    key: 'stepDownSlope',
    value: function stepDownSlope(position, ceilingPlane) {
      var steppedDown = false;

      if (ceilingPlane != null && ceilingPlane.plane.normal.y >= this.config.minSlope) {
        position.y = ceilingPlane.y;
        this.motion.y = 0;
        steppedDown = true;
      }

      return steppedDown;
    }
  }]);

  return Collider;
}();

exports.Collider = Collider;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
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

var _collider = __webpack_require__(14);

Object.keys(_collider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collider[key];
    }
  });
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mesh = __webpack_require__(3);

Object.keys(_mesh).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mesh[key];
    }
  });
});

var _system = __webpack_require__(12);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
window.mobileAndTabletcheck = function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

var Config = {
  isMobile: window.mobileAndTabletcheck(),
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
        noclip: 30,
        rotation: Math.PI * 0.75,
        jump: 10,
        fallTimerThreshold: 0.2
      }
    },
    camera: {
      fov: 75,
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// physical properties

var Physics = {
  gravity: 18,
  maxVelocity: 50,
  friction: 0.5,
  floor: 0,
  snapUp: 0.75,
  snapDown: 0.5,
  minSlope: Math.PI / 5,
  noclip: false
};

exports.Physics = Physics;

/***/ }),
/* 10 */
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

    // first state of plane

    this.generatePlane();
  }

  _createClass(Plane, [{
    key: 'generatePlane',
    value: function generatePlane() {
      // generate plane data
      this.e1 = {};
      this.e2 = {};
      this.e3 = {};
      this.e1.centre = Maths.scaleVector(Maths.addVector(this.p1, this.p2), 0.5);
      this.e2.centre = Maths.scaleVector(Maths.addVector(this.p2, this.p3), 0.5);
      this.e3.centre = Maths.scaleVector(Maths.addVector(this.p3, this.p1), 0.5);
      this.e1.vec = Maths.subtractVector(this.p2, this.p1);
      this.e2.vec = Maths.subtractVector(this.p3, this.p2);
      this.e3.vec = Maths.subtractVector(this.p1, this.p3);

      // 2D component & 2D normal
      this.e1.vec2 = new THREE.Vector2(this.e1.vec.x, this.e1.vec.z);
      this.e2.vec2 = new THREE.Vector2(this.e2.vec.x, this.e2.vec.z);
      this.e3.vec2 = new THREE.Vector2(this.e3.vec.x, this.e3.vec.z);
      this.e1.norm2 = new THREE.Vector2(-this.e1.vec.z, this.e1.vec.x);
      this.e2.norm2 = new THREE.Vector2(-this.e2.vec.z, this.e2.vec.x);
      this.e3.norm2 = new THREE.Vector2(-this.e3.vec.z, this.e3.vec.x);

      // normal
      this.normal = Maths.normalise(Maths.crossProduct(this.e3.vec, this.e1.vec));
      this.normalXZ = new THREE.Vector3(this.normal.x, 0, this.normal.z);

      // reverse naughty normals
      if (Maths.dotProduct(this.normal, this.n1) < 0 && Maths.dotProduct(this.normal, this.n2) < 0 && Maths.dotProduct(this.normal, this.n3) < 0) {
        this.normal = Maths.reverseVector(this.normal);
      }

      // position
      this.position = new THREE.Vector3((this.p1.x + this.p2.x + this.p3.x) / 3, (this.p1.y + this.p2.y + this.p3.y) / 3, (this.p1.z + this.p2.z + this.p3.z) / 3);

      // cache D for solving plane
      this.D = -(this.normal.x * this.position.x) - this.normal.y * this.position.y - this.normal.z * this.position.z;

      // bounding box
      this.box = new THREE.Box3().setFromPoints([this.p1, this.p2, this.p3]);
    }
  }, {
    key: 'getY',
    value: function getY(x, z) {
      // solve plane
      if (this.normal.y != 0) {
        return (this.normal.x * x + this.normal.z * z + this.D) / -this.normal.y;
      } else {
        return null;
      }
    }
  }, {
    key: 'isPlaneAbove',
    value: function isPlaneAbove(plane) {
      return this.isPointAboveOrEqual(plane.p1) && this.isPointAboveOrEqual(plane.p2) && this.isPointAboveOrEqual(plane.p3);
    }
  }, {
    key: 'isPointAboveOrEqual',
    value: function isPointAboveOrEqual(point) {
      // is point above or on surface
      return Maths.dotProduct(Maths.subtractVector(point, this.position), this.normal) >= -_conf.Config.plane.dotBuffer;
    }
  }, {
    key: 'isPointBelowOrEqual',
    value: function isPointBelowOrEqual(point) {
      // is point below or on surface
      return Maths.dotProduct(Maths.subtractVector(point, this.position), this.normal) <= _conf.Config.plane.dotBuffer;
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
    key: 'projectedTriangleContainsPoint2D',
    value: function projectedTriangleContainsPoint2D(point) {
      // is point inside projected triangle
      return Maths.dotProduct2({ x: point.x - this.e1.centre.x, y: point.z - this.e1.centre.z }, this.e1.norm2) < _conf.Config.plane.dotBuffer && Maths.dotProduct2({ x: point.x - this.e2.centre.x, y: point.z - this.e2.centre.z }, this.e2.norm2) < _conf.Config.plane.dotBuffer && Maths.dotProduct2({ x: point.x - this.e3.centre.x, y: point.z - this.e3.centre.z }, this.e3.norm2) < _conf.Config.plane.dotBuffer;
    }
  }, {
    key: 'distanceToPlane',
    value: function distanceToPlane(point) {
      return Math.abs(this.normal.x * point.x + this.normal.y * point.y + this.normal.z * point.z + this.D);
    }
  }, {
    key: 'getProjected',
    value: function getProjected(point) {
      // project point onto plane

      var vec = Maths.subtractVector(point, this.p1);
      var dist = Maths.dotProduct(this.normal, vec);
      var proj = Maths.subtractVector(point, Maths.scaleVector(this.normal, dist));
      return proj;
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
      if (this.box.containsPoint(point)) {
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transformer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _maths = __webpack_require__(2);

var Maths = _interopRequireWildcard(_maths);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transformer = function () {
  function Transformer(object) {
    _classCallCheck(this, Transformer);

    // bake initial transformations into vectex data

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
    key: 'getReverseTransformedPoint',
    value: function getReverseTransformedPoint(point) {
      var transformed = {
        x: point.x + this.position.x,
        y: point.y + this.position.y,
        z: point.z + this.position.z
      };

      return transformed;
    }
  }, {
    key: 'getReverseTransformedY',
    value: function getReverseTransformedY(y) {
      var newY = y + this.position.y;

      return newY;
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this.position;
    }
  }, {
    key: 'bakeRotation',
    value: function bakeRotation(plane) {
      for (var i = this.rotationOrder.length - 1, end = -1; i > end; --i) {
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.System = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(0);

var _mesh = __webpack_require__(3);

var _map = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var System = function () {
  function System() {
    _classCallCheck(this, System);

    // collider mesh system

    this.isColliderSystem = true;
    this.map = new _map.Map();
    this.meshes = [];
  }

  _createClass(System, [{
    key: 'add',
    value: function add() {
      // add mesh to system

      for (var i = 0, len = arguments.length; i < len; ++i) {
        var mesh = arguments[i];

        if (mesh.isColliderMesh) {
          this.appendMesh(mesh);
        } else {
          if (mesh.geometry && mesh.geometry.isBufferGeometry) {
            this.appendMesh(new _mesh.Mesh(mesh));
          } else {
            throw 'Error: Mesh must be THREE.Mesh or Collider.Mesh';
          }
        }
      }
    }
  }, {
    key: 'appendMesh',
    value: function appendMesh(mesh) {
      if (mesh.planes.length <= _conf.Config.system.maxPlanesPerMesh) {
        this.map.add(mesh);
        this.meshes.push(mesh.object);
      } else {
        console.warn('Warning: Mesh discluded. Plane count exceeds maximum (%s).', _conf.Config.system.maxPlanesPerMesh);
      }
    }
  }, {
    key: 'getCollision',
    value: function getCollision(point) {
      // check for collision at point

      var collision = false;
      var meshes = this.map.getMeshes(point);

      for (var i = 0, len = meshes.length; i < len; ++i) {
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
      var meshes = this.map.getMeshes(point);

      for (var i = 0, len = meshes.length; i < len; ++i) {
        if (meshes[i].getCollision(point)) {
          collisions.push(meshes[i]);
        }
      }

      return collisions;
    }
  }, {
    key: 'getCeilingPlane',
    value: function getCeilingPlane(point) {
      // get ceiling and plane above point

      var ceiling = null;
      var meshes = this.map.getMeshes(point);

      for (var i = 0, len = meshes.length; i < len; ++i) {
        if (meshes[i].getCollision(point)) {
          var result = meshes[i].getCeilingPlane(point);

          if (result && (!ceiling || result.y > ceiling.y)) {
            ceiling = { y: result.y, plane: result.plane };
          }
        }
      }

      return ceiling;
    }
  }, {
    key: 'getMeshes',
    value: function getMeshes() {
      return this.meshes;
    }
  }]);

  return System;
}();

exports.System = System;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Map = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conf = __webpack_require__(0);

var _box = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
  function Map() {
    _classCallCheck(this, Map);

    // cache nearby meshes for faster lookups
    this.origin = new THREE.Vector3();
    this.radius = 10;
    this.threshold = this.radius - 1;
    this.meshes = [];
    this.nearby = [];
  }

  _createClass(Map, [{
    key: 'add',
    value: function add(mesh) {
      this.meshes.push(mesh);
      this.cacheNearbyMeshes();
    }
  }, {
    key: 'getMeshes',
    value: function getMeshes(point) {
      // get meshes near point
      if (this.origin.distanceTo(point) >= this.threshold) {
        this.origin.copy(point);
        this.cacheNearbyMeshes();
      }
      return this.nearby;
    }
  }, {
    key: 'cacheNearbyMeshes',
    value: function cacheNearbyMeshes() {
      // cache meshes close to origin
      this.nearby = [];
      for (var i = 0, len = this.meshes.length; i < len; ++i) {
        this.meshes[i].updateBoxPosition();
        var d = this.meshes[i].box.distanceToPoint(this.origin);
        if (this.meshes[i].box.distanceToPoint(this.origin) <= this.radius) {
          this.nearby.push(this.meshes[i]);
        }
      }
    }
  }]);

  return Map;
}();

;

exports.Map = Map;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collider = __webpack_require__(5);

Object.keys(_collider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collider[key];
    }
  });
});

var _player = __webpack_require__(15);

Object.keys(_player).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _player[key];
    }
  });
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _general = __webpack_require__(1);

var Maths = _interopRequireWildcard(_general);

var _collider = __webpack_require__(5);

var _conf = __webpack_require__(0);

var _io = __webpack_require__(16);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(domElement) {
    _classCallCheck(this, Player);

    // player handler
    this.domElement = domElement;
    this.isMobile = _conf.Config.isMobile;
    this.config = _conf.Config.sandbox.player;

    // physical props
    this.config.adjust = _conf.Config.sandbox.adjust;
    this.config.physics = _conf.Physics;
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
    this.light = new THREE.PointLight(0xffffff, 0.1);
    this.light.position.y = 1;
    this.object.add(this.light);
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
        var dir = (this.keyboard.keys.left ? 1 : 0) + (this.keyboard.keys.right ? -1 : 0);
        this.target.rotation.yaw += this.config.speed.rotation * delta * dir;
      }

      if (this.keyboard.keys.up || this.keyboard.keys.down) {
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

        // force release
        this.keyboard.releaseKey('jump');
      }

      this.falling = this.motion.y != 0;
      this.fallTimer = this.falling ? this.fallTimer + delta : 0;

      // noclip
      if (this.keyboard.keys.x) {
        this.keyboard.releaseKey('x');
        this.config.physics.noclip = this.config.physics.noclip == false;
      }

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

      // reduce speed if falling
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
      this.camera.position.set(this.position.x - Math.sin(yaw) * offxz * 0.25, height - Math.sin(pitch) * offy * 0.25, this.position.z - Math.cos(yaw) * offxz * 0.25);

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
      this.domElement.addEventListener('mousedown', function (e) {
        _this.onMouseDown(e);
      });
      this.domElement.addEventListener('mousemove', function (e) {
        _this.onMouseMove(e);
      });
      this.domElement.addEventListener('mouseup', function (e) {
        _this.onMouseUp(e);
      });
      this.domElement.addEventListener('mouseleave', function (e) {
        _this.onMouseUp(e);
      });

      // mobile
      if (this.isMobile) {
        this.onMobileDown = function (e) {
          if (e.touches[0]) {
            _this.onMouseDown(e.touches[0]);
          }
        };
        this.onMobileMove = function (e) {
          if (e.touches[0]) {
            _this.onMouseMove(e.touches[0]);
          }
        };
        this.onMobileUp = function (e) {
          if (e.touches[0]) {
            _this.onMouseUp(e.touches[0]);
          }
        };
        this.domElement.addEventListener('touchstart', function (e) {
          _this.onMobileDown(e);
        });
        this.domElement.addEventListener('touchmove', function (e) {
          _this.onMobileMove(e);
        });
        this.domElement.addEventListener('touchend', function (e) {
          _this.onMobileUp(e);
        });
        console.log('Mobile events registered.');
      }

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyboard = __webpack_require__(17);

Object.keys(_keyboard).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _keyboard[key];
    }
  });
});

var _logger = __webpack_require__(18);

Object.keys(_logger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _logger[key];
    }
  });
});

var _mouse = __webpack_require__(19);

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
/* 17 */
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
/* 18 */
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
/* 19 */
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
    this.origin = { x: 0, y: 0 };
    this.delta = { x: 0, y: 0 };
    this.pitch = 0;
    this.yaw = 0;
    this.locked = false;
    this.active = false;
  }

  _createClass(Mouse, [{
    key: "start",
    value: function start(e, pitch, yaw) {
      // set mouse position [-1, 1]
      var bound = this.domElement.getBoundingClientRect();
      this.pitch = !isNaN(pitch) ? pitch : 0;
      this.yaw = !isNaN(yaw) ? yaw : 0;
      this.active = true;
      this.origin.x = bound.width ? (e.clientX - bound.left) / bound.width * 2 - 1 : 0;
      this.origin.y = bound.height ? (e.clientY - bound.top) / bound.height * 2 - 1 : 0;
    }
  }, {
    key: "move",
    value: function move(e) {
      // move mouse
      var bound = this.domElement.getBoundingClientRect();
      this.x = (e.clientX - bound.left) / bound.width * 2 - 1;
      this.y = (e.clientY - bound.top) / bound.height * 2 - 1;
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
    value: function getPitch(pmin, pmax) {
      // get clamped pitch
      var p = Math.max(pmin, Math.min(pmax, this.pitch + this.delta.y));

      if (p <= pmin || p >= pmax) {
        // reset start
        this.origin.y = this.y;
        this.pitch = pitch;
      }

      return p;
    }
  }, {
    key: "getYaw",
    value: function getYaw() {
      return this.yaw + this.delta.x;
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

/***/ })
/******/ ]);