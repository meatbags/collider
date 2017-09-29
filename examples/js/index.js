/**
 * @author meatbags / https://github.com/meatbags
*/

const App = {
  init: function() {
    // set up 3JS
    App.renderer = new THREE.WebGLRenderer();
    App.renderer.setSize(640, 480);
    App.renderer.setClearColor(0xf9e5e2, 1);
    document.body.append(App.renderer.domElement);

    // scene
    App.scene = new THREE.Scene();
    App.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    App.camera.position.set(60, 60, 60);
    App.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // collision system
    App.colliderSystem = new Collider.System();

    // add stuff
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
          App.colliderSystem.add(new Collider.Mesh(child.geometry));
        }
        App.scene.add(object);
      });
    });

    console.log(App.colliderSystem);

    // lights
    App.lights = {
      p1: new THREE.PointLight(0xffffff, 1),
      p2: new THREE.PointLight(0xffffff, 0.5),
      a1: new THREE.AmbientLight(0xffffff, 0.1)
    };

    App.lights.p1.position.set(10, 5, 0);
    App.lights.p2.position.set(-8, 5, 0);
    App.scene.add(
      App.lights.p1,
      App.lights.p2,
      App.lights.a1
    );

    // run!
    App.loop();
  },

  render: function() {
    App.renderer.render(App.scene, App.camera);
  },

  loop: function() {
    requestAnimationFrame(App.loop);
    App.render();
  }
}

window.onload = App.init;
