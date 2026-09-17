import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  itemTitle: string;
  itemType: string;
  onConfirm: () => void;
  onCancel: () => void;
  warningNote?: string;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title,
  itemTitle,
  itemType,
  onConfirm,
  onCancel,
  warningNote = 'O item será movido para o Histórico / Lixeira do ALIVE, onde poderá ser visualizado ou restaurado.'
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-md bg-[#131b2a] border border-white/15 rounded-2xl p-6 shadow-2xl text-white"
        >
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header icon */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-11 h-11 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">
                {title || 'Confirmar Exclusão'}
              </h3>
              <span className="text-xs text-red-400 font-medium">
                Ação em {itemType}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-3 mb-6">
            <p className="text-sm text-slate-200">
              Tem certeza de que deseja remover <strong className="text-white font-semibold">"{itemTitle}"</strong>?
            </p>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <span>{warningNote}</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm();
              }}
              className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Trash2 className="w-4 h-4" />
              <span>Excluir {itemType}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
