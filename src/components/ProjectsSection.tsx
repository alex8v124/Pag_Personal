'use client';

import React, { useState } from 'react';
import { PROJECTS, Project } from '@/data/portfolioData';
import {
  Layers,
  Github,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Server,
  Sparkles,
  Bot,
  Gamepad2,
  ArrowUpRight,
  Code2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Card3D from '@/components/3d/Card3D';

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos', count: PROJECTS.length },
    { id: 'microservices', label: 'Microservicios & Cloud', count: 1 },
    { id: 'fullstack', label: 'Full-Stack Enterprise', count: 2 },
    { id: 'ai', label: 'IA & NLP', count: 1 },
    { id: 'frontend3d', label: 'Frontend 3D', count: 1 },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'microservices':
        return Server;
      case 'ai':
        return Bot;
      case 'frontend3d':
        return Gamepad2;
      default:
        return Layers;
    }
  };

  return (
    <section id="proyectos" className="py-20 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Portafolio de Ingeniería</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-zinc-100">
            Proyectos Relevantes
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base">
            Sistemas en producción, arquitecturas orientadas a eventos y plataformas con integración de inteligencia artificial.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium font-mono transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-400/20 scale-105'
                    : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    selectedCategory === cat.id
                      ? 'bg-zinc-950/20 text-zinc-950 font-bold'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const CategoryIcon = getCategoryIcon(project.category);
            return (
              <Card3D key={project.id} depth={20} glowColor="rgba(251, 191, 36, 0.2)">
                <div className="group bg-zinc-900/60 border border-zinc-800/90 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    {/* Card Header Top */}
                    <div className="p-6 sm:p-7 pb-4">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-800/80 text-amber-300 border border-zinc-700/60">
                          <CategoryIcon className="w-3.5 h-3.5" />
                          <span>{project.categoryLabel}</span>
                        </div>
                        <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.date}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold font-headline text-zinc-100 group-hover:text-amber-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-amber-300/80 mt-1">
                        {project.subtitle}
                      </p>

                      <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Metrics Box (if available) */}
                    {project.metrics && (
                      <div className="px-6 sm:px-7 py-3 grid grid-cols-2 gap-2 bg-zinc-950/40 border-y border-zinc-800/60">
                        {project.metrics.map((m, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                              {m.label}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-amber-300 font-mono">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Highlights Bullets */}
                    <div className="p-6 sm:p-7 pt-4 space-y-2.5">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-semibold">
                        Características Clave:
                      </span>
                      {project.keyHighlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/90 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Tech Stack + Links */}
                  <div className="p-6 sm:p-7 pt-0">
                    <div className="pt-4 border-t border-zinc-800/80">
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800/70 border border-zinc-700/60 text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          asChild
                          size="sm"
                          className="w-full bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 border border-zinc-700 font-semibold text-xs transition-colors gap-2"
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Ver código de ${project.title} en GitHub`}
                          >
                            <Github className="w-4 h-4" />
                            <span>Ver Código en GitHub</span>
                            <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-70" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
}
