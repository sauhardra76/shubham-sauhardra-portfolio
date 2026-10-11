import React from 'react';
import { PORTFOLIO_DATA, CrmProjectItem } from '../config/portfolioData';
import { Database, FolderKanban, CheckCircle2, ChevronRight, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { TalentSpaceCrmScreen } from './TalentSpaceCrmScreen';
import { EduScholarCrmScreen } from './EduScholarCrmScreen';
import { RealEstateCrmScreen } from './RealEstateCrmScreen';
import { ScrollReveal } from './ScrollReveal';
import { Card3D } from './Card3D';

interface CrmProjectsProps {
  onOpenCrmDetails: (crm: CrmProjectItem) => void;
  onEnlargeScreenshot: (title: string, src: string) => void;
}

export const CrmProjects: React.FC<CrmProjectsProps> = ({
  onOpenCrmDetails,
  onEnlargeScreenshot,
}) => {
  const { crmProjects } = PORTFOLIO_DATA;

  const renderCrmPreview = (project: CrmProjectItem) => {
    switch (project.id) {
      case 'hr-crm':
        return (
          <div className="relative w-full h-[190px] group/crm overflow-hidden">
            <TalentSpaceCrmScreen />
            <button
              type="button"
              onClick={() => onEnlargeScreenshot('TalentSpace CRM — Enterprise HR Platform', 'talentspace_crm_ui')}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover/crm:opacity-100 transition-opacity flex items-center justify-center text-white z-20"
              title="Inspect TalentSpace CRM UI"
            >
              <div className="p-2.5 rounded-full bg-black/80 flex items-center gap-1.5 text-xs font-semibold shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Inspect Workspace</span>
              </div>
            </button>
          </div>
        );

      case 'school-crm':
        return (
          <div className="relative w-full h-[190px] group/crm overflow-hidden">
            <EduScholarCrmScreen />
            <button
              type="button"
              onClick={() => onEnlargeScreenshot('EduScholar CRM — School Administration Ecosystem', 'eduscholar_crm_ui')}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover/crm:opacity-100 transition-opacity flex items-center justify-center text-white z-20"
              title="Inspect EduScholar CRM UI"
            >
              <div className="p-2.5 rounded-full bg-black/80 flex items-center gap-1.5 text-xs font-semibold shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Inspect Workspace</span>
              </div>
            </button>
          </div>
        );

      case 'real-estate-crm':
        return (
          <div className="relative w-full h-[190px] group/crm overflow-hidden">
            <RealEstateCrmScreen />
            <button
              type="button"
              onClick={() => onEnlargeScreenshot('PropFlow CRM — Real Estate Sales & Deals Platform', 'propflow_crm_ui')}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover/crm:opacity-100 transition-opacity flex items-center justify-center text-white z-20"
              title="Inspect PropFlow CRM UI"
            >
              <div className="p-2.5 rounded-full bg-black/80 flex items-center gap-1.5 text-xs font-semibold shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Inspect Workspace</span>
              </div>
            </button>
          </div>
        );

      default:
        return (
          <div className="p-6 bg-slate-950 min-h-[190px] flex flex-col items-center justify-center text-center space-y-1.5">
            <ImageIcon className="w-6 h-6 text-slate-500 mx-auto" />
            <p className="text-xs font-medium text-slate-300">
              Interface Specifications In Preparation
            </p>
            <p className="text-[10px] text-slate-500">
              Scope and database roadmapping currently in progress.
            </p>
          </div>
        );
    }
  };

  return (
    <section id="crm-projects" className="py-24 bg-[#07080D] border-b border-white/[0.08] relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header with Reveal Animation */}
        <ScrollReveal direction="up" distance={20} className="max-w-3xl mb-14">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-2.5 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-sky-400" />
            <span>Operations &amp; Workflows</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            CRM &amp; Software Projects
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Custom enterprise administrative tools engineered to organize manpower, student admissions, fees, and operational records.
          </p>
        </ScrollReveal>

        {/* 3 CRM Projects Cards with Staggered Cascading Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {crmProjects.map((project, index) => {
            const isComingSoon = project.status === 'DETAILS COMING SOON';

            return (
              <ScrollReveal
                key={project.id}
                staggerIndex={index}
                direction="up"
                distance={24}
                className="h-full"
              >
                <Card3D
                  glowColor="cyan"
                  className="h-full bg-[#0D1222]/90 rounded-2xl border border-white/[0.07] shadow-xl hover:border-sky-500/40 transition-all p-6 sm:p-7 flex flex-col justify-between group"
                >
                  <div>
                  {/* Top Bar: Icon & Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                      <Database className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-[11px] font-mono font-bold block ${
                          isComingSoon ? 'text-amber-400' : 'text-sky-400'
                        }`}
                      >
                        [{project.status}]
                      </span>
                      {!isComingSoon && (
                        <span className="text-[10px] font-semibold text-emerald-400 font-mono">
                          ✓ UI VERIFIED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Target Domain */}
                  <div className="text-xs text-sky-400/90 font-mono mt-1">
                    {project.targetDomain}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Desktop Software Mockup Window */}
                  <div className="mt-5 rounded-xl border border-white/[0.08] bg-slate-950 overflow-hidden shadow-inner">
                    {/* Window Controls Header */}
                    <div className="px-3 py-2 bg-slate-900 flex items-center gap-1.5 border-b border-slate-800">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <span className="text-[10px] text-slate-400 font-mono ml-2 truncate">
                        {project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.cloud
                      </span>
                    </div>

                    {/* Window Content */}
                    {renderCrmPreview(project)}
                  </div>

                  {/* Scope Highlights */}
                  <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-400 block uppercase tracking-wide">
                      Planned &amp; Verified Modules:
                    </span>
                    <ul className="space-y-1.5">
                      {project.scopeHighlights.map((scope, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>{scope}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => onOpenCrmDetails(project)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-white/[0.04] hover:bg-sky-500/15 text-slate-200 hover:text-sky-300 border border-white/[0.08] hover:border-sky-400/40 transition-all cursor-pointer"
                  >
                    <FolderKanban className="w-3.5 h-3.5 text-sky-400" />
                    <span>View Specifications &amp; UI</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card3D>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
