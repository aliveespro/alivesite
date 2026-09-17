import React, { useState, useEffect } from 'react';
import { useAlive } from '../context/AliveContext';
import { X, Sparkles, UserPlus, HeartHandshake, Building2, Share2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ParticipateModal: React.FC = () => {
  const {
    isParticipateModalOpen,
    setIsParticipateModalOpen,
    participateDefaultType,
    submitParticipation
  } = useAlive();

  const [role, setRole] = useState<'participante' | 'voluntario' | 'parceiro' | 'doador'>('participante');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    areaOfInterest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (participateDefaultType) {
      setRole(participateDefaultType);
    }
  }, [participateDefaultType, isParticipateModalOpen]);

  if (!isParticipateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    submitParticipation({
      ...formData,
      type: role
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsParticipateModalOpen(false);
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      areaOfInterest: '',
      message: ''
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1A1A1A]/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-[#FDFCF8] border border-[#1A1A1A]/15 rounded-lg overflow-hidden shadow-xl my-auto"
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-md bg-white border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer shadow-xs"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="p-6 sm:p-7 bg-[#F7F5F0] border-b border-[#1A1A1A]/10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-white border border-[#1A1A1A]/15 text-[#2D5A27] text-[10px] font-bold uppercase tracking-wider mb-2 shadow-xs">
              <Sparkles className="w-3 h-3" />
              Faça Parte do ALIVE
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1A1A1A]">
              Conecte-se à Transformação
            </h2>
            <p className="text-[#4A4A4A] text-xs font-serif italic mt-1">
              Escolha sua modalidade de participação e venha construir essa trajetória conosco.
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7">
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#2D5A27]/10 border border-[#2D5A27]/30 text-[#2D5A27] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-[#1A1A1A]">
                  Cadastro Recebido com Sucesso!
                </h3>
                <p className="text-[#4A4A4A] text-xs max-w-md mx-auto leading-relaxed font-serif italic">
                  Obrigado por seu interesse no projeto ALIVE. Nossa equipe entrará em contato via WhatsApp ou e-mail nos próximos dias.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-5 py-2 rounded-md bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#2D5A27] transition-colors cursor-pointer shadow-xs"
                >
                  Concluir
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Role Tabs */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Como você quer atuar?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'participante', label: 'Participante', icon: <UserPlus className="w-3.5 h-3.5" /> },
                      { id: 'voluntario', label: 'Voluntário', icon: <HeartHandshake className="w-3.5 h-3.5" /> },
                      { id: 'parceiro', label: 'Parceria', icon: <Building2 className="w-3.5 h-3.5" /> },
                      { id: 'doador', label: 'Apoiador', icon: <Share2 className="w-3.5 h-3.5" /> },
                    ].map((tab) => (
                      <button
                        type="button"
                        key={tab.id}
                        onClick={() => setRole(tab.id as any)}
                        className={`p-2.5 rounded-md border text-xs font-bold flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                          role === tab.id
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                            : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/15 hover:bg-[#F7F5F0]'
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#1A1A1A]/15 rounded-md px-3 py-2 text-xs text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#2D5A27]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#1A1A1A]/15 rounded-md px-3 py-2 text-xs text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#2D5A27]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      WhatsApp / Celular
                    </label>
                    <input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#1A1A1A]/15 rounded-md px-3 py-2 text-xs text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#2D5A27]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Área de Interesse Principal
                    </label>
                    <select
                      value={formData.areaOfInterest}
                      onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                      className="w-full bg-white border border-[#1A1A1A]/15 rounded-md px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#2D5A27] cursor-pointer"
                    >
                      <option value="">Selecione uma área...</option>
                      <option value="Saúde & Bem-Estar">Saúde & Bem-Estar</option>
                      <option value="Educação & Tecnologia">Educação & Saber</option>
                      <option value="Cultura & Arte Urbana">Cultura & Arte Urbana</option>
                      <option value="Todas as áreas">Todas as áreas do ALIVE</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                    Mensagem ou Proposta (opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Como você gostaria de somar com o ALIVE?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-[#1A1A1A]/15 rounded-md px-3 py-2 text-xs text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#2D5A27] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-md bg-[#1A1A1A] hover:bg-[#2D5A27] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  Enviar Cadastro
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
