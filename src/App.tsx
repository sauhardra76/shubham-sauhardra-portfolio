/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { AndroidApps } from './components/AndroidApps';
import { CrmProjects } from './components/CrmProjects';
import { LiveWebsites } from './components/LiveWebsites';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ScreenshotLightbox } from './components/ScreenshotLightbox';
import { PdfModal } from './components/PdfModal';
import { CyberBackground3D } from './components/CyberBackground3D';
import { AndroidAppItem, CrmProjectItem } from './config/portfolioData';

type SelectedProject =
  | (AndroidAppItem & { type: 'android' })
  | (CrmProjectItem & { type: 'crm' });

export default function App() {
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);
  const [enlargedScreenshot, setEnlargedScreenshot] = useState<{
    title: string;
    src: string;
  } | null>(null);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState('Website Development');

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setSelectedServiceForInquiry(serviceTitle);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAppDetails = (app: AndroidAppItem) => {
    setSelectedProject({ ...app, type: 'android' });
  };

  const handleOpenCrmDetails = (crm: CrmProjectItem) => {
    setSelectedProject({ ...crm, type: 'crm' });
  };

  const handleEnlargeScreenshot = (title: string, src: string) => {
    setEnlargedScreenshot({ title, src });
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white relative overflow-x-hidden">
      {/* Interactive 3D WebGL Background Canvas */}
      <CyberBackground3D />

      {/* Ambient Atmospheric Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-sky-600/[0.04] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-600/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/3 w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Me */}
        <About />

        {/* 3. My Services */}
        <Services onSelectServiceForInquiry={handleSelectServiceForInquiry} />

        {/* 4. My Android Applications */}
        <AndroidApps
          onOpenAppDetails={handleOpenAppDetails}
          onEnlargeScreenshot={handleEnlargeScreenshot}
        />

        {/* 5. CRM & Software Projects */}
        <CrmProjects
          onOpenCrmDetails={handleOpenCrmDetails}
          onEnlargeScreenshot={handleEnlargeScreenshot}
        />

        {/* 6. Live Website Contributions */}
        <LiveWebsites />

        {/* 7. Working Process */}
        <Process />

        {/* 8. Contact Section & Project Inquiry Form */}
        <Contact
          selectedService={selectedServiceForInquiry}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectForInquiry={handleSelectServiceForInquiry}
        onEnlargeScreenshot={handleEnlargeScreenshot}
      />

      <ScreenshotLightbox
        isOpen={Boolean(enlargedScreenshot)}
        title={enlargedScreenshot?.title || ''}
        imageSrc={enlargedScreenshot?.src || ''}
        onClose={() => setEnlargedScreenshot(null)}
      />

      <PdfModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
      />
    </div>
  );
}
