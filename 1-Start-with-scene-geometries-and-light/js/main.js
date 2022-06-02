// Creating the scene

	// Renderer
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// Scene
	const scene = new THREE.Scene();   

	// Camera
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // ( 75 -> Degrés champ de vision, aspect-ratio -> window width / window height, 01, 1000 -> Espace devant la )
	camera.position.z = 50;


// Geometries
	const boxGeometry = new THREE.BoxGeometry(10, 10, 10); // Geometry 
	const basicMaterial = new THREE.MeshBasicMaterial({color: 0x0095DD}); // Material
	const cube = new THREE.Mesh(boxGeometry, basicMaterial); 
	cube.position.x = -25;
	cube.rotation.set(0.4, 0.2, 0);
	//Add shape to the scene
	scene.add(cube);

	const torusGeometry = new THREE.TorusGeometry(7, 1, 6, 12);
	const phongMaterial = new THREE.MeshPhongMaterial({color: 0xFF9500});
	const torus = new THREE.Mesh(torusGeometry, phongMaterial);
	scene.add(torus);

	const rightGeometry = new THREE.DodecahedronGeometry(7);
	const lambertMaterial = new THREE.MeshLambertMaterial({color: 0xEAEFF2});
	const dodecahedron = new THREE.Mesh(rightGeometry, lambertMaterial);
	dodecahedron.position.x = 25;
	scene.add(dodecahedron);


// Light
	/* const light = new THREE.PointLight(0xFFFFFF);*/
	const light = new THREE.DirectionalLight(0xFFFFFF,1.05)  // (color, intensity);
	light.position.set(-10, 15, 50);
	// Add light to the scene 
	scene.add(light);


var time = 0;
function render() {
	time += 0.01; 
	requestAnimationFrame(render);
	cube.rotation.y += 0.01;
	torus.scale.y = Math.abs(Math.sin(time));
	dodecahedron.position.y = -7*Math.sin(time*2);
	renderer.render(scene, camera);
}
render();