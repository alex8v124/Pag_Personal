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

export default function HeroSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

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
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Ambience / Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none -z-10" />

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        {/* Availability Pill */}
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
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-headline tracking-tight text-zinc-100 leading-[1.1]">
          Hola, soy{' '}
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {PERSONAL_INFO.name}
          </span>
        </h1>

        <p className="mt-5 text-lg sm:text-xl md:text-2xl font-mono text-zinc-300 max-w-3xl mx-auto font-normal">
          Ingeniero de Sistemas e Informática &amp; Desarrollador Full-Stack
        </p>

        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Especializado en arquitecturas de microservicios con <strong className="text-zinc-200">Java 21</strong>,{' '}
          <strong className="text-zinc-200">Spring Boot</strong> y <strong className="text-zinc-200">Apache Kafka</strong>,
          así como en interfaces web modernas de alto rendimiento con{' '}
          <strong className="text-zinc-200">Angular 17+</strong> y <strong className="text-zinc-200">React</strong>.
          Experiencia en modernización tecnológica en el sector bancario.
        </p>

        {/* Tech Highlights Pills */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {techBadges.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-zinc-900/70 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-amber-500/40 hover:text-amber-300 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Button
            asChild
            size="lg"
            className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold px-6 shadow-xl shadow-amber-500/20 text-sm gap-2"
          >
            <a href="#proyectos">
              <Layers className="w-4 h-4" />
              Explorar Proyectos
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
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
            className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 border border-zinc-800 text-sm gap-2"
          >
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 text-blue-400" />
              LinkedIn
            </a>
          </Button>
        </div>

        {/* Key Metrics Bento Bar */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="text-2xl sm:text-3xl font-bold font-headline text-amber-400 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 mt-1 font-medium leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#sobre-mi"
        className="mt-12 text-zinc-500 hover:text-amber-400 transition-colors flex flex-col items-center gap-1 group text-xs font-mono"
        aria-label="Ir a sección Sobre Mí"
      >
        <span>Deslizar para ver más</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-amber-400/80" />
      </a>
    </section>
  );
}
