// collision system - checks against all meshes
// meshes are divided into quadrants for efficiency
// recent collisions are cached

import Config from './Config';
import Quadrants from './Quadrants';

const System = function () {
  this.quadrants = new Quadrants();
  this.isColliderSystem = true;
};

System.prototype = {
  add: function() {
    // add mesh to quadrants

    for (let i=0; i<arguments.length; i+=1) {
      const mesh = arguments[i];

      if (mesh.isColliderMesh) {
        this.quadrants.add(mesh);
      } else {
        throw('Error: Input must be Collider.Mesh');
      }
    }
  },

  getCollision: function(point) {
    // check for collision at point

    let collision = false;
    const quadrant = this.quadrants.getQuadrant(point);

    for (let i=0; i<quadrant.length; i+=1) {
      if (quadrant[i].getCollision(point)) {
        collision = true;
        break;
      }
    }

    return collision;
  },

  getCollisionMeshes: function(point) {
    // get all meshes which collide with point

    let collisions = [];
    const quadrant = this.quadrants.getQuadrant(point);

    for (let i=0; i<quadrant.length; i+=1) {
      if (quadrant[i].getCollision(point)) {
        collisions.push(quadrant[i]);
      }
    }

    return collisions;
  },

  getCeiling2D: function(point) {
    // get absolute ceiling for x, z

    let y = null;
    const quadrant = this.quadrants.getQuadrant(point);

    for (let i=0; i<quadrant.length; i+=1) {
      if (quadrant[i].getCollision2D(point)) {
        let meshCeiling = mesh.getCeiling2D(point);

        if (y === null || meshCeiling > y) {
          y = meshCeiling;
        }
      }
    }

    return y;
  },

  getCeilingPlane: function(point) {
    // get ceiling and corresponding plane *above* point

    let y = null;
    let plane = null;
    const quadrant = this.quadrants.getQuadrant(point);

    for (let i=0; i<quadrant.length; i+=1) {
      if (quadrant[i].getCollision(point)) {
        let result = mesh.getCeilingPlane(point);

        if (y === null || (result.y != null && result.y > y)) {
          y = result.y;
          plane = result.plane;
        }
      }
    }

    return {y: y, plane: plane};
  }
};

export default System;
