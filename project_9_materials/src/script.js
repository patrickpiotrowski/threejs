import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

// Debug

const gui = new dat.GUI()

THREE.ColorManagement.enabled = false

// Textures
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg', // positive x
    '/textures/environmentMaps/0/nx.jpg', // negative x
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
/*
const material = new THREE.MeshBasicMaterial({
    map: colorTexture,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
    alphaMap: alphaTexture,
    side: THREE.DoubleSide,
    color: 'pink'
})
material.color = new THREE.Color(0x00ff00)
*/

/*
const material = new THREE.MeshNormalMaterial({
    //flatShading: true,
})
*/

/*
const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
})
*/

// const material = new THREE.MeshDepthMaterial({})

//const material = new THREE.MeshLambertMaterial()

/*
const material = new THREE.MeshPhongMaterial({
    shininess: 1000,
    specular: new THREE.Color(0x1188ff)
})
*/

/*
const material = new THREE.MeshToonMaterial({
    gradientMap: gradientTexture
})
*/

// const material = new THREE.MeshStandardMaterial({
//     //metalness: 0.45,
//     map: colorTexture,
//     aoMap: ambientOclusionTexture,
//     aoMapIntensity: 1,
//     displacementMap: heightTexture,
//     displacementScale: 0.05,
//     metalnessMap: metalnessTexture,
//     roughnessMap: roughnessTexture,
//     normalMap: normalTexture,
//     normalScale: new THREE.Vector2(0.5, 0.5),
//     transparent: true,
//     alphaMap: alphaTexture
// })

const material = new THREE.MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.2,
    envMap: environmentMapTexture
})

gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)

torus.position.x = 1.5

scene.add(sphere, plane, torus)

// Lights

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3 , 4)
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    const xSpeed = 0.15 * elapsedTime
    const ySpeed = 0.1 * elapsedTime

    sphere.rotation.set(xSpeed, ySpeed, 0)
    plane.rotation.set(xSpeed, ySpeed, 0)
    torus.rotation.set(xSpeed, ySpeed, 0)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()