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
            (gltf) =>
            {
                while(gltf.scene.children.length)
                    {
    
                        this.guitar = gltf.scene.children[0]
                        this.guitar.scale.set(0.05, 0.05, 0.05)
                        this.group.add(this.guitar)
                    }
            }
        )
    }
}



