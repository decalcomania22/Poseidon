import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Earth from "./Earth";
import Stars from "./Stars";
import { getFresnelMat } from "../utils/getFresnelMat";

const CanvasScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    mountRef.current.appendChild(renderer.domElement);

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
    scene.add(earthGroup);

    const controls = new OrbitControls(camera, renderer.domElement);

    Earth(earthGroup);

    const fresnelMat = getFresnelMat();
    const geometry = new THREE.IcosahedronGeometry(1, 12);
    const glowMesh = new THREE.Mesh(geometry, fresnelMat);
    glowMesh.scale.setScalar(1.01);
    earthGroup.add(glowMesh);

    const stars = Stars();
    scene.add(stars);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    const animate = () => {
      requestAnimationFrame(animate);

      earthGroup.rotation.y += 0.002;
      stars.rotation.y -= 0.0002;
      renderer.render(scene, camera);
    };

    animate();

    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default CanvasScene;
