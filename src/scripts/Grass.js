import * as THREE from 'three'
import grassColorSource from '../assets/grass/color.jpg'
import grassNormalSource from '../assets/grass/normal.jpg'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const grassColorTexture = textureLoader.load(grassColorSource)
grassColorTexture.repeat.x = 2
grassColorTexture.repeat.y = 2
grassColorTexture.wrapS = THREE.RepeatWrapping
grassColorTexture.wrapT = THREE.RepeatWrapping
const grassNormalTexture = textureLoader.load(grassNormalSource)
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping

export default class Grass
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
        this.grassMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(this.x, this.y),
            new THREE.MeshStandardMaterial({
                map: grassColorTexture,
                normalMap: grassNormalTexture
            })
        )
        this.grassMesh.position.x = this.positionX
        this.grassMesh.position.z = this.positionZ
        this.grassMesh.position.y = this.positionY
        this.grassMesh.rotation.x = this.rotationX
        this.grassMesh.rotation.y = this.rotationY
        this.group.add(this.grassMesh)
    }
}