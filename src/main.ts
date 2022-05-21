import * as THREE from "three"

function init() {
	let scene = new THREE.Scene()
	let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
	
	let renderer = new THREE.WebGL1Renderer()
	renderer.setClearColor(new THREE.Color(0xEEEEEE))
	renderer.setSize(window.innerWidth, window.innerHeight)

	let axes = new THREE.AxesHelper(20)
	scene.add(axes)

	// create the ground plane
	let planeGeometry = new THREE.PlaneGeometry(60, 20)
	let planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc})
	let plane = new THREE.Mesh(planeGeometry, planeMaterial)
	plane.rotation.x = -0.5 * Math.PI
	plane.position.x = 15.0
	plane.position.y = 0.0
	plane.position.z = 0.0
	scene.add(plane)

	// create a sphere
	let sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
    let sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true})
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
	sphere.position.x = 20.0
	sphere.position.y = 4.0
	sphere.position.z = 2.0
	scene.add(sphere)

	camera.position.x = -30.0
	camera.position.y = 40.0
	camera.position.z = 30.0
    camera.lookAt(scene.position)

	// add the output of the renderer to the html element
	let element = document.getElementById("WebGL-output")
	if (element !== null) {
		element.appendChild(renderer.domElement)
	}
	
	// render the scene
	renderer.render(scene, camera)
}
window.onload = init
