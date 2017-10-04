// collision system - checks against all meshes
// meshes are divided into quadrants for efficiency
// recent collisions are cached

import Config from './Config';
import Quadrants from './Quadrants';

const System = function () {
  this.quadrants = new Quadrants();
  this.cache = {
    mesh: [],
    ceiling: [],
    intersect: []
  };
  this.isColliderSystem = true;
  this.init();
};

System.prototype = {
  init: function() {
    this.devCvs = document.getElementById('canvas');
    this.devCtx = this.devCvs.getContext('2d');
  },

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

  collision: function(point) {
    // search for collisions at point
    // check cache
    if (this.isCached(point, this.cache.mesh)) {
      return true;
    }

    // search meshes
    let collision = false;
    const quadrant = this.quadrants.getQuadrant(point);

    for (let i=0; i<quadrant.length; i+=1) {
      const mesh = quadrant[i];

      if (mesh.collision(point)) {
        collision = true;
        this.cacheItem(this.cache.mesh, point, mesh);
        break;
      }
    }

    return collision;
  },

  ceiling: function(point) {
    // get height of plane above point

    // check ceiling cache
    if (this.isCached(point, this.cache.ceiling)) {
      return this.cache.ceiling[0].item;
    }

    // search
    const quadrant = this.quadrants.getQuadrant(point);
    let y = null;

    for (let i=0; i<quadrant.length; i+=1) {
      const mesh = quadrant[i];

      if (mesh.collision(point)) {
        let newY = mesh.ceiling(point);

        if (y === null || newY > y) {
          y = newY;
        }
      }
    }

    // cache
    this.cacheItem(this.cache.ceiling, point, y);

    return y;
  },

  intersect: function(from, to) {
    // get intersect of geometry and line
    // check intersect cache for intersect
    if (this.isCached(from, this.cache.intersect)) {
      const cached = this.cache.intersect[0];

      if (to.x === cached.item.to.x && to.y === cached.item.to.y && to.z === cached.item.to.z) {
        return cached.item.intersect;
      }
    }

    // check mesh cache for collision
    if (this.isCached(from, this.cache.mesh) || this.isCached(to, this.cache.mesh)) {
      const intersect = this.cache.mesh[0].getIntersect(from, to);

      // cache intersect
      this.cacheItem(this.cache.intersect, from, {
        to: to,
        intersect: intersect
      });

      return intersect;
    }

    // search
    const quadrant = this.quadrants.getQuadrant(to);
    let intersect = null;

    for (let i=0; i<quadrant.length; i+=1) {
      const mesh = quadrant[i];

      if (mesh.collision(to)) {
        let res = mesh.intersect(from, to);

        if (res != null) {
          intersect = res;
        }
      }
    }

    // cache
    this.cacheItem(this.cache.intersect, from, {
      to: to,
      intersect: intersect
    });

    return intersect;
  },

  countCollisions: function(point) {
    // get n collisions

    let collisions = 0;
    const quadrant = this.quadrants.getQuadrant(point);

    for (let i=0; i<quadrant.length; i+=1) {
      const mesh = quadrant[i];

      if (mesh.collision(point)) {
        collisions += 1;
      }
    }

    return collisions;
  },

  cacheItem: function(cache, point, item) {
    cache.unshift({
      point: new THREE.Vector3(point.x, point.y, point.z),
      item: item
    })
    
    if (cache.length > Config.system.cacheSize) {
      cache.splice(cache.length - 1, 1);
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
