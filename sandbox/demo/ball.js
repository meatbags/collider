class Ball {
  constructor(bound) {
    const c = (Math.round(Math.random() * 0xff) << 16) + (Math.round(Math.random() * 0xff) << 8) + (Math.round(Math.random() * 0xff));
    this.mesh = new THREE.Group();
    this.ball = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.25, 12, 12),
      new THREE.MeshStandardMaterial({
        color: c
      })
    );
    this.ball.position.y = 0.25;
    this.ball.castShadow = true;
    this.mesh.add(this.ball);
    this.bound = bound;
    this.position = this.mesh.position;
    this.position.set(Math.random() * (2 * bound) - bound, 1 + Math.random() * 20, Math.random() * (2 * bound) - bound);
    this.motion = new THREE.Vector3(0, 0, 0);
    this.rotation = {pitch: 0, yaw: 0, roll: 0};
    this.speed = 7;

    // setup
    this.jumpTimer = 2 + Math.random() * 5;
    this._randomiseVector();

    // collider
    this.interaction = new Collider.Interaction(this.position, this.rotation, this.motion);
  }

  update(delta, system) {
    // random jump
    this.jumpTimer -= delta;
    if (this.jumpTimer < 0) {
      this.motion.y = 12;
      this.jumpTimer = 2 + Math.random() * 5;
    }

    // physics
    this.interaction.computeNextPosition(delta, system);

    // limit
    if (this.position.x > this.bound || this.position.x < -this.bound) {
      this.position.x -= this.motion.x * delta;
      this.motion.x *= -1;
    }
    if (this.position.z > this.bound || this.position.z < -this.bound) {
      this.position.z -= this.motion.z * delta;
      this.motion.z *= -1;
    }
  }

  _randomiseVector() {
    this.rotation.yaw = Math.random() * Math.PI * 2;
    this.motion.x = Math.cos(this.rotation.yaw) * this.speed;
    this.motion.z = Math.sin(this.rotation.yaw) * this.speed;
  }
}

export default Ball;
