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
    // generate a plane (position & vector)

    const edge12 = Maths.subtractVector(this.p2, this.p1);
    const edge13 = Maths.subtractVector(this.p3, this.p1);
    this.normal = Maths.normalise(Maths.crossProduct(edge12, edge13));

    if (Maths.dotProduct(this.normal, this.n1) < 0) {
      // reverse naughty normals
      this.normal = Maths.reverseVector(this.normal);
    }

    this.position = new THREE.Vector3(
      (this.p1.x + this.p2.x + this.p3.x) / 3,
      (this.p1.y + this.p2.y + this.p3.y) / 3,
      (this.p1.z + this.p2.z + this.p3.z) / 3
    );
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
  
  cull: function() {
    this.culled = true;
  },

  revive: function() {
    this.culled = false;
  }
};

export default Plane;
