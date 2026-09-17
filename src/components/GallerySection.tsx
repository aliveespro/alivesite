import React, { useState } from 'react';
import { useAlive } from '../context/AliveContext';
import { Image as ImageIcon, Sparkles, PlusCircle, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../types';
import { getSafeImageUrl } from '../utils/imageFallback';

export const GallerySection: React.FC = () => {
  const { gallery, setActiveLightbox, setIsCmsOpen } = useAlive();
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  const categories = [
    { id: 'todas', label: 'Todas as Fotos' },
    { id: 'oficinas', label: 'Oficinas & Aulas' },
    { id: 'eventos', label: 'Eventos & Mostras' },
    { id: 'arte', label: 'Arte Urbana & Murais' },
    { id: 'comunidade', label: 'Comunidade & Rodas' },
    { id: 'bastidores', label: 'Bastidores & Produção' },
  ];

  const filteredGallery = gallery.filter((item) =>
    selectedCategory === 'todas' ? true : item.category === selectedCategory
  );

  return (
    <section id="galeria" className="py-20 relative overflow-hidden bg-[#F7F5F0] border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/15 text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 shadow-xs">
              <ImageIcon className="w-3.5 h-3.5 text-[#FF6B35]" />
              Galeria Visual ALIVE
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] tracking-tight leading-[1.02]">
              Registros da nossa <span className="text-[#FF6B35]">energia</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-[#4A4A4A] max-w-sm text-sm leading-relaxed font-serif italic">
              Fotografias autorais de oficinas, intervenções culturais e a juventude ocupando os seus espaços.
            </p>
            <button
              onClick={() => setIsCmsOpen(true)}
              className="p-2 rounded-md bg-white hover:bg-[#FDFCF8] border border-[#1A1A1A]/15 text-[#1A1A1A] hover:text-[#FF6B35] transition-colors shrink-0 shadow-xs cursor-pointer"
              title="Adicionar fotos à galeria pelo CMS"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#1A1A1A]/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs ${
                selectedCategory === cat.id
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-white hover:bg-[#FDFCF8] text-[#1A1A1A] border border-[#1A1A1A]/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGallery.map((item, idx) => {
            const isSpanned = idx % 5 === 0;

            return (
              <div
                key={item.id || idx}
                onClick={() => setActiveLightbox(item)}
                className={`relative rounded-lg overflow-hidden border border-[#1A1A1A]/15 group cursor-pointer shadow-xs bg-[#F4EFE6] ${
                  isSpanned ? 'sm:col-span-2 lg:col-span-2 aspect-16/9' : 'aspect-4/3'
                }`}
              >
                <img
                  src={getSafeImageUrl(item.imageUrl, 'gallery')}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/85 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-200" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-white/90 backdrop-blur-sm border border-[#1A1A1A]/10 text-[#1A1A1A] shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* Hover Maximize Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-md bg-white/90 backdrop-blur-sm border border-[#1A1A1A]/10 flex items-center justify-center text-[#1A1A1A] opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Caption bottom */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-md bg-white/95 backdrop-blur-sm border border-[#1A1A1A]/10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200 shadow-xs">
                  <span className="text-[10px] text-[#FF6B35] font-bold uppercase tracking-wider block mb-0.5">
                    {item.date}
                  </span>
                  <h3 className="font-serif italic font-bold text-sm sm:text-base text-[#1A1A1A] leading-snug">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-[#4A4A4A] mt-0.5 line-clamp-1">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
