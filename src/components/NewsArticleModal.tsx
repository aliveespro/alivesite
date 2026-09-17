import React from 'react';
import { useAlive } from '../context/AliveContext';
import { X, Clock, User, Calendar, Share2, Tag, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getSafeImageUrl } from '../utils/imageFallback';

export const NewsArticleModal: React.FC = () => {
  const { activeNewsModal, setActiveNewsModal, pillars, showToast } = useAlive();

  if (!activeNewsModal) return null;

  const pillar = pillars[activeNewsModal.pilar];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link do artigo copiado para a área de transferência!', 'success');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-[#1A1A1A]/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-[#FDFCF8] border border-[#1A1A1A]/15 rounded-lg overflow-hidden shadow-xl my-auto max-h-[90vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="p-4 sm:px-7 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#F7F5F0]">
            <button
              onClick={() => setActiveNewsModal(null)}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#2D5A27] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar aos Conteúdos</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShare}
                className="p-1.5 rounded-md bg-white hover:bg-[#FDFCF8] border border-[#1A1A1A]/15 text-[#1A1A1A] hover:text-[#2D5A27] transition-colors cursor-pointer shadow-xs"
                title="Compartilhar Artigo"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveNewsModal(null)}
                className="p-1.5 rounded-md bg-white hover:bg-[#FDFCF8] border border-[#1A1A1A]/15 text-[#1A1A1A] hover:text-[#2D5A27] transition-colors cursor-pointer shadow-xs"
                aria-label="Fechar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Article Scrollable Body */}
          <div className="p-6 sm:p-9 overflow-y-auto space-y-6">
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-white border shadow-xs"
                style={{
                  color: pillar?.color,
                  borderColor: `${pillar?.color}40`
                }}
              >
                {activeNewsModal.category}
              </span>
              <span className="text-xs text-[#71717A] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {activeNewsModal.date}
              </span>
              <span className="text-xs text-[#71717A] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {activeNewsModal.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif italic font-bold text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] leading-tight">
              {activeNewsModal.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 pb-5 border-b border-[#1A1A1A]/10">
              <div className="w-9 h-9 rounded-sm bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div>
                <span className="text-xs font-bold text-[#1A1A1A] block">
                  {activeNewsModal.author}
                </span>
                <span className="text-[11px] text-[#71717A] block">
                  Projeto Social & Cultural ALIVE
                </span>
              </div>
            </div>

            {/* Cover Image */}
            <div className="rounded-md overflow-hidden aspect-16/9 border border-[#1A1A1A]/15 shadow-xs bg-[#F4EFE6]">
              <img
                src={getSafeImageUrl(activeNewsModal.imageUrl, 'news')}
                alt={activeNewsModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="max-w-none text-[#1A1A1A]/85 text-sm sm:text-base leading-relaxed space-y-4 font-serif">
              {activeNewsModal.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="pt-5 border-t border-[#1A1A1A]/10 flex flex-wrap gap-1.5">
              {activeNewsModal.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs text-[#71717A] bg-white px-2.5 py-1 rounded-sm border border-[#1A1A1A]/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
