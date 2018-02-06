// collision system - checks against all meshes
// meshes are divided into quadrants for efficiency
// recent collisions are cached

import Config from '../config/Config';
import Quadrants from './Quadrants';

class System {
  constructor() {
    // collider mesh system

    this.quadrants = new Quadrants();
    this.meshes = [];
    this.isColliderSystem = true;
  }

  add() {
    // add mesh to quadrants

    for (let i=0; i<arguments.length; i+=1) {
      const mesh = arguments[i];

      if (mesh.isColliderMesh) {
        if (mesh.planes.length <= Config.system.maxPlanesPerMesh) {
          this.quadrants.add(mesh);
          this.meshes.push(mesh.object);
        } else {
          console.warn('Warning: Mesh not included - plane count exceeds maximum (%s).', Config.system.maxPlanesPerMesh);
        }
      } else {
        throw('Error: Input must be Collider.Mesh');
      }
    }
  }

  getCollision(point) {
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
  }

  getCollisionMeshes(point) {
    // get all meshes which collide with point

    let collisions = [];
    const meshes = this.quadrants.getQuadrantMeshes(point);

    for (let i=0; i<meshes.length; i+=1) {
      if (meshes[i].getCollision(point)) {
        collisions.push(meshes[i]);
      }
    }

    return collisions;
  }

  getCeilingPlane(point) {
    // get ceiling and corresponding plane *above* point

    let ceiling = null;
    const meshes = this.quadrants.getQuadrantMeshes(point);

    for (let i=0; i<meshes.length; i+=1) {
      if (meshes[i].getCollision(point)) {
        let result = meshes[i].getCeilingPlane(point);

        if (result != null) {
          if (ceiling === null || result.y > ceiling.y) {
            ceiling = {
              y: result.y,
              plane: result.plane
            }
          }
        }
      }
    }

    return ((ceiling === null) ? null : ceiling);
  }

  getMeshes() {
    // return three meshes

    return this.meshes;
  }
}

export default System;
