import Ball from './ball.js';

class App {
  constructor() {
    // set up
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(900, 600);
    this.renderer.setClearColor(0xaaaaaa);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('wrapper').appendChild(this.renderer.domElement);

    // scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 800/600, 0.5, 1000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.position.set(10, 20, 10);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // collider
    this.colliderSystem = new Collider.System();
    this.createScene();
    this.createLights();

    // run
    this.angle = 0;
    this.paused = false;
    this.time = (new Date()).getTime();
    this.age = 0;
    this.loop();
  }

  createScene() {
    // base
    const size = 25;
    const block = new THREE.Mesh(
      new THREE.BoxBufferGeometry(size, 1, size),
      new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.75
      })
    );
    block.receiveShadow = true;
    this.scene.add(block);
    this.colliderSystem.add(new Collider.Mesh(block));

    // make some obstacles
    const torus = new THREE.Mesh(
      new THREE.TorusBufferGeometry(4, 2, 5, 8),
      new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.75
      })
    );
    torus.rotation.x = Math.PI / 2;
    torus.receiveShadow = torus.castShadow = true;
    this.scene.add(torus);
    this.colliderSystem.add(new Collider.Mesh(torus));

    for (let i=0; i<6; i++) {
      const h = 1 + Math.random() * 10;
      const cube = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1.5, h, 2),
        new THREE.MeshStandardMaterial({
          color: 0x888888,
          roughness: 0.75
        })
      );
      const x = Math.random() * (size) - size * 0.5;
      const z = Math.random() * (size) - size * 0.5;
      cube.position.set(x, h / 2 - 1, z);
      cube.rotation.y = Math.random() * Math.PI;
      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.z = Math.random() * Math.PI;
      cube.receiveShadow = true;
      cube.castShadow = true;
      this.scene.add(cube);
      this.colliderSystem.add(
        new Collider.Mesh(cube)
      );
    }

    this.ramp  = new THREE.Mesh(
      new THREE.BoxBufferGeometry(4, 4, 4),
      new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.75
      })
    );
    this.ramp.rotation.x = Math.PI / 4;
    this.ramp.rotation.z = Math.PI / 4;
    this.ramp.rotation.y = Math.PI / 4;
    this.ramp.position.x = -size / 4;
    this.ramp.castShadow = this.ramp.receiveShadow = true;
    this.scene.add(this.ramp);
    this.colliderSystem.add(new Collider.Mesh(this.ramp));

    // physics balls
    this.objects = [];
    for (let i=0; i<15; i++) {
      const ball = new Ball(size / 2);
      this.objects.push(ball);
      this.scene.add(ball.mesh);
    }
  }

  createLights() {
    // light the scene

    this.lights = {
      p1: new THREE.PointLight(0xffffff, 1),
      a1: new THREE.AmbientLight(0xffffff, 0.25)
    };
    this.lights.p1.position.set(5, 15, 5);
    this.lights.p1.castShadow = true;
    this.scene.add(this.lights.p1, this.lights.a1);
  }

  update(delta) {
    this.ramp.position.y = Math.abs(Math.sin(this.age / 5) * 5);
    this.angle += delta * 0.1;
    this.camera.position.set(Math.cos(this.angle) * 10, 20, Math.sin(this.angle) * 10);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.objects.forEach((obj) => { obj.update(delta, this.colliderSystem); });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  loop() {
    requestAnimationFrame(() => { this.loop(); })

    // timing
    const now = (new Date()).getTime();
    const delta = (now - this.time) / 1000.;
    this.time = now;
    this.age += delta;

    if (!this.paused) {
      this.update(delta);
      this.render();
    }
  }
};

window.onload = function() {
  const app = new App();
};
