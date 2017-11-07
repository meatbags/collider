![collider_torus](/screenshots/torus.png?raw=true)
~23K voxel approximation of an 800-poly torus, raytraced with Collider.

# Collider

Collider provides precise collisions for three.js bufferGeometry, using normal data and face culling to find collision solutions for complex geometries. Collider is useful for quick integration of 3D collision maps (for example a set of blocks and prisms created in Blender).

Processing of high-poly models is possible, but computationally expensive. For the best real-time results, minimise poly count and break up geometry into separate objects. Collider.System provides search optimisation for large mesh sets.

Now supports dynamic translation! Full transform (rotation, scaling) coming soon.

# Example

```javascript
// create a three js torus
var geometry = new THREE.TorusBufferGeometry(3, 1, 6, 12);
var material = new THREE.MeshLambertMaterial({color: 0x888888 });
var torus = new THREE.Mesh(geometry, material);

// create collision map
var mesh = new Collider.Mesh(torus.geometry);

// a point within the torus' ring -> returns true
mesh.getCollision(new THREE.Vector3(3, 0, 0));

// a point within the hollow centre of the torus -> returns false
mesh.getCollision(new THREE.Vector3(0, 0, 0));
```

![collider_torus_2](/screenshots/screen_3.png?raw=true)

Voxels generated from point collisions in a geometric set.
