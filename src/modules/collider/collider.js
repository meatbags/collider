import { Physics } from '../conf';
import * as Maths from '../maths/general';

class Collider {
  constructor(position, motion) {
    this.position = position;
    this.motion = motion;
    this.config = Physics;
  }

  setPhysics(params) {
    for (var key in params) {
      if (params.hasOwnProperty(key) && this.config.hasOwnProperty(key)) {
        this.config[key] = params[key];
      }
    }
  }

  applyPhysics(delta) {
    this.falling = (this.motion.y < 0);
    this.motion.y = Math.max(this.motion.y - this.config.gravity * delta, -this.config.maxVelocity);
  }

  move(delta, system) {
    // move collider against the system
    const p = Maths.addVector(this.position, Maths.scaleVector(this.motion, delta));
    this.applyPhysics(delta);
    let collisions = system.getCollisionMeshes(p);

    // interact with slopes, walls
    if (collisions.length > 0) {
      if (this.stepUpSlopes(p, collisions)) {
        collisions = system.getCollisionMeshes(p);
      }
      if (this.extrudeFromWalls(p, collisions, system)) {
        this.stepUpSlopes(p, system.getCollisionMeshes(p));
      }
    } else if (this.motion.y < 0 && !this.falling) {
      this.stepDownSlope(p, system.getCeilingPlane(new THREE.Vector3(p.x, p.y - this.config.snapDown, p.z)));
    }

    // global floor
    if (p.y < this.config.floor) {
      this.motion.y = 0;
      p.y = this.config.floor;
    }

    // set position
    this.position.x = p.x;
    this.position.y = p.y;
    this.position.z = p.z;
  }

  extrudeFromWalls(p, meshes, system) {
    // extrude position from obstructions
    let isExtruded = false;
    let firstObstruction = false;

    for (let i=0; i<meshes.length; i+=1) {
      const ceiling = meshes[i].getCeilingPlane(p);
      if (ceiling != null && (ceiling.plane.normal.y < this.config.minSlope || (ceiling.y - this.position.y) > this.config.snapUp)){
        firstObstruction = meshes[i];
        break;
      }
    }

    // extrude from obstruction
    if (firstObstruction) {
      const intersectPlane = firstObstruction.getIntersectPlane2D(this.position, p);
      const extrude = new THREE.Vector3(p.x, p.y, p.z);

      if (intersectPlane != null) {
        p.x = intersectPlane.intersect.x;
        p.z = intersectPlane.intersect.z;
        let hits = 0;
        meshes = system.getCollisionMeshes(p);

        for (let i=0; i<meshes.length; i+=1) {
          const ceiling = meshes[i].getCeilingPlane(p);
          // ignore if climbable
          if (ceiling != null && (ceiling.plane.normal.y < this.config.minSlope || (ceiling.y - this.position.y) > this.config.snapUp)) {
            hits += 1;
          }
        }

        // stop motion if cornered
        if (hits > 1) {
          p.x = this.position.x;
          p.z = this.position.z;
        } else {
          isExtruded = true;
        }
      } else {
        p.x = this.position.x;
        p.z = this.position.z;
      }
    }

    return isExtruded;
  }

  stepUpSlopes(position, meshes) {
    let steppedUp = false;

    for (let i=0, len=meshes.length; i<len; ++i) {
      const ceiling = meshes[i].getCeilingPlane(position);
      // climb up slopes
      if (ceiling != null &&
        ceiling.plane.normal.y >= this.config.minSlope &&
        (ceiling.y - this.position.y) <= this.config.snapUp) {
        if (ceiling.y >= position.y) {
          steppedUp = true;
          position.y = ceiling.y;
          this.motion.y = 0;
        }
      }
    }

    return steppedUp;
  }

  stepDownSlope(position, ceilingPlane) {
    let steppedDown = false;

    if (ceilingPlane != null && ceilingPlane.plane.normal.y >= this.config.minSlope) {
      position.y = ceilingPlane.y;
      this.motion.y = 0;
      steppedDown = true;
    }

    return steppedDown;
  }
}

export { Collider };
