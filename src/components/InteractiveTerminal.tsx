'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS } from '@/data/portfolioData';
import { Terminal, Send, CornerDownLeft, Sparkles, Copy, Check } from 'lucide-react';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-amber-400 font-bold">
            👋 Bienvenido al Entorno Interactivo de Juan Alexander Miranda Quispe
          </p>
          <p className="text-xs text-zinc-400">
            Escribe un comando o haz clic en los accesos directos para explorar el perfil técnico.
          </p>
          <p className="text-xs text-zinc-500 font-mono">
            Comandos disponibles: <span className="text-amber-300">whoami</span>,{' '}
            <span className="text-amber-300">stack</span>, <span className="text-amber-300">projects</span>,{' '}
            <span className="text-amber-300">contact</span>, <span className="text-amber-300">stats</span>,{' '}
            <span className="text-amber-300">higgsfield</span>, <span className="text-amber-300">clear</span>
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-amber-400 font-bold">Comandos disponibles:</p>
            <p><span className="text-amber-300 font-bold">whoami</span>     : Resumen profesional y perfil</p>
            <p><span className="text-amber-300 font-bold">stack</span>      : Tecnologías principales (Backend, Frontend, DB)</p>
            <p><span className="text-amber-300 font-bold">projects</span>   : Lista de proyectos y repositorios en GitHub</p>
            <p><span className="text-amber-300 font-bold">contact</span>    : Enlaces de correo, teléfono, WhatsApp y LinkedIn</p>
            <p><span className="text-amber-300 font-bold">stats</span>      : Logros, Décimo Superior y métricas clave</p>
            <p><span className="text-amber-300 font-bold">higgsfield</span>  : Información sobre el conector Higgsfield MCP</p>
            <p><span className="text-amber-300 font-bold">clear</span>      : Limpia la pantalla de la terminal</p>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="space-y-1.5 text-xs text-zinc-300 font-mono">
            <p><strong className="text-white">{PERSONAL_INFO.name}</strong></p>
            <p className="text-amber-300">{PERSONAL_INFO.title}</p>
            <p className="text-zinc-400 mt-1 leading-relaxed">{PERSONAL_INFO.shortBio}</p>
            <p className="text-emerald-400 mt-1">● Experiencia actual: ZyTrust SA (Sector Bancario) &bull; UTP 9.º ciclo</p>
          </div>
        );
        break;

      case 'stack':
        output = (
          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <p className="text-amber-400 font-bold">⚡ Stack Tecnológico Destacado:</p>
            <p>• <span className="text-amber-200">Backend:</span> Java 21, Spring Boot, Apache Kafka, Jakarta EE, Tomcat 10, Python, Node.js</p>
            <p>• <span className="text-amber-200">Frontend:</span> Angular 17+, React, Next.js, TypeScript, Tailwind CSS, HTML5/CSS3</p>
            <p>• <span className="text-amber-200">Bases de Datos:</span> PostgreSQL, MongoDB, Supabase, MySQL</p>
            <p>• <span className="text-amber-200">DevOps &amp; Cloud:</span> Podman/Docker, Prometheus, Grafana, Git, GitHub</p>
            <p>• <span className="text-amber-200">QA &amp; Métodos:</span> JUnit, Postman, Scrum, Documentación técnica estandarizada</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <p className="text-amber-400 font-bold">🚀 Proyectos en GitHub:</p>
            {PROJECTS.map((p, idx) => (
              <div key={p.id} className="pl-2 border-l border-amber-500/30">
                <p className="font-bold text-zinc-100">{idx + 1}. {p.title} <span className="text-amber-400 text-[10px]">({p.date})</span></p>
                <p className="text-zinc-400 text-[11px]">{p.subtitle}</p>
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-[11px]">
                  {p.githubUrl}
                </a>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-amber-400 font-bold">📬 Datos de Contacto Directo:</p>
            <p>• Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-amber-300 hover:underline">{PERSONAL_INFO.email}</a></p>
            <p>• Teléfono: <a href={`tel:${PERSONAL_INFO.rawPhone}`} className="text-amber-300 hover:underline">{PERSONAL_INFO.phone}</a></p>
            <p>• WhatsApp: <a href={`https://wa.me/${PERSONAL_INFO.rawPhone}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Chat Directo</a></p>
            <p>• LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{PERSONAL_INFO.linkedin}</a></p>
            <p>• GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:underline">{PERSONAL_INFO.github}</a></p>
          </div>
        );
        break;

      case 'stats':
        output = (
          <div className="space-y-1.5 text-xs font-mono text-zinc-300">
            <p className="text-amber-400 font-bold">🏆 Métricas &amp; Logros Académicos:</p>
            <p>• <span className="text-emerald-400">Top 10%:</span> Orden de mérito Décimo Superior en Ing. de Sistemas (UTP)</p>
            <p>• <span className="text-emerald-400">Generación TOP:</span> Finalista en programa de excelencia académica Impulsa UTP</p>
            <p>• <span className="text-emerald-400">Inglés C1:</span> Certificación avanzada (Edusoft / UTP)</p>
            <p>• <span className="text-emerald-400">Microservicios:</span> 7 servicios desacoplados con Kafka y Gateway JWT</p>
          </div>
        );
        break;

      case 'higgsfield':
        output = (
          <div className="space-y-1.5 text-xs font-mono text-zinc-300">
            <p className="text-amber-400 font-bold">🎬 Higgsfield MCP Connector Integration:</p>
            <p className="text-zinc-300">
              Higgsfield MCP es el servidor de generación de medios IA (imágenes y video con más de 30 modelos) compatible con el estándar Model Context Protocol.
            </p>
            <p className="text-zinc-400">
              Endpoint remoto: <span className="text-amber-300">https://mcp.higgsfield.ai/mcp</span>
            </p>
            <p className="text-zinc-400">
              Configuración en el proyecto: Consulta el archivo <span className="text-zinc-200 font-bold">.mcp/higgsfield-mcp.json</span> y la guía completa en <span className="text-zinc-200 font-bold">docs/HIGGSFIELD_MCP_GUIDE.md</span>.
            </p>
          </div>
        );
        break;

      default:
        output = (
          <div className="text-xs font-mono text-red-400">
            Comando no reconocido: &quot;{rawCmd}&quot;. Escribe <span className="text-amber-300 font-bold">help</span> para ver la lista de comandos disponibles.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  const presetButtons = ['whoami', 'stack', 'projects', 'contact', 'stats', 'higgsfield', 'clear'];

  return (
    <section id="terminal" className="py-20 px-4 sm:px-6 relative bg-zinc-950/60">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive CLI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-headline text-zinc-100">
            Terminal de Control de Desarrollador
          </h2>
          <p className="mt-2 text-zinc-400 text-xs sm:text-sm">
            Explora interactivamente mis credenciales, repositorios y datos de contacto a través de la consola.
          </p>

          {/* Quick preset chips */}
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {presetButtons.map((btn) => (
              <button
                key={btn}
                onClick={() => handleCommand(btn)}
                className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-amber-300 hover:border-amber-400/40 transition-colors"
              >
                ${btn}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window Box */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Window Title Bar */}
          <div className="bg-zinc-900/90 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              <span className="text-xs font-mono text-zinc-400 ml-2">
                bash &bull; alex@jamq-portfolio:~
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">v2.4.0</span>
          </div>

          {/* Terminal Screen Body */}
          <div className="p-4 sm:p-6 min-h-[260px] max-h-[420px] overflow-y-auto space-y-4 font-mono text-xs">
            {history.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-amber-400">alex@portfolio:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Prompt */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center gap-2"
          >
            <span className="text-amber-400 font-mono text-xs pl-2 font-bold shrink-0">
              alex@portfolio:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Escribe un comando (ej. 'stack', 'projects', 'contact')..."
              className="w-full bg-transparent border-none outline-none text-zinc-200 text-xs font-mono placeholder:text-zinc-600 focus:ring-0"
            />
            <button
              type="submit"
              className="p-1.5 rounded-md bg-amber-400 hover:bg-amber-300 text-zinc-950 transition-colors shrink-0"
              aria-label="Enviar comando"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
