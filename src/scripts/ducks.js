import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Duck
{
    constructor()
    {
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/model/duck/glTF/Duck.gltf',
            (_gltf) =>
            {
                this.duck = _gltf.scene.children[0].children[1]
                this.duck.scale.set(0.01, 0.01, 0.01)
                this.duck.material = new THREE.MeshNormalMaterial()
                this.group.add(this.duck)
            }
        )
    }
}