import React from 'react';
import { useAlive } from '../context/AliveContext';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getSafeImageUrl } from '../utils/imageFallback';

export const LightboxModal: React.FC = () => {
  const { activeLightbox, setActiveLightbox, gallery, pillars } = useAlive();

  if (!activeLightbox) return null;

  const currentIndex = gallery.findIndex((g) => g.id === activeLightbox.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + gallery.length) % gallery.length;
    setActiveLightbox(gallery[prevIdx]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % gallery.length;
    setActiveLightbox(gallery[nextIdx]);
  };

  const pillar = pillars[activeLightbox.pilar];

  return (
    <AnimatePresence>
      <div
        onClick={() => setActiveLightbox(null)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#1A1A1A]/90 backdrop-blur-xs"
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveLightbox(null)}
          className="absolute top-6 right-6 z-50 w-9 h-9 rounded-md bg-white border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Prev / Next Nav */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-md bg-white border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              aria-label="Foto Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-md bg-white border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
              aria-label="Próxima Foto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Modal Content */}
        <motion.div
          key={activeLightbox.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full flex flex-col items-center"
        >
          <div className="rounded-md overflow-hidden max-h-[70vh] border border-[#1A1A1A]/30 shadow-2xl bg-black">
            <img
              src={getSafeImageUrl(activeLightbox.imageUrl, 'gallery')}
              alt={activeLightbox.title}
              className="max-h-[70vh] w-auto max-w-full object-contain"
            />
          </div>

          <div className="mt-4 p-4 rounded-md bg-[#FDFCF8] border border-[#1A1A1A]/15 text-center max-w-lg w-full shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-white border shadow-xs"
                style={{
                  color: pillar?.color,
                  borderColor: `${pillar?.color}40`
                }}
              >
                {activeLightbox.category}
              </span>
              <span className="text-xs text-[#71717A]">
                {activeLightbox.date}
              </span>
            </div>
            <h3 className="font-display font-bold text-base text-[#1A1A1A]">
              {activeLightbox.title}
            </h3>
            {activeLightbox.caption && (
              <p className="text-xs font-serif italic text-[#4A4A4A] mt-1">
                {activeLightbox.caption}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
