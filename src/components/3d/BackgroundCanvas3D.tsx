'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BackgroundCanvas3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // Deep Starfield Constellation (450 stars)
    const starCount = 450;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;

      // Subtle gold and warm amber stars with rare soft cyan
      const r = Math.random();
      if (r > 0.7) {
        colors[i * 3] = 0.96;
        colors[i * 3 + 1] = 0.62;
        colors[i * 3 + 2] = 0.04;
      } else if (r > 0.4) {
        colors[i * 3] = 0.6;
        colors[i * 3 + 1] = 0.6;
        colors[i * 3 + 2] = 0.6;
      } else {
        colors[i * 3] = 0.2;
        colors[i * 3 + 1] = 0.4;
        colors[i * 3 + 2] = 0.6;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // Subtle 3D Wireframe Plane Grid at bottom
    const gridHelper = new THREE.GridHelper(180, 45, 0x3f3f46, 0x18181b);
    gridHelper.position.y = -35;
    gridHelper.rotation.x = 0.2;
    scene.add(gridHelper);

    // Scroll parallax tracking
    let targetCameraY = 0;
    let targetCameraRot = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      targetCameraY = -scrollY * 0.015;
      targetCameraRot = scrollY * 0.0002;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mouse movement drift
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 4;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth camera parallax
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;

      starField.rotation.y += 0.0004;
      starField.rotation.x = targetCameraRot;

      gridHelper.rotation.z += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden"
      aria-hidden="true"
    />
  );
}
