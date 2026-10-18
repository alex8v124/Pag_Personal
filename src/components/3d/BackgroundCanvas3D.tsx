'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BackgroundCanvas3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.012);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Position camera to view the wave terrain at an angle
    camera.position.set(0, 18, 38);
    camera.lookAt(0, -2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- 1. DYNAMIC FLUID WAVE PARTICLE MATRIX ---
    // Grid: 65 columns x 65 rows = 4225 nodes
    const cols = 65;
    const rows = 65;
    const totalParticles = cols * rows;
    const separation = 1.35;

    const basePositions = new Float32Array(totalParticles * 3);
    const dynamicPositions = new Float32Array(totalParticles * 3);
    const particleColors = new Float32Array(totalParticles * 3);
    const particleSizes = new Float32Array(totalParticles);

    const offsetX = ((cols - 1) * separation) / 2;
    const offsetZ = ((rows - 1) * separation) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const x = c * separation - offsetX;
        const y = -6;
        const z = r * separation - offsetZ;

        basePositions[i * 3] = x;
        basePositions[i * 3 + 1] = y;
        basePositions[i * 3 + 2] = z;

        dynamicPositions[i * 3] = x;
        dynamicPositions[i * 3 + 1] = y;
        dynamicPositions[i * 3 + 2] = z;

        // Radial distance from center for color grading
        const distFromCenter = Math.sqrt(x * x + z * z);
        const ratio = Math.min(distFromCenter / 45, 1);

        // Core is glowing gold/amber (#f59e0b), fading to deep bronze and dark slate at periphery
        particleColors[i * 3] = THREE.MathUtils.lerp(0.98, 0.35, ratio); // R
        particleColors[i * 3 + 1] = THREE.MathUtils.lerp(0.68, 0.25, ratio); // G
        particleColors[i * 3 + 2] = THREE.MathUtils.lerp(0.12, 0.15, ratio); // B

        particleSizes[i] = THREE.MathUtils.lerp(2.2, 0.8, ratio);
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute('position', new THREE.BufferAttribute(dynamicPositions, 3));
    waveGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Custom Canvas Texture for smooth circular glowing particles
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(251, 191, 36, 0.8)');
        grad.addColorStop(0.7, 'rgba(245, 158, 11, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    const waveMaterial = new THREE.PointsMaterial({
      size: 1.5,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(wavePoints);

    // --- 2. FLOATING ATMOSPHERIC LIGHT DUST (180 particles) ---
    const dustCount = 180;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 80;
      dustPositions[i * 3 + 1] = Math.random() * 35 - 5;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 70;

      dustColors[i * 3] = 0.98;
      dustColors[i * 3 + 1] = 0.72;
      dustColors[i * 3 + 2] = 0.2;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 2.0,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dustField = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustField);

    // --- 3. AMBIENT GLOW LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 2.5, 90);
    goldLight.position.set(0, 15, 10);
    scene.add(goldLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 1.2, 80);
    cyanLight.position.set(-25, 10, -10);
    scene.add(cyanLight);

    // --- 4. INTERACTION STATE & LISTENERS ---
    const mouse = { x: 0, y: 0, worldX: 0, worldZ: 0 };
    let scrollY = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const onMouseMove = (e: MouseEvent) => {
      // Normalized coordinates (-1 to 1)
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Unproject to approximate wave plane intersection
      mouse.worldX = mouse.x * 35;
      mouse.worldZ = -mouse.y * 25 + 5;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      const delta = Math.abs(scrollY - lastScrollY);
      scrollVelocity = Math.min(scrollVelocity + delta * 0.008, 0.12);
      lastScrollY = scrollY;
    };

    const onResize = () => {
      if (!mount) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Touch interaction for mobile
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        mouse.worldX = mouse.x * 30;
        mouse.worldZ = -mouse.y * 20 + 5;
      }
    };
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // --- 5. ANIMATION LOOP ---
    let animationId: number;
    let clockTime = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Decay scroll velocity smoothly
      scrollVelocity *= 0.95;
      const speed = 0.02 + scrollVelocity;
      clockTime += speed;

      // Camera responds with smooth parallax to scroll and mouse
      const targetCamY = 18 - (scrollY * 0.008);
      const targetCamZ = 38 - (scrollY * 0.004);
      const targetCamX = mouse.x * 5;

      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.lookAt(mouse.x * 2, -2 - (scrollY * 0.005), 0);

      // Light drifts slightly
      goldLight.position.x = Math.sin(clockTime * 0.5) * 15;
      goldLight.position.z = Math.cos(clockTime * 0.5) * 12 + 5;

      // Update fluid wave mathematics
      const positions = dynamicPositions;
      const mouseRange = 16; // influence radius in world units
      const mouseRangeSq = mouseRange * mouseRange;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const bx = basePositions[i * 3];
          const bz = basePositions[i * 3 + 2];

          // Complex organic wave: 3 sine/cosine waves interference
          const wave1 = Math.sin(bx * 0.14 + clockTime * 1.6);
          const wave2 = Math.cos(bz * 0.18 + clockTime * 1.3);
          const wave3 = Math.sin((bx + bz) * 0.1 + clockTime * 0.8) * 0.8;
          let waveHeight = (wave1 + wave2 + wave3) * 2.2;

          // Interactive Mouse Ripple / Gravity Field
          const dx = bx - mouse.worldX;
          const dz = bz - mouse.worldZ;
          const distSq = dx * dx + dz * dz;

          if (distSq < mouseRangeSq) {
            const factor = 1 - Math.sqrt(distSq) / mouseRange;
            // Elevates and pulses particles near the mouse
            waveHeight += factor * factor * 5.0 * Math.sin(clockTime * 4 + factor * 6);
          }

          positions[i * 3 + 1] = basePositions[i * 3 + 1] + waveHeight;
        }
      }

      waveGeometry.attributes.position.needsUpdate = true;

      // Drift atmospheric dust
      const dust = dustPositions;
      for (let d = 0; d < dustCount; d++) {
        dust[d * 3 + 1] += Math.sin(clockTime + d) * 0.015;
        dust[d * 3] += Math.cos(clockTime * 0.5 + d) * 0.01;
      }
      dustGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('touchmove', onTouchMove);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      particleTexture.dispose();
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
