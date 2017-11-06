// interaction object for building physical systems

import Config from './Config';
import * as Maths from './Maths';

const Interaction = function(position, motion) {
  this.position = position;
  this.motion = motion;
  this.config = {};
  this.config.physics = Config.sandbox.physics;
};

Interaction.prototype = {
  applyPhysics: function(delta) {
    this.motion.y = Math.max(this.motion.y - this.config.physics.gravity * delta, -this.config.physics.maxVelocity);
  },

  setPhysics: function(params) {
    this.config.physics.gravity = (params.gravity) ? params.gravity : this.config.physics.gravity;
    this.config.physics.floor = (params.floor) ? params.floor : this.config.physics.floor;
    this.config.physics.snapUp = (params.snapUp) ? params.snapUp : this.config.physics.snapUp;
    this.config.physics.snapDown = (params.snapDown) ? params.snapDown : this.config.physics.snapDown;
  },

  computeNextPosition: function(delta, system) {
    let position = Maths.addVector(this.position, Maths.scaleVector(this.motion, delta));
    let meshes = system.getCollisionMeshes(position);

    // apply gravity
    this.applyPhysics(delta);

    if (meshes.length > 0) {
      // check for slopes
      if (this.stepUpSlope(position, meshes)) {
        meshes = system.getCollisionMeshes(position);
      }

      // check for walls
      this.testObstruction(position, meshes, system);
    } else if (this.motion.y < 0) {
      // if falling, step down
      this.stepDownSlope(position, system);
    }

    // move
    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;

    // limit
    if (this.position.y < this.config.physics.floor) {
      this.motion.y = 0;
      this.position.y = this.config.physics.floor;
    }
  },

  testObstruction: function(position, meshes, system) {
    // check for obstructions
    let obstruction = false;

    for (let i=0; i<meshes.length; i+=1) {
      const ceiling = meshes[i].getCeilingPlane(position);

      if (ceiling.y != null && (ceiling.plane.normal.y < this.config.physics.minSlope || (ceiling.y - this.position.y) > this.config.physics.snapUp)){
        obstruction = meshes[i];
        break; // only one obstruction needed
      }
    }

    // handle obstruction
    if (obstruction) {
      let extrude = Maths.copyVector(position);
      const intersectPlane = obstruction.getIntersectPlane2D(this.position, position);

      // extrude position from object
      if (intersectPlane != null) {
        position.x = intersectPlane.intersect.x;
        position.z = intersectPlane.intersect.z;

        // get collisions at *new* point
        let hits = 0;
        meshes = system.getCollisionMeshes(position);

        for (let i=0; i<meshes.length; i+=1) {
          const ceiling = meshes[i].getCeilingPlane(position);

          // if position is climbable, ignore
          if (ceiling.y != null && (ceiling.plane.normal.y < this.config.physics.minSlope || (ceiling.y - this.position.y) > this.config.physics.snapUp)) {
            hits += 1;
          }
        }

        // stop motion if cornered (collisions > 1)
        if (hits > 1) {
          position.x = this.position.x;
          position.z = this.position.z;
        }
      } else {
        position.x = this.position.x;
        position.z = this.position.z;
      }
    }
  },

  stepUpSlope: function(position, meshes) {
    // check for upward slopes
    let  success = false;

    for (let i=0; i<meshes.length; i+=1) {
      const ceiling = meshes[i].getCeilingPlane(position);

      // climb
      if (ceiling.y != null && ceiling.plane.normal.y >= this.config.physics.minSlope && (ceiling.y - this.position.y) <= this.config.physics.snapUp) {
        this.motion.y = 0;

        if (ceiling.y >= position.y) {
          success = true;
          position.y = ceiling.y;
        }
      }
    }

    return success;
  },

  stepDownSlope: function(position, system) {
    // check for downward slopes
    let success = false;
    const under = Maths.copyVector(position);
    under.y -= this.config.physics.snapDown;

    if (!this.falling && system.getCollision(under)) {
      const ceiling = system.getCeilingPlane(under);

      // snap to slope
      if (ceiling.plane.normal.y >= this.config.physics.minSlope) {
        position.y = ceiling.y;
        this.motion.y = 0;
        success = true;
      }
    }

    return success;
  }
};

export default Interaction;
