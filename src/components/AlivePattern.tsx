import React from 'react';
import { motion } from 'motion/react';

interface AlivePatternProps {
  className?: string;
  repeatCount?: number;
  height?: number | string;
  animated?: boolean;
}

export const AlivePattern: React.FC<AlivePatternProps> = ({
  className = '',
  repeatCount = 22,
  height = '100%',
  animated = true
}) => {
  // Generate items with ample count to ensure smooth infinite back-and-forth movement without clipping
  const count = Array.from({ length: Math.max(repeatCount, 22) }, (_, i) => i);

  return (
    <div
      className={`relative w-full overflow-hidden flex flex-col select-none ${className}`}
      style={{ height }}
    >
      {/* ROW 1: Verde (Desliza para a ESQUERDA e volta em looping) */}
      <div className="flex-1 w-full bg-[#C8E5CC] flex items-center overflow-hidden border-b border-[#144B1D]/10 relative">
        <motion.div
          className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0 -ml-14 sm:-ml-18"
          animate={
            animated
              ? {
                  x: [24, -64]
                }
              : {}
          }
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 4.5,
            ease: 'easeInOut'
          }}
        >
          {count.map((i) => (
            <div
              key={`r1-${i}`}
              className="w-4 sm:w-6 md:w-8 h-8 sm:h-12 md:h-14 rounded-r-full shrink-0 shadow-2xs"
              style={{
                backgroundColor: i % 2 === 0 ? '#144B1D' : '#1E6E28'
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* ROW 2: Laranja (Desliza para a DIREITA e volta em looping) */}
      <div className="flex-1 w-full bg-[#FEE3C6] flex items-center overflow-hidden border-b border-[#E5531B]/10 relative">
        <motion.div
          className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0 -ml-14 sm:-ml-18"
          animate={
            animated
              ? {
                  x: [-64, 24]
                }
              : {}
          }
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 4.5,
            ease: 'easeInOut'
          }}
        >
          {count.map((i) => (
            <div
              key={`r2-${i}`}
              className="w-4 sm:w-6 md:w-8 h-8 sm:h-12 md:h-14 rounded-r-full shrink-0 shadow-2xs"
              style={{
                backgroundColor: i % 2 === 0 ? '#E5531B' : '#F26D21'
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* ROW 3: Verde (Desliza para a ESQUERDA e volta em looping) */}
      <div className="flex-1 w-full bg-[#C8E5CC] flex items-center overflow-hidden border-b border-[#144B1D]/10 relative">
        <motion.div
          className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0 -ml-14 sm:-ml-18"
          animate={
            animated
              ? {
                  x: [24, -64]
                }
              : {}
          }
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 4.5,
            ease: 'easeInOut'
          }}
        >
          {count.map((i) => (
            <div
              key={`r3-${i}`}
              className="w-4 sm:w-6 md:w-8 h-8 sm:h-12 md:h-14 rounded-r-full shrink-0 shadow-2xs"
              style={{
                backgroundColor: i % 2 === 0 ? '#144B1D' : '#1E6E28'
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* ROW 4: Amarela (Desliza para a DIREITA e volta em looping) */}
      <div className="flex-1 w-full bg-[#FEE3C6] flex items-center overflow-hidden relative">
        <motion.div
          className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0 -ml-14 sm:-ml-18"
          animate={
            animated
              ? {
                  x: [-64, 24]
                }
              : {}
          }
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 4.5,
            ease: 'easeInOut'
          }}
        >
          {count.map((i) => (
            <div
              key={`r4-${i}`}
              className="w-4 sm:w-6 md:w-8 h-8 sm:h-12 md:h-14 rounded-r-full shrink-0 shadow-2xs"
              style={{
                backgroundColor: i % 2 === 0 ? '#E58E10' : '#F5A623'
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
