// Créer la scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();   
scene.background = new THREE.Color(0x333333);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000 ); // ( 75 -> Degrés champ de vision, aspect-ratio -> window width / window height, 01, 1000 -> Espace devant la )
camera.position.z = 120;



const boxGeometry = new THREE.BoxGeometry(20, 20, 20); // Cube 

const cubes = [];

// TEXTURE DOWNLOADS 

	// -> THE SIMPLEST WAY (One texture):

			/* const loader = new THREE.TextureLoader();
			const material = new THREE.MeshBasicMaterial({
			map: loader.load('resources/img/wall.jpeg'),
			});

			const cube = new THREE.Mesh(boxGeometry, material);
			cube.rotation.set(0.4, 0.2, 0);
			cube.position.x = -50;
			scene.add(cube);
			cubes.push(cube); */


	// -> WAITING FOR A TEXTURE TO LOAD :

			
			const loader = new THREE.TextureLoader();
			loader.load('resources/img/wall.jpeg', (texture) => {
				const material = new THREE.MeshBasicMaterial({
					map: texture,
				});
				const cube = new THREE.Mesh(boxGeometry, material);
				cube.position.x = -50;
				scene.add(cube);
				cubes.push(cube);  // add to our list of cubes to rotate
			});



	// -> ADD MULTIPLE TEXTURES : 

		/* 	const loadManager = new THREE.LoadingManager();
			const flowerLoader = new THREE.TextureLoader();

			const materials = [
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-1.jpeg')}),
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-2.jpeg')}),
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-3.jpeg')}),
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-4.jpeg')}),
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-5.jpeg')}),
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-6.jpeg')}),
			];

			const cubeTwo = new THREE.Mesh(boxGeometry, materials);
			cubeTwo.rotation.set(0.4, 0.2, 0);
			//Ajout forme à la scene
			scene.add(cubeTwo);
			cubes.push(cubeTwo); */



// -> WAITING FOR MULTIPLE TEXTURES TO LOAD :

/* 			const boxGeometry = new THREE.BoxGeometry(20, 20, 20); */			
			const loadManager = new THREE.LoadingManager();
			const flowerLoader = new THREE.TextureLoader(loadManager);
			
			const materials = [
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-1.jpeg')}),
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-2.jpeg')}),
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-3.jpeg')}),
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-4.jpeg')}),
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-5.jpeg')}),
				new THREE.MeshBasicMaterial({map: flowerLoader.load('resources/img/flower-6.jpeg')}),
			];
			
			const loadingElem = document.querySelector('#loading');
			const progressBarElem = loadingElem.querySelector('.progressbar');

		// ADD LOADING BAR
			loadManager.onLoad = () => {
				loadingElem.style.display = 'none';
				const cubeTwo = new THREE.Mesh(boxGeometry, materials);
				scene.add(cubeTwo);
				cubes.push(cubeTwo);  
			};

			loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
				const progress = itemsLoaded / itemsTotal;
				progressBarElem.style.transform = `scaleX(${progress})`;
			};

		
/* 			const boxGeometry = new THREE.BoxGeometry(20, 20, 20); */
			const loaderThree = new THREE.TextureLoader();
			loaderThree.load('resources/img/mip-low-res-enlarged.png', (texture) => {
				const material = new THREE.MeshBasicMaterial({
					map: texture,
				});
				const cube = new THREE.Mesh(boxGeometry, material);
				cube.position.x = 50;
				scene.add(cube);
				cubes.push(cube);  
			});

			
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