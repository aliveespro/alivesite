import React from 'react';
import { useAlive } from '../context/AliveContext';
import { Calendar, Clock, MapPin, Sparkles, Users, ArrowUpRight, PlusCircle, CheckCircle2, History } from 'lucide-react';
import { AliveEvent } from '../types';
import { getSafeImageUrl } from '../utils/imageFallback';

export const EventsSection: React.FC = () => {
  const { events, pillars, setActiveEventModal, setIsCmsOpen, setIsHistoryModalOpen } = useAlive();

  // Highlight the featured or earliest event
  const featuredEvent = events.find((e) => e.featured) || events[0];
  const regularEvents = events.filter((e) => e.id !== featuredEvent?.id);

  return (
    <section id="eventos" className="py-20 relative overflow-hidden bg-[#FDFCF8] border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/15 text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-[#2D5A27]" />
              Agenda Viva
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] tracking-tight leading-[1.02]">
              O que está <span className="text-[#2D5A27]">acontecendo?</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-[#4A4A4A] max-w-sm text-sm leading-relaxed font-serif italic">
              Encontros gratuitos, oficinas imersivas, rodas de conversa e festivais abertos para toda a comunidade.
            </p>
            <button
              onClick={() => setIsHistoryModalOpen(true)}
              className="px-3 py-2 rounded-md bg-white hover:bg-[#FDFCF8] border border-[#1A1A1A]/15 text-[#1A1A1A] hover:text-[#2D5A27] transition-colors shrink-0 shadow-xs cursor-pointer text-xs font-bold flex items-center gap-1.5"
              title="Acessar histórico de eventos realizados"
            >
              <History className="w-4 h-4 text-[#2D5A27]" />
              <span className="hidden sm:inline">Histórico</span>
            </button>
            <button
              onClick={() => setIsCmsOpen(true)}
              className="p-2 rounded-md bg-white hover:bg-[#FDFCF8] border border-[#1A1A1A]/15 text-[#1A1A1A] hover:text-[#2D5A27] transition-colors shrink-0 shadow-xs cursor-pointer"
              title="Cadastrar novos eventos no CMS"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Big Event Banner */}
        {featuredEvent && (
          <div className="mb-10 rounded-lg bg-white border border-[#1A1A1A]/15 overflow-hidden shadow-xs relative group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Event Image */}
              <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto lg:h-full min-h-[300px] overflow-hidden bg-[#F4EFE6]">
                <img
                  src={getSafeImageUrl(featuredEvent.image, 'event')}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1A1A1A]/60 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-sm bg-[#FF6B35] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    Grande Destaque
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-xs"
                  >
                    {pillars[featuredEvent.pilar]?.name}
                  </span>
                </div>
              </div>

              {/* Event Info Details */}
              <div className="lg:col-span-6 p-7 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#2D5A27] mb-3">
                    <span className="flex items-center gap-1.5 bg-[#2D5A27]/10 px-2.5 py-1 rounded-sm border border-[#2D5A27]/20">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredEvent.date}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#FDFCF8] px-2.5 py-1 rounded-sm border border-[#1A1A1A]/10 text-[#4A4A4A]">
                      <Clock className="w-3.5 h-3.5 text-[#71717A]" />
                      {featuredEvent.time}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1A1A1A] mb-3 leading-tight group-hover:text-[#2D5A27] transition-colors">
                    {featuredEvent.title}
                  </h3>

                  <p className="text-[#4A4A4A] text-sm leading-relaxed mb-5">
                    {featuredEvent.description}
                  </p>

                  <div className="space-y-1.5 mb-5 text-xs text-[#71717A]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#2D5A27] shrink-0" />
                      <span className="text-[#1A1A1A]">{featuredEvent.location}</span>
                    </div>
                    {featuredEvent.instructor && (
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#2B4C7E] shrink-0" />
                        <span>Facilitação: <strong className="text-[#1A1A1A]">{featuredEvent.instructor}</strong></span>
                      </div>
                    )}
                  </div>

                  {/* Vacancy status bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-[#71717A]">Vagas preenchidas:</span>
                      <span className="text-[#2D5A27] font-bold">
                        {featuredEvent.enrolledCount} de {featuredEvent.vacancies} inscritos
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#E5E0D8] overflow-hidden">
                      <div
                        className="h-full bg-[#2D5A27] rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            (featuredEvent.enrolledCount / featuredEvent.vacancies) * 100
                          )}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    id={`btn-inscrever-featured-${featuredEvent.id}`}
                    onClick={() => setActiveEventModal(featuredEvent)}
                    className="px-5 py-2.5 rounded-md bg-[#1A1A1A] hover:bg-[#2D5A27] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Garantir Minha Vaga</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regularEvents.map((evt) => {
            const pillar = pillars[evt.pilar];
            const isFull = evt.enrolledCount >= evt.vacancies;

            return (
              <div
                key={evt.id}
                className="rounded-lg bg-white border border-[#1A1A1A]/15 hover:border-[#1A1A1A] p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border"
                      style={{
                        color: pillar?.color,
                        borderColor: `${pillar?.color}30`,
                        backgroundColor: `${pillar?.color}10`
                      }}
                    >
                      {pillar?.name}
                    </span>

                    <span className="text-xs text-[#2D5A27] font-semibold flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {evt.date}
                    </span>
                  </div>

                  <h4 className="font-display font-extrabold text-lg text-[#1A1A1A] group-hover:text-[#2D5A27] transition-colors mb-2 leading-snug">
                    {evt.title}
                  </h4>

                  <p className="text-[#4A4A4A] text-xs leading-relaxed mb-4 line-clamp-3">
                    {evt.description}
                  </p>

                  <div className="space-y-1 text-xs text-[#71717A] mb-5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#71717A] shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#71717A] shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#4A4A4A]">
                    {isFull ? (
                      <strong className="text-red-600 font-bold">Vagas Esgotadas</strong>
                    ) : (
                      <>
                        <strong className="text-[#1A1A1A] font-bold">{evt.vacancies - evt.enrolledCount}</strong> vagas restantes
                      </>
                    )}
                  </span>

                  <button
                    onClick={() => setActiveEventModal(evt)}
                    disabled={isFull}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs ${
                      isFull
                        ? 'bg-[#E5E0D8] text-[#71717A] cursor-not-allowed'
                        : 'bg-[#1A1A1A] hover:bg-[#2D5A27] text-white'
                    }`}
                  >
                    {isFull ? 'Encerrado' : 'Participar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
