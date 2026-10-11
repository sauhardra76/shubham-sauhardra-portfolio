import React from 'react';
import { AndroidAppItem, CrmProjectItem } from '../config/portfolioData';
import { X, Smartphone, Database, CheckCircle2, Image as ImageIcon, Send, ExternalLink, Maximize2 } from 'lucide-react';
import { DigitalKhataScreen } from './DigitalKhataScreen';
import { PhoneRakshaScreen } from './PhoneRakshaScreen';
import { CalcOneScreen } from './CalcOneScreen';
import { AstroVedaScreen } from './AstroVedaScreen';
import { AndroidCommandPromptScreen } from './AndroidCommandPromptScreen';
import { TalentSpaceCrmScreen } from './TalentSpaceCrmScreen';
import { EduScholarCrmScreen } from './EduScholarCrmScreen';
import { RealEstateCrmScreen } from './RealEstateCrmScreen';

type ProjectData = (AndroidAppItem | CrmProjectItem) & {
  type: 'android' | 'crm';
};

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onSelectForInquiry: (projectName: string) => void;
  onEnlargeScreenshot: (title: string, src: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectForInquiry,
  onEnlargeScreenshot,
}) => {
  if (!project) return null;

  const isAndroid = project.type === 'android';
  const androidApp = isAndroid ? (project as AndroidAppItem) : null;
  const crmApp = !isAndroid ? (project as CrmProjectItem) : null;

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  const renderMobileFrameScreen = () => {
    switch (project.id) {
      case '1calcone':
        return <CalcOneScreen isEnlarged={true} />;
      case 'astroveda-ai':
        return <AstroVedaScreen isEnlarged={true} />;
      case 'digitalkhatatheme':
        return <DigitalKhataScreen isEnlarged={true} />;
      case 'phoneraksha':
        return <PhoneRakshaScreen isEnlarged={true} />;
      case 'androprompt-cli':
        return <AndroidCommandPromptScreen isEnlarged={true} />;
      default:
        return null;
    }
  };

  const isVerifiedAndroidApp = isAndroid && [
    '1calcone',
    'astroveda-ai',
    'digitalkhatatheme',
    'phoneraksha',
    'androprompt-cli',
  ].includes(project.id);

  const isVerifiedCrmApp = !isAndroid && [
    'hr-crm',
    'school-crm',
    'real-estate-crm',
  ].includes(project.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0D1222] rounded-2xl shadow-2xl border border-white/[0.1] overflow-hidden my-8 text-white">
        {/* Modal Header */}
        <div className="bg-[#090C16] text-white px-6 py-5 flex items-start justify-between gap-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              {isAndroid ? <Smartphone className="w-5 h-5" /> : <Database className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight text-white font-display">
                  {project.title}
                </h3>
                <span className="text-[11px] font-mono font-bold text-sky-400">
                  [{project.status}]
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                {isAndroid ? 'Android Application Specifications' : 'Custom Software / CRM Specifications'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Overview & Description */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              Project Overview
            </h4>
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Target Audience / Domain */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 block mb-1">
              {isAndroid ? 'Target Audience & Use Case' : 'Target Domain & Industry'}
            </span>
            <p className="text-sm text-slate-300">
              {isAndroid ? androidApp?.targetAudience : crmApp?.targetDomain}
            </p>
          </div>

          {/* Capabilities / Highlights */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              {isAndroid ? 'Verified Architectural Capabilities' : 'Planned & Verified Modules'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(isAndroid ? androidApp?.keyCapabilities : crmApp?.scopeHighlights)?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots Gallery Section */}
          <div className="pt-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
              Application Interface Captures
            </h4>

            {isVerifiedAndroidApp ? (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center gap-6">
                {/* Phone Frame */}
                <div className="w-[230px] aspect-[9/18.5] rounded-[2rem] bg-slate-900 border-[6px] border-slate-800 shadow-xl overflow-hidden relative shrink-0">
                  {renderMobileFrameScreen()}
                </div>
                <div className="space-y-3 text-left">
                  <div className="inline-block px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono font-semibold">
                    ✓ Verified Production Interface
                  </div>
                  <h5 className="text-sm font-bold text-white font-display">
                    {project.title} Interface Architecture
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Designed and built with responsive layout scaling, domain-native color schemes, intuitive touch controls, and offline-ready responsiveness.
                  </p>
                  <button
                    type="button"
                    onClick={() => onEnlargeScreenshot(`${project.title} — Verified Interface`, `${project.id}_ui`)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Fullscreen UI</span>
                  </button>
                </div>
              </div>
            ) : isVerifiedCrmApp ? (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-block px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono font-semibold">
                    ✓ Verified Enterprise CRM Workspace
                  </div>
                  <button
                    type="button"
                    onClick={() => onEnlargeScreenshot(`${project.title} — Full Workspace`, `${project.id}_ui`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Fullscreen Review</span>
                  </button>
                </div>

                {/* Desktop Window Frame */}
                <div className="rounded-xl border border-white/[0.08] bg-slate-900 overflow-hidden shadow-lg h-[240px]">
                  <div className="px-3 py-2 bg-slate-950 flex items-center gap-1.5 border-b border-slate-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] text-slate-400 font-mono ml-2">
                      {project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.cloud
                    </span>
                  </div>
                  <div className="h-[205px] overflow-hidden">
                    {project.id === 'hr-crm' ? (
                      <TalentSpaceCrmScreen />
                    ) : project.id === 'school-crm' ? (
                      <EduScholarCrmScreen />
                    ) : (
                      <RealEstateCrmScreen />
                    )}
                  </div>
                </div>
              </div>
            ) : hasScreenshots ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.screenshots.map((src, idx) => (
                  <div
                    key={idx}
                    onClick={() => onEnlargeScreenshot(`${project.title} - Capture ${idx + 1}`, src)}
                    className="aspect-[9/16] rounded-xl bg-slate-900 border border-white/[0.08] overflow-hidden cursor-pointer hover:border-sky-500 transition-all group relative"
                  >
                    <img
                      src={src}
                      alt={`${project.title} capture ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                      Click to Enlarge
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-white/[0.02] border border-dashed border-white/[0.08] text-center space-y-2">
                <ImageIcon className="w-8 h-8 text-slate-500 mx-auto" />
                <h5 className="text-sm font-semibold text-white">
                  Production Screenshots Coming Soon
                </h5>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Actual application captures will be uploaded once this project reaches its public release milestone.
                </p>
                <div className="inline-block mt-2 px-2.5 py-1 rounded bg-white/[0.05] text-[11px] font-mono text-sky-400 border border-white/[0.08]">
                  Status: {project.status}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#090C16] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono">
            Interested in adopting or customizing this solution?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectForInquiry(project.title);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inquire for {project.title}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
