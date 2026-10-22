'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Bot,
  Sparkles,
  MessageSquare,
  X,
  Send,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Terminal,
  Zap,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const PRESET_QUESTIONS = [
  '☕ ¿Cuál es su experiencia en Java 21 y Kafka?',
  '🚀 ¿Qué proyectos clave ha desarrollado?',
  '💼 ¿Está disponible para nuevas oportunidades?',
  '📞 ¿Cómo puedo contactar a Juan directamente?',
];

export default function CompanionBot3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [minimized, setMinimized] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: '¡Hola! 👋 Soy **Nexus-01**, el dron y copiloto de Inteligencia Artificial de **Juan Alexander Miranda Quispe**, potenciado por **Google Gemini**.\n\nConozco toda su trayectoria en **Java 21, Spring Boot, Apache Kafka, Angular 17+**, sus proyectos transaccionales en el sector bancario (ZyTrust) y disponibilidad laboral. ¿Qué te gustaría consultar sobre él?',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // References for animation state
  const isJumping = useRef(false);
  const jumpProgress = useRef(0);
  const isThinkingRef = useRef(false);
  const eyeBlink = useRef({ isBlinking: false, timer: 0, nextBlink: 200 });

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatOpen, isLoading]);

  useEffect(() => {
    isThinkingRef.current = isLoading;
  }, [isLoading]);

  // Three.js 3D Bot Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 220;
    const height = container.clientHeight || 220;

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
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

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

      // Faster orbital spin when Gemini is thinking
      const spinSpeedMultiplier = isThinkingRef.current ? 3.5 : 1.0;

      // Idle levitation wave
      const floatY = Math.sin(elapsedTime * 2.2) * 0.12;

      // Handle Jump/Flip on interaction
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
      outerRing.rotation.x = elapsedTime * 0.9 * spinSpeedMultiplier;
      outerRing.rotation.y = elapsedTime * 0.6 * spinSpeedMultiplier;
      innerRing.rotation.y = -elapsedTime * 1.2 * spinSpeedMultiplier;
      innerRing.rotation.z = elapsedTime * 0.8 * spinSpeedMultiplier;

      // Eye Blinking Logic
      eyeBlink.current.timer++;
      const blinkFrequency = isThinkingRef.current ? 60 : eyeBlink.current.nextBlink;
      if (eyeBlink.current.timer > blinkFrequency) {
        eyeBlink.current.isBlinking = true;
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;

        if (eyeBlink.current.timer > blinkFrequency + 8) {
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
        plasmaVel[i].life -= 0.035 * spinSpeedMultiplier;
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
      const newW = container.clientWidth || 220;
      const newH = container.clientHeight || 220;
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

  const triggerBotJump = () => {
    isJumping.current = true;
    jumpProgress.current = 0;
  };

  const handleToggleChat = () => {
    triggerBotJump();
    setChatOpen(!chatOpen);
    setHasUnread(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    triggerBotJump();
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const botReply =
        data.reply ||
        'Disculpa, hubo un problema al obtener la respuesta. Puedes contactar a Juan Alexander directamente en WhatsApp: +51 924 934 329.';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: botReply,
        },
      ]);
      triggerBotJump();
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: 'Hubo una dificultad de conexión. Puedes contactar directamente a Juan Alexander en su correo: **alex8v124@gmail.com** o WhatsApp: **+51 924 934 329**.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: 'Memoria reiniciada. ⚡ Soy **Nexus-01**, listo para responder tus dudas sobre Juan Alexander y su stack de ingeniería.',
      },
    ]);
  };

  // Helper to render basic Markdown formatting (bold, code, lists, linebreaks)
  const renderFormattedText = (raw: string) => {
    const paragraphs = raw.split('\n\n');
    return (
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
        {paragraphs.map((p, pIdx) => {
          const lines = p.split('\n');
          return (
            <p key={pIdx}>
              {lines.map((line, lIdx) => {
                // Process bold and code
                const formattedLine = line
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`([^`]+)`/g, '<code class="bg-zinc-800 text-amber-300 px-1 py-0.5 rounded text-[11px] font-mono">$1</code>');

                return (
                  <span
                    key={lIdx}
                    className="block"
                    dangerouslySetInnerHTML={{ __html: formattedLine }}
                  />
                );
              })}
            </p>
          );
        })}
      </div>
    );
  };

  if (minimized) {
    return (
      <button
        onClick={() => {
          setMinimized(false);
          setChatOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-zinc-900/90 border border-amber-500/50 text-amber-400 hover:text-white hover:bg-amber-500/20 shadow-2xl shadow-amber-500/30 backdrop-blur-md transition-all group flex items-center gap-2"
        data-cursor-label="Chat IA"
        data-magnetic="true"
        title="Abrir Chatbot Nexus-01"
      >
        <Bot className="w-5 h-5 animate-pulse text-amber-400" />
        <span className="text-xs font-mono font-medium text-zinc-200 group-hover:text-amber-300">
          Chat con Nexus-01 (IA)
        </span>
        {hasUnread && (
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping absolute -top-1 -right-1" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* --- EXPANDED CHATBOT MODAL --- */}
      {chatOpen && (
        <div className="pointer-events-auto mb-3 w-[340px] sm:w-[400px] h-[520px] max-h-[82vh] rounded-2xl bg-zinc-950/95 border border-amber-500/40 shadow-2xl shadow-black/90 backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 select-text">
          {/* Header */}
          <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-zinc-950 absolute -bottom-0.5 -right-0.5 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-zinc-100">
                    Nexus-01
                  </span>
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    Gemini AI
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Copiloto técnico de Juan
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/80 transition-colors"
                title="Reiniciar conversación"
                data-cursor-label="Reiniciar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                title="Cerrar chat"
                data-cursor-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 font-sans">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm shadow-md ${
                      isUser
                        ? 'bg-amber-400 text-zinc-950 font-medium rounded-tr-sm ml-auto'
                        : 'bg-zinc-900/90 border border-zinc-800/80 text-zinc-200 rounded-tl-sm'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}
                  </div>
                </div>
              );
            })}

            {/* Thinking / Typing Animation */}
            {isLoading && (
              <div className="flex items-center gap-2 text-zinc-400 text-xs pl-8">
                <span className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                  <span className="ml-1 text-[11px] font-mono text-zinc-400">
                    Consultando a Gemini...
                  </span>
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset Questions Chips */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 pt-1 border-t border-zinc-800/50 bg-zinc-950/60 flex flex-wrap gap-1.5">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-zinc-900/90 hover:bg-amber-400 hover:text-zinc-950 text-zinc-300 border border-zinc-800 hover:border-amber-400/60 transition-all text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Box Footer */}
          <div className="p-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Pregúntale a Nexus-01 sobre Juan..."
              className="flex-1 bg-zinc-950/80 border border-zinc-800 focus:border-amber-400/70 rounded-xl px-3.5 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 outline-none transition-colors"
              disabled={isLoading}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold transition-all disabled:opacity-40 disabled:hover:bg-amber-400 shadow-md shadow-amber-400/20"
              data-cursor-label="Enviar"
              title="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* --- FLOATING 3D BOT & TRIGGER PILL --- */}
      <div className="pointer-events-auto relative flex flex-col items-end group">
        {/* Unread Message / Prompt Hint (shown when chat is closed) */}
        {!chatOpen && (
          <div
            onClick={handleToggleChat}
            className="cursor-pointer mb-2 max-w-xs px-3.5 py-2 rounded-2xl bg-zinc-900/95 border border-amber-500/50 shadow-2xl shadow-black/80 backdrop-blur-xl flex items-center gap-2.5 animate-bounce hover:animate-none transition-all hover:scale-105"
            data-cursor-label="Abrir Chat"
            data-magnetic="true"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-xs font-mono font-medium text-zinc-200">
              ¿Dudas sobre Juan? <strong className="text-amber-300">¡Chatea conmigo!</strong>
            </span>
          </div>
        )}

        {/* Floating Halo Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-sky-500/10 to-transparent blur-2xl rounded-full pointer-events-none -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />

        {/* 3D Canvas Mount */}
        <div
          ref={mountRef}
          onClick={handleToggleChat}
          className="w-40 h-40 sm:w-48 sm:h-48 cursor-pointer relative"
          data-cursor-label={chatOpen ? 'Cerrar Chat' : 'Hablar con Nexus-01'}
          data-magnetic="true"
          title="Haz clic para chatear con Nexus-01"
        />

        {/* Bot Controls Bar */}
        <div className="absolute bottom-1 right-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/90 border border-zinc-800 backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <button
            onClick={handleToggleChat}
            className="text-[10px] font-mono font-bold text-amber-300/90 hover:text-white transition-colors tracking-wide flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3 text-amber-400" />
            <span>{chatOpen ? 'CERRAR' : 'CHAT IA'}</span>
          </button>
          <button
            onClick={() => setMinimized(true)}
            className="ml-1 text-zinc-500 hover:text-zinc-300 transition-colors"
            title="Minimizar bot"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
