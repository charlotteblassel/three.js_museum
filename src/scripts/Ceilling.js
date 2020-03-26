import * as THREE from 'three'

export default class Ceilling
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
        this.ceillingMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(this.x, this.y),
            new THREE.MeshBasicMaterial({
                color: 0xE0CDA9,
                side: THREE.DoubleSide
            })
        )
        this.ceillingMesh.position.x = this.positionX
        this.ceillingMesh.position.z = this.positionZ
        this.ceillingMesh.position.y = this.positionY
        this.ceillingMesh.rotation.x = this.rotationX
        this.ceillingMesh.rotation.y = this.rotationY
        this.group.add(this.ceillingMesh)
    }
}