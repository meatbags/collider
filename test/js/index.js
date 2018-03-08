/**
 * @author meatbags / https://github.com/meatbags
*/

const App = {
  init: function() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // set up
    App.renderer = new THREE.WebGLRenderer();
    App.renderer.setSize(width, height);
    App.renderer.setClearColor(0x444444, 1); //0xf9e5e2
    document.getElementById('wrapper').appendChild(App.renderer.domElement);

    // scene
    App.scene = new THREE.Scene();
    App.player = new Collider.Player(App.renderer.domElement);
    App.scene.add(App.player.object);
    App.colliderSystem = new Collider.System();
    App.loadModels();
    App.loadLighting();
    App.initPostProcessing(width, height);

    // run
    App.time = (new Date()).getTime();
    App.age = 0;
    App.loop();
  },

  initPostProcessing: function(width, height) {
    //onlyAO: false, radius: 32, aoClamp: 0.25, lumInfluence: 0.7
    App.renderScene = new THREE.RenderPass(App.scene, App.player.camera);
    App.FXAAPass = new THREE.ShaderPass(THREE.FXAAShader);
		App.FXAAPass.uniforms['resolution'].value.set(1 / width, 1 / height);
    App.bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(width, height), 0.5, 0.7, .9); // resolution, strength, radius, threshold
    App.bloomPass.renderToScreen = true;
    //App.depthPass = new THREE.DepthBufferPass(App.scene, App.player.camera, width, height);

    App.effectsComposer = new THREE.EffectComposer(App.renderer);
    App.effectsComposer.setSize(width, height);
		App.effectsComposer.addPass(App.renderScene);
    //App.effectsComposer.addPass(App.depthPass);
    App.effectsComposer.addPass(App.FXAAPass);
    App.effectsComposer.addPass(App.bloomPass);

    App.renderer.gammaInput = true;
		App.renderer.gammaOutput = true;
  },

  loadModels: function() {
    App.ready = true;
    let floor = new THREE.Mesh(new THREE.BoxBufferGeometry(200, 1, 200), new THREE.MeshPhysicalMaterial({emissive: 0x222222, roughness:1}));
    App.scene.add(floor);
    App.colliderSystem.add(new Collider.Mesh(floor));

    let angle = 0;
    let height = -1;
    let len = 40;
    const rand = (v) => { return Math.random() * v - v / 2; };

    for (var i=0; i<1000; i++) {
      angle += Math.PI / 70;
      height += 0.5;
      const L = len + rand(2);
      const x = Math.sin(angle) * L + rand(20);
      const y = height + rand(2)
      const z = Math.cos(angle) * L + rand(20);
      const s = 5 + 2 * Math.random();
      const h = 3 + Math.random() * 5;
      const box = new THREE.Mesh(new THREE.BoxBufferGeometry(s, h, s), new THREE.MeshPhysicalMaterial({roughness: 1}));
      box.position.set(x, y, z);
      const rx = Math.random() * Math.PI / 4 - Math.PI / 8;
      const ry = Math.random() * Math.PI / 4 - Math.PI / 8;
      const rz = Math.random() * Math.PI / 4 - Math.PI / 8;
      box.rotation.set(rx, ry, rz);
      if (Math.abs(box.position.x) < 2) {
        box.position.x += 4;
      }
      if (Math.abs(box.position.z) < 2) {
        box.position.z += 4;
      }
      App.scene.add(box);
      App.colliderSystem.add(new Collider.Mesh(box));
    }
  },

  loadLighting: function() {
    App.lights = {
      p1: new THREE.PointLight(0xffffff, 1, 100, 2),
      a1: new THREE.AmbientLight(0xffffff, 0.05)
    };

    App.lights.p1.position.set(0, 5, 0);
    App.scene.add(App.lights.a1, App.lights.p1);
  },

  update: function(delta) {
    //App.age += delta;
    App.player.update(delta, App.colliderSystem);
  },

  render: function() {
    App.effectsComposer.render();
  },

  loop: function() {
    requestAnimationFrame(App.loop);

    // timing
    const now = (new Date()).getTime();
    const delta = (now - App.time) / 1000.;
    App.time = now;

    if (App.ready) {
      App.update(delta);
      App.render();
    }
  }
}

window.onload = App.init;
