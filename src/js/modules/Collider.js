const Collider = function() {
  this.a = 1;
};

Collider.prototype = {
  fromGeometry: function(geo) {
    console.log(geo);
  }
};

export default Collider;
