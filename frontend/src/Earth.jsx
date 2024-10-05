import * as THREE from "three";

const Earth = (earthGroup) => {
  const loader = new THREE.TextureLoader();

  const detail = 12;
  const geometry = new THREE.IcosahedronGeometry(1, detail);

  const material = new THREE.MeshPhongMaterial({
    map: loader.load("./textures/00_earthmap1k.jpg"),
    specularMap: loader.load("./textures/02_earthspec1k.jpg"),
    bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
    bumpScale: 0.04,
  });

  const earthMesh = new THREE.Mesh(geometry, material);

  earthMesh.scale.set(3.2, 3.2, 3.2);
  earthGroup.add(earthMesh);

  const lightsMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/03_earthlights1k.jpg"),
    blending: THREE.AdditiveBlending,
  });

  const lightsMesh = new THREE.Mesh(geometry, lightsMaterial);
  lightsMesh.scale.set(3.2, 3.2, 3.2);
  earthGroup.add(lightsMesh);
};

export default Earth;