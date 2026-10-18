import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Juan Alexander Miranda Quispe | Full-Stack Developer & Ing. de Sistemas',
  description:
    'Portafolio profesional de Juan Alexander Miranda Quispe. Especialista en Microservicios con Java 21, Spring Boot, Kafka, Angular 17+, React y optimización de bases de datos de alta disponibilidad. Experiencia bancaria en ZyTrust SA y UTP Décimo Superior.',
  keywords: [
    'Juan Alexander Miranda Quispe',
    'Full-Stack Developer',
    'Java 21',
    'Spring Boot',
    'Angular',
    'React',
    'Apache Kafka',
    'Microservicios',
    'PostgreSQL',
    'ZyTrust',
    'UTP',
    'Ingeniería de Sistemas',
  ],
  authors: [{ name: 'Juan Alexander Miranda Quispe', url: 'https://pag-personal.vercel.app/' }],
  openGraph: {
    title: 'Juan Alexander Miranda Quispe | Portafolio de Ingeniería & Full-Stack',
    description:
      'Especialista en arquitecturas de microservicios con Spring Boot y Kafka, interfaces web con Angular 17+ y React, y modernización de sistemas bancarios.',
    url: 'https://pag-personal.vercel.app/',
    siteName: 'Portafolio | Juan Alexander Miranda Quispe',
    locale: 'es_PE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-zinc-950 text-zinc-100 min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
