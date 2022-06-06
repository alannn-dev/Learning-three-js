// Créer la scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();   
scene.background = new THREE.Color(0x333333);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000 ); // ( 75 -> Degrés champ de vision, aspect-ratio -> window width / window height, 01, 1000 -> Espace devant la )
camera.position.z = 120;



// MeshLambertMaterial 
const boxGeometry = new THREE.BoxGeometry(20, 20, 20); // Forme 

// Add texture (Simple texture download)
const loader = new THREE.TextureLoader();
const material = new THREE.MeshBasicMaterial({
map: loader.load('resources/img/wall.jpeg'),
});

const cube = new THREE.Mesh(boxGeometry, material);
cube.rotation.set(0.4, 0.2, 0);
cube.position.x = -50;
scene.add(cube);



// Add multiples texture
const boxTwoGeometry = new THREE.BoxGeometry(20, 20, 20); 

const loaderTwo = new THREE.TextureLoader();

const materials = [
	new THREE.MeshBasicMaterial({map: loader.load('resources/img/flower-1.jpeg')}),
	new THREE.MeshBasicMaterial({map: loader.load('resources/img/flower-2.jpeg')}),
	new THREE.MeshBasicMaterial({map: loader.load('resources/img/flower-3.jpeg')}),
	new THREE.MeshBasicMaterial({map: loader.load('resources/img/flower-4.jpeg')}),
	new THREE.MeshBasicMaterial({map: loader.load('resources/img/flower-5.jpeg')}),
	new THREE.MeshBasicMaterial({map: loader.load('resources/img/flower-6.jpeg')}),
  ];

  const cubeTwo = new THREE.Mesh(boxGeometry, materials);
  cubeTwo.rotation.set(0.4, 0.2, 0);
  //Ajout forme à la scene
  scene.add(cubeTwo);
  


// Light
	const light = new THREE.DirectionalLight(0xFFFFFF,1.05)  // (color, intensity);
	light.position.set(-10, 15, 50);
	// Ajout lumière à la scene
	scene.add(light);


var time = 0;
function render() {
	time += 0.01; 
	requestAnimationFrame(render);
	cube.rotation.y += 0.01;
	cubeTwo.rotation.y += 0.01;
 	renderer.render(scene, camera);
}
render();