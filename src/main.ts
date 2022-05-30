import * as THREE from "three"
import * as dat from "dat.gui"
import {ParametricGeometry} from "three/examples/jsm/geometries/ParametricGeometry"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

// fix Z-axis up
THREE.Object3D.DefaultUp.set(0.0, 0.0, 1.0)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGL1Renderer()
const gui = new dat.GUI({autoPlace: false})
const guiFolder = gui.addFolder("Spherical Harmonics")
let orbitControls: OrbitControls
let quantumNumber = {
	azimuthal: 1,
	magnetic: 0,
	sign: 'positive'
}

function init() {
	// init renderer
	renderer.setClearColor(new THREE.Color(0x111111))
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
		let theta = Math.PI * u
		let phi = 2*Math.PI * v
		let r1 = Math.sqrt(3/(4*Math.PI)) * Math.cos(theta)
		let mag = quantumNumber.magnetic
		if (quantumNumber.sign === 'negative') {
			mag *= -1
		}
		r1 = sphericalHarmonics(quantumNumber.azimuthal ,mag ,theta, phi)
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
		let theta = Math.PI * u
		let phi = 2*Math.PI * v
		let r1 = Math.sqrt(3/(4*Math.PI)) * Math.cos(theta)
		let mag = quantumNumber.magnetic
		if (quantumNumber.sign === 'negative') {
			mag *= -1
		}
		r1 = sphericalHarmonics(quantumNumber.azimuthal ,mag ,theta, phi)
		let r2 = 0
		if (r1 < 0) {
			r2 = r1*r1	
		}
		let x = r2 * Math.sin(theta) * Math.cos(phi)
		let y = r2 * Math.sin(theta) * Math.sin(phi)
		let z = r2 * Math.cos(theta)

		target.set(x, y, z)
	}

	let geometryPositive = new ParametricGeometry(sphericalPositive, 120, 120)
	let materialPositive = new THREE.MeshLambertMaterial({color: 0xff0000})
	let meshPositive = new THREE.Mesh(geometryPositive, materialPositive)
	scene.add(meshPositive)

	let geometryNegative = new ParametricGeometry(sphericalNegative, 120, 120)
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
			scene.remove(meshPositive)
			geometryPositive = new ParametricGeometry(sphericalPositive, 120, 120)
			materialPositive = new THREE.MeshLambertMaterial({color: 0xff0000})
			meshPositive = new THREE.Mesh(geometryPositive, materialPositive)
			scene.add(meshPositive)
			scene.remove(meshNegative)
			geometryNegative = new ParametricGeometry(sphericalNegative, 120, 120)
			materialNegative = new THREE.MeshLambertMaterial({color: 0x00ff00})
			meshNegative = new THREE.Mesh(geometryNegative, materialNegative)
			scene.add(meshNegative)
		}
	)
	guiFolder.add(quantumNumber, "magnetic", 0, 10, 1).onFinishChange(
		function(){
			scene.remove(meshPositive)
			geometryPositive = new ParametricGeometry(sphericalPositive, 120, 120)
			materialPositive = new THREE.MeshLambertMaterial({color: 0xff0000})
			meshPositive = new THREE.Mesh(geometryPositive, materialPositive)
			scene.add(meshPositive)
			scene.remove(meshNegative)
			geometryNegative = new ParametricGeometry(sphericalNegative, 120, 120)
			materialNegative = new THREE.MeshLambertMaterial({color: 0x00ff00})
			meshNegative = new THREE.Mesh(geometryNegative, materialNegative)
			scene.add(meshNegative)
		}
	)
	guiFolder.add(quantumNumber, "sign", ['positive', 'negative']).onFinishChange(
		function(){
			scene.remove(meshPositive)
			geometryPositive = new ParametricGeometry(sphericalPositive, 120, 120)
			materialPositive = new THREE.MeshLambertMaterial({color: 0xff0000})
			meshPositive = new THREE.Mesh(geometryPositive, materialPositive)
			scene.add(meshPositive)
			scene.remove(meshNegative)
			geometryNegative = new ParametricGeometry(sphericalNegative, 120, 120)
			materialNegative = new THREE.MeshLambertMaterial({color: 0x00ff00})
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
	animate()
}

function animate() {
	orbitControls.update()

	// render using requestAnimationFrame
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}

function associatedLegendre(l:number ,m:number ,t:number): number {
	// check parameters
	if (!Number.isInteger(l) || l < 0) {
		throw Error("l shall be a positive integer")
	}
	if (!Number.isInteger(m)) {
		throw Error("m shall be an integer")
	}
	if (Math.abs(m) > l) {
		throw Error ("|m| shall be equal or smaller than l")
	}

	let val = 0.0
	let n: number = Math.floor((l-m)/2)
	if (l === 0) {
		val = 1.0
	}
	else {
		for (let j=0; j<=n; j++) {
			val += (-1)**j * factorial(2*l-2*j) / (factorial(j) * factorial(l-j) * factorial(l-2*j-m)) * t**(l-2*j-m)
		}
		val *= 1/(2**l) * (1-t*t)**(m/2)
	}
	return val
}

function sphericalHarmonics(l:number ,m:number ,theta:number, phi:number) :number {
	// check parameters
	if (!Number.isInteger(l) || l < 0) {
		throw Error("l shall be a positive integer")
	}
	if (!Number.isInteger(m)) {
		throw Error("m shall be an integer")
	}
	if (Math.abs(m) > l && m > 0) {
		m = l
	}
	if (Math.abs(m) > l && m < 0) {
		m = -l
	}
	let coeff:number = (-1)**((m+Math.abs(m))/2) * Math.sqrt((2*l+1)/(4*Math.PI)*factorial(l-Math.abs(m))/factorial(l+Math.abs(m)))
	let elevation:number = associatedLegendre(l ,Math.abs(m) ,Math.cos(theta))
	let azimuth:number
	if (m === 0) {
		azimuth = 1.0
	}
	else if(m > 0) {
		azimuth = Math.cos(m*phi)
	}
	else {
		azimuth = Math.sin(m*phi)
	}
	return coeff*elevation*azimuth
}

function factorial(num:number) : number {
	if (!Number.isInteger(num) || num < 0) {
		throw Error("num shall be a positive integer")
	}
	if (num === 0) {return 1}
	return num * factorial(num-1)
}

window.onload = init
window.addEventListener('resize', resize)
