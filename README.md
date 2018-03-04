![collider_torus](/screenshots/demo.jpg?raw=true)  
Demo screenshot: balls interacting with a randomised system.  

# Collider

Collider is a collision system for three.js, providing a baseline for building physical interations.

A Collider system in action -> http://www.xavierburrow.com/collider

Collider uses a combination of surface normal data and face culling to provide collision solutions for complex geometries. Processing of high-poly models is possible, but expensive. For the best real-time results, minimise poly count and break up large meshes.

# To do

Collider supports dynamic translation, but only *static* rotation and scaling -- these operations must be performed prior to calling Collider.Mesh.
