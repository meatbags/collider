import { addVector, scaleVector, distanceBetween2D, minAngleDifference, twoPi, pitchBetween } from './Maths';

const Player = function(domElement) {
  this.domElement = domElement;
  this.position = new THREE.Vector3(0, 0, 0);
  this.movement = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(0, Math.PI, 0);
  this.offset = {
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.target = {
    position: new THREE.Vector3(0, 0, 0),
    movement: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(0, Math.PI, 0),
    offset: {
      rotation: new THREE.Vector3(0, 0, 0)
    }
  }
  this.attributes = {
    speed: 8,
    height: 1.8,
    climb: 1,
    rotation: Math.PI * 0.75,
    fov: 58,
    cameraThreshold: 0.4,
    maxRotationOffset: Math.PI * 0.3,
    adjust: 0.05,
    adjustFast: 0.09,
    adjustInstant: 0.2,
    climbUpThreshold: 1.5,
    climbDownThreshold: 0.5,
    gravity: {
      accel: 10,
      maxVelocity: 50,
      jumpVelocity: 4.8,
    }
  };
  this.camera = new THREE.PerspectiveCamera(this.attributes.fov, 1, 0.1, 10000);
  this.camera.up = new THREE.Vector3(0, 1, 0);
	this.init();
};

Player.prototype = {
	init: function() {
		this.bindControls();
    this.resizeCamera();
	},

  resizeCamera: function() {
    const w = this.domElement.width;
    const h = this.domElement.height;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  },

	bindControls: function() {
		const self = this;

    // mouse
    self.domElement.addEventListener('mousemove', function(e){
      self.handleMouseMove(e);
    }, false);
    self.domElement.addEventListener('mousedown', function(e){
      self.handleMouseDown(e);
    }, false);

    // keyboard
		self.keys = {
			up: false,
			down: false,
			left: false,
			right: false,
      jump: false
		};
		document.addEventListener("keydown", function(e) {
      self.handleKeyDown(e);
    }, false);
		document.addEventListener("keyup", function(e) {
      self.handleKeyUp(e);
		}, false);
	},

	update: function(delta, collider) {
    // handle key presses and move player

    // update movement vector
    if (this.movement.y == 0) {
      if (this.keys.up || this.keys.down) {
        const dir = ((this.keys.up) ? 1 : 0) + ((this.keys.down) ? -1 : 0);
        const dx = Math.sin(this.rotation.y) * this.attributes.speed * dir;
        const dz = Math.cos(this.rotation.y) * this.attributes.speed * dir;
        this.movement.x = dx;
        this.movement.z = dz;
      } else {
        this.movement.x = 0;
        this.movement.z = 0;
      }
    }

    // jump
    if (this.keys.jump) {
      this.keys.jump = false;

      // if not falling
      if (this.movement.y == 0) {
        this.movement.y = this.attributes.gravity.jumpVelocity;
      }
    }

    // check next p for collision
    const next = addVector(this.target.position, scaleVector(this.movement, delta));
    const collision = collider.collision(next);

    if (collision) {
      next.y = collider.ceiling(next);

      // check if not climbable
      if ((next.y - this.target.position.y) > this.attributes.climbUpThreshold) {
        next.x = this.target.position.x;
        next.y = this.target.position.y;
        next.z = this.target.position.z;
      }

      // reset fall
      this.movement.y = 0;
    } else {
      // if not falling, check for objects beneath
      next.y -= this.attributes.climbDownThreshold;

      if (this.movement.y == 0 && collider.collision(next)) {
        // land on object
        next.y = collider.ceiling(next);
      } else {
        // fall, limit velocity
        this.movement.y -= this.attributes.gravity.accel * delta;
        this.movement.y = Math.max(this.movement.y, -this.attributes.gravity.maxVelocity);

        // update position
        next.y = this.target.position.y + this.movement.y * delta;
      }
    }

    // set new position target
    this.target.position.x = next.x;
    this.target.position.y = next.y;
    this.target.position.z = next.z;

    // smooth motion a little
    this.position.x += (this.target.position.x - this.position.x) * this.attributes.adjustInstant;
    this.position.y += (this.target.position.y - this.position.y) * this.attributes.adjustInstant;
    this.position.z += (this.target.position.z - this.position.z) * this.attributes.adjustInstant;

    // update rotation vector
    if (this.keys.left || this.keys.right) {
      const dir = ((this.keys.left) ? 1 : 0) + ((this.keys.right) ? -1 : 0);
      this.target.rotation.y += this.attributes.rotation * delta * dir;
    }

    this.rotation.y += minAngleDifference(this.rotation.y, this.target.rotation.y) * this.attributes.adjustFast;
    this.offset.rotation.x += (this.target.offset.rotation.x - this.offset.rotation.x) * this.attributes.adjust;
    this.offset.rotation.y += (this.target.offset.rotation.y - this.offset.rotation.y) * this.attributes.adjust;
    this.rotation.y += (this.rotation.y < 0) ? twoPi : ((this.rotation.y > twoPi) ? -twoPi : 0);

    // set new camera position
    const yaw = this.rotation.y + this.offset.rotation.y;
    const pitch = this.rotation.x + this.offset.rotation.x;
    const height = this.position.y + this.attributes.height;

    this.camera.position.set(this.position.x, height, this.position.z);
    this.camera.lookAt(new THREE.Vector3(
      this.position.x + Math.sin(yaw),
      height + Math.sin(pitch),
      this.position.z + Math.cos(yaw)
    ))
	},

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        this.keys.up = true;
        break;
      case 37:
      case 65:
        this.keys.left = true;
        break;
      case 40:
      case 83:
        this.keys.down = true;
        break;
      case 39:
      case 68:
        this.keys.right = true;
        break;
      case 32:
        this.keys.jump = true;
        break;
      default:
        break;
    }
  },

  handleKeyUp(e) {
    switch (e.keyCode) {
      case 38:
      case 87:
        this.keys.up = false;
        break;
      case 37:
      case 65:
        this.keys.left = false;
        break;
      case 40:
      case 83:
        this.keys.down = false;
        break;
      case 39:
      case 68:
        this.keys.right = false;
        break;
    }
  },

  handleMouseDown(e) {
    const bound = this.domElement.getBoundingClientRect();
    const w = this.domElement.width;
    const x = (e.clientX - bound.left) / w;
    const t = this.attributes.cameraThreshold;

    // adjust camera
    if (x < t) {
      this.target.rotation.y = this.rotation.y + ((t - x) / t) * this.attributes.maxRotationOffset;
    } else if (x > 1 - t) {
      this.target.rotation.y = this.rotation.y + ((x - (1 - t)) / t) * -this.attributes.maxRotationOffset;
    } else {
      this.target.rotation.y = this.rotation.y;
    }
  },

  handleMouseMove(e) {
    const bound = this.domElement.getBoundingClientRect();
    const w = this.domElement.width;
    const h = this.domElement.height;
    const x = (e.clientX - bound.left) / w;
    const y = (e.clientY - bound.top) / h;
    const t = this.attributes.cameraThreshold;

    // adjust camera
    if (x < t) {
      this.target.offset.rotation.y = ((t - x) / t) * this.attributes.maxRotationOffset;
    } else if (x > 1 - t) {
      this.target.offset.rotation.y = ((x - (1 - t)) / t) * -this.attributes.maxRotationOffset;
    } else {
      this.target.offset.rotation.y = 0;
    }

    if (y < t) {
      this.target.offset.rotation.x = ((t - y) / t) * this.attributes.maxRotationOffset;
    } else if (y > (1 - t)) {
      this.target.offset.rotation.x = ((y - (1 - t)) / t) * -this.attributes.maxRotationOffset;
    } else {
      this.target.offset.rotation.x = 0;
    }
  }
};

export default Player;
