import React from 'react';
import { useAlive } from '../context/AliveContext';
import { ArrowRight, Sparkles, HeartPulse, BookOpen, Palette, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { AliveBrandBanner } from './AliveBrandBanner';
import { AliveLogo } from './AliveLogo';

export const Hero: React.FC = () => {
  const { setIsParticipateModalOpen, setParticipateDefaultType, setSelectedPillarFilter } = useAlive();

  const marqueeKeywords = [
    'SAÚDE MENTAL & BEM-ESTAR',
    'CULTURA & ARTE URBANA',
    'EDUCAÇÃO & SABER',
    'CRIATIVIDADE JOVEM',
    'TRANSFORMAÇÃO SOCIAL',
    'LIVE EVERY MOMENT',
    'CULTIVE SABER, TRANSFORME VIVER'
  ];

  return (
    <section id="inicio" className="relative min-h-[90vh] pt-28 pb-14 flex flex-col justify-between overflow-hidden bg-[#FFFDF9]">
      {/* Decorative Subtle Grid Lines */}
      <div className="absolute top-0 right-0 w-1/4 h-full border-l border-[#144B1D]/5 pointer-events-none hidden lg:block" />
      <div className="absolute top-0 left-10 w-px h-full bg-[#144B1D]/5 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          {/* Top Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#144B1D]/15 mb-6 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#1E6E28]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#144B1D]">
              Projeto Social & Cultural Independente
            </span>
          </motion.div>

          {/* MAIN BRAND BANNER ARTIFACT (Exact Replica: Logo on the left, Geometric pattern on the right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full mb-10"
          >
            <AliveBrandBanner showSlogan={true} />
          </motion.div>

          {/* Slogan & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 max-w-3xl mx-auto"
          >
            <h1 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold text-[#144B1D] tracking-tight leading-tight">
              “Cultive saber, transforme viver.”
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#3A4038] max-w-2xl mx-auto font-normal leading-relaxed">
              Um ecossistema vivo de oportunidades para jovens que une <strong className="text-[#1E6E28] font-semibold">Saúde</strong>, <strong className="text-[#E5531B] font-semibold">Cultura</strong> e <strong className="text-[#F09E12] font-semibold">Educação</strong> para transformar realidades com dignidade e afeto.
            </p>
          </motion.div>

          {/* 3 Interactive Pillar Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-4xl mb-9"
          >
            {/* Pillar 1: Saúde */}
            <a
              href="#pilares"
              onClick={() => setSelectedPillarFilter('saude')}
              className="group p-4 rounded-xl bg-white border-2 border-[#1E6E28]/25 hover:border-[#1E6E28] transition-all duration-200 hover:-translate-y-1 shadow-sm text-left flex items-center gap-3.5"
            >
              <div className="w-11 h-11 rounded-lg bg-[#1E6E28]/10 border border-[#1E6E28]/25 flex items-center justify-center shrink-0 text-[#1E6E28] group-hover:bg-[#1E6E28] group-hover:text-white transition-colors shadow-xs">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#1E6E28] uppercase tracking-widest block">01 / Pilar</span>
                <span className="text-sm font-bold text-[#144B1D] group-hover:text-[#1E6E28] transition-colors">Saúde & Bem-Estar</span>
                <span className="text-[11px] text-[#555] block mt-0.5 font-serif italic">Corpo & Mente</span>
              </div>
            </a>

            {/* Pillar 2: Cultura */}
            <a
              href="#pilares"
              onClick={() => setSelectedPillarFilter('cultura')}
              className="group p-4 rounded-xl bg-white border-2 border-[#E5531B]/25 hover:border-[#E5531B] transition-all duration-200 hover:-translate-y-1 shadow-sm text-left flex items-center gap-3.5"
            >
              <div className="w-11 h-11 rounded-lg bg-[#E5531B]/10 border border-[#E5531B]/25 flex items-center justify-center shrink-0 text-[#E5531B] group-hover:bg-[#E5531B] group-hover:text-white transition-colors shadow-xs">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#E5531B] uppercase tracking-widest block">02 / Pilar</span>
                <span className="text-sm font-bold text-[#144B1D] group-hover:text-[#E5531B] transition-colors">Cultura & Arte</span>
                <span className="text-[11px] text-[#555] block mt-0.5 font-serif italic">Expressão & Voz</span>
              </div>
            </a>

            {/* Pillar 3: Educação */}
            <a
              href="#pilares"
              onClick={() => setSelectedPillarFilter('educacao')}
              className="group p-4 rounded-xl bg-white border-2 border-[#F09E12]/25 hover:border-[#F09E12] transition-all duration-200 hover:-translate-y-1 shadow-sm text-left flex items-center gap-3.5"
            >
              <div className="w-11 h-11 rounded-lg bg-[#F09E12]/10 border border-[#F09E12]/25 flex items-center justify-center shrink-0 text-[#F09E12] group-hover:bg-[#F09E12] group-hover:text-white transition-colors shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#F09E12] uppercase tracking-widest block">03 / Pilar</span>
                <span className="text-sm font-bold text-[#144B1D] group-hover:text-[#F09E12] transition-colors">Educação & Saber</span>
                <span className="text-[11px] text-[#555] block mt-0.5 font-serif italic">Futuro & Autonomia</span>
              </div>
            </a>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <button
              id="hero-join-cta-btn"
              onClick={() => {
                setParticipateDefaultType('participante');
                setIsParticipateModalOpen(true);
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-md bg-[#144B1D] hover:bg-[#1E6E28] text-white font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
            >
              <span>Faça Parte do ALIVE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              id="hero-explore-btn"
              href="#sobre"
              className="w-full sm:w-auto px-7 py-3 rounded-md bg-white hover:bg-[#F5EFE6] text-[#144B1D] font-bold uppercase tracking-wider text-xs border border-[#144B1D]/25 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Conheça os Projetos</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Marquee Strip with Brand Colors */}
      <div className="w-full mt-14 py-3 bg-[#144B1D] text-white overflow-hidden border-y border-[#144B1D]">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          {[...marqueeKeywords, ...marqueeKeywords].map((word, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="font-serif italic font-bold text-xs sm:text-sm tracking-wider text-[#FFFDF9]">
                {word}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F09E12]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

