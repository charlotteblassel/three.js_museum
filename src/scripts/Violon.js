import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Violin
{
    constructor()
    {
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/model/violin/Violin.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                    {
    
                        this.violin = gltf.scene.children[0]
                        this.violin.scale.set(4, 4, 4)
                        this.violin.material = new THREE.MeshNormalMaterial()
                        this.group.add(this.violin)
                    }
            }
        )
    }
}