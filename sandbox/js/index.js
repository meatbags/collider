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
    App.scene.add(App.player.object);
    App.colliderSystem = new Collider.System();
    App.loadModels();
    App.loadLighting();

    // postprocessing
    App.renderScene = new THREE.RenderPass(App.scene, App.player.camera);
    App.bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(width, height), 0.75, 0.1, .9 // resolution, strength, radius, threshold
    );
		App.bloomPass.renderToScreen = true;
    App.effectsComposer = new THREE.EffectComposer(App.renderer);
    App.effectsComposer.setSize(width, height);
		App.effectsComposer.addPass(App.renderScene)
		App.effectsComposer.addPass(App.bloomPass);

    // gamma ?
    App.renderer.gammaInput = true;
		App.renderer.gammaOutput = true;

    // run
    App.time = (new Date()).getTime();
    App.age = 0;
    App.loop();
  },

  loadModels: function() {
    const standardMaterial = new THREE.MeshStandardMaterial( {
			map: null,
			bumpScale: - 0.05,
			color: 0xff8888,
			metalness: 0.5,
			roughness: 0.0
		});
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./assets/texture.jpg', function(map) {
			map.wrapS = THREE.RepeatWrapping;
			map.wrapT = THREE.RepeatWrapping;
			map.anisotropy = 4;
			map.repeat.set(10, 10);
			standardMaterial.map = map;
			standardMaterial.roughnessMap = map;
			standardMaterial.bumpMap = map;
			standardMaterial.needsUpdate = true;
		});

    const fileBase = "./assets/envmap/";
	  const urls = [
      fileBase + "posx.jpg", fileBase + "negx.jpg",
		  fileBase + "posy.jpg", fileBase + "negy.jpg",
			fileBase + "posz.jpg", fileBase + "negz.jpg"
    ];
    const textureCube = new THREE.CubeTextureLoader().load( urls );
		textureCube.format = THREE.RGBFormat;
		textureCube.mapping = THREE.CubeReflectionMapping;

    standardMaterial.envMap = textureCube;
    standardMaterial.envMapIntensity = 1;

    // loader
    App.ready = false;
    App.mtlLoader = new THREE.MTLLoader();
    App.mtlLoader.setPath('./assets/');

    // map
    App.mtlLoader.load('sample.mtl', function(materials) {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setPath('./assets/');
      objLoader.setMaterials(materials);

      objLoader.load('sample.obj', function(object){
        for (let i=0; i<object.children.length; i+=1) {
          const child = object.children[i];
          child.material = standardMaterial;
          App.colliderSystem.add(new Collider.Mesh(child));
        }

        App.scene.add(object);
        App.ready = true;
      });
    });

    App.cube = new THREE.Mesh(
      new THREE.BoxBufferGeometry(5, 2, 5),
      standardMaterial
    );

    App.scene.add(App.cube);
    App.colliderSystem.add(new Collider.Mesh(App.cube));
    App.cube.position.set(6, 0, 6);
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
    App.age += delta;
    App.player.update(delta, App.colliderSystem);
    App.cube.position.y = Math.sin(App.age) * 2 + 2;
  },

  render: function() {
    App.effectsComposer.render();
    //App.renderer.render(App.scene, App.player.camera);
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
