import React, { createContext, useContext, useState, useEffect } from 'react';
import { PillarType, PillarInfo, Project, AliveEvent, ImpactMetric, GalleryItem, NewsPost, VolunteerSubmission, DeletedItemHistory } from '../types';
import { INITIAL_PILLARS, INITIAL_PROJECTS, INITIAL_EVENTS, INITIAL_IMPACT_METRICS, INITIAL_GALLERY, INITIAL_NEWS } from '../data/initialData';
import { getSafeImageUrl } from '../utils/imageFallback';
import confetti from 'canvas-confetti';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AliveContextType {
  pillars: Record<PillarType, PillarInfo>;
  projects: Project[];
  events: AliveEvent[];
  impactMetrics: ImpactMetric[];
  gallery: GalleryItem[];
  news: NewsPost[];
  deletedItems: DeletedItemHistory[];
  
  // Modals & Navigation states
  activeProjectModal: Project | null;
  setActiveProjectModal: (p: Project | null) => void;
  activeEventModal: AliveEvent | null;
  setActiveEventModal: (e: AliveEvent | null) => void;
  activeNewsModal: NewsPost | null;
  setActiveNewsModal: (n: NewsPost | null) => void;
  activeLightbox: GalleryItem | null;
  setActiveLightbox: (g: GalleryItem | null) => void;
  
  isCmsOpen: boolean;
  setIsCmsOpen: (open: boolean) => void;
  isHistoryModalOpen: boolean;
  setIsHistoryModalOpen: (open: boolean) => void;
  isParticipateModalOpen: boolean;
  setIsParticipateModalOpen: (open: boolean) => void;
  participateDefaultType: 'participante' | 'voluntario' | 'parceiro' | 'doador';
  setParticipateDefaultType: (t: 'participante' | 'voluntario' | 'parceiro' | 'doador') => void;
  
  // Selected Pillar filter across sections
  selectedPillarFilter: PillarType | 'todos';
  setSelectedPillarFilter: (filter: PillarType | 'todos') => void;
  
  // Toast notifications
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // CRUD Actions
  saveProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  saveEvent: (event: AliveEvent) => void;
  deleteEvent: (id: string) => void;
  saveGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  saveNewsPost: (post: NewsPost) => void;
  deleteNewsPost: (id: string) => void;
  updateImpactMetric: (metric: ImpactMetric) => void;
  updatePillar: (id: PillarType, data: Partial<PillarInfo>) => void;
  
  // History & Deleted items restoration
  restoreDeletedItem: (historyId: string) => void;
  permanentlyDeleteFromHistory: (historyId: string) => void;
  clearHistoryTrash: () => void;

  // Interactive submissions
  enrollInEvent: (eventId: string, details: { name: string; email: string; phone: string }) => boolean;
  submitParticipation: (submission: Omit<VolunteerSubmission, 'id' | 'createdAt'>) => void;
  submitContact: (contact: { name: string; email: string; subject: string; message: string }) => void;
  
  // Admin utilities
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'alive_portal_data_v1';

const AliveContext = createContext<AliveContextType | undefined>(undefined);

export const AliveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pillars, setPillars] = useState<Record<PillarType, PillarInfo>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_pillars`);
    const parsed = saved ? JSON.parse(saved) : INITIAL_PILLARS;
    if (parsed) {
      Object.keys(parsed).forEach((k) => {
        const key = k as PillarType;
        if (parsed[key]) {
          parsed[key].image = getSafeImageUrl(parsed[key].image, 'pillar');
        }
      });
    }
    return parsed;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
    const list: Project[] = saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    return list.map((p) => ({
      ...p,
      image: getSafeImageUrl(p.image, 'project')
    }));
  });

  const [events, setEvents] = useState<AliveEvent[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
    const list: AliveEvent[] = saved ? JSON.parse(saved) : INITIAL_EVENTS;
    return list.map((e) => ({
      ...e,
      image: getSafeImageUrl(e.image, 'event')
    }));
  });

  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_metrics`);
    return saved ? JSON.parse(saved) : INITIAL_IMPACT_METRICS;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_gallery`);
    const list: GalleryItem[] = saved ? JSON.parse(saved) : INITIAL_GALLERY;
    return list.map((g) => ({
      ...g,
      imageUrl: getSafeImageUrl(g.imageUrl, 'gallery')
    }));
  });

  const [news, setNews] = useState<NewsPost[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_news`);
    const list: NewsPost[] = saved ? JSON.parse(saved) : INITIAL_NEWS;
    return list.map((n) => ({
      ...n,
      imageUrl: getSafeImageUrl(n.imageUrl, 'news')
    }));
  });

  const [deletedItems, setDeletedItems] = useState<DeletedItemHistory[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_deleted_items`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [activeEventModal, setActiveEventModal] = useState<AliveEvent | null>(null);
  const [activeNewsModal, setActiveNewsModal] = useState<NewsPost | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isParticipateModalOpen, setIsParticipateModalOpen] = useState<boolean>(false);
  const [participateDefaultType, setParticipateDefaultType] = useState<'participante' | 'voluntario' | 'parceiro' | 'doador'>('participante');
  const [selectedPillarFilter, setSelectedPillarFilter] = useState<PillarType | 'todos'>('todos');
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_pillars`, JSON.stringify(pillars));
  }, [pillars]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_metrics`, JSON.stringify(impactMetrics));
  }, [impactMetrics]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_news`, JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_deleted_items`, JSON.stringify(deletedItems));
  }, [deletedItems]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f43f5e', '#f59e0b']
      });
    } catch {
      // safe fallback
    }
  };

  // CRUD Implementations with History/Trash Preservation
  const saveProject = (project: Project) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === project.id);
      if (exists) {
        return prev.map((p) => (p.id === project.id ? project : p));
      }
      return [project, ...prev];
    });
    showToast(`Projeto "${project.title}" salvo com sucesso!`, 'success');
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (target) {
      const historyEntry: DeletedItemHistory = {
        id: `del-proj-${Date.now()}`,
        originalId: target.id,
        type: 'project',
        title: target.title,
        deletedAt: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        pillar: target.pilar,
        data: target
      };
      setDeletedItems((prev) => [historyEntry, ...prev]);
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Projeto removido e arquivado no histórico com sucesso.', 'info');
  };

  const saveEvent = (event: AliveEvent) => {
    setEvents((prev) => {
      const exists = prev.some((e) => e.id === event.id);
      if (exists) {
        return prev.map((e) => (e.id === event.id ? event : e));
      }
      return [event, ...prev];
    });
    showToast(`Evento "${event.title}" salvo com sucesso!`, 'success');
  };

  const deleteEvent = (id: string) => {
    const target = events.find((e) => e.id === id);
    if (target) {
      const historyEntry: DeletedItemHistory = {
        id: `del-evt-${Date.now()}`,
        originalId: target.id,
        type: 'event',
        title: target.title,
        deletedAt: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        pillar: target.pilar,
        data: target
      };
      setDeletedItems((prev) => [historyEntry, ...prev]);
    }
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Evento removido e preservado no histórico.', 'info');
  };

  const saveGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => {
      const exists = prev.some((g) => g.id === item.id);
      if (exists) {
        return prev.map((g) => (g.id === item.id ? item : g));
      }
      return [item, ...prev];
    });
    showToast('Foto da galeria atualizada!', 'success');
  };

  const deleteGalleryItem = (id: string) => {
    const target = gallery.find((g) => g.id === id);
    if (target) {
      const historyEntry: DeletedItemHistory = {
        id: `del-gal-${Date.now()}`,
        originalId: target.id,
        type: 'gallery',
        title: target.title,
        deletedAt: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        pillar: target.pilar,
        data: target
      };
      setDeletedItems((prev) => [historyEntry, ...prev]);
    }
    setGallery((prev) => prev.filter((g) => g.id !== id));
    showToast('Item da galeria removido e salvo na lixeira.', 'info');
  };

  const saveNewsPost = (post: NewsPost) => {
    setNews((prev) => {
      const exists = prev.some((n) => n.id === post.id);
      if (exists) {
        return prev.map((n) => (n.id === post.id ? post : n));
      }
      return [post, ...prev];
    });
    showToast(`Publicação "${post.title}" salva!`, 'success');
  };

  const deleteNewsPost = (id: string) => {
    const target = news.find((n) => n.id === id);
    if (target) {
      const historyEntry: DeletedItemHistory = {
        id: `del-news-${Date.now()}`,
        originalId: target.id,
        type: 'news',
        title: target.title,
        deletedAt: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        pillar: target.pilar,
        data: target
      };
      setDeletedItems((prev) => [historyEntry, ...prev]);
    }
    setNews((prev) => prev.filter((n) => n.id !== id));
    showToast('Publicação removida e salva no histórico.', 'info');
  };

  // Restoration and Permanent Deletion
  const restoreDeletedItem = (historyId: string) => {
    const item = deletedItems.find((d) => d.id === historyId);
    if (!item) return;

    if (item.type === 'project' && item.data) {
      setProjects((prev) => [item.data, ...prev.filter((p) => p.id !== item.data.id)]);
      showToast(`Projeto "${item.title}" restaurado com sucesso!`, 'success');
    } else if (item.type === 'event' && item.data) {
      setEvents((prev) => [item.data, ...prev.filter((e) => e.id !== item.data.id)]);
      showToast(`Evento "${item.title}" restaurado com sucesso!`, 'success');
    } else if (item.type === 'news' && item.data) {
      setNews((prev) => [item.data, ...prev.filter((n) => n.id !== item.data.id)]);
      showToast(`Notícia "${item.title}" restaurada!`, 'success');
    } else if (item.type === 'gallery' && item.data) {
      setGallery((prev) => [item.data, ...prev.filter((g) => g.id !== item.data.id)]);
      showToast(`Foto "${item.title}" restaurada!`, 'success');
    }

    setDeletedItems((prev) => prev.filter((d) => d.id !== historyId));
    triggerConfetti();
  };

  const permanentlyDeleteFromHistory = (historyId: string) => {
    setDeletedItems((prev) => prev.filter((d) => d.id !== historyId));
    showToast('Item removido permanentemente do histórico.', 'info');
  };

  const clearHistoryTrash = () => {
    setDeletedItems([]);
    showToast('Lixeira esvaziada com sucesso.', 'info');
  };

  const updateImpactMetric = (metric: ImpactMetric) => {
    setImpactMetrics((prev) => prev.map((m) => (m.id === metric.id ? metric : m)));
    showToast('Indicador de impacto atualizado!', 'success');
  };

  const updatePillar = (id: PillarType, data: Partial<PillarInfo>) => {
    setPillars((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...data }
    }));
    showToast(`Pilar ${pillars[id].name} atualizado!`, 'success');
  };

  const enrollInEvent = (eventId: string, details: { name: string; email: string; phone: string }): boolean => {
    const targetEvent = events.find((e) => e.id === eventId);
    if (!targetEvent) return false;

    if (targetEvent.enrolledCount >= targetEvent.vacancies) {
      showToast('Desculpe, as vagas para este evento já foram preenchidas!', 'error');
      return false;
    }

    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const nextCount = e.enrolledCount + 1;
          return {
            ...e,
            enrolledCount: nextCount,
            status: nextCount >= e.vacancies ? 'closed' : e.status
          };
        }
        return e;
      })
    );

    triggerConfetti();
    showToast(`🎉 Inscrição confirmada para ${details.name}! Detalhes enviados para ${details.email}.`, 'success');
    return true;
  };

  const submitParticipation = (submission: Omit<VolunteerSubmission, 'id' | 'createdAt'>) => {
    triggerConfetti();
    showToast(`🎉 Obrigado, ${submission.name}! Sua solicitação como ${submission.type} foi recebida pela equipe ALIVE.`, 'success');
  };

  const submitContact = (contact: { name: string; email: string; subject: string; message: string }) => {
    showToast(`Mensagem enviada com sucesso! Em breve a equipe ALIVE entrará em contato com ${contact.name}.`, 'success');
  };

  const resetToDefaults = () => {
    setPillars(INITIAL_PILLARS);
    setProjects(INITIAL_PROJECTS);
    setEvents(INITIAL_EVENTS);
    setImpactMetrics(INITIAL_IMPACT_METRICS);
    setGallery(INITIAL_GALLERY);
    setNews(INITIAL_NEWS);
    setDeletedItems([]);
    localStorage.removeItem(`${STORAGE_KEY}_pillars`);
    localStorage.removeItem(`${STORAGE_KEY}_projects`);
    localStorage.removeItem(`${STORAGE_KEY}_events`);
    localStorage.removeItem(`${STORAGE_KEY}_metrics`);
    localStorage.removeItem(`${STORAGE_KEY}_gallery`);
    localStorage.removeItem(`${STORAGE_KEY}_news`);
    localStorage.removeItem(`${STORAGE_KEY}_deleted_items`);
    showToast('Dados restaurados para os valores padrão do ALIVE.', 'info');
  };

  const exportDataJson = () => {
    const bundle = {
      pillars,
      projects,
      events,
      impactMetrics,
      gallery,
      news,
      deletedItems,
      exportedAt: new Date().toISOString(),
      version: '1.1'
    };
    return JSON.stringify(bundle, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.pillars) setPillars(data.pillars);
      if (data.projects && Array.isArray(data.projects)) setProjects(data.projects);
      if (data.events && Array.isArray(data.events)) setEvents(data.events);
      if (data.impactMetrics && Array.isArray(data.impactMetrics)) setImpactMetrics(data.impactMetrics);
      if (data.gallery && Array.isArray(data.gallery)) setGallery(data.gallery);
      if (data.news && Array.isArray(data.news)) setNews(data.news);
      if (data.deletedItems && Array.isArray(data.deletedItems)) setDeletedItems(data.deletedItems);
      showToast('Dados importados com sucesso para o ALIVE!', 'success');
      return true;
    } catch {
      showToast('Erro ao importar arquivo JSON. Verifique o formato.', 'error');
      return false;
    }
  };

  return (
    <AliveContext.Provider
      value={{
        pillars,
        projects,
        events,
        impactMetrics,
        gallery,
        news,
        deletedItems,
        activeProjectModal,
        setActiveProjectModal,
        activeEventModal,
        setActiveEventModal,
        activeNewsModal,
        setActiveNewsModal,
        activeLightbox,
        setActiveLightbox,
        isCmsOpen,
        setIsCmsOpen,
        isHistoryModalOpen,
        setIsHistoryModalOpen,
        isParticipateModalOpen,
        setIsParticipateModalOpen,
        participateDefaultType,
        setParticipateDefaultType,
        selectedPillarFilter,
        setSelectedPillarFilter,
        toast,
        showToast,
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
        restoreDeletedItem,
        permanentlyDeleteFromHistory,
        clearHistoryTrash,
        enrollInEvent,
        submitParticipation,
        submitContact,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </AliveContext.Provider>
  );
};

export const useAlive = () => {
  const context = useContext(AliveContext);
  if (!context) {
    throw new Error('useAlive must be used within an AliveProvider');
  }
  return context;
};

