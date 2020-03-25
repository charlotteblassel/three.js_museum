import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Bell
{
    constructor()
    {
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/model/bell/Bell.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                    {
    
                        this.bell = gltf.scene.children[0]
                        this.bell.scale.set(4, 4, 4)
                        this.group.add(this.bell)
                    }
            }
        )
    }
}