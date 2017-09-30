// collision system - checks against all meshes
// meshes are divided into quadrants for efficiency
// recent collisions are cached

import Config from './Config';
import Quadrants from './Quadrants';

const System = function () {
  this.quadrants = new Quadrants();
  this.collisionCache = [];
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

  cache: function(mesh) {
    // add mesh to collision cache

    this.collisionCache.unshift(mesh);

    if (this.collisionCache.length > Config.system.collisionCacheSize) {
      this.collisionCache.splice(this.collisionCache.length - 1, 1);
    }
  },

  flush: function() {
    // empty the cache

    this.collisionCache = [];
  },

  check: function(point) {
    // search for collisions at point

    const quadrant = this.quadrants.getQuadrant(point);
    let collision = false;

    for (let i=0; i<quadrant.length; i+=1) {
      const mesh = quadrant[i];

      if (mesh.check(point)) {
        collision = true;
        this.cache(mesh);
        break;
      }
    }

    return collision;
  }
};

export default System;
