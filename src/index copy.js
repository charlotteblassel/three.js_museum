import './style/main.styl'
import * as THREE from 'three'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js'


// //
// * Sizes
// */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight




/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

// /
// * Scene
// */
const scene = new THREE.Scene()




// /
// * Camera
// */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 20)
camera.lookAt(scene.position)
camera.position.z = 8
scene.add(camera)

// move
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;


/**
 * Controls
 */
controls = new PointerLockControls( camera, document.body );
let prevTime = performance.now();
let velocity = new THREE.Vector3();
let clock = new THREE.Clock();
let direction = new  THREE.Vector3
controls.lock()
scene.add( controls.getObject() );

    /** Controls KeysDown*/
const onKeyDown =  ( _event ) => {
    if (_event.code === 'KeyW')
    {
        moveForward = true;
    }
    if (_event.code === 'KeyS')
    {
        moveBackward = true;
    }
    if (_event.code === 'KeyA')
    {
        moveLeft = true;
    }
    if (_event.code === 'KeyD')
    {
        moveRight = true;
    }
}
    /** Controls KeyUp*/
    const onKeyUp = ( _event ) =>{
    if (_event.code === 'KeyW')
    {
        moveForward = false;
    }
    if (_event.code === 'KeyS')
    {
        moveBackward = false;
    }
    if (_event.code === 'KeyA')
    {
        moveLeft = false;
    }
    if (_event.code === 'KeyD')
    {
        moveRight = false;
    }
}

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );

// /
// * Object
// */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x0096ff })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// const geometry2 = new THREE.PlaneGeometry(1,1,1)
// const material2 = new THREE.MeshBasicMaterial({ color: 0x0096ff })
// const planeMesh = new THREE.Mesh(geometry2, material2)
// scene.add(planeMesh)


// /
// * Renderer
// */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)


// /
// * Controll Camera
// */
var controls = new PointerLockControls( camera, document.body );
scene.add( controls.getObject() );


// /
// * Resize
// */
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

// /
// * Loop
// */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    /**
     *  Get the the preformance time to creat a velocity
    */
    const time = performance.now();
    const delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 30.0 * delta;
    velocity.z -= velocity.z * 30.0 * delta;

    /**
     *   Creat a variable to have the axe of direction  exp : if direction x === -1 the locker go left
    */
    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize()

    /**
     *   Applicate the velocity for direction
    */
    if ( moveForward || moveBackward )
    {
        velocity.z -= direction.z * 100.0 * delta;
    }
    if ( moveLeft || moveRight )
    {
        velocity.x -= direction.x * 100.0 * delta;
    }

    /**
     *  Aplicate the controls and velocity together
    */
    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );
    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );

    prevTime = time;

    renderer.render( scene, camera );
    // Render
   
}
loop()