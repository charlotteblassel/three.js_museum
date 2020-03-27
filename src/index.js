import './style/main.styl'
import * as THREE from 'three'
import { TweenLite, TimelineLite } from 'gsap/all'
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
import Text from './scripts/Text.js'
import Sky from './assets/sky.jpg'
const blocker = document.querySelector(".blocker");
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const skyBackground = textureLoader.load(Sky);

/**
 * Sizes+
 */
const sizes = {};
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

/**
 * Cursor
 */
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", _event => {
  cursor.x = _event.clientX / sizes.width - 0.5;
  cursor.y = _event.clientY / sizes.height - 0.5;
});

/**
 * Scene
 */
const scene = new THREE.Scene();
scene.background = skyBackground;

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  99999
);
camera.lookAt(scene.position);
camera.position.z = 10;
camera.position.y = 1.8;
scene.add(camera);

// move
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

/**
 * Controls
 */
controls = new PointerLockControls(camera, document.body);
let prevTime = performance.now();
let velocity = new THREE.Vector3();
let clock = new THREE.Clock();
let direction = new THREE.Vector3();
controls.unlock();
scene.add(controls.getObject());

// Controls KeysDown
const onKeyDown = _event => {
  if (_event.code === "KeyW") {
    moveForward = true;
  }
  if (_event.code === "KeyS") {
    moveBackward = true;
  }
  if (_event.code === "KeyA") {
    moveLeft = true;
  }
  if (_event.code === "KeyD") {
    moveRight = true;
  }
};

// Controls KeyUp
const onKeyUp = _event => {
  if (_event.code === "KeyW") {
    moveForward = false;
  }
  if (_event.code === "KeyS") {
    moveBackward = false;
  }
  if (_event.code === "KeyA") {
    moveLeft = false;
  }
  if (_event.code === "KeyD") {
    moveRight = false;
  }

  // this code was used to jump, to help build the museum
  //    if (_event.key === ' '  || _event.code === 'space')
  // {
  //     camera.position.y += 1
  // }
  // if (_event.key === 'Control' ||  _event.code === 'ControlLeft')
  // {
  //     camera.position.y -= 1
  // }
};

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// We added lights over each instrument

const spotLight = new THREE.SpotLight(0xfddfff, 1, 12, Math.PI * 0.2, 0.5);
spotLight.position.z = -32;
spotLight.position.y = 2;
scene.add(spotLight);
spotLight.target.position.z = -36;
scene.add(spotLight.target);

const spotLight2 = new THREE.SpotLight(0xfddfff, 1, 12, Math.PI * 0.2, 0.5);
spotLight2.position.x = -13;
spotLight2.position.z = -14.4;
spotLight2.position.y = 2;
spotLight2.rotation.z = Math.PI / 2;
scene.add(spotLight2);
spotLight2.target.position.z = -16;
scene.add(spotLight2.target);

const spotLight3 = new THREE.SpotLight(0xfddfff, 1, 12, Math.PI * 0.2, 0.5);
spotLight3.position.x = 15;
spotLight3.position.z = -14;
spotLight3.position.y = 1;
spotLight3.rotation.z = Math.PI / 2;
scene.add(spotLight3);
spotLight3.target.position.z = -16;
scene.add(spotLight3.target);

const spotLight4 = new THREE.SpotLight(0xfddfff, 1, 12, Math.PI * 0.2, 0.5);
spotLight4.position.x = -13;
spotLight4.position.z = -25;
spotLight4.position.y = 2;
spotLight4.rotation.z = Math.PI / 2;
scene.add(spotLight4);
spotLight4.target.position.z = -27;
scene.add(spotLight4.target);

/**
 * Museum
 */
const museumGroup = new THREE.Group();
scene.add(museumGroup);


// Grounds
/* Grass */
const grass = new Grass(60, 60, 0, 0, -15, Math.PI / -2, 0);
museumGroup.add(grass.group);

/* Floor */
const instrumentFloorOne = new Floor(6, 6, -9.85, 0.001, -15, Math.PI / -2, 0);
museumGroup.add(instrumentFloorOne.group);
const instrumentFloorTwo = new Floor(6, 6, 9.85, 0.001, -15, Math.PI / -2, 0);
museumGroup.add(instrumentFloorTwo.group);
const instrumentFloorThree = new Floor(
  6,
  6,
  -9.85,
  0.001,
  -27,
  Math.PI / -2,
  0
);
museumGroup.add(instrumentFloorThree.group);
const instrumentFloorFour = new Floor(6, 6, 9.85, 0.001, -27, Math.PI / -2, 0);
museumGroup.add(instrumentFloorFour.group);
const instrumentFloorFive = new Floor(
  7.72,
  7.72,
  0,
  0.001,
  -35.125,
  Math.PI / -2,
  0
);
museumGroup.add(instrumentFloorFive.group);
const centralFloor = new Floor(13.7, 33, 0, 0.01, -16.5, Math.PI / -2, 0);
museumGroup.add(centralFloor.group);

/* Ceilling */
const instrumentCeillingOne = new Ceilling(6, 6, -9.85, 5.7, -15, Math.PI / -2, 0)
museumGroup.add(instrumentCeillingOne.group)
const instrumentCeillingTwo = new Ceilling(6, 6, 9.85, 5.7, -15, Math.PI / -2, 0)
museumGroup.add(instrumentCeillingTwo.group)
const instrumentCeillingThree = new Ceilling(6, 6, -9.85, 5.7, -27, Math.PI / -2, 0)
museumGroup.add(instrumentCeillingThree.group)
const instrumentCeillingFour = new Ceilling(6, 6, 9.85, 5.7, -27, Math.PI / -2, 0)
museumGroup.add(instrumentCeillingFour.group)
const instrumentCeillingFive = new Ceilling(7.72, 7.72, 0, 5.70, -35.14, Math.PI / -2, 0)
museumGroup.add(instrumentCeillingFive.group)
const centralCeilling = new Ceilling(13.7, 33, 0, 5.7, -16.5, Math.PI / -2, 0)
museumGroup.add(centralCeilling.group)

// Roof
const instrumentRoofOne = new Roof(6, 3, 4, -9.85, 7.21, -15, Math.PI / -4);
museumGroup.add(instrumentRoofOne.group);
const instrumentRoofTwo = new Roof(6, 3, 4, 9.85, 7.21, -15, Math.PI / -4);
museumGroup.add(instrumentRoofTwo.group);
const instrumentRoofThree = new Roof(6, 3, 4, -9.85, 7.21, -27, Math.PI / -4);
museumGroup.add(instrumentRoofThree.group);
const instrumentRoofFour = new Roof(6, 3, 4, 9.85, 7.21, -27, Math.PI / -4);
museumGroup.add(instrumentRoofFour.group);
const instrumentRoofFive = new Roof(6, 3, 4, 0, 7.21, -36, Math.PI / -4);
museumGroup.add(instrumentRoofFive.group);
const centralRoofOne = new Roof(12, 4.5, 4, 0, 7.961, -6.9, Math.PI / -4);
museumGroup.add(centralRoofOne.group);
const centralRoofTwo = new Roof(12, 4.5, 4, 0, 7.961, -26.2, Math.PI / -4);
museumGroup.add(centralRoofTwo.group);
const centralRoofThree = new Roof(12, 4.5, 4, 0, 7.962, -16.55, Math.PI / -4);
museumGroup.add(centralRoofThree.group);

// Base
const baseOne = new Bases(2, 2, 1, 32, -9.8, 0, -15);
museumGroup.add(baseOne.group);
const baseTwo = new Bases(1, 1, 1, 32, 9.8, 0, -15);
museumGroup.add(baseTwo.group);
const baseThree = new Bases(1.2, 1.2, 1, 32, -9.8, 0, -27);
museumGroup.add(baseThree.group);
const baseFour = new Bases(0.5, 0.5, 1, 32, 9.8, 0, -27);
museumGroup.add(baseFour.group);
const baseFive = new Bases(1, 1, 1, 32, 0, 0, -36);
museumGroup.add(baseFive.group);

// Doors
const door = new Doors(3, 3, 0, 1.35, 0, 0);
museumGroup.add(door.group);

const raycaster = new THREE.Raycaster()

// Walls
const backWall = new Walls(3, 0, 1.2, -39.001, 0, 0);
museumGroup.add(backWall.group);
const upBackWall = new Walls(3, 0, 4.2, -39.001, 0, 0);
museumGroup.add(upBackWall.group);
const upFrontWall = new Walls(3, 0, 4.2, 0.001, 0, 0);
museumGroup.add(upFrontWall.group);

/* Left side */
const leftWallOne = new Walls(3, -2.35, 1.2, 0, 0, 0);
museumGroup.add(leftWallOne.group);
const leftWallTwo = new Walls(3, -5.35, 1.2, 0, 0, 0);
museumGroup.add(leftWallTwo.group);
const leftWallThree = new Walls(3, -6.85, 1.2, -1.5, 0, Math.PI / -2);
museumGroup.add(leftWallThree.group);
const leftWallFour = new Walls(3, -6.85, 1.2, -4.5, 0, Math.PI / -2);
museumGroup.add(leftWallFour.group);
const leftWallFive = new Walls(3, -6.85, 1.2, -7.5, 0, Math.PI / -2);
museumGroup.add(leftWallFive.group);
const leftWallSix = new Walls(3, -6.85, 1.2, -10.5, 0, Math.PI / -2);
museumGroup.add(leftWallSix.group);
const leftWallSeven = new Walls(3, -8.35, 1.2, -12, 0, 0);
museumGroup.add(leftWallSeven.group);
const leftWallEight = new Walls(3, -11.35, 1.2, -12, 0, 0);
museumGroup.add(leftWallEight.group);
const leftWallNine = new Walls(3, -12.85, 1.2, -13.5, 0, Math.PI / -2);
museumGroup.add(leftWallNine.group);
const leftWallTen = new Walls(3, -12.85, 1.2, -16.5, 0, Math.PI / -2);
museumGroup.add(leftWallTen.group);
const leftWallEleven = new Walls(3, -8.35, 1.2, -18, 0, 0);
museumGroup.add(leftWallEleven.group);
const leftWallTwelve = new Walls(3, -11.35, 1.2, -18, 0, 0);
museumGroup.add(leftWallTwelve.group);
const leftWallThirteen = new Walls(3, -6.85, 1.2, -19.5, 0, Math.PI / -2);
museumGroup.add(leftWallThirteen.group);
const leftWallFourteen = new Walls(3, -6.85, 1.2, -22.5, 0, Math.PI / -2);
museumGroup.add(leftWallFourteen.group);
const leftWallFifteen = new Walls(3, -8.35, 1.2, -24, 0, 0);
museumGroup.add(leftWallFifteen.group);
const leftWallSixteen = new Walls(3, -11.35, 1.2, -24, 0, 0);
museumGroup.add(leftWallSixteen.group);
const leftWallSeventeen = new Walls(3, -12.85, 1.2, -25.5, 0, Math.PI / -2);
museumGroup.add(leftWallSeventeen.group);
const leftWallEighteen = new Walls(3, -12.85, 1.2, -28.5, 0, Math.PI / -2);
museumGroup.add(leftWallEighteen.group);
const leftWallNineteen = new Walls(3, -8.35, 1.2, -30, 0, 0);
museumGroup.add(leftWallNineteen.group);
const leftWallTwenty = new Walls(3, -11.35, 1.2, -30, 0, 0);
museumGroup.add(leftWallTwenty.group);
const leftWallTwentyOne = new Walls(3, -6.85, 1.2, -31.5, 0, Math.PI / -2);
museumGroup.add(leftWallTwentyOne.group);
const leftWallTwentyTwo = new Walls(3, -5.35, 1.2, -33, 0, 0);
museumGroup.add(leftWallTwentyTwo.group);
const leftWallTwentyThree = new Walls(3, -3.85, 1.2, -34.5, 0, Math.PI / -2);
museumGroup.add(leftWallTwentyThree.group);
const leftWallTwentyFour = new Walls(3, -3.85, 1.2, -37.5, 0, Math.PI / -2);
museumGroup.add(leftWallTwentyFour.group);
const leftWallTwentyFive = new Walls(3, -2.35, 1.2, -39, 0, 0);
museumGroup.add(leftWallTwentyFive.group);

/* Right side */
const rightWallOne = new Walls(3, 2.35, 1.2, 0, 0, 0);
museumGroup.add(rightWallOne.group);
const rightWallTwo = new Walls(3, 5.35, 1.2, 0, 0, 0);
museumGroup.add(rightWallTwo.group);
const rightWallThree = new Walls(3, 6.85, 1.2, -1.5, 0, Math.PI / -2);
museumGroup.add(rightWallThree.group);
const rightWallFour = new Walls(3, 6.85, 1.2, -4.5, 0, Math.PI / -2);
museumGroup.add(rightWallFour.group);
const rightWallFive = new Walls(3, 6.85, 1.2, -7.5, 0, Math.PI / -2);
museumGroup.add(rightWallFive.group);
const rightWallSix = new Walls(3, 6.85, 1.2, -10.5, 0, Math.PI / -2);
museumGroup.add(rightWallSix.group);
const rightWallSeven = new Walls(3, 8.35, 1.2, -12, 0, 0);
museumGroup.add(rightWallSeven.group);
const rightWallEight = new Walls(3, 11.35, 1.2, -12, 0, 0);
museumGroup.add(rightWallEight.group);
const rightWallNine = new Walls(3, 12.85, 1.2, -13.5, 0, Math.PI / -2);
museumGroup.add(rightWallNine.group);
const rightWallTen = new Walls(3, 12.85, 1.2, -16.5, 0, Math.PI / -2);
museumGroup.add(rightWallTen.group);
const rightWallEleven = new Walls(3, 8.35, 1.2, -18, 0, 0);
museumGroup.add(rightWallEleven.group);
const rightWallTwelve = new Walls(3, 11.35, 1.2, -18, 0, 0);
museumGroup.add(rightWallTwelve.group);
const rightWallThirteen = new Walls(3, 6.85, 1.2, -19.5, 0, Math.PI / -2);
museumGroup.add(rightWallThirteen.group);
const rightWallFourteen = new Walls(3, 6.85, 1.2, -22.5, 0, Math.PI / -2);
museumGroup.add(rightWallFourteen.group);
const rightWallFifteen = new Walls(3, 8.35, 1.2, -24, 0, 0);
museumGroup.add(rightWallFifteen.group);
const rightWallSixteen = new Walls(3, 11.35, 1.2, -24, 0, 0);
museumGroup.add(rightWallSixteen.group);
const rightWallSeventeen = new Walls(3, 12.85, 1.2, -25.5, 0, Math.PI / -2);
museumGroup.add(rightWallSeventeen.group);
const rightWallEighteen = new Walls(3, 12.85, 1.2, -28.5, 0, Math.PI / -2);
museumGroup.add(rightWallEighteen.group);
const rightWallNineteen = new Walls(3, 8.35, 1.2, -30, 0, 0);
museumGroup.add(rightWallNineteen.group);
const rightWallTwenty = new Walls(3, 11.35, 1.2, -30, 0, 0);
museumGroup.add(rightWallTwenty.group);
const rightWallTwentyOne = new Walls(3, 6.85, 1.2, -31.5, 0, Math.PI / -2);
museumGroup.add(rightWallTwentyOne.group);
const rightWallTwentyTwo = new Walls(3, 5.35, 1.2, -33, 0, 0);
museumGroup.add(rightWallTwentyTwo.group);
const rightWallTwentyThree = new Walls(3, 3.85, 1.2, -34.5, 0, Math.PI / -2);
museumGroup.add(rightWallTwentyThree.group);
const rightWallTwentyFour = new Walls(3, 3.85, 1.2, -37.5, 0, Math.PI / -2);
museumGroup.add(rightWallTwentyFour.group);
const rightWallTwentyFive = new Walls(3, 2.35, 1.2, -39, 0, 0);
museumGroup.add(rightWallTwentyFive.group);

/* Up side left */
const upLeftWallOne = new Walls(3, -2.35, 4.2, 0, 0, 0);
museumGroup.add(upLeftWallOne.group);
const upLeftWallTwo = new Walls(3, -5.35, 4.2, 0, 0, 0);
museumGroup.add(upLeftWallTwo.group);
const upLeftWallThree = new Walls(3, -6.85, 4.2, -1.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallThree.group);
const upLeftWallFour = new Walls(3, -6.85, 4.2, -4.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallFour.group);
const upLeftWallFive = new Walls(3, -6.85, 4.2, -7.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallFive.group);
const upLeftWallSix = new Walls(3, -6.85, 4.2, -10.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallSix.group);
const upLeftWallSeven = new Walls(3, -8.35, 4.2, -12, 0, 0);
museumGroup.add(upLeftWallSeven.group);
const upLeftWallEight = new Walls(3, -11.35, 4.2, -12, 0, 0);
museumGroup.add(upLeftWallEight.group);
const upLeftWallNine = new Walls(3, -12.85, 4.2, -13.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallNine.group);
const upLeftWallTen = new Walls(3, -12.85, 4.2, -16.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallTen.group);
const upLeftWallEleven = new Walls(3, -8.35, 4.2, -18, 0, 0);
museumGroup.add(upLeftWallEleven.group);
const upLeftWallTwelve = new Walls(3, -11.35, 4.2, -18, 0, 0);
museumGroup.add(upLeftWallTwelve.group);
const upLeftWallThirteen = new Walls(3, -6.85, 4.2, -19.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallThirteen.group);
const upLeftWallFourteen = new Walls(3, -6.85, 4.2, -22.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallFourteen.group);
const upLeftWallFifteen = new Walls(3, -8.35, 4.2, -24, 0, 0);
museumGroup.add(upLeftWallFifteen.group);
const upLeftWallSixteen = new Walls(3, -11.35, 4.2, -24, 0, 0);
museumGroup.add(upLeftWallSixteen.group);
const upLeftWallSeventeen = new Walls(3, -12.85, 4.2, -25.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallSeventeen.group);
const upLeftWallEighteen = new Walls(3, -12.85, 4.2, -28.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallEighteen.group);
const upLeftWallNineteen = new Walls(3, -8.35, 4.2, -30, 0, 0);
museumGroup.add(upLeftWallNineteen.group);
const upLeftWallTwenty = new Walls(3, -11.35, 4.2, -30, 0, 0);
museumGroup.add(upLeftWallTwenty.group);
const upLeftWallTwentyOne = new Walls(3, -6.85, 4.2, -31.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallTwentyOne.group);
const upLeftWallTwentyTwo = new Walls(3, -5.35, 4.2, -33, 0, 0);
museumGroup.add(upLeftWallTwentyTwo.group);
const upLeftWallTwentyThree = new Walls(3, -3.85, 4.2, -34.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallTwentyThree.group);
const upLeftWallTwentyFour = new Walls(3, -3.85, 4.2, -37.5, 0, Math.PI / -2);
museumGroup.add(upLeftWallTwentyFour.group);
const upLeftWallTwentyFive = new Walls(3, -2.35, 4.2, -39, 0, 0);
museumGroup.add(upLeftWallTwentyFive.group);

/* Up side Right */
const upRightWallOne = new Walls(3, 2.35, 4.2, 0, 0, 0);
museumGroup.add(upRightWallOne.group);
const upRightWallTwo = new Walls(3, 5.35, 4.2, 0, 0, 0);
museumGroup.add(upRightWallTwo.group);
const upRightWallThree = new Walls(3, 6.85, 4.2, -1.5, 0, Math.PI / -2);
museumGroup.add(upRightWallThree.group);
const upRightWallFour = new Walls(3, 6.85, 4.2, -4.5, 0, Math.PI / -2);
museumGroup.add(upRightWallFour.group);
const upRightWallFive = new Walls(3, 6.85, 4.2, -7.5, 0, Math.PI / -2);
museumGroup.add(upRightWallFive.group);
const upRightWallSix = new Walls(3, 6.85, 4.2, -10.5, 0, Math.PI / -2);
museumGroup.add(upRightWallSix.group);
const upRightWallSeven = new Walls(3, 8.35, 4.2, -12, 0, 0);
museumGroup.add(upRightWallSeven.group);
const upRightWallEight = new Walls(3, 11.35, 4.2, -12, 0, 0);
museumGroup.add(upRightWallEight.group);
const upRightWallNine = new Walls(3, 12.85, 4.2, -13.5, 0, Math.PI / -2);
museumGroup.add(upRightWallNine.group);
const upRightWallTen = new Walls(3, 12.85, 4.2, -16.5, 0, Math.PI / -2);
museumGroup.add(upRightWallTen.group);
const upRightWallEleven = new Walls(3, 8.35, 4.2, -18, 0, 0);
museumGroup.add(upRightWallEleven.group);
const upRightWallTwelve = new Walls(3, 11.35, 4.2, -18, 0, 0);
museumGroup.add(upRightWallTwelve.group);
const upRightWallThirteen = new Walls(3, 6.85, 4.2, -19.5, 0, Math.PI / -2);
museumGroup.add(upRightWallThirteen.group);
const upRightWallFourteen = new Walls(3, 6.85, 4.2, -22.5, 0, Math.PI / -2);
museumGroup.add(upRightWallFourteen.group);
const upRightWallFifteen = new Walls(3, 8.35, 4.2, -24, 0, 0);
museumGroup.add(upRightWallFifteen.group);
const upRightWallSixteen = new Walls(3, 11.35, 4.2, -24, 0, 0);
museumGroup.add(upRightWallSixteen.group);
const upRightWallSeventeen = new Walls(3, 12.85, 4.2, -25.5, 0, Math.PI / -2);
museumGroup.add(upRightWallSeventeen.group);
const upRightWallEighteen = new Walls(3, 12.85, 4.2, -28.5, 0, Math.PI / -2);
museumGroup.add(upRightWallEighteen.group);
const upRightWallNineteen = new Walls(3, 8.35, 4.2, -30, 0, 0);
museumGroup.add(upRightWallNineteen.group);
const upRightWallTwenty = new Walls(3, 11.35, 4.2, -30, 0, 0);
museumGroup.add(upRightWallTwenty.group);
const upRightWallTwentyOne = new Walls(3, 6.85, 4.2, -31.5, 0, Math.PI / -2);
museumGroup.add(upRightWallTwentyOne.group);
const upRightWallTwentyTwo = new Walls(3, 5.35, 4.2, -33, 0, 0);
museumGroup.add(upRightWallTwentyTwo.group);
const upRightWallTwentyThree = new Walls(3, 3.85, 4.2, -34.5, 0, Math.PI / -2);
museumGroup.add(upRightWallTwentyThree.group);
const upRightWallTwentyFour = new Walls(3, 3.85, 4.2, -37.5, 0, Math.PI / -2);
museumGroup.add(upRightWallTwentyFour.group);
const upRightWallTwentyFive = new Walls(3, 2.35, 4.2, -39, 0, 0);
museumGroup.add(upRightWallTwentyFive.group);

/**
 * Text
 */
const frontText = new Text('Museum of ♫', 1, 0.3, -3.85, 3.8, 0.01, 0)
museumGroup.add(frontText.group)
const pianoText = new Text('Pour jouer :\nf / g / h / j / k / l / m', 0.5, 0.1, -12.84, 4.5, -12.3, Math.PI / 2)
museumGroup.add(pianoText.group)
const guitarText = new Text('Pour jouer :\ne / r / t / y / u / i / o', 0.5, 0.1, -12.84, 4.5, -24.5, Math.PI / 2)
museumGroup.add(guitarText.group)
const xyloText = new Text('Pour jouer :\nw/ x / c / v / b / n / ,', 0.5, 0.1, 12.84, 4.5, -17.5, Math.PI / -2)
museumGroup.add(xyloText.group)
const tambourinText = new Text('Pour jouer : a', 0.5, 0.1, 12.84, 4, -28.8, Math.PI / -2)
museumGroup.add(tambourinText.group)
const contrebasseText = new Text('Pour jouer :\n1 / 2 / 3 / 4 / 5 / 6 / 7', 0.5, 0.1, -2.85, 4.5, -38.9, 0)
museumGroup.add(contrebasseText.group)

/**
 * Music instrument
 */
// Positioning the tambourin on its base
const tambourin = new Tambourin();
tambourin.group.position.x = 9.8;
tambourin.group.position.z = -27;
tambourin.group.position.y = 0.6;
scene.add(tambourin.group);

// Positioning the guitar on its base
const guitar = new Guitar();
guitar.group.position.x = -9.5;
guitar.group.position.z = -26.5;
guitar.group.position.y = 0.5;
guitar.group.rotation.y = Math.PI / 2;
scene.add(guitar.group);

// Positioning the bell near the entrance
const bell = new Bell();
bell.group.position.x = 1.5;
bell.group.position.z = -0.2;
bell.group.position.y = 1.9;
scene.add(bell.group);

// Positioning the piano on its base
const piano = new Piano();
piano.group.position.x = -9.9;
piano.group.position.z = -15.1;
piano.group.position.y = 0.5;
scene.add(piano.group);

// Positioning the xylophone on its base
const xylophone = new Xylophone();
xylophone.group.position.x = 10.1;
xylophone.group.position.z = -15;
xylophone.group.position.y = 0.2;
xylophone.group.rotation.y = Math.PI / 2;
scene.add(xylophone.group);

// Positioning the bassviolin on its base
const bassviolin = new Bassviolin();
bassviolin.group.position.x = 0;
bassviolin.group.position.z = -36;
bassviolin.group.position.y = 1.7;
scene.add(bassviolin.group);

/**
 * Sound
 */

// AUDIO

// Importing the piano songs
import piano1 from "../static/sounds/piano/piano1.mp3";
import piano2 from "../static/sounds/piano/piano2.mp3";
import piano3 from "../static/sounds/piano/piano3.mp3";
import piano4 from "../static/sounds/piano/piano4.mp3";
import piano5 from "../static/sounds/piano/piano5.mp3";
import piano6 from "../static/sounds/piano/piano6.mp3";
import piano7 from "../static/sounds/piano/piano7.mp3";

// Importing the guitar song
import guitar1 from "../static/sounds/guitare/guitare1.mp3";
import guitar2 from "../static/sounds/guitare/guitare2.mp3";
import guitar3 from "../static/sounds/guitare/guitare3.mp3";
import guitar4 from "../static/sounds/guitare/guitare4.mp3";
import guitar5 from "../static/sounds/guitare/guitare5.mp3";
import guitar6 from "../static/sounds/guitare/guitare6.mp3";
import guitar7 from "../static/sounds/guitare/guitare7.mp3";
import { Mesh } from 'three'

// Importing the Xylo song
import xylo1 from "../static/sounds/xylophone/xylo1.mp3";
import xylo2 from "../static/sounds/xylophone/xylo2.mp3";
import xylo3 from "../static/sounds/xylophone/xylo3.mp3";
import xylo4 from "../static/sounds/xylophone/xylo4.mp3";
import xylo5 from "../static/sounds/xylophone/xylo5.mp3";
import xylo6 from "../static/sounds/xylophone/xylo6.mp3";
import xylo7 from "../static/sounds/xylophone/xylo7.mp3";

import tambourinSoloSound from "../static/sounds/tambourin/tambourin.mp3";

import contrebasse1 from "../static/sounds/contrebasse/contrebasse1.mp3";
import contrebasse2 from "../static/sounds/contrebasse/contrebasse2.mp3";
import contrebasse3 from "../static/sounds/contrebasse/contrebasse3.mp3";
import contrebasse4 from "../static/sounds/contrebasse/contrebasse4.mp3";
import contrebasse5 from "../static/sounds/contrebasse/contrebasse5.mp3";
import contrebasse6 from "../static/sounds/contrebasse/contrebasse6.mp3";
import contrebasse7 from "../static/sounds/contrebasse/contrebasse7.mp3";

import bell1 from "../static/sounds/cloche.mp3"

const bellSound1 = new Audio(bell1)


const listener = new THREE.AudioListener();
camera.add(listener);

const soundGuitarposition = new THREE.PositionalAudio(listener);
const soundGuitarposition1 = new THREE.PositionalAudio(listener);
const soundGuitarposition2 = new THREE.PositionalAudio(listener);
const soundGuitarposition3 = new THREE.PositionalAudio(listener);
const soundGuitarposition4 = new THREE.PositionalAudio(listener);
const soundGuitarposition5 = new THREE.PositionalAudio(listener);
const soundGuitarposition6 = new THREE.PositionalAudio(listener);

const soundPianoposition = new THREE.PositionalAudio(listener);
const soundPianoposition1 = new THREE.PositionalAudio(listener);
const soundPianoposition2 = new THREE.PositionalAudio(listener);
const soundPianoposition3 = new THREE.PositionalAudio(listener);
const soundPianoposition4 = new THREE.PositionalAudio(listener);
const soundPianoposition5 = new THREE.PositionalAudio(listener);
const soundPianoposition6 = new THREE.PositionalAudio(listener);

const soundXyloPosition = new THREE.PositionalAudio(listener);
const soundXyloPosition1 = new THREE.PositionalAudio(listener);
const soundXyloPosition2 = new THREE.PositionalAudio(listener);
const soundXyloPosition3 = new THREE.PositionalAudio(listener);
const soundXyloPosition4 = new THREE.PositionalAudio(listener);
const soundXyloPosition5 = new THREE.PositionalAudio(listener);
const soundXyloPosition6 = new THREE.PositionalAudio(listener);

const soundTambourinPosition = new THREE.PositionalAudio(listener);

const soundContrebassePosition = new THREE.PositionalAudio(listener);
const soundContrebassePosition1 = new THREE.PositionalAudio(listener);
const soundContrebassePosition2 = new THREE.PositionalAudio(listener);
const soundContrebassePosition3 = new THREE.PositionalAudio(listener);
const soundContrebassePosition4 = new THREE.PositionalAudio(listener);
const soundContrebassePosition5 = new THREE.PositionalAudio(listener);
const soundContrebassePosition6 = new THREE.PositionalAudio(listener);

const audioLoader = new THREE.AudioLoader();

// Loading the sound Guitar
audioLoader.load(guitar1, buffer => {
  soundGuitarposition.setBuffer(buffer);
  soundGuitarposition.setRefDistance(1.8);
});
audioLoader.load(guitar2, buffer => {
  soundGuitarposition1.setBuffer(buffer);
  soundGuitarposition1.setRefDistance(1.8);
});
audioLoader.load(guitar3, buffer => {
  soundGuitarposition2.setBuffer(buffer);
  soundGuitarposition2.setRefDistance(1.8);
});
audioLoader.load(guitar4, buffer => {
  soundGuitarposition3.setBuffer(buffer);
  soundGuitarposition3.setRefDistance(1.8);
});
audioLoader.load(guitar5, buffer => {
  soundGuitarposition4.setBuffer(buffer);
  soundGuitarposition4.setRefDistance(1.8);
});
audioLoader.load(guitar6, buffer => {
  soundGuitarposition5.setBuffer(buffer);
  soundGuitarposition5.setRefDistance(1.8);
});
audioLoader.load(guitar7, buffer => {
  soundGuitarposition6.setBuffer(buffer);
  soundGuitarposition6.setRefDistance(1.8);
});

// Loading the sound Piano
audioLoader.load(piano1, buffer => {
  soundPianoposition.setBuffer(buffer);
  soundPianoposition.setRefDistance(1.8);
});
audioLoader.load(piano2, buffer => {
  soundPianoposition1.setBuffer(buffer);
  soundPianoposition1.setRefDistance(1.8);
});
audioLoader.load(piano3, buffer => {
  soundPianoposition2.setBuffer(buffer);
  soundPianoposition2.setRefDistance(1.8);
});
audioLoader.load(piano4, buffer => {
  soundPianoposition3.setBuffer(buffer);
  soundPianoposition3.setRefDistance(1.8);
});
audioLoader.load(piano5, buffer => {
  soundPianoposition4.setBuffer(buffer);
  soundPianoposition4.setRefDistance(1.8);
});
audioLoader.load(piano6, buffer => {
  soundPianoposition5.setBuffer(buffer);
  soundPianoposition5.setRefDistance(1.8);
});
audioLoader.load(piano7, buffer => {
  soundPianoposition6.setBuffer(buffer);
  soundPianoposition6.setRefDistance(1.8);
});

// Loading the sound Xylo
audioLoader.load(xylo1, buffer => {
  soundXyloPosition.setBuffer(buffer);
  soundXyloPosition.setRefDistance(0.9);
});
audioLoader.load(xylo2, buffer => {
  soundXyloPosition1.setBuffer(buffer);
  soundXyloPosition1.setRefDistance(0.9);
});
audioLoader.load(xylo3, buffer => {
  soundXyloPosition2.setBuffer(buffer);
  soundXyloPosition2.setRefDistance(0.9);
});
audioLoader.load(xylo4, buffer => {
  soundXyloPosition3.setBuffer(buffer);
  soundXyloPosition3.setRefDistance(0.9);
});
audioLoader.load(xylo5, buffer => {
  soundXyloPosition4.setBuffer(buffer);
  soundXyloPosition4.setRefDistance(0.9);
});
audioLoader.load(xylo6, buffer => {
  soundXyloPosition5.setBuffer(buffer);
  soundXyloPosition5.setRefDistance(0.9);
});
audioLoader.load(xylo7, buffer => {
  soundXyloPosition6.setBuffer(buffer);
  soundXyloPosition6.setRefDistance(0.9);
});

// Loading the sound Tambourin
audioLoader.load(tambourinSoloSound, buffer => {
  soundTambourinPosition.setBuffer(buffer);
  soundTambourinPosition.setRefDistance(1.8);
});

// Loading the sound contrebasse
audioLoader.load(contrebasse1, buffer => {
  soundContrebassePosition.setBuffer(buffer);
  soundContrebassePosition.setRefDistance(1.8);
});
audioLoader.load(contrebasse2, buffer => {
  soundContrebassePosition1.setBuffer(buffer);
  soundContrebassePosition1.setRefDistance(1.8);
});
audioLoader.load(contrebasse3, buffer => {
  soundContrebassePosition2.setBuffer(buffer);
  soundContrebassePosition2.setRefDistance(3);
});
audioLoader.load(contrebasse4, buffer => {
  soundContrebassePosition3.setBuffer(buffer);
  soundContrebassePosition3.setRefDistance(3);
});
audioLoader.load(contrebasse5, buffer => {
  soundContrebassePosition4.setBuffer(buffer);
  soundContrebassePosition4.setRefDistance(3);
});
audioLoader.load(contrebasse6, buffer => {
  soundContrebassePosition5.setBuffer(buffer);
  soundContrebassePosition5.setRefDistance(3);
});
audioLoader.load(contrebasse7, buffer => {
  soundContrebassePosition6.setBuffer(buffer);
  soundContrebassePosition6.setRefDistance(3);
});

const playSound = _positionalSound => {
  _positionalSound._startedAt = _positionalSound.context.currentTime + 0;

  const source = _positionalSound.context.createBufferSource();
  source.buffer = _positionalSound.buffer;
  source.loop = _positionalSound.loop;
  source.loopStart = _positionalSound.loopStart;
  source.loopEnd = _positionalSound.loopEnd;
  source.onended = _positionalSound.onEnded.bind(_positionalSound);
  source.start(
    _positionalSound._startedAt,
    _positionalSound._pausedAt + _positionalSound.offset,
    _positionalSound.duration
  );

  _positionalSound.isPlaying = true;

  _positionalSound.source = source;

  _positionalSound.setDetune(_positionalSound.detune);
  _positionalSound.setPlaybackRate(_positionalSound.playbackRate);

  _positionalSound.connect();
};

window.addEventListener("keypress", _event => {
  if (_event.code === "KeyE") {
    playSound(soundGuitarposition);
  } else if (_event.code === "KeyR") {
    playSound(soundGuitarposition1);
  } else if (_event.code === "KeyT") {
    playSound(soundGuitarposition2);
  } else if (_event.code === "KeyY") {
    playSound(soundGuitarposition3);
  } else if (_event.code === "KeyU") {
    playSound(soundGuitarposition4);
  } else if (_event.code === "KeyI") {
    playSound(soundGuitarposition5);
  } else if (_event.code === "KeyO") {
    playSound(soundGuitarposition6);
  } else if (_event.code === "KeyF") {
    playSound(soundPianoposition);
  } else if (_event.code === "KeyG") {
    playSound(soundPianoposition1);
  } else if (_event.code === "KeyH") {
    playSound(soundPianoposition2);
  } else if (_event.code === "KeyJ") {
    playSound(soundPianoposition3);
  } else if (_event.code === "KeyK") {
    playSound(soundPianoposition4);
  } else if (_event.code === "KeyL") {
    playSound(soundPianoposition5);
  } else if (_event.code === "Semicolon") {
    playSound(soundPianoposition6);
  } else if (_event.code === "KeyZ") {
    playSound(soundXyloPosition);
  } else if (_event.code === "KeyX") {
    playSound(soundXyloPosition1);
  } else if (_event.code === "KeyC") {
    playSound(soundXyloPosition2);
  } else if (_event.code === "KeyV") {
    playSound(soundXyloPosition3);
  } else if (_event.code === "KeyB") {
    playSound(soundXyloPosition4);
  } else if (_event.code === "KeyN") {
    playSound(soundXyloPosition5);
  } else if (_event.code === "KeyM") {
    playSound(soundXyloPosition6);
  } else if (_event.code === "KeyQ") {
    playSound(soundTambourinPosition);
  } else if (_event.code === "Digit1") {
    playSound(soundContrebassePosition);
  } else if (_event.code === "Digit2") {
    playSound(soundContrebassePosition1);
  } else if (_event.code === "Digit3") {
    playSound(soundContrebassePosition2);
  } else if (_event.code === "Digit4") {
    playSound(soundContrebassePosition3);
  } else if (_event.code === "Digit5") {
    playSound(soundContrebassePosition4);
  } else if (_event.code === "Digit6") {
    playSound(soundContrebassePosition5);
  } else if (_event.code === "Digit7") {
    playSound(soundContrebassePosition6);
  }
});
// Displaying an element on which the positional sound is based

const audioGuitar = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 1, 8),
  new THREE.MeshNormalMaterial({
    color: 0xff0000
  })
);

audioGuitar.position.set(-10.2, 0.5, -26.8);
audioGuitar.visible = false
scene.add(audioGuitar);

audioGuitar.add(
  soundGuitarposition,
  soundGuitarposition1,
  soundGuitarposition2,
  soundGuitarposition3,
  soundGuitarposition4,
  soundGuitarposition5,
  soundGuitarposition6
);

// Displaying an element on which the positional sound is based

const audioPiano = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 1, 8),
  new THREE.MeshNormalMaterial({
    color: 0xff0000
  })
);

audioPiano.position.set(-9.9, 0.5, -15.1);
audioPiano.visible = false
scene.add(audioPiano);

audioPiano.add(
  soundPianoposition,
  soundPianoposition1,
  soundPianoposition2,
  soundPianoposition3,
  soundPianoposition4,
  soundPianoposition5,
  soundPianoposition6
);

// Displaying an element on which the positional sound is based

const audioXylo = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 1, 8),
  new THREE.MeshNormalMaterial({
    color: 0xff0000
  })
);

audioXylo.position.set(10.1, 0.2, -15);
audioXylo.visible = false
scene.add(audioXylo);

audioXylo.add(
  soundXyloPosition,
  soundXyloPosition1,
  soundXyloPosition2,
  soundXyloPosition3,
  soundXyloPosition4,
  soundXyloPosition5,
  soundXyloPosition6
);

// Displaying an element on which the positional sound is based

const audiTambourin = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 1, 8),
  new THREE.MeshNormalMaterial({
    color: 0xff0000
  })
);

audiTambourin.position.set(9.8, 0.6, -27);
scene.add(audiTambourin);
audiTambourin.visible = false
audiTambourin.add(soundTambourinPosition);

// Displaying an element on which the positional sound is based

const audioContrebasse = new THREE.Mesh(
  new THREE.SphereBufferGeometry(2, 2, 2),
  new THREE.MeshNormalMaterial({
    color: 0xff0000
  })
);

audioContrebasse.position.set(0, 1.7, -36);
audioContrebasse.visible = false
scene.add(audioContrebasse);

audioContrebasse.add(
  soundContrebassePosition,
  soundContrebassePosition1,
  soundContrebassePosition2,
  soundContrebassePosition3,
  soundContrebassePosition4,
  soundContrebassePosition5,
  soundContrebassePosition6
);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearAlpha(0);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

/**
 * Camera Controll
 */
let controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());

/**
 * Resize
 */
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

document.body.addEventListener("keydown", _e => {
  if (_e.key === " ") {
    controls.lock();
    blocker.style.display = "none";
  }
});

document.addEventListener('click', () =>
{
    if(hoverDoor == false)
    {
        TweenLite.to(
            door.group.position,
            1,
            {
                x: door.group.position.x -0.85,
                z: door.group.position.z -0.85,
                ease: 'Power3.easeInOut'
            }
        )
        TweenLite.to(
            door.group.rotation,
            1,
            {
                y: Math.PI / 2,
                ease: 'Power3.easeInOut'
            }
        )
        bellSound1.currentTime = 0
    } bellSound1.play()
    
})

/**
 * Loop
 */
const loop = () => {
  window.requestAnimationFrame(loop);

  // Cursor raycasting
  const raycasterCursor = new THREE.Vector2(cursor.x * 2, - cursor.y * 2)
  raycaster.setFromCamera(raycasterCursor, camera)

  const intersects = raycaster.intersectObject(door.group, true)
   if(intersects.length)
  {
      hoverDoor = true
  }
  else
  {
      hoverDoor = false
  }

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
  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveRight) - Number(moveLeft);
  direction.normalize();

  /**
   *   Applicate the velocity for direction
   */
  if (moveForward || moveBackward) {
    velocity.z -= direction.z * 100.0 * delta;
  }
  if (moveLeft || moveRight) {
    velocity.x -= direction.x * 100.0 * delta;
  }

  /**
   *  Aplicate the controls and velocity together
   */
  controls.moveRight(-velocity.x * delta);
  controls.moveForward(-velocity.z * delta);

  prevTime = time;

  renderer.render(scene, camera);
};
loop();

window.addEventListener("click", () => {});


// guitare = e / r / t / y / u / i / o 
// piano =  f / g / h / j / k / l
// xylo = x / c / v / b / n / , 
// tambour = a
// contrbasse = 1 / 2 / 3 / 4 / 5 / 6 / 7