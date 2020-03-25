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
            (_gltf) =>
            {
                const textureLoader = new THREE.TextureLoader()
                const tissuTexture = textureLoader.load(tissuSource)
                const metalTexture = textureLoader.load(metalSource)
                const woodTexture = textureLoader.load(woodSource)
                

                this.tambourin = _gltf.scene.children[0].children[1]
                this.tambourin.scale.set(0.45, 0.45, 0.45)
                this.tambourin.material = new THREE.MeshToonMaterial({ map: metalTexture})
                this.tambourin.position.y = 0.08

                const headOfTambourinGeometry = new THREE.CylinderGeometry( 0.4, 0.4, 0.002, 32);
                const headOfTambourinMaterial = new THREE.MeshStandardMaterial({side: THREE.DoubleSide, map: tissuTexture })
                const headOfTambour = new THREE.Mesh(headOfTambourinGeometry, headOfTambourinMaterial)
                headOfTambour.position.y = 0.1

                const cirlcedgeometry = new THREE.CylinderGeometry( 0.4, 0.4, 0.2, 32);
                const circleMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, map: woodTexture})
                const bodyMesh = new THREE.Mesh(cirlcedgeometry, circleMaterial)

                
                const secondCircleGeometry = new THREE.CylinderGeometry( 0.406, 0.406, 0.002, 32);
                const secondCircleMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide} );
                const circle = new THREE.Mesh( secondCircleGeometry, secondCircleMaterial );
                circle.rotation.x = Math.PI *2
                circle.position.y = 0.08


                this.group.add(this.tambourin)
                this.group.add(bodyMesh)
                this.group.add(headOfTambour)
                this.group.add( circle )
            }
        )
    }
}