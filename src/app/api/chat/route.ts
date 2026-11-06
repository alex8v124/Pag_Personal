import { NextRequest, NextResponse } from 'next/server';

// Streamlined system prompt optimized for fast model token evaluation
const SYSTEM_PROMPT = `Eres Nexus-01, copiloto IA de Juan Alexander Miranda Quispe, CTO & Co-Founder en Nodux, Ingeniero de Sistemas e Informática (UTP, Décimo Superior) y Full-Stack & Cloud Architect.
Objetivo: Atender de forma rápida, profesional y resolutiva a reclutadores, empresas y clientes.

Datos clave de Juan Alexander:
- Rol Principal: Chief Technology Officer (CTO) & Co-Founder en NODUX (Start-up B2B de consultoría operativa, ingeniería de datos y suites de IA).
- Podios & Hackathons:
  * 3.er Puesto Nacional en IAthon AWS & Kiro (ESAN x Fundación Romero) con el sistema Kiro RestQube (AWS Lambda, DynamoDB Single-Table, Bedrock Claude 3 Haiku y optimizador QUBO). Superaron a 40 escuadras (240 competidores). Demo: https://kirorestqube.vercel.app/
  * Clasificado Oficial en IEEE / IBM Quantum Hackathon Perú (PUCP x UTEC) con Nodux Quantum: resolución de problema cuadrático QAP10 de 4,150 variables con Q-LNS y QAOA en Qiskit Aer, logrando 27.04% de reducción de costo. Demo: https://nodux-quantum.vercel.app/
- Ecosistema Nodux (CTO):
  * PhyData AI: Suite de calidad de datos, diagnóstico y normalización semántica de hasta 3,000 SKUs con validación Human-in-the-Loop.
  * Nodux AI & Despacho: Automatización de cotizaciones por WhatsApp reducidas de 4 min a 10 seg (validado en Produce - Aprende a Emprender).
  * Commercial OS: CRM B2B con prospección inteligente (Gemini), pipeline de 7 fases y simulador FinOps de ROI (+418% / 69d payback).
  * 4 Plataformas productivas: E-Commerce & Logística (Angular 17 / Spring Boot), Nodux Educa LMS (Next.js), Portal Automotriz NX-7 PHEV (3D) y Web Corporativa B2B. Portal Oficial: https://nx-profiler-nine.vercel.app/
- Experiencia Bancaria: ZyTrust SA - modernización de microservicios transaccionales con Java 21, Spring Boot y Apache Kafka, reduciendo tiempos de respuesta en +35%.
- Currículum Vitae (CV / Resume): Disponible para descarga directa en PDF en /cv.pdf (archivo "CV - JUAN MIRANDA.pdf"). Si te piden su CV o currículum, proporciona el enlace [Descargar CV (PDF)](/cv.pdf).
- Formación: UTP (9.º ciclo, Décimo Superior / Top 10%), Inglés C1 Avanzado.
- Contacto y Disponibilidad: Disponible de inmediato. WhatsApp: +51 906 442 235 / +51 924 934 329, Correo: alex.04.antay@gmail.com / alex8v124@gmail.com, LinkedIn: linkedin.com/in/juanalexmiranda/, GitHub: github.com/alex8v124.

Reglas de respuesta:
1. Responde siempre con estilo conciso, amable y tecnológico.
2. Limita tus respuestas a 2-4 oraciones bien estructuradas con Markdown (negritas y viñetas breves).
3. Si preguntan por Nodux, destaca su rol de CTO y las suites de IA y datos desarrolladas.
4. Si preguntan por hackathons o computación cuántica, resalta Kiro RestQube (Top 3 AWS) y Nodux Quantum (Qiskit Aer / QAOA).
5. Si preguntan por contacto o disponibilidad, resalta siempre su WhatsApp y correo.
6. Responde en el mismo idioma de la pregunta (español o inglés).`;

// Local instant smart fallback if external API is unreachable or times out
function getSmartFallback(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('cv') || q.includes('curriculum') || q.includes('resume') || q.includes('hoja de vida')) {
    return `Puedes descargar el currículum actualizado de Juan Alexander directamente aquí: 📄 [Descargar CV - JUAN MIRANDA.pdf](/cv.pdf).`;
  }

  if (q.includes('nodux') || q.includes('cto') || q.includes('founder') || q.includes('phydata') || q.includes('commercial')) {
    return `Juan Alexander es **CTO & Co-Founder en NODUX**, donde lidera la arquitectura técnica de suites de IA como **PhyData AI** (higiene y normalización de hasta 3,000 SKUs), **Nodux AI Despacho** (cotizaciones en 10s validadas por PRODUCE) y **Commercial OS** (CRM B2B con motor Gemini y FinOps). Puedes explorar el portal oficial en [Nodux](https://nx-profiler-nine.vercel.app/).`;
  }

  if (q.includes('hackathon') || q.includes('podio') || q.includes('kiro') || q.includes('quantum') || q.includes('cuantica') || q.includes('aws')) {
    return `Juan cuenta con destacados podios nacionales: 🏆 **3.er Puesto Nacional en IAthon AWS & Kiro** con [Kiro RestQube](https://kirorestqube.vercel.app/) (AWS Serverless + Bedrock + QUBO) superando a 240 ingenieros, y ⚛️ **Clasificado Oficial en IEEE / IBM Quantum Hackathon** con [Nodux Quantum](https://nodux-quantum.vercel.app/) (QAOA en Qiskit Aer con 27.04% de reducción de costos).`;
  }

  if (q.includes('java') || q.includes('kafka') || q.includes('spring') || q.includes('stack') || q.includes('tecnolog')) {
    return `Juan Alexander está especializado en **Java 21**, **Spring Boot 3**, **Apache Kafka** y **AWS Serverless** para arquitecturas de alta concurrencia y microservicios. En el frontend domina **Angular 17+ (Signals)** y **Next.js 15 / React**, complementado con **Qiskit Aer (computación cuántica), PostgreSQL, MongoDB y Docker/Podman**.`;
  }

  if (q.includes('contact') || q.includes('telefono') || q.includes('correo') || q.includes('whatsapp') || q.includes('email') || q.includes('hablemos')) {
    return `¡Puedes contactar a Juan Alexander directamente! 📞 **WhatsApp:** [+51 906 442 235](https://wa.me/51906442235) | ✉️ **Correo:** [alex.04.antay@gmail.com](mailto:alex.04.antay@gmail.com) | 💼 **LinkedIn:** [juanalexmiranda](https://www.linkedin.com/in/juanalexmiranda/).`;
  }

  if (q.includes('proyecto') || q.includes('repositorio') || q.includes('github') || q.includes('portafolio')) {
    return `Entre sus proyectos más destacados están [Kiro RestQube](https://kirorestqube.vercel.app/) (Top 3 AWS), [Nodux Quantum](https://nodux-quantum.vercel.app/) (IBM Quantum), la **Plataforma de Microservicios con Kafka** y la suite **PhyData AI**. Revisa su código en [GitHub: @alex8v124](https://github.com/alex8v124).`;
  }

  if (q.includes('experiencia') || q.includes('zytrust') || q.includes('banc') || q.includes('trabaj')) {
    return `Juan se desempeña como **CTO & Co-Founder en NODUX** y como desarrollador en **ZyTrust SA** (Sector Bancario), donde modernizó microservicios a **Java 21** e implementó **Apache Kafka** para mensajería transaccional asíncrona, reduciendo tiempos de respuesta en más de un **35%**.`;
  }

  if (q.includes('disponib') || q.includes('contratar') || q.includes('remoto') || q.includes('oferta') || q.includes('trabajo')) {
    return `Juan Alexander tiene **disponibilidad inmediata** para colaborar como CTO, Lead Architect o Full-Stack / Backend Engineer (Java, Cloud Serverless, IA) en modalidad remota o híbrida. Escríbele a **alex.04.antay@gmail.com** o a su WhatsApp **+51 906 442 235**.`;
  }

  return `¡Hola! Soy **Nexus-01**, el copiloto de Juan Alexander Miranda Quispe. Juan es **CTO & Co-Founder en Nodux**, Ingeniero de Sistemas (UTP, Décimo Superior) especializado en **AWS Serverless, Computación Cuántica (Qiskit), Java 21, Spring Boot y Angular 17+** con podio nacional en AWS y experiencia bancaria (ZyTrust). ¿Te gustaría conocer más sobre sus proyectos, Nodux o coordinar una reunión?`;
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
