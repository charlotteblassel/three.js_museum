import * as THREE from 'three'
import doorColorImageSource from '../assets/door/color.jpg'
import doorAmbientOcclusionImageSource from '../assets/door/ambientOcclusion.jpg'
import doorHeightImageSource from '../assets/door/height.png'
import doorMetalnessImageSource from '../assets/door/metalness.jpg'
import doorNormalImageSource from '../assets/door/normal.jpg'
import doorAlphaImageSource from '../assets/door/alpha.jpg'
import doorColorRoughnessSource from '../assets/door/roughness.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load(doorColorImageSource)
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusionImageSource)
const doorHeightTexture = textureLoader.load(doorHeightImageSource)
const doorMetalnessTexture = textureLoader.load(doorMetalnessImageSource)
const doorNormalTexture = textureLoader.load(doorNormalImageSource)
const doorAlphaTexture = textureLoader.load(doorAlphaImageSource)
const doorColorRoughnessTexture = textureLoader.load(doorColorRoughnessSource)

export default class Doors
{
    constructor(x, y, positionX, positionY, positionZ, rotationY)
    {
        this.group = new THREE.Group()
        this.x = x
        this.y = y
        this.positionX = positionX
        this.positionY = positionY
        this.positionZ = positionZ
        this.rotationY = rotationY
        this.doorMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(this.x, this.y, 10, 10),
            new THREE.MeshStandardMaterial({
                map: doorColorTexture,
                // aoMap: doorAmbientOcclusionTexture,
                displacementMap: doorHeightTexture,
                displacementScale: 0.2,
                metalnessMap: doorMetalnessTexture,
                roughnessMap: doorColorRoughnessTexture,
                normalMap: doorNormalTexture,
                alphaMap: doorAlphaTexture,
                transparent: true,
                side: THREE.DoubleSide
            })
        )
        this.doorMesh.position.x = this.positionX
        this.doorMesh.position.z = this.positionZ
        this.doorMesh.position.y = this.positionY
        this.doorMesh.rotation.y = this.rotationY
        this.group.add(this.doorMesh)
    }
}