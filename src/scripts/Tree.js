import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Tree
{
    constructor()
    {
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/model/tree/PineTree.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                    {
    
                        this.tree = gltf.scene.children[0]
                        this.tree.scale.set(0.24, 0.24, 0.24)
                        this.group.add(this.tree)
                    }
            }
        )
    }
}