import * as THREE from "three";

export default class Bases {
  constructor(rTop, rBot, height, rSeg, positionX, positionY, positionZ) {
    this.group = new THREE.Group();
    this.rTop = rTop;
    this.rBot = rBot;
    this.height = height;
    this.rSeg = rSeg;
    this.positionX = positionX;
    this.positionY = positionY;
    this.positionZ = positionZ;
    this.baseMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(this.rTop, this.rBot, this.height, this.rSeg),
      new THREE.MeshStandardMaterial({ color: 0x878787 })
    );
    this.baseMesh.position.x = this.positionX;
    this.baseMesh.position.z = this.positionZ;
    this.baseMesh.position.y = this.positionY;
    this.group.add(this.baseMesh);
  }
}
