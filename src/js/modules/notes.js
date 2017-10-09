// old methods for moving along plane
// METHOD 1

if (collision) {
  // check for floors
  let ceilings = collider.ceilingPlanes(next);
  let obstructed = false;
  let extruded = false;
  let climbed = false;

  for (let i=0; i<ceilings.length; i+=1) {
    const ceil = ceilings[i];

    // climb up
    if (ceil.y - this.target.position.y <= this.attributes.climb.up &&
      ceil.plane.normal.y >= this.attributes.climb.minYNormal &&
      ceil.y >= next.y
    ) {
      this.movement.y = 0;
      next.y = ceil.y;
      climbed = true;
    } else {
      obstructed = true;
    }
  }

  if (obstructed) {
    // check for walls
    console.log('OBSTRUCTED')
    const intersect = collider.intersect(this.target.position, next);

    if (intersect != null) {
      // extrude position to point on plane
      const extrude = intersect.plane.getNormalIntersect(next);
      next.x = extrude.x;
      next.z = extrude.z;
      extruded = true;

      // check for more walls
      const from = intersect.intersect;
      const to = Maths.copyVector(extrude);
      const plane = intersect.plane;
      const intersects = collider.intersects(from, to);

      for (let i=0; i<intersects.length; i+=1) {
        const minY = intersects[i].plane.normal.y;

        if (!(minY < 0) && minY <= this.attributes.climb.minYNormal) {
          next.x = this.target.position.x;
          next.z = this.target.position.z;
          extruded = false;
          break;
        }
      }
    } else {
      next.x = this.target.position.x;
      next.z = this.target.position.z;
    }
  }

  // correct y position
  if (extruded) {
    ceilings = collider.ceilingPlanes(next);

    for (let i=0; i<ceilings.length; i+=1) {
      const ceil = ceilings[i];

      // climb up
      if (ceil.y - this.target.position.y <= this.attributes.climb.up &&
        ceil.plane.normal.y >= this.attributes.climb.minYNormal &&
        ceil.y >= next.y
      ) {
        this.movement.y = 0;
        next.y = ceil.y;
        climbed = true;
      }
    }
  }
}
else
{
  // check if on downward slope
  const testUnder = Maths.copyVector(next);
  testUnder.y -= this.attributes.climb.down;

  if (!this.falling && collider.collision(testUnder)) {
    const ceiling = collider.ceilingPlane(testUnder);

    // snap to slope if not too steep
    if (ceiling.plane.normal.y >= this.attributes.climb.minYNormal) {
      next.y = ceiling.y;
      this.movement.y = 0;
    }
  }
}

// METHOD 2

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
