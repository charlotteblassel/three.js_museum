import * as THREE from 'three'
import grassColorSource from '../assets/grass/color.jpg'
import grassNormalSource from '../assets/grass/normal.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const grassColorTexture = textureLoader.load(grassColorSource)
grassColorTexture.repeat.x = 8
grassColorTexture.repeat.y = 8
grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
const grassNormalTexture = textureLoader.load(grassNormalSource)
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping

export default class Grounds
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
        this.groundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(this.x, this.y),
            new THREE.MeshStandardMaterial({
                map: grassColorTexture,
                normalMap: grassNormalTexture
            })
        )
        this.groundMesh.position.x = this.positionX
        this.groundMesh.position.z = this.positionZ
        this.groundMesh.position.y = this.positionY
        this.groundMesh.rotation.x = this.rotationX
        this.groundMesh.rotation.y = this.rotationY
        this.group.add(this.groundMesh)
    }
}