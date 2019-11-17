import { Config } from '../conf';
import { Mesh } from './mesh';
import { Map } from './map';

class System {
  constructor() {
    // collider mesh system

    this.isColliderSystem = true;
    this.map = new Map();
    this.meshes = [];
  }

  add() {
    // add mesh to system

    for (var i=0, len=arguments.length; i<len; ++i) {
      const mesh = arguments[i];

      if (mesh.isColliderMesh) {
        this.appendMesh(mesh);
      } else {
        if (mesh.geometry && mesh.geometry.isBufferGeometry) {
          this.appendMesh(new Mesh(mesh));
        } else {
          throw('Error: Mesh must be THREE.Mesh or Collider.Mesh');
        }
      }
    }
  }

  appendMesh(mesh) {
    if (mesh.planes.length <= Config.system.maxPlanesPerMesh) {
      this.map.add(mesh);
      this.meshes.push(mesh.object);
    } else {
      console.warn('Warning: Mesh discluded. Plane count exceeds maximum (%s).', Config.system.maxPlanesPerMesh);
    }
  }

  getCollision(point) {
    // check for collision at point

    var collision = false;
    const meshes = this.map.getMeshes(point);

    for (var i=0, len=meshes.length; i<len; ++i) {
      if (meshes[i].getCollision(point)) {
        collision = true;
        break;
      }
    }

    return collision;
  }

  getCollisionMeshes(point) {
    // get all meshes which collide with point

    const collisions = [];
    const meshes = this.map.getMeshes(point);

    for (var i=0, len=meshes.length; i<len; ++i) {
      if (meshes[i].getCollision(point)) {
        collisions.push(meshes[i]);
      }
    }

    return collisions;
  }

  getCeilingPlane(point) {
    // get ceiling and plane above point

    var ceiling = null;
    const meshes = this.map.getMeshes(point);

    for (var i=0, len=meshes.length; i<len; ++i) {
      if (meshes[i].getCollision(point)) {
        const result = meshes[i].getCeilingPlane(point);

        if (result && (!ceiling || result.y > ceiling.y)) {
          ceiling = {y: result.y, plane: result.plane};
        }
      }
    }

    return ceiling;
  }

  getMeshes() {
    return this.meshes;
  }
}

export { System };
