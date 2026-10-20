'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Bot, Sparkles, MessageSquare, Volume2, X, RefreshCw } from 'lucide-react';

const TECH_QUOTES = [
  '⚡ Java 21 Virtual Threads: ¡100k tareas concurrentes!',
  '🚀 Apache Kafka: Broker saludable, latencia < 1ms',
  '🛡️ Spring Boot 3 & Security: Microservicios blindados',
  '✨ Angular 17 Signals: Reactividad pura a 120 FPS',
  '📦 Podman & Docker: Contenedores orquestados al 100%',
  '💾 PostgreSQL & MongoDB: Persistencia y réplicas en sync',
  '🤝 ¡Hola! Juan Alexander está listo para nuevos desafíos',
  '💡 Código limpio, arquitectura hexagonal y alta resiliencia',
];

export default function CompanionBot3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentQuote, setCurrentQuote] = useState<string | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // References for animation state
  const isJumping = useRef(false);
  const jumpProgress = useRef(0);
  const eyeBlink = useRef({ isBlinking: false, timer: 0, nextBlink: 200 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const width = container.clientWidth || 240;
    const height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Drone Group
    const drone = new THREE.Group();
    scene.add(drone);

    // --- 1. Central Core Body (Obsidian Chrome) ---
    const bodyGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.25,
      metalness: 0.85,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    drone.add(bodyMesh);

    // Decorative Gold Trim Inset Ring
    const trimGeo = new THREE.TorusGeometry(1.02, 0.04, 16, 64);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.1,
    });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.rotation.x = Math.PI / 2;
    drone.add(trimMesh);

    // --- 2. Visor Screen (Face) ---
    const visorGeo = new THREE.SphereGeometry(0.72, 32, 16, 0, Math.PI, 0, Math.PI * 0.7);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.1,
      metalness: 0.95,
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.rotation.y = -Math.PI / 2;
    visorMesh.position.set(0, 0.15, 0.35);
    visorMesh.scale.set(1.05, 0.65, 0.95);
    drone.add(visorMesh);

    // --- 3. Expressive Cyan LED Eyes ---
    const eyeGeo = new THREE.CapsuleGeometry(0.12, 0.22, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 }); // Cyan glow

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.32, 0.22, 0.96);
    leftEye.rotation.z = 0.1;
    drone.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat.clone());
    rightEye.position.set(0.32, 0.22, 0.96);
    rightEye.rotation.z = -0.1;
    drone.add(rightEye);

    // --- 4. Floating Orbital Gyro Rings ---
    const outerRingGeo = new THREE.TorusGeometry(1.48, 0.03, 16, 64);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.2,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    drone.add(outerRing);

    const innerRingGeo = new THREE.TorusGeometry(1.3, 0.025, 16, 64);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      metalness: 0.8,
      roughness: 0.2,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    drone.add(innerRing);

    // --- 5. Thruster Plasma Particles Underneath ---
    const particleCount = 60;
    const plasmaGeo = new THREE.BufferGeometry();
    const plasmaPos = new Float32Array(particleCount * 3);
    const plasmaVel: { x: number; y: number; z: number; life: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      plasmaPos[i * 3] = (Math.random() - 0.5) * 0.4;
      plasmaPos[i * 3 + 1] = -0.9 - Math.random() * 0.5;
      plasmaPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      plasmaVel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: -0.02 - Math.random() * 0.03,
        z: (Math.random() - 0.5) * 0.02,
        life: Math.random(),
      });
    }

    plasmaGeo.setAttribute('position', new THREE.BufferAttribute(plasmaPos, 3));
    const plasmaMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.1,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const plasmaPoints = new THREE.Points(plasmaGeo, plasmaMat);
    drone.add(plasmaPoints);

    // --- 6. Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfef3c7, 3.0);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 3.5, 10);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    const amberRimLight = new THREE.PointLight(0xf59e0b, 4.0, 10);
    amberRimLight.position.set(0, 3, -3);
    scene.add(amberRimLight);

    // --- Mouse LookTarget Tracking ---
    const mousePos = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const handleWindowMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from bot center to cursor
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      mousePos.x = Math.max(-1, Math.min(1, dx));
      mousePos.y = Math.max(-1, Math.min(1, dy));

      targetRotation.y = mousePos.x * 0.65;
      targetRotation.x = mousePos.y * 0.45;
    };

    window.addEventListener('mousemove', handleWindowMouseMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle levitation wave
      const floatY = Math.sin(elapsedTime * 2.2) * 0.12;

      // Handle Jump/Flip on click
      let jumpY = 0;
      let flipRotX = 0;
      let flipRotY = 0;

      if (isJumping.current) {
        jumpProgress.current += 0.05;
        const p = jumpProgress.current;
        jumpY = Math.sin(p * Math.PI) * 0.7;
        flipRotX = p * Math.PI * 2;
        flipRotY = Math.sin(p * Math.PI * 2) * 0.5;

        if (jumpProgress.current >= 1.0) {
          isJumping.current = false;
          jumpProgress.current = 0;
        }
      }

      drone.position.y = floatY + jumpY;

      // Smooth lookTarget interpolation
      drone.rotation.y += (targetRotation.y + flipRotY - drone.rotation.y) * 0.1;
      drone.rotation.x += (targetRotation.x + flipRotX - drone.rotation.x) * 0.1;
      drone.rotation.z = Math.sin(elapsedTime * 1.5) * 0.05;

      // Orbiting Gyro Rings Rotation
      outerRing.rotation.x = elapsedTime * 0.9;
      outerRing.rotation.y = elapsedTime * 0.6;
      innerRing.rotation.y = -elapsedTime * 1.2;
      innerRing.rotation.z = elapsedTime * 0.8;

      // Eye Blinking Logic
      eyeBlink.current.timer++;
      if (eyeBlink.current.timer > eyeBlink.current.nextBlink) {
        eyeBlink.current.isBlinking = true;
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;

        if (eyeBlink.current.timer > eyeBlink.current.nextBlink + 8) {
          eyeBlink.current.isBlinking = false;
          eyeBlink.current.timer = 0;
          eyeBlink.current.nextBlink = 160 + Math.floor(Math.random() * 200);
          leftEye.scale.y = 1;
          rightEye.scale.y = 1;
        }
      }

      // Thruster Plasma Animation
      const posAttr = plasmaGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        plasmaVel[i].life -= 0.035;
        let y = posAttr.getY(i) + plasmaVel[i].y;
        let x = posAttr.getX(i) + plasmaVel[i].x;
        let z = posAttr.getZ(i) + plasmaVel[i].z;

        if (plasmaVel[i].life <= 0) {
          x = (Math.random() - 0.5) * 0.35;
          y = -0.95;
          z = (Math.random() - 0.5) * 0.35;
          plasmaVel[i].life = 1.0;
        }

        posAttr.setXYZ(i, x, y, z);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 240;
      const newH = container.clientHeight || 240;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      bodyGeo.dispose();
      bodyMat.dispose();
      trimGeo.dispose();
      trimMat.dispose();
      visorGeo.dispose();
      visorMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      plasmaGeo.dispose();
      plasmaMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleBotClick = () => {
    isJumping.current = true;
    jumpProgress.current = 0;
    setClickCount((c) => c + 1);

    // Pick random tech dialogue
    const randomQuote = TECH_QUOTES[Math.floor(Math.random() * TECH_QUOTES.length)];
    setCurrentQuote(randomQuote);

    // Auto dismiss quote after 4s
    setTimeout(() => {
      setCurrentQuote(null);
    }, 4500);
  };

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-zinc-900/90 border border-amber-500/50 text-amber-400 hover:text-white hover:bg-amber-500/20 shadow-xl shadow-amber-500/20 backdrop-blur-md transition-all group flex items-center gap-2"
        data-cursor-label="Despertar Bot"
        data-magnetic="true"
        title="Activar Asistente 3D"
      >
        <Bot className="w-5 h-5 animate-pulse text-amber-400" />
        <span className="text-xs font-mono font-medium text-zinc-300 group-hover:text-amber-300">
          Nexus-01
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech / Status Bubble */}
      {currentQuote && (
        <div className="pointer-events-auto mb-2 max-w-xs p-3 rounded-2xl bg-zinc-900/95 border border-amber-500/60 shadow-2xl shadow-black/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3" />
              Nexus-01 &bull; Status
            </div>
            <button
              onClick={() => setCurrentQuote(null)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <p className="mt-1 text-xs text-zinc-200 font-mono leading-relaxed">
            {currentQuote}
          </p>
        </div>
      )}

      {/* Bot Container Card */}
      <div className="pointer-events-auto relative group">
        {/* Floating Halo Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-sky-500/10 to-transparent blur-2xl rounded-full pointer-events-none -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />

        {/* 3D Canvas Mount */}
        <div
          ref={mountRef}
          onClick={handleBotClick}
          className="w-48 h-48 sm:w-56 sm:h-56 cursor-pointer relative"
          data-cursor-label="¡Interactuar!"
          data-magnetic="true"
          title="Haz clic para interactuar con Nexus-01"
        />

        {/* Bot Controls Bar */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-zinc-800 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-amber-300/90 tracking-wide">
            NEXUS-01
          </span>
          <button
            onClick={() => setMinimized(true)}
            className="ml-2 text-zinc-500 hover:text-zinc-300 transition-colors"
            title="Minimizar bot"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
