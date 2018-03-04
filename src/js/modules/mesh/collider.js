import { Config } from '../conf';
import * as Maths from '../maths/general';

class Collider {
  constructor(position, motion) {
    // collision object

    this.position = position;
    this.motion = motion;
    this.falling = false;
    this.config = {};
    this.config.physics = Config.sandbox.physics;
  }

  gravity(delta) {
    this.falling = (this.motion.y < 0);
    this.motion.y = Math.max(this.motion.y - this.config.physics.gravity * delta, -this.config.physics.maxVelocity);
  }

  setPhysics(params) {
    for (var key in params) {
      if (params.hasOwnProperty(key) && this.config.physics.hasOwnProperty(key)) {
        this.config.physics[key] = params[key];
      }
    }
  }

  move(delta, system) {
    // move against the collider system

    const position = Maths.addVector(this.position, Maths.scaleVector(this.motion, delta));

    if (!this.config.physics.noclip) {
      this.gravity(delta);
      let meshes = system.getCollisionMeshes(position);

      if (meshes.length > 0) {
        // upward slopes

        if (this.stepUpSlopes(position, meshes)) {
          meshes = system.getCollisionMeshes(position);
        }

        // walls

        if (this.feel(position, meshes, system)) {
          meshes = system.getCollisionMeshes(position);
          this.stepUpSlopes(position, meshes);
        }
      } else if (this.motion.y < 0 && !this.falling) {
        // downward slopes

        const under = Maths.copyVector(position);
        under.y -= this.config.physics.snapDown;
        const mesh = system.getCeilingPlane(under);
        this.stepDownSlope(position, mesh);
      }
    }

    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;

    // spatial limit

    if (this.position.y < this.config.physics.floor) {
      this.motion.y = 0;
      this.position.y = this.config.physics.floor;
    }
  }

  feel(position, meshes, system) {
    // test for obstructions

    let obstruction = false;
    let extruded = false;

    for (let i=0; i<meshes.length; i+=1) {
      const ceiling = meshes[i].getCeilingPlane(position);

      // get first obstruction

      if (ceiling != null && (ceiling.plane.normal.y < this.config.physics.minSlope || (ceiling.y - this.position.y) > this.config.physics.snapUp)){
        obstruction = meshes[i];
        break;
      }
    }

    // change vector or stop

    if (obstruction) {
      let extrude = Maths.copyVector(position);
      const intersectPlane = obstruction.getIntersectPlane2D(this.position, position);

      if (intersectPlane != null) {
        position.x = intersectPlane.intersect.x;
        position.z = intersectPlane.intersect.z;

        // get collisions at *new* point

        let hits = 0;
        meshes = system.getCollisionMeshes(position);

        for (let i=0; i<meshes.length; i+=1) {
          const ceiling = meshes[i].getCeilingPlane(position);

          // ignore if climbable

          if (ceiling != null && (ceiling.plane.normal.y < this.config.physics.minSlope || (ceiling.y - this.position.y) > this.config.physics.snapUp)) {
            hits += 1;
          }
        }

        // stop motion if more than one collision (corner)

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
  }

  stepUpSlopes(position, meshes) {
    // check for upward slopes in meshes

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
  }

  stepDownSlope(position, ceilingPlane) {
    // descend a given slope

    let success = false;

    if (ceilingPlane != null && ceilingPlane.plane.normal.y >= this.config.physics.minSlope) {
      position.y = ceilingPlane.y;
      this.motion.y = 0;
      success = true;
    }

    return success;
  }
}

export { Collider };
