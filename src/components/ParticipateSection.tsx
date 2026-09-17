import React from 'react';
import { useAlive } from '../context/AliveContext';
import { Sparkles, UserPlus, HeartHandshake, Building2, Share2, ArrowRight } from 'lucide-react';

export const ParticipateSection: React.FC = () => {
  const { setIsParticipateModalOpen, setParticipateDefaultType } = useAlive();

  const options = [
    {
      type: 'participante' as const,
      num: '01',
      icon: <UserPlus className="w-5 h-5 text-[#2D5A27]" />,
      title: 'Quero Participar das Ações',
      subtitle: 'Para Jovens de 14 a 29 anos',
      description: 'Tenha acesso gratuito a oficinas de arte, formação em tecnologia, rodas de saúde mental e eventos culturais.',
      cta: 'Inscreva-se Gratuitamente',
      border: 'border-[#2D5A27]/20 hover:border-[#2D5A27]'
    },
    {
      type: 'voluntario' as const,
      num: '02',
      icon: <HeartHandshake className="w-5 h-5 text-[#2B4C7E]" />,
      title: 'Ser Voluntário ou Mentor',
      subtitle: 'Educadores, Artistas e Psicólogos',
      description: 'Doe seu talento ministrando oficinas, mentorando jovens em transição de carreira ou facilitando rodas de acolhimento.',
      cta: 'Quero Ser Voluntário',
      border: 'border-[#2B4C7E]/20 hover:border-[#2B4C7E]'
    },
    {
      type: 'parceiro' as const,
      num: '03',
      icon: <Building2 className="w-5 h-5 text-[#FF6B35]" />,
      title: 'Parcerias & Empresas',
      subtitle: 'Escolas, Empresas e Institutos',
      description: 'Leve o ALIVE para a sua instituição, apoie projetos via leis de incentivo fiscal ou ofereça bolsas e oportunidades.',
      cta: 'Propor Parceria',
      border: 'border-[#FF6B35]/20 hover:border-[#FF6B35]'
    },
    {
      type: 'doador' as const,
      num: '04',
      icon: <Share2 className="w-5 h-5 text-[#1A1A1A]" />,
      title: 'Apoiar & Divulgar',
      subtitle: 'Faça o Movimento Ecoar',
      description: 'Contribua com materiais, espaço físico, recursos diretos ou compartilhe as nossas ações para impactar mais comunidades.',
      cta: 'Apoiar o Projeto',
      border: 'border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
    }
  ];

  const handleOpen = (type: 'participante' | 'voluntario' | 'parceiro' | 'doador') => {
    setParticipateDefaultType(type);
    setIsParticipateModalOpen(true);
  };

  return (
    <section id="participe" className="py-20 relative overflow-hidden bg-[#FDFCF8] border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/15 text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2D5A27]" />
            Engajamento & Transformação
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] tracking-tight leading-[1.02] mb-4">
            Você também pode fazer parte <span className="text-[#2D5A27]">desta jornada.</span>
          </h2>
          <p className="text-[#4A4A4A] text-base leading-relaxed font-serif italic">
            Escolha o caminho que mais combina com a sua vocação e ajude a semear saúde, conhecimento e cultura na vida de jovens.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {options.map((opt) => (
            <div
              key={opt.type}
              className={`p-7 rounded-lg bg-white border ${opt.border} shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-md bg-[#FDFCF8] border border-[#1A1A1A]/10 flex items-center justify-center">
                    {opt.icon}
                  </div>
                  <span className="font-serif italic text-lg text-[#1A1A1A]/40 font-bold">
                    {opt.num}
                  </span>
                </div>

                <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider block mb-1">
                  {opt.subtitle}
                </span>

                <h3 className="font-display font-extrabold text-lg text-[#1A1A1A] mb-2.5 leading-snug">
                  {opt.title}
                </h3>

                <p className="text-[#4A4A4A] text-xs sm:text-sm leading-relaxed mb-6">
                  {opt.description}
                </p>
              </div>

              <button
                onClick={() => handleOpen(opt.type)}
                className="w-full py-2.5 px-3 rounded-md bg-[#1A1A1A] hover:bg-[#2D5A27] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{opt.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
