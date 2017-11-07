const Transformer = function(object) {
  this.point = new THREE.Vector3();
  this.position = object.position;
  this.rotation = object.rotation;
  this.scale = object.scale;
};

Transformer.prototype = {
  set: function(point) {
    // transform point
    this.point.x = point.x - this.position.x;
    this.point.y = point.y - this.position.y;
    this.point.z = point.z - this.position.z;
  },

  getTransformedPoint: function(point) {
    const transformed = {
      x: point.x - this.position.x,
      y: point.y - this.position.y,
      z: point.z - this.position.z
    };

    return transformed;
  },

  reverseY: function(y) {
    const newY = y + this.position.y;

    return newY;
  },

  reverse: function(point) {
    const transformed = {
      x: point.x + this.position.x,
      y: point.y + this.position.y,
      z: point.z + this.position.z
    };

    return transformed;
  }
};

export default Transformer;
