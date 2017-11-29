/**
 * @author meatbags / https://github.com/meatbags
*/

const App = {
  init: function() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // set up
    App.renderer = new THREE.WebGLRenderer({alpha: true});
    App.renderer.setSize(width, height);
    App.renderer.setClearColor(0x0, 1);
    document.getElementById('wrapper').appendChild(App.renderer.domElement);

    // scene
    App.scene = new THREE.Scene();
    App.player = new Collider.Player(App.renderer.domElement);
    App.player.camera.near = 0.1;
    App.player.camera.far = 1000;
    App.player.camera.updateProjectionMatrix();
    App.player.config.physics.noclip = true;
    App.player.target.position.y = App.player.position.y = 0;
    App.player.target.position.z = App.player.position.z = 0;
    App.player.target.position.x = App.player.position.x = 0;
    App.player.target.rotation.yaw = App.player.rotation.yaw = Math.random() * Math.PI * 2;
    App.scene.add(App.player.object);
    App.colliderSystem = new Collider.System();
    App.loadModels();
    App.loadLighting();

    // resize
    window.onresize = function() {
      App.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // run
    App.time = (new Date()).getTime();
    App.age = 0;
    App.loop();
  },

  loadModels: function() {
    // depth mat
    App.ready = true;
    THREE.DepthShader.vertexShader = document.querySelector('#vertex-shader').textContent;
    THREE.DepthShader.fragmentShader = document.querySelector('#fragment-shader').textContent;
    App.material = new THREE.ShaderMaterial(THREE.DepthShader);

    const floor = new THREE.Mesh(new THREE.BoxBufferGeometry(1000, 2, 1000), App.material);
    floor.position.y = -1;
    App.colliderSystem.add(new Collider.Mesh(floor));
    //App.scene.add(floor);

    /*
    for (let x=-200; x<200; x+=15) {
      for (let z=-200; z<200; z+=15) {
        const w = 4 + Math.random() * 4;
        const box = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 100, 1), App.material);
        const cone = new THREE.Mesh(new THREE.ConeBufferGeometry(10, 10, 4), App.material);
        box.position.set(x, 50, z);
        cone.position.set(x, 5, z);
        App.scene.add(cone);
        cone.rotation.y = Math.random() * Math.PI * 2;
      }
    }
    */

    App.loader = new Collider.Loader('../assets/');
    App.loader.loadFBX('model_depth.fbx').then(function(meshes){
      App.meshes = meshes;
      for (let i=0; i<meshes.length; i+=1) {
        meshes[i].material = App.material;
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

    App.lights.p1.position.set(0, 3, 0);
    //App.scene.add(App.lights.a1, App.lights.p1);
  },

  update: function(delta) {
    App.player.update(delta, App.colliderSystem);
    if (App.meshes) {
      App.meshes[0].rotation.x += delta * 0.01;
      App.meshes[0].rotation.z += delta * 0.03;
      App.meshes[0].rotation.y += delta * 0.05;
    }
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
      App.material.uniforms.uTime.value = App.age;
      App.update(delta);
      App.render();
    }
  }
}

window.onload = App.init;
