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
    App.renderer.setClearColor(0x888888, 1); //0xf9e5e2
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
    App.bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(width, height), 0.5, 0.2, .9); // resolution, strength, radius, threshold
    App.bloomPass.renderToScreen = true;

    App.effectsComposer = new THREE.EffectComposer(App.renderer);
    App.effectsComposer.setSize(width, height);
		App.effectsComposer.addPass(App.renderScene);
    App.effectsComposer.addPass(App.FXAAPass);
    App.effectsComposer.addPass(App.bloomPass);

    App.renderer.gammaInput = true;
		App.renderer.gammaOutput = true;
  },

  loadModels: function() {
    App.ready = false;
    App.loader = new Collider.Loader('./assets/');
    App.loader.loadFBX('model.fbx').then(function(meshes){
      for (let i=0; i<meshes.length; i+=1) {
        App.scene.add(meshes[i]);
        App.colliderSystem.add(new Collider.Mesh(meshes[i]));
      }
      App.ready = true;
    }, function(err){ throw(err); });
  },

  loadLighting: function() {
    App.lights = {
      p1: new THREE.PointLight(0xffffff, 1, 100, 2),
      a1: new THREE.AmbientLight(0xffffff, 0.05)
    };

    App.lights.p1.position.set(0, 2, 0);
    App.scene.add(App.lights.a1);
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
