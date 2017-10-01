import * as Maths from './Maths';
import Config from './Config';

const Plane = function(p1, p2, p3, n1, n2, n3) {
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
  generatePlane: function() {
    // generate a plane

    const edge12 = Maths.subtractVector(this.p2, this.p1);
    const edge13 = Maths.subtractVector(this.p3, this.p1);

    // get normal
    this.normal = Maths.normalise(Maths.crossProduct(edge12, edge13));

    // reverse naughty normals
    if (Maths.dotProduct(this.normal, this.n1) < 0) {
      this.normal = Maths.reverseVector(this.normal);
    }

    // get position
    this.position = new THREE.Vector3(
      (this.p1.x + this.p2.x + this.p3.x) / 3,
      (this.p1.y + this.p2.y + this.p3.y) / 3,
      (this.p1.z + this.p2.z + this.p3.z) / 3
    );

    // cache D for solving plane
    this.D = -(this.normal.x * this.position.x) - (this.normal.y * this.position.y) - (this.normal.z * this.position.z);

    // create bounding box
    const points = [this.p1, this.p2, this.p3];
    this.box = new THREE.Box3().setFromPoints(points);
  },

  isPointAbove: function(point) {
    // is point above plane

    const vec = Maths.subtractVector(point, this.position);
    const dot = Maths.dotProduct(vec, this.normal);
    const res = (dot > 0);

    return res;
  },

  isPointBelow: function(point) {
    // is point below plane

    const vec = Maths.subtractVector(point, this.position);
    const dot = Maths.dotProduct(vec, this.normal);
    const res = (dot < 0);

    return res;
  },

  isPointAboveOrEqual: function(point) {
    // is point above plane or on surface

    const vec = Maths.subtractVector(point, this.position);
    const dot = Maths.dotProduct(vec, this.normal);
    const res = (dot >= -Config.plane.dotBuffer);

    return res;
  },

  isPointBelowOrEqual: function(point) {
    // is point below plane or on surface

    const vec = Maths.subtractVector(point, this.position);
    const dot = Maths.dotProduct(vec, this.normal);
    const res = (dot <= Config.plane.dotBuffer);

    return res;
  },

  isPlaneAbove: function(plane) {
    // check if whole plane is above

    return (
      this.isPointAboveOrEqual(plane.p1) &&
      this.isPointAboveOrEqual(plane.p2) &&
      this.isPointAboveOrEqual(plane.p3)
    );
  },

  containsPoint: function(point) {
    // is inside bounding box

    return this.box.containsPoint(point);
  },

  containsPointXZ: function(point) {
    // is X, Z inside bounding box

    return this.box.containsPoint(new THREE.Vector3(point.x, this.position.y, point.z));
  },

  getY: function(x, z) {
    // solve plane for x, z

    const y = (this.normal.x * x + this.normal.z * z + this.D) / -this.normal.y;

    return y;
  },

  cull: function() {
    this.culled = true;
  },

  revive: function() {
    this.culled = false;
  }
};

export default Plane;
