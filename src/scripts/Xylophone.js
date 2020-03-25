import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Xylophone
{
    constructor()
    {
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/model/xylophone/model.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                    {
    
                        this.xylophone = gltf.scene.children[0]
                        this.xylophone.scale.set(0.4, 0.4, 0.4)
                        this.group.add(this.xylophone)
                    }
            }
        )
    }
}