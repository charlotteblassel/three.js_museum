import * as THREE from 'three'
import bricksColorSource from '../assets/bricks/color.jpg'
import bricksNormalSource from '../assets/bricks/normal.jpg'
import bricksAmbientOcclusionSource from '../assets/bricks/ambientOcclusion.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const bricksColorTexture = textureLoader.load(bricksColorSource)
const bricksNormalTexture = textureLoader.load(bricksNormalSource)
const bricksAmbientOcclusionTexture = textureLoader.load(bricksAmbientOcclusionSource)

export default class Walls
{
    constructor(width, positionX, positionY, positionZ, rotationX, rotationY)
    {
        this.group = new THREE.Group()
        this.width = width
        this.positionX = positionX
        this.positionY = positionY
        this.positionZ = positionZ
        this.rotationX = rotationX
        this.rotationY = rotationY
        this.wallMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(this.width, this.width),
            new THREE.MeshStandardMaterial({
                map: bricksColorTexture,
                normalMap: bricksNormalTexture,
                aoMap: bricksAmbientOcclusionTexture,
                side: THREE.DoubleSide
            })
        )
        this.wallMesh.position.x = this.positionX
        this.wallMesh.position.y = this.positionY
        this.wallMesh.position.z = this.positionZ
        this.wallMesh.rotation.x = this.rotationX
        this.wallMesh.rotation.y = this.rotationY
        this.group.add(this.wallMesh)
    }
}