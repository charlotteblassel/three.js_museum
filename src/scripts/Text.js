import * as THREE from 'three'
import font from '../font/ft78_Regular.json'

export default class Text
{
    constructor(string, size, height, positionX, positionY, positionZ, rotationY)
    {
        this.group = new THREE.Group()
        this.string = string
        this.size = size
        this.height = height
        this.positionX = positionX
        this.positionY = positionY
        this.positionZ = positionZ
        this.rotationY = rotationY
        this.entryText = new THREE.Mesh(
            new THREE.TextGeometry(`${this.string}`,
            {
                font: new THREE.Font(font),
                size: this.size,
                height: this.height,
                curveSegments: 8,
                bevelEnabled: false
            }),
            new THREE.MeshStandardMaterial({
                color: 0xff0000
            })
            )
            this.entryText.position.x = this.positionX
            this.entryText.position.y = this.positionY
            this.entryText.position.z = this.positionZ
            this.entryText.rotation.y = this.rotationY
            this.group.add(this.entryText)
        }
    }