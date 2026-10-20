'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Code2, Network, Box, Sparkles, RefreshCw } from 'lucide-react';

const PARTICLE_COUNT = 8000;

// Rejection & parametric shape sampling functions
function generateShapePoints() {
  const chip = new Float32Array(PARTICLE_COUNT * 3);
  const code = new Float32Array(PARTICLE_COUNT * 3);
  const network = new Float32Array(PARTICLE_COUNT * 3);
  const tesseract = new Float32Array(PARTICLE_COUNT * 3);
  const rands = new Float32Array(PARTICLE_COUNT);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  // Palette: Gold, Cyan, Emerald, White
  const colorPalette = [
    new THREE.Color('#f59e0b'), // Amber gold
    new THREE.Color('#fbbf24'), // Bright gold
    new THREE.Color('#38bdf8'), // Cyber cyan
    new THREE.Color('#34d399'), // Emerald
    new THREE.Color('#fef08a'), // Soft cream
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    rands[i] = Math.random();

    // Assign color
    const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;

    // --- 1. CHIP / SILICON DIE ---
    const chipRoll = Math.random();
    let cx = 0, cy = 0, cz = (Math.random() - 0.5) * 0.35;
    if (chipRoll < 0.45) {
      // Inner core die
      cx = (Math.random() - 0.5) * 1.3;
      cy = (Math.random() - 0.5) * 1.3;
    } else if (chipRoll < 0.75) {
      // Outer perimeter border
      const side = Math.floor(Math.random() * 4);
      const t = Math.random() * 2.2 - 1.1;
      if (side === 0) { cx = t; cy = 1.1; }
      else if (side === 1) { cx = t; cy = -1.1; }
      else if (side === 2) { cx = 1.1; cy = t; }
      else { cx = -1.1; cy = t; }
    } else {
      // External connection pins
      const pinSide = Math.floor(Math.random() * 4);
      const pinPos = Math.floor(Math.random() * 7) / 3 - 1.0;
      const ext = 1.1 + Math.random() * 0.4;
      if (pinSide === 0) { cx = pinPos; cy = ext; }
      else if (pinSide === 1) { cx = pinPos; cy = -ext; }
      else if (pinSide === 2) { cx = ext; cy = pinPos; }
      else { cx = -ext; cy = pinPos; }
    }
    chip[i * 3] = cx * 1.4;
    chip[i * 3 + 1] = cy * 1.4;
    chip[i * 3 + 2] = cz;

    // --- 2. CODE BRACKETS < / > ---
    const codeRoll = Math.random();
    let kx = 0, ky = 0, kz = (Math.random() - 0.5) * 0.35;
    if (codeRoll < 0.4) {
      // Left bracket <
      const t = Math.random() * 2 - 1;
      kx = -0.75 - Math.abs(t) * 0.5;
      ky = t * 1.1;
    } else if (codeRoll < 0.6) {
      // Slash /
      const t = Math.random() * 2 - 1;
      kx = t * 0.4;
      ky = t * 1.1;
    } else {
      // Right bracket >
      const t = Math.random() * 2 - 1;
      kx = 0.75 + Math.abs(t) * 0.5;
      ky = t * 1.1;
    }
    kx += (Math.random() - 0.5) * 0.08;
    ky += (Math.random() - 0.5) * 0.08;
    code[i * 3] = kx * 1.4;
    code[i * 3 + 1] = ky * 1.4;
    code[i * 3 + 2] = kz;

    // --- 3. DISTRIBUTED KAFKA & CLOUD MESH ---
    const netRoll = Math.random();
    let nx = 0, ny = 0, nz = 0;
    if (netRoll < 0.3) {
      // Central cluster hub
      const rad = Math.random() * 0.55;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      nx = rad * Math.sin(ph) * Math.cos(th);
      ny = rad * Math.sin(ph) * Math.sin(th);
      nz = rad * Math.cos(ph);
    } else if (netRoll < 0.7) {
      // 6 Satellite broker nodes
      const nodeIndex = Math.floor(Math.random() * 6);
      const angle = (nodeIndex / 6) * Math.PI * 2;
      const nodeX = Math.cos(angle) * 1.45;
      const nodeY = Math.sin(angle) * 1.45;
      const subRad = Math.random() * 0.35;
      const subTh = Math.random() * Math.PI * 2;
      nx = nodeX + Math.cos(subTh) * subRad;
      ny = nodeY + Math.sin(subTh) * subRad;
      nz = (Math.random() - 0.5) * 0.5;
    } else {
      // Connecting radial filaments
      const nodeIndex = Math.floor(Math.random() * 6);
      const angle = (nodeIndex / 6) * Math.PI * 2;
      const lineT = Math.random();
      nx = Math.cos(angle) * (0.35 + lineT * 1.1) + (Math.random() - 0.5) * 0.1;
      ny = Math.sin(angle) * (0.35 + lineT * 1.1) + (Math.random() - 0.5) * 0.1;
      nz = (Math.random() - 0.5) * 0.25;
    }
    network[i * 3] = nx * 1.35;
    network[i * 3 + 1] = ny * 1.35;
    network[i * 3 + 2] = nz;

    // --- 4. 4D HYPERCUBE TESSERACT PROJECTION ---
    const tessRoll = Math.random();
    let tx = 0, ty = 0, tz = 0;
    if (tessRoll < 0.45) {
      // Outer cube surface
      const axis = Math.floor(Math.random() * 3);
      const sign = Math.random() > 0.5 ? 1 : -1;
      const u = (Math.random() - 0.5) * 2;
      const v = (Math.random() - 0.5) * 2;
      if (axis === 0) { tx = sign; ty = u; tz = v; }
      else if (axis === 1) { tx = u; ty = sign; tz = v; }
      else { tx = u; ty = v; tz = sign; }
      tx *= 1.35; ty *= 1.35; tz *= 1.35;
    } else if (tessRoll < 0.75) {
      // Inner cube surface
      const axis = Math.floor(Math.random() * 3);
      const sign = Math.random() > 0.5 ? 1 : -1;
      const u = (Math.random() - 0.5) * 2;
      const v = (Math.random() - 0.5) * 2;
      if (axis === 0) { tx = sign; ty = u; tz = v; }
      else if (axis === 1) { tx = u; ty = sign; tz = v; }
      else { tx = u; ty = v; tz = sign; }
      tx *= 0.65; ty *= 0.65; tz *= 0.65;
    } else {
      // Diagonal hyper-struts connecting inner and outer corners
      const cornerX = Math.random() > 0.5 ? 1 : -1;
      const cornerY = Math.random() > 0.5 ? 1 : -1;
      const cornerZ = Math.random() > 0.5 ? 1 : -1;
      const alpha = Math.random();
      const scale = 0.65 + alpha * (1.35 - 0.65);
      tx = cornerX * scale + (Math.random() - 0.5) * 0.08;
      ty = cornerY * scale + (Math.random() - 0.5) * 0.08;
      tz = cornerZ * scale + (Math.random() - 0.5) * 0.08;
    }
    tesseract[i * 3] = tx;
    tesseract[i * 3 + 1] = ty;
    tesseract[i * 3 + 2] = tz;
  }

  return { chip, code, network, tesseract, rands, colors };
}

const vertexShader = `
  uniform float uTime;
  uniform float uMorph;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute vec3 aChip;
  attribute vec3 aCode;
  attribute vec3 aNetwork;
  attribute vec3 aTesseract;
  attribute float aRand;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  float stage(float m, float k, float r) {
    return clamp((m - k) * 1.5 - r * 0.5, 0.0, 1.0);
  }
  float ease(float t) {
    return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
  }

  void main() {
    float s0 = stage(uMorph, 0.0, aRand);
    float s1 = stage(uMorph, 1.0, aRand);
    float s2 = stage(uMorph, 2.0, aRand);

    vec3 p = mix(aChip, aCode, ease(s0));
    p = mix(p, aNetwork, ease(s1));
    p = mix(p, aTesseract, ease(s2));

    // Expansion burst during stage transitions
    float burst = sin(s0 * 3.14159) + sin(s1 * 3.14159) + sin(s2 * 3.14159);
    vec3 dir = normalize(vec3(sin(aRand * 91.0), cos(aRand * 47.0), sin(aRand * 13.0)));
    p += dir * burst * (0.35 + aRand * 0.7);

    // Subtle harmonic floating wave
    p += vec3(
      sin(uTime * 0.9 + aRand * 60.0),
      cos(uTime * 0.7 + aRand * 40.0),
      sin(uTime * 0.8 + aRand * 20.0)
    ) * 0.035;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aRand * 0.75) * (1.0 + burst * 0.45) / -mv.z;
    vColor = aColor;
    vAlpha = 0.85 + 0.15 * sin(uTime * 2.0 + aRand * 12.0);
  }
`;

const fragmentShader = `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.08, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a * uOpacity * vAlpha);
    #include <colorspace_fragment>
  }
`;

const SHAPE_NAMES = [
  { id: 0, label: 'CPU Microchip', icon: Cpu, desc: 'Java 21 & Alto Rendimiento' },
  { id: 1, label: 'Código < / >', icon: Code2, desc: 'Arquitectura & Full-Stack' },
  { id: 2, label: 'Malla Kafka', icon: Network, desc: 'Microservicios & Event-Driven' },
  { id: 3, label: 'Hipercubo 4D', icon: Box, desc: 'Estructuras Multidimensionales' },
];

export default function ParticleMorph4D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeShape, setActiveShape] = useState<number>(0);
  const targetMorphRef = useRef<number>(0);
  const currentMorphRef = useRef<number>(0);

  const handleSelectShape = (shapeIndex: number) => {
    setActiveShape(shapeIndex);
    targetMorphRef.current = shapeIndex;
  };

  const handleCycleShape = () => {
    const next = (activeShape + 1) % SHAPE_NAMES.length;
    handleSelectShape(next);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry & Attributes
    const { chip, code, network, tesseract, rands, colors } = generateShapePoints();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(chip, 3));
    geometry.setAttribute('aChip', new THREE.BufferAttribute(chip, 3));
    geometry.setAttribute('aCode', new THREE.BufferAttribute(code, 3));
    geometry.setAttribute('aNetwork', new THREE.BufferAttribute(network, 3));
    geometry.setAttribute('aTesseract', new THREE.BufferAttribute(tesseract, 3));
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rands, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const uniforms = {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uSize: { value: 24.0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uOpacity: { value: 0.95 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse & Drag
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const targetRot = { x: 0, y: 0 };
    const mouseNormal = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNormal.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNormal.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        targetRot.y += dx * 0.008;
        targetRot.x += dy * 0.008;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - prevMouse.x;
        const dy = e.touches[0].clientY - prevMouse.y;
        targetRot.y += dx * 0.01;
        targetRot.x += dy * 0.01;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => { isDragging = false; };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationId: number;
    let clockTime = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      clockTime += 0.018;

      // Morph interpolation
      currentMorphRef.current += (targetMorphRef.current - currentMorphRef.current) * 0.055;
      uniforms.uMorph.value = currentMorphRef.current;
      uniforms.uTime.value = clockTime;

      // Smooth rotation with user interaction + subtle auto spin
      points.rotation.y += 0.004;
      points.rotation.x += (targetRot.x - points.rotation.x) * 0.08 + mouseNormal.y * 0.004;
      points.rotation.y += (targetRot.y - points.rotation.y) * 0.08 + mouseNormal.x * 0.004;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
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
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[460px] h-[450px] sm:h-[480px] mx-auto flex flex-col items-center justify-center select-none group">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Arrastra para rotar la nube de 8,000 partículas en 3D"
      />

      {/* Holographic floor ring */}
      <div className="absolute inset-x-8 bottom-3 h-24 bg-gradient-to-t from-amber-500/20 via-amber-500/5 to-transparent blur-2xl rounded-full pointer-events-none -z-10" />

      {/* Interactive Morph Controls */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 shadow-2xl backdrop-blur-xl">
        {SHAPE_NAMES.map((s) => {
          const Icon = s.icon;
          const isActive = activeShape === s.id;
          return (
            <button
              key={s.id}
              onClick={() => handleSelectShape(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-300 ${
                isActive
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-400/30 scale-105'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/70'
              }`}
              title={s.desc}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}

        <button
          onClick={handleCycleShape}
          className="p-1.5 rounded-full text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/80 transition-colors"
          title="Transformar al siguiente estado"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Badge label */}
      <div className="absolute top-2 right-4 text-[10px] font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-2.5 py-1 rounded-md backdrop-blur-md z-20 flex items-center gap-1.5">
        <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
        <span>8,000 Partículas 4D &bull; GLSL Shader</span>
      </div>
    </div>
  );
}
