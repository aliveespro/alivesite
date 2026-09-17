import React, { useState } from 'react';
import { useAlive } from '../context/AliveContext';
import { PillarType, Project, AliveEvent, GalleryItem, NewsPost, ImpactMetric, PillarInfo } from '../types';
import { getSafeImageUrl } from '../utils/imageFallback';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  Download,
  Upload,
  Layers,
  Calendar,
  Image as ImageIcon,
  Newspaper,
  TrendingUp,
  Sliders,
  CheckCircle2,
  FolderPlus,
  ExternalLink,
  History,
  RotateCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type CmsTab = 'projetos' | 'eventos' | 'galeria' | 'novidades' | 'impacto' | 'pilares' | 'backup' | 'historico';

export const AdminCMSModal: React.FC = () => {
  const {
    isCmsOpen,
    setIsCmsOpen,
    pillars,
    projects,
    events,
    impactMetrics,
    gallery,
    news,
    saveProject,
    deleteProject,
    saveEvent,
    deleteEvent,
    saveGalleryItem,
    deleteGalleryItem,
    saveNewsPost,
    deleteNewsPost,
    updateImpactMetric,
    updatePillar,
    resetToDefaults,
    exportDataJson,
    importDataJson,
    showToast,
    deletedItems,
    restoreDeletedItem,
    permanentlyDeleteFromHistory,
    clearHistoryTrash
  } = useAlive();

  const [activeTab, setActiveTab] = useState<CmsTab>('projetos');

  // Delete Confirmation Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    title: string;
    itemTitle: string;
    itemType: string;
    itemId: string;
    category: 'project' | 'event' | 'gallery' | 'news';
  }>({
    isOpen: false,
    title: '',
    itemTitle: '',
    itemType: '',
    itemId: '',
    category: 'project'
  });

  const confirmDelete = () => {
    if (!deleteModal.itemId) return;
    if (deleteModal.category === 'project') {
      deleteProject(deleteModal.itemId);
    } else if (deleteModal.category === 'event') {
      deleteEvent(deleteModal.itemId);
    } else if (deleteModal.category === 'gallery') {
      deleteGalleryItem(deleteModal.itemId);
    } else if (deleteModal.category === 'news') {
      deleteNewsPost(deleteModal.itemId);
    }
    setDeleteModal((prev) => ({ ...prev, isOpen: false }));
  };

  // Edit / Form state for Projects
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Edit / Form state for Events
  const [editingEvent, setEditingEvent] = useState<AliveEvent | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  // Edit / Form state for Gallery
  const [newGalleryItem, setNewGalleryItem] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'oficinas',
    imageUrl: '',
    aspectRatio: 'wide',
    date: '2026',
    pilar: 'cultura',
    caption: ''
  });

  // Edit / Form state for News
  const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
  const [isCreatingNews, setIsCreatingNews] = useState(false);

  // JSON Import/Export State
  const [jsonInput, setJsonInput] = useState('');

  if (!isCmsOpen) return null;

  // Handlers for Project Form
  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    saveProject(editingProject);
    setEditingProject(null);
    setIsCreatingProject(false);
  };

  const handleStartCreateProject = () => {
    setEditingProject({
      id: `proj-${Date.now()}`,
      title: '',
      pilar: 'saude',
      summary: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop',
      featured: false,
      year: '2026',
      location: 'Comunidade ALIVE',
      beneficiaries: '+100 jovens',
      tags: ['Juventude', 'Impacto'],
      impactHighlight: 'Novo projeto de transformação social'
    });
    setIsCreatingProject(true);
  };

  // Handlers for Event Form
  const handleSaveEventForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    saveEvent(editingEvent);
    setEditingEvent(null);
    setIsCreatingEvent(false);
  };

  const handleStartCreateEvent = () => {
    setEditingEvent({
      id: `evt-${Date.now()}`,
      title: '',
      date: '15 Maio 2026',
      time: '14:00 às 18:00',
      location: 'Hub ALIVE',
      pilar: 'cultura',
      description: '',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
      featured: false,
      vacancies: 50,
      enrolledCount: 0,
      status: 'open',
      targetAudience: 'Jovens de 14 a 24 anos',
      instructor: 'Equipe ALIVE'
    });
    setIsCreatingEvent(true);
  };

  // Handlers for Gallery
  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title || !newGalleryItem.imageUrl) return;

    saveGalleryItem({
      id: `gal-${Date.now()}`,
      title: newGalleryItem.title,
      category: newGalleryItem.category as any || 'oficinas',
      imageUrl: newGalleryItem.imageUrl,
      aspectRatio: newGalleryItem.aspectRatio as any || 'wide',
      date: newGalleryItem.date || '2026',
      pilar: newGalleryItem.pilar as any || 'cultura',
      caption: newGalleryItem.caption || ''
    });

    setNewGalleryItem({
      title: '',
      category: 'oficinas',
      imageUrl: '',
      aspectRatio: 'wide',
      date: '2026',
      pilar: 'cultura',
      caption: ''
    });
  };

  // Handlers for News
  const handleSaveNewsForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;
    saveNewsPost(editingNews);
    setEditingNews(null);
    setIsCreatingNews(false);
  };

  const handleStartCreateNews = () => {
    setEditingNews({
      id: `noticia-${Date.now()}`,
      title: '',
      slug: `noticia-${Date.now()}`,
      category: 'Novidades & Ações',
      summary: '',
      content: '',
      author: 'Comunicação ALIVE',
      date: '2026',
      readTime: '3 min de leitura',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop',
      pilar: 'saude',
      tags: ['ALIVE', 'Juventude']
    });
    setIsCreatingNews(true);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alive-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup JSON exportado com sucesso!', 'success');
  };

  const handleImportBackup = () => {
    if (!jsonInput.trim()) return;
    const ok = importDataJson(jsonInput);
    if (ok) setJsonInput('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#1A1A1A]/70 backdrop-blur-xs overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-6xl h-[90vh] bg-[#FDFCF8] text-[#1A1A1A] border border-[#1A1A1A]/15 rounded-lg overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#F7F5F0] border-b border-[#1A1A1A]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-[#1A1A1A] text-white flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-display font-black text-lg text-[#1A1A1A] flex items-center gap-2">
                  Painel de Gestão ALIVE
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-[#2D5A27] text-white uppercase tracking-wider">
                    CMS Ativo
                  </span>
                </h2>
                <p className="text-xs text-[#71717A]">
                  Gerencie todo o acervo e conteúdo editorial do projeto ALIVE.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCmsOpen(false)}
              className="w-8 h-8 rounded-md bg-white hover:bg-[#FDFCF8] border border-[#1A1A1A]/15 text-[#1A1A1A] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              aria-label="Fechar Painel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Sub-Header Tabs */}
          <div className="px-6 py-2.5 bg-[#F7F5F0] border-b border-[#1A1A1A]/10 flex items-center gap-2 overflow-x-auto">
            {[
              { id: 'projetos', label: 'Projetos', icon: <Layers className="w-3.5 h-3.5" /> },
              { id: 'eventos', label: 'Eventos', icon: <Calendar className="w-3.5 h-3.5" /> },
              { id: 'galeria', label: 'Galeria', icon: <ImageIcon className="w-3.5 h-3.5" /> },
              { id: 'novidades', label: 'Conteúdos / Notícias', icon: <Newspaper className="w-3.5 h-3.5" /> },
              { id: 'impacto', label: 'Indicadores de Impacto', icon: <TrendingUp className="w-3.5 h-3.5" /> },
              { id: 'pilares', label: 'Os 3 Pilares', icon: <Sliders className="w-3.5 h-3.5" /> },
              { id: 'historico', label: `Histórico / Lixeira (${deletedItems.length})`, icon: <History className="w-3.5 h-3.5" /> },
              { id: 'backup', label: 'Backup & Dados', icon: <Download className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as CmsTab);
                  setEditingProject(null);
                  setEditingEvent(null);
                  setEditingNews(null);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#1A1A1A] bg-white/60 hover:bg-white border border-[#1A1A1A]/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Container */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#FDFCF8]">
            {/* TAB 1: PROJETOS */}
            {activeTab === 'projetos' && (
              <div className="space-y-6">
                {editingProject ? (
                  // Project Edit / Create Form
                  <form onSubmit={handleSaveProjectForm} className="bg-[#131b2a] p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <h3 className="font-display font-bold text-lg text-white">
                        {isCreatingProject ? 'Cadastrar Novo Projeto' : `Editar Projeto: ${editingProject.title}`}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(null);
                          setIsCreatingProject(false);
                        }}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Título do Projeto *</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Pilar de Atuação *</label>
                        <select
                          value={editingProject.pilar}
                          onChange={(e) => setEditingProject({ ...editingProject, pilar: e.target.value as PillarType })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-emerald-400 cursor-pointer"
                        >
                          <option value="saude">Saúde 💚</option>
                          <option value="educacao">Educação 📚</option>
                          <option value="cultura">Cultura 🎨</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Ano / Período</label>
                        <input
                          type="text"
                          value={editingProject.year}
                          onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Local / Abrangência</label>
                        <input
                          type="text"
                          value={editingProject.location}
                          onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Beneficiários</label>
                        <input
                          type="text"
                          value={editingProject.beneficiaries}
                          onChange={(e) => setEditingProject({ ...editingProject, beneficiaries: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Resumo Curto (para o card)</label>
                      <input
                        type="text"
                        required
                        value={editingProject.summary}
                        onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                        className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Descrição Completa</label>
                      <textarea
                        rows={3}
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Destaque de Impacto</label>
                      <input
                        type="text"
                        value={editingProject.impactHighlight}
                        onChange={(e) => setEditingProject({ ...editingProject, impactHighlight: e.target.value })}
                        className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">URL da Imagem de Capa</label>
                        <input
                          type="url"
                          required
                          value={editingProject.image}
                          onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Tags (separadas por vírgula)</label>
                        <input
                          type="text"
                          value={editingProject.tags.join(', ')}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                            })
                          }
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="proj-featured-check"
                        checked={editingProject.featured}
                        onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        className="w-4 h-4 accent-emerald-400 rounded cursor-pointer"
                      />
                      <label htmlFor="proj-featured-check" className="text-xs font-semibold text-slate-300 cursor-pointer">
                        Exibir como projeto em destaque principal
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(null);
                          setIsCreatingProject(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-extrabold flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Salvar Projeto</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  // Projects List
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display font-bold text-lg text-white">
                          Projetos Cadastrados ({projects.length})
                        </h3>
                        <p className="text-xs text-slate-400">
                          Edite informações, fotos ou cadastre novas frentes de ação.
                        </p>
                      </div>

                      <button
                        onClick={handleStartCreateProject}
                        className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Novo Projeto</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded-2xl bg-[#131b2a] border border-white/10 flex items-center justify-between gap-4 hover:border-emerald-500/30 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={getSafeImageUrl(proj.image, 'project')}
                              alt=""
                              className="w-16 h-12 object-cover rounded-xl border border-white/10"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-emerald-400 uppercase">
                                  {pillars[proj.pilar]?.name}
                                </span>
                                {proj.featured && (
                                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full">
                                    Destaque
                                  </span>
                                )}
                              </div>
                              <h4 className="font-display font-bold text-sm text-white">
                                {proj.title}
                              </h4>
                              <span className="text-xs text-slate-400">{proj.year} • {proj.location}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingProject(proj);
                                setIsCreatingProject(false);
                              }}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-emerald-400 transition-colors"
                              title="Editar Projeto"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteModal({
                                  isOpen: true,
                                  title: 'Excluir Projeto',
                                  itemTitle: proj.title,
                                  itemType: 'Projeto',
                                  itemId: proj.id,
                                  category: 'project'
                                });
                              }}
                              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                              title="Excluir Projeto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EVENTOS */}
            {activeTab === 'eventos' && (
              <div className="space-y-6">
                {editingEvent ? (
                  // Event Form
                  <form onSubmit={handleSaveEventForm} className="bg-[#131b2a] p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <h3 className="font-display font-bold text-lg text-white">
                        {isCreatingEvent ? 'Cadastrar Novo Evento' : `Editar Evento: ${editingEvent.title}`}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEvent(null);
                          setIsCreatingEvent(false);
                        }}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Título do Evento *</label>
                        <input
                          type="text"
                          required
                          value={editingEvent.title}
                          onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Pilar *</label>
                        <select
                          value={editingEvent.pilar}
                          onChange={(e) => setEditingEvent({ ...editingEvent, pilar: e.target.value as PillarType })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white cursor-pointer"
                        >
                          <option value="saude">Saúde 💚</option>
                          <option value="educacao">Educação 📚</option>
                          <option value="cultura">Cultura 🎨</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Data</label>
                        <input
                          type="text"
                          value={editingEvent.date}
                          onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Horário</label>
                        <input
                          type="text"
                          value={editingEvent.time}
                          onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Local</label>
                        <input
                          type="text"
                          value={editingEvent.location}
                          onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Total de Vagas</label>
                        <input
                          type="number"
                          value={editingEvent.vacancies}
                          onChange={(e) => setEditingEvent({ ...editingEvent, vacancies: parseInt(e.target.value) || 0 })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Inscritos Atuais</label>
                        <input
                          type="number"
                          value={editingEvent.enrolledCount}
                          onChange={(e) => setEditingEvent({ ...editingEvent, enrolledCount: parseInt(e.target.value) || 0 })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Facilitador / Artista</label>
                        <input
                          type="text"
                          value={editingEvent.instructor || ''}
                          onChange={(e) => setEditingEvent({ ...editingEvent, instructor: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Descrição</label>
                      <textarea
                        rows={3}
                        value={editingEvent.description}
                        onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                        className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">URL da Imagem</label>
                      <input
                        type="url"
                        value={editingEvent.image}
                        onChange={(e) => setEditingEvent({ ...editingEvent, image: e.target.value })}
                        className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="evt-featured-check"
                        checked={editingEvent.featured}
                        onChange={(e) => setEditingEvent({ ...editingEvent, featured: e.target.checked })}
                        className="w-4 h-4 accent-emerald-400 rounded cursor-pointer"
                      />
                      <label htmlFor="evt-featured-check" className="text-xs font-semibold text-slate-300 cursor-pointer">
                        Exibir como evento em destaque principal no topo
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEvent(null);
                          setIsCreatingEvent(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-slate-300"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-extrabold flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Salvar Evento</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  // Event List
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display font-bold text-lg text-white">
                          Eventos & Oficinas ({events.length})
                        </h3>
                        <p className="text-xs text-slate-400">
                          Cadastre novas oficinas, gerencie vagas e datas.
                        </p>
                      </div>

                      <button
                        onClick={handleStartCreateEvent}
                        className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Novo Evento</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {events.map((evt) => (
                        <div
                          key={evt.id}
                          className="p-4 rounded-2xl bg-[#131b2a] border border-white/10 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={getSafeImageUrl(evt.image, 'event')}
                              alt=""
                              className="w-16 h-12 object-cover rounded-xl border border-white/10"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-emerald-400">
                                  {evt.date} às {evt.time}
                                </span>
                                {evt.featured && (
                                  <span className="text-[10px] bg-emerald-400 text-black font-bold px-2 py-0.5 rounded-full">
                                    Destaque
                                  </span>
                                )}
                              </div>
                              <h4 className="font-display font-bold text-sm text-white">
                                {evt.title}
                              </h4>
                              <span className="text-xs text-slate-400">
                                {evt.enrolledCount}/{evt.vacancies} inscritos • {evt.location}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingEvent(evt);
                                setIsCreatingEvent(false);
                              }}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
                              title="Editar Evento"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteModal({
                                  isOpen: true,
                                  title: 'Excluir Evento',
                                  itemTitle: evt.title,
                                  itemType: 'Evento',
                                  itemId: evt.id,
                                  category: 'event'
                                });
                              }}
                              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                              title="Excluir Evento"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: GALERIA */}
            {activeTab === 'galeria' && (
              <div className="space-y-6">
                {/* Form to Add Photo */}
                <form onSubmit={handleAddGalleryItem} className="p-6 rounded-2xl bg-[#131b2a] border border-white/10 space-y-4">
                  <h3 className="font-display font-bold text-base text-white">
                    Adicionar Nova Foto à Galeria
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Título / Legenda *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Oficina de Graffiti"
                        value={newGalleryItem.title}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                        className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Categoria</label>
                      <select
                        value={newGalleryItem.category}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value as any })}
                        className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white cursor-pointer"
                      >
                        <option value="oficinas">Oficinas</option>
                        <option value="eventos">Eventos</option>
                        <option value="arte">Arte Urbana</option>
                        <option value="comunidade">Comunidade</option>
                        <option value="bastidores">Bastidores</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Pilar Associado</label>
                      <select
                        value={newGalleryItem.pilar}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, pilar: e.target.value as any })}
                        className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white cursor-pointer"
                      >
                        <option value="saude">Saúde</option>
                        <option value="educacao">Educação</option>
                        <option value="cultura">Cultura</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">URL da Imagem *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={newGalleryItem.imageUrl}
                      onChange={(e) => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })}
                      className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar Foto</span>
                    </button>
                  </div>
                </form>

                {/* Existing Gallery Grid */}
                <div>
                  <h4 className="font-display font-bold text-sm text-white mb-3">
                    Fotos Existentes ({gallery.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {gallery.map((item) => (
                      <div key={item.id} className="relative rounded-2xl overflow-hidden aspect-square border border-white/10 group bg-black/40">
                        <img src={getSafeImageUrl(item.imageUrl, 'gallery')} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                          <span className="text-[10px] text-emerald-400 uppercase font-bold">
                            {item.category}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-white line-clamp-1">{item.title}</p>
                            <button
                              type="button"
                              onClick={() => {
                                setDeleteModal({
                                  isOpen: true,
                                  title: 'Excluir Foto da Galeria',
                                  itemTitle: item.title || 'Foto selecionada',
                                  itemType: 'Foto da Galeria',
                                  itemId: item.id,
                                  category: 'gallery'
                                });
                              }}
                              className="mt-2 w-full py-1 rounded bg-red-500/80 hover:bg-red-500 text-[10px] font-bold text-white transition-colors cursor-pointer"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CONTEÚDOS / NOTÍCIAS */}
            {activeTab === 'novidades' && (
              <div className="space-y-6">
                {editingNews ? (
                  // News Form
                  <form onSubmit={handleSaveNewsForm} className="bg-[#131b2a] p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <h3 className="font-display font-bold text-lg text-white">
                        {isCreatingNews ? 'Publicar Novo Conteúdo' : `Editar: ${editingNews.title}`}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNews(null);
                          setIsCreatingNews(false);
                        }}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Título da Notícia/Artigo *</label>
                        <input
                          type="text"
                          required
                          value={editingNews.title}
                          onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Categoria</label>
                        <input
                          type="text"
                          value={editingNews.category}
                          onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Autor</label>
                        <input
                          type="text"
                          value={editingNews.author}
                          onChange={(e) => setEditingNews({ ...editingNews, author: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Data</label>
                        <input
                          type="text"
                          value={editingNews.date}
                          onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">Tempo de Leitura</label>
                        <input
                          type="text"
                          value={editingNews.readTime}
                          onChange={(e) => setEditingNews({ ...editingNews, readTime: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Resumo Curto</label>
                      <input
                        type="text"
                        value={editingNews.summary}
                        onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })}
                        className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">Texto Completo do Artigo</label>
                      <textarea
                        rows={6}
                        value={editingNews.content}
                        onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                        className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">URL da Imagem</label>
                      <input
                        type="url"
                        value={editingNews.imageUrl}
                        onChange={(e) => setEditingNews({ ...editingNews, imageUrl: e.target.value })}
                        className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNews(null);
                          setIsCreatingNews(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-white/5 text-xs font-bold text-slate-300"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-extrabold flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Publicar</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  // News list
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-display font-bold text-lg text-white">
                          Publicações & Artigos ({news.length})
                        </h3>
                        <p className="text-xs text-slate-400">
                          Histórias, campanhas e resultados do ALIVE.
                        </p>
                      </div>

                      <button
                        onClick={handleStartCreateNews}
                        className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Nova Notícia</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {news.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-[#131b2a] border border-white/10 flex items-center justify-between gap-4"
                        >
                          <div>
                            <span className="text-xs text-blue-400 font-bold uppercase block">
                              {item.category} • {item.date}
                            </span>
                            <h4 className="font-display font-bold text-sm text-white">
                              {item.title}
                            </h4>
                            <span className="text-xs text-slate-400">Por {item.author}</span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setEditingNews(item);
                                setIsCreatingNews(false);
                              }}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-blue-400 cursor-pointer"
                              title="Editar Notícia"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteModal({
                                  isOpen: true,
                                  title: 'Excluir Conteúdo',
                                  itemTitle: item.title,
                                  itemType: 'Notícia / Publicação',
                                  itemId: item.id,
                                  category: 'news'
                                });
                              }}
                              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 cursor-pointer"
                              title="Excluir Notícia"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: INDICADORES DE IMPACTO */}
            {activeTab === 'impacto' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    Indicadores & Métricas de Impacto
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Altere os números e descrições exibidos na seção de Impacto em tempo real.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {impactMetrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="p-5 rounded-2xl bg-[#131b2a] border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 uppercase">
                          Métrica ID: {metric.id}
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Rótulo / Título</label>
                        <input
                          type="text"
                          value={metric.label}
                          onChange={(e) => updateImpactMetric({ ...metric, label: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Prefixo (ex: +)</label>
                          <input
                            type="text"
                            value={metric.prefix || ''}
                            onChange={(e) => updateImpactMetric({ ...metric, prefix: e.target.value })}
                            className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Valor Numérico</label>
                          <input
                            type="number"
                            value={metric.value}
                            onChange={(e) => updateImpactMetric({ ...metric, value: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">Sufixo (ex: %)</label>
                          <input
                            type="text"
                            value={metric.suffix || ''}
                            onChange={(e) => updateImpactMetric({ ...metric, suffix: e.target.value })}
                            className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 mb-1">Descrição</label>
                        <input
                          type="text"
                          value={metric.description}
                          onChange={(e) => updateImpactMetric({ ...metric, description: e.target.value })}
                          className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: PILARES */}
            {activeTab === 'pilares' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    Configuração dos 3 Pilares
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Ajuste as frases, taglines e descrições da tríade ALIVE.
                  </p>
                </div>

                <div className="space-y-6">
                  {(['saude', 'educacao', 'cultura'] as PillarType[]).map((pKey) => {
                    const p = pillars[pKey];
                    return (
                      <div
                        key={pKey}
                        className="p-6 rounded-2xl bg-[#131b2a] border border-white/10 space-y-4"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-black uppercase px-3 py-1 rounded-full"
                            style={{ backgroundColor: `${p.color}25`, color: p.color }}
                          >
                            {p.name}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1">Tagline do Pilar</label>
                            <input
                              type="text"
                              value={p.tagline}
                              onChange={(e) => updatePillar(pKey, { tagline: e.target.value })}
                              className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-400 mb-1">URL da Imagem</label>
                            <input
                              type="url"
                              value={p.image}
                              onChange={(e) => updatePillar(pKey, { image: e.target.value })}
                              className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-400 mb-1">Descrição</label>
                          <textarea
                            rows={2}
                            value={p.description}
                            onChange={(e) => updatePillar(pKey, { description: e.target.value })}
                            className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-sm text-white"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 7: BACKUP & RESTAURAÇÃO */}
            {activeTab === 'backup' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    Backup, Exportação e Importação de Dados
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Mantenha cópias de segurança do conteúdo ou transfira as informações para outros computadores da equipe.
                  </p>
                </div>

                {/* Export Card */}
                <div className="p-6 rounded-2xl bg-[#131b2a] border border-white/10 space-y-3">
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-400" />
                    Exportar Backup Completo (JSON)
                  </h4>
                  <p className="text-xs text-slate-300">
                    Gera um arquivo JSON contendo todos os projetos, eventos, notícias, galeria e pilares.
                  </p>
                  <button
                    onClick={handleDownloadBackup}
                    className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Baixar Arquivo JSON</span>
                  </button>
                </div>

                {/* Import Card */}
                <div className="p-6 rounded-2xl bg-[#131b2a] border border-white/10 space-y-3">
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-400" />
                    Importar Backup JSON
                  </h4>
                  <p className="text-xs text-slate-300">
                    Cole o conteúdo de um arquivo JSON de backup para atualizar os dados do site.
                  </p>
                  <textarea
                    rows={4}
                    placeholder="Cole o código JSON aqui..."
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    className="w-full bg-[#0b0f17] border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-slate-200"
                  />
                  <button
                    onClick={handleImportBackup}
                    disabled={!jsonInput.trim()}
                    className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:opacity-40 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Importar e Aplicar</span>
                  </button>
                </div>

                {/* Reset Defaults */}
                <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-3">
                  <h4 className="font-display font-bold text-sm text-red-200 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-red-400" />
                    Restaurar Dados Originais
                  </h4>
                  <p className="text-xs text-slate-300">
                    Restaura todos os projetos, fotos e textos para a configuração padrão inicial do projeto ALIVE.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('Tem certeza que deseja restaurar todos os dados para os padrões iniciais?')) {
                        resetToDefaults();
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/40 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Restaurar Valores Padrão</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 8: HISTÓRICO & LIXEIRA */}
            {activeTab === 'historico' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                      <History className="w-5 h-5 text-emerald-400" />
                      Histórico de Itens Excluídos & Lixeira
                    </h3>
                    <p className="text-xs text-slate-400">
                      Itens excluídos permanecem salvos aqui para restauração imediata ou exclusão permanente.
                    </p>
                  </div>

                  {deletedItems.length > 0 && (
                    <button
                      onClick={clearHistoryTrash}
                      className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Esvaziar Lixeira
                    </button>
                  )}
                </div>

                {deletedItems.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl bg-[#131b2a] border border-white/10 text-slate-400">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-emerald-400/80 stroke-[1.5]" />
                    <h4 className="font-display font-bold text-base text-white">A lixeira está vazia</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Nenhum projeto, evento ou conteúdo foi excluído recentemente.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {deletedItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-[#131b2a] border border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-red-500/40 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 uppercase">
                              {item.type === 'project' ? 'Projeto' : item.type === 'event' ? 'Evento' : item.type === 'news' ? 'Notícia' : 'Galeria'}
                            </span>
                            {item.pillar && (
                              <span className="text-[10px] font-bold text-emerald-400 uppercase">
                                • {pillars[item.pillar]?.name || item.pillar}
                              </span>
                            )}
                            <span className="text-[11px] text-slate-400">
                              Excluído em {item.deletedAt}
                            </span>
                          </div>

                          <h4 className="font-display font-bold text-sm text-white">
                            {item.title}
                          </h4>
                          {item.data?.location && (
                            <p className="text-xs text-slate-400 mt-0.5">
                              {item.data.location} {item.data.date ? `• ${item.data.date}` : ''}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => restoreDeletedItem(item.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                            title="Restaurar item"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Restaurar</span>
                          </button>
                          <button
                            onClick={() => permanentlyDeleteFromHistory(item.id)}
                            className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
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

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
          isOpen={deleteModal.isOpen}
          title={deleteModal.title}
          itemTitle={deleteModal.itemTitle}
          itemType={deleteModal.itemType}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
        />
      </div>
    </AnimatePresence>
  );
};
