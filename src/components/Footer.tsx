import { Github, Linkedin, Mail, Code } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border/20 bg-card/50">
      <div className="container py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              Diseñado y desarrollado por Juan Alexander Miranda Quispe.
            </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/alex8v124" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://www.linkedin.com/in/juan-alexander-miranda-quispe-0673812a3/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:alex.04.antay@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
      <div className="container pb-4">
        <p className="text-center text-xs text-muted-foreground/50">
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
