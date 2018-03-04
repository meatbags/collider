import * as Maths from '../maths/general';
import { Collider } from './collider';
import { Config } from '../conf';
import { Mouse, Keyboard } from '../io';

class Player {
  constructor(domElement) {
    // player handler

    this.domElement = domElement;
    this.config = Config.sandbox.player;

    // physical props

    this.config.adjust = Config.sandbox.adjust;
    this.config.physics = Config.sandbox.physics;
    this.minPitch = this.config.rotation.minPitch;
    this.maxPitch = this.config.rotation.maxPitch;
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

    // world

    this.collider = new Collider(this.target.position, this.motion);
    this.object = new THREE.Group();
    this.camera = new THREE.PerspectiveCamera(Config.sandbox.camera.fov, Config.sandbox.camera.aspect, Config.sandbox.camera.near, Config.sandbox.camera.far);
    this.camera.up = new THREE.Vector3(0, 1, 0);

    // set up

    this._events();
    this.resizeCamera();
  }

  _events() {
    // hook up doc events

    this.mouse = new Mouse(this.domElement);

    this.onMouseDown = (e) => {
      // mouse down

      if (!this.mouse.isLocked()) {
        this.mouse.start(e, this.rotation.pitch, this.rotation.yaw);
      }
    };
    this.onMouseMove = (e) => {
      // mouse moved

      if (this.mouse.isActive() && !(this.keyboard.keys.left || this.keyboard.keys.right)) {
        this.mouse.move(e);

        // set targets from delta

        this.target.rotation.yaw = this.mouse.getYaw();
        this.target.rotation.pitch = this.mouse.getPitch(this.minPitch, this.maxPitch);
      }
    };
    this.onMouseUp = (e) => {
      // mouse up

      this.mouse.stop();
    };

    this.domElement.addEventListener('mousedown', this.onMouseDown, false);
    this.domElement.addEventListener('mousemove', this.onMouseMove, false);
    this.domElement.addEventListener('mouseup', this.onMouseUp, false);
    this.domElement.addEventListener('mouseleave', this.onMouseUp, false);

    // mobile

    this.onMobileDown = (e) => { this.onMouseDown(e.touches[0]); };
    this.onMobileMove = (e) => { this.onMouseMove(e.touches[0]); };
    this.onMobileUp = (e) => { this.onMouseUp(e.touches[0]); };

    this.domElement.addEventListener('touchstart', this.onMobileDown, false);
    this.domElement.addEventListener('touchmove', this.onMobileMove, false);
    this.domElement.addEventListener('touchend', this.onMobileUp, false);

    // keyboard

    this.keyboard = new Keyboard();

		document.addEventListener('keydown', this.keyboard.onKeyDown, false);
		document.addEventListener('keyup', this.keyboard.onKeyUp, false);
  }

  update(delta, objects) {
    // apply input, compute physics, move

    this.input(delta);
    this.collider.move(delta, objects);
    this.move();
	}

  input(delta) {
    // handle directional input

    if (this.keyboard.keys.left || this.keyboard.keys.right) {
      // pan left/ right

      const dir = ((this.keyboard.keys.left) ? 1 : 0) + ((this.keyboard.keys.right) ? -1 : 0);
      this.target.rotation.yaw += this.config.speed.rotation * delta * dir;
    }

    if (this.keyboard.keys.up || this.keyboard.keys.down) {
      // move forward/ back

      const speed = (this.config.physics.noclip)
        ? this.config.speed.noclip * (1 - Math.abs(Math.sin(this.target.rotation.pitch)))
        : this.config.speed.normal;
      const dir = ((this.keyboard.keys.up) ? 1 : 0) + ((this.keyboard.keys.down) ? -1 : 0);
      const yaw = this.rotation.yaw + this.offset.rotation.yaw;
      const dx = Math.sin(yaw) * speed * dir;
      const dz = Math.cos(yaw) * speed * dir;
      this.target.motion.x = dx;
      this.target.motion.z = dz;
    } else {
      // stop moving

      this.target.motion.x = 0;
      this.target.motion.z = 0;
    }

    // handle jump key

    if (this.keyboard.keys.jump) {
      if (this.motion.y == 0 || this.fallTimer < this.config.speed.fallTimerThreshold) {
        // jump

        this.motion.y = this.config.speed.jump;

        // prevent double jump

        this.fallTimer = this.config.speed.fallTimerThreshold;
      }

      // release key

      this.keyboard.releaseKey('jump');
    }

    // compute falling

    this.falling = (this.motion.y != 0);
    this.fallTimer = (this.falling) ? this.fallTimer + delta : 0;

    // toggle noclip

    if (this.keyboard.keys.x) {
      this.keyboard.releaseKey('x');
      this.config.physics.noclip = (this.config.physics.noclip == false);
    }

    // handle noclip

    if (this.config.physics.noclip) {
      if (this.keyboard.keys.up || this.keyboard.keys.down) {
        const dir = ((this.keyboard.keys.up) ? 1 : 0) + ((this.keyboard.keys.down) ? -1 : 0);
        const pitch = this.target.rotation.pitch;
        this.target.motion.y = Math.sin(pitch) * this.config.speed.noclip * dir;
      } else {
        this.target.motion.y = 0;
      }

      this.falling = false;
      this.motion.y = this.target.motion.y;
    }

    // reduce input if falling

    if (!this.falling) {
      this.motion.x = this.target.motion.x;
      this.motion.z = this.target.motion.z;
    } else {
      this.motion.x += (this.target.motion.x - this.motion.x) * this.config.adjust.slow;
      this.motion.z += (this.target.motion.z - this.motion.z) * this.config.adjust.slow;
    }
  }

  move() {
    // move

    this.position.x += (this.target.position.x - this.position.x) * this.config.adjust.veryFast;
    this.position.y += (this.target.position.y - this.position.y) * this.config.adjust.veryFast;
    this.position.z += (this.target.position.z - this.position.z) * this.config.adjust.veryFast;

    // rotate

    this.rotation.yaw += Maths.minAngleDifference(this.rotation.yaw, this.target.rotation.yaw) * this.config.adjust.fast;
    this.offset.rotation.yaw += (this.target.offset.rotation.yaw - this.offset.rotation.yaw) * this.config.adjust.normal;
    this.rotation.yaw += (this.rotation.yaw < 0) ? Maths.twoPi : ((this.rotation.yaw > Maths.twoPi) ? -Maths.twoPi : 0);
    this.rotation.pitch += (this.target.rotation.pitch - this.rotation.pitch) * this.config.adjust.normal;
    this.offset.rotation.pitch += (this.target.offset.rotation.pitch - this.offset.rotation.pitch) * this.config.adjust.normal;
    this.rotation.roll += (this.target.rotation.roll - this.rotation.roll) * this.config.adjust.fast;

    // set camera from position/ rotation

    const pitch = this.rotation.pitch + this.offset.rotation.pitch;
    const yaw = this.rotation.yaw + this.offset.rotation.yaw;
    const height = this.position.y + this.config.height;
    const offxz = 1 - Math.abs(Math.sin(pitch));
    const offy = 1;

    // adjust camera roll for direction

    this.camera.up.z = -Math.sin(this.rotation.yaw) * this.rotation.roll;
    this.camera.up.x = Math.cos(this.rotation.yaw) * this.rotation.roll;

    // set position

    this.camera.position.set(
      this.position.x - Math.sin(yaw) * offxz / 4,
      height - Math.sin(pitch) * offy / 4,
      this.position.z - Math.cos(yaw) * offxz / 4
    );

    // look at target

    this.camera.lookAt(new THREE.Vector3(
      this.position.x + Math.sin(yaw) * offxz,
      height + Math.sin(pitch) * offy,
      this.position.z + Math.cos(yaw) * offxz
    ));

    // move scene object

    this.object.position.set(this.position.x, this.position.y, this.position.z);
  }

  resizeCamera() {
    // resize camera

    const bound = this.domElement.getBoundingClientRect();
    const w = bound.width;
    const h = bound.height;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
};

export { Player };
