// interaction object for building physical systems

import Config from './Config';
import * as Maths from './Maths';

const Interaction = function(position, motion) {
  this.position = position;
  this.motion = motion;
  this.config = {};
  this.config.physics = Config.sandbox.physics;
  this.config.climb = Config.sandbox.player.climb;
};

Interaction.prototype = {
  computeNextPosition: function(delta, objects) {
    // add motion vector
    let next = Maths.addVector(this.position, Maths.scaleVector(this.motion, delta));

    // get collisions
    let meshes = objects.getCollisionMeshes(next);

    // apply gravity *before* collision handling - important
    this.motion.y = Math.max(this.motion.y - this.config.physics.gravity * delta, -this.config.physics.maxVelocity);

    if (meshes.length > 0) {
      // check for slopes and steps
      let positionChanged = false;

      for (let i=0; i<meshes.length; i+=1) {
        const ceiling = meshes[i].getCeilingPlane(next);

        // climb
        if (ceiling.y != null && ceiling.plane.normal.y >= this.config.climb.minPlaneYAngle && (ceiling.y - this.position.y) <= this.config.climb.up) {
          this.motion.y = 0;

          if (ceiling.y >= next.y) {
            positionChanged = true;
            next.y = ceiling.y;
          }
        }
      }

      // check *new* position for collisions
      if (positionChanged) {
        meshes = objects.getCollisionMeshes(next);
      }

      // check for obstructions
      let obstruction = false;

      for (let i=0; i<meshes.length; i+=1) {
        const ceiling = meshes[i].getCeilingPlane(next);

        if (ceiling.y != null && (ceiling.plane.normal.y < this.config.climb.minPlaneYAngle || (ceiling.y - this.position.y) > this.config.climb.up)){
          obstruction = meshes[i];
          break; // only one obstruction is needed
        }
      }

      // handle obstruction
      if (obstruction) {
        let extrude = Maths.copyVector(next);
        const intersectPlane = obstruction.getIntersectPlane2D(this.position, next);

        // extrude position from object
        if (intersectPlane != null) {
          next.x = intersectPlane.intersect.x;
          next.z = intersectPlane.intersect.z;

          // get collisions at *new* point
          let hits = 0;
          meshes = objects.getCollisionMeshes(next);

          for (let i=0; i<meshes.length; i+=1) {
            const ceiling = meshes[i].getCeilingPlane(next);

            // if position is climbable, ignore
            if (ceiling.y != null && (ceiling.plane.normal.y < this.config.climb.minPlaneYAngle || (ceiling.y - this.position.y) > this.config.climb.up)) {
              hits += 1;
            }
          }

          // stop motion if cornered (collisions > 1)
          if (hits > 1) {
            next.x = this.position.x;
            next.z = this.position.z;
          }
        }
      }
    } else if (this.motion.y < 0) {
      // check for downward slopes or steps
      const under = Maths.copyVector(next);
      under.y -= this.config.climb.down;

      if (!this.falling && objects.getCollision(under)) {
        const ceiling = objects.getCeilingPlane(under);

        // snap to slope
        if (ceiling.plane.normal.y >= this.config.climb.minPlaneYAngle) {
          next.y = ceiling.y;
          this.motion.y = 0;
        }
      }
    }

    // move
    this.position.x = next.x;
    this.position.y = next.y;
    this.position.z = next.z;
  }
};

export default Interaction;
