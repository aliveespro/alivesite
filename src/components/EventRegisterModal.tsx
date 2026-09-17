import React, { useState } from 'react';
import { useAlive } from '../context/AliveContext';
import { X, Calendar, Clock, MapPin, CheckCircle2, Sparkles, User, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const EventRegisterModal: React.FC = () => {
  const { activeEventModal, setActiveEventModal, enrollInEvent, pillars } = useAlive();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!activeEventModal) return null;

  const pillar = pillars[activeEventModal.pilar];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const success = enrollInEvent(activeEventModal.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    });

    if (success) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setActiveEventModal(null);
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', age: '' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1A1A1A]/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-[#FDFCF8] border border-[#1A1A1A]/15 rounded-lg overflow-hidden shadow-xl my-auto"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-md bg-white border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer shadow-xs"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="p-6 sm:p-7 bg-[#F7F5F0] border-b border-[#1A1A1A]/10">
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border bg-white shadow-xs"
                style={{
                  color: pillar?.color,
                  borderColor: `${pillar?.color}40`
                }}
              >
                Pilar {pillar?.name}
              </span>
              <span className="text-xs text-[#2D5A27] font-bold">100% Gratuito</span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1A1A1A] mb-2.5 leading-tight">
              {activeEventModal.title}
            </h2>

            <div className="space-y-1 text-xs text-[#4A4A4A]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2D5A27] shrink-0" />
                <span>{activeEventModal.date} às {activeEventModal.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2D5A27] shrink-0" />
                <span>{activeEventModal.location}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7">
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#2D5A27]/10 border border-[#2D5A27]/30 text-[#2D5A27] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-[#1A1A1A]">
                  Inscrição Confirmada!
                </h3>
                <p className="text-[#4A4A4A] text-xs max-w-sm mx-auto leading-relaxed font-serif italic">
                  Enviamos o comprovante e as orientações para <strong className="text-[#2D5A27]">{formData.email}</strong>. Te esperamos lá!
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-5 py-2 rounded-md bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2D5A27] transition-colors cursor-pointer shadow-xs"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#1A1A1A]/15 rounded-md pl-9 pr-3 py-2 text-xs text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#2D5A27]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      E-mail *
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-[#1A1A1A]/15 rounded-md pl-9 pr-3 py-2 text-xs text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#2D5A27]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                      WhatsApp / Celular
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-[#1A1A1A]/15 rounded-md pl-9 pr-3 py-2 text-xs text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#2D5A27]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Idade (opcional)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    placeholder="Ex: 18"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-white border border-[#1A1A1A]/15 rounded-md px-3 py-2 text-xs text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#2D5A27]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-md bg-[#1A1A1A] hover:bg-[#2D5A27] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                  >
                    Confirmar Inscrição Gratuita
                  </button>
                  <p className="text-[10px] text-[#71717A] text-center mt-2">
                    Respeitamos sua privacidade. Seus dados são usados exclusivamente para a comunicação do evento.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
