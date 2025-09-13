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
  PencilRuler
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ProfilePictureGenerator } from "@/components/profile-picture-generator";

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

export default function PersonalShowcasePage() {
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");

  useEffect(() => {
    const placeholder = PlaceHolderImages.find(img => img.id === 'profile-picture');
    if (placeholder) {
      setProfilePictureUrl(placeholder.imageUrl);
    }
  }, []);

  const handleImageGenerated = (newUrl: string) => {
    setProfilePictureUrl(newUrl);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <aside className="lg:col-span-4 xl:col-span-3">
            <Card className="sticky top-8 shadow-sm">
              <CardHeader className="items-center text-center">
                <Avatar className="w-32 h-32 mb-4 border-4 border-card">
                  <AvatarImage src={profilePictureUrl} alt={personalInfo.name} data-ai-hint="professional portrait" />
                  <AvatarFallback>{personalInfo.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <ProfilePictureGenerator onImageGenerated={handleImageGenerated}>
                  <Button variant="outline" size="sm" className="transition-all hover:bg-accent hover:text-accent-foreground">
                    <PencilRuler className="mr-2 h-4 w-4" />
                    Generate Picture
                  </Button>
                </ProfilePictureGenerator>
                <CardTitle className="text-2xl pt-4">{personalInfo.name}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">{personalInfo.title}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <Separator className="my-4" />
                <div className="space-y-3">
                    <p className="flex items-start"><MapPin className="w-4 h-4 mr-3 mt-1 shrink-0 text-accent" /><span>{personalInfo.location}</span></p>
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center transition-colors text-muted-foreground hover:text-foreground"><Mail className="w-4 h-4 mr-3 shrink-0 text-accent"/>{personalInfo.email}</a>
                    <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="flex items-center transition-colors text-muted-foreground hover:text-foreground"><Phone className="w-4 h-4 mr-3 shrink-0 text-accent"/>{personalInfo.phone}</a>
                </div>
              </CardContent>
              <CardFooter className="justify-center gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:bg-accent hover:text-accent-foreground">
                    <Github />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:bg-accent hover:text-accent-foreground">
                    <Linkedin />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </aside>
          
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Perfil Profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{personalInfo.profile}</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Experiencia Profesional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-muted shrink-0">
                      <Briefcase className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{exp.role}</h3>
                      <p className="text-muted-foreground">{exp.company} - <span className="italic">{exp.type}</span></p>
                      <p className="text-sm text-muted-foreground/80 mb-2">{exp.period}</p>
                      <p className="text-sm text-muted-foreground leading-snug">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Educación</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                 <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-muted shrink-0">
                    <GraduationCap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{education.institution}</h3>
                    <p className="text-muted-foreground">{education.degree}</p>
                    <p className="text-sm text-muted-foreground/80">{education.period}</p>
                  </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Habilidades Técnicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((skillCategory, index) => (
                  <div key={index}>
                    <h4 className="font-medium mb-2">{skillCategory.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.items.map((item, itemIndex) => (
                        <Badge key={itemIndex} variant="secondary">{item}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
