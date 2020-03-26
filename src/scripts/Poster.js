import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Poster
{
    constructor()
    {
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/model/poster/Rock_Band_Poster_01.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                    {
    
                        this.poster = gltf.scene.children[0]
                        this.poster.scale.set(0.15, 0.15, 0.15)
                        this.group.add(this.poster)
                    }
            }
        )
    }
}