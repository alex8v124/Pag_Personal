'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Floater {
  mesh: THREE.Mesh;
  basePos: THREE.Vector3;
  speed: number;
  rotSpeed: THREE.Vector3;
  phase: number;
  amplitude: number;
}

export default function FloatingTechArtifacts() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Ambient Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(amb);

    const dir = new THREE.DirectionalLight(0xfbbf24, 2.5);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    const cyanPoint = new THREE.PointLight(0x38bdf8, 3.0, 30);
    cyanPoint.position.set(-8, -5, 5);
    scene.add(cyanPoint);

    const floaters: Floater[] = [];

    // Metallic Obsidian & Amber Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
    });

    const wireMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      roughness: 0.3,
    });

    const darkChromeMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      emissive: 0x18181b,
      metalness: 0.9,
      roughness: 0.1,
    });

    const emeraldMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.6,
      roughness: 0.3,
      wireframe: false,
    });

    // 1. Database Cylinder (Left side, mid-high)
    const dbGeo = new THREE.CylinderGeometry(0.85, 0.85, 1.5, 24);
    const dbMesh = new THREE.Mesh(dbGeo, darkChromeMat);
    scene.add(dbMesh);
    floaters.push({
      mesh: dbMesh,
      basePos: new THREE.Vector3(-12, 4, -4),
      speed: 1.1,
      rotSpeed: new THREE.Vector3(0.008, 0.015, 0.005),
      phase: 0,
      amplitude: 0.8,
    });

    // 2. Kafka Partition Ring (Right side, upper)
    const ringGeo = new THREE.TorusGeometry(1.2, 0.2, 16, 40);
    const ringMesh = new THREE.Mesh(ringGeo, goldMat);
    scene.add(ringMesh);
    floaters.push({
      mesh: ringMesh,
      basePos: new THREE.Vector3(13, 6, -3),
      speed: 0.9,
      rotSpeed: new THREE.Vector3(0.012, 0.008, 0.014),
      phase: 1.5,
      amplitude: 1.1,
    });

    // 3. Tech Octahedron (Left side, lower)
    const octaGeo = new THREE.OctahedronGeometry(1.1);
    const octaMesh = new THREE.Mesh(octaGeo, wireMat);
    scene.add(octaMesh);
    floaters.push({
      mesh: octaMesh,
      basePos: new THREE.Vector3(-14, -6, -5),
      speed: 1.3,
      rotSpeed: new THREE.Vector3(0.01, 0.012, 0.008),
      phase: 3.0,
      amplitude: 0.9,
    });

    // 4. Microservices Hexagon Prism (Right side, lower-mid)
    const hexGeo = new THREE.CylinderGeometry(1.0, 1.0, 0.8, 6);
    const hexMesh = new THREE.Mesh(hexGeo, emeraldMat);
    scene.add(hexMesh);
    floaters.push({
      mesh: hexMesh,
      basePos: new THREE.Vector3(12.5, -4, -4),
      speed: 0.8,
      rotSpeed: new THREE.Vector3(0.006, 0.014, 0.009),
      phase: 4.5,
      amplitude: 0.7,
    });

    // 5. Icosahedron Diamond (Center-right, deep back)
    const icoGeo = new THREE.IcosahedronGeometry(1.3);
    const icoMesh = new THREE.Mesh(icoGeo, goldMat);
    scene.add(icoMesh);
    floaters.push({
      mesh: icoMesh,
      basePos: new THREE.Vector3(9, -10, -8),
      speed: 1.0,
      rotSpeed: new THREE.Vector3(0.007, 0.009, 0.011),
      phase: 2.2,
      amplitude: 1.2,
    });

    // Parallax tracking
    const mouse = { x: 0, y: 0 };
    const scroll = { y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scroll.y = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Camera responds subtly to mouse parallax
      camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;

      // Update floaters
      floaters.forEach((f) => {
        // Harmonic floating
        const yOffset = Math.sin(time * f.speed + f.phase) * f.amplitude;
        const xOffset = Math.cos(time * f.speed * 0.7 + f.phase) * (f.amplitude * 0.4);

        // Scroll influence
        const scrollFactor = (scroll.y * 0.002) % 6;

        f.mesh.position.x = f.basePos.x + xOffset;
        f.mesh.position.y = f.basePos.y + yOffset - scrollFactor;
        f.mesh.position.z = f.basePos.z;

        f.mesh.rotation.x += f.rotSpeed.x;
        f.mesh.rotation.y += f.rotSpeed.y;
        f.mesh.rotation.z += f.rotSpeed.z;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      dbGeo.dispose();
      ringGeo.dispose();
      octaGeo.dispose();
      hexGeo.dispose();
      icoGeo.dispose();
      goldMat.dispose();
      wireMat.dispose();
      darkChromeMat.dispose();
      emeraldMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-75"
    />
  );
}
