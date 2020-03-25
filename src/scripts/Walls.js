import * as THREE from 'three'
import bricksColorSource from '../assets/bricks/color.jpg'
import bricksNormalSource from '../assets/bricks/normal.png'
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
    constructor(x, y, z, positionX, positionY, positionZ, rotationY)
    {
        this.group = new THREE.Group()
        this.x = x
        this.y = y
        this.z = z
        this.positionX = positionX
        this.positionY = positionY
        this.positionZ = positionZ
        this.rotationY = rotationY
        this.wallMesh = new THREE.Mesh(
            new THREE.BoxGeometry(this.x, this.y, this.z),
            new THREE.MeshStandardMaterial({
                map: bricksColorTexture,
                normalMap: bricksNormalTexture,
                aoMap: bricksAmbientOcclusionTexture
            })
        )
        this.wallMesh.position.x = this.positionX
        this.wallMesh.position.z = this.positionZ
        this.wallMesh.position.y = this.positionY
        this.wallMesh.rotation.y = this.rotationY
        this.group.add(this.wallMesh)
    }
}