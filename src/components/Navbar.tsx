'use client';

import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import {
  Terminal,
  FileDown,
  Menu,
  X,
  ExternalLink,
  Code2,
  Briefcase,
  Layers,
  GraduationCap,
  Mail,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['inicio', 'sobre-mi', 'experiencia', 'proyectos', 'habilidades', 'logros', 'terminal', 'contacto'];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Inicio', icon: Sparkles },
    { href: '#sobre-mi', label: 'Sobre Mí', icon: Code2 },
    { href: '#experiencia', label: 'Experiencia', icon: Briefcase },
    { href: '#proyectos', label: 'Proyectos', icon: Layers },
    { href: '#habilidades', label: 'Habilidades', icon: Terminal },
    { href: '#logros', label: 'Logros', icon: GraduationCap },
    { href: '#contacto', label: 'Contacto', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Juan Alexander Miranda Quispe"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-zinc-950 font-bold text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-mono tracking-tighter">JM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold font-headline text-zinc-100 group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
              Juan Alexander
              <span className="hidden md:inline text-xs px-1.5 py-0.5 rounded bg-zinc-800/80 text-amber-300/90 font-mono border border-zinc-700/50">
                Full-Stack
              </span>
            </span>
            <span className="text-[11px] text-zinc-400 font-mono hidden sm:block">
              Ing. de Sistemas e Informática
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/80 rounded-full px-3 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 shadow-md font-semibold'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden sm:inline-flex border-zinc-700 hover:border-amber-400/60 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-amber-300 text-xs gap-1.5"
          >
            <a href="/cv.pdf" download="CV_Juan_Alexander_Miranda_Quispe.pdf">
              <FileDown className="w-3.5 h-3.5" />
              <span>CV (PDF)</span>
            </a>
          </Button>

          <Button
            asChild
            size="sm"
            className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-xs shadow-md shadow-amber-400/20"
          >
            <a href="#contacto">Hablemos</a>
          </Button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-2xl px-6 py-6 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-zinc-900 hover:text-amber-400 transition-colors"
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{link.label}</span>
                </a>
              );
            })}
            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
              <a
                href="/cv.pdf"
                download
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-medium text-zinc-200"
              >
                <FileDown className="w-4 h-4 text-amber-400" />
                Descargar CV (PDF)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
