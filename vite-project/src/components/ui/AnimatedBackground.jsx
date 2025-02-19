import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const AnimatedBackground = () => {
  const mountRef = useRef(null);
  const [bgColor, setBgColor] = useState("#4defe9"); // Default black

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor); // Set initial background color

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Ensure mountRef exists before appending
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xf000000,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.002;
      particlesMesh.rotation.y += 0.008;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Ensure mountRef.current exists before removing the child
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose(); // Clean up renderer to prevent memory leaks
    };
  }, [bgColor]); // Reacts to color changes

  return (
    <div ref={mountRef} className="absolute inset-0 z-0">
      {/* <button
        onClick={() => setBgColor("#ff0000")}
        className="absolute top-4 left-4 p-2 bg-white"
      >
        Change Background to Red
      </button> */}
      {/* <button
        onClick={() => setBgColor("#0000ff")}
        className="absolute top-4 left-20 p-2 bg-white"
      >
        Change Background to Blue
      </button> */}
    </div>
  );
};

export default AnimatedBackground;
