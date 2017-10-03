// collision system - checks against all meshes
// meshes are divided into quadrants for efficiency
// recent collisions are cached

import Config from './Config';
import Quadrants from './Quadrants';

const System = function () {
  this.quadrants = new Quadrants();
  this.cache = {
    mesh: [],
    ceiling: []
  };
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

  check: function(point) {
    // search for collisions at point

    // check cache
    if (isCached(point, this.cache.mesh)) {
      return true;
    }

    // search meshes
    let collision = false;
    const quadrant = this.quadrants.getQuadrant(point);

    for (let i=0; i<quadrant.length; i+=1) {
      const mesh = quadrant[i];

      if (mesh.check(point)) {
        collision = true;
        this.cacheItem(this.cache.mesh, point, mesh);
        break;
      }
    }

    return collision;
  },

  getCeiling: function(point) {
    // get height of plane above point

    // check cache
    if (isCached(point, this.cache.ceiling)) {
      return this.cache.ceiling[0].item;
    }

    // search
    const quadrant = this.quadrants.getQuadrant(point);
    let y = null;

    for (let i=0; i<quadrant.length; i+=1) {
      const mesh = quadrant[i];

      if (mesh.check(point)) {
        let newY = mesh.getCeiling(point);

        if (y === null || newY > y) {
          y = newY;
        }
      }
    }

    // cache
    this.cacheItem(this.cache.ceiling, point, y);

    return y;
  },

  cacheItem: function(cache, point, item) {
    cache.unshift({
      point: new THREE.Vector3(point.x, point.y, point.z),
      item: item
    })

    if (cache.length > Config.system.cacheSize) {
      cache.mesh.splice(cache.mesh.length - 1, 1);
    }
  },

  isCached: function(point, cache) {
    return (
      cache.length > 0 &&
      point.x === cache[0].point.x &&
      point.y === cache[0].point.y &&
      point.z === cache[0].point.z
    )
  },
};

export default System;
