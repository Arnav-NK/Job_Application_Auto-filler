import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const AnimatedBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    // Early return if no mount point
    if (!mountRef.current) return;

    // Create scene only once
    if (sceneRef.current) return;

    // Reuse textures
    const particleTexture = createCircleTexture(16);
    const gradientTexture = createGradientTexture(128);

    // Setup renderer with better performance settings
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // Limit pixel ratio

    mountRef.current.appendChild(renderer.domElement);

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera with reasonable near/far planes
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.5,
      50
    );
    camera.position.z = 5;

    // Background with simple geometry
    const aspect = window.innerWidth / window.innerHeight;
    const bgGeometry = new THREE.PlaneGeometry(20 * aspect, 20);
    const bgMaterial = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: gradientTexture,
    });
    const bgPlane = new THREE.Mesh(bgGeometry, bgMaterial);
    bgPlane.position.z = -5;
    scene.add(bgPlane);

    // Reduce particle count based on device performance
    const isMobile = window.innerWidth < 768;
    const particlesCount = isMobile ? 300 : 600;

    // More efficient particle setup
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);

    // Create particles in a more limited space for better visibility
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const r = Math.random() * 6; // Smaller radius
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      posArray[i] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = r * Math.cos(phi);
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    // Optimize particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.12 : 0.1,
      map: particleTexture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false, // Improves rendering performance
      color: 0xffffff,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Use animation frame timing to maintain consistent animation speed
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      particlesMesh.rotation.y += 0.1 * delta; // Constant rotation speed regardless of framerate

      renderer.render(scene, camera);
    };

    // Handle window resize efficiently with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // Update background plane aspect ratio
        const newAspect = width / height;
        bgPlane.scale.set(newAspect, 1, 1);
      }, 250); // Debounce time
    };

    window.addEventListener("resize", handleResize);
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      bgGeometry.dispose();
      bgMaterial.dispose();
      particleTexture.dispose();
      gradientTexture.dispose();

      sceneRef.current = null;
    };
  }, []);

  // Utility functions for creating textures
  function createCircleTexture(size = 16) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");

    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  function createGradientTexture(size = 128) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");

    const gradient = context.createLinearGradient(0, size, size, 0);
    gradient.addColorStop(0, "rgba(102, 153, 204, 0.9)");
    gradient.addColorStop(0.3, "rgba(102, 204, 102, 0.8)");
    gradient.addColorStop(0.7, "rgba(153, 102, 153, 0.7)");
    gradient.addColorStop(1, "rgba(192, 192, 192, 0)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

export default AnimatedBackground;
