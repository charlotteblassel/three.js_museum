import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import metalSource from '../assets/metal/metalSkin.jpg'
import tissuSource from '../assets/tissus/tissusSkin.jpg'
import woodSource from '../assets/wood/wood.jpg'


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
                        this.tambourin.scale.set(0.2, 0.2, 0.2)
                        this.group.add(this.tambourin)
                    }
            }
        )
    }
}