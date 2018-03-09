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
      if (this.extrudeFrom(p, collisions, system)) {
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

    // set final position
    this.position.copy(p);
  }

  getValidCollisions(p, meshes) {
    // get n collisions with meshes that can't be climbed
    var hits = 0;

    for (var i=0, len=meshes.length; i<len; ++i) {
      const ceiling = meshes[i].getCeilingPlane(p);
      if (ceiling != null && (ceiling.plane.normal.y < this.config.minSlope || (ceiling.y - this.position.y) > this.config.snapUp)) {
        hits++;
      }
    }
    
    return hits;
  }

  extrudeFrom(p, meshes, system) {
    // extrude position from obstructions
    var isExtruded = false;
    var mesh = false;

    for (let i=0, len=meshes.length; i<len; ++i) {
      const ceiling = meshes[i].getCeilingPlane(p);
      if (ceiling != null && (ceiling.plane.normal.y < this.config.minSlope || (ceiling.y - this.position.y) > this.config.snapUp)){
        mesh = meshes[i];
        break;
      }
    }

    // extrude from mesh
    if (mesh) {
      const intersectPlane = mesh.getIntersectPlane2D(this.position, p);

      if (intersectPlane != null) {
        const intersect = intersectPlane.intersect;
        const plane = intersectPlane.plane;

        if (plane.normal.y < -0.5) {
          // project in 3D, if other mesh collisions, try 2D
          // NOTE: needs refinement

          const proj = mesh.getProjected(p, plane);
          const hits = this.getValidCollisions(proj, system.getCollisionMeshes(proj));

          // stop motion if cornered
          if (hits > 1) {
            p.x = this.position.x;
            p.z = this.position.z;
          } else {
            p.x = proj.x;
            p.y = proj.y;
            p.z = proj.z;
            // reduce jump motion
            this.motion.y = (this.motion.y > 0) ? this.motion.y * 0.75 : this.motion.y;
            //this.motion.y = Math.min(-0.01, this.motion.y);
            isExtruded = true;
          }
        } else {
          p.x = intersect.x;
          p.z = intersect.z;
          const hits = this.getValidCollisions(p, system.getCollisionMeshes(p));

          // stop motion if cornered
          if (hits > 1) {
            p.x = this.position.x;
            p.z = this.position.z;
          } else {
            isExtruded = true;
          }
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
