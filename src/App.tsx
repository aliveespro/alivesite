import React from 'react';
import { AliveProvider } from './context/AliveContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PilaresSection } from './components/PilaresSection';
import { AboutSection } from './components/AboutSection';
import { ImpactSection } from './components/ImpactSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EventsSection } from './components/EventsSection';
import { GallerySection } from './components/GallerySection';
import { ParticipateSection } from './components/ParticipateSection';
import { NewsSection } from './components/NewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals
import { ProjectModal } from './components/ProjectModal';
import { EventRegisterModal } from './components/EventRegisterModal';
import { NewsArticleModal } from './components/NewsArticleModal';
import { LightboxModal } from './components/LightboxModal';
import { ParticipateModal } from './components/ParticipateModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { HistoryModal } from './components/HistoryModal';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <AliveProvider>
      <div className="min-h-screen bg-[#FDFCF8] text-[#1A1A1A] antialiased selection:bg-[#2D5A27] selection:text-white">
        {/* Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <PilaresSection />
          <AboutSection />
          <ImpactSection />
          <ProjectsSection />
          <EventsSection />
          <GallerySection />
          <ParticipateSection />
          <NewsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals */}
        <ProjectModal />
        <EventRegisterModal />
        <NewsArticleModal />
        <LightboxModal />
        <ParticipateModal />
        <AdminCMSModal />
        <HistoryModal />

        {/* Global Toast */}
        <Toast />
      </div>
    </AliveProvider>
  );
}
