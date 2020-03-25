import './style/main.styl'
import * as THREE from 'three'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js'
import Walls from './scripts/Walls.js'
import Doors from './scripts/Doors.js'
import Grounds from './scripts/Grounds.js'
import Tambourin from './scripts/TambourinTry.js'
import Guitar from './scripts/Guitar.js'
import Bell from './scripts/Bell.js'
import Piano from './scripts/Piano.js'
import Xylophone from './scripts/Xylophone'
import Bassviolin from './scripts/Bassviolin.js'



import trySounds from "../static/sounds/quack-sound-effect.mp3"

/**
 * Sizes+
 */
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

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 99999)
camera.lookAt(scene.position)
camera.position.z = 8
camera.position.y = 1
scene.add(camera)

// move
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

/**
 * Controls
 */
controls = new PointerLockControls(camera, document.body)
let prevTime = performance.now()
let velocity = new THREE.Vector3()
let clock = new THREE.Clock()
let direction = new  THREE.Vector3
controls.unlock()
scene.add(controls.getObject())

// Controls KeysDown
const onKeyDown = ( _event ) => {
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

// Controls KeyUp
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
       if (_event.key === ' '  || _event.code === 'space')
    {
        camera.position.y += 3
    }
    if (_event.key === 'Control' ||  _event.code === 'ControlLeft')
    {
        camera.position.y -= 3
    }
}


document.addEventListener('keydown', onKeyDown)
document.addEventListener('keyup', onKeyUp)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// const moonLight = new THREE.DirectionalLight(0x0096ff, 1)
// moonLight.position.set(1, 1, 1)
// scene.add(moonLight)

const doorLight = new THREE.PointLight(0xffd800, 2, 5)
doorLight.position.y = 2.2
doorLight.position.x = - 2.7
scene.add(doorLight)

// const ghostLightA = new THREE.PointLight(0xea00ff, 3, 5)
// ghostLightA.position.z = 5
// ghostLightA.position.y = 1
// scene.add(ghostLightA)

const ghostLightB = new THREE.PointLight(0x00d8ff, 3, 5)
ghostLightB.position.x = 5
ghostLightB.position.y = 1
scene.add(ghostLightB)

const ghostLightC = new THREE.PointLight(0xd8ff00, 3, 5)
ghostLightC.position.z = - 5
ghostLightC.position.y = 1
scene.add(ghostLightC)

/**
 * Museum
 */
const museumGroup = new THREE.Group()
scene.add(museumGroup)

// Grounds
const outsideGround = new Grounds(30, 30, 0, 0, 0, Math.PI * -0.5, 0)
museumGroup.add(outsideGround.group)

// Doors
const leftDoor = new Doors(1, 2, 0.1, -0.5, 1, 3)
museumGroup.add(leftDoor.group)

// Walls

    // Front
const frontLeftWall = new Walls(2, 2, 0.1, -2, 1, 3, 0)
museumGroup.add(frontLeftWall.group)
const frontRightWall = new Walls(2, 2, 0.1, 2, 1, 3, 0)
museumGroup.add(frontRightWall.group)
const frontLeftWallTwo = new Walls(2, 2, 0.1, -3.9, 1, 1, 0)
museumGroup.add(frontLeftWallTwo.group)
const frontRightWallTwo = new Walls(2, 2, 0.1, 3.9, 1, 1, 0)
museumGroup.add(frontRightWallTwo.group)
const frontLeftWallThree = new Walls(2, 2, 0.1, -5.9, 1, -0.9, 0)
museumGroup.add(frontLeftWallThree.group)
const frontRightWallThree = new Walls(2, 2, 0.1, 5.9, 1, -0.9, 0)
museumGroup.add(frontRightWallThree.group)
const frontLeftWallFour = new Walls(2, 2, 0.1, -5.9, 1, -4.80, 0)
museumGroup.add(frontLeftWallFour.group)
const frontRightWallFour = new Walls(2, 2, 0.1, 5.9, 1, -4.80, 0)
museumGroup.add(frontRightWallFour.group)
const frontLeftWallFive = new Walls(2, 2, 0.1, -5.9, 1, -8.80, 0)
museumGroup.add(frontLeftWallFive.group)
const frontRightWallFive = new Walls(2, 2, 0.1, 5.9, 1, -8.80, 0)
museumGroup.add(frontRightWallFive.group)
const frontLeftWallSix = new Walls(2, 2, 0.1, -5.9, 1, -12.80, 0)
museumGroup.add(frontLeftWallSix.group)
const frontRightWallSix = new Walls(2, 2, 0.1, 5.9, 1, -12.80, 0)
museumGroup.add(frontRightWallSix.group)

    // Back
const backWall = new Walls(2, 2, 0.1, -3.9, 1, -12.80, 0)
museumGroup.add(backWall.group)
const backWallTwo = new Walls(2, 2, 0.1, -1.9, 1, -12.80, 0)
museumGroup.add(backWallTwo.group)
const backWallThree = new Walls(2, 2, 0.1, 1.9, 1, -12.80, 0)
museumGroup.add(backWallThree.group)
const backWallFour = new Walls(2, 2, 0.1, 3.9, 1, -12.80, 0)
museumGroup.add(backWallFour.group)
const backWallFive = new Walls(2, 2, 0.1, 0, 1, -12.80, 0)
museumGroup.add(backWallFive.group)
// const upFrontWall = new Walls(6, 2, 0.1, 0, 3, 3, 0)
// museumGroup.add(upFrontWall.group)

    // Side
const sideRightWall = new Walls(2, 2, 0.1, 2.95, 1, 2, Math.PI * 0.5)
museumGroup.add(sideRightWall.group)
const sideLeftWall = new Walls(2, 2, 0.1, -2.95, 1, 2, Math.PI * 0.5)
museumGroup.add(sideLeftWall.group)
const sideRightWallTwo = new Walls(2, 2, 0.1, 4.85, 1, 0.05, Math.PI * 0.5)
museumGroup.add(sideRightWallTwo.group)
const sideLeftWallTwo = new Walls(2, 2, 0.1, -4.85, 1, 0.05, Math.PI * 0.5)
museumGroup.add(sideLeftWallTwo.group)
const sideRightWallThree = new Walls(2, 2, 0.1, 6.85, 1, -1.85, Math.PI * 0.5)
museumGroup.add(sideRightWallThree.group)
const sideLeftWallThree = new Walls(2, 2, 0.1, -6.85, 1, -1.85, Math.PI * 0.5)
museumGroup.add(sideLeftWallThree.group)
const sideRightWallFour = new Walls(2, 2, 0.1, 6.85, 1, -3.85, Math.PI * 0.5)
museumGroup.add(sideRightWallFour.group)
const sideLeftWallFour = new Walls(2, 2, 0.1, -6.85, 1, -3.85, Math.PI * 0.5)
museumGroup.add(sideLeftWallFour.group)
const sideRightWallFive = new Walls(2, 2, 0.1, 4.85, 1, -5.75, Math.PI * 0.5)
museumGroup.add(sideRightWallFive.group)
const sideLeftWallFive = new Walls(2, 2, 0.1, -4.9, 1, -5.75, Math.PI * 0.5)
museumGroup.add(sideLeftWallFive.group)
const sideRightWallSix = new Walls(2, 2, 0.1, 4.85, 1, -7.75, Math.PI * 0.5)
museumGroup.add(sideRightWallSix.group)
const sideLeftWallSix = new Walls(2, 2, 0.1, -4.85, 1, -7.75, Math.PI * 0.5)
museumGroup.add(sideLeftWallSix.group)
const sideRightWallSeven = new Walls(2, 2, 0.1, 6.85, 1, -9.75, Math.PI * 0.5)
museumGroup.add(sideRightWallSeven.group)
const sideLeftWallSeven = new Walls(2, 2, 0.1, -6.85, 1, -9.75, Math.PI * 0.5)
museumGroup.add(sideLeftWallSeven.group)
const sideRightWallHeight = new Walls(2, 2, 0.1, 6.85, 1, -11.75, Math.PI * 0.5)
museumGroup.add(sideRightWallHeight.group)
const sideLeftWallHeight = new Walls(2, 2, 0.1, -6.85, 1, -11.75, Math.PI * 0.5)
museumGroup.add(sideLeftWallHeight.group)


/**
 * Music instrument
 */


const tambourin = new Tambourin()
tambourin.group.position.y = 3
scene.add(tambourin.group)


const guitar = new Guitar()
scene.add(guitar.group)

const bell = new Bell()
scene.add(bell.group)

const piano = new Piano()
scene.add(piano.group)

const xylophone = new Xylophone()
scene.add(xylophone.group)


const bassviolin = new Bassviolin()
scene.add(bassviolin.group)

/**
 * Sound
 */




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

/**
 * Camera Controll
 */
let controls = new PointerLockControls(camera, document.body)
scene.add(controls.getObject())

/**
 * Resize
 */
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

document.body.addEventListener( 'keydown', (_e) => {
    if(_e.key === ' ')
    {
        controls.lock()
        blocker.style.display = 'none';
    }
},)


/**
 * Loop
 */
const loop = () =>
{
    window.requestAnimationFrame(loop)

    /**
     *  Get the the preformance time to creat a velocity
    */
    const time = performance.now();
    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 20.0 * delta;
    velocity.z -= velocity.z * 20.0 * delta;

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
    controls.moveRight( - velocity.x * delta);
    controls.moveForward( - velocity.z * delta);

    prevTime = time;

    if(camera.position.x > 5){

    }

    // Render
    renderer.render(scene, camera)
}
loop()
