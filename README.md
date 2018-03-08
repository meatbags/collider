![collider_torus](/screenshots/demo.jpg?raw=true)  
Demo screenshot: balls interacting with a randomised system.  

# Collider

Collider is a collision system for three.js, providing a baseline for building physical interations. Collider uses surface normals (not ray-tracing) to provide point collision solutions. Processing of high-poly models is possible, but expensive. For the best real-time results, minimise poly count and break up large meshes. Collider.System creates a cache of nearby meshes for optimised searches.

A simple system in action -> http://www.xavierburrow.com/collider

# To do

Support for dynamic transformations (static transformation already supported).
Tutorial docs.
