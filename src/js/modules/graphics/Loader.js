import Config from '../config/Config';

const Loader = function(basePath) {
  this.basePath = basePath;
  this.init();
};

Loader.prototype = {
  init: function() {
    // FBX Loader (animation + PBR support)
    this.FBXLoader = new THREE.FBXLoader();

    // default envmap
    this.envTextureCube = new THREE.CubeTextureLoader().load([
      this.basePath + 'envmap/posx.jpg',
      this.basePath + 'envmap/negx.jpg',
      this.basePath + 'envmap/posy.jpg',
      this.basePath + 'envmap/negy.jpg',
      this.basePath + 'envmap/posz.jpg',
      this.basePath + 'envmap/negz.jpg',
    ]);
		this.envTextureCube.format = THREE.RGBFormat;
		this.envTextureCube.mapping = THREE.CubeReflectionMapping;
  },

  loadFBX: function(filename) {
    const self = this;

    console.log(filename);

    return new Promise(
      function(resolve, reject) {
        try {
          self.FBXLoader.load(self.basePath + filename, function(object) {
            const meshes = [];

            // get meshes (ignore lights, etc)
            for (let i=0; i<object.children.length; i+=1) {
              if (object.children[i].type == 'Mesh') {
                meshes.push(object.children[i]);
              } else if (object.children[i].type == 'Group') {
                for (let j=0; j<object.children[i].children.length; j+=1) {
                  if (object.children[i].children[j].type == 'Mesh') {
                    meshes.push(object.children[i].children[j]);
                  }
                }
              }
            }

            // set env map
            for (let i=0; i<meshes.length; i+=1) {
              const mat = meshes[i].material;

              mat.envMap = self.envTextureCube;
              mat.envMapIntensity = mat.metalness;
              mat.bumpScale = 0.01;
            }

            resolve(meshes);
          });
        } catch(error) {
          reject(error);
        }
      }
    )
  },

  process: function(obj, materials) {
    for (let i=0; i<obj.children.length; i+=1) {
      const child = obj.children[i];
      const meta = materials.materialsInfo[child.material.name];

      // set material
      child.material = materials.materials[child.material.name];

      console.log(meta, child.material);

      // load lightmaps
      if (meta.map_ka) {
        const uvs = child.geometry.attributes.uv.array;
        const src = meta.map_ka;
        const tex = new THREE.TextureLoader().load(self.basePath + src);

        child.material.lightMap = tex;
        child.material.lightMapIntensity = Config.Loader.lightMapIntensity;
        child.geometry.addAttribute('uv2', new THREE.BufferAttribute(uvs, 2));
      }

      // make glass translucent
      if (child.material.map) {
        // if textured, set full colour
        child.material.color = new THREE.Color(0xffffff);

        // set transparent for .png
        if (child.material.map.image.src.indexOf('.png') !== -1) {
          child.material.transparent = true;
          child.material.side = THREE.DoubleSide;
        }

        // for glass
        if (child.material.map.image.src.indexOf('glass') != -1) {
          child.material.transparent = true;
          child.material.opacity = Config.Loader.glassOpacity;
        }
      } else {
        // no texture, set colour
        //child.material.emissive = child.material.color;
      }
    }
  },

  loadOBJ: function(filename) {
    const self = this;

    return new Promise(
      function(resolve, reject) {
        try {
          self.materialLoader.load(filename + '.mtl', function(materials) {
            materials.preload();
            //self.objectLoader.setMaterials(materials);
            self.objectLoader.load(filename + '.obj', function(obj){
              self.process(obj, materials);
              resolve(obj);
            });
          });
        } catch(error) {
          reject(error);
        }
      }
    );
  }
};

export default Loader;
