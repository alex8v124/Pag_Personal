"use client";

import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Sparkles,
  Cpu,
  Database,
  Globe,
  GitMerge,
  Languages,
  CheckCircle,
  BarChart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const personalInfo = {
  name: "Juan Alexander Miranda Quispe",
  title: "Estudiante de Ingeniería de Sistemas e Informática",
  subtitle: "En formación en gestión, desarrollo y aplicación de tecnologías de la información.",
  location: "Lurigancho-Chosica, Lima, Perú",
  phone: "(+51) 906 442 235",
  email: "alex.04.antay@gmail.com",
  github: "https://github.com/alex8v124",
  linkedin: "https://www.linkedin.com/in/juan-alexander-miranda-quispe-0673812a3/",
  profile: "Estudiante de Ingeniería de Sistemas e Informática (9.º ciclo), con sólida formación en desarrollo web, programación orientada a objetos (Java, Python, PowerScript), uso aplicado de frameworks y desarrollo mediante APIs. Apasionado por la resolución de problemas y la creación de soluciones digitales innovadoras. Me destaco por mi rápida capacidad de aprendizaje y adaptación. Busco integrarme como practicante preprofesional en una empresa donde pueda aportar mis habilidades técnicas y continuar desarrollándome en áreas como desarrollo de software, machine learning, entre otras tecnologías emergentes.",
};

const education = {
  institution: "Universidad Tecnológica del Perú",
  degree: "Grado en Ingeniería de Sistemas e Informática",
  period: "2022 - Presente (Graduación esperada: 2026)",
};

const experiences = [
  {
    role: "Desarrollo de sistema Punto de Venta",
    company: "VMAsoftware & IC Systems",
    type: "Consultor independiente (honorarios)",
    period: "Diciembre 2024 – Abril 2025",
    description: "Desarrollo e implementación de funcionalidades específicas para sistema de Punto de Venta utilizando PowerScript. Mantenimiento de módulos del sistema ERP Punto de Venta y adaptación del sistema a requerimientos específicos. Modalidad de trabajo freelance por honorarios.",
  },
  {
    role: "Asistencia en desarrollo de Punto de Venta y ERP",
    company: "VMAsoftware & IC Systems",
    type: "Consultor independiente (honorarios)",
    period: "Enero 2024 – Abril 2024",
    description: "Apoyo en desarrollo y mejora de sistemas Punto de Venta (P.Venta) y ERP. Colaboración en diseño, pruebas y mantenimiento de funcionalidades. Trabajo bajo modalidad de consultoría por honorarios.",
  },
];

const skills = [
    { category: "Lenguajes de Programación", icon: <Cpu className="w-5 h-5" />, items: ["Java", "Python", "PowerScript"] },
    { category: "Bases de Datos", icon: <Database className="w-5 h-5" />, items: ["SQL avanzado", "MongoDB"] },
    { category: "Desarrollo Web", icon: <Globe className="w-5 h-5" />, items: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "React", "Angular", "Vue.js", "Node.js", "Next.js", "Spring"] },
    { category: "Control de Versiones", icon: <GitMerge className="w-5 h-5" />, items: ["Git", "GitHub"] },
    { category: "Análisis y Ofimática", icon: <BarChart className="w-5 h-5" />, items: ["Excel intermedio", "Power BI"] },
    { category: "Fundamentos", icon: <Code className="w-5 h-5" />, items: ["Algoritmos y Estructuras de Datos", "APIs RESTful", "Testing y QA (JUnit, Postman)", "Metodologías Ágiles (Scrum)"] },
    { category: "Idiomas", icon: <Languages className="w-5 h-5" />, items: ["Inglés intermedio (B1)"] },
];

const AnimatedCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <Card className={`bg-card/80 backdrop-blur-sm border-border/20 shadow-lg hover:shadow-primary/20 transition-all duration-300 animate-slide-in-up hover:-translate-y-1 ${className}`} style={{ animationDelay: `${delay}ms` }}>
    {children}
  </Card>
);

export default function PersonalShowcasePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Header />
      <main className="container mx-auto max-w-6xl p-4 sm:p-6 md:p-8">
        
        <section id="hero" className="text-center py-20 animate-slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold font-headline tech-glow text-primary">{personalInfo.name}</h1>
            <p className="mt-4 text-xl md:text-2xl text-muted-foreground font-mono">{personalInfo.title}</p>
            <p className="mt-3 text-md text-muted-foreground/80 max-w-3xl mx-auto">{personalInfo.subtitle}</p>
            <div className="mt-10 flex justify-center gap-4">
                <Button asChild size="lg">
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github /> GitHub
                  </a>
                </Button>
                <Button variant="secondary" asChild size="lg">
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin /> LinkedIn
                  </a>
                </Button>
            </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <AnimatedCard delay={200}>
                <CardHeader>
                    <CardTitle className="flex items-center text-accent"><Sparkles className="mr-3"/>Sobre Mí</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{personalInfo.profile}</p>
                </CardContent>
            </AnimatedCard>

             <AnimatedCard delay={300}>
                <CardHeader>
                    <CardTitle className="flex items-center text-accent"><GraduationCap className="mr-3"/>Educación</CardTitle>
                </CardHeader>
                <CardContent>
                    <h3 className="font-semibold text-foreground">{education.institution}</h3>
                    <p className="text-muted-foreground">{education.degree}</p>
                    <p className="text-sm text-muted-foreground/80">{education.period}</p>
                </CardContent>
            </AnimatedCard>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <AnimatedCard delay={400}>
              <CardHeader>
                <CardTitle className="flex items-center text-accent"><Briefcase className="mr-3"/>Experiencia Profesional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-lg text-foreground">{exp.role}</h3>
                            <p className="text-muted-foreground">{exp.company} - <span className="italic">{exp.type}</span></p>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">{exp.period}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 leading-snug">{exp.description}</p>
                    {index < experiences.length - 1 && <Separator className="mt-8 bg-border/20" />}
                  </div>
                ))}
              </CardContent>
            </AnimatedCard>
            
            <AnimatedCard delay={500}>
                <CardHeader>
                    <CardTitle className="flex items-center text-accent"><MapPin className="mr-3"/>Contacto</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-4">
                    <p className="flex items-center"><Mail className="w-4 h-4 mr-3 shrink-0 text-primary"/><span>{personalInfo.email}</span></p>
                    <p className="flex items-center"><Phone className="w-4 h-4 mr-3 shrink-0 text-primary"/><span>{personalInfo.phone}</span></p>
                    <p className="flex items-center"><MapPin className="w-4 h-4 mr-3 shrink-0 text-primary" /><span>{personalInfo.location}</span></p>
                </CardContent>
            </AnimatedCard>
          </div>
        </div>
        
        <AnimatedCard className="mt-8" delay={600}>
          <CardHeader>
            <CardTitle className="flex items-center text-accent"><Code className="mr-3"/>Habilidades Técnicas</CardTitle>
            <CardDescription>Un resumen de las tecnologías y herramientas que manejo.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillCategory) => (
              <div key={skillCategory.category}>
                <h4 className="flex items-center gap-2 font-semibold mb-3 text-md text-foreground">
                  {skillCategory.icon}
                  {skillCategory.category}
                </h4>
                <ul className="space-y-2">
                  {skillCategory.items.map((item) => (
                    <li key={item} className="flex items-center text-muted-foreground text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary/70 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </AnimatedCard>

      </main>
      <Footer />
    </div>
  );
}
