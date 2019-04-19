/** Collider.System */

import Mesh from './mesh/mesh';
import Config from './config';

class System {
  constructor() {
    this.meshes = [];
    this.cache = [];
    this.settings = Config.system;
    this.isColliderSystem = true;
  }

  add() {
    // add objects to collider system
    let res = null;

    for (let i=0, len=arguments.length; i<len; ++i) {
      let obj = arguments[i];

      // recursively add grouped objects
      if (obj.type && obj.type === 'Group') {
        obj.children.forEach(child => {
          this.add(child);
        });
      } else {
        // create new mesh
        if (!obj.isColliderMesh && obj.geometry && obj.geometry.isBufferGeometry) {
          obj = new Mesh(obj);
        }

        // check if mesh passes
        if (obj.isColliderMesh) {
          if (obj.planes.length < Config.system.maxPlanesPerMesh) {
            this.meshes.push(obj);
            res = obj;
          } else {
            console.warn(`Mesh plane count exceeds maximum (${Config.system.maxPlanesPerMesh})`);
          }
        }
      }
    }
    
    return res;
  }

  getCollisions(point) {
    // get system collision with point
    const res = [];
    const meshes = this.settings.useCache ? this.cache : this.meshes;
    for (let i=0, len=meshes.length; i<len; ++i) {
      if (meshes[i].getCollision(point)) {
        res.push(meshes[i]);
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

  cache(point) {
    // add nearby meshes to cache
    this.cache = [];
    for (let i=0, len=this.meshes.length; i<len; ++i) {
      if (this.meshes[i].distanceTo(point) < this.settings.cacheRadius) {
        this.cache.push(this.meshes[i]);
      }
    }
  }
}

export default System;
