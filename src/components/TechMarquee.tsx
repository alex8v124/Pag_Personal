'use client';

import React from 'react';
import {
  Cpu,
  Layers,
  Server,
  Zap,
  Terminal,
  ShieldCheck,
  Workflow,
  Sparkles,
  GitBranch,
  Database,
} from 'lucide-react';

const MARQUEE_ITEMS = [
  { icon: Cpu, label: 'Java 21 & Virtual Threads', tag: 'Core' },
  { icon: Server, label: 'Spring Boot 3 Microservices', tag: 'Backend' },
  { icon: Zap, label: 'Apache Kafka Event Streaming', tag: 'Messaging' },
  { icon: Layers, label: 'Angular 17+ Signals & RxJS', tag: 'Frontend' },
  { icon: Workflow, label: 'Arquitectura Hexagonal & DDD', tag: 'Architecture' },
  { icon: ShieldCheck, label: 'Banca y Sistemas Críticos', tag: 'Industry' },
  { icon: Database, label: 'PostgreSQL & MongoDB', tag: 'Databases' },
  { icon: GitBranch, label: 'Podman, Docker & CI/CD', tag: 'DevOps' },
  { icon: Terminal, label: 'Clean Code & SOLID', tag: 'Engineering' },
  { icon: Sparkles, label: 'Resiliencia & Alta Disponibilidad', tag: 'Enterprise' },
];

export default function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md">
      {/* Left/Right Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="flex w-max items-center gap-6 animate-marquee select-none hover:[animation-play-state:paused]">
        {/* Render twice for continuous loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-200 group cursor-default"
              data-cursor-label={item.tag}
            >
              <div className="p-1 rounded-md bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-mono font-medium text-zinc-300 group-hover:text-amber-300 transition-colors">
                {item.label}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/90 text-zinc-400 border border-zinc-700/40">
                {item.tag}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
