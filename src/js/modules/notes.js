// old method for moving along plane

if (intersect != null) {
  // get XY vectors perpendicular vector
  const normal = intersect.plane.normal;
  const perp = intersect.plane.getPerpendicularNormals();

  // select appropriate direction
  let dir = Maths.subtractVector(next, this.target.position);
  dir.y = 0;
  dir = Maths.normalise(dir);
  const rightDot = Maths.dotProduct(perp.right, dir);
  const leftDot = Maths.dotProduct(perp.left, dir);

  if (rightDot > leftDot) {
    next.x = this.target.position.x + perp.right.x * rightDot * this.attributes.speed * delta;
    next.z = this.target.position.z + perp.right.z * rightDot * this.attributes.speed * delta;
  } else {
    next.x = this.target.position.x + perp.left.x * leftDot * this.attributes.speed * delta;
    next.z = this.target.position.z + perp.left.z * leftDot * this.attributes.speed * delta;
  }

  // check next position
  const count = collider.countIntersects(this.target.position, next);

  if (count != 0) {
    next.x = this.target.position.x;
    next.z = this.target.position.z;
  }
}
