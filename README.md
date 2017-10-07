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
Create collision map from geometry.
- geometry - THREE.BufferGeometry object

### Methods
#### .collision(point)
Check for collision at 3-dimensional point.
- point - THREE.Vector3

#### .ceiling(point)
Get y value of nearest plane above point. Returns number, or null if no plane found.
- point - THREE.Vector3

#### .intersect(p1, p2)
Get intersect of object between p1 and p2. Returns object {intersect, plane, distance}. Intersect is a THREE.Vector3 representing the intersect point, plane is the intersected Collider.Plane, and distance is the distance between p1 and the intersect. Returns null if no intersect found.
- p1 - THREE.Vector3
- p2 - THREE.Vector3

## Collider.Plane
### Constructor
#### Collider.Plane(p1, p2, p3, n1, n2, n3)
Create a plane from a set of vertices and normals.
- p1, p2, p3 - vertex positions (THREE.Vector3)
- n1, n2, n3 - vertex normals (THREE.Vector3)

### Methods
#### .isPointAbove(point)
Is point above the plane. Returns true or false.
- point - THREE.Vector3

#### .isPointBelow(point)
Is point below the plane. Returns true or false.
- point - THREE.Vector3

#### .isPointBelowOrEqual(point)
Is point below or on the surface of the plane. Returns true or false.
- point - THREE.Vector3

#### .isPointAboveOrEqual(point)
Is point ahove or on the surface of the plane. Returns true or false.
- point - THREE.Vector3

#### .containsPoint(point)
Is point inside vertex bounding box. Returns true or false.
- point - THREE.Vector3

#### .containsPointXZ(point)
Is point inside the x, z coordinates of the bounding box. Returns true or false.
- point - THREE.Vector3

#### .intersect(p1, p2)
Return the intersecting point of the plane and the line between p1 and p2. Returns null if line is parallel to surface or no intersect found.
- p1 - THREE.Vector3
- p2 - THREE.Vector3

#### .getY(x, z)
Solve plane equation for x, z. Return number.
- x - Number
- z - Number

## Collider.System
### Constructor
#### Collider.System()
A system of Collider.Meshes. Handles y sorting and separates objects into quadrants for more efficient searches. Caches latest results for efficiency.

### Methods
#### .add(mesh, ...mesh)
- mesh - Collider.Mesh object or objects to add to system.

#### .collision(point)
Check a point for collisions against all meshes in the system. Returns true or false.
- point - THREE.Vector3

#### .ceiling(point)
Get y value of nearest plane above point. Returns number, or null if no plane found.
- point - THREE.Vector3

#### .intersect(p1, p2)
Get intersect between p1 and p2. Returns object {intersect, plane, distance}. Intersect is a THREE.Vector3 representing the intersect point, plane is the intersected Collider.Plane, and distance is the distance between p1 and the intersect. Returns null if no intersect found.
- p1 - THREE.Vector3
- p2 - THREE.Vector3

#### .countCollisions(point)
Get number of collisions at point. Returns number.
- point - THREE.Vector3

#### .countIntersects(p1, p2)
Get number of intersected objects between p1 and p2. Returns number. Note: intersects are counted per-mesh, not per-plane.
- p1 - THREE.Vector3
- p2 - THREE.Vector3
