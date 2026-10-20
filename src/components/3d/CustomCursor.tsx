'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Position references for smooth interpolation
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const particles = useRef<Particle[]>([]);
  const lastEmitTime = useRef(0);

  useEffect(() => {
    // Only enable on desktop / fine pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check for magnetic elements and cursor labels
      const target = e.target as HTMLElement | null;
      if (target) {
        // Label detection
        const labelEl = target.closest('[data-cursor-label]') as HTMLElement | null;
        if (labelEl) {
          setLabel(labelEl.getAttribute('data-cursor-label'));
        } else {
          setLabel(null);
        }

        // Interactive hover state
        const interactiveEl = target.closest('a, button, input, textarea, [data-magnetic], [role="button"]') as HTMLElement | null;
        setIsHovered(!!interactiveEl);

        // Magnetic element attraction
        const magneticEl = target.closest('[data-magnetic]') as HTMLElement | null;
        if (magneticEl) {
          const rect = magneticEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

          if (dist < 80) {
            const pullX = (e.clientX - centerX) * 0.35;
            const pullY = (e.clientY - centerY) * 0.35;
            magneticEl.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
            magneticEl.style.transition = 'transform 0.15s ease-out';
          }
        }
      }

      // Spawn subtle cyber spark particles on movement
      const now = performance.now();
      if (now - lastEmitTime.current > 35) {
        lastEmitTime.current = now;
        if (particles.current.length < 40) {
          const colors = ['#f59e0b', '#fbbf24', '#38bdf8', '#e2e8f0'];
          particles.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 + 0.5,
            size: Math.random() * 2.5 + 1.2,
            alpha: 0.8,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    // Reset magnetic elements on mouseleave
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const magneticEl = target.closest('[data-magnetic]') as HTMLElement | null;
        if (magneticEl) {
          magneticEl.style.transform = 'translate3d(0, 0, 0)';
          magneticEl.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Canvas particle trail animation
    let animId: number;
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const renderLoop = () => {
      // Smooth ring position with spring lerp
      const factor = 0.18;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * factor;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * factor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Draw particle trail
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.025;
          p.size *= 0.96;

          if (p.alpha <= 0 || p.size <= 0.2) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Background Trail Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Main Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b] pointer-events-none transition-[opacity] duration-150"
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          opacity: isClicking ? 0.7 : 1,
        }}
      />

      {/* Outer Magnetic Follower Ring / Pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none transition-all duration-200 ease-out flex items-center justify-center ${
          label
            ? 'px-3 py-1.5 rounded-full bg-zinc-900/95 border border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.35)] -ml-12 -mt-10 backdrop-blur-md'
            : isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 rounded-full border-2 border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-110'
            : isClicking
            ? 'w-7 h-7 -ml-3.5 -mt-3.5 rounded-full border border-amber-300 bg-amber-400/30 scale-90'
            : 'w-9 h-9 -ml-4.5 -mt-4.5 rounded-full border border-amber-400/50 bg-amber-400/5'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {label && (
          <span className="text-[11px] font-mono font-bold text-amber-300 whitespace-nowrap tracking-wide select-none">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
