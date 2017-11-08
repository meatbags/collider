import Config from './Config';
import Plane from './Plane';
import Transformer from './Transformer';
import { subtractVector, dotProduct, normalise, distanceBetween } from './Maths';

const Mesh = function(object) {
  this.isColliderMesh = true;

  if (object.geometry.isBufferGeometry) {
    this.geometry = object.geometry;
    this.box = new THREE.Box3().setFromBufferAttribute(object.geometry.attributes.position);
    this.min = this.box.min;
    this.max = this.box.max;
    this.planes = [];
    this.transform = new Transformer(object);
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
    this.transform.set(point);

    if (this.box.containsPoint(this.transform.point)) {
      // reset
      for (let i=0; i<this.planes.length; i+=1) {
        this.planes[i].culled = false;
      }
      
      // first pass - cull faces
      for (let i=0; i<this.planes.length; i+=1) {
        if (!this.planes[i].culled && this.planes[i].isPointBelowOrEqual(this.transform.point)) {
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
        if (!this.planes[i].culled && !this.planes[i].isPointBelowOrEqual(this.transform.point)) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  },

  getCollision2D: function(point) {
    this.transform.set(point)

    return (
      this.transform.point.x >= this.min.x && this.transform.point.x <= this.max.x &&
      this.transform.point.z >= this.min.z && this.transform.point.z <= this.max.z
    );
  },

  getCeiling2D: function(point) {
    this.transform.set(point)
    let y = null;

    for (let i=0; i<this.planes.length; i+=1) {
      if (this.planes[i].containsPoint2D(this.transform.point)) {
        let planeCeiling = plane.getY(this.transform.point.x, this.transform.point.z);

        if (y === null || planeCeiling > y) {
          y = planeCeiling;
        }
      }
    }

    return ((y == null) ? null : this.transform.reverseY(y));
  },

  getCeiling: function(point) {
    // get ceiling *above* point
    this.transform.set(point)
    let y = null;

    for (let i=0; i<this.planes.length; i+=1) {
      if (this.planes[i].containsPoint2D(this.transform.point) && this.planes[i].isPointBelowOrEqual(this.transform.point)) {
        let planeCeiling = plane.getY(this.transform.point.x, this.transform.point.z);

        if (planeCeiling >= this.transform.point.y && (y === null || planeCeiling < y)) {
          y = planeCeiling;
        }
      }
    }

    return ((y == null) ? null : this.transform.reverseY(y));
  },

  getCeilingPlane: function(point) {
    // get ceiling and plane *above* point
    this.transform.set(point);
    let ceiling = null;

    for (let i=0; i<this.planes.length; i+=1) {
      // check general box, then precise, then for ceiling
      if (this.planes[i].containsPoint2D(this.transform.point)) {

        if (this.planes[i].containsPointPrecise2D(this.transform.point) &&
          this.planes[i].isPointBelowOrEqual(this.transform.point)){
          let planeCeiling = this.planes[i].getY(this.transform.point.x, this.transform.point.z);

          if (planeCeiling != null && planeCeiling >= this.transform.point.y && (ceiling == null || planeCeiling > ceiling.y)) {
            ceiling = {
              y: planeCeiling,
              plane: this.planes[i]
            }
          }
        }
      }
    }

    return ((ceiling == null) ? null : {
      y: this.transform.reverseY(ceiling.y),
      plane: ceiling.plane
    });
  },

  getIntersectPlane: function(p1, p2) {
    const tp1 = this.transform.getTransformedPoint(p1);
    const tp2 = this.transform.getTransformedPoint(p2);
    const box = new THREE.Box3().setFromPoints([tp1, tp2]);
    let intersectPlane = null;

    for (let i=0; i<this.planes.length; i+=1) {
      if (this.planes[i].intersectsBox(box) || this.planes[i].containsBox(box)) {
        const intersect = this.planes[i].getIntersect(tp1, tp2);

        if (intersect != null) {
          const distance = distanceBetween(tp1, intersect);

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

    return ((intersectPlane == null) ? null : {
      intersect: this.transform.reverse(intersectPlane.intersect),
      plane: intersectPlane.plane,
      distance: intersectPlane.distance
    });
  },

  getIntersectPlane2D: function(p1, p2) {
    // find 2D intersect *nearest* to p2
    const tp1 = this.transform.getTransformedPoint(p1);
    const tp2 = this.transform.getTransformedPoint(p2);
    const box = new THREE.Box3().setFromPoints([tp1, tp2]);
    let intersectPlane = null;

    for (let i=0; i<this.planes.length; i+=1) {
      if (this.planes[i].intersectsBox(box) || this.planes[i].containsBox(box)) {
        const intersect2D = this.planes[i].getNormalIntersect2D(tp2);

        if (intersect2D != null) {
          const distance = distanceBetween(tp2, intersect2D);

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

    return ((intersectPlane == null) ? null : {
      intersect: this.transform.reverse(intersectPlane.intersect),
      plane: intersectPlane.plane,
      distance: intersectPlane.distance
    });
  }
};

export default Mesh;
