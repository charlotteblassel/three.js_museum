import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Guitar
{
    constructor()
    {
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/model/guitar/Washburn Guitar.gltf',
            (_gltf) =>
            {
                
                

                this.guitar = _gltf.scene.children[0].children[1]
                this.guitar.scale.set(0.45, 0.45, 0.45)
                this.guitar.material = new THREE.MeshNormalMaterial()
                this.guitar.position.y = 0.08

               

             


                this.group.add(this.guitar)
            }
        )
    }
}