import React, { useState, useEffect, useRef } from 'react';
import { useAlive } from '../context/AliveContext';
import { TrendingUp, Users2, Award, Sparkles, SlidersHorizontal } from 'lucide-react';

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 1600;
    const incrementTime = 30;
    const totalSteps = duration / incrementTime;
    const stepValue = end / totalSteps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={elementRef} className="font-display font-black text-5xl sm:text-6xl tracking-tight text-[#1A1A1A]">
      <span className="text-[#FF6B35]">{prefix}</span>
      <span>{count.toLocaleString('pt-BR')}</span>
      <span className="text-[#FF6B35]">{suffix}</span>
    </div>
  );
};

export const ImpactSection: React.FC = () => {
  const { impactMetrics, setIsCmsOpen } = useAlive();

  return (
    <section id="impacto" className="py-20 relative overflow-hidden bg-[#FDFCF8] border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/15 text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 shadow-xs">
              <TrendingUp className="w-3.5 h-3.5 text-[#2D5A27]" />
              Impacto & Resultados
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] tracking-tight leading-[1.02]">
              Números que contam <span className="text-[#2D5A27]">histórias reais</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[#4A4A4A] max-w-sm text-sm leading-relaxed font-serif italic">
              Cada métrica representa uma vida acolhida, um jovem que encontrou voz e uma comunidade fortalecida.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {impactMetrics.map((metric, idx) => (
            <div
              key={metric.id || idx}
              className="relative p-7 rounded-lg bg-white border border-[#1A1A1A]/15 hover:border-[#1A1A1A] transition-all duration-200 hover:-translate-y-0.5 shadow-xs flex flex-col justify-between group"
            >
              <div className="mb-6">
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </div>

              <div>
                <h3 className="font-display font-extrabold text-base text-[#1A1A1A] mb-1.5 leading-snug">
                  {metric.label}
                </h3>
                <p className="text-[#4A4A4A] text-xs leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Manifesto Banner */}
        <div className="mt-10 p-7 sm:p-8 rounded-lg bg-[#F4EFE6] border border-[#1A1A1A]/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-[#2D5A27] text-white flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-lg sm:text-xl text-[#1A1A1A]">
                Transparência e Gestão de Impacto Social
              </h4>
              <p className="text-[#4A4A4A] text-xs sm:text-sm mt-0.5 max-w-xl">
                Nossos indicadores são atualizados continuamente pela equipe ALIVE para garantir prestação de contas rigorosa a parceiros e à comunidade.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCmsOpen(true)}
            className="px-4 py-2 rounded-md bg-white hover:bg-[#FDFCF8] border border-[#1A1A1A]/20 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] transition-colors shrink-0 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#2D5A27]" />
            <span>Atualizar Indicadores no CMS</span>
          </button>
        </div>
      </div>
    </section>
  );
};
