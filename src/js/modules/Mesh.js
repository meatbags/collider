import Config from './Config';
import Plane from './Plane';

const Mesh = function(geometry) {
  this.isColliderMesh = true;

  if (geometry.isBufferGeometry) {
    this.geometry = geometry;
    this.box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position);
    this.min = this.box.min;
    this.max = this.box.max;
    this.generatePlanes();
  } else {
    throw('Error: Input is not THREE.BufferGeometry');
  }
};

Mesh.prototype = {
  generatePlanes: function() {
    // create planes from buffer geometry attribute

    this.planes = [];
    const verts = this.geometry.attributes.position.array;
    const norms = this.geometry.attributes.normal.array;

    if (this.geometry.index) {
      // handle indexed geometry
      const indices = this.geometry.index.array;
      const size = this.geometry.attributes.position.itemSize;
      const step = 3;

      for (let i=0; i<indices.length; i+=step) {
        const j = indices[i] * size;
        const k = indices[i+1] * size;
        const l = indices[i+2] * size;

        this.planes.push(new Plane(
          new THREE.Vector3(verts[j], verts[j+1], verts[j+2]),
          new THREE.Vector3(verts[k], verts[k+1], verts[k+2]),
          new THREE.Vector3(verts[l], verts[l+1], verts[l+2]),
          new THREE.Vector3(norms[j], norms[j+1], norms[j+2]),
          new THREE.Vector3(norms[k], norms[k+1], norms[k+2]),
          new THREE.Vector3(norms[l], norms[l+1], norms[l+2])
        ));
      }
    } else {
      const step = 9;

      for (let i=0; i<verts.length; i+=step) {
        this.planes.push(new Plane(
            new THREE.Vector3(verts[i+0], verts[i+1], verts[i+2]),
            new THREE.Vector3(verts[i+3], verts[i+4], verts[i+5]),
            new THREE.Vector3(verts[i+6], verts[i+7], verts[i+8]),
            new THREE.Vector3(norms[i+0], norms[i+1], norms[i+2]),
            new THREE.Vector3(norms[i+3], norms[i+4], norms[i+5]),
            new THREE.Vector3(norms[i+6], norms[i+7], norms[i+8])
          )
        );
      }
    }
  },

  check: function(point) {
    if (this.box.containsPoint(point)) {
      // reset
      for (let i=0; i<this.planes.length; i+=1) {
        this.planes[i].revive();
      }

      // first pass
      for (let i=0; i<this.planes.length; i+=1) {
        if (!this.planes[i].culled && this.planes[i].isPointBelowOrEqual(point)) {
          // cull planes above plane
          for (let j=0; j<this.planes.length; j+=1) {
            if (!this.planes[j].culled && j != i && this.planes[i].isPlaneAbove(this.planes[j])) {
              this.planes[j].cull();
            }
          }
        }
      }

      // second pass
      for (let i=0; i<this.planes.length; i+=1) {
        if (!this.planes[i].culled && this.planes[i].isPointAboveOrEqual(point)) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  },
};

export default Mesh;
