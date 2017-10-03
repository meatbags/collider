import { distanceBetween2D, minAngleDifference } from './Maths';

const Player = function(domElement) {
  this.domElement = domElement;
  this.position = new THREE.Vector3(0, 0, 0);
  this.rotation = new THREE.Vector3(0, 0, 0);
  this.offset = {
    rotation: new THREE.Vector3(0, 0, 0)
  };
  this.target = {
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Vector3(0, 0, 0),
    offset: {
      rotation: new THREE.Vector3(0, 0, 0)
    }
  }
  this.attributes = {
    speed: 4,
    height: 1.8,
    climb: 1,
    rotation: Math.PI * 0.85,
    fov: 50,
    cameraThreshold: 0.33,
    maxRotationOffset: Math.PI * 0.25,
    adjust: 0.05,
    adjustFast: 0.09
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
			right: false
		};
		document.addEventListener("keydown", function(e) {
      self.handleKeyDown(e);
    }, false);
		document.addEventListener("keyup", function(e) {
      self.handleKeyUp(e);
		}, false);
	},

	update: function(delta, collider) {
		if (this.keys.up || this.keys.down) {
			const move = ((this.keys.up) ? 1: 0) + ((this.keys.down) ? -1 : 0);
			const dx = Math.sin(this.rotation.y) * this.attributes.speed * delta * move;
			const dz = Math.cos(this.rotation.y) * this.attributes.speed * delta * move;
			const nextX = this.position.x + dx;
			const nextZ = this.position.z + dz;
			const testX = {x: nextX, y: this.position.y, z: this.position.z};
			const testZ = {x: this.position.x, y: this.position.y, z: nextZ};
			let collisionX = false;
			let collisionZ = false;

			// XZ collisions
      /*
			for (let i=0; i<objects.length; i+=1) {
				const obj = objects[i];

				if (obj.type === TYPE_BOX || obj.type === TYPE_RAMP) {
					// test next X position
					if (obj.collision(testX)) {
						const y = obj.getTop(testX);

						if (Math.abs(this.position.y - y) > this.climbThreshold) {
							collisionX = true;
						}
					}

					// test next Z position
					if (obj.collision(testZ)) {
						const y = obj.getTop(testZ);

						if (Math.abs(this.position.y - y) > this.climbThreshold) {
							collisionZ = true;
						}
					}
				}
			}
      */

			// update XZ position
			this.position.x = (collisionX) ? this.position.x : nextX;
			this.position.z = (collisionZ) ? this.position.z : nextZ;
		} else {
      this.target.speed = 0;
    }

    let y = collider.getCeiling(this.position);

    if (y != null) {
      this.position.y = y;
    }

		// get next Y position
    /*
    let nextY = 0;

		for (let i=0; i<objects.length; i+=1) {
			const obj = objects[i];

			if (obj.type === TYPE_BOX || obj.type === TYPE_RAMP) {
				if (obj.collision2D(this.position)) {
					const y = obj.getTop(this.position);

					if (Math.abs(this.position.y - y) <= this.climbThreshold && y > nextY) {
						nextY = y;
					}
				}
			}
		}
    */

		//this.position.y += (nextY - this.position.y) * 0.3;

		// get next rotation
		if (this.keys.left || this.keys.right) {
			const rotate = ((this.keys.left) ? 1 : 0) + ((this.keys.right) ? -1 : 0);
			this.target.rotation.y += this.attributes.rotation * delta * rotate;
		}

		// update rotation
    this.rotation.y += minAngleDifference(this.rotation.y, this.target.rotation.y) * this.attributes.adjustFast;
    this.offset.rotation.x += (this.target.offset.rotation.x - this.offset.rotation.x) * this.attributes.adjust;
    this.offset.rotation.y += (this.target.offset.rotation.y - this.offset.rotation.y) * this.attributes.adjust;

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
