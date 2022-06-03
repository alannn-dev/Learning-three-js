/* import {GUI} from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';
 */
// Create the scene
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	const scene = new THREE.Scene();   
	scene.background = new THREE.Color(0x333333);

	const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000 ); // ( 75 -> Degrés champ de vision, aspect-ratio -> window width / window height, 01, 1000 -> Espace devant la )
	camera.position.set(0, 50, 0);
	camera.up.set(0, 0, 1);
	camera.lookAt(0, 0, 0);



// An array of objects whose rotation to update
	const objects = [];
 
// Root -> Scene -> solarSystem -> sunMesh + earthMesh (sun + earth = childs of solarSystem)
	const solarSystem = new THREE.Object3D();
	scene.add(solarSystem);
	objects.push(solarSystem);

// Sun
	const radius = 1;
	const widthSegments = 6;
	const heightSegments = 6;
	const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
	const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
	const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
	sunMesh.scale.set(5, 5, 5);  // Make the sun large
	solarSystem.add(sunMesh);
	objects.push(sunMesh);

	// Earth orbit (Earth + moon)
	const earthOrbit = new THREE.Object3D();  //.Object3D() has no material or geometry here. It just represents a local space
	earthOrbit.position.x = 10;
	solarSystem.add(earthOrbit);
	objects.push(earthOrbit);

	const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
	const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
	// Add earthMesh as child of earthOrbit
	earthOrbit.add(earthMesh);
	objects.push(earthMesh);


	const moonOrbit = new THREE.Object3D();
	moonOrbit.position.x = 2;
	earthOrbit.add(moonOrbit);
	
	const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
	const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
	moonMesh.scale.set(.5, .5, .5);
	moonOrbit.add(moonMesh);
	objects.push(moonMesh);


// Light
	const light = new THREE.DirectionalLight(0xFFFFFF,3)  // (color, intensity);
	light.position.set(-10, 15, 150);
	// Add light to the scene
	scene.add(light);



  // GUI + Axes and grid helper

  // Turns both axes and grid visible on/off
// lil-gui requires a property that returns a bool
// to decide to make a checkbox so we make a setter
// and getter for `visible` which we can tell lil-gui
// to look at.

 class AxisGridHelper {
	constructor(node, units = 10) {
	  const axes = new THREE.AxesHelper();
	  axes.material.depthTest = false;
	  axes.renderOrder = 2;  // after the grid
	  node.add(axes);
   
	  const grid = new THREE.GridHelper(units, units);
	  grid.material.depthTest = false;
	  grid.renderOrder = 1;
	  node.add(grid);
   
	  this.grid = grid;
	  this.axes = axes;
	  this.visible = false;
	}
	get visible() {
	  return this._visible;
	}
	set visible(v) {
	  this._visible = v;
	  this.grid.visible = v;
	  this.axes.visible = v;
	}
  }
 
  const gui = new dat.GUI();
  function makeAxisGrid(node, label, units) {
	const helper = new AxisGridHelper(node, units);
	gui.add(helper, 'visible').name(label);
  }
   
  makeAxisGrid(solarSystem, 'solarSystem', 25);
  makeAxisGrid(sunMesh, 'sunMesh');
  makeAxisGrid(earthOrbit, 'earthOrbit');
  makeAxisGrid(earthMesh, 'earthMesh');
  makeAxisGrid(moonOrbit, 'moonOrbit');
  makeAxisGrid(moonMesh, 'moonMesh');


var time = 0;
function render() {
	time += 0.01; 
	requestAnimationFrame(render);
	objects.forEach((obj) => {
		obj.rotation.y = time;
	  });

	renderer.render(scene, camera);
}
render();