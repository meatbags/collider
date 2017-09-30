const addVector = function(a, b) {
  const c = new THREE.Vector3(
    a.x + b.x,
    a.y + b.y,
    a.z + b.z
  );

  return c;
};

const subtractVector = function(a, b) {
  const c = new THREE.Vector3(
    a.x - b.x,
    a.y - b.y,
    a.z - b.z
  );

  return c;
};

const normalise = function(a){
  const mag = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);

  if (mag == 0) {
    return a;
  }

  a.x /= mag;
  a.y /= mag;
  a.z /= mag;

  return a;
};

const reverseVector = function(a) {
  a.x *= -1;
  a.y *= -1;
  a.z *= -1;

  return a;
};

const crossProduct = function(a, b) {
  const c = new THREE.Vector3(
    a.y * b.z - a.z * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x
  );

  return c;
};

const dotProduct = function(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

export { dotProduct, addVector, subtractVector, crossProduct, reverseVector, normalise };
