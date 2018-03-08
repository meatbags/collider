import { Config } from '../conf';

class Map {
  constructor() {
    // nearby mesh caching for faster searches

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
      if (this.meshes[i].box.distanceToPoint(this.origin) <= this.radius) {
        this.nearby.push(this.meshes[i]);
      }
    }
  }
};

export { Map };
