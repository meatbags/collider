// interaction object for building physical systems

import Config from '../config/Config';
import * as Maths from './Maths';
import Logger from './Logger';

const Interaction = function(position, rotation, motion) {
  this.position = position;
  this.rotation = rotation;
  this.motion = motion;
  this.falling = false;
  this.config = {};
  this.config.physics = Config.sandbox.physics;
  this.logger = new Logger();
};

Interaction.prototype = {
  computeNextPosition: function(delta, system) {
    // move
    let position = Maths.addVector(this.position, Maths.scaleVector(this.motion, delta));

    // collision system
    if (!this.config.physics.noclip) {
      let meshes = system.getCollisionMeshes(position);

      // apply gravity
      this.applyPhysics(delta);

      if (meshes.length > 0) {
        // check for slopes
        if (this.stepUpSlopes(position, meshes)) {
          meshes = system.getCollisionMeshes(position);
        }

        // check for walls
        if (this.testObstructions(position, meshes, system)) {
          // check for slopes
          meshes = system.getCollisionMeshes(position);
          this.stepUpSlopes(position, meshes);
        }
      } else if (this.motion.y < 0 && !this.falling) {
        // check under position
        const under = Maths.copyVector(position);
        under.y -= this.config.physics.snapDown;
        let mesh = system.getCeilingPlane(under);

        // check for slopes
        this.stepDownSlope(position, mesh);
      }
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

    // dev
    /*
    this.logger.print(
      'M ' + this.logger.formatVector(this.motion),
      'P ' + this.logger.formatVector(this.position),
      'V ' + this.logger.formatVector({x: this.rotation.pitch, y: this.rotation.yaw, z: this.rotation.roll})
    );
    */
  },

  testObstructions: function(position, meshes, system) {
    // check for obstructions
    let obstruction = false;
    let extruded = false;

    for (let i=0; i<meshes.length; i+=1) {
      const ceiling = meshes[i].getCeilingPlane(position);

      if (ceiling != null && (ceiling.plane.normal.y < this.config.physics.minSlope || (ceiling.y - this.position.y) > this.config.physics.snapUp)){
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
          if (ceiling != null && (ceiling.plane.normal.y < this.config.physics.minSlope || (ceiling.y - this.position.y) > this.config.physics.snapUp)) {
            hits += 1;
          }
        }

        // stop motion if cornered (collisions > 1)
        if (hits > 1) {
          position.x = this.position.x;
          position.z = this.position.z;
        } else {
          extruded = true;
        }
      } else {
        position.x = this.position.x;
        position.z = this.position.z;
      }
    }

    return extruded;
  },

  stepUpSlopes: function(position, meshes) {
    // check for upward slopes
    let success = false;

    for (let i=0; i<meshes.length; i+=1) {
      const ceiling = meshes[i].getCeilingPlane(position);

      // climb
      if (ceiling != null &&
        ceiling.plane.normal.y >= this.config.physics.minSlope &&
        (ceiling.y - this.position.y) <= this.config.physics.snapUp) {
        if (ceiling.y >= position.y) {
          success = true;
          position.y = ceiling.y;
          this.motion.y = 0;
        }
      }
    }

    return success;
  },

  applyPhysics: function(delta) {
    this.falling = (this.motion.y < 0);
    this.motion.y = Math.max(this.motion.y - this.config.physics.gravity * delta, -this.config.physics.maxVelocity);
  },

  setPhysics: function(params) {
    this.config.physics.gravity = (params.gravity) ? params.gravity : this.config.physics.gravity;
    this.config.physics.floor = (params.floor) ? params.floor : this.config.physics.floor;
    this.config.physics.snapUp = (params.snapUp) ? params.snapUp : this.config.physics.snapUp;
    this.config.physics.snapDown = (params.snapDown) ? params.snapDown : this.config.physics.snapDown;
  },

  stepDownSlope: function(position, ceilingPlane) {
    let success = false;

    if (ceilingPlane != null && ceilingPlane.plane.normal.y >= this.config.physics.minSlope) {
      position.y = ceilingPlane.y;
      this.motion.y = 0;
      success = true;
    }

    return success;
  }
};

export default Interaction;
