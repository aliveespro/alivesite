import React, { useState } from 'react';
import { useAlive } from '../context/AliveContext';
import { PillarType } from '../types';
import { HeartPulse, BookOpen, Palette, ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { AlivePattern } from './AlivePattern';
import { getSafeImageUrl } from '../utils/imageFallback';

export const PilaresSection: React.FC = () => {
  const { pillars, projects, setSelectedPillarFilter } = useAlive();
  const [activeTab, setActiveTab] = useState<PillarType>('saude');

  const pilarIcons: Record<PillarType, React.ReactNode> = {
    saude: <HeartPulse className="w-6 h-6" />,
    cultura: <Palette className="w-6 h-6" />,
    educacao: <BookOpen className="w-6 h-6" />
  };

  const currentPillar = pillars[activeTab] || pillars['saude'];
  const pillarProjects = projects.filter((p) => p.pilar === activeTab);

  return (
    <section id="pilares" className="py-20 relative overflow-hidden bg-[#FFFDF9] border-t border-[#144B1D]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#144B1D]/15 text-xs font-bold text-[#144B1D] uppercase tracking-widest mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1E6E28]" />
              Nossa Tríade de Atuação
            </div>
            <h2 className="font-serif italic font-bold text-4xl sm:text-5xl md:text-6xl text-[#144B1D] tracking-tight leading-tight">
              Os 3 Pilares do ALIVE
            </h2>
          </div>
          <p className="text-[#444] max-w-md text-sm sm:text-base leading-relaxed font-sans">
            Uma abordagem integrada onde o cuidado (<strong className="text-[#1E6E28]">Saúde</strong>), a expressão (<strong className="text-[#E5531B]">Cultura</strong>) e o conhecimento (<strong className="text-[#F09E12]">Educação</strong>) se potencializam mutuamente.
          </p>
        </div>

        {/* Pillar Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {(['saude', 'cultura', 'educacao'] as PillarType[]).map((pKey, idx) => {
            const p = pillars[pKey];
            if (!p) return null;
            const isSelected = activeTab === pKey;
            const numStr = `0${idx + 1}`;

            return (
              <button
                key={pKey}
                id={`pillar-tab-${pKey}`}
                onClick={() => setActiveTab(pKey)}
                className={`relative p-6 rounded-xl text-left transition-all duration-200 border-2 cursor-pointer ${
                  isSelected
                    ? 'bg-white shadow-md border-[#144B1D]'
                    : 'bg-[#F9F7F1] hover:bg-white border-[#144B1D]/15 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Active Indicator Top Border */}
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[4px] rounded-t-xl"
                    style={{ backgroundColor: p.color }}
                  />
                )}

                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center border shadow-xs"
                    style={{
                      backgroundColor: `${p.color}15`,
                      borderColor: `${p.color}35`,
                      color: p.color
                    }}
                  >
                    {pilarIcons[pKey]}
                  </div>
                  <span className="font-serif italic text-2xl text-[#144B1D]/40 font-bold">
                    {numStr}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#144B1D] mb-1">
                  {p.name}
                </h3>
                <p className="font-serif italic text-sm text-[#555]">
                  “{p.tagline}”
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Pillar Showcase Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl bg-white border-2 border-[#144B1D]/15 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Pillar Content Info */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: currentPillar.color }}
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#555]">
                    Foco de Atuação — {currentPillar.name}
                  </span>
                </div>

                <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#144B1D] mb-4">
                  “{currentPillar.tagline}”
                </h3>

                <p className="text-[#444] text-base sm:text-lg leading-relaxed mb-8 font-sans">
                  {currentPillar.description}
                </p>

                {/* Topics / Eixos Práticos */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#144B1D] mb-4">
                    Linhas de Ação & Oficinas Regulares
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentPillar.topics.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FFFDF9] border border-[#144B1D]/15"
                      >
                        <CheckCircle
                          className="w-4 h-4 shrink-0"
                          style={{ color: currentPillar.color }}
                        />
                        <span className="text-xs sm:text-sm font-semibold text-[#144B1D]">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA to view projects in this pillar */}
              <div className="pt-6 border-t border-[#144B1D]/15 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#555]">
                  <strong className="text-[#144B1D] font-bold">{pillarProjects.length}</strong> projetos ativos nesta frente
                </span>

                <a
                  href="#projetos"
                  onClick={() => setSelectedPillarFilter(activeTab)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-bold uppercase tracking-wider text-xs bg-[#144B1D] hover:bg-[#1E6E28] text-white transition-colors shadow-xs"
                >
                  <span>Ver Projetos de {currentPillar.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </a>
              </div>
            </div>

            {/* Pillar Photo / Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-[#144B1D]/20 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 group shadow-xs">
                <img
                  src={getSafeImageUrl(currentPillar.image, 'pillar')}
                  alt={`Pilar ${currentPillar.name} ALIVE`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-lg bg-[#FFFDF9]/95 backdrop-blur-sm border border-[#144B1D]/15">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider block mb-0.5"
                    style={{ color: currentPillar.color }}
                  >
                    Espaço Prático ALIVE
                  </span>
                  <span className="text-xs font-bold text-[#144B1D] block font-serif">
                    Vivências que constroem autonomia e pertencimento real
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
