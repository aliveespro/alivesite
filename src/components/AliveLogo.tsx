import React from 'react';
import defaultLogoImg from './Alive-logo.png';

/**
 * ============================================================================
 * 📍 LOCAL PARA VOCÊ CONFIGURAR A SUA LOGO:
 * - defaultLogoImg: imagem importada de './Alive-logo.png' (já vinculada e funcionando!)
 * - Você pode alterar para uma URL externa ou outro arquivo se desejar.
 * ============================================================================
 */
export const LOGO_IMAGE_SRC = defaultLogoImg; 

interface AliveLogoProps {
  variant?: 'full' | 'emblem' | 'horizontal' | 'compact' | 'badge';
  className?: string;
  size?: number | string;
  src?: string; // Permite sobrescrever o link da logo em instâncias específicas
  showSubtitle?: boolean;
}

export const AliveLogo: React.FC<AliveLogoProps> = ({
  variant = 'full',
  className = '',
  size,
  src = LOGO_IMAGE_SRC,
  showSubtitle = true
}) => {
  // Se o src estiver em branco ou não fornecido, usa a imagem importada
  const activeSrc = src && src.trim() !== "" ? src : defaultLogoImg;

  // 1. Variante: Compact (Usada na Navbar/Menu superior)
  if (variant === 'compact') {
    const dim = size || 60;
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={activeSrc}
          alt="Instituto Alíve"
          style={{ height: dim, width: 'auto', maxHeight: '72px' }}
          className="shrink-0 object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
        />
      </div>
    );
  }

  // 2. Variante: Emblem (Apenas o símbolo da logo)
  if (variant === 'emblem') {
    const dim = size || 160;
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src={activeSrc}
          alt="Instituto Alíve"
          style={{ width: dim, height: dim }}
          className="shrink-0 object-contain"
        />
      </div>
    );
  }

  // 3. Variante: Horizontal (Imagem à esquerda + Tipografia à direita)
  if (variant === 'horizontal') {
    const dim = size || 120;
    return (
      <div className={`flex items-center gap-5 ${className}`}>
        <img
          src={activeSrc}
          alt="Instituto Alíve"
          style={{ width: dim, height: dim }}
          className="shrink-0 object-contain"
        />
        <div className="flex flex-col">
          <span className="font-serif font-bold text-4xl sm:text-5xl tracking-tight text-[#0B4B1C] leading-none">
            Al<span className="relative inline-block">ı<span className="absolute -top-3.5 -right-0.5 text-xs font-serif text-[#16922F] rotate-12 select-none">🍃</span></span>ve
          </span>
          {showSubtitle && (
            <div className="flex items-center gap-1.5 mt-2 text-[10px] font-extrabold tracking-widest uppercase">
              <span className="w-4 h-[1.5px] bg-[#16922F]" />
              <span className="text-[#0B4B1C]">SAÚDE</span>
              <span className="text-[#E55F10] font-black">•</span>
              <span className="text-[#E55F10]">CULTURA</span>
              <span className="text-[#E89A08] font-black">•</span>
              <span className="text-[#E89A08]">EDUCAÇÃO</span>
              <span className="w-4 h-[1.5px] bg-[#E89A08]" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // 4. Variante: Full (Logo Completa para Banner Principal, Hero e Seção Sobre)
  const fullDim = size || 320;
  return (
    <div className={`flex flex-col items-center justify-center text-center w-full ${className}`}>
      <img
        src={activeSrc}
        alt="Instituto Alíve - Saúde, Cultura e Educação"
        style={{ width: fullDim, height: 'auto', maxWidth: '100%' }}
        className="shrink-0 object-contain mx-auto drop-shadow-xs transition-all duration-300"
      />
    </div>
  );
};
