import React from 'react';
import { Sparkles, Compass, Target, Users, Zap, ShieldCheck, HeartHandshake, ArrowRight, HeartPulse, Palette, BookOpen } from 'lucide-react';
import { useAlive } from '../context/AliveContext';
import { AliveLogo } from './AliveLogo';
import { AlivePattern } from './AlivePattern';

export const AboutSection: React.FC = () => {
  const { setIsParticipateModalOpen, setParticipateDefaultType } = useAlive();

  const emblemPillars = [
    {
      icon: <HeartPulse className="w-5 h-5 text-[#1E6E28]" />,
      sector: 'Setor Verde (Superior Esquerdo)',
      symbol: 'Cruz da Saúde + Pulso Cardíaco',
      title: 'Saúde & Cuidado Integral',
      desc: 'Simboliza a escuta ativa, apoio psicológico, saúde mental e acolhimento humano que sustentam a vida.',
      color: '#1E6E28',
      badgeBg: 'bg-[#1E6E28]/10 text-[#1E6E28] border-[#1E6E28]/25'
    },
    {
      icon: <Palette className="w-5 h-5 text-[#E5531B]" />,
      sector: 'Setor Laranja (Superior Direito)',
      symbol: 'Cristo Redentor & Monumentos',
      title: 'Cultura & Identidade',
      desc: 'Representa a arte urbana, a expressão coletiva, a música, o slam e o sentimento de pertencimento comunitário.',
      color: '#E5531B',
      badgeBg: 'bg-[#E5531B]/10 text-[#E5531B] border-[#E5531B]/25'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#F09E12]" />,
      sector: 'Setor Dourado (Inferior)',
      symbol: 'Capelo & Livro Aberto com Raios',
      title: 'Educação & Saber',
      desc: 'Expressa a autonomia pelo conhecimento, oficinas práticas, capacitação para o futuro e emancipação juvenil.',
      color: '#F09E12',
      badgeBg: 'bg-[#F09E12]/10 text-[#F09E12] border-[#F09E12]/25'
    }
  ];

  return (
    <section id="sobre" className="py-20 relative overflow-hidden bg-[#FBF9F4] border-t border-[#144B1D]/15">
      {/* Subtle top geometric pattern band */}
      <div className="w-full h-8 opacity-70 mb-12 overflow-hidden">
        <AlivePattern height="32px" repeatCount={24} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#144B1D]/15 text-xs font-bold text-[#144B1D] uppercase tracking-widest mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#1E6E28]" />
            Nossa Trajetória & Identidade
          </div>
          <h2 className="font-serif italic font-bold text-4xl sm:text-5xl md:text-6xl text-[#144B1D] tracking-tight leading-tight mb-5">
            Mais que uma iniciativa, um território vivo de futuros possíveis.
          </h2>
          <div className="border-l-4 border-[#1E6E28] pl-5 py-1">
            <p className="text-[#3A4038] text-lg font-serif leading-relaxed">
              O <strong>ALIVE</strong> nasceu da união entre <strong>Saúde</strong>, <strong>Cultura</strong> e <strong>Educação</strong>. Cultivamos saberes ancestrais e contemporâneos para transformar a vida dos jovens e de suas comunidades.
            </p>
          </div>
        </div>

        {/* Asymmetric Grid: Official Brand Emblem Showcase + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-stretch">
          {/* Official Emblem & Meaning Card */}
          <div className="lg:col-span-5 rounded-2xl bg-white border-2 border-[#144B1D]/15 p-8 flex flex-col items-center justify-between text-center shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#144B1D]/70 mb-2">
              Símbolo Oficial do Movimento
            </span>
            <div className="p-4 my-2 flex items-center justify-center">
              <AliveLogo variant="full" size={300} showSubtitle={true} />
            </div>
            <p className="text-xs text-[#555] font-serif italic max-w-sm mt-3">
              A árvore central representa o crescimento humano e comunitário, abraçada pelos três pilares que sustentam a vida digna.
            </p>
          </div>

          {/* Right: The 3 Sectors breakdown */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {emblemPillars.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl bg-white border border-[#144B1D]/15 shadow-xs flex items-start gap-4 hover:border-[#144B1D]/40 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border shadow-xs"
                  style={{
                    backgroundColor: `${item.color}15`,
                    borderColor: `${item.color}35`
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${item.badgeBg}`}>
                      {item.symbol}
                    </span>
                    <span className="text-[10px] text-[#777] font-sans">
                      {item.sector}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#144B1D] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-6 rounded-xl bg-[#144B1D] text-white border border-[#144B1D] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F09E12] block">
              Junte-se ao movimento ALIVE
            </span>
            <span className="text-base sm:text-lg font-serif italic font-bold text-white">
              “Live every moment — cultive saber, transforme viver.”
            </span>
          </div>
          <button
            onClick={() => {
              setParticipateDefaultType('participante');
              setIsParticipateModalOpen(true);
            }}
            className="px-6 py-2.5 rounded-md bg-[#FFFDF9] hover:bg-white text-[#144B1D] font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Faça Parte Agora
          </button>
        </div>
      </div>
    </section>
  );
};

