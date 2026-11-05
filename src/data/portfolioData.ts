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
  title: "CTO & Co-Founder en Nodux · Full-Stack Software Engineer & Cloud Architect",
  shortBio:
    "Chief Technology Officer (CTO) & Co-Founder en Nodux. Especialista en arquitecturas Cloud Serverless, IA aplicada, microservicios (Java 21 / Spring Boot 3), Apache Kafka y computación cuántica (Qiskit Aer / QUBO). Podio nacional en IAthon AWS & Kiro y Clasificado en IEEE / IBM Quantum Hackathon.",
  fullBio:
    "Estudiante de Ingeniería de Sistemas e Informática en la Universidad Tecnológica del Perú (UTP, Décimo Superior - Top 10%) y Chief Technology Officer (CTO) & Co-Founder en Nodux. Experiencia probada liderando escuadras de ingeniería de software, arquitectura cloud serverless y desarrollo full-stack de alto rendimiento. Co-creador de suites empresariales de datos e IA (PhyData AI, Commercial OS) y ganador de podios nacionales de alta competencia técnica (3.er Puesto en IAthon AWS & Kiro y Clasificado en IEEE / IBM Quantum Hackathon Perú). Experiencia en el sector bancario (ZyTrust SA) con microservicios Java 21, Spring Boot y Apache Kafka.",
  location: "Lima, Perú",
  phone: "(+51) 906 442 235",
  rawPhone: "51906442235",
  email: "alex.04.antay@gmail.com",
  github: "https://github.com/alex8v124",
  linkedin: "https://www.linkedin.com/in/juanalexmiranda/",
  portfolioUrl: "https://pag-personal-five.vercel.app/",
  stats: [
    { value: "CTO", label: "Co-Founder en Nodux" },
    { value: "Top 3", label: "Podio Nacional AWS & Kiro" },
    { value: "Top 10%", label: "Décimo Superior (UTP)" },
    { value: "7+", label: "Plataformas & Microservicios en Prod" },
  ],
};

export const EXPERIENCES: Experience[] = [
  {
    id: "nodux-cto",
    company: "NODUX",
    role: "Chief Technology Officer (CTO) & Co-Founder",
    location: "Lima, Perú",
    period: "2024 – Presente",
    isCurrent: true,
    type: "Start-up B2B & Consultoría Operativa",
    badge: "CTO & Co-Founder · En Operación",
    description: [
      "Lidero la arquitectura técnica punta a punta, infraestructura cloud (Serverless, Docker, Vercel) y la dirección de escuadras de desarrollo para el despliegue de 4 plataformas en producción y suites de IA.",
      "Diseñé e implementé la suite 'PhyData AI' (Data Quality & ML): ingesta masiva de datos, normalización semántica de hasta 3,000 SKUs con taxonomía de familias y validación Human-in-the-Loop.",
      "Desarrollé la infraestructura de 'Nodux AI & Despacho Transaccional' integrada a WhatsApp, reduciendo el tiempo de cotización en mostrador de 4 minutos a 10 segundos (validado en Aprende a Emprender - PRODUCE).",
      "Arquitectura de 'Commercial OS' (CRM B2B & FinOps): integración del motor Gemini para prospección inteligente, pipeline de 7 fases y simulador de ROI/Payback en tiempo real.",
      "Co-Líder Técnico de escuadras de alta competencia en certámenes nacionales: 3.er Puesto Nacional en IAthon AWS & Kiro (Kiro RestQube) y Clasificado Oficial en IEEE / IBM Quantum Hackathon Perú (Nodux Quantum).",
    ],
    technologies: [
      "AWS Serverless",
      "AWS Lambda & DynamoDB",
      "Amazon Bedrock",
      "Qiskit Aer / QUBO",
      "Google Gemini API",
      "Angular 17+",
      "Next.js / React",
      "Java 21 / Spring Boot",
      "Docker / Podman",
      "PostgreSQL / MongoDB",
    ],
  },
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
      "Lideré la migración tecnológica de infraestructura hacia estándares modernos: Java 21, Tomcat 10 y Jakarta EE, mitigando vulnerabilidades críticas de seguridad y optimizando los tiempos de respuesta del servidor en más de 35%.",
    ],
    technologies: [
      "Java 21",
      "Spring Boot",
      "Apache Kafka",
      "Angular 17+",
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
    id: "kiro-restqube",
    title: "Kiro RestQube — AWS Serverless & Optimización QUBO",
    subtitle: "3.er Puesto Nacional en IAthon AWS & Kiro (ESAN x Fundación Romero)",
    category: "ai",
    categoryLabel: "Cloud Serverless & IA",
    date: "Octubre 2026",
    description:
      "Podio nacional superando a 40 escuadras (240 competidores). Co-lideré como CTO la arquitectura Serverless (AWS Lambda, DynamoDB Single-Table, Amazon Bedrock Claude 3 Haiku), el caso de negocio FinOps y la defensa técnica ante jurado C-Level del sistema Kiro RestQube con motor de optimización matemática QUBO.",
    keyHighlights: [
      "Podio nacional (Top 3) entre más de 240 ingenieros y 40 escuadras a nivel nacional.",
      "Arquitectura 100% Serverless con AWS Lambda, DynamoDB Single-Table Design y Amazon Bedrock.",
      "Integración de Claude 3 Haiku para procesamiento inteligente de requerimientos y costos operativos.",
      "Formulación y resolución matemática cuadrática (QUBO) para asignación óptima de recursos.",
    ],
    technologies: [
      "AWS Lambda",
      "DynamoDB Single-Table",
      "Amazon Bedrock",
      "Claude 3 Haiku",
      "QUBO",
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Python",
    ],
    metrics: [
      { label: "Puesto", value: "3.er Puesto Nacional" },
      { label: "Competidores", value: "240 (40 Equipos)" },
      { label: "Arquitectura", value: "AWS Serverless" },
      { label: "Motor", value: "QUBO + Bedrock" },
    ],
    githubUrl: "https://github.com/alex8v124",
    liveUrl: "https://kirorestqube.vercel.app/",
    featured: true,
  },
  {
    id: "nodux-quantum",
    title: "Nodux Quantum — Enterprise Quantum Decision Platform",
    subtitle: "Clasificado Oficial en IEEE / IBM Quantum Hackathon Perú (PUCP x UTEC)",
    category: "ai",
    categoryLabel: "Computación Cuántica & Algoritmos",
    date: "Octubre 2026",
    description:
      "Líder técnico del equipo Nodux Quantum. Resolución del problema de asignación cuadrática (instancia qap10.mps con 4,150 variables) mediante arquitectura híbrida Q-LNS / QAOA en Qiskit Aer, logrando un 27.04% de reducción de costo operativo (+2.94% gap vs. óptimo global) y proyectando ahorros de S/ 28,000 anuales por almacén.",
    keyHighlights: [
      "Clasificado oficial en el prestigioso certamen IEEE / IBM Quantum Hackathon Perú.",
      "Formulación matemática QUBO (λ=60) aplicada a logística y asignación de almacenes de 4,150 variables.",
      "Implementación del algoritmo cuántico variacional QAOA junto con Large Neighborhood Search (Q-LNS) en Qiskit Aer.",
      "27.04% de reducción comprobada en el costo operativo intralogístico.",
    ],
    technologies: [
      "Qiskit Aer",
      "IBM Quantum",
      "Python",
      "QAOA",
      "QUBO (λ=60)",
      "Q-LNS",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "Reducción Costo", value: "27.04%" },
      { label: "Variables", value: "4,150 (qap10.mps)" },
      { label: "Ahorro Anual", value: "S/ 28,000 / almacén" },
      { label: "Simulador", value: "Qiskit Aer" },
    ],
    githubUrl: "https://github.com/alex8v124",
    liveUrl: "https://nodux-quantum.vercel.app/",
    featured: true,
  },
  {
    id: "phydata-ai",
    title: "PhyData AI — Data Quality & ML Suite",
    subtitle: "Ingeniería de Datos, Limpieza y Estandarización con IA (Nodux)",
    category: "ai",
    categoryLabel: "Data Engineering & IA",
    date: "2025 – 2026",
    description:
      "Plataforma inteligente desarrollada por nuestro equipo técnico en Nodux para la ingesta masiva, previsualización, diagnóstico automatizado, limpieza asistida por IA, validación relacional y generación de reportes ejecutivos sobre bases de datos empresariales.",
    keyHighlights: [
      "Ingesta masiva y diagnóstico automatizado de no-calidad de datos y SKUs duplicados.",
      "Normalización semántica asistida por IA de hasta 3,000 SKUs con taxonomía de familias.",
      "Mecanismo de validación Human-in-the-Loop para control de calidad antes de la consolidación final.",
      "Reportes ejecutivos de dictamen de costo de no-calidad y capital inmovilizado en almacenes.",
    ],
    technologies: [
      "Python",
      "Next.js",
      "PostgreSQL",
      "Google Gemini API",
      "Data Quality",
      "Tailwind CSS",
      "TypeScript",
    ],
    metrics: [
      { label: "Catálogos", value: "Hasta 3,000 SKUs" },
      { label: "Validación", value: "Human-in-the-Loop" },
      { label: "Módulo", value: "Data Quality & ML" },
    ],
    githubUrl: "https://github.com/alex8v124",
    liveUrl: "https://nicolas-links-chi.vercel.app/",
    featured: true,
  },
  {
    id: "commercial-os",
    title: "Commercial OS — CRM B2B & Motor FinOps",
    subtitle: "Prospección IA con Gemini, Pipeline Ponderado y Simulador de ROI (Nodux)",
    category: "fullstack",
    categoryLabel: "Full-Stack Enterprise & FinOps",
    date: "2025 – 2026",
    description:
      "Sistema comercial de 7 etapas estructuradas para gobernar el ciclo de ventas completo: extracción de leads vía Omnibox Search, contacto express en 45s, diagnóstico técnico con motor Gemini, propuesta DOC-02 Ready, Kanban ponderado y simulador FinOps de ROI (+418% y Payback en 69 días).",
    keyHighlights: [
      "Pipeline comercial de 7 etapas con visualización Kanban reactiva y valor facial de cartera en tiempo real.",
      "Integración del motor Gemini para diagnósticos preliminares automatizados de clientes.",
      "Simulador FinOps de retorno de inversión cuantificando horas liberadas (48h/mes) y payback en días.",
      "Detector de stock muerto para activación de campañas de liquidación B2B.",
    ],
    technologies: [
      "Next.js",
      "React",
      "Google Gemini API",
      "FinOps Modeling",
      "TypeScript",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "Pipeline", value: "7 Fases Comerciales" },
      { label: "Simulador", value: "ROI +418% / 69d" },
      { label: "IA", value: "Motor Gemini" },
    ],
    githubUrl: "https://github.com/alex8v124",
    liveUrl: "https://nicolas-links-chi.vercel.app/",
    featured: true,
  },
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
    category: "Cloud Serverless & Computación Cuántica",
    description: "Arquitecturas de computación cuántica híbrida, optimización matemática y Serverless.",
    skills: [
      { name: "AWS Serverless (Lambda)", highlight: true },
      { name: "DynamoDB Single-Table", highlight: true },
      { name: "Amazon Bedrock", highlight: true },
      { name: "Qiskit Aer (IBM Quantum)", highlight: true },
      { name: "Algoritmos QAOA & Q-LNS", highlight: true },
      { name: "Optimización QUBO (λ=60)", highlight: true },
      { name: "Vercel Edge Cloud" },
      { name: "FinOps Architecture", highlight: true },
    ],
  },
  {
    category: "Metodologías & Inteligencia Artificial",
    description: "Modelos LLM, desarrollo de suites B2B, NLP y liderazgo técnico.",
    skills: [
      { name: "Google Gemini API (Flash/Pro)", highlight: true },
      { name: "Claude 3 Haiku (Bedrock)", highlight: true },
      { name: "OpenAI API", highlight: true },
      { name: "PhyData AI Data Quality", highlight: true },
      { name: "Modelos NLP (spaCy)" },
      { name: "Scrum & Metodologías Ágiles", highlight: true },
      { name: "Liderazgo Técnico (CTO)", highlight: true },
      { name: "Automatización de Procesos" },
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
