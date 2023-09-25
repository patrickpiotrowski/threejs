import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl') // getting canvas from the dom

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(geometry, material)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2), 
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5), 
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
group.add(cube1, cube2, cube3)

cube2.position.x = -3
cube3.position.x = 1.5

// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// Rotation
//mesh.rotation.reorder('YXZ') // reorder so YXZ is the sequence of update
//mesh.rotation.set(0, Math.PI, 0) // Math.PI rotates 180 degrees


// Axes helper
const axesHelper = new THREE.AxesHelper(3) // length of the axis
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) // fov, aspect ratio (width/height)
camera.position.set(1, 1, 4) // x, y, z
scene.add(camera)

//camera.lookAt(mesh.position)
camera.lookAt(new THREE.Vector3(0, 0, 0))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)