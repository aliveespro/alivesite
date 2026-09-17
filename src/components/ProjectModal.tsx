import React from 'react';
import { useAlive } from '../context/AliveContext';
import { X, Calendar, MapPin, Users, Award, Tag, ArrowRight, HeartPulse, BookOpen, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getSafeImageUrl } from '../utils/imageFallback';

export const ProjectModal: React.FC = () => {
  const { activeProjectModal, setActiveProjectModal, pillars, setIsParticipateModalOpen, setParticipateDefaultType } = useAlive();

  if (!activeProjectModal) return null;

  const pillar = pillars[activeProjectModal.pilar];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-[#1A1A1A]/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-[#FDFCF8] border border-[#1A1A1A]/15 rounded-lg overflow-hidden shadow-xl my-auto"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveProjectModal(null)}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-md bg-white border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer shadow-xs"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Hero Banner */}
          <div className="relative aspect-16/9 sm:aspect-21/9 max-h-[300px] overflow-hidden bg-[#F4EFE6]">
            <img
              src={getSafeImageUrl(activeProjectModal.image, 'project')}
              alt={activeProjectModal.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-xs"
              >
                Pilar {pillar.name}
              </span>
              <span className="text-[10px] font-semibold text-white/90 bg-[#1A1A1A]/70 px-2 py-0.5 rounded-sm border border-white/10">
                {activeProjectModal.year}
              </span>
              <span className="text-[10px] font-semibold text-white/90 bg-[#1A1A1A]/70 px-2 py-0.5 rounded-sm border border-white/10">
                {activeProjectModal.location}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[55vh] overflow-y-auto">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#1A1A1A] mb-3 leading-tight">
                {activeProjectModal.title}
              </h2>
              <p className="text-[#4A4A4A] text-sm sm:text-base leading-relaxed">
                {activeProjectModal.description}
              </p>
            </div>

            {/* Impact Highlight Box */}
            <div
              className="p-5 rounded-lg border flex items-start gap-3.5 bg-white shadow-xs"
              style={{
                borderColor: `${pillar.color}30`
              }}
            >
              <Award className="w-5 h-5 shrink-0 mt-0.5" style={{ color: pillar.color }} />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: pillar.color }}>
                  Impacto & Alcance
                </span>
                <p className="text-sm font-serif italic font-bold text-[#1A1A1A]">
                  {activeProjectModal.impactHighlight}
                </p>
                <span className="text-xs text-[#71717A] mt-1 block">
                  Beneficiários diretos: <strong className="text-[#1A1A1A]">{activeProjectModal.beneficiaries}</strong>
                </span>
              </div>
            </div>

            {/* Extra Gallery Photos if present */}
            {activeProjectModal.gallery && activeProjectModal.gallery.filter((g) => g && g.trim().length > 0).length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] mb-2.5">
                  Registros Visuais
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {activeProjectModal.gallery.filter((g) => g && g.trim().length > 0).map((img, idx) => (
                    <div key={idx} className="rounded-md overflow-hidden aspect-4/3 border border-[#1A1A1A]/10 bg-[#F4EFE6]">
                      <img src={getSafeImageUrl(img, 'gallery')} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {activeProjectModal.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs text-[#71717A] bg-white px-2.5 py-1 rounded-sm border border-[#1A1A1A]/10"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-5 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#71717A] font-serif italic">
                Gostaria de levar este projeto para sua comunidade ou escola?
              </span>
              <button
                onClick={() => {
                  setActiveProjectModal(null);
                  setParticipateDefaultType('parceiro');
                  setIsParticipateModalOpen(true);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#1A1A1A] hover:bg-[#2D5A27] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Quero Apoiar / Participar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
