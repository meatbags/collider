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
    App.camera.position.set(0, 10, -20);
    App.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // add stuff
    App.mtlLoader = new THREE.MTLLoader();
    App.mtlLoader.setPath('./assets/');
    App.mtlLoader.load('sample.mtl', function(materials) {
      materials.preload();
      var objLoader = new THREE.objLoader();
      objLoader.setPath('./assets/');
      objLoader.setMaterials(materials);
      objLoader.load('sample.obj', function(object){
        App.scene.add(object);
      });
    });

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
