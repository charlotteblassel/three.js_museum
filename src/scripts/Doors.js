import * as THREE from 'three'
import doorColorSource from '../assets/door/color.jpg'
import doorAmbientOcclusionSource from '../assets/door/ambientOcclusion.jpg'
import doorHeightSource from '../assets/door/height.png'
import doorMetalnessSource from '../assets/door/metalness.jpg'
import doorNormalSource from '../assets/door/normal.jpg'
import doorAlphaSource from '../assets/door/alpha.jpg'
import doorRoughnessSource from '../assets/door/roughness.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load(doorColorSource)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionSource)
const doorHeightTexture = textureLoader.load(doorHeightSource)
const doorMetalnessTexture = textureLoader.load(doorMetalnessSource)
const doorNormalTexture = textureLoader.load(doorNormalSource)
const doorAlphaTexture = textureLoader.load(doorAlphaSource)
const doorRoughnessTexture = textureLoader.load(doorRoughnessSource)

export default class Doors
{
    constructor(x, y, z, positionX, positionY, positionZ)
    {
        this.group = new THREE.Group()
        this.x = x
        this.y = y
        this.z = z
        this.positionX = positionX
        this.positionY = positionY
        this.positionZ = positionZ
        this.doorMesh = new THREE.Mesh(
            new THREE.BoxGeometry(this.x, this.y, this.z),
            new THREE.MeshStandardMaterial({
                map: doorColorTexture,
                normalMap: doorNormalTexture,
                aoMap: doorAmbientOcclusionTexture,
                metalnessMap: doorMetalnessTexture,
                roughnessMap: doorRoughnessTexture,
                alphaMap: doorAlphaTexture,
                transparent: false
            })
        )
        this.doorMesh.position.x = this.positionX
        this.doorMesh.position.z = this.positionZ
        this.doorMesh.position.y = this.positionY
        this.group.add(this.doorMesh)
    }
}