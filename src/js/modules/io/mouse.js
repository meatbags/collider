class Mouse {
  constructor(domElement) {
    // mouse handler

    this.domElement = domElement;
    this.x = 0;
    this.y = 0;
    this.origin = new THREE.Vector2(0, 0);
    this.delta = new THREE.Vector2(0, 0);
    this.rotation = {pitch: 0, yaw: 0, roll: 0};
    this.locked = false;
    this.active = false;
  }

  start(e, pitch, yaw) {
    // set mouse position [-1, 1]

    this.active = true;
    const bound = this.domElement.getBoundingClientRect();
    this.origin.x = ((e.clientX - bound.x) / bound.width) * 2 - 1;
    this.origin.y = ((e.clientY - bound.y) / bound.height) * 2 - 1;
    this.rotation.pitch = pitch;
    this.rotation.yaw = yaw;
  }

  move(e) {
    // move mouse

    const bound = this.domElement.getBoundingClientRect();
    this.x = ((e.clientX - bound.x) / bound.width) * 2 - 1;
    this.y = ((e.clientY - bound.y) / bound.height) * 2 - 1;
    this.delta.x = this.x - this.origin.x;
    this.delta.y = this.y - this.origin.y;
  }

  stop() {
    // flag off

    this.active = false;
  }

  getPitch(min, max) {
    // get clamped pitch

    const pitch = Math.max(min, Math.min(max, this.rotation.pitch + this.delta.y));

    if (pitch == min || pitch == max) {
      // reset start

      this.origin.y = this.y;
      this.rotation.pitch = pitch;
    }

    return pitch;
  }

  getYaw() {
    // get yaw

    return this.rotation.yaw + this.delta.x;
  }

  isActive() {
    return this.active;
  }

  isLocked() {
    return this.locked;
  }
}

export { Mouse };
