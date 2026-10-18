'use client';

import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '@/data/portfolioData';
import {
  Terminal,
  Cpu,
  Layers,
  Database,
  Cloud,
  Sparkles,
  Search,
  CheckCircle2,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SkillsSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return Cpu;
      case 1:
        return Layers;
      case 2:
        return Database;
      case 3:
        return Cloud;
      case 4:
        return Sparkles;
      default:
        return Terminal;
    }
  };

  return (
    <section id="habilidades" className="py-20 px-4 sm:px-6 relative bg-zinc-950/40">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Matriz de Competencias</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-zinc-100">
            Habilidades Técnicas &amp; Herramientas
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base">
            Stack tecnológico dominado y aplicado en entornos bancarios, sistemas distribuidos y desarrollo de software full-stack.
          </p>

          {/* Search bar */}
          <div className="mt-6 w-full max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <Input
              type="text"
              placeholder="Buscar tecnología (ej. Java, Angular, Kafka, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-zinc-900/80 border-zinc-800 text-zinc-200 placeholder:text-zinc-500 rounded-full text-xs font-mono focus:border-amber-400 focus:ring-amber-400/20"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = getCategoryIcon(idx);

            const filteredSkills = category.skills.filter((s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (searchQuery && filteredSkills.length === 0) {
              return null;
            }

            return (
              <div
                key={category.category}
                className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold font-headline text-base text-zinc-100">
                        {category.category}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {filteredSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`text-xs font-mono px-2.5 py-1 rounded-md transition-all duration-200 flex items-center gap-1.5 ${
                          skill.highlight
                            ? 'bg-amber-400/10 border border-amber-400/30 text-amber-300 font-semibold shadow-sm'
                            : 'bg-zinc-800/60 border border-zinc-700/60 text-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        {skill.highlight && <Sparkles className="w-3 h-3 text-amber-400" />}
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>{filteredSkills.length} competencias</span>
                  <span className="text-amber-400/80 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verificado
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
