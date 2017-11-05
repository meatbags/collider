import Config from './Config';
import Plane from './Plane';
import { subtractVector, dotProduct, normalise, distanceBetween } from './Maths';

const Mesh = function(geometry) {
  this.isColliderMesh = true;
  console.log(geometry);

  if (geometry.isBufferGeometry) {
    this.geometry = geometry;
    this.box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position);
    this.min = this.box.min;
    this.max = this.box.max;
    this.planes = [];
    // TODO: activate & change bbox stuff
    this.translate = new THREE.Vector3(0, 0, 0);
    this.rotate = new THREE.Vector3(0, 0, 0);
    this.generatePlanes();
  } else {
    throw('Error: Input is not THREE.BufferGeometry');
  }
};

Mesh.prototype = {
  generatePlanes: function() {
    // create planes from buffer geometry attribute

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

  getCollision: function(point) {
    if (this.box.containsPoint(point)) {
      // reset
      for (let i=0; i<this.planes.length; i+=1) {
        this.planes[i].culled = false;
      }

      // first pass - cull faces
      for (let i=0; i<this.planes.length; i+=1) {
        if (!this.planes[i].culled && this.planes[i].isPointBelowOrEqual(point)) {
          // cull planes above plane
          for (let j=0; j<this.planes.length; j+=1) {
            if (!this.planes[j].culled && j != i && this.planes[i].isPlaneAbove(this.planes[j])) {
              this.planes[j].culled = true;
            }
          }
        }
      }

      // second pass - get result
      for (let i=0; i<this.planes.length; i+=1) {
        if (!this.planes[i].culled && !this.planes[i].isPointBelowOrEqual(point)) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  },

  getCollision2D: function(point) {
    return (
      point.x >= this.min.x && point.x <= this.max.x &&
      point.z >= this.min.z && point.z <= this.max.z
    );
  },

  getCeiling2D: function(point) {
    let y = null;

    for (let i=0; i<this.planes.length; i+=1) {
      if (this.planes[i].containsPoint2D(point)) {
        let planeCeiling = plane.getY(point.x, point.z);

        if (y === null || planeCeiling > y) {
          y = planeCeiling;
        }
      }
    }

    return y;
  },

  getCeiling: function(point) {
    // get ceiling *above* point

    let y = null;

    for (let i=0; i<this.planes.length; i+=1) {
      if (this.planes[i].containsPoint2D(point) && this.planes[i].isPointBelowOrEqual(point)) {
        let planeCeiling = plane.getY(point.x, point.z);

        if (planeCeiling >= point.y && (y === null || planeCeiling < y)) {
          y = planeCeiling;
        }
      }
    }

    return y;
  },

  getCeilingPlane: function(point) {
    // get ceiling and plane *above* point

    let plane = null;
    let y = null;

    for (let i=0; i<this.planes.length; i+=1) {
      if (this.planes[i].containsPoint2D(point) && this.planes[i].isPointBelowOrEqual(point)) {
        let planeCeiling = this.planes[i].getY(point.x, point.z);

        if (planeCeiling >= point.y && (y == null || planeCeiling < y)) {
          y = planeCeiling;
          plane = this.planes[i];
        }
      }
    }

    return {y: y, plane: plane};
  },

  getIntersectPlane: function(p1, p2) {
    const box = new THREE.Box3().setFromPoints([p1, p2]);
    let intersectPlane = null;

    for (let i=0; i<this.planes.length; i+=1) {
      if (this.planes[i].intersectsBox(box) || this.planes[i].containsBox(box)) {
        const intersect = this.planes[i].getIntersect(p1, p2);

        if (intersect != null) {
          const distance = distanceBetween(p1, intersect);

          if (intersectPlane === null || distance < intersectPlane.distance) {
            intersectPlane = {
              intersect: intersect,
              plane: this.planes[i],
              distance: distance
            }
          }
        }
      }
    }

    return intersectPlane;
  },

  getIntersectPlane2D: function(p1, p2) {
    // find 2D intersect *nearest* to p2

    const box = new THREE.Box3().setFromPoints([p1, p2]);
    let intersectPlane = null;

    for (let i=0; i<this.planes.length; i+=1) {
      if (this.planes[i].intersectsBox(box) || this.planes[i].containsBox(box)) {
        const intersect2D = this.planes[i].getNormalIntersect2D(p2);
        const distance = distanceBetween(p2, intersect2D);

        if (intersectPlane === null || distance < intersectPlane.distance) {
          intersectPlane = {
            plane: this.planes[i],
            intersect: intersect2D,
            distance: distance
          };
        }
      }
    }

    return intersectPlane;
  }
};

export default Mesh;
