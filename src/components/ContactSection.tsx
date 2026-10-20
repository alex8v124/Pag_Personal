'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  Copy,
  Check,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
  const { toast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    toast({
      title: '¡Correo copiado!',
      description: `${PERSONAL_INFO.email} copiado al portapapeles.`,
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    toast({
      title: '¡Teléfono copiado!',
      description: `${PERSONAL_INFO.phone} copiado al portapapeles.`,
    });
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor completa tu nombre, correo y mensaje.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    // Simulate sending with direct mailto fallback or UX feedback
    setTimeout(() => {
      setSubmitting(false);
      setFormSent(true);
      toast({
        title: '¡Mensaje recibido!',
        description: 'Gracias por ponerte en contacto. Te responderé a la brevedad posible.',
      });
      // Optionally open user's mail client
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formData.subject || 'Contacto desde Portafolio'
      )}&body=${encodeURIComponent(
        `Hola Juan Alexander,\n\nMi nombre es ${formData.name} (${formData.email}).\n\nMensaje:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Contacto Directo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-zinc-100">
            ¿Iniciamos una Conversación?
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl text-sm sm:text-base">
            Abierto a oportunidades laborales, proyectos de desarrollo full-stack, arquitecturas de microservicios y consultoría.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Cards */}
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-md shadow-xl">
              <h3 className="text-lg font-bold font-headline text-zinc-100 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Canales Inmediatos
              </h3>

              <div className="space-y-4">
                {/* Email card */}
                <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[11px] text-zinc-500 font-mono block">Correo Electrónico</span>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs sm:text-sm font-medium text-zinc-200 hover:text-amber-400 truncate block transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    data-magnetic="true"
                    data-cursor-label="Copiar"
                    onClick={handleCopyEmail}
                    className="shrink-0 text-zinc-400 hover:text-white"
                    aria-label="Copiar email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                {/* WhatsApp card */}
                <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-zinc-500 font-mono block">WhatsApp Directo</span>
                      <a
                        href={`https://wa.me/${PERSONAL_INFO.rawPhone}?text=${encodeURIComponent(
                          'Hola Juan Alexander, vi tu portafolio web y quisiera conversar sobre una oportunidad.'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium text-zinc-200 hover:text-emerald-400 transition-colors"
                      >
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    data-magnetic="true"
                    data-cursor-label="WhatsApp"
                    className="shrink-0 text-emerald-400 hover:text-emerald-300 text-xs gap-1"
                  >
                    <a
                      href={`https://wa.me/${PERSONAL_INFO.rawPhone}?text=${encodeURIComponent(
                        'Hola Juan Alexander, vi tu portafolio web y quisiera conversar sobre una oportunidad.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Abrir</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                </div>

                {/* Location card */}
                <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-500 font-mono block">Ubicación y Disponibilidad</span>
                    <p className="text-xs sm:text-sm font-medium text-zinc-200">
                      {PERSONAL_INFO.location} &bull; Remoto / Híbrido
                    </p>
                  </div>
                </div>
              </div>

              {/* Social buttons */}
              <div className="mt-6 pt-5 border-t border-zinc-800 flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  data-magnetic="true"
                  data-cursor-label="LinkedIn"
                  className="flex-1 bg-zinc-950/60 border-zinc-800 hover:border-blue-400/50 text-zinc-300 hover:text-blue-300 text-xs gap-2"
                >
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    LinkedIn
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  data-magnetic="true"
                  data-cursor-label="GitHub"
                  className="flex-1 bg-zinc-950/60 border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white text-xs gap-2"
                >
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>

            {/* Availability Box */}
            <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20 text-xs text-zinc-300 font-mono flex items-center gap-3">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Zona Horaria: UTC-5 (Lima, Perú) &bull; Respuesta habitual en menos de 24 horas.</span>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
            <h3 className="text-xl font-bold font-headline text-zinc-100 mb-2">
              Envíame un Mensaje
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6">
              Completa el formulario y te responderé directamente a tu correo.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Tu Nombre *</label>
                  <Input
                    type="text"
                    required
                    placeholder="Ej. Carlos Mendoza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-zinc-950/60 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Tu Correo Electrónico *</label>
                  <Input
                    type="email"
                    required
                    placeholder="carlos@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-zinc-950/60 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">Asunto / Motivo</label>
                <Input
                  type="text"
                  placeholder="Ej. Oportunidad laboral / Proyecto Full-Stack"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-zinc-950/60 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">Mensaje *</label>
                <Textarea
                  required
                  rows={4}
                  placeholder="Escribe aquí los detalles del proyecto, propuesta o consulta..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-zinc-950/60 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 text-xs resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                data-magnetic="true"
                data-cursor-label="Enviar"
                className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs py-3 shadow-lg shadow-amber-400/20 gap-2"
              >
                {submitting ? (
                  <span>Enviando...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
