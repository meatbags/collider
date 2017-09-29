import Config from './Config';
import Quadrants from './Quadrants';

const System = function () {
  this.quadrants = new Quadrants();
  this.collisionCache = [];
};

System.prototype = {
  isColliderSystem: function() {
    return true;
  },

  add: function(mesh) {
    // add mesh to quadrants

    if (mesh.isColliderMesh()) {
      this.quadrants.add(mesh);
    }
  },

  cache: function(mesh) {
    // add mesh to collision cache

    this.cache.unshift(mesh);

    if (this.cache.length > Config.system.collisionCacheSize) {
      this.cache.splice(this.cache.length - 1, 1);
    }
  },

  check: function(point) {
    // search for collisions at point

    const quadrant = this.quadrants.getQuadrant(point);
    let collision = false;

    for (let i=0; i<quadrant.length; i+=1) {
      const mesh = quadrant[i];

      if (mesh.check(point)) {
        this.cache(mesh);
        collision = true;
        break;
      }
    }

    return collision;
  }
};

export default System;
