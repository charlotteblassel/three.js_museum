import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Maracas
{
    constructor()
    {
        this.group = new THREE.Group()

        const gltfLoader = new GLTFLoader()

        gltfLoader.load(
            '/model/maracas/Maracas.gltf',
            (gltf) =>
            {
                while(gltf.scene.children.length)
                    {
    
                        this.maracas = gltf.scene.children[0]
<<<<<<< HEAD
                        this.maracas.scale.set(400, 400, 400)
=======
                        this.maracas.scale.set(10, 10, 10)
>>>>>>> 36336728404dcc77f06d06c8dc0f94949cd35552
                        this.group.add(this.maracas)
                        console.log("pute")                    }
            }
        )
    }
}