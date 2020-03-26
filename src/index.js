import './style/main.styl'
import * as THREE from 'three'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js'
import Walls from './scripts/Walls.js'
import Doors from './scripts/Doors.js'
import Grass from './scripts/Grass.js'
import Floor from './scripts/Floor.js'
import Ceilling from './scripts/Ceilling.js'
import Bases from './scripts/Base.js'
import Roof from './scripts/Roof.js'
import Tambourin from "./scripts/Tambourin.js"
import Guitar from "./scripts/Guitar.js"
import Bell from './scripts/Bell.js'
import Piano from './scripts/Piano.js'
import Xylophone from './scripts/Xylophone.js'
import Bassviolin from './scripts/Bassviolin.js'
import Sky from "./assets/sky.jpg"

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const skyBackground = textureLoader.load(Sky)

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
scene.background = skyBackground

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 99999)
camera.lookAt(scene.position)
camera.position.z = 10
camera.position.y = 1.8
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
let direction = new  THREE.Vector3()
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

/**
 * Museum
 */
const museumGroup = new THREE.Group()
scene.add(museumGroup)

// Grounds
/* Grass */
const grass = new Grass(60, 60, 0, 0, -15, Math.PI / -2, 0)
museumGroup.add(grass.group)

/* Floor */
const instrumentFloorOne = new Floor(6, 6, -9.85, 0.001, -15, Math.PI / -2, 0)
museumGroup.add(instrumentFloorOne.group)
const instrumentFloorTwo = new Floor(6, 6, 9.85, 0.001, -15, Math.PI / -2, 0)
museumGroup.add(instrumentFloorTwo.group)
const instrumentFloorThree = new Floor(6, 6, -9.85, 0.001, -27, Math.PI / -2, 0)
museumGroup.add(instrumentFloorThree.group)
const instrumentFloorFour = new Floor(6, 6, 9.85, 0.001, -27, Math.PI / -2, 0)
museumGroup.add(instrumentFloorFour.group)
const instrumentFloorFive = new Floor(7.72, 7.72, 0, 0.001, -35.125, Math.PI / -2, 0)
museumGroup.add(instrumentFloorFive.group)
const centralFloor = new Floor(13.7, 33, 0, 0.01, -16.5, Math.PI / -2, 0)
museumGroup.add(centralFloor.group)

/* Ceilling */
const instrumentCeillingOne = new Ceilling(6, 6, -9.85, 5.7, -15, Math.PI / -2, 0)
museumGroup.add(instrumentCeillingOne.group)
const instrumentCeillingTwo = new Ceilling(6, 6, 9.85, 5.7, -15, Math.PI / -2, 0)
museumGroup.add(instrumentCeillingTwo.group)
const instrumentCeillingThree = new Ceilling(6, 6, -9.85, 5.7, -27, Math.PI / -2, 0)
museumGroup.add(instrumentCeillingThree.group)
const instrumentCeillingFour = new Ceilling(6, 6, 9.85, 5.7, -27, Math.PI / -2, 0)
museumGroup.add(instrumentCeillingFour.group)
const instrumentCeillingFive = new Ceilling(7.72, 7.72, 0, 5.7, -35.125, Math.PI / -2, 0)
museumGroup.add(instrumentCeillingFive.group)
const centralCeilling = new Ceilling(13.7, 33, 0, 5.7, -16.5, Math.PI / -2, 0)
museumGroup.add(centralCeilling.group)

// Roof
const instrumentRoofOne = new Roof(6, 3, 4, -9.85, 7.21, -15, Math.PI / -4)
museumGroup.add(instrumentRoofOne.group)
const instrumentRoofTwo = new Roof(6, 3, 4, 9.85, 7.21, -15, Math.PI / -4)
museumGroup.add(instrumentRoofTwo.group)
const instrumentRoofThree = new Roof(6, 3, 4, -9.85, 7.21, -27, Math.PI / -4)
museumGroup.add(instrumentRoofThree.group)
const instrumentRoofFour = new Roof(6, 3, 4, 9.85, 7.21, -27, Math.PI / -4)
museumGroup.add(instrumentRoofFour.group)
const instrumentRoofFive = new Roof(6, 3, 4, 0, 7.21, -36, Math.PI / -4)
museumGroup.add(instrumentRoofFive.group)
const centralRoofOne = new Roof(12, 4.5, 4, 0, 7.961, -6.9, Math.PI / -4)
museumGroup.add(centralRoofOne.group)
const centralRoofTwo = new Roof(12, 4.5, 4, 0, 7.961, -26.2, Math.PI / -4)
museumGroup.add(centralRoofTwo.group)
const centralRoofThree = new Roof(12, 4.5, 4, 0, 7.962, -16.55, Math.PI / -4)
museumGroup.add(centralRoofThree.group)

// Base
const baseOne = new Bases(2, 2, 1, 32, -9.8, 0, -15)
museumGroup.add(baseOne.group)
const baseTwo = new Bases(2, 2, 1, 32, 9.8, 0, -15)
museumGroup.add(baseTwo.group)
const baseThree = new Bases(2, 2, 1, 32, -9.8, 0, -27)
museumGroup.add(baseThree.group)
const baseFour = new Bases(2, 2, 1, 32, 9.8, 0, -27)
museumGroup.add(baseFour.group)
const baseFive = new Bases(2, 2, 1, 32, 0, 0, -36)
museumGroup.add(baseFive.group)

// Doors
const door = new Doors(3, 3, 0, 1.35, 0, 0)
museumGroup.add(door.group)

// Walls
const backWall = new Walls(3, 0, 1.2, -39.001, 0, 0)
museumGroup.add(backWall.group)
const upBackWall = new Walls(3, 0, 4.2, -39.001, 0, 0)
museumGroup.add(upBackWall.group)
const upFrontWall = new Walls(3, 0, 4.2, 0.001, 0, 0)
museumGroup.add(upFrontWall.group)

/* Left side */
const leftWallOne = new Walls(3, -2.35, 1.2, 0, 0, 0)
museumGroup.add(leftWallOne.group)
const leftWallTwo = new Walls(3, -5.35, 1.2, 0, 0, 0)
museumGroup.add(leftWallTwo.group)
const leftWallThree = new Walls(3, -6.85, 1.2, -1.5, 0,  Math.PI / -2)
museumGroup.add(leftWallThree.group)
const leftWallFour = new Walls(3, -6.85, 1.2, -4.5, 0, Math.PI / -2)
museumGroup.add(leftWallFour.group)
const leftWallFive = new Walls(3, -6.85, 1.2, -7.5, 0, Math.PI / -2)
museumGroup.add(leftWallFive.group)
const leftWallSix = new Walls(3, -6.85, 1.2, -10.5, 0, Math.PI / -2)
museumGroup.add(leftWallSix.group)
const leftWallSeven = new Walls(3, -8.35, 1.2, -12, 0, 0)
museumGroup.add(leftWallSeven.group)
const leftWallEight = new Walls(3, -11.35, 1.2, -12, 0, 0)
museumGroup.add(leftWallEight.group)
const leftWallNine = new Walls(3, -12.85, 1.2, -13.5, 0, Math.PI / -2)
museumGroup.add(leftWallNine.group)
const leftWallTen = new Walls(3, -12.85, 1.2, -16.5, 0, Math.PI / -2)
museumGroup.add(leftWallTen.group)
const leftWallEleven = new Walls(3, -8.35, 1.2, -18, 0, 0)
museumGroup.add(leftWallEleven.group)
const leftWallTwelve = new Walls(3, -11.35, 1.2, -18, 0, 0)
museumGroup.add(leftWallTwelve.group)
const leftWallThirteen = new Walls(3, -6.85, 1.2, -19.5, 0, Math.PI / -2)
museumGroup.add(leftWallThirteen.group)
const leftWallFourteen = new Walls(3, -6.85, 1.2, -22.5, 0, Math.PI / -2)
museumGroup.add(leftWallFourteen.group)
const leftWallFifteen = new Walls(3, -8.35, 1.2, -24, 0, 0)
museumGroup.add(leftWallFifteen.group)
const leftWallSixteen = new Walls(3, -11.35, 1.2, -24, 0, 0)
museumGroup.add(leftWallSixteen.group)
const leftWallSeventeen = new Walls(3, -12.85, 1.2, -25.5, 0, Math.PI / -2)
museumGroup.add(leftWallSeventeen.group)
const leftWallEighteen = new Walls(3, -12.85, 1.2, -28.5, 0, Math.PI / -2)
museumGroup.add(leftWallEighteen.group)
const leftWallNineteen = new Walls(3, -8.35, 1.2, -30, 0, 0)
museumGroup.add(leftWallNineteen.group)
const leftWallTwenty = new Walls(3, -11.35, 1.2, -30, 0, 0)
museumGroup.add(leftWallTwenty.group)
const leftWallTwentyOne = new Walls(3, -6.85, 1.2, -31.5, 0, Math.PI / - 2)
museumGroup.add(leftWallTwentyOne.group)
const leftWallTwentyTwo = new Walls(3, -5.35, 1.2, -33, 0, 0)
museumGroup.add(leftWallTwentyTwo.group)
const leftWallTwentyThree = new Walls(3, -3.85, 1.2, -34.5, 0, Math.PI / -2)
museumGroup.add(leftWallTwentyThree.group)
const leftWallTwentyFour = new Walls(3, -3.85, 1.2, -37.5, 0, Math.PI / -2)
museumGroup.add(leftWallTwentyFour.group)
const leftWallTwentyFive = new Walls(3, -2.35, 1.2, -39, 0, 0)
museumGroup.add(leftWallTwentyFive.group)

/* Right side */
const rightWallOne = new Walls(3, 2.35, 1.2, 0, 0, 0)
museumGroup.add(rightWallOne.group)
const rightWallTwo = new Walls(3, 5.35, 1.2, 0, 0, 0)
museumGroup.add(rightWallTwo.group)
const rightWallThree = new Walls(3, 6.85, 1.2, -1.5, 0,  Math.PI / -2)
museumGroup.add(rightWallThree.group)
const rightWallFour = new Walls(3, 6.85, 1.2, -4.5, 0, Math.PI / -2)
museumGroup.add(rightWallFour.group)
const rightWallFive = new Walls(3, 6.85, 1.2, -7.5, 0, Math.PI / -2)
museumGroup.add(rightWallFive.group)
const rightWallSix = new Walls(3, 6.85, 1.2, -10.5, 0, Math.PI / -2)
museumGroup.add(rightWallSix.group)
const rightWallSeven = new Walls(3, 8.35, 1.2, -12, 0, 0)
museumGroup.add(rightWallSeven.group)
const rightWallEight = new Walls(3, 11.35, 1.2, -12, 0, 0)
museumGroup.add(rightWallEight.group)
const rightWallNine = new Walls(3, 12.85, 1.2, -13.5, 0, Math.PI / -2)
museumGroup.add(rightWallNine.group)
const rightWallTen = new Walls(3, 12.85, 1.2, -16.5, 0, Math.PI / -2)
museumGroup.add(rightWallTen.group)
const rightWallEleven = new Walls(3, 8.35, 1.2, -18, 0, 0)
museumGroup.add(rightWallEleven.group)
const rightWallTwelve = new Walls(3, 11.35, 1.2, -18, 0, 0)
museumGroup.add(rightWallTwelve.group)
const rightWallThirteen = new Walls(3, 6.85, 1.2, -19.5, 0, Math.PI / -2)
museumGroup.add(rightWallThirteen.group)
const rightWallFourteen = new Walls(3, 6.85, 1.2, -22.5, 0, Math.PI / -2)
museumGroup.add(rightWallFourteen.group)
const rightWallFifteen = new Walls(3, 8.35, 1.2, -24, 0, 0)
museumGroup.add(rightWallFifteen.group)
const rightWallSixteen = new Walls(3, 11.35, 1.2, -24, 0, 0)
museumGroup.add(rightWallSixteen.group)
const rightWallSeventeen = new Walls(3, 12.85, 1.2, -25.5, 0, Math.PI / -2)
museumGroup.add(rightWallSeventeen.group)
const rightWallEighteen = new Walls(3, 12.85, 1.2, -28.5, 0, Math.PI / -2)
museumGroup.add(rightWallEighteen.group)
const rightWallNineteen = new Walls(3, 8.35, 1.2, -30, 0, 0)
museumGroup.add(rightWallNineteen.group)
const rightWallTwenty = new Walls(3, 11.35, 1.2, -30, 0, 0)
museumGroup.add(rightWallTwenty.group)
const rightWallTwentyOne = new Walls(3, 6.85, 1.2, -31.5, 0, Math.PI / - 2)
museumGroup.add(rightWallTwentyOne.group)
const rightWallTwentyTwo = new Walls(3, 5.35, 1.2, -33, 0, 0)
museumGroup.add(rightWallTwentyTwo.group)
const rightWallTwentyThree = new Walls(3, 3.85, 1.2, -34.5, 0, Math.PI / -2)
museumGroup.add(rightWallTwentyThree.group)
const rightWallTwentyFour = new Walls(3, 3.85, 1.2, -37.5, 0, Math.PI / -2)
museumGroup.add(rightWallTwentyFour.group)
const rightWallTwentyFive = new Walls(3, 2.35, 1.2, -39, 0, 0)
museumGroup.add(rightWallTwentyFive.group)

/* Up side left */
const upLeftWallOne = new Walls(3, -2.35, 4.2, 0, 0, 0)
museumGroup.add(upLeftWallOne.group)
const upLeftWallTwo = new Walls(3, -5.35, 4.2, 0, 0, 0)
museumGroup.add(upLeftWallTwo.group)
const upLeftWallThree = new Walls(3, -6.85, 4.2, -1.5, 0,  Math.PI / -2)
museumGroup.add(upLeftWallThree.group)
const upLeftWallFour = new Walls(3, -6.85, 4.2, -4.5, 0, Math.PI / -2)
museumGroup.add(upLeftWallFour.group)
const upLeftWallFive = new Walls(3, -6.85, 4.2, -7.5, 0, Math.PI / -2)
museumGroup.add(upLeftWallFive.group)
const upLeftWallSix = new Walls(3, -6.85, 4.2, -10.5, 0, Math.PI / -2)
museumGroup.add(upLeftWallSix.group)
const upLeftWallSeven = new Walls(3, -8.35, 4.2, -12, 0, 0)
museumGroup.add(upLeftWallSeven.group)
const upLeftWallEight = new Walls(3, -11.35, 4.2, -12, 0, 0)
museumGroup.add(upLeftWallEight.group)
const upLeftWallNine = new Walls(3, -12.85, 4.2, -13.5, 0, Math.PI / -2)
museumGroup.add(upLeftWallNine.group)
const upLeftWallTen = new Walls(3, -12.85, 4.2, -16.5, 0, Math.PI / -2)
museumGroup.add(upLeftWallTen.group)
const upLeftWallEleven = new Walls(3, -8.35, 4.2, -18, 0, 0)
museumGroup.add(upLeftWallEleven.group)
const upLeftWallTwelve = new Walls(3, -11.35, 4.2, -18, 0, 0)
museumGroup.add(upLeftWallTwelve.group)
const upLeftWallThirteen = new Walls(3, -6.85, 4.2, -19.5, 0, Math.PI / -2)
museumGroup.add(upLeftWallThirteen.group)
const upLeftWallFourteen = new Walls(3, -6.85, 4.2, -22.5, 0, Math.PI / -2)
museumGroup.add(upLeftWallFourteen.group)
const upLeftWallFifteen = new Walls(3, -8.35, 4.2, -24, 0, 0)
museumGroup.add(upLeftWallFifteen.group)
const upLeftWallSixteen = new Walls(3, -11.35, 4.2, -24, 0, 0)
museumGroup.add(upLeftWallSixteen.group)
const upLeftWallSeventeen = new Walls(3, -12.85, 4.2, -25.5, 0, Math.PI / -2)
museumGroup.add(upLeftWallSeventeen.group)
const upLeftWallEighteen = new Walls(3, -12.85, 4.2, -28.5, 0, Math.PI / -2)
museumGroup.add(upLeftWallEighteen.group)
const upLeftWallNineteen = new Walls(3, -8.35, 4.2, -30, 0, 0)
museumGroup.add(upLeftWallNineteen.group)
const upLeftWallTwenty = new Walls(3, -11.35, 4.2, -30, 0, 0)
museumGroup.add(upLeftWallTwenty.group)
const upLeftWallTwentyOne = new Walls(3, -6.85, 4.2, -31.5, 0, Math.PI / - 2)
museumGroup.add(upLeftWallTwentyOne.group)
const upLeftWallTwentyTwo = new Walls(3, -5.35, 4.2, -33, 0, 0)
museumGroup.add(upLeftWallTwentyTwo.group)
const upLeftWallTwentyThree = new Walls(3, -3.85, 4.2, -34.5, 0, Math.PI / -2)
museumGroup.add(upLeftWallTwentyThree.group)
const upLeftWallTwentyFour = new Walls(3, -3.85, 4.2, -37.5, 0, Math.PI / -2)
museumGroup.add(upLeftWallTwentyFour.group)
const upLeftWallTwentyFive = new Walls(3, -2.35, 4.2, -39, 0, 0)
museumGroup.add(upLeftWallTwentyFive.group)

/* Up side Right */
const upRightWallOne = new Walls(3, 2.35, 4.2, 0, 0, 0)
museumGroup.add(upRightWallOne.group)
const upRightWallTwo = new Walls(3, 5.35, 4.2, 0, 0, 0)
museumGroup.add(upRightWallTwo.group)
const upRightWallThree = new Walls(3, 6.85, 4.2, -1.5, 0,  Math.PI / -2)
museumGroup.add(upRightWallThree.group)
const upRightWallFour = new Walls(3, 6.85, 4.2, -4.5, 0, Math.PI / -2)
museumGroup.add(upRightWallFour.group)
const upRightWallFive = new Walls(3, 6.85, 4.2, -7.5, 0, Math.PI / -2)
museumGroup.add(upRightWallFive.group)
const upRightWallSix = new Walls(3, 6.85, 4.2, -10.5, 0, Math.PI / -2)
museumGroup.add(upRightWallSix.group)
const upRightWallSeven = new Walls(3, 8.35, 4.2, -12, 0, 0)
museumGroup.add(upRightWallSeven.group)
const upRightWallEight = new Walls(3, 11.35, 4.2, -12, 0, 0)
museumGroup.add(upRightWallEight.group)
const upRightWallNine = new Walls(3, 12.85, 4.2, -13.5, 0, Math.PI / -2)
museumGroup.add(upRightWallNine.group)
const upRightWallTen = new Walls(3, 12.85, 4.2, -16.5, 0, Math.PI / -2)
museumGroup.add(upRightWallTen.group)
const upRightWallEleven = new Walls(3, 8.35, 4.2, -18, 0, 0)
museumGroup.add(upRightWallEleven.group)
const upRightWallTwelve = new Walls(3, 11.35, 4.2, -18, 0, 0)
museumGroup.add(upRightWallTwelve.group)
const upRightWallThirteen = new Walls(3, 6.85, 4.2, -19.5, 0, Math.PI / -2)
museumGroup.add(upRightWallThirteen.group)
const upRightWallFourteen = new Walls(3, 6.85, 4.2, -22.5, 0, Math.PI / -2)
museumGroup.add(upRightWallFourteen.group)
const upRightWallFifteen = new Walls(3, 8.35, 4.2, -24, 0, 0)
museumGroup.add(upRightWallFifteen.group)
const upRightWallSixteen = new Walls(3, 11.35, 4.2, -24, 0, 0)
museumGroup.add(upRightWallSixteen.group)
const upRightWallSeventeen = new Walls(3, 12.85, 4.2, -25.5, 0, Math.PI / -2)
museumGroup.add(upRightWallSeventeen.group)
const upRightWallEighteen = new Walls(3, 12.85, 4.2, -28.5, 0, Math.PI / -2)
museumGroup.add(upRightWallEighteen.group)
const upRightWallNineteen = new Walls(3, 8.35, 4.2, -30, 0, 0)
museumGroup.add(upRightWallNineteen.group)
const upRightWallTwenty = new Walls(3, 11.35, 4.2, -30, 0, 0)
museumGroup.add(upRightWallTwenty.group)
const upRightWallTwentyOne = new Walls(3, 6.85, 4.2, -31.5, 0, Math.PI / - 2)
museumGroup.add(upRightWallTwentyOne.group)
const upRightWallTwentyTwo = new Walls(3, 5.35, 4.2, -33, 0, 0)
museumGroup.add(upRightWallTwentyTwo.group)
const upRightWallTwentyThree = new Walls(3, 3.85, 4.2, -34.5, 0, Math.PI / -2)
museumGroup.add(upRightWallTwentyThree.group)
const upRightWallTwentyFour = new Walls(3, 3.85, 4.2, -37.5, 0, Math.PI / -2)
museumGroup.add(upRightWallTwentyFour.group)
const upRightWallTwentyFive = new Walls(3, 2.35, 4.2, -39, 0, 0)
museumGroup.add(upRightWallTwentyFive.group)

/**
 * Music instrument
 */
const tambourin = new Tambourin()
tambourin.group.position.y = 0.15
tambourin.group.position.z = -5
scene.add(tambourin.group)

const guitar = new Guitar()
guitar.group.position.x = 1
guitar.group.position.z = -2
scene.add(guitar.group)

const bell = new Bell()
bell.group.position.x = -2
scene.add(bell.group)

const piano = new Piano()
piano.group.position.x = 3
scene.add(piano.group)

const xylophone = new Xylophone()
xylophone.group.position.z = -3
xylophone.group.position.y = -0.2
scene.add(xylophone.group)

const bassviolin = new Bassviolin()
bassviolin.group.position.y = 0.8
bassviolin.group.position.x = -1
scene.add(bassviolin.group)

/**
 * Sound
 */

// AUDIO

import piano1 from "../static/sounds/piano/piano1.mp3"
import piano2 from "../static/sounds/piano/piano2.mp3"
import piano3 from "../static/sounds/piano/piano3.mp3"
import piano4 from "../static/sounds/piano/piano4.mp3"
import piano5 from "../static/sounds/piano/piano5.mp3"
import piano6 from "../static/sounds/piano/piano6.mp3"
import piano7 from "../static/sounds/piano/piano7.mp3"


import guitar1 from "../static/sounds/guitare/guitare1.mp3"
import guitar2 from "../static/sounds/guitare/guitare1.mp3"
import guitar3 from "../static/sounds/guitare/guitare1.mp3"
import guitar4 from "../static/sounds/guitare/guitare1.mp3"
import guitar5 from "../static/sounds/guitare/guitare1.mp3"
import guitar6 from "../static/sounds/guitare/guitare1.mp3"
import guitar7 from "../static/sounds/guitare/guitare1.mp3"

const pianoSound1 = new Audio(piano1)
const pianoSound2 = new Audio(piano2)
const pianoSound3 = new Audio(piano3)
const pianoSound4 = new Audio(piano4)
const pianoSound5 = new Audio(piano5)
const pianoSound6 = new Audio(piano6)
const pianoSound7 = new Audio(piano7)

const guitarSound1 = new Audio(guitar1)
const guitarSound2 = new Audio(guitar2)
const guitarSound3 = new Audio(guitar3)
const guitarSound4 = new Audio(guitar4)
const guitarSound5 = new Audio(guitar5)
const guitarSound6 = new Audio(guitar6)
const guitarSound7 = new Audio(guitar7)




const gay = () =>{
    window.addEventListener(
        'keypress',
        (_event)=>{
            if(_event.code === 'KeyE'){
                pianoSound1.play()
                pianoSound1.currentTime=0
                
            }
            if(_event.code === 'KeyR'){
                pianoSound2.play()
                pianoSound2.currentTime=0
                
            }
            if(_event.code === 'KeyT'){
                pianoSound3.play()
                pianoSound3.currentTime=0
                
            }
            if(_event.code === 'KeyY'){
                pianoSound4.play()
                pianoSound4.currentTime=0
                
            }
            if(_event.code === 'KeyU'){
                pianoSound5.play()
                pianoSound5.currentTime=0
                
            }
            if(_event.code === 'KeyI'){
                pianoSound6.play()
                pianoSound6.currentTime=0
                
            }
            if(_event.code === 'KeyO'){
                pianoSound7.play()
                pianoSound7.currentTime=0
                
            }
        }
    )
    
}



const pédé = () =>{
    window.addEventListener(
        'keypress',
        (_event)=>{
            if(_event.code === 'KeyE'){
                guitarSound1.play()
                guitarSound1.currentTime=0
                
            }
            if(_event.code === 'KeyR'){
                guitarSound2.play()
                guitarSound2.currentTime=0
                
            }
            if(_event.code === 'KeyT'){
                guitarSound3.play()
                guitarSound3.currentTime=0
                
            }
            if(_event.code === 'KeyY'){
                guitarSound4.play()
                guitarSound4.currentTime=0
                
            }
            if(_event.code === 'KeyU'){
                guitarSound5.play()
                guitarSound5.currentTime=0
                
            }
            if(_event.code === 'KeyI'){
                guitarSound6.play()
                guitarSound6.currentTime=0
                
            }
            if(_event.code === 'KeyO'){
                guitarSound7.play()
                guitarSound7.currentTime=0
                
            }
        }
    )
    
}

const tryIt = () =>{
    if(camera.position.x > 5){
        gay()
    }else{
        pédé()
    }
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

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

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

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
    controls.moveRight( - velocity.x * delta)
    controls.moveForward( - velocity.z * delta)

    prevTime = time;

   
    tryIt()
    // Render
    renderer.render(scene, camera)
}
loop()
