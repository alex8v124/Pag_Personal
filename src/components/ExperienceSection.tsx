'use client';

import React from 'react';
import { EXPERIENCES } from '@/data/portfolioData';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Card3D from '@/components/3d/Card3D';

export default function ExperienceSection() {
  return (
    <section id="experiencia" className="py-20 px-4 sm:px-6 relative bg-zinc-950/40">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Trayectoria Laboral</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-zinc-100">
            Experiencia Profesional
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base">
            Participación en proyectos bancarios de alta criticidad, consultoría ERP y desarrollo de software empresarial.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-zinc-800 ml-4 sm:ml-8 space-y-12">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Glowing Node */}
              <div
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${
                  exp.isCurrent
                    ? 'bg-amber-400 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                    : 'bg-zinc-800 border-zinc-600 group-hover:border-amber-400 group-hover:bg-amber-400'
                }`}
              />

              {/* 3D Tilt Card */}
              <Card3D depth={18} glowColor="rgba(251, 191, 36, 0.2)">
                <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-xl hover:border-zinc-700 transition-all duration-300">
                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-xl font-bold font-headline text-zinc-100 group-hover:text-amber-400 transition-colors">
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            Actual
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-zinc-300 mt-1 font-medium">
                        <span className="flex items-center gap-1.5 text-amber-300">
                          <Building2 className="w-4 h-4" />
                          {exp.company}
                        </span>
                        <span className="text-zinc-600">&bull;</span>
                        <span className="text-zinc-400 text-xs sm:text-sm">{exp.type}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1 shrink-0">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-800/60 px-3 py-1 rounded-full border border-zinc-700/50">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {exp.period}
                      </div>
                      <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  <div className="mt-5 space-y-3">
                    {exp.description.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-amber-400/90 shrink-0 mt-1" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies used */}
                  <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400 mr-1">Stack:</span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/60 text-zinc-300 hover:text-amber-300 hover:border-amber-400/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card3D>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
