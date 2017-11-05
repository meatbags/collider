// interaction object for building physical systems
import Config from './Config';

const Interaction = function(position) {
  this.position = new THREE.Vector3(position.x, position.y, position.z);
  this.up = new THREE.Vector3(0, 1, 0);
  this.config = {};
  this.config.physics = Config.sandbox.physics;
};

Interaction.prototype = {
  update: function(vector, scene) {
    
  }
};

export default Interaction;
