import * as THREE from 'three'
import floorColorSource from '../assets/floor/color.jpg'
import floorNormalSource from '../assets/floor/normal.png'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const floorColorTexture = textureLoader.load(floorColorSource)
floorColorTexture.repeat.x = 2
floorColorTexture.repeat.y = 2
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
const floorNormalTexture = textureLoader.load(floorNormalSource)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

export default class Floor
{
    constructor(x, y, positionX, positionY, positionZ, rotationX, rotationY)
    {
        this.group = new THREE.Group()
        this.x = x
        this.y = y
        this.positionX = positionX
        this.positionY = positionY
        this.positionZ = positionZ
        this.rotationX = rotationX
        this.rotationY = rotationY
        this.floorMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(this.x, this.y),
            new THREE.MeshStandardMaterial({
                map: floorColorTexture,
                normalMap: floorNormalTexture
                // wireframe:true
            })
        )
        this.floorMesh.position.x = this.positionX
        this.floorMesh.position.z = this.positionZ
        this.floorMesh.position.y = this.positionY
        this.floorMesh.rotation.x = this.rotationX
        this.floorMesh.rotation.y = this.rotationY
        this.group.add(this.floorMesh)
    }
}