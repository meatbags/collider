![collider_torus](/screenshots/torus.png?raw=true)
~23K voxel approximation of an 800-poly torus, raytraced with Collider.

# Collider

Provides precise collisions for three.js bufferGeometry. Uses normal data and face culling to find collision solutions for complex geometries. Useful for quick integration of 3D collision maps (for example a set of blocks and prisms created in Blender).

Processing of high-poly models is possible, but computationally expensive. For the best real-time results, minimise the poly count and break up geometry into separate objects. Collider.System provides search optimisation for large mesh sets.

Note: Currently does not support transforms - static geometry only.

# Usage

```javascript
// create a three.js torus
var geometry = new THREE.TorusBufferGeometry(10, 3);
var material = new THREE.MeshBasicMaterial({color: 0xffff00 });
var torus = new THREE.Mesh(geometry, material);

// create a collision object
var collision = new Collider.Mesh(torus.geometry);

// a point within the torus' ring -> returns true
collision.check(new THREE.Vector3(10, 0, 0));

// a point on the surface of the torus -> returns true
collision.check(new THREE.Vector3(0, 3, 10));

// a point within the hollow centre of the torus -> returns false
collision.check(new THREE.Vector3(0, 0, 0));
```
