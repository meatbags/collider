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
    const meshes = this.quadrants.getQuadrantMeshes(point);

    for (let i=0; i<meshes.length; i+=1) {
      if (meshes[i].getCollision(point)) {
        collision = true;
        break;
      }
    }

    return collision;
  },

  getCollisionMeshes: function(point) {
    // get all meshes which collide with point

    let collisions = [];
    const meshes = this.quadrants.getQuadrantMeshes(point);

    for (let i=0; i<meshes.length; i+=1) {
      if (meshes[i].getCollision(point)) {
        collisions.push(meshes[i]);
      }
    }

    return collisions;
  },

  getCeiling2D: function(point) {
    // get absolute ceiling for x, z

    let y = null;
    const meshes = this.quadrants.getQuadrantMeshes(point);

    for (let i=0; i<meshes.length; i+=1) {
      if (meshes[i].getCollision2D(point)) {
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
    const meshes = this.quadrants.getQuadrantMeshes(point);

    for (let i=0; i<meshes.length; i+=1) {
      if (meshes[i].getCollision(point)) {
        let result = meshes[i].getCeilingPlane(point);

        if (y === null || (result.y != null && result.y > y)) {
          y = result.y;
          plane = result.plane;
        }
      }
    }

    return ((y == null) ? null : {y: y, plane: plane});
  }
};

export default System;
