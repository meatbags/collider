![collider_torus](/screenshots/demo.jpg?raw=true)
Demo screenshot: balls interacting with a randomised system.

# Collider

Collider is a physics system for three.js, providing a baseline for building physical interations.

See a Collider physical system in action: http://www.xavier-burrow.com/collider

Collider uses a combination of surface normal data and face culling to provide collision solutions for complex geometries. Processing of high-poly models is possible, but expensive. For the best real-time results, minimise poly count and break up large meshes.

# To do

Collider supports dynamic translation, but only *static* rotation and scaling -- these operations must be performed prior to calling Collider.Mesh.
