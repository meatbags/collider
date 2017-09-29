# Collider

Provides precise collisions for three.js bufferGeometry. Uses normal data and face culling to find collisions for complex geometries. Useful for quick integration of 3D collision maps (for example a complex set of prisms created in Blender).

Note: Currently does not support transforms!

# Usage

```javascript
// create a three.js torus
var geometry = new THREE.TorusBufferGeometry(10, 3);
var material = new THREE.MeshBasicMaterial({color: 0xffff00 });
var torus = new THREE.Mesh(geometry, material);

// create a collision object
var collision = new Collider().fromBufferGeometry(torus.geometry);

// a point within the torus' ring
// returns true
collision.check(new THREE.Vector3(10, 0, 0));

// a point on the surface of the torus
// returns true
collision.check(new THREE.Vector3(0, 3, 10));

// a point within the hollow centre of the torus
// returns false
collision.check(new THREE.Vector3(0, 0, 0));
```
