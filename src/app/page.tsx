"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Sparkles
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const personalInfo = {
  name: "Juan Alexander Miranda Quispe",
  title: "Estudiante de Ingeniería de Sistemas e Informática",
  subtitle: "En formación en gestión, desarrollo y aplicación de tecnologías de la información",
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
    { category: "Lenguajes de programación", items: ["Java", "Python", "PowerScript"] },
    { category: "Bases de datos", items: ["SQL avanzado", "MongoDB"] },
    { category: "Ofimática y análisis de datos", items: ["Excel intermedio", "Power BI"] },
    { category: "Desarrollo web", items: ["HTML5", "CSS3", "JavaScript", "Bootstrap"] },
    { category: "Frameworks de desarrollo", items: ["React", "Angular", "Vue.js", "Node.js", "Next.js", "Spring"] },
    { category: "Desarrollo móvil", items: ["Android Studio"] },
    { category: "Control de versiones", items: ["Git", "GitHub"] },
    { category: "Conceptos Fundamentales", items: ["Algoritmos y Estructuras de Datos", "APIs RESTful", "Testing y QA (JUnit, Postman)", "Redes y Seguridad", "Metodologías Ágiles (Scrum)"] },
    { category: "Idiomas", items: ["Inglés intermedio (B1)"] },
];

const AnimatedCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in-up ${className}`} style={{ animationDelay: `${delay}ms` }}>
    {children}
  </Card>
);

export default function PersonalShowcasePage() {
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");

  useEffect(() => {
    const placeholder = PlaceHolderImages.find(img => img.id === 'profile-picture');
    if (placeholder) {
      setProfilePictureUrl(placeholder.imageUrl);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary text-foreground font-body">
      <Header />
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
        
        <section id="hero" className="text-center py-20 animate-slide-in-up">
            <Avatar className="w-40 h-40 mb-6 mx-auto border-8 border-card shadow-lg">
                <AvatarImage src={profilePictureUrl} alt={personalInfo.name} data-ai-hint="professional portrait" />
                <AvatarFallback>{personalInfo.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animated-gradient">{personalInfo.name}</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">{personalInfo.title}</p>
            <p className="mt-2 text-md text-muted-foreground max-w-2xl mx-auto">{personalInfo.subtitle}</p>
            <div className="mt-8 flex justify-center gap-4">
                <Button asChild>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github /> GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild>
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
                <CardTitle>Contacto</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-4">
                <p className="flex items-start"><MapPin className="w-4 h-4 mr-3 mt-1 shrink-0 text-primary" /><span>{personalInfo.location}</span></p>
                <a href={`mailto:${personalInfo.email}`} className="flex items-center transition-colors hover:text-primary"><Mail className="w-4 h-4 mr-3 shrink-0 text-primary"/>{personalInfo.email}</a>
                <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="flex items-center transition-colors hover:text-primary"><Phone className="w-4 h-4 mr-3 shrink-0 text-primary"/>{personalInfo.phone}</a>
              </CardContent>
            </AnimatedCard>
             <AnimatedCard delay={300}>
              <CardHeader>
                <CardTitle className="flex items-center"><GraduationCap className="mr-3 text-primary"/>Educación</CardTitle>
              </CardHeader>
              <CardContent>
                  <h3 className="font-semibold">{education.institution}</h3>
                  <p className="text-muted-foreground">{education.degree}</p>
                  <p className="text-sm text-muted-foreground/80">{education.period}</p>
              </CardContent>
            </AnimatedCard>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <AnimatedCard delay={400}>
              <CardHeader>
                <CardTitle className="flex items-center"><Sparkles className="mr-3 text-primary"/>Perfil Profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{personalInfo.profile}</p>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard delay={500}>
              <CardHeader>
                <CardTitle className="flex items-center"><Briefcase className="mr-3 text-primary"/>Experiencia Profesional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="mt-1">
                      <h3 className="font-semibold text-lg">{exp.role}</h3>
                      <p className="text-muted-foreground">{exp.company} - <span className="italic">{exp.type}</span></p>
                      <p className="text-sm text-muted-foreground/80 mb-2">{exp.period}</p>
                      <p className="text-sm text-muted-foreground leading-snug">{exp.description}</p>
                      {index < experiences.length - 1 && <Separator className="mt-6" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </AnimatedCard>
          </div>
        </div>
        
        <AnimatedCard className="mt-8" delay={600}>
          <CardHeader>
            <CardTitle className="flex items-center"><Code className="mr-3 text-primary"/>Habilidades Técnicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {skills.map((skillCategory, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-3 text-md text-foreground">{skillCategory.category}</h4>
                <div className="flex flex-wrap gap-3">
                  {skillCategory.items.map((item, itemIndex) => (
                    <Badge key={itemIndex} variant="secondary" className="text-sm font-normal py-1 px-3 rounded-full transition-transform hover:scale-105">{item}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </AnimatedCard>

      </main>
      <Footer />
    </div>
  );
}
