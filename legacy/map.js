import { Config } from '../conf';
import { Box } from './box';

class Map {
  constructor() {
    // cache nearby meshes for faster lookups
    this.origin = new THREE.Vector3();
    this.radius = 10;
    this.threshold = this.radius - 1;
    this.meshes = [];
    this.nearby = [];
  }

  add(mesh) {
    this.meshes.push(mesh);
    this.cacheNearbyMeshes();
  }

  getMeshes(point) {
    // get meshes near point
    if (this.origin.distanceTo(point) >= this.threshold) {
      this.origin.copy(point);
      this.cacheNearbyMeshes();
    }
    return this.nearby;
  }

  cacheNearbyMeshes() {
    // cache meshes close to origin
    this.nearby = [];
    for (var i=0, len=this.meshes.length; i<len; ++i) {
      this.meshes[i].updateBoxPosition();
      const d = this.meshes[i].box.distanceToPoint(this.origin);
      if (this.meshes[i].box.distanceToPoint(this.origin) <= this.radius) {
        this.nearby.push(this.meshes[i]);
      }
    }
  }
};

export { Map };
