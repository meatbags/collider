/**
 * @author meatbags / https://github.com/meatbags
*/

const App = {
  init: function() {
    const width = 1080;
    const height = 540;

    // set up
    App.renderer = new THREE.WebGLRenderer();
    App.renderer.setSize(width, height);
    App.renderer.setClearColor(0xf9e5e2, 1);
    document.getElementById('wrapper').appendChild(App.renderer.domElement);

    // scene
    App.scene = new THREE.Scene();
    App.player = new Collider.Player(App.renderer.domElement);
    App.player.camera.near = 0.1;
    App.player.camera.far = 1000;
    App.player.camera.updateProjectionMatrix();
    App.scene.add(App.player.object);
    App.colliderSystem = new Collider.System();
    App.loadModels();
    App.loadLighting();

    // run
    App.time = (new Date()).getTime();
    App.age = 0;
    App.loop();
  },

  loadModels: function() {
    App.material = new THREE.ShaderMaterial(THREE.DepthShader);
    App.materialAlt = new THREE.ShaderMaterial(THREE.DepthShaderAlt);

    App.ready = true;
    App.scene.add(new THREE.Mesh(
      new THREE.BoxBufferGeometry(100, 1, 100),
      App.material
    ))

    const min = -100;
    const max = 100;
    const range = max - min;

    for (let i=0; i<300; i+=1) {
      const h = Math.random() * 100 + 10;
      const obj = new THREE.Mesh(
        new THREE.BoxBufferGeometry(6, h, 6),
        (Math.random() > 0.5) ? App.material : App.materialAlt
      );
      obj.position.set(Math.random() * range - range / 2, h / 2, Math.random() * range - range / 2);
      App.scene.add(obj);
    }
  },

  loadLighting: function() {
    App.lights = {
      p1: new THREE.PointLight(0xffffff, 1, 100, 2),
      a1: new THREE.AmbientLight(0xffffff, 0.05)
    };

    App.lights.p1.position.set(0, 3, 0);
    App.scene.add(App.lights.a1, App.lights.p1);
  },

  update: function(delta) {
    App.player.update(delta, App.colliderSystem);
  },

  render: function() {
    App.renderer.render(App.scene, App.player.camera);
  },

  loop: function() {
    requestAnimationFrame(App.loop);

    // timing
    const now = (new Date()).getTime();
    const delta = (now - App.time) / 1000.;
    App.time = now;
    App.age += delta;

    if (App.ready) {
      App.material.uniforms.time.value = App.age;
      App.materialAlt.uniforms.time.value = App.age;
      App.update(delta);
      App.render();
    }
  }
}

window.onload = App.init;
