/**
 * @author meatbags / https://github.com/meatbags
*/

const App = {
  init: function() {
    // set up 3JS
    App.renderer = new THREE.WebGLRenderer();
    App.renderer.setSize(1080, 540);
    App.renderer.setClearColor(0xf9e5e2, 1);
    document.getElementById('wrapper').appendChild(App.renderer.domElement);
    //document.body.append(App.renderer.domElement);

    // dev
    App.devcvs = document.getElementById('canvas');
    App.devctx = App.devcvs.getContext('2d');

    // scene
    App.scene = new THREE.Scene();
    App.player = new Collider.Player(App.renderer.domElement);

    // collision system
    App.colliderSystem = new Collider.System();

    // test
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
          child.material.transparent = true;
          //child.material.side = THREE.DoubleSide;
          child.material.opacity = 0.6;
          App.colliderSystem.add(new Collider.Mesh(child.geometry));
        }
        App.scene.add(object);
        App.ready = true;
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
    App.time = (new Date()).getTime();
    App.loop();
  },

  reduce: function(x) {
    return Math.floor(x * 10) / 10;
  },

  dev: function() {
    const x = 15;
    App.devctx.clearRect(0, 0, App.devcvs.width, App.devcvs.height);
    App.devctx.fillText('P ' + App.reduce(App.player.position.x) + ', ' + App.reduce(App.player.position.y) + ', ' + App.reduce(App.player.position.z), x, 20);
    App.devctx.fillText('M ' + App.reduce(App.player.movement.x) + ', ' + App.reduce(App.player.movement.y) + ', ' + App.reduce(App.player.movement.z), x, 40);
    App.devctx.fillText('D ' + App.reduce(App.player.rotation.x + App.player.offset.rotation.x) + ', ' + App.reduce(App.player.rotation.y + App.player.offset.rotation.y), x, 60);

    // testing
    const cs = App.colliderSystem;
    const pos = App.player.target.position;

    const ceilingCached = cs.isCached(pos, cs.cache.ceiling) ? ' CACHED' : '';
    let ceiling = cs.ceiling(pos);
    if (ceiling != null)
      ceiling = App.reduce(ceiling);
    const collisionCache = cs.isCached(pos, cs.cache.mesh) ? ' CACHED' : '';
    const collision = cs.collision(pos);
    const count = cs.countCollisions(pos);
    const from = new THREE.Vector3(pos.x, pos.y + 0.1, pos.z);
    const to = new THREE.Vector3(pos.x, pos.y - 0.1, pos.z);
    const intersect = (cs.cache.intersect.length > 0) ? cs.cache.intersect[0].item.intersect : null;
    let ix = iy = iz = null;
    if (intersect != null) {
      ix = App.reduce(intersect.intersect.x);
      iy = App.reduce(intersect.intersect.y);
      iz = App.reduce(intersect.intersect.z);
    }

    App.devctx.fillText('Collision: ' + collision + collisionCache, x, 80);
    App.devctx.fillText('Collisions: ' + count, x, 100);
    App.devctx.fillText('Y Ceiling: ' + ceiling + ceilingCached, x, 120);
    App.devctx.fillText('Intersect: ' + ix + ', ' + iy + ', ' + iz, x, 140);
  },

  test: function() {
    const step = 1;
    const size = step;

    for (let x=-12; x<12; x+=step) {
      for (let y=-5; y<5; y+=step) {
        for (let z=-12; z<12; z+=step) {
          const point = new THREE.Vector3(x, y, z);

          if (App.colliderSystem.check(point)) {
            const top = App.colliderSystem.getCeiling(new THREE.Vector3(x, 0, z));
            const mesh = new THREE.Mesh(
              new THREE.BoxBufferGeometry(size, size, size),
              new THREE.MeshLambertMaterial({
                color: 0x888888
              })
            );
            const mesh2 = new THREE.Mesh(
              new THREE.BoxBufferGeometry(size/10, size + 0.05, size/10),
              new THREE.MeshPhongMaterial({
                color: 0x888888
              })
            );
            mesh.position.set(x, y, z);
            mesh2.position.set(x, top, z);
            App.scene.add(mesh, mesh2);
          }
        }
      }
    }

    App.loop();
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
