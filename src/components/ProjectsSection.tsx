import React, { useState } from 'react';
import { useAlive } from '../context/AliveContext';
import { PillarType, Project } from '../types';
import { Sparkles, Filter, Search, ArrowUpRight, HeartPulse, BookOpen, Palette, PlusCircle, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getSafeImageUrl } from '../utils/imageFallback';

export const ProjectsSection: React.FC = () => {
  const {
    projects,
    pillars,
    selectedPillarFilter,
    setSelectedPillarFilter,
    setActiveProjectModal,
    setIsCmsOpen,
    setIsHistoryModalOpen
  } = useAlive();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects by pillar & search query
  const filteredProjects = projects.filter((project) => {
    const matchesPillar =
      selectedPillarFilter === 'todos' || project.pilar === selectedPillarFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesPillar && matchesSearch;
  });

  const filterTabs: { id: PillarType | 'todos'; label: string; icon?: React.ReactNode; color: string }[] = [
    { id: 'todos', label: 'Todos os Projetos', color: '#1A1A1A' },
    { id: 'saude', label: 'Saúde 💚', icon: <HeartPulse className="w-3.5 h-3.5" />, color: '#2D5A27' },
    { id: 'educacao', label: 'Educação 📚', icon: <BookOpen className="w-3.5 h-3.5" />, color: '#2B4C7E' },
    { id: 'cultura', label: 'Cultura 🎨', icon: <Palette className="w-3.5 h-3.5" />, color: '#FF6B35' }
  ];

  return (
    <section id="projetos" className="py-20 relative overflow-hidden bg-[#F7F5F0] border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/15 text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#2D5A27]" />
              Iniciativas em Andamento
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] tracking-tight leading-[1.02]">
              Projetos & <span className="text-[#2D5A27]">Ações</span>
            </h2>
          </div>
          <p className="text-[#4A4A4A] max-w-md text-sm leading-relaxed">
            Conheça nossos programas contínuos de desenvolvimento social, criativo e emocional criados com e para a juventude.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#1A1A1A]/10">
          {/* Pillar Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {filterTabs.map((tab) => {
              const isSelected = selectedPillarFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`filter-tab-${tab.id}`}
                  onClick={() => setSelectedPillarFilter(tab.id)}
                  className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    isSelected
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white hover:bg-[#FDFCF8] text-[#1A1A1A] border border-[#1A1A1A]/15'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & CMS Add Button */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#4A4A4A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar projetos ou tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#1A1A1A]/15 rounded-md pl-10 pr-4 py-2 text-xs sm:text-sm text-[#1A1A1A] placeholder-[#71717A] focus:outline-none focus:border-[#1A1A1A] transition-colors shadow-xs"
              />
            </div>

            <button
              onClick={() => setIsHistoryModalOpen(true)}
              className="px-3 py-2 rounded-md bg-white hover:bg-[#FDFCF8] border border-[#1A1A1A]/15 text-[#1A1A1A] hover:text-[#2D5A27] transition-colors shrink-0 cursor-pointer shadow-xs text-xs font-bold flex items-center gap-1.5"
              title="Acessar histórico de projetos concluídos"
            >
              <History className="w-4 h-4 text-[#2D5A27]" />
              <span className="hidden sm:inline">Histórico</span>
            </button>

            <button
              onClick={() => setIsCmsOpen(true)}
              className="p-2 rounded-md bg-white hover:bg-[#FDFCF8] border border-[#1A1A1A]/15 text-[#1A1A1A] hover:text-[#2D5A27] transition-colors shrink-0 cursor-pointer shadow-xs"
              title="Cadastrar ou editar projetos no CMS"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-[#1A1A1A]/15 p-8 shadow-xs">
            <p className="text-[#4A4A4A] text-base mb-4">
              Nenhum projeto encontrado com os filtros selecionados.
            </p>
            <button
              onClick={() => {
                setSelectedPillarFilter('todos');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-md bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-wider"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const pillarInfo = pillars[project.pilar];

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="group rounded-lg bg-white border border-[#1A1A1A]/15 hover:border-[#1A1A1A] overflow-hidden shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                  >
                    {/* Project Image */}
                    <div className="relative aspect-16/10 overflow-hidden bg-[#F4EFE6]">
                      <img
                        src={getSafeImageUrl(project.image, 'project')}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-xs"
                        >
                          {pillarInfo.name}
                        </span>

                        {project.featured && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-[#FF6B35] text-white shadow-xs">
                            Destaque
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#71717A] mb-2 font-medium">
                          <span>{project.year}</span>
                          <span>•</span>
                          <span>{project.location}</span>
                        </div>

                        <h3 className="font-display font-extrabold text-xl text-[#1A1A1A] group-hover:text-[#2D5A27] transition-colors mb-2.5 leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-[#4A4A4A] text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                          {project.summary}
                        </p>
                      </div>

                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold text-[#4A4A4A] bg-[#FDFCF8] px-2 py-0.5 rounded-sm border border-[#1A1A1A]/10"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Button "Conheça" */}
                        <button
                          id={`btn-conheca-${project.id}`}
                          onClick={() => setActiveProjectModal(project)}
                          className="w-full py-2.5 px-4 rounded-md bg-[#1A1A1A] hover:bg-[#2D5A27] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <span>Conheça os Detalhes</span>
                          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
