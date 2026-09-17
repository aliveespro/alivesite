import React from 'react';
import { useAlive } from '../context/AliveContext';
import { Newspaper, Clock, ArrowUpRight, PlusCircle, Sparkles } from 'lucide-react';
import { NewsPost } from '../types';
import { getSafeImageUrl } from '../utils/imageFallback';

export const NewsSection: React.FC = () => {
  const { news, pillars, setActiveNewsModal, setIsCmsOpen } = useAlive();

  return (
    <section id="conteudos" className="py-20 relative overflow-hidden bg-[#F7F5F0] border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/15 text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 shadow-xs">
              <Newspaper className="w-3.5 h-3.5 text-[#2B4C7E]" />
              Conteúdos & Narrativas
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] tracking-tight leading-[1.02]">
              ALIVE em <span className="text-[#2B4C7E]">movimento</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-[#4A4A4A] max-w-sm text-sm leading-relaxed font-serif italic">
              Reflexões, novidades, editais abertos e histórias de transformação contadas pela nossa equipe e parceiros.
            </p>
            <button
              onClick={() => setIsCmsOpen(true)}
              className="p-2 rounded-md bg-white hover:bg-[#FDFCF8] border border-[#1A1A1A]/15 text-[#1A1A1A] hover:text-[#2B4C7E] transition-colors shrink-0 shadow-xs cursor-pointer"
              title="Publicar novo conteúdo no CMS"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((post) => {
            const pillar = pillars[post.pilar];

            return (
              <article
                key={post.id}
                onClick={() => setActiveNewsModal(post)}
                className="group rounded-lg bg-white border border-[#1A1A1A]/15 hover:border-[#1A1A1A] overflow-hidden shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-16/10 overflow-hidden bg-[#F4EFE6]">
                    <img
                      src={getSafeImageUrl(post.imageUrl, 'news')}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-white/95 backdrop-blur-sm border border-[#1A1A1A]/10 text-[#1A1A1A] shadow-xs"
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-[#71717A] mb-2 font-medium">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#71717A]" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif italic font-bold text-lg sm:text-xl text-[#1A1A1A] group-hover:text-[#2B4C7E] transition-colors mb-2.5 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-[#4A4A4A] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-5 pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#71717A]">
                    {post.author}
                  </span>
                  <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] group-hover:text-[#2B4C7E] transition-colors">
                    <span>Ler Artigo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
