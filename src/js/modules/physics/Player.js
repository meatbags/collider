import * as Maths from './Maths';
import Interaction from './Interaction';
import Config from '../config/Config';

const Player = function(domElement) {
  this.domElement = domElement;
  this.config = Config.sandbox.player;
  this.config.adjust = Config.sandbox.adjust;
  this.config.physics = Config.sandbox.physics;
  this.position = new THREE.Vector3(this.config.position.x, this.config.position.y, this.config.position.z);
  this.rotation = {
    pitch: this.config.rotation.pitch,
    yaw: this.config.rotation.yaw,
    roll: this.config.rotation.roll
  };
  this.motion = new THREE.Vector3(0, 0, 0);
  this.offset = {
    rotation: {
      pitch: 0,
      yaw: 0,
      roll: 0
    }
  };
  this.target = {
    position: new THREE.Vector3(this.config.position.x, this.config.position.y, this.config.position.z),
    rotation: {
      pitch: this.config.rotation.pitch,
      yaw: this.config.rotation.yaw,
      roll: this.config.rotation.roll,
    },
    motion: new THREE.Vector3(0, 0, 0),
    offset: {
      rotation: {
        pitch: 0,
        yaw: 0,
        roll: 0,
      }
    }
  };
  this.falling = false;
  this.fallTimer = 0;
  this.camera = new THREE.PerspectiveCamera(Config.sandbox.camera.fov, Config.sandbox.camera.aspect, Config.sandbox.camera.near, Config.sandbox.camera.far);
  this.camera.up = new THREE.Vector3(0, 1, 0);
  this.interaction = new Interaction(this.target.position, this.target.rotation, this.motion);
	this.init();
};

Player.prototype = {
	init: function() {
    // world
    this.object = new THREE.Group();
    this.objectLight = new THREE.PointLight(0xffffff, 0.25, 100, 2);
    this.objectLight.position.y = this.config.height / 2;
    this.object.add(this.objectLight);

    // controls
		this.bindControls();

    // camera
    this.resizeCamera();
	},

  update: function(delta, objects) {
    // handle mkb input and move player
    this.handleInput(delta);

    // apply physics
    this.interaction.computeNextPosition(delta, objects);

    // move player & camera
    this.move();
	},

  handleInput: function(delta) {
    // left/ right keys
    if (this.keys.left || this.keys.right) {
      const dir = ((this.keys.left) ? 1 : 0) + ((this.keys.right) ? -1 : 0);
      this.target.rotation.yaw += this.config.speed.rotation * delta * dir;
    }

    // up/ down keys
    if (this.keys.up || this.keys.down) {
      const speed = (this.config.physics.noclip) ? this.config.speed.noclip : this.config.speed.normal;
      const dir = ((this.keys.up) ? 1 : 0) + ((this.keys.down) ? -1 : 0);
      const yaw = this.rotation.yaw + this.offset.rotation.yaw;
      const dx = Math.sin(yaw) * speed * dir;
      const dz = Math.cos(yaw) * speed * dir;
      this.target.motion.x = dx;
      this.target.motion.z = dz;
    } else {
      this.target.motion.x = 0;
      this.target.motion.z = 0;
    }

    // jumping
    if (this.keys.jump) {
      this.keys.jump = false;

      // jump if not falling
      if (this.motion.y == 0 || this.fallTimer < this.config.speed.fallTimerThreshold) {
        this.motion.y = this.config.speed.jump;
      }
    }

    // falling
    this.falling = (this.motion.y != 0);
    this.fallTimer = (this.falling) ? this.fallTimer + delta : 0;

    // noclip
    if (this.keys.x) {
      this.keys.x = false;
      this.config.physics.noclip = (this.config.physics.noclip == false);
    }

    if (this.config.physics.noclip) {
      this.falling = false;

      if (this.keys.up || this.keys.down) {
        const dir = ((this.keys.up) ? 1 : 0) + ((this.keys.down) ? -1 : 0);
        const pitch = this.target.rotation.pitch;
        this.target.motion.y = Math.sin(pitch) * this.config.speed.noclip * dir;
      } else {
        this.target.motion.y = 0;
      }

      this.motion.y = this.target.motion.y;
    }

    // reduce motion if falling
    if (!this.falling) {
      this.motion.x = this.target.motion.x;
      this.motion.z = this.target.motion.z;
    } else {
      this.motion.x += (this.target.motion.x - this.motion.x) * this.config.adjust.slow;
      this.motion.z += (this.target.motion.z - this.motion.z) * this.config.adjust.slow;
    }
  },

  move: function() {
    // move
    this.position.x += (this.target.position.x - this.position.x) * this.config.adjust.veryFast;
    this.position.y += (this.target.position.y - this.position.y) * this.config.adjust.rapid;
    this.position.z += (this.target.position.z - this.position.z) * this.config.adjust.veryFast;

    // rotate
    this.rotation.yaw += Maths.minAngleDifference(this.rotation.yaw, this.target.rotation.yaw) * this.config.adjust.fast;
    this.offset.rotation.yaw += (this.target.offset.rotation.yaw - this.offset.rotation.yaw) * this.config.adjust.normal;
    this.rotation.yaw += (this.rotation.yaw < 0) ? Maths.twoPi : ((this.rotation.yaw > Maths.twoPi) ? -Maths.twoPi : 0);
    this.rotation.pitch += (this.target.rotation.pitch - this.rotation.pitch) * this.config.adjust.normal;
    this.offset.rotation.pitch += (this.target.offset.rotation.pitch - this.offset.rotation.pitch) * this.config.adjust.normal;
    this.rotation.roll += (this.target.rotation.roll - this.rotation.roll) * this.config.adjust.fast;

    // set camera
    const pitch = this.rotation.pitch + this.offset.rotation.pitch;
    const yaw = this.rotation.yaw + this.offset.rotation.yaw;
    const height = this.position.y + this.config.height;

    // set camera roll
    this.camera.up.z = -Math.sin(this.rotation.yaw) * this.rotation.roll;
    this.camera.up.x = Math.cos(this.rotation.yaw) * this.rotation.roll;

    // set position
    this.camera.position.set(
      this.position.x - Math.sin(yaw) * 0.25,
      height - Math.sin(pitch) * 0.25,
      this.position.z - Math.cos(yaw) * 0.25
    );

    // look
    this.camera.lookAt(new THREE.Vector3(
      this.position.x + Math.sin(yaw),
      height + Math.sin(pitch),
      this.position.z + Math.cos(yaw)
    ));

    // set world object
    this.object.position.set(this.position.x, this.position.y, this.position.z);
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
      case 88:
        this.keys.x = true;
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
      default:
        break;
    }
  },

  handleMouseDown(e) {
    if (!this.mouse.locked) {
      const self = this;
      const bound = this.domElement.getBoundingClientRect();

      this.mouse.active = true;
      this.mouse.rotation.pitch = this.rotation.pitch;
      this.mouse.rotation.yaw = this.rotation.yaw;
      this.mouse.start.x = (e.clientX / this.domElement.width) * 2 - 1;
      this.mouse.start.y = ((e.clientY - bound.y) / this.domElement.height) * 2 - 1;
    }
  },

  handleMouseMove(e) {
    if (this.mouse.active && !(this.keys.left || this.keys.right)) {
      const bound = this.domElement.getBoundingClientRect();

      this.mouse.x = (e.clientX / this.domElement.width) * 2 - 1;
      this.mouse.y = ((e.clientY - bound.y) / this.domElement.height) * 2 - 1;
      this.mouse.delta.x = this.mouse.x - this.mouse.start.x;
      this.mouse.delta.y = this.mouse.y - this.mouse.start.y;

      // target rotation yaw
      this.target.rotation.yaw = this.mouse.rotation.yaw + this.mouse.delta.x;

      // target rotation pitch
      let pitch = this.mouse.rotation.pitch + this.mouse.delta.y;

      // if limit reached, reset start point
      if (pitch > this.config.rotation.maxPitch || pitch < this.config.rotation.minPitch) {
        pitch = Math.max(
          this.config.rotation.minPitch,
          Math.min(
            this.config.rotation.maxPitch,
            pitch
          )
        );
        this.mouse.start.y = this.mouse.y;
        this.mouse.rotation.pitch = pitch;
      }

      this.target.rotation.pitch = pitch;
    }
  },

  handleMouseUp(e) {
    this.mouse.active = false;
  },

  resizeCamera: function() {
    const w = this.domElement.width;
    const h = this.domElement.height;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  },

	bindControls: function() {
		const self = this;

    // keys
    self.keys = {
			up: false,
			down: false,
			left: false,
			right: false,
      jump: false,
      x: false
		};
    self.mouse = {
      x: 0,
      y: 0,
      start: {
        x: 0,
        y: 0
      },
      delta: {
        x: 0,
        y: 0
      },
      rotation: {
        pitch: 0,
        yaw: 0
      },
      locked: false,
      active: false
    };

    // mouse
    self.domElement.addEventListener('click', function(e){
    //  console.log(self)
    }, false);
    self.domElement.addEventListener('mousedown', function(e){
      self.handleMouseDown(e);
    }, false);
    self.domElement.addEventListener('mousemove', function(e){
      self.handleMouseMove(e);
    }, false);
    self.domElement.addEventListener('mouseup', function(e){
      self.handleMouseUp(e);
    }, false);
    self.domElement.addEventListener('mouseleave', function(e){
      self.handleMouseUp(e);
    }, false);

    // keyboard
		document.addEventListener('keydown', function(e) {
      self.handleKeyDown(e);
    }, false);
		document.addEventListener('keyup', function(e) {
      self.handleKeyUp(e);
		}, false);
	}
};

export default Player;
