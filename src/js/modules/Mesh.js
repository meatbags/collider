import Config from './Config';
import { dotProduct } from './Maths';

const Mesh = function(geometry) {
  if (geometry.isBufferGeometry) {
    this.geometry = geometry;
    this.box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position);
    this.min = this.box.min;
    this.max = this.box.max;
    console.log(geometry);
  } else {
    throw('Error: Input is not THREE.BufferGeometry');
  }
};

Mesh.prototype = {
  isColliderMesh: function() {
    return true;
  },

  generatePlanes: function() {
    //
  },

  check: function(point) {
    if (this.box.containsPoint(point)) {
      // TODO
      // 1. for planes P, get dot product of (P.normal & point - P.pos)
      // 2. for planes P with dot <= 0
      //      for planes S, cull S where (P.normal & S.pos - P.pos) > 0
      //      (cull everything above planes)
      // 3. for remaining planes P, get dot product (same as 1.)
      // 4. if all dots <= 0, collision = true, else = false

    } else {
      return false;
    }
  },
};

export default Mesh;
