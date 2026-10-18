'use client';

import React from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { Github, Linkedin, Mail, Heart, Sparkles, ArrowUp, Code2 } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-zinc-950 font-bold text-sm font-mono">
                JM
              </div>
              <span className="font-bold text-zinc-100 font-headline text-lg">
                Juan Alexander Miranda Quispe
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-2 font-mono max-w-md">
              Ingeniería de Sistemas e Informática &bull; Full-Stack &amp; Microservicios (Java 21, Spring Boot, Angular, React)
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-white hover:bg-zinc-900">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-blue-400 hover:bg-zinc-900">
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:text-amber-400 hover:bg-zinc-900">
              <a href={`mailto:${PERSONAL_INFO.email}`} aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 ml-2"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bottom Credits & Higgsfield note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono">
          <p>
            &copy; {new Date().getFullYear()} Juan Alexander Miranda Quispe. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Higgsfield MCP Ready &bull; Desplegado en Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
