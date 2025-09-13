'use client';

import { Code, Briefcase, Sparkles, Mail, FileText } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {

  const navLinks = [
    { href: "#hero", label: "Inicio", icon: <Sparkles /> },
    { href: "#experience", label: "Experiencia", icon: <Briefcase /> },
    { href: "#skills", label: "Habilidades", icon: <Code /> },
    { href: "#contact", label: "Contacto", icon: <Mail /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 max-w-6xl items-center justify-between">
        <a className="flex items-center space-x-2" href="/">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-bold text-foreground font-headline">J. Alexander M.Q.</span>
        </a>

        <div className="flex items-center gap-4">
          <Button>
            <a href="/cv.pdf" download className="flex items-center gap-2">
              <FileText />
              Descargar CV
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
