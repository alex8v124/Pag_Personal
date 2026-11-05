'use client';

import React from 'react';
import {
  Trophy,
  Atom,
  ArrowUpRight,
  Sparkles,
  Zap,
  Server,
  Cpu,
  Layers,
  Award,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import Card3D from '@/components/3d/Card3D';
import { Button } from '@/components/ui/button';

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Grid Pattern overlay matching screenshot header */}
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none -z-10" />

      <div className="container mx-auto max-w-6xl">
        {/* Section Header exactly formatted as in uploaded image 3 */}
        <div className="border-b border-zinc-800/80 pb-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-blue-400 uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                VALIDACIÓN EN CANCHA BAJO PRESIÓN
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-zinc-100 tracking-tight mt-2">
                Podios Nacionales &amp; Hackathons Tecnológicas
              </h2>
            </div>
            <div className="text-left md:text-right">
              <span className="text-xs sm:text-sm font-mono text-zinc-400 block font-medium">
                Arquitectura Cloud, IA &amp; Computación Cuántica
              </span>
              <span className="text-[11px] font-mono text-amber-400/90 flex items-center md:justify-end gap-1 mt-1">
                <Trophy className="w-3 h-3" /> Certámenes de Alta Competencia
              </span>
            </div>
          </div>
        </div>

        {/* 2 Main Podiums Cards Grid (Cards 1 & 2 from screenshots) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* CARD 1: IAthon AWS & Kiro — ESAN x Fundación Romero */}
          <Card3D depth={20} glowColor="rgba(245, 158, 11, 0.25)" className="h-full">
            <div className="relative h-full bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
              {/* Amber Accent Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

              <div>
                {/* Top Badge & Date */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold shadow-sm shadow-amber-500/20">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>3.ER PUESTO NACIONAL</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 font-medium">
                    Oct 2026
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold font-headline text-zinc-100 group-hover:text-amber-400 transition-colors leading-tight">
                  IAthon AWS &amp; Kiro — ESAN x Fundación Romero
                </h3>

                {/* Description Body matching screenshot */}
                <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  Podio nacional superando a <strong className="text-white font-semibold">40 escuadras (240 competidores)</strong>. Co-lideré como CTO la estrategia técnica de producto, el caso de negocio FinOps y la defensa ante jurado C-Level de una arquitectura Serverless (AWS Lambda, DynamoDB Single-Table, Amazon Bedrock Claude 3 Haiku) y el sistema <strong className="text-amber-300 font-semibold">Kiro RestQube</strong>.
                </p>

                {/* Key Technical Highlights Badges */}
                <div className="mt-6 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Desempeño</span>
                    <span className="text-amber-300 font-bold mt-0.5">Top 3 Nacional (40 Teams)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Cloud Stack</span>
                    <span className="text-zinc-200 font-bold mt-0.5">AWS Lambda + Bedrock</span>
                  </div>
                </div>
              </div>

              {/* Card Footer matching screenshot: AWS Serverless & QUBO | Abrir Kiro RestQube ↗ */}
              <div className="mt-8 pt-5 border-t border-zinc-800/80 flex items-center justify-between gap-4 flex-wrap">
                <span className="text-xs font-mono text-zinc-400 font-medium flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  AWS Serverless &amp; QUBO
                </span>

                <Button
                  asChild
                  size="sm"
                  data-magnetic="true"
                  data-cursor-label="Kiro RestQube"
                  className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs gap-1.5 shadow-md shadow-amber-400/20 transition-transform active:scale-95"
                >
                  <a
                    href="https://kirorestqube.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir Kiro RestQube en Vercel"
                  >
                    <span>Abrir Kiro RestQube</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </Card3D>

          {/* CARD 2: IEEE / IBM Quantum Hackathon Perú */}
          <Card3D depth={20} glowColor="rgba(99, 102, 241, 0.25)" className="h-full">
            <div className="relative h-full bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
              {/* Indigo/Purple Accent Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

              <div>
                {/* Top Badge & Partner */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/40 text-indigo-300 font-mono text-xs font-bold shadow-sm shadow-indigo-500/20">
                    <Atom className="w-3.5 h-3.5 text-indigo-400" />
                    <span>CLASIFICADO OFICIAL</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 font-medium">
                    PUCP x UTEC
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold font-headline text-zinc-100 group-hover:text-indigo-400 transition-colors leading-tight">
                  IEEE / IBM Quantum Hackathon Perú
                </h3>

                {/* Description Body matching screenshot */}
                <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  Líder técnico del equipo <strong className="text-white font-semibold">Nodux Quantum</strong>. Resolución del problema de asignación cuadrática (instancia <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-indigo-300 font-mono text-xs">qap10.mps</code> con 4,150 variables) mediante arquitectura híbrida <strong className="text-indigo-300 font-semibold">Q-LNS / QAOA en Qiskit Aer</strong>, logrando un <strong className="text-white font-semibold">27.04% de reducción de costo operativo</strong> (+2.94% gap vs. óptimo global) y proyectando ahorros de S/ 28,000 anuales por almacén.
                </p>

                {/* Key Technical Highlights Badges */}
                <div className="mt-6 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Optimización</span>
                    <span className="text-indigo-300 font-bold mt-0.5">27.04% Ahorro (+2.94% Gap)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Escala</span>
                    <span className="text-zinc-200 font-bold mt-0.5">4,150 Vars (QUBO λ=60)</span>
                  </div>
                </div>
              </div>

              {/* Card Footer matching screenshot: Qiskit Aer · QUBO (λ=60) + Seleccionado UTP x El Comercio | Abrir Nodux Quantum ↗ */}
              <div className="mt-8 pt-5 border-t border-zinc-800/80 flex items-center justify-between gap-4 flex-wrap">
                <span className="text-xs font-mono text-zinc-400 font-medium flex items-center gap-1.5">
                  <Atom className="w-3.5 h-3.5 text-indigo-400" />
                  Qiskit Aer &bull; QUBO (&lambda;=60) + UTP x El Comercio
                </span>

                <Button
                  asChild
                  size="sm"
                  data-magnetic="true"
                  data-cursor-label="Nodux Quantum"
                  className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs gap-1.5 shadow-md shadow-indigo-500/25 transition-transform active:scale-95"
                >
                  <a
                    href="https://nodux-quantum.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir Nodux Quantum en Vercel"
                  >
                    <span>Abrir Nodux Quantum</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Additional Badge Banner: Challenge Internacional HP & JA Americas */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  🥇 1.ER PUESTO (10/10)
                </span>
                <span className="text-xs text-zinc-500">&bull;</span>
                <span className="text-xs font-mono text-zinc-300">
                  Challenge Internacional #AIforImpact — HP &amp; Junior Achievement Americas
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Puntaje perfecto otorgado por el jurado evaluador estructurando modelos de IA responsable y viabilidad comercial.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 bg-zinc-950/60 px-3 py-1.5 rounded-lg border border-zinc-800 shrink-0">
            <span>NauFest 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
