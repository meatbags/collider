import Config from './Config';

const Quadrants = function() {
  this.q = [];
};

Quadrants.prototype = {
  positionToQuadrant: function(point) {
    // convert point to quadrant keys

    return {
      x: Math.floor(point.x / Config.quadrants.size.x),
      y: Math.floor(point.y / Config.quadrants.size.y),
      z: Math.floor(point.z / Config.quadrants.size.z)
    };
  },

  add: function(mesh) {
    // add a mesh to quadrant/s

    const min = this.positionToQuadrant(mesh.min);
    const max = this.positionToQuadrant(mesh.max);

    for (let x=min.x; x<=max.x; x+=1) {
      for (let y=min.y; y<=max.y; y+=1) {
        for (let z=min.z; z<=max.z; z+=1) {
          this.addToQuadrant(x, y, z, mesh);
        }
      }
    }
  },

  addToQuadrant(x, y, z, mesh) {
    // if quadrant does not exist, create it

    if (!this.q[x]) {
      this.q[x] = [];
    }

    if (!this.q[x][y]) {
      this.q[x][y] = [];
    }

    if (!this.q[x][y][z]) {
      this.q[x][y][z] = [];
    }

    // add mesh to quadrant

    this.q[x][y][z].push(mesh);
  },

  getQuadrant: function(point) {
    // get quadrant for point

    const pq = this.positionToQuadrant(point);

    if (this.q[pq.x] && this.q[pq.x][pq.y] && this.q[pq.x][pq.y][pq.z]) {
      return this.q[pq.x][pq.y][pq.z];
    } else {
      return [];
    }
  }
};

export default Quadrants;
