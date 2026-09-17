import React from 'react';
import { useAlive } from '../context/AliveContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Toast: React.FC = () => {
  const { toast } = useAlive();

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-md w-full px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-md border shadow-xl bg-[#1A1A1A] text-[#FDFCF8] ${
              toast.type === 'error'
                ? 'border-[#FF6B35]/40'
                : toast.type === 'info'
                ? 'border-[#2B4C7E]/40'
                : 'border-[#2D5A27]/40'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'error' ? (
                <AlertTriangle className="w-4 h-4 text-[#FF6B35]" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 text-[#2B4C7E]" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#2D5A27]" />
              )}
            </div>
            <p className="text-xs font-medium leading-relaxed">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
