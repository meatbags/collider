/**
 * @author meatbags / https://github.com/meatbags
*/

const App = {
  init: function() {
    // set up
    App.renderer = new THREE.WebGLRenderer();
    App.renderer.setSize(1080, 540);
    App.renderer.setClearColor(0xf9e5e2, 1);
    document.getElementById('wrapper').appendChild(App.renderer.domElement);

    // scene
    App.scene = new THREE.Scene();
    App.player = new Collider.Player(App.renderer.domElement);
    App.scene.add(App.player.object);
    App.colliderSystem = new Collider.System();
    App.loadModels();
    App.loadLighting();

    // dev
    App.logger = new Collider.Logger();

    // run
    App.time = (new Date()).getTime();
    App.loop();
  },

  reduce: function(x) {
    return Math.floor(x * 10) / 10;
  },

  dev: function() {
    App.logger.print(
      'P ' + App.reduce(App.player.position.x) + ', ' + App.reduce(App.player.position.y) + ', ' + App.reduce(App.player.position.z),
      'M ' + App.reduce(App.player.movement.x) + ', ' + App.reduce(App.player.movement.y) + ', ' + App.reduce(App.player.movement.z),
      'D ' + App.reduce(App.player.rotation.pitch) + ', ' + App.reduce(App.player.rotation.yaw)
    );
  },

  loadModels: function() {
    App.ready = false;
    App.mtlLoader = new THREE.MTLLoader();
    App.mtlLoader.setPath('./assets/');
    App.mtlLoader.load('sample.mtl', function(materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('./assets/');
      objLoader.setMaterials(materials);
      objLoader.load('sample.obj', function(object){
        for (let i=0; i<object.children.length; i+=1) {
          const child = object.children[i];
          //child.material.transparent = true;
          //child.material.side = THREE.DoubleSide;
          //child.material.opacity = 0.75;
          App.colliderSystem.add(new Collider.Mesh(child.geometry));
        }
        App.scene.add(object);
        App.ready = true;
      });
    });
  },

  loadLighting: function() {
    App.lights = {
      p1: new THREE.PointLight(0xffffff, 1),
      p2: new THREE.PointLight(0xffffff, 0.5),
      a1: new THREE.AmbientLight(0xffffff, 0.1)
    };

    App.lights.p1.position.set(-20, 5, 0);
    App.lights.p2.position.set(0, 40, 0);
    App.scene.add(
      App.lights.p1,
      App.lights.p2,
      App.lights.a1
    );
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

    if (App.ready) {
      App.dev();
      App.update(delta);
      App.render();
    }
  }
}

window.onload = App.init;
