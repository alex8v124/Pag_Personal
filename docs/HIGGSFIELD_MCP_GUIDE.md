# Guía del Conector Higgsfield MCP (Model Context Protocol)

Este documento describe la integración y el uso del conector **Higgsfield MCP** (disponible en [https://higgsfield.ai/es/mcp](https://higgsfield.ai/es/mcp)) en el portafolio web de **Juan Alexander Miranda Quispe**.

---

## 1. ¿Qué es el Conector Higgsfield MCP?

**Higgsfield MCP** es un servidor que implementa el protocolo abierto **Model Context Protocol (MCP)** creado para conectar modelos y asistentes de Inteligencia Artificial (Claude, ChatGPT, Cursor, Antigravity) con más de **30 modelos generativos de imagen y video de alta fidelidad** (incluyendo Nana Banana, Unlimited GPT-2 Image, Cinema Studio, etc.).

A través de este conector, cualquier agente puede:
- Generar previsualizaciones y banners de arquitectura para los proyectos del portafolio.
- Crear videos y animaciones 3D promocionales de los sistemas desarrollados.
- Realizar renderizado multimedia sin necesidad de GPUs locales ni claves de API complejas.

---

## 2. Configuración del Servidor MCP

En el directorio del proyecto se encuentra el archivo de configuración `.mcp/higgsfield-mcp.json`.

### A. Endpoint Remoto (Recomendado para Claude Desktop & Conectores Web)
- **Nombre del Conector:** `Higgsfield`
- **URL del Servidor MCP:** `https://mcp.higgsfield.ai/mcp`
- **Tipo de Conexión:** Remote SSE / HTTP Stream
- **Autenticación:** OAuth mediante navegador en [https://higgsfield.ai/es/mcp](https://higgsfield.ai/es/mcp)

### B. Configuración JSON para Clientes MCP (`claude_desktop_config.json` o `.mcp.json`)
```json
{
  "mcpServers": {
    "higgsfield": {
      "url": "https://mcp.higgsfield.ai/mcp"
    }
  }
}
```

### C. Instalación vía Skills o CLI para Cursor / Terminal Agents
```bash
# Agregar habilidades de Higgsfield
npx skills add higgsfield-ai/skills

# O instalar el CLI global
npm install -g @higgsfield/cli

# Iniciar sesión
higgsfield auth login
```

---

## 3. Publicación y Despliegue del Portafolio

El portafolio está configurado con **Integración y Despliegue Continuo (CI/CD)** en **Vercel** vinculado al repositorio oficial de GitHub:
- **Repositorio:** [https://github.com/alex8v124/Pag_Personal](https://github.com/alex8v124/Pag_Personal)
- **URL de Producción Activa:** [https://pag-personal.vercel.app/](https://pag-personal.vercel.app/)

Cada commit y push a la rama `main` dispara automáticamente la compilación estática optimizada en Vercel, publicando los cambios instantáneamente a nivel mundial.
