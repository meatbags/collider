class Mouse {
  constructor(domElement) {
    // mouse handler
    this.domElement = domElement;
    this.x = 0;
    this.y = 0;
    this.origin = {x: 0, y: 0};
    this.delta = {x: 0, y: 0};
    this.pitch = 0;
    this.yaw = 0;
    this.locked = false;
    this.active = false;
  }

  start(e, pitch, yaw) {
    // set mouse position [-1, 1]
    var bound = this.domElement.getBoundingClientRect();
    this.pitch = (!isNaN(pitch)) ? pitch : 0;
    this.yaw = (!isNaN(yaw)) ? yaw : 0;
    this.active = true;
    this.origin.x = (bound.width) ? ((e.clientX - bound.left) / bound.width) * 2 - 1 : 0;
    this.origin.y = (bound.height) ? ((e.clientY - bound.top) / bound.height) * 2 - 1 : 0;
  }

  move(e) {
    // move mouse
    var bound = this.domElement.getBoundingClientRect();
    this.x = ((e.clientX - bound.left) / bound.width) * 2 - 1;
    this.y = ((e.clientY - bound.top) / bound.height) * 2 - 1;
    this.delta.x = this.x - this.origin.x;
    this.delta.y = this.y - this.origin.y;
  }

  stop() {
    // flag off
    this.active = false;
  }

  getPitch(pmin, pmax) {
    // get clamped pitch
    var p = Math.max(pmin, Math.min(pmax, this.pitch + this.delta.y));

    if ((p <= pmin) || (p >= pmax)) {
      // reset start
      this.origin.y = this.y;
      this.pitch = pitch;
    }

    return p;
  }

  getYaw() {
    return (this.yaw + this.delta.x);
  }

  isActive() {
    return this.active;
  }

  isLocked() {
    return this.locked;
  }
}

export { Mouse };
