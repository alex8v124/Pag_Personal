'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  ArrowDown,
  Layers,
  Sparkles,
  Server,
  Code2,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import HeroScene4D from '@/components/3d/HeroScene4D';
import ParticleMorph4D from '@/components/3d/ParticleMorph4D';
import Card3D from '@/components/3d/Card3D';

export default function HeroSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeVisualizer, setActiveVisualizer] = useState<'morph' | 'tesseract'>('morph');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    toast({
      title: '¡Correo copiado!',
      description: `${PERSONAL_INFO.email} ha sido copiado al portapapeles.`,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const techBadges = [
    'Java 21',
    'Spring Boot',
    'Apache Kafka',
    'Angular 17+',
    'React',
    'Microservicios',
    'PostgreSQL',
    'MongoDB',
    'Podman / Docker',
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Ambience / Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[380px] h-[380px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none -z-10" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Text & Content (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Availability Pill with pulsing dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/60 shadow-lg shadow-black/40 mb-6 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-zinc-300">
                Disponible para Desarrollo Full-Stack &amp; Microservicios
              </span>
            </div>

            {/* Main Title & Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tight text-zinc-100 leading-[1.1]">
              Hola, soy{' '}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl font-mono text-amber-300 font-medium">
              Ingeniero de Sistemas e Informática &bull; Full-Stack Engineer
            </p>

            <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              Especializado en arquitecturas de microservicios con <strong className="text-zinc-200">Java 21</strong>,{' '}
              <strong className="text-zinc-200">Spring Boot</strong> y <strong className="text-zinc-200">Apache Kafka</strong>,
              así como en interfaces web reactivas de alto rendimiento con{' '}
              <strong className="text-zinc-200">Angular 17+</strong> y <strong className="text-zinc-200">React</strong>.
              Experiencia en modernización tecnológica crítica en el sector bancario.
            </p>

            {/* Tech Highlights Pills */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2 max-w-xl">
              {techBadges.map((tech) => (
                <span
                  key={tech}
                  data-cursor-label={tech}
                  className="px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-amber-500/50 hover:text-amber-300 transition-colors shadow-sm cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                data-magnetic="true"
                data-cursor-label="Explorar"
                className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold px-6 shadow-xl shadow-amber-500/25 text-sm gap-2"
              >
                <a href="#proyectos">
                  <Layers className="w-4 h-4" />
                  Explorar Proyectos
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                data-magnetic="true"
                data-cursor-label="Copiar"
                onClick={handleCopyEmail}
                className="border-zinc-700 hover:border-amber-400/70 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-sm gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Correo'}</span>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                data-magnetic="true"
                data-cursor-label="GitHub"
                className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 border border-zinc-800 text-sm gap-2"
              >
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                  GitHub
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                data-magnetic="true"
                data-cursor-label="LinkedIn"
                className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 border border-zinc-800 text-sm gap-2"
              >
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive 4D WebGL Object (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Visualizer Mode Switcher */}
            <div className="mb-3 flex items-center p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md shadow-lg">
              <button
                onClick={() => setActiveVisualizer('morph')}
                data-magnetic="true"
                data-cursor-label="8K Partículas"
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeVisualizer === 'morph'
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Morphing 4D (8K GPU)</span>
              </button>
              <button
                onClick={() => setActiveVisualizer('tesseract')}
                data-magnetic="true"
                data-cursor-label="Hipercubo 4D"
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeVisualizer === 'tesseract'
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Hipercubo Cuántico</span>
              </button>
            </div>

            {/* Visualizer Display */}
            <div className="w-full flex justify-center">
              {activeVisualizer === 'morph' ? <ParticleMorph4D /> : <HeroScene4D />}
            </div>
          </div>
        </div>

        {/* Key Metrics Bento Bar with 3D Tilt */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <Card3D key={idx} depth={20} glowColor="rgba(251, 191, 36, 0.25)">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 group h-full flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-bold font-headline text-amber-400 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-medium leading-snug">
                  {stat.label}
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#sobre-mi"
        className="mt-12 text-zinc-500 hover:text-amber-400 transition-colors flex flex-col items-center gap-1 group text-xs font-mono"
        aria-label="Ir a sección Sobre Mí"
      >
        <span>Deslizar para explorar</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-amber-400/80" />
      </a>
    </section>
  );
}
