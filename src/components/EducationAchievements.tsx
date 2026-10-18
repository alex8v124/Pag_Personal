'use client';

import React from 'react';
import { EDUCATION_DATA } from '@/data/portfolioData';
import {
  GraduationCap,
  Award,
  Globe2,
  CheckCircle2,
  Calendar,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function EducationAchievements() {
  const honors = [
    {
      title: 'Orden de Mérito: Décimo Superior',
      organization: 'Universidad Tecnológica del Perú (UTP)',
      category: 'Excelencia Académica',
      description:
        'Reconocimiento por rendimiento académico sobresaliente, ubicándose en el 10% superior de la promoción en la carrera de Ingeniería de Sistemas e Informática.',
      icon: Award,
      badge: 'Top 10%',
      color: 'text-amber-400',
    },
    {
      title: 'Finalista Generación TOP / Impulsa UTP',
      organization: 'Programa de Alto Rendimiento UTP',
      category: 'Liderazgo & Talento',
      description:
        'Seleccionado entre los mejores expedientes académicos de la facultad para programas de formación especializada, aceleración profesional y liderazgo tecnológico.',
      icon: Sparkles,
      badge: 'Generación TOP',
      color: 'text-emerald-400',
    },
    {
      title: 'Certificación de Inglés C1 Avanzado',
      organization: 'Edusoft / Universidad Tecnológica del Perú',
      category: 'Competencia Lingüística',
      description:
        'Dominio avanzado del idioma inglés, capacitado para entablar negociaciones técnicas, coordinar con equipos multiculturales y redactar documentación de sistemas en inglés.',
      icon: Globe2,
      badge: 'Nivel C1',
      color: 'text-blue-400',
    },
  ];

  return (
    <section id="logros" className="py-20 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Formación &amp; Méritos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-zinc-100">
            Educación &amp; Reconocimientos
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base">
            Bases académicas sólidas respaldadas por distinciones de mérito institucional y acreditación lingüística.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Education Box (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-xl hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400">Educación Superior</span>
                <h3 className="text-xl font-bold font-headline text-zinc-100">
                  {EDUCATION_DATA.institution}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-zinc-400 block">Grado / Carrera:</span>
                <p className="text-base font-semibold text-zinc-200 mt-0.5">
                  {EDUCATION_DATA.degree}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{EDUCATION_DATA.period}</span>
              </div>

              <div className="inline-block px-3 py-1 rounded-md bg-zinc-800/80 border border-zinc-700 text-xs font-mono text-zinc-300">
                {EDUCATION_DATA.status}
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-2.5">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block font-semibold">
                  Hitos Académicos:
                </span>
                {EDUCATION_DATA.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/90 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Honors Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {honors.map((honor, idx) => {
              const Icon = honor.icon;
              return (
                <div
                  key={idx}
                  className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 sm:p-6 backdrop-blur-md shadow-xl hover:border-zinc-700 transition-all duration-300 hover:translate-x-1"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700 flex items-center justify-center shrink-0">
                        <Icon className={`w-4 h-4 ${honor.color}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-zinc-100 font-headline">
                          {honor.title}
                        </h4>
                        <span className="text-xs text-zinc-400 font-mono">
                          {honor.organization}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono border-zinc-700 text-amber-300 bg-amber-400/5 shrink-0">
                      {honor.badge}
                    </Badge>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed pl-12">
                    {honor.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
