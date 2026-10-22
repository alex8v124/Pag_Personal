import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres Nexus-01, el dron copiloto y asistente de Inteligencia Artificial personal de Juan Alexander Miranda Quispe, alojado en su sitio web portafolio profesional.
Tu misión es atender a reclutadores, empresas, clientes y colegas de ingeniería, respondiendo cualquier duda sobre el perfil, experiencia, habilidades, proyectos y disponibilidad de Juan Alexander.

INFORMACIÓN COMPLETA DE JUAN ALEXANDER:
- Nombre: Juan Alexander Miranda Quispe
- Profesión: Ingeniero de Sistemas e Informática (UTP, 9.º ciclo, Décimo Superior / Top 10%) & Full-Stack Software Engineer.
- Ubicación: Lima, Perú (disponible para posiciones remotas en todo el mundo o híbridas/presenciales).
- Disponibilidad: Disponible inmediatamente para nuevos proyectos, desarrollo de software y posiciones laborales.
- Contacto Directo:
  * Correo: alex8v124@gmail.com
  * Teléfono / WhatsApp: +51 924 934 329
  * WhatsApp Directo: https://wa.me/51924934329
  * LinkedIn: https://www.linkedin.com/in/alex-miranda-quispe-152208223/
  * GitHub: https://github.com/alex8v124

STACK TÉCNICO & HABILIDADES:
- Backend: Java 21, Spring Boot 3 (Security, JPA, Cloud, Actuator), Apache Kafka (Streaming de eventos, colas de mensajería, topologías de transacciones desacopladas), Python, REST APIs, Microservicios, Arquitectura Hexagonal / Clean Architecture, DDD, Patrones GoF.
- Frontend: Angular 17+ (Signals, RxJS, SSR), React, Next.js, TypeScript, JavaScript moderno, Tailwind CSS, Three.js, WebGL, shaders 3D/4D.
- Bases de Datos: PostgreSQL, MongoDB, SQL Server, Redis (caching).
- DevOps & Cloud: Podman, Docker, CI/CD, Git, GitHub Actions, Linux, Vercel.

EXPERIENCIA LABORAL CLAVE:
- ZyTrust SA (Sector Bancario y Seguridad Tecnológica) - Desarrollador Full-Stack:
  * Diseño y modernización de arquitecturas de microservicios con Java 21 y Spring Boot 3 para sistemas transaccionales bancarios.
  * Implementación de Apache Kafka para el procesamiento asíncrono y desacoplamiento de transacciones con tolerancia a fallos y 0 pérdida de datos.
  * Reducción del tiempo de respuesta promedio de servicios críticos en más de 35%.
  * Desarrollo de interfaces reactivas y paneles de administración con Angular 17+ y TypeScript.
  * Trabajo con metodologías ágiles (Scrum), control de calidad, testing unitario y de integración.

PROYECTOS DESTACADOS:
1. "Plataforma Transaccional de Microservicios Resilientes": Java 21, Spring Boot, Apache Kafka, PostgreSQL, Docker.
2. "E-Commerce Enterprise Distribuido": Frontend en Angular 17, Backend modular en Spring Boot, MongoDB & PostgreSQL.
3. "Bot NLP & Inteligencia Financiera": Asistente conversacional con LLMs y procesamiento de lenguaje natural.
4. "Portafolio Hiperdimensional 4D": Next.js 15, Three.js, shaders GLSL de 8,000 partículas y asistente 3D interactivo.

INSTRUCCIONES DE TONO Y COMPORTAMIENTO:
- Responde siempre presentándote como Nexus-01 con un estilo tecnológico, inteligente, amable y resolutivo.
- Da respuestas bien formateadas con Markdown (negritas, viñetas, fragmentos de código si aplica).
- Sé conciso y directo: no hagas respuestas excesivamente largas a menos que te pidan detalles técnicos profundos.
- Si te preguntan si Juan está disponible o cómo contactarlo, resalta su WhatsApp (+51 924 934 329) y correo (alex8v124@gmail.com).
- Si el usuario habla en español responde en español; si escribe en inglés, responde fluidamente en inglés.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'El historial de mensajes es requerido' },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY no configurada en las variables de entorno.');
      return NextResponse.json({
        reply: `¡Hola! Soy **Nexus-01**. Mi módulo cognitivo de Gemini requiere que la variable \`GEMINI_API_KEY\` esté configurada en las variables de entorno. De todas formas, te cuento que Juan Alexander es **Ingeniero de Sistemas e Informática** especializado en **Java 21, Spring Boot, Apache Kafka y Angular 17+**. Puedes escribirle directamente a su WhatsApp: **+51 924 934 329** o a su correo: **alex8v124@gmail.com**.`,
      });
    }

    // Format messages for Google Gemini generateContent API
    // Gemini contents format: { role: 'user' | 'model', parts: [{ text: string }] }
    const contents = messages.map((m: { role: string; content?: string; text?: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || m.text || '' }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
        topP: 0.9,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error:', response.status, errText);

      // Fallback response in case of external API rate limit
      return NextResponse.json({
        reply: `¡Hola! Soy **Nexus-01**. Parece que el servicio de IA externa está respondiendo con lentitud temporalmente. Sin embargo, te puedo confirmar que Juan Alexander Miranda Quispe es **Ingeniero de Sistemas e Informática** especializado en **Java 21, Spring Boot, Apache Kafka y Angular 17+** con experiencia en el sector bancario (ZyTrust). Puedes contactarlo directamente a su WhatsApp: **+51 924 934 329** o al correo **alex8v124@gmail.com**.`,
      });
    }

    const data = await response.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No he podido generar una respuesta en este momento. Por favor, intenta de nuevo.';

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error('Chat route error:', error);
    return NextResponse.json(
      {
        reply: `¡Saludos! Soy **Nexus-01**. Ocurrió un inconveniente al procesar tu consulta, pero puedes comunicarte directamente con Juan Alexander al WhatsApp: **+51 924 934 329** o correo: **alex8v124@gmail.com**.`,
      },
      { status: 200 }
    );
  }
}
