import * as THREE from "three"
import * as dat from "dat.gui"
import { sphericalHarmonics } from "./spherical_harmonics"
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// fix Z-axis up
THREE.Object3D.DefaultUp.set(0.0, 0.0, 1.0)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGL1Renderer()
const gui = new dat.GUI({autoPlace: false, width: 300})
gui.domElement.id = 'gui'
const guiFolder = gui.addFolder("Spherical Harmonics")
let orbitControls: OrbitControls
let quantumNumber = {
	azimuthal: 1,
	magnetic: 0,
	sign: 'positive'
}

function init() {
	// init renderer
	renderer.setClearColor(new THREE.Color(0x010101))
	renderer.setSize(window.innerWidth*0.99, window.innerHeight*0.99)

	// X axis: red, Y axis: green, Z axis: blue
	let axes = new THREE.AxesHelper(0.5)
	scene.add(axes)

	camera.position.x = 0.7
	camera.position.y = 0.7
	camera.position.z = 0.7
    camera.lookAt(scene.position)

	// ambient lighting
	let ambientLight = new THREE.AmbientLight(0x505050);
	scene.add(ambientLight);

	// spotlight for the shadows
	let spotLight = new THREE.SpotLight(0xFFFFFF);
	spotLight.position.set(-30, 60, 60);
	spotLight.castShadow = true;
	scene.add(spotLight);

	orbitControls = new OrbitControls(camera, renderer.domElement)
	orbitControls.autoRotate = true
	
	// create parametric geometry
	let sphericalPositive = function(u:number, v:number, target:THREE.Vector3): void {
		let theta = Math.PI * u + 2*Math.PI
		let phi = 2*Math.PI * v
		let mag = quantumNumber.magnetic
		if (quantumNumber.sign === "negative") {
			mag *= -1
		}
		let r1 = sphericalHarmonics(quantumNumber.azimuthal, mag, theta, phi)
		let r2 = 0
		if (r1 > 0) {
			r2 = r1*r1
		}
		let x = r2 * Math.sin(theta) * Math.cos(phi)
		let y = r2 * Math.sin(theta) * Math.sin(phi)
		let z = r2 * Math.cos(theta)

		target.set(x, y, z)
	}

	let sphericalNegative = function(u:number, v:number, target:THREE.Vector3): void {
		let theta = Math.PI * u + 2*Math.PI
		let phi = 2*Math.PI * v
		let mag = quantumNumber.magnetic
		if (quantumNumber.sign === "negative") {
			mag *= -1
		}
		let r1 = sphericalHarmonics(quantumNumber.azimuthal, mag, theta, phi)
		let r2 = 0
		if (r1 < 0) {
			r2 = r1*r1
		}
		let x = r2 * Math.sin(theta) * Math.cos(phi)
		let y = r2 * Math.sin(theta) * Math.sin(phi)
		let z = r2 * Math.cos(theta)

		target.set(x, y, z)
	}

	let slice = 40+quantumNumber.azimuthal*15
	let stack = 40+quantumNumber.magnetic*15

	let geometryPositive = new ParametricGeometry(sphericalPositive, slice, stack)
	let materialPositive = new THREE.MeshLambertMaterial({color: 0xff0000})
	let meshPositive = new THREE.Mesh(geometryPositive, materialPositive)
	scene.add(meshPositive)

	let geometryNegative = new ParametricGeometry(sphericalNegative, slice, stack)
	let materialNegative = new THREE.MeshLambertMaterial({color: 0x00ff00})
	let meshNegative = new THREE.Mesh(geometryNegative, materialNegative)
	scene.add(meshNegative)

	// add the output of the renderer to the html element
	let element = document.getElementById("WebGL-output")
	if (element !== null) {
		element.appendChild(renderer.domElement)
	}

	// GUI action
	let customContainer = document.getElementById('gui-container')
	if (customContainer !== null) {
		customContainer.appendChild(gui.domElement)
	}
	guiFolder.add(quantumNumber, "azimuthal", 0, 10, 1).onFinishChange(
		function(){
			slice = 40+quantumNumber.azimuthal*15
			scene.remove(meshPositive)
			geometryPositive = new ParametricGeometry(sphericalPositive, slice, stack)
			meshPositive = new THREE.Mesh(geometryPositive, materialPositive)
			scene.add(meshPositive)
			scene.remove(meshNegative)
			geometryNegative = new ParametricGeometry(sphericalNegative, slice, stack)
			meshNegative = new THREE.Mesh(geometryNegative, materialNegative)
			scene.add(meshNegative)
		}
	)
	guiFolder.add(quantumNumber, "magnetic", 0, 10, 1).onFinishChange(
		function(){
			stack = 40+quantumNumber.magnetic*15
			scene.remove(meshPositive)
			geometryPositive = new ParametricGeometry(sphericalPositive, slice, stack)
			meshPositive = new THREE.Mesh(geometryPositive, materialPositive)
			scene.add(meshPositive)
			scene.remove(meshNegative)
			geometryNegative = new ParametricGeometry(sphericalNegative, slice, stack)
			meshNegative = new THREE.Mesh(geometryNegative, materialNegative)
			scene.add(meshNegative)
		}
	)
	guiFolder.add(quantumNumber, "sign", ['positive', 'negative']).onFinishChange(
		function(){
			scene.remove(meshPositive)
			geometryPositive = new ParametricGeometry(sphericalPositive, slice, stack)
			meshPositive = new THREE.Mesh(geometryPositive, materialPositive)
			scene.add(meshPositive)
			scene.remove(meshNegative)
			geometryNegative = new ParametricGeometry(sphericalNegative, slice, stack)
			meshNegative = new THREE.Mesh(geometryNegative, materialNegative)
			scene.add(meshNegative)
		}
	)
	guiFolder.open()

	// render the scene
	// renderer.render(scene, camera)
	animate()
}

function resize() {
	renderer.setSize(window.innerWidth*0.99, window.innerHeight*0.99)
}

function animate() {
	orbitControls.update()

	// render using requestAnimationFrame
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}

window.onload = init
window.addEventListener('resize', resize)
