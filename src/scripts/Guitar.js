import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Tambourin
{
    constructor()
    {
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/model/tambourin/tamberine.gltf',
            (_gltf) =>
            {
                
                

                this.tambourin = _gltf.scene.children[0].children[1]
                this.tambourin.scale.set(0.45, 0.45, 0.45)
                this.tambourin.material = new THREE.MeshToonMaterial({ map: metalTexture})
                this.tambourin.position.y = 0.08

               

             


                this.group.add(this.tambourin)
            }
        )
    }
}