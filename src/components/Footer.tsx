import React, { useState } from 'react';
import { useAlive } from '../context/AliveContext';
import { HeartPulse, BookOpen, Palette, SlidersHorizontal, ArrowUp, Send } from 'lucide-react';
import { AliveLogo } from './AliveLogo';
import { AlivePattern } from './AlivePattern';

export const Footer: React.FC = () => {
  const { setIsCmsOpen, showToast, setSelectedPillarFilter } = useAlive();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast('Inscrição na newsletter ALIVE realizada com sucesso!', 'success');
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#144B1D] text-[#FFFDF9] border-t-2 border-[#1E6E28] pt-12 pb-10 relative overflow-hidden">
      {/* Subtle brand pattern ribbon on top */}
      <div className="w-full h-4 opacity-50 mb-10 overflow-hidden">
        <AlivePattern height="16px" repeatCount={28} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-2xl inline-block shadow-sm">
              <AliveLogo variant="full" size={170} showSubtitle={true} />
            </div>

            <p className="font-serif italic text-lg text-[#F09E12]">
              “Cultive saber, transforme viver.”
            </p>

            <p className="text-white/80 text-xs leading-relaxed max-w-sm font-sans">
              Projeto social e cultural independente baseado na tríade de <strong>Saúde</strong>, <strong>Cultura</strong> e <strong>Educação</strong> para o protagonismo juvenil.
            </p>

            {/* Admin CMS Trigger */}
            <div className="pt-2">
              <button
                onClick={() => setIsCmsOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#F09E12]" />
                <span>Painel de Gestão / CMS</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[#F09E12]">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-white/85">
              <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-white transition-colors">Sobre o ALIVE</a></li>
              <li><a href="#pilares" className="hover:text-white transition-colors">Os 3 Pilares</a></li>
              <li><a href="#projetos" className="hover:text-white transition-colors">Projetos & Ações</a></li>
              <li><a href="#eventos" className="hover:text-white transition-colors">Próximos Eventos</a></li>
              <li><a href="#galeria" className="hover:text-white transition-colors">Galeria Visual</a></li>
            </ul>
          </div>

          {/* Pilares Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[#F09E12]">
              Pilares de Ação
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#projetos"
                  onClick={() => setSelectedPillarFilter('saude')}
                  className="flex items-center gap-2 text-white/85 hover:text-white transition-colors"
                >
                  <HeartPulse className="w-3.5 h-3.5 text-[#65d374]" />
                  <span>Saúde & Cuidado Integral</span>
                </a>
              </li>
              <li>
                <a
                  href="#projetos"
                  onClick={() => setSelectedPillarFilter('cultura')}
                  className="flex items-center gap-2 text-white/85 hover:text-white transition-colors"
                >
                  <Palette className="w-3.5 h-3.5 text-[#FF7A45]" />
                  <span>Cultura & Arte Urbana</span>
                </a>
              </li>
              <li>
                <a
                  href="#projetos"
                  onClick={() => setSelectedPillarFilter('educacao')}
                  className="flex items-center gap-2 text-white/85 hover:text-white transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#FFD066]" />
                  <span>Educação & Saber</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[#F09E12]">
              Boletim Informativo
            </h4>
            <p className="text-xs text-white/80 leading-relaxed">
              Fique por dentro de novas oficinas, editais e festivais do ALIVE.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div>
                <input
                  type="email"
                  required
                  placeholder="Seu e-mail..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/25 rounded-md px-3 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#F09E12]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-md bg-[#E5531B] hover:bg-[#c94513] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Inscrever-se</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} ALIVE — Projeto Social & Cultural. Cultive saber, transforme viver.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
