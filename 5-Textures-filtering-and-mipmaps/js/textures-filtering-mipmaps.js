// https://threejs.org/manual/#en/textures#filtering-and-mips

// Create a scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();   
scene.background = new THREE.Color(0x333333);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000 ); // ( 75 -> Degrés champ de vision, aspect-ratio -> window width / window height, 01, 1000 -> Espace devant la )
camera.position.z = 10;


// ---------------- TEXTURES ----------------
const loader = new THREE.TextureLoader();
// LinearFilter
var texture_linear = loader.load('resources/img/mip-low-res-enlarged.png');
texture_linear.magFilter = THREE.LinearFilter;
const material_linear = new THREE.MeshLambertMaterial({
  map: texture_linear
});
// NearestFilter
var texture_nearest = loader.load('resources/img/mip-low-res-enlarged.png');
texture_nearest.magFilter = THREE.NearestFilter;
const material_nearest = new THREE.MeshLambertMaterial({
  map: texture_nearest
});


// ---------------- 3D CUBES ----------------

const cubes = [];

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
cube_linear = new THREE.Mesh( geometry, material_linear );
cube_linear.position.x = 4;
scene.add( cube_linear );
cubes.push(cube_linear);  

cube_nearest = new THREE.Mesh( geometry, material_nearest );
cube_nearest.position.x = -4;
scene.add( cube_nearest );
cubes.push(cube_nearest);  



// Repeating, offseting, rotating, wrapping a texture

const texture = loader.load('resources/img/wall.jpeg');
  const material = new THREE.MeshBasicMaterial({
    map: texture,
  });
  const cube_repeat = new THREE.Mesh(geometry, material);
  scene.add(cube_repeat);
  cubes.push(cube_repeat);  // add to our list of cubes to rotate

  class DegRadHelper {
    constructor(obj, prop) {
      this.obj = obj;
      this.prop = prop;
    }
    get value() {
      return THREE.MathUtils.radToDeg(this.obj[this.prop]);
    }
    set value(v) {
      this.obj[this.prop] = THREE.MathUtils.degToRad(v);
    }
  }

  class StringToNumberHelper {
    constructor(obj, prop) {
      this.obj = obj;
      this.prop = prop;
    }
    get value() {
      return this.obj[this.prop];
    }
    set value(v) {
      this.obj[this.prop] = parseFloat(v);
    }
  }

  const wrapModes = {
    'ClampToEdgeWrapping': THREE.ClampToEdgeWrapping,
    'RepeatWrapping': THREE.RepeatWrapping,
    'MirroredRepeatWrapping': THREE.MirroredRepeatWrapping,
  };

  function updateTexture() {
    texture.needsUpdate = true;
  }

  const gui = new dat.GUI();
  gui.add(new StringToNumberHelper(texture, 'wrapS'), 'value', wrapModes)
    .name('texture.wrapS')
    .onChange(updateTexture);
  gui.add(new StringToNumberHelper(texture, 'wrapT'), 'value', wrapModes)
    .name('texture.wrapT')
    .onChange(updateTexture);
  gui.add(texture.repeat, 'x', 0, 5, .01).name('texture.repeat.x');
  gui.add(texture.repeat, 'y', 0, 5, .01).name('texture.repeat.y');
  gui.add(texture.offset, 'x', -2, 2, .01).name('texture.offset.x');
  gui.add(texture.offset, 'y', -2, 2, .01).name('texture.offset.y');
  gui.add(texture.center, 'x', -.5, 1.5, .01).name('texture.center.x');
  gui.add(texture.center, 'y', -.5, 1.5, .01).name('texture.center.y');
  gui.add(new DegRadHelper(texture, 'rotation'), 'value', -360, 360)
    .name('texture.rotation');


			
// Light
	const light = new THREE.DirectionalLight(0xFFFFFF,1.05)  // (color, intensity);
	light.position.set(-10, 15, 50);
	// Ajout lumière à la scene
	scene.add(light);


var time = 0;
function render() {
	time += 0.01; 

	cubes.forEach((cube, ndx) => {
		const speed = .2 + ndx * .1;
		const rot = time * speed;
		cube.rotation.x = rot;
		cube.rotation.y = rot;
	  });

	requestAnimationFrame(render);

 	renderer.render(scene, camera);
}
render();