import { NextRequest, NextResponse } from 'next/server';

// Streamlined system prompt optimized for fast model token evaluation
const SYSTEM_PROMPT = `Eres Nexus-01, copiloto IA de Juan Alexander Miranda Quispe, Ingeniero de Sistemas e Informática (UTP, Décimo Superior) y Full-Stack Engineer.
Objetivo: Atender de forma rápida, profesional y resolutiva a reclutadores, empresas y clientes.

Datos clave de Juan Alexander:
- Stack Principal: Java 21, Spring Boot 3, Apache Kafka, Angular 17+, React, Next.js, PostgreSQL, MongoDB, Docker/Podman, Microservicios, Arquitectura Hexagonal.
- Experiencia: ZyTrust SA (Sector Bancario) - modernización de microservicios transaccionales con Java 21 y Kafka, reduciendo tiempos de respuesta en +35%.
- Formación: Universidad Tecnológica del Perú (UTP), 9.º ciclo, Décimo Superior (Top 10%).
- Proyectos: Plataforma Transaccional de Microservicios, E-Commerce Enterprise Distribuido, Bot NLP & Inteligencia Financiera, Portafolio 4D con Three.js.
- Contacto y Disponibilidad: Disponible de inmediato. WhatsApp: +51 924 934 329, Correo: alex8v124@gmail.com, LinkedIn: linkedin.com/in/alex-miranda-quispe-152208223/, GitHub: github.com/alex8v124.

Reglas de respuesta:
1. Responde siempre con estilo conciso, amable y tecnológico.
2. Limita tus respuestas a 2-4 oraciones bien estructuradas con Markdown (negritas y viñetas breves).
3. Si preguntan por contacto o disponibilidad, resalta siempre su WhatsApp (+51 924 934 329) y correo.
4. Responde en el mismo idioma de la pregunta (español o inglés).`;

// Local instant smart fallback if external API is unreachable or times out
function getSmartFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('java') || q.includes('kafka') || q.includes('spring') || q.includes('stack') || q.includes('tecnolog')) {
    return `Juan Alexander está especializado en **Java 21**, **Spring Boot 3** y **Apache Kafka** para arquitecturas de microservicios orientadas a eventos y alta concurrencia (Virtual Threads). En el frontend domina **Angular 17+ (Signals)** y **React/Next.js**, complementado con **PostgreSQL, MongoDB y Docker/Podman**.`;
  }

  if (q.includes('contact') || q.includes('telefono') || q.includes('correo') || q.includes('whatsapp') || q.includes('email') || q.includes('hablemos')) {
    return `¡Puedes contactar a Juan Alexander directamente! 📞 **WhatsApp:** [+51 924 934 329](https://wa.me/51924934329) | ✉️ **Correo:** [alex8v124@gmail.com](mailto:alex8v124@gmail.com) | 💼 **LinkedIn:** [alex-miranda-quispe](https://www.linkedin.com/in/alex-miranda-quispe-152208223/).`;
  }

  if (q.includes('proyecto') || q.includes('repositorio') || q.includes('github') || q.includes('portafolio')) {
    return `Entre sus proyectos más destacados se encuentran la **Plataforma Transaccional de Microservicios** (Java 21, Spring Boot y Kafka), el **E-Commerce Enterprise Distribuido** (Angular 17) y este **Portafolio Hiperdimensional 4D**. Puedes revisar su código en [GitHub: @alex8v124](https://github.com/alex8v124).`;
  }

  if (q.includes('experiencia') || q.includes('zytrust') || q.includes('banc') || q.includes('trabaj')) {
    return `En **ZyTrust SA** (Sector Bancario), Juan modernizó arquitecturas de microservicios con **Java 21** e implementó **Apache Kafka** para procesamiento transaccional asíncrono desacoplado con cero pérdida de datos, optimizando los tiempos de respuesta de servicios críticos en más de un **35%**.`;
  }

  if (q.includes('disponib') || q.includes('contratar') || q.includes('remoto') || q.includes('oferta') || q.includes('trabajo')) {
    return `Juan Alexander tiene **disponibilidad inmediata** para incorporarse a posiciones Full-Stack o Backend (Java / Microservicios) tanto en modalidad remota como híbrida. Puedes coordinar una reunión escribiéndole a **alex8v124@gmail.com** o a su WhatsApp **+51 924 934 329**.`;
  }

  return `¡Hola! Soy **Nexus-01**, el copiloto de Juan Alexander Miranda Quispe. Juan es **Ingeniero de Sistemas e Informática** (UTP, Décimo Superior) especializado en **Java 21, Spring Boot, Apache Kafka y Angular 17+** con experiencia en el sector bancario (ZyTrust). ¿Te gustaría conocer más sobre sus proyectos, stack técnico o coordinar una entrevista?`;
}

// Helper to call Gemini with timeout
async function fetchGeminiWithTimeout(
  model: string,
  apiKey: string,
  contents: any[],
  timeoutMs: number
): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 280,
        topP: 0.9,
      },
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      console.warn(`Gemini (${model}) returned status: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || null;
  } catch (err: any) {
    clearTimeout(timer);
    console.warn(`Gemini (${model}) fetch failed or timed out:`, err?.name || err?.message);
    return null;
  }
}

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

    const lastUserMessage = messages[messages.length - 1]?.content || messages[messages.length - 1]?.text || '';

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      // Immediate intelligent fallback without error
      return NextResponse.json({
        reply: getSmartFallback(lastUserMessage),
      });
    }

    // Keep only the last 4 messages to minimize latency and token evaluation overhead
    const recentMessages = messages.slice(-4);
    const contents = recentMessages.map((m: { role: string; content?: string; text?: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || m.text || '' }],
    }));

    // 1. Try fastest model first (gemini-flash-lite-latest with 4.5s timeout)
    let reply = await fetchGeminiWithTimeout('gemini-flash-lite-latest', apiKey, contents, 4500);

    // 2. If primary model fails or times out, try secondary fast model (gemini-3.5-flash-lite with 4.5s timeout)
    if (!reply) {
      console.info('Attempting fallback to gemini-3.5-flash-lite...');
      reply = await fetchGeminiWithTimeout('gemini-3.5-flash-lite', apiKey, contents, 4500);
    }

    // 3. If both fail, use intelligent instant fallback
    if (!reply) {
      reply = getSmartFallback(lastUserMessage);
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat route uncaught error:', error);
    return NextResponse.json(
      {
        reply: `¡Saludos! Soy **Nexus-01**. Puedes comunicarte directamente con Juan Alexander al WhatsApp: **+51 924 934 329** o correo: **alex8v124@gmail.com**.`,
      },
      { status: 200 }
    );
  }
}
