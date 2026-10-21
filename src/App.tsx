/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AnalysisView } from './views/AnalysisView';
import { CoursesView } from './views/CoursesView';
import { CareersView } from './views/CareersView';
import { DashboardView } from './views/DashboardView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AuthModal } from './views/AuthModal';
import { ProjectSourceModal } from './views/ProjectSourceModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [preselectedCareer, setPreselectedCareer] = useState<string>('Data Analyst');

  const handleOpenAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSelectCareerForAnalysis = (careerTitle: string) => {
    setPreselectedCareer(careerTitle);
    setCurrentTab('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePerformNewAnalysis = (careerTitle?: string) => {
    if (careerTitle) {
      setPreselectedCareer(careerTitle);
    }
    setCurrentTab('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50/60 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
        {/* Navigation Bar */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          openAuthModal={handleOpenAuthModal}
          openProjectModal={() => setIsProjectModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {currentTab === 'home' && (
            <HomeView
              setCurrentTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              openAuthModal={handleOpenAuthModal}
              openProjectModal={() => setIsProjectModalOpen(true)}
              onSelectCareerForAnalysis={handleSelectCareerForAnalysis}
            />
          )}

          {currentTab === 'analysis' && (
            <AnalysisView
              initialCareerTitle={preselectedCareer}
              setCurrentTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              openAuthModal={handleOpenAuthModal}
            />
          )}

          {currentTab === 'courses' && <CoursesView />}

          {currentTab === 'careers' && (
            <CareersView onSelectRoleForAnalysis={handleSelectCareerForAnalysis} />
          )}

          {currentTab === 'dashboard' && (
            <DashboardView
              setCurrentTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              openAuthModal={handleOpenAuthModal}
              onPerformNewAnalysis={handlePerformNewAnalysis}
              openProjectModal={() => setIsProjectModalOpen(true)}
            />
          )}

          {currentTab === 'about' && <AboutView />}

          {currentTab === 'contact' && <ContactView />}
        </main>

        {/* Academic Project Footer */}
        <Footer
          setCurrentTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          openProjectModal={() => setIsProjectModalOpen(true)}
        />

        {/* Registration / Login Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          initialMode={authModalMode}
          onClose={() => setIsAuthModalOpen(false)}
        />

        {/* Python Flask Source Code & Download ZIP Modal */}
        <ProjectSourceModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
