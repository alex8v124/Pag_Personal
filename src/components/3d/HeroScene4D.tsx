'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Rotate3D, Layers, Eye } from 'lucide-react';

type GeometryMode = 'tesseract' | 'torus' | 'icosahedron';

export default function HeroScene4D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState<GeometryMode>('tesseract');
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Store mode in ref for animation loop
  const modeRef = useRef<GeometryMode>('tesseract');
  useEffect(() => {
    modeRef.current = currentMode;
  }, [currentMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all 3D/4D objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- 1. TESSERACT 4D SETUP ---
    // 16 vertices of a 4D hypercube (±1, ±1, ±1, ±1)
    const base4DVertices: number[][] = [];
    for (let i = 0; i < 16; i++) {
      base4DVertices.push([
        (i & 1 ? 1 : -1) * 0.9,
        (i & 2 ? 1 : -1) * 0.9,
        (i & 4 ? 1 : -1) * 0.9,
        (i & 8 ? 1 : -1) * 0.9,
      ]);
    }

    // 32 edges of a hypercube
    const tesseractEdges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        // Connect if vertices differ in exactly 1 coordinate
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (base4DVertices[i][k] !== base4DVertices[j][k]) diff++;
        }
        if (diff === 1) {
          tesseractEdges.push([i, j]);
        }
      }
    }

    // Tesseract Three.js Lines
    const tesseractLinePositions = new Float32Array(tesseractEdges.length * 2 * 3);
    const tesseractGeometry = new THREE.BufferGeometry();
    tesseractGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(tesseractLinePositions, 3)
    );

    const tesseractMaterial = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const tesseractLines = new THREE.LineSegments(tesseractGeometry, tesseractMaterial);
    mainGroup.add(tesseractLines);

    // Vertex points (spheres)
    const vertexPointsGeometry = new THREE.BufferGeometry();
    const vertexPointsPositions = new Float32Array(16 * 3);
    vertexPointsGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(vertexPointsPositions, 3)
    );
    const vertexPointsMaterial = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.16,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const tesseractPoints = new THREE.Points(vertexPointsGeometry, vertexPointsMaterial);
    mainGroup.add(tesseractPoints);

    // --- 2. QUANTUM TORUS KNOT SETUP ---
    const torusGeometry = new THREE.TorusKnotGeometry(1.2, 0.35, 120, 16, 2, 3);
    const torusWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const torusKnot = new THREE.Mesh(torusGeometry, torusWireMaterial);
    torusKnot.visible = false;
    mainGroup.add(torusKnot);

    // --- 3. DUAL ICOSAHEDRON CORE SETUP ---
    const icoOuterGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icoOuterMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const icoOuter = new THREE.Mesh(icoOuterGeo, icoOuterMat);

    const icoInnerGeo = new THREE.OctahedronGeometry(0.9, 0);
    const icoInnerMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const icoInner = new THREE.Mesh(icoInnerGeo, icoInnerMat);
    const icosaGroup = new THREE.Group();
    icosaGroup.add(icoOuter);
    icosaGroup.add(icoInner);
    icosaGroup.visible = false;
    mainGroup.add(icosaGroup);

    // --- 4. FLOATING PARTICLE NEBULA (300 particles) ---
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      // Gold and Cyan hues
      if (Math.random() > 0.4) {
        particleColors[i * 3] = 0.96; // R (Amber)
        particleColors[i * 3 + 1] = 0.62; // G
        particleColors[i * 3 + 2] = 0.04; // B
      } else {
        particleColors[i * 3] = 0.22; // R (Cyan)
        particleColors[i * 3 + 1] = 0.74; // G
        particleColors[i * 3 + 2] = 0.97; // B
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleField);

    // --- INTERACTIVE MOUSE & DRAG LOGIC ---
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const mouseNormal = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNormal.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNormal.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        targetRotation.y += deltaX * 0.01;
        targetRotation.x += deltaY * 0.01;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    // Scroll acceleration
    let scrollBoost = 0;
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastScrollY);
      scrollBoost = Math.min(scrollBoost + dy * 0.003, 0.08);
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMousePos.x;
        const deltaY = e.touches[0].clientY - prevMousePos.y;
        targetRotation.y += deltaX * 0.012;
        targetRotation.x += deltaY * 0.012;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
      setIsInteracting(false);
    };
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let angle4D_XW = 0;
    let angle4D_YZ = 0;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.015;

      // Exponential decay for scroll boost
      scrollBoost *= 0.95;
      const currentSpeed = 0.012 + scrollBoost;

      // 4D Rotation Angles (Hyper-rotation in 4D space)
      angle4D_XW += currentSpeed * 1.4;
      angle4D_YZ += currentSpeed * 0.9;

      // Smooth inertia on user drag
      mainGroup.rotation.x += (targetRotation.x - mainGroup.rotation.x) * 0.08;
      mainGroup.rotation.y += (targetRotation.y - mainGroup.rotation.y) * 0.08;

      // Ambient subtle drift influenced by mouse
      mainGroup.rotation.x += mouseNormal.y * 0.005;
      mainGroup.rotation.y += mouseNormal.x * 0.005;

      // Rotate particle nebula
      particleField.rotation.y += 0.002;
      particleField.rotation.x = Math.sin(time * 0.3) * 0.1;

      const activeMode = modeRef.current;

      // Update visibilities
      tesseractLines.visible = activeMode === 'tesseract';
      tesseractPoints.visible = activeMode === 'tesseract';
      torusKnot.visible = activeMode === 'torus';
      icosaGroup.visible = activeMode === 'icosahedron';

      // MODE 1: Compute 4D Hyper-Tesseract Stereographic Projection
      if (activeMode === 'tesseract') {
        const cosA = Math.cos(angle4D_XW);
        const sinA = Math.sin(angle4D_XW);
        const cosB = Math.cos(angle4D_YZ);
        const sinB = Math.sin(angle4D_YZ);

        // Project 16 4D vertices into 3D
        const projected3D: [number, number, number][] = [];
        const distance4D = 2.2; // 4D camera distance for perspective

        for (let i = 0; i < 16; i++) {
          let [x, y, z, w] = base4DVertices[i];

          // 4D Plane rotation X-W
          const x1 = x * cosA - w * sinA;
          const w1 = x * sinA + w * cosA;

          // 4D Plane rotation Y-Z
          const y1 = y * cosB - z * sinB;
          const z1 = y * sinB + z * cosB;

          // Stereographic 4D -> 3D projection
          const factor = distance4D / (distance4D - w1);
          const px = x1 * factor;
          const py = y1 * factor;
          const pz = z1 * factor;

          projected3D.push([px, py, pz]);

          // Update vertex point position
          vertexPointsPositions[i * 3] = px;
          vertexPointsPositions[i * 3 + 1] = py;
          vertexPointsPositions[i * 3 + 2] = pz;
        }

        // Update 32 edge line positions
        let lineIdx = 0;
        for (let e = 0; e < tesseractEdges.length; e++) {
          const [u, v] = tesseractEdges[e];
          const p1 = projected3D[u];
          const p2 = projected3D[v];

          tesseractLinePositions[lineIdx++] = p1[0];
          tesseractLinePositions[lineIdx++] = p1[1];
          tesseractLinePositions[lineIdx++] = p1[2];

          tesseractLinePositions[lineIdx++] = p2[0];
          tesseractLinePositions[lineIdx++] = p2[1];
          tesseractLinePositions[lineIdx++] = p2[2];
        }

        tesseractGeometry.attributes.position.needsUpdate = true;
        vertexPointsGeometry.attributes.position.needsUpdate = true;
      } else if (activeMode === 'torus') {
        torusKnot.rotation.x += currentSpeed * 1.5;
        torusKnot.rotation.y += currentSpeed * 2.0;
        torusKnot.rotation.z += currentSpeed * 0.8;
      } else if (activeMode === 'icosahedron') {
        icoOuter.rotation.x += currentSpeed * 1.2;
        icoOuter.rotation.y += currentSpeed * 1.5;
        icoInner.rotation.x -= currentSpeed * 2.0;
        icoInner.rotation.z -= currentSpeed * 1.8;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      tesseractGeometry.dispose();
      tesseractMaterial.dispose();
      vertexPointsGeometry.dispose();
      vertexPointsMaterial.dispose();
      torusGeometry.dispose();
      torusWireMaterial.dispose();
      icoOuterGeo.dispose();
      icoOuterMat.dispose();
      icoInnerGeo.dispose();
      icoInnerMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      className="relative w-full max-w-[480px] h-[440px] sm:h-[480px] mx-auto flex flex-col items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas WebGL Mount */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Arrastra con el ratón o el dedo para rotar en 3D/4D"
      />

      {/* Floating Holographic Ring Underneath */}
      <div className="absolute inset-x-8 bottom-4 h-24 bg-gradient-to-t from-amber-500/15 to-transparent blur-2xl rounded-full pointer-events-none -z-10" />

      {/* Interactive Mode Controls Bar */}
      <div className="absolute -bottom-3 sm:bottom-0 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/90 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => setCurrentMode('tesseract')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 ${
            currentMode === 'tesseract'
              ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/30'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
          }`}
          aria-label="Ver Hipercubo 4D Tesseract"
        >
          <Rotate3D className="w-3.5 h-3.5" />
          <span>4D Tesseract</span>
        </button>

        <button
          onClick={() => setCurrentMode('torus')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 ${
            currentMode === 'torus'
              ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/30'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
          }`}
          aria-label="Ver Quantum Torus"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Torus Cuántico</span>
        </button>

        <button
          onClick={() => setCurrentMode('icosahedron')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 ${
            currentMode === 'icosahedron'
              ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/30'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
          }`}
          aria-label="Ver Dual Icosahedron"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Núcleo Dual</span>
        </button>
      </div>

      {/* Interactive Helper Hint */}
      <div
        className={`absolute top-2 right-4 text-[10px] font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-2.5 py-1 rounded-md backdrop-blur-md transition-opacity duration-300 pointer-events-none z-20 ${
          isInteracting ? 'opacity-100' : isHovered ? 'opacity-90' : 'opacity-60'
        }`}
      >
        <span className="text-amber-400 font-bold">●</span> {isInteracting ? 'Rotando en 4D' : 'Arrastra para rotar 3D'}
      </div>
    </div>
  );
}
