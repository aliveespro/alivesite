import React, { useState, useEffect } from 'react';
import { useAlive } from '../context/AliveContext';
import { Sparkles, Menu, X, SlidersHorizontal, ArrowUpRight, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AliveLogo } from './AliveLogo';
import logo2AliveImg from './logo2-alive.png';

export const Navbar: React.FC = () => {
  const { setIsCmsOpen, setIsParticipateModalOpen, setParticipateDefaultType, setIsHistoryModalOpen } = useAlive();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Pilares', href: '#pilares' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Eventos', href: '#eventos' },
    { label: 'Impacto', href: '#impacto' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Artigos', href: '#conteudos' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#144B1D]/15 py-2.5 shadow-sm'
          : 'bg-[#FFFDF9]/85 backdrop-blur-sm border-b border-[#144B1D]/10 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity with authentic Alive logo */}
        <a
          href="#inicio"
          id="brand-logo-link"
          className="group flex items-center focus:outline-none py-0.5"
          aria-label="Instituto Alíve - Início"
        >
          <AliveLogo variant="compact" size={56} src={logo2AliveImg} />
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-1 bg-[#F5EFE6]/90 border border-[#144B1D]/15 px-3 py-1.5 rounded-full shadow-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#144B1D]/80 hover:text-[#144B1D] hover:bg-white rounded-full transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (CTA + CMS Admin + History) */}
        <div className="flex items-center gap-2.5">
          {/* History / Archive Button */}
          <button
            id="nav-history-toggle-btn"
            onClick={() => setIsHistoryModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#144B1D] bg-white hover:bg-[#F5EFE6] border border-[#144B1D]/20 rounded-md transition-colors cursor-pointer shadow-xs"
            title="Acessar Histórico de Eventos & Projetos"
          >
            <History className="w-3.5 h-3.5 text-[#1E6E28]" />
            <span className="hidden sm:inline">Histórico</span>
          </button>

          {/* CMS Admin Button */}
          <button
            id="cms-admin-toggle-btn"
            onClick={() => setIsCmsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#144B1D] bg-white hover:bg-[#F5EFE6] border border-[#144B1D]/20 rounded-md transition-colors cursor-pointer shadow-xs"
            title="Abrir Painel Administrativo / CMS"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#1E6E28]" />
            <span className="hidden sm:inline">CMS</span>
          </button>

          {/* Quick CTA */}
          <button
            id="nav-participate-cta-btn"
            onClick={() => {
              setParticipateDefaultType('participante');
              setIsParticipateModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#144B1D] hover:bg-[#1E6E28] rounded-md transition-colors cursor-pointer shadow-sm"
          >
            <span>Faça Parte</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A1A1A] hover:bg-[#F4EFE6] border border-[#1A1A1A]/15 rounded-md transition-colors cursor-pointer"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#FDFCF8] border-b border-[#1A1A1A]/15 px-4 pt-4 pb-6 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#F4EFE6] rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 mt-2 border-t border-[#1A1A1A]/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsHistoryModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-[#1A1A1A] bg-white hover:bg-[#F4EFE6] border border-[#1A1A1A]/15 rounded-md"
                >
                  <History className="w-4 h-4 text-[#2D5A27]" />
                  <span>Histórico de Eventos & Projetos</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCmsOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-[#1A1A1A] bg-[#F4EFE6] border border-[#1A1A1A]/15 rounded-md"
                >
                  <SlidersHorizontal className="w-4 h-4 text-[#2D5A27]" />
                  <span>Gerenciar Conteúdo no Painel CMS</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
