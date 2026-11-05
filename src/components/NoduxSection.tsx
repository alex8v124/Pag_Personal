'use client';

import React, { useState } from 'react';
import {
  Building2,
  Database,
  MessageSquare,
  TrendingUp,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Server,
  Zap,
  Globe2,
  Bot,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  GraduationCap,
  Car,
} from 'lucide-react';
import Card3D from '@/components/3d/Card3D';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function NoduxSection() {
  const [activeTab, setActiveTab] = useState<'suites' | 'platforms' | 'audit'>('suites');

  const deployedPlatforms = [
    {
      category: 'E-Commerce & Logística',
      title: 'Plataforma E-Commerce Nodux',
      description:
        'Solución integral de comercio electrónico con gestión de inventarios en tiempo real, carrito reactivo optimizado y pasarela de pagos transaccional.',
      stack: ['Angular 17+', 'TypeScript', 'RxJS', 'Spring Boot'],
      icon: ShoppingBag,
      tag: 'Logística B2B',
    },
    {
      category: 'Sector Educativo',
      title: 'Nodux Educa — EdTech LMS',
      description:
        'Plataforma educativa interactiva orientada a la gestión de cursos, alumnos y material didáctico optimizada para alto rendimiento y baja latencia.',
      stack: ['Next.js 15', 'React', 'Tailwind CSS', 'PostgreSQL'],
      icon: GraduationCap,
      tag: 'EdTech',
    },
    {
      category: 'Sector Automotriz',
      title: 'Portal Automotriz NX-7 PHEV',
      description:
        'Landing page inmersiva con visualizador interactivo 3D de modelos, acabados, especificaciones técnicas y cotizador dinámico multicanal.',
      stack: ['Three.js', 'JavaScript ES6+', 'HTML5 3D', 'CSS3'],
      icon: Car,
      tag: 'Visualizador 3D',
    },
    {
      category: 'Empresas B2B',
      title: 'Web Corporativa Institucional',
      description:
        'Portales corporativos de alto impacto enfocados en conversión comercial B2B, arquitectura robusta y tiempos de carga inmediatos.',
      stack: ['Angular', 'TypeScript', 'SCSS', 'SSR'],
      icon: Globe2,
      tag: 'Corporativo',
    },
  ];

  return (
    <section id="nodux" className="py-24 px-4 sm:px-6 relative bg-zinc-950/60 border-y border-zinc-900">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-1/3 w-[450px] h-[450px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-sky-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto max-w-6xl">
        {/* Header Banner: CTO & Co-Founder Showcase */}
        <div className="bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  CTO &amp; CO-FOUNDER &bull; EN OPERACIÓN
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Nodux Tech &bull; Consultoría de Operaciones &amp; IA
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-zinc-100 tracking-tight">
                NODUX{' '}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Ecosistema Tecnológico B2B
                </span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                <em className="text-amber-300/90 font-medium">“Soluciones que se adaptan a ti, tecnología que transforma.”</em> Como Chief Technology Officer (CTO), dirijo la arquitectura de software punta a punta, la infraestructura Cloud Serverless, ingeniería de datos y el despliegue de plataformas productivas con inteligencia artificial y optimización cuántica.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono text-zinc-300">
                  Ingeniería Full-Stack
                </span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono text-zinc-300">
                  Suites IA &amp; Data Quality
                </span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono text-zinc-300">
                  Cloud Serverless
                </span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono text-zinc-300">
                  4 Plataformas en Prod
                </span>
              </div>
            </div>

            {/* Quick Action Link Pills */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs gap-2 shadow-lg shadow-amber-400/20"
                data-magnetic="true"
                data-cursor-label="Web Nodux"
              >
                <a
                  href="https://nx-profiler-nine.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe2 className="w-4 h-4" />
                  <span>Portal Corporativo Nodux</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-zinc-700 hover:border-amber-400/60 bg-zinc-900/80 text-zinc-200 text-xs gap-2"
                data-magnetic="true"
                data-cursor-label="Kiro RestQube"
              >
                <a
                  href="https://kirorestqube.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Kiro RestQube (Podio AWS)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-zinc-700 hover:border-indigo-400/60 bg-zinc-900/80 text-zinc-200 text-xs gap-2"
                data-magnetic="true"
                data-cursor-label="Nodux Quantum"
              >
                <a
                  href="https://nodux-quantum.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span>Nodux Quantum Platform</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('suites')}
            data-magnetic="true"
            data-cursor-label="Suites IA"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === 'suites'
                ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-400/20'
                : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            1. Suites de IA &amp; Datos (PhyData &amp; Commercial OS)
          </button>
          <button
            onClick={() => setActiveTab('platforms')}
            data-magnetic="true"
            data-cursor-label="Plataformas"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === 'platforms'
                ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-400/20'
                : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            2. Portafolio de Plataformas Desplegadas (4)
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            data-magnetic="true"
            data-cursor-label="FinOps"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
              activeTab === 'audit'
                ? 'bg-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-400/20'
                : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            3. Higiene de Datos &amp; FinOps B2B
          </button>
        </div>

        {/* TAB 1: SUITES DE IA & DATOS */}
        {activeTab === 'suites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* PhyData AI Card */}
            <Card3D depth={18} glowColor="rgba(56, 189, 248, 0.25)" className="h-full">
              <div className="h-full bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-sky-500/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30 font-bold">
                      DATA QUALITY &amp; ML SUITE
                    </span>
                    <Database className="w-4 h-4 text-sky-400" />
                  </div>
                  <h3 className="text-xl font-bold font-headline text-zinc-100">
                    PhyData AI — Limpieza y Optimización con IA
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Plataforma inteligente desarrollada por nuestro equipo técnico para la ingesta masiva, previsualización, diagnóstico automatizado, limpieza asistida por IA, validación relacional y generación de reportes ejecutivos sobre bases de datos empresariales.
                  </p>
                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>Ingesta Masiva &bull; Diagnóstico IA</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>Estandarización de SKUs (hasta 3,000 items)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>Validación Human-in-the-Loop</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Stack: Python &bull; PostgreSQL &bull; IA</span>
                  <span className="text-sky-400 font-bold">En Producción</span>
                </div>
              </div>
            </Card3D>

            {/* Nodux AI & Despacho Transaccional */}
            <Card3D depth={18} glowColor="rgba(16, 185, 129, 0.25)" className="h-full">
              <div className="h-full bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                      B2B OPERATIONS &bull; WHATSAPP ENGINE
                    </span>
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold font-headline text-zinc-100">
                    Nodux AI &amp; Despacho Transaccional Rápido
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Transformamos catálogos físicos y hojas de cálculo fragmentadas en infraestructuras de consulta inmediata y despacho por WhatsApp, reduciendo el tiempo de cotización en mostrador de <strong className="text-white">4 minutos a 10 segundos</strong>.
                  </p>
                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Validado en: Aprende a Emprender (Produce)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Cotización en 10s (Reducción del 95% tiempo)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Arquitectura multicanal con Webhooks</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Stack: Node.js &bull; WhatsApp API &bull; Redis</span>
                  <span className="text-emerald-400 font-bold">Validado PRODUCE</span>
                </div>
              </div>
            </Card3D>

            {/* Commercial OS */}
            <Card3D depth={18} glowColor="rgba(245, 158, 11, 0.25)" className="h-full">
              <div className="h-full bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-amber-500/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                      PROSPECCIÓN IA &amp; KANBAN
                    </span>
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold font-headline text-zinc-100">
                    Commercial OS — CRM B2B &amp; Motor FinOps
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    Sistema comercial de 7 etapas estructuradas para gobernar el ciclo de ventas completo: extracción de leads vía Omnibox, diagnóstico con <strong className="text-white">motor Gemini</strong>, propuesta DOC-02 Ready, Kanban reactivo y simulador de ROI (+418% y Payback 69d).
                  </p>
                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>AutoScout B2B &bull; Omnibox Search</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Caja Proyectada &amp; Valor Facial de Cartera</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Simulador de ROI &amp; Detección de Stock Muerto</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Stack: Next.js &bull; Gemini API &bull; FinOps</span>
                  <span className="text-amber-400 font-bold">App en Producción</span>
                </div>
              </div>
            </Card3D>
          </div>
        )}

        {/* TAB 2: PORTAFOLIO DE 4 PLATAFORMAS DESPLEGADAS */}
        {activeTab === 'platforms' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deployedPlatforms.map((p, idx) => {
              const Icon = p.icon;
              return (
                <Card3D key={idx} depth={16} glowColor="rgba(245, 158, 11, 0.2)" className="h-full">
                  <div className="h-full bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 backdrop-blur-md flex flex-col justify-between hover:border-amber-400/40 transition-colors">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                          {p.tag}
                        </span>
                        <Icon className="w-4 h-4 text-amber-400" />
                      </div>
                      <span className="text-[11px] text-zinc-400 font-mono block">
                        {p.category}
                      </span>
                      <h4 className="text-base font-bold font-headline text-zinc-100 mt-1">
                        {p.title}
                      </h4>
                      <p className="mt-2.5 text-xs text-zinc-300 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-zinc-800">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1.5">
                        Arquitectura:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card3D>
              );
            })}
          </div>
        )}

        {/* TAB 3: HIGIENE DE DATOS & FINOPS B2B */}
        {activeTab === 'audit' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
                  DOC-03 &bull; Diagnóstico Financiero
                </span>
                <h4 className="text-lg font-bold font-headline text-zinc-100">
                  Dictamen de Costo de No-Calidad
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Auditoría técnica para cuantificar el capital inmovilizado, compras dobles por duplicados y pérdida de horas-hombre en almacenes B2B mediante modelos algorítmicos.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400">
                Métrica: Horas-hombre &amp; Capital Inmovilizado
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-sky-400 font-bold block mb-1">
                  DOC-09 &bull; Higiene de Datos
                </span>
                <h4 className="text-lg font-bold font-headline text-zinc-100">
                  Base Maestra Estandarizada
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Consolidación y normalización semántica de hasta 3,000 SKUs con taxonomía de familias, unidades de medida y alertas automáticas de auditoría en piso.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400">
                Métrica: 3,000 SKUs &bull; Taxonomía Normalizada
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">
                  Business Case &amp; ROI
                </span>
                <h4 className="text-lg font-bold font-headline text-zinc-100">
                  Matrices de Sensibilidad FinOps
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Modelado de retorno de inversión (Payback en días) en escenarios Conservador, Moderado y Óptimo para cierre de contratos de alto valor con decisores y CFOs.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400">
                Métrica: Payback 69 días &bull; ROI +418%
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
