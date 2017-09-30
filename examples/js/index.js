/**
 * @author meatbags / https://github.com/meatbags
*/

const App = {
  init: function() {
    // set up 3JS
    App.renderer = new THREE.WebGLRenderer();
    App.renderer.setSize(960, 480);
    App.renderer.setClearColor(0xf9e5e2, 1);
    document.body.append(App.renderer.domElement);

    // scene
    App.scene = new THREE.Scene();
    App.camera = new THREE.PerspectiveCamera(45, 960/480, 0.1, 1000);

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
        //App.scene.add(object);
        App.test();
      });
    });

    // lights
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

    // run!
    App.start = (new Date()).getTime();
    App.time = 0;
    App.loop();
  },

  test: function() {
    const step = .25;
    let voxels = 0;

    for (let x=-7; x<7; x+=step) {
      for (let y=0; y<4; y+=step) {
        for (let z=-7; z<7; z+=step) {
          if (App.colliderSystem.check(new THREE.Vector3(x, y, z))) {
            const mesh = new THREE.Mesh(
              new THREE.BoxBufferGeometry(step, step, step),
              new THREE.MeshLambertMaterial({
                color: 0x888888
              })
            );
            mesh.position.set(x, y, z);
            App.scene.add(mesh);
            voxels += 1;
          }
        }
      }
    }

    console.log('Voxels', voxels);

    App.render();
  },

  update: function() {
    const now = (new Date()).getTime();
    App.time = (now - App.start) / 1000;
    App.camera.position.set(15, 10, 12);
    App.camera.lookAt(new THREE.Vector3(0, 1, 0));
  },

  render: function() {
    App.renderer.render(App.scene, App.camera);
  },

  loop: function() {
    //requestAnimationFrame(App.loop);
    App.update();
    App.render();
  }
}

window.onload = App.init;
