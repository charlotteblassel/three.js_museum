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
            (gltf) =>
            {
                while(gltf.scene.children.length)
                    {
    
                        this.tambourin = gltf.scene.children[0]
                        this.tambourin.scale.set(0.3, 0.3, 0.3)
                        this.group.add(this.tambourin)
                    }
            }
        )
    }
}