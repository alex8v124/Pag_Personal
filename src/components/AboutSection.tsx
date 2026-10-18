'use client';

import React from 'react';
import { PERSONAL_INFO, EDUCATION_DATA } from '@/data/portfolioData';
import {
  User,
  ShieldCheck,
  Server,
  Sparkles,
  Award,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Layers,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AboutSection() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: 'Sector Bancario & Seguridad',
      description:
        'Desarrollo de servicios backend de alta disponibilidad y portales web en ZyTrust SA para clientes del sector financiero, mitigando vulnerabilidades críticas.',
      color: 'text-amber-400',
      badge: 'ZyTrust SA',
    },
    {
      icon: Server,
      title: 'Arquitectura & Microservicios',
      description:
        'Diseño desacoplado y orientado a eventos con Apache Kafka, API Gateways perimetrales con JWT y persistencia políglota (PostgreSQL + MongoDB).',
      color: 'text-blue-400',
      badge: 'Event-Driven',
    },
    {
      icon: Award,
      title: 'Excelencia Académica UTP',
      description:
        'Perteneciente al Décimo Superior en Ingeniería de Sistemas e Informática. Finalista en el programa de mérito Generación TOP / Impulsa UTP.',
      color: 'text-emerald-400',
      badge: 'Top 10%',
    },
    {
      icon: Globe2,
      title: 'Dominio de Inglés C1 Avanzado',
      description:
        'Certificación de nivel C1 (Edusoft / UTP), permitiendo una comunicación fluida y redacción técnica precisa en entornos globales y remotos.',
      color: 'text-purple-400',
      badge: 'C1 Certified',
    },
  ];

  return (
    <section id="sobre-mi" className="py-20 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Perfil Profesional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-zinc-100">
            Sobre Mí &amp; Enfoque Técnico
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base">
            Combinación de rigor analítico, experiencia bancaria y diseño de sistemas escalables.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Story Box (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-headline text-zinc-100">
                    Ingeniería con Visión de Negocio
                  </h3>
                  <span className="text-xs text-zinc-400 font-mono">
                    Universidad Tecnológica del Perú &bull; 9.º Ciclo
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Soy estudiante de <strong className="text-white">Ingeniería de Sistemas e Informática</strong> con una sólida formación en desarrollo full-stack, automatización de procesos y optimización de bases de datos de alta concurrencia.
                </p>
                <p>
                  Mi experiencia abarca desde el desarrollo de soluciones empresariales y módulos ERP / Punto de Venta en <strong className="text-white">PowerScript y SQL</strong>, hasta la construcción de servicios backend bancarios con <strong className="text-amber-300 font-mono">Java 21, Spring Boot y Angular</strong> en ZyTrust SA, donde participé en migraciones críticas hacia Jakarta EE y Tomcat 10.
                </p>
                <p>
                  Me caracterizo por mi liderazgo técnico, comunicación asertiva, documentación rigurosa para QA y un enfoque constante en la mejora continua de procesos que impactan directamente el rendimiento y la seguridad del negocio.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Disponible para retos de alta exigencia técnica</span>
              </div>
              <Button asChild size="sm" variant="ghost" className="text-amber-400 hover:text-amber-300 p-0 hover:bg-transparent text-xs gap-1">
                <a href="#experiencia">
                  Ver trayectoria laboral <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </Button>
            </div>
          </div>

          {/* 4 Pillars Grid (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-md hover:border-zinc-700 transition-all duration-300 hover:translate-x-1"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-5 h-5 ${item.color}`} />
                      <h4 className="font-bold text-sm text-zinc-200">{item.title}</h4>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono border-zinc-700 text-zinc-300 bg-zinc-800/50">
                      {item.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
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
