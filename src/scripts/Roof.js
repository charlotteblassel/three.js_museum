import * as THREE from 'three'
import roofColorSource from '../assets/roof/color.jpg'
import roofNormalSource from '../assets/roof/normal.jpg'
import roofAmbientOcclusionSource from '../assets/roof/ambientOcclusion.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const roofColorTexture = textureLoader.load(roofColorSource)
const roofNormalTexture = textureLoader.load(roofNormalSource)
const roofAmbientOcclusionTexture = textureLoader.load(roofAmbientOcclusionSource)

export default class Roof
{
    constructor(rBase, height, rSeg, positionX, positionY, positionZ, rotationY)
    {
        this.group = new THREE.Group()
        this.rBase = rBase
        this.height = height
        this.rSeg = rSeg
        this.positionX = positionX
        this.positionY = positionY
        this.positionZ = positionZ
        this.rotationY = rotationY
        this.roofMesh = new THREE.Mesh(
            new THREE.ConeGeometry(this.rBase, this.height, this.rSeg),
            new THREE.MeshStandardMaterial({
                map: roofColorTexture,
                normalMap: roofNormalTexture,
                aoMap: roofAmbientOcclusionTexture
            })
        )
        this.roofMesh.position.x = this.positionX
        this.roofMesh.position.y = this.positionY
        this.roofMesh.position.z = this.positionZ
        this.roofMesh.rotation.y = this.rotationY
        this.group.add(this.roofMesh)
    }
}