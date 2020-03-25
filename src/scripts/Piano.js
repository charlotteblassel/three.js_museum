import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Piano
{
    constructor()
    {
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/model/piano/Piano_01.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                    {
    
                        this.piano = gltf.scene.children[0]
                        this.piano.scale.set(4, 4, 4)
                        this.group.add(this.piano)
                    }
            }
        )
    }
}