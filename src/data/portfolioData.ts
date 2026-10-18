export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "microservices" | "fullstack" | "ai" | "frontend3d";
  categoryLabel: string;
  date: string;
  description: string;
  keyHighlights: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent: boolean;
  type: string;
  description: string[];
  technologies: string[];
  badge: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  status: string;
  achievements: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level?: string; highlight?: boolean }[];
}

export const PERSONAL_INFO = {
  name: "Juan Alexander Miranda Quispe",
  title: "Ingeniero de Sistemas e Informática & Full-Stack Developer",
  shortBio:
    "Especialista en arquitecturas de microservicios (Java 21 / Spring Boot), mensajería asíncrona con Apache Kafka, APIs RESTful de alta disponibilidad y aplicaciones web modernas en Angular 17+ y React.",
  fullBio:
    "Estudiante de Ingeniería de Sistemas e Informática en la Universidad Tecnológica del Perú (UTP), con sólida formación técnica y analítica. Experiencia probada en desarrollo full-stack, automatización de procesos y optimización de bases de datos de alta disponibilidad en el sector bancario y corporativo. Cuento con capacidad demostrada para liderar iniciativas técnicas, gestionar servicios de infraestructura TI y asegurar la escalabilidad mediante documentación técnica rigurosa. Destaco por mi adaptabilidad, comunicación asertiva y enfoque en la mejora continua de procesos críticos de negocio.",
  location: "Lima, Perú",
  phone: "(+51) 906 442 235",
  rawPhone: "51906442235",
  email: "alex.04.antay@gmail.com",
  github: "https://github.com/alex8v124",
  linkedin: "https://www.linkedin.com/in/juanalexmiranda/",
  portfolioUrl: "https://pag-personal.vercel.app/",
  stats: [
    { value: "7+", label: "Microservicios en Producción / Orquestados" },
    { value: "Top 10%", label: "Décimo Superior (UTP)" },
    { value: "C1", label: "Inglés Avanzado Certificado" },
    { value: "2+ Años", label: "Experiencia en Desarrollo & Consultoría" },
  ],
};

export const EXPERIENCES: Experience[] = [
  {
    id: "zytrust",
    company: "ZyTrust SA",
    role: "Practicante de Desarrollo de Software",
    location: "Lima, Perú",
    period: "Febrero 2026 – Presente",
    isCurrent: true,
    type: "Prácticas Preprofesionales / Sector Bancario",
    badge: "Sector Bancario & Seguridad",
    description: [
      "Elaboré documentación técnica exhaustiva y guías de pruebas para el equipo de QA, facilitando la estandarización de despliegues y la resolución ágil de incidencias en entornos críticos del sistema.",
      "Colaboré activamente en el desarrollo y mantenimiento de servicios backend y portales web de alta disponibilidad para clientes del sector bancario utilizando Java (Spring Boot) y Angular.",
      "Lideré la migración tecnológica de infraestructura hacia estándares modernos: Java 21, Tomcat 10 y Jakarta EE, mitigando vulnerabilidades críticas de seguridad y optimizando los tiempos de respuesta del servidor.",
    ],
    technologies: [
      "Java 21",
      "Spring Boot",
      "Angular",
      "Jakarta EE",
      "Tomcat 10",
      "QA / Testing",
      "Banca & Finanzas",
      "Git / CI/CD",
    ],
  },
  {
    id: "vma-icsystems",
    company: "VMAsoftware & IC Systems",
    role: "Desarrollador Freelance (Por Proyectos)",
    location: "Lima, Perú",
    period: "Enero 2024 – Febrero 2026",
    isCurrent: false,
    type: "Consultoría de Software / ERP & POS",
    badge: "ERP & Punto de Venta",
    description: [
      "Diseñé e implementé desde cero el módulo comercial de Rendiciones y Mejoras para el software de Punto de Venta utilizando PowerScript (Dic 2025 – Feb 2026).",
      "Ejecuté servicios de consultoría y mantenimiento correctivo/evolutivo para módulos del ERP Punto de Venta, garantizando la continuidad operativa y soporte a usuarios finales (Dic 2024 – Abr 2025).",
      "Colaboré en el desarrollo inicial, pruebas funcionales y adaptación de requerimientos específicos para el sistema ERP corporativo, reduciendo significativamente los tiempos de procesamiento manual (Ene 2024 – Abr 2024).",
    ],
    technologies: [
      "PowerScript",
      "SQL Avanzado",
      "Sistemas ERP",
      "Punto de Venta (POS)",
      "Mantenimiento Evolutivo",
      "Consultoría Técnica",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "microservices-reservas-pagos",
    title: "Plataforma de Reservas y Pagos",
    subtitle: "Arquitectura de Microservicios Event-Driven con Kafka & Gateway",
    category: "microservices",
    categoryLabel: "Microservicios & Cloud",
    date: "Julio 2026",
    description:
      "Ecosistema empresarial de 7 microservicios desacoplados construidos en Java (Spring Boot), comunicados asíncronamente vía Apache Kafka para máxima resiliencia y tolerancia a fallos. Incluye API Gateway centralizado con autenticación JWT, persistencia políglota, contenedorización con Podman y observabilidad en tiempo real.",
    keyHighlights: [
      "7 microservicios independientes y desacoplados comunicados mediante eventos con Apache Kafka.",
      "API Gateway perimetral con filtrado de solicitudes y validación de tokens JWT.",
      "Persistencia políglota combinando PostgreSQL (transaccional ACID) y MongoDB (documentos de alta velocidad).",
      "Contenedorización completa con Podman y monitoreo métrico con Prometheus & Grafana.",
    ],
    technologies: [
      "Java 21",
      "Spring Boot",
      "Apache Kafka",
      "API Gateway",
      "JWT",
      "PostgreSQL",
      "MongoDB",
      "Podman",
      "Prometheus",
      "Grafana",
    ],
    metrics: [
      { label: "Microservicios", value: "7 Desacoplados" },
      { label: "Mensajería", value: "Event-Driven Kafka" },
      { label: "Seguridad", value: "JWT Gateway" },
      { label: "Observabilidad", value: "Prometheus + Grafana" },
    ],
    githubUrl: "https://github.com/alex8v124/api-gateway",
    featured: true,
  },
  {
    id: "vayra-trade-marketing",
    title: "Portal Web de Trade Marketing & Storecheck",
    subtitle: "Plataforma Modular de Auditoría y Control de Inventarios",
    category: "fullstack",
    categoryLabel: "Full-Stack Enterprise",
    date: "Julio 2026",
    description:
      "Plataforma web modular de Trade Marketing diseñada para la auditoría de puntos de venta (Storecheck). Desarrollada con frontend en Angular 17+ y backend en Spring Boot (Java), conectada a una base de datos PostgreSQL en Supabase con seguridad JWT basada en roles y control de inventario en tiempo real.",
    keyHighlights: [
      "Frontend moderno y modular con Angular 17+ (Signals, Standalone Components).",
      "Flujos de auditoría dinámica en tienda física con validación instantánea de reportes fotográficos y métricas.",
      "Control de stock e inventario en tiempo real garantizando integridad de datos transaccionales.",
      "Integración con Supabase (PostgreSQL) y seguridad robusta basada en roles (RBAC).",
    ],
    technologies: [
      "Angular 17+",
      "TypeScript",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Supabase",
      "JWT",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "Frontend", value: "Angular 17+" },
      { label: "Backend", value: "Spring Boot" },
      { label: "Base de Datos", value: "Supabase Postgres" },
      { label: "Control", value: "Stock Tiempo Real" },
    ],
    githubUrl: "https://github.com/alex8v124/vayra-portal-web",
    featured: true,
  },
  {
    id: "chatbot-soporte-utp",
    title: "Sistema Web Chatbot Soporte Académico UTP",
    subtitle: "Asistencia Virtual con Procesamiento de Lenguaje Natural (NLP)",
    category: "ai",
    categoryLabel: "IA & NLP",
    date: "Julio 2025",
    description:
      "Plataforma inteligente de atención estudiantil que procesa dudas y consultas en lenguaje natural integrando OpenAI y modelos spaCy. Diseñada con React, TypeScript y Node.js para dar soporte inmediato 24/7 a la comunidad universitaria.",
    keyHighlights: [
      "Integración de modelos NLP avanzados (OpenAI API + spaCy) para clasificación de intenciones y entidades.",
      "Reducción del tiempo de respuesta estudiantil a menos de 5 segundos.",
      "Resolución automática del 72% de consultas académicas frecuentes sin intervención de asesores humanos.",
      "Panel de reportería y métricas de satisfacción estudiantil.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "OpenAI API",
      "spaCy NLP",
      "Tailwind CSS",
      "RESTful API",
    ],
    metrics: [
      { label: "Tiempo de Respuesta", value: "< 5 seg" },
      { label: "Resolución Automática", value: "72% de Casos" },
      { label: "Disponibilidad", value: "24/7 Asistente" },
      { label: "Tecnología NLP", value: "OpenAI + spaCy" },
    ],
    githubUrl: "https://github.com/alex8v124/Sistema-Web-de-Chatbot-UTP---ML",
    featured: true,
  },
  {
    id: "sistema-citas-art-dent",
    title: "Sistema Web de Citas Art Dent",
    subtitle: "Gestión Odontológica Inteligente con Asistente Virtual OpenAI",
    category: "fullstack",
    categoryLabel: "Full-Stack & Salud",
    date: "Diciembre 2024",
    description:
      "Sistema integral de programación y administración odontológica para el Centro Odontológico Art Dent. Desarrollado en Java y MySQL, optimiza el agendamiento clínico, automatiza notificaciones a pacientes e incorpora un chatbot OpenAI para resolver consultas frecuentes.",
    keyHighlights: [
      "Gestión integral de citas, odontogramas y expedientes clínicos de pacientes.",
      "Automatización de recordatorios vía mensajería, reduciendo el ausentismo en consultas.",
      "Asistente conversacional con OpenAI integrado para responder dudas clínicas frecuentes y tarifas.",
      "Control de accesos y perfiles diferenciados para odontólogos, recepcionistas y administradores.",
    ],
    technologies: [
      "Java",
      "MySQL",
      "OpenAI API",
      "JavaScript",
      "HTML5 / CSS3",
      "Bootstrap",
    ],
    metrics: [
      { label: "Gestión", value: "Citas & Pacientes" },
      { label: "IA Integrada", value: "Chatbot OpenAI" },
      { label: "Eficiencia", value: "Recordatorios Auto" },
    ],
    githubUrl:
      "https://github.com/alex8v124/Sistema-Web-de-Citas-para-el-Centro-Odontologico-Art-Dent",
    featured: false,
  },
  {
    id: "nt-cozy-game-store",
    title: "Plataforma Web de Videojuegos 'NT Cozy'",
    subtitle: "Catálogo y Tienda Inmersiva con Animaciones 3D Nativas",
    category: "frontend3d",
    categoryLabel: "Frontend 3D & UX",
    date: "Julio 2024",
    description:
      "Frontend de experiencia inmersiva para una tienda y catálogo interactivo de videojuegos. Implementado con HTML5, CSS3, JavaScript y PHP, enfocado en una interfaz rica en efectos 3D fluidos y una arquitectura responsiva por escalado proporcional.",
    keyHighlights: [
      "Diseño y modelado de transiciones con animaciones 3D nativas en canvas y CSS transform.",
      "Arquitectura de diseño responsivo por escalado proporcional (100% fidelidad visual multiresolución).",
      "Optimización de compresión y carga diferida de assets multimedia para tiempos de render ultrarrápidos.",
      "Catálogo interactivo con filtrado dinámico por plataformas y géneros.",
    ],
    technologies: [
      "JavaScript (Vanilla ES6+)",
      "HTML5 Canvas",
      "CSS3 3D Transforms",
      "PHP",
      "UI/UX Proporcional",
    ],
    metrics: [
      { label: "Fidelidad Visual", value: "100% Proporcional" },
      { label: "Efectos", value: "Animaciones 3D" },
      { label: "Frontend", value: "Optimizado Web" },
    ],
    githubUrl: "https://github.com/alex8v124/ntcozy",
    featured: false,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Backend & Microservicios",
    description: "Desarrollo de servicios escalables, resilientes y de alta concurrencia.",
    skills: [
      { name: "Java 21", highlight: true },
      { name: "Spring Boot", highlight: true },
      { name: "Apache Kafka", highlight: true },
      { name: "Jakarta EE" },
      { name: "Tomcat 10" },
      { name: "API Gateway & JWT", highlight: true },
      { name: "RESTful APIs" },
      { name: "Python" },
      { name: "Node.js" },
      { name: "PowerScript" },
    ],
  },
  {
    category: "Frontend & Diseño UI/UX",
    description: "Interfaces reactivas, accesibles y con animaciones de alto impacto.",
    skills: [
      { name: "Angular 17+", highlight: true },
      { name: "React / Next.js", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "JavaScript (ES6+)" },
      { name: "Vue.js" },
      { name: "Tailwind CSS", highlight: true },
      { name: "Bootstrap" },
      { name: "HTML5 & CSS3 3D" },
      { name: "Principios de UX/UI" },
      { name: "Diseño Responsivo Proporcional" },
    ],
  },
  {
    category: "Bases de Datos & Persistencia",
    description: "Persistencia políglota, modelamiento relacional y NoSQL de alta velocidad.",
    skills: [
      { name: "PostgreSQL", highlight: true },
      { name: "MongoDB", highlight: true },
      { name: "MySQL" },
      { name: "Supabase", highlight: true },
      { name: "Modelamiento E/R Complejo" },
      { name: "Optimización de Consultas SQL", highlight: true },
      { name: "Transaccionalidad ACID" },
    ],
  },
  {
    category: "DevOps, Contenedores & QA",
    description: "Automatización, aseguramiento de la calidad y observabilidad continua.",
    skills: [
      { name: "Podman / Docker", highlight: true },
      { name: "Prometheus & Grafana", highlight: true },
      { name: "JUnit (Testing Backend)" },
      { name: "Postman (API Testing)" },
      { name: "Git & GitHub", highlight: true },
      { name: "Documentación Técnica QA", highlight: true },
      { name: "Mitigación de Vulnerabilidades" },
      { name: "Seguridad Bancaria" },
    ],
  },
  {
    category: "Metodologías & Inteligencia Artificial",
    description: "Modelos NLP, desarrollo ágil y comunicación estratégica de negocio.",
    skills: [
      { name: "Scrum & Metodologías Ágiles", highlight: true },
      { name: "Integración OpenAI API", highlight: true },
      { name: "Modelos NLP (spaCy)" },
      { name: "Automatización de Procesos" },
      { name: "Comunicación Asertiva" },
      { name: "Liderazgo Técnico" },
    ],
  },
  {
    category: "Educación & Idiomas",
    description: "Reconocimientos de excelencia académica y dominio bilingüe internacional.",
    skills: [
      { name: "Inglés C1 Avanzado (Edusoft / UTP)", highlight: true },
      { name: "Orden de Mérito: Décimo Superior", highlight: true },
      { name: "Generación TOP / Impulsa UTP", highlight: true },
      { name: "Ing. de Sistemas e Informática (UTP)" },
    ],
  },
];

export const EDUCATION_DATA: Education = {
  institution: "Universidad Tecnológica del Perú (UTP)",
  degree: "Ingeniería de Sistemas e Informática",
  period: "Marzo 2022 – Presente (9.º ciclo)",
  status: "En curso (Graduación estimada: 2026)",
  achievements: [
    "Orden de mérito: Perteneciente al Décimo Superior de la carrera de Ingeniería de Sistemas e Informática.",
    "Finalista en el proceso de selección y admisión para programas basados en mérito académico Generación TOP / Impulsa UTP.",
    "Certificación de nivel de Inglés C1 Avanzado (Edusoft / UTP).",
  ],
};
