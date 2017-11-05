import * as Maths from './Maths';
import Config from './Config';

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
  this.movement = new THREE.Vector3(0, 0, 0);
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
    movement: new THREE.Vector3(0, 0, 0),
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
  this.object = new THREE.Group();
	this.init();
};

Player.prototype = {
	init: function() {
		this.bindControls();
    this.resizeCamera();
	},

  update: function(delta, objects) {
    // handle mkb input and move player
    this.handleInput(delta);
    this.checkCollisions(delta, objects);
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
      const dir = ((this.keys.up) ? 1 : 0) + ((this.keys.down) ? -1 : 0);
      const yaw = this.rotation.yaw + this.offset.rotation.yaw;
      const dx = Math.sin(yaw) * this.config.speed.normal * dir;
      const dz = Math.cos(yaw) * this.config.speed.normal * dir;
      this.target.movement.x = dx;
      this.target.movement.z = dz;
    } else {
      this.target.movement.x = 0;
      this.target.movement.z = 0;
    }

    // jumping
    if (this.keys.jump) {
      this.keys.jump = false;

      // jump if not falling
      if (this.movement.y == 0 || this.fallTimer < this.config.speed.fallTimerThreshold) {
        this.movement.y = this.config.speed.jump;
      }
    }

    // falling
    this.falling = (this.movement.y != 0);
    this.fallTimer = (this.falling) ? this.fallTimer + delta : 0;

    // reduce movement if falling
    if (!this.falling) {
      this.movement.x = this.target.movement.x;
      this.movement.z = this.target.movement.z;
    } else {
      this.movement.x += (this.target.movement.x - this.movement.x) * this.config.adjust.slow;
      this.movement.z += (this.target.movement.z - this.movement.z) * this.config.adjust.slow;
    }
  },

  checkCollisions: function(delta, objects) {
    // check next position for collision
    let next = Maths.addVector(Maths.scaleVector(this.movement, delta), this.target.position);

    // get collisions
    let meshes = objects.getCollisionMeshes(next);

    // apply gravity
    this.movement.y = Math.max(this.movement.y - this.config.physics.gravity * delta, -this.config.physics.maxVelocity);

    if (meshes.length > 0) {
      // check for floor and change position
      let positionChanged = false;

      for (let i=0; i<meshes.length; i+=1) {
        const ceiling = meshes[i].getCeilingPlane(next);

        if (ceiling.y != null && ceiling.plane.normal.y >= this.config.climb.minPlaneYAngle && (ceiling.y - this.target.position.y) <= this.config.climb.up) {
          // climb up
          this.movement.y = 0;

          if (ceiling.y >= next.y) {
            positionChanged = true;
            next.y = ceiling.y;
          }
        }
      }

      // check *new* position for collisions
      if (positionChanged) {
        meshes = objects.getCollisionMeshes(next);
      }

      // check which collisions are walls
      let walls = [];

      for (let i=0; i<meshes.length; i+=1) {
        const ceiling = meshes[i].getCeilingPlane(next);

        if (ceiling.y != null && (ceiling.plane.normal.y < this.config.climb.minPlaneYAngle || (ceiling.y - this.target.position.y) > this.config.climb.up)){
          // record wall
          walls.push(meshes[i]);
        }
      }

      // if inside a wall, extrude out
      if (walls.length > 0) {
        let extrude = Maths.copyVector(next);

        // test first wall
        const intersectPlane = walls[0].getIntersectPlane2D(this.target.position, next);

        if (intersectPlane != null) {
          next.x = intersectPlane.intersect.x;
          next.z = intersectPlane.intersect.z;

          // check extruded point for collisions
          let hits = 0;
          meshes = objects.getCollisionMeshes(next);

          for (let i=0; i<meshes.length; i+=1) {
            const ceiling = meshes[i].getCeilingPlane(next);

            if (ceiling.y != null && (ceiling.plane.normal.y < this.config.climb.minPlaneYAngle || (ceiling.y - this.target.position.y) > this.config.climb.up)
            ) {
              hits += 1;
            }
          }

          // if contact with > 1 walls, stop motion
          if (hits > 1) {
            next.x = this.target.position.x;
            next.z = this.target.position.z;
          }
        }
      }
    } else if (this.movement.y < 0) {
      // check if on downward slope
      const under = Maths.copyVector(next);
      under.y -= this.config.climb.down;

      if (!this.falling && objects.getCollision(under)) {
        const ceiling = objects.getCeilingPlane(under);

        // snap to slope if not too steep
        if (ceiling.plane.normal.y >= this.config.climb.minPlaneYAngle) {
          next.y = ceiling.y;
          this.movement.y = 0;
        }
      }
    }

    // set new target position
    this.target.position.x = next.x;
    this.target.position.y = next.y;
    this.target.position.z = next.z;
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
    this.camera.position.set(this.position.x, height, this.position.z);

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
    if (this.mouse.active && !((this.keys.left || this.keys.right) && !this.ship.active)) {
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
      jump: false
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
