const twoPi = Math.PI * 2;

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

const distanceBetween = function(a, b) {
  const d = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2));

  return d;
};

const distanceBetween2D = function(a, b) {
  const dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2));

  return dist;
}

const crossProduct = function(a, b) {
  const c = new THREE.Vector3(
    a.y * b.z - a.z * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x
  );

  return c;
};

const minAngleDifference = function(a1, a2) {
  const angle = Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1))

  return angle;
}

const dotProduct = function(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
};

export { twoPi, distanceBetween2D, minAngleDifference, dotProduct, addVector, subtractVector, crossProduct, reverseVector, normalise };
