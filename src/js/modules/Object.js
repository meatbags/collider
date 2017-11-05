// generic collision object

const Object = function(position) {
  this.position = new THREE.Vector3(position.x, position.y, position.z);
};

Object.prototype = {
  update: function(vector, collider) {

  }
};

export default Object;
