var camera, scene, renderer, stats;
			var target;
			var postScene, postCamera;
			var supportsExtension = true;

			init();
			animate();

			function init() {

				renderer = new THREE.WebGLRenderer( { canvas: document.querySelector( 'canvas' ) } );

				if ( !renderer.extensions.get( 'WEBGL_depth_texture' ) ) {

					supportsExtension = false;
					document.querySelector( '#error' ).style.display = 'block';
					return;

				}

				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				//

				stats = new Stats();
				document.body.appendChild( stats.dom );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 50 );
				camera.position.z = -4;

				var controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.enableDamping = true;
				controls.dampingFactor = 0.25;
				controls.rotateSpeed = 0.35;

				// Create a multi render target with Float buffers
				target = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
				target.texture.format = THREE.RGBFormat;
				target.texture.minFilter = THREE.NearestFilter;
				target.texture.magFilter = THREE.NearestFilter;
				target.texture.generateMipmaps = false;
				target.stencilBuffer = false;
				target.depthBuffer = true;
				target.depthTexture = new THREE.DepthTexture();
				target.depthTexture.type = THREE.UnsignedShortType;

				// Our scene
				scene = new THREE.Scene();
				setupScene();

				// Setup post-processing step
				setupPost();

				onWindowResize();
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function setupPost () {

				// Setup post processing stage
				postCamera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
				var postMaterial = new THREE.ShaderMaterial( {
					vertexShader: document.querySelector( '#post-vert' ).textContent.trim(),
					fragmentShader: document.querySelector( '#post-frag' ).textContent.trim(),
					uniforms: {
						cameraNear: { value: camera.near },
						cameraFar:  { value: camera.far },
						tDiffuse:   { value: target.texture },
						tDepth:     { value: target.depthTexture }
					}
				});
				var postPlane = new THREE.PlaneBufferGeometry( 2, 2 );
				var postQuad = new THREE.Mesh( postPlane, postMaterial );
				postScene = new THREE.Scene();
				postScene.add( postQuad );

			}

			function setupScene () {

				var diffuse = new THREE.TextureLoader().load( 'textures/brick_diffuse.jpg' );
				diffuse.wrapS = diffuse.wrapT = THREE.RepeatWrapping;

				// Setup some geometries
				var geometry = new THREE.TorusKnotBufferGeometry( 1, 0.3, 128, 64 );
				var material = new THREE.MeshBasicMaterial( { color: 'blue' } );

				var count = 50;
				var scale = 5;

				for ( var i = 0; i < count; i ++ ) {

					var r = Math.random() * 2.0 * Math.PI;
					var z = ( Math.random() * 2.0 ) - 1.0;
					var zScale = Math.sqrt( 1.0 - z * z ) * scale;

					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.set(
						Math.cos( r ) * zScale,
						Math.sin( r ) * zScale,
						z * scale
					);
					mesh.rotation.set( Math.random(), Math.random(), Math.random() );
					scene.add( mesh );

				}

			}

			function onWindowResize() {

				var aspect = window.innerWidth / window.innerHeight;
				camera.aspect = aspect;
				camera.updateProjectionMatrix();

				var dpr = renderer.getPixelRatio();
				target.setSize( window.innerWidth * dpr, window.innerHeight * dpr );
				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				if ( !supportsExtension ) return;

				requestAnimationFrame( animate );

				// render scene into target
				renderer.render( scene, camera, target );

				// render post FX
				renderer.render( postScene, postCamera );

				stats.update();

			}
