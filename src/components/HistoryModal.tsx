import React, { useState } from 'react';
import { useAlive } from '../context/AliveContext';
import { PillarType, Project, AliveEvent, DeletedItemHistory } from '../types';
import { getSafeImageUrl } from '../utils/imageFallback';
import {
  History,
  X,
  RotateCcw,
  Trash2,
  Calendar,
  Layers,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Eye,
  ArrowRight,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type HistoryViewTab = 'eventos_passados' | 'lixeira' | 'projetos_concluidos';

export const HistoryModal: React.FC = () => {
  const {
    isHistoryModalOpen,
    setIsHistoryModalOpen,
    events,
    projects,
    pillars,
    deletedItems,
    restoreDeletedItem,
    permanentlyDeleteFromHistory,
    clearHistoryTrash,
    setActiveEventModal,
    setActiveProjectModal
  } = useAlive();

  const [activeTab, setActiveTab] = useState<HistoryViewTab>('eventos_passados');
  const [searchQuery, setSearchQuery] = useState('');
  const [pillarFilter, setPillarFilter] = useState<PillarType | 'todos'>('todos');

  if (!isHistoryModalOpen) return null;

  // Filtered past/finished events (non-deleted)
  const pastEvents = events.filter((e) => {
    const isPast = e.status === 'finished' || e.status === 'closed' || e.status === 'archived';
    const matchesPillar = pillarFilter === 'todos' || e.pilar === pillarFilter;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());
    return isPast && matchesPillar && matchesSearch;
  });

  // Filtered completed or archived projects (non-deleted)
  const completedProjects = projects.filter((p) => {
    const isCompleted = p.status === 'completed' || p.status === 'archived' || p.year.includes('2024') || p.year.includes('2025');
    const matchesPillar = pillarFilter === 'todos' || p.pilar === pillarFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPillar && matchesSearch;
  });

  // Filtered deleted items in recycle bin
  const filteredTrash = deletedItems.filter((item) => {
    const matchesPillar = pillarFilter === 'todos' || item.pillar === pillarFilter || !item.pillar;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPillar && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#1A1A1A]/75 backdrop-blur-xs overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl h-[88vh] bg-[#FDFCF8] text-[#1A1A1A] border border-[#1A1A1A]/15 rounded-xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#F7F5F0] border-b border-[#1A1A1A]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#2D5A27] text-white flex items-center justify-center shadow-xs">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-black text-lg text-[#1A1A1A] flex items-center gap-2">
                  Histórico & Memória ALIVE
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-[#1A1A1A] text-white uppercase tracking-wider">
                    Arquivo Institucional
                  </span>
                </h2>
                <p className="text-xs text-[#71717A]">
                  Consulte eventos realizados, legado de projetos e itens na lixeira recuperável.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsHistoryModalOpen(false)}
              className="w-8 h-8 rounded-md bg-white hover:bg-[#FDFCF8] border border-[#1A1A1A]/15 text-[#1A1A1A] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              aria-label="Fechar Histórico"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Sub-Header Tabs */}
          <div className="px-6 py-3 bg-[#F7F5F0] border-b border-[#1A1A1A]/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('eventos_passados')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'eventos_passados'
                    ? 'bg-[#144B1D] text-white shadow-xs'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#F4EFE6] border border-[#1A1A1A]/15'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Eventos Realizados ({pastEvents.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('projetos_concluidos')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'projetos_concluidos'
                    ? 'bg-[#144B1D] text-white shadow-xs'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#F4EFE6] border border-[#1A1A1A]/15'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Projetos & Ações Realizadas ({completedProjects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('lixeira')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'lixeira'
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'bg-white text-red-700 hover:bg-red-50 border border-red-200'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Lixeira / Excluídos ({deletedItems.length})</span>
              </button>
            </div>

            {/* Quick search input in history */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar no histórico..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs bg-white border border-[#1A1A1A]/15 rounded-md text-[#1A1A1A] placeholder-stone-400 focus:outline-none focus:border-[#144B1D]"
                />
              </div>

              {activeTab === 'lixeira' && deletedItems.length > 0 && (
                <button
                  onClick={clearHistoryTrash}
                  className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded border border-red-200 cursor-pointer"
                  title="Esvaziar lixeira definitivamente"
                >
                  Esvaziar
                </button>
              )}
            </div>
          </div>

          {/* Main Content Body */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#FDFCF8]">
            {/* TAB 1: EVENTOS REALIZADOS */}
            {activeTab === 'eventos_passados' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#1A1A1A]">
                      Memória de Oficinas & Festivais Realizados
                    </h3>
                    <p className="text-xs text-[#71717A]">
                      Registro histórico de todas as iniciativas já concluídas com sucesso pelo ALIVE.
                    </p>
                  </div>
                </div>

                {pastEvents.length === 0 ? (
                  <div className="p-10 text-center rounded-xl bg-white border border-[#1A1A1A]/10 text-stone-500">
                    <Calendar className="w-10 h-10 mx-auto mb-2 text-stone-300 stroke-[1.5]" />
                    <p className="text-sm font-bold text-stone-700">Nenhum evento passado encontrado</p>
                    <p className="text-xs text-stone-500 mt-1">
                      Eventos com status "Encerrado" ou "Realizado" aparecem organizados aqui.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pastEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-4 rounded-xl bg-white border border-[#1A1A1A]/15 hover:border-[#144B1D]/40 transition-all flex flex-col justify-between shadow-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#144B1D]/10 text-[#144B1D] uppercase">
                              {pillars[evt.pilar]?.name || evt.pilar}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                              Realizado • {evt.date}
                            </span>
                          </div>

                          <div className="flex gap-3 mb-3">
                            <img
                              src={getSafeImageUrl(evt.image, 'event')}
                              alt={evt.title}
                              className="w-20 h-16 rounded-lg object-cover border border-[#1A1A1A]/10 shrink-0"
                            />
                            <div>
                              <h4 className="font-display font-bold text-sm text-[#1A1A1A] line-clamp-1">
                                {evt.title}
                              </h4>
                              <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                                {evt.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 pt-2.5">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-stone-400" />
                              {evt.location}
                            </span>
                            <span className="flex items-center gap-1 font-semibold text-[#144B1D]">
                              <Users className="w-3 h-3" />
                              {evt.enrolledCount} participantes
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 flex justify-end">
                          <button
                            onClick={() => {
                              setActiveEventModal(evt);
                            }}
                            className="px-3 py-1 rounded bg-[#144B1D] hover:bg-[#1E6E28] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ver Registro</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PROJETOS REALIZADOS / ARQUIVADOS */}
            {activeTab === 'projetos_concluidos' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#1A1A1A]">
                      Acervo & Ciclos de Projetos ALIVE
                    </h3>
                    <p className="text-xs text-[#71717A]">
                      Histórico completo de frentes de atuação comunitárias, culturais e de saúde.
                    </p>
                  </div>
                </div>

                {completedProjects.length === 0 ? (
                  <div className="p-10 text-center rounded-xl bg-white border border-[#1A1A1A]/10 text-stone-500">
                    <Layers className="w-10 h-10 mx-auto mb-2 text-stone-300 stroke-[1.5]" />
                    <p className="text-sm font-bold text-stone-700">Nenhum projeto no acervo histórico</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl bg-white border border-[#1A1A1A]/15 hover:border-[#144B1D]/40 transition-all flex flex-col justify-between shadow-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#144B1D]/10 text-[#144B1D] uppercase">
                              {pillars[proj.pilar]?.name || proj.pilar}
                            </span>
                            <span className="text-[10px] font-semibold text-stone-500">
                              Ciclo: {proj.year}
                            </span>
                          </div>

                          <div className="flex gap-3 mb-3">
                            <img
                              src={getSafeImageUrl(proj.image, 'project')}
                              alt={proj.title}
                              className="w-20 h-16 rounded-lg object-cover border border-[#1A1A1A]/10 shrink-0"
                            />
                            <div>
                              <h4 className="font-display font-bold text-sm text-[#1A1A1A] line-clamp-1">
                                {proj.title}
                              </h4>
                              <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                                {proj.summary}
                              </p>
                            </div>
                          </div>

                          <p className="text-xs font-semibold text-[#144B1D] bg-[#F5EFE6] p-2 rounded border border-[#144B1D]/10 mb-2">
                            ⭐ {proj.impactHighlight}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                          <span className="text-xs text-stone-500 font-medium">{proj.beneficiaries}</span>
                          <button
                            onClick={() => {
                              setActiveProjectModal(proj);
                            }}
                            className="px-3 py-1 rounded bg-[#144B1D] hover:bg-[#1E6E28] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Abrir Projeto</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: LIXEIRA RECUPERÁVEL */}
            {activeTab === 'lixeira' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-display font-bold text-base text-red-900 flex items-center gap-2">
                      <Trash2 className="w-4 h-4 text-red-600" />
                      Lixeira & Itens Excluídos ({deletedItems.length})
                    </h3>
                    <p className="text-xs text-[#71717A]">
                      Itens removidos do portal são preservados aqui e podem ser <strong>restaurados a qualquer momento</strong> com um clique.
                    </p>
                  </div>
                </div>

                {filteredTrash.length === 0 ? (
                  <div className="p-12 text-center rounded-xl bg-white border border-[#1A1A1A]/10 text-stone-500">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-emerald-500 stroke-[1.5]" />
                    <p className="text-sm font-bold text-stone-800">A lixeira está vazia</p>
                    <p className="text-xs text-stone-500 mt-1">
                      Nenhum projeto, evento ou publicação foi excluído recentemente.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredTrash.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-white border border-red-200/80 hover:border-red-400/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 uppercase">
                              {item.type === 'project' ? 'Projeto' : item.type === 'event' ? 'Evento' : item.type === 'news' ? 'Notícia' : 'Galeria'}
                            </span>
                            {item.pillar && (
                              <span className="text-[10px] font-bold text-stone-500 uppercase">
                                • {pillars[item.pillar]?.name || item.pillar}
                              </span>
                            )}
                            <span className="text-[11px] text-stone-400">
                              Excluído em {item.deletedAt}
                            </span>
                          </div>

                          <h4 className="font-display font-bold text-sm text-[#1A1A1A]">
                            {item.title}
                          </h4>
                          {item.data?.location && (
                            <p className="text-xs text-stone-500 mt-0.5">
                              Local: {item.data.location} {item.data.date ? `• Data: ${item.data.date}` : ''}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => restoreDeletedItem(item.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                            title="Restaurar item para o portal"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restaurar</span>
                          </button>
                          <button
                            onClick={() => permanentlyDeleteFromHistory(item.id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                            title="Excluir definitivamente"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
