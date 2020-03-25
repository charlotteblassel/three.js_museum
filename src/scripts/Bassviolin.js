import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Bassviolin
{
    constructor()
    {
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/model/bassviolin/BassBase.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                    {
    
                        this.bassviolin = gltf.scene.children[0]
                        this.bassviolin.scale.set(1, 1, 1)
                        this.group.add(this.bassviolin)
                    }
            }
        )
    }
}