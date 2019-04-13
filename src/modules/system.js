/** Collider.System */

import Mesh from './mesh';
import Config from './config';

class System {
  constructor() {
    this.meshes = [];
    this.isColliderSystem = true;
  }

  add() {
    // add meshes to system
    for (let i=0, len=arguments.length; i<len; ++i) {
      let mesh = arguments[i];
      if (!mesh.isColliderMesh && mesh.geometry && mesh.geometry.isBufferGeometry) {
        mesh = new Mesh(mesh);
      }
      if (mesh.isColliderMesh) {
        if (mesh.planes.length < Config.system.maxPlanesPerMesh) {
          this.meshes.push(mesh);
        } else {
          console.warn(`Mesh plane count exceeds maximum (${Config.system.maxPlanesPerMesh})`);
        }
      }
    }
  }

  getCollisions(point) {
    // get system collision with point
    const res = [];
    for (let i=0, len=this.meshes.length; i<len; ++i) {
      if (this.meshes[i].getCollision(point)) {
        res.push(this.meshes[i]);
      }
    }
    return res;
  }

  getCeilingPlane(point) {
    // get ceiling above point
    let ceiling = null;
    const meshes = this.getCollisions(point);
    for (let i=0, len=meshes.length; i<len; ++i) {
      const res = meshes[i].getCeilingPlane(point);
      if (res && (!ceiling || res.y > ceiling.y)) {
        ceiling = {y: res.y, plane: res.plane};
      }
    }
    return ceiling;
  }
}

export default System;
