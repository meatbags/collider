/**
 ** Perspective first-person camera which tracks player.
 **/

class Camera {
  constructor(root) {
    this.root = root;
    this.position = root.player.position;
    this.rotation = root.player.rotation;
    this.height = root.player.height;
    //this.target = new THREE.Vector3();
    this.fov = 65;
    this.aspectRatio = this.root.width / this.root.height;
    this.offset = 0.1;
    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspectRatio, 0.1, 2000000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.rotation.order = 'YXZ';
  }

  resize(w, h) {
    this.aspectRatio = this.root.width / this.root.height;
    this.camera.aspect = this.aspectRatio;
    this.camera.updateProjectionMatrix();
  }

  update(delta) {
    const offsetXZ = this.offset - this.offset * Math.abs(Math.sin(this.rotation.y));
    const offsetY = this.offset;
    const y = this.position.y + this.height;
    this.camera.position.set(this.position.x, this.position.y + this.height, this.position.z);
    this.camera.rotation.y = this.rotation.x + Math.PI;
    this.camera.rotation.x = this.rotation.y;
  }
}

export default Camera;
