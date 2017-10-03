![collider_torus](/screenshots/torus.png?raw=true)
~23K voxel approximation of an 800-poly torus, raytraced with Collider.

# Collider

Collider provides precise collisions for three.js bufferGeometry, using normal data and face culling to find collision solutions for complex geometries. Collider is useful for quick integration of 3D collision maps (for example a set of blocks and prisms created in Blender).

Processing of high-poly models is possible, but computationally expensive. For the best real-time results, minimise poly count and break up geometry into separate objects. Collider.System provides search optimisation for large mesh sets.

Note: Currently does not support transforms - static geometry only.

# Example

```javascript
// create a three js torus
var geometry = new THREE.TorusBufferGeometry(3, 1, 6, 12);
var material = new THREE.MeshLambertMaterial({color: 0x888888 });
var torus = new THREE.Mesh(geometry, material);

// create collision object
var collision = new Collider.Mesh(torus.geometry);

// a point within the torus' ring -> returns true
collision.check(new THREE.Vector3(3, 0, 0));

// a point within the hollow centre of the torus -> returns false
collision.check(new THREE.Vector3(0, 0, 0));
```

![collider_torus_2](/screenshots/screen_3.png?raw=true)

Voxels generated from point collisions in a geometric set.

# Documentation

## Collider.Mesh
### Constructor
#### Collider.Mesh(geometry)
A collision mesh.
- geometry - THREE.BufferGeometry object

### Methods
#### .check(point)
Check for a collision at point. Returns true or false.
- point - THREE.Vector3

#### .getCeiling(point)
Get the y coordinate intersect of the nearest upper plane. Returns Number, or null if no plane exists.
- point - THREE.Vector3

## Collider.System
### Constructor
#### Collider.System()
A system of collision meshes. Handles complex scenes.

### Methods
#### .add(mesh, ...)
- mesh - Collider.Mesh to add to system.

#### .check(point)
Check a point for collisions against all meshes in the system. Returns true or false.
- point - THREE.Vector3

#### .getCeiling(point)
Get the y coordinate intersect of the nearest upper plane for all meshes in system. If more than one mesh have solutions, returns the higher value. Returns Number or null if no plane found.
- point - THREE.Vector3

#### .getLastCollision()
Returns the collision mesh of the last successful collision. If none, returns null.
