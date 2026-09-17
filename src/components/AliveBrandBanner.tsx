import React from 'react';
import { AliveLogo } from './AliveLogo';
import { AlivePattern } from './AlivePattern';

interface AliveBrandBannerProps {
  className?: string;
  showSlogan?: boolean;
}

export const AliveBrandBanner: React.FC<AliveBrandBannerProps> = ({
  className = '',
  showSlogan = true
}) => {
  return (
    <div className={`w-full max-w-5xl mx-auto rounded-xl overflow-hidden border-2 border-[#144B1D] bg-[#FFFDF9] shadow-md ${className}`}>
      {/* Upper split section: Logo on the Left + Pattern on the Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[260px] sm:min-h-[300px]">
        {/* Left: Logo Card Container */}
        <div className="md:col-span-5 p-4 sm:p-6 flex flex-col items-center justify-center bg-[#FFFDF9] border-b-2 md:border-b-0 md:border-r-2 border-[#144B1D] relative">
          {/* Subtle inner framing accent */}
          <div className="w-full h-full flex flex-col items-center justify-center p-1 rounded-lg">
            <AliveLogo variant="full" size={320} showSubtitle={true} />
          </div>
        </div>

        {/* Right: Modern Folk Geometric Pattern */}
        <div className="md:col-span-7 relative h-48 md:h-auto overflow-hidden">
          <AlivePattern height="100%" repeatCount={24} animated={true} />
        </div>
      </div>

      {/* Slogan Sub-bar (Matching "Live every moment" in the reference image) */}
      {showSlogan && (
        <div className="px-6 py-3.5 bg-[#FFFDF9] border-t-2 border-[#144B1D] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-lg sm:text-xl font-bold text-[#144B1D]">
              “Live every moment”
            </span>
            <span className="text-xs text-[#144B1D]/40 hidden sm:inline">•</span>
            <span className="text-xs sm:text-sm font-serif italic text-[#E5531B] font-semibold">
              Cultive saber, transforme viver.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#1E6E28]/10 text-[#1E6E28] border border-[#1E6E28]/20">
              Saúde
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#E5531B]/10 text-[#E5531B] border border-[#E5531B]/20">
              Cultura
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#F09E12]/10 text-[#F09E12] border border-[#F09E12]/20">
              Educação
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
