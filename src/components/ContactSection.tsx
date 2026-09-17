import React, { useState } from 'react';
import { useAlive } from '../context/AliveContext';
import { Mail, MessageSquare, Instagram, Send, MapPin, Phone, HelpCircle, ChevronDown } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { submitContact } = useAlive();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Geral',
    message: ''
  });

  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    submitContact(formData);
    setFormData({ name: '', email: '', subject: 'Geral', message: '' });
  };

  const faqs = [
    {
      q: 'As oficinas e atividades do ALIVE são gratuitas?',
      a: 'Sim! Todas as nossas oficinas, rodas de conversa e eventos de capacitação são 100% gratuitos para os jovens participantes.'
    },
    {
      q: 'Como uma escola ou espaço cultural pode receber o ALIVE?',
      a: 'Basta preencher o formulário ao lado selecionando o assunto "Parceria Institucional" ou nos contatar via e-mail. Nossa equipe agendará uma visita para planejamento conjunto.'
    },
    {
      q: 'Como posso atuar como voluntário ou mentor?',
      a: 'Recebemos voluntários nas áreas de psicologia, artes visuais, música, audiovisual, tecnologia e educação. Cadastre-se na seção "Faça Parte" ou envie sua proposta por aqui.'
    }
  ];

  return (
    <section id="contato" className="py-20 relative overflow-hidden bg-[#FDFCF8] border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/15 text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 shadow-xs">
            <MessageSquare className="w-3.5 h-3.5 text-[#2D5A27]" />
            Conexão Direta
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] tracking-tight leading-[1.02] mb-4">
            Vamos construir <span className="text-[#2D5A27]">algo juntos?</span>
          </h2>
          <p className="text-[#4A4A4A] text-base leading-relaxed font-serif italic">
            Dúvidas, propostas de parcerias, agendamento de oficinas ou apoio institucional: envie sua mensagem para a nossa equipe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-lg p-7 sm:p-9 border border-[#1A1A1A]/15 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Como podemos te chamar?"
                    className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/15 rounded-md px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#2D5A27] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
                    Seu E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="exemplo@email.com"
                    className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/15 rounded-md px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#2D5A27] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
                  Assunto
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/15 rounded-md px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#2D5A27] transition-colors cursor-pointer"
                >
                  <option value="Geral">Informações Gerais sobre o ALIVE</option>
                  <option value="Inscrição">Dúvidas sobre Inscrições e Oficinas</option>
                  <option value="Voluntariado">Quero Ser Voluntário / Mentor</option>
                  <option value="Parceria">Proposta de Parceria Institucional / Patrocínio</option>
                  <option value="Imprensa">Imprensa e Comunicação</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2">
                  Mensagem *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escreva sua mensagem aqui..."
                  className="w-full bg-[#FDFCF8] border border-[#1A1A1A]/15 rounded-md px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#2D5A27] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-md bg-[#1A1A1A] hover:bg-[#2D5A27] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enviar Mensagem</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Contact Details & Channels */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick Contact Cards */}
            <div className="p-6 rounded-lg bg-white border border-[#1A1A1A]/15 shadow-xs space-y-3.5">
              <h3 className="font-display font-extrabold text-lg text-[#1A1A1A] mb-1">
                Canais de Atendimento
              </h3>

              <div className="flex items-center gap-3 p-3 rounded-md bg-[#FDFCF8] border border-[#1A1A1A]/10">
                <div className="w-9 h-9 rounded-md bg-white border border-[#1A1A1A]/15 flex items-center justify-center text-[#2D5A27] shrink-0 shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider block">E-mail Principal</span>
                  <a href="mailto:alive.espro@gmail.com" className="text-xs font-semibold text-[#1A1A1A] hover:text-[#2D5A27] transition-colors">
                    alive.espro@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-md bg-[#FDFCF8] border border-[#1A1A1A]/10">
                <div className="w-9 h-9 rounded-md bg-white border border-[#1A1A1A]/15 flex items-center justify-center text-[#FF6B35] shrink-0 shadow-xs">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider block">Instagram Oficial</span>
                  <span className="text-xs font-semibold text-[#1A1A1A]">@alive.projetosocial</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-md bg-[#FDFCF8] border border-[#1A1A1A]/10">
                <div className="w-9 h-9 rounded-md bg-white border border-[#1A1A1A]/15 flex items-center justify-center text-[#2B4C7E] shrink-0 shadow-xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider block">WhatsApp de Atendimento</span>
                  <span className="text-xs font-semibold text-[#1A1A1A]">(11) 98765-4321</span>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="p-6 rounded-lg bg-white border border-[#1A1A1A]/15 shadow-xs">
              <h3 className="font-display font-extrabold text-base text-[#1A1A1A] mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#2D5A27]" />
                Perguntas Frequentes
              </h3>

              <div className="space-y-2.5">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-[#1A1A1A]/10 pb-2.5 last:border-0 last:pb-0">
                    <button
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="w-full text-left flex items-center justify-between text-xs font-bold text-[#1A1A1A] hover:text-[#2D5A27] py-1 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#71717A] transition-transform ${
                          faqOpen === i ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {faqOpen === i && (
                      <p className="text-xs text-[#4A4A4A] mt-1.5 leading-relaxed font-serif italic">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
