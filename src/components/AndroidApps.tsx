import React, { useState } from 'react';
import { PORTFOLIO_DATA, AndroidAppItem } from '../config/portfolioData';
import { Smartphone, Info, Image as ImageIcon, ChevronRight, Maximize2, CheckCircle2, Terminal } from 'lucide-react';
import { DigitalKhataScreen } from './DigitalKhataScreen';
import { PhoneRakshaScreen } from './PhoneRakshaScreen';
import { CalcOneScreen } from './CalcOneScreen';
import { AstroVedaScreen } from './AstroVedaScreen';
import { AndroidCommandPromptScreen } from './AndroidCommandPromptScreen';
import { ScrollReveal } from './ScrollReveal';
import { Card3D } from './Card3D';

interface AndroidAppsProps {
  onOpenAppDetails: (app: AndroidAppItem) => void;
  onEnlargeScreenshot: (title: string, src: string) => void;
}

export const AndroidApps: React.FC<AndroidAppsProps> = ({
  onOpenAppDetails,
  onEnlargeScreenshot,
}) => {
  const { androidApps } = PORTFOLIO_DATA;

  // Helper to render verified mobile screen inside the phone frame
  const renderAppScreen = (app: AndroidAppItem) => {
    switch (app.id) {
      case '1calcone':
        return (
          <div className="relative w-full h-full group/screen">
            <CalcOneScreen />
            <button
              type="button"
              onClick={() => onEnlargeScreenshot('1CalcOne — Precision Calculations Suite', 'calcone_dashboard_ui')}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover/screen:opacity-100 transition-opacity flex items-center justify-center text-white z-20"
              title="Inspect 1CalcOne UI"
            >
              <div className="p-2.5 rounded-full bg-black/80 flex items-center gap-1.5 text-xs font-semibold shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Inspect UI</span>
              </div>
            </button>
          </div>
        );

      case 'astroveda-ai':
        return (
          <div className="relative w-full h-full group/screen">
            <AstroVedaScreen />
            <button
              type="button"
              onClick={() => onEnlargeScreenshot('AstroVeda AI — 3D Planetary Orbit & Kundli', 'astroveda_kundli_ui')}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover/screen:opacity-100 transition-opacity flex items-center justify-center text-white z-20"
              title="Inspect AstroVeda AI UI"
            >
              <div className="p-2.5 rounded-full bg-black/80 flex items-center gap-1.5 text-xs font-semibold shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Inspect UI</span>
              </div>
            </button>
          </div>
        );

      case 'digitalkhatatheme':
        return (
          <div className="relative w-full h-full group/screen">
            <DigitalKhataScreen />
            <button
              type="button"
              onClick={() => onEnlargeScreenshot('DigitalKhata — Mobile Application Interface', 'digital_khata_live_ui')}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover/screen:opacity-100 transition-opacity flex items-center justify-center text-white z-20"
              title="Inspect DigitalKhata UI"
            >
              <div className="p-2.5 rounded-full bg-black/80 flex items-center gap-1.5 text-xs font-semibold shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Inspect UI</span>
              </div>
            </button>
          </div>
        );

      case 'phoneraksha':
        return (
          <div className="relative w-full h-full group/screen">
            <PhoneRakshaScreen />
            <button
              type="button"
              onClick={() => onEnlargeScreenshot('PhoneRaksha — Smart Anti-Theft System', 'phoneraksha_armed_ui')}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover/screen:opacity-100 transition-opacity flex items-center justify-center text-white z-20"
              title="Inspect PhoneRaksha UI"
            >
              <div className="p-2.5 rounded-full bg-black/80 flex items-center gap-1.5 text-xs font-semibold shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Inspect UI</span>
              </div>
            </button>
          </div>
        );

      case 'androprompt-cli':
        return (
          <div className="relative w-full h-full group/screen">
            <AndroidCommandPromptScreen />
            <button
              type="button"
              onClick={() => onEnlargeScreenshot('AndroPrompt — Android Command Prompt UI & Terminal Emulator', 'androprompt_terminal_ui')}
              className="absolute top-2 right-2 bg-black/80 hover:bg-black text-white px-2 py-1 rounded-md border border-white/20 opacity-0 group-hover/screen:opacity-100 transition-opacity z-20 flex items-center gap-1 text-[10px] font-semibold cursor-pointer shadow-md"
              title="Inspect Fullscreen Command Prompt"
            >
              <Maximize2 className="w-3 h-3 text-emerald-400" />
              <span>Fullscreen</span>
            </button>
          </div>
        );

      default:
        return (
          <div className="space-y-3.5 p-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 mx-auto flex items-center justify-center text-sky-400">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-200">
                Screenshots Coming Soon
              </p>
              <p className="text-[11px] text-slate-400 leading-normal">
                Real production interface captures will be presented upon app milestone completion.
              </p>
            </div>
            <div className="inline-block px-2.5 py-1 rounded bg-slate-800 text-[10px] text-sky-300 font-mono">
              BUILD: IN DEV
            </div>
          </div>
        );
    }
  };

  return (
    <section id="android-apps" className="py-24 bg-[#07080D] border-b border-white/[0.08] relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header with Reveal Animation */}
        <ScrollReveal direction="up" distance={20} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div className="max-w-3xl">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-2.5 flex items-center gap-2">
              <span className="w-2 h-0.5 bg-sky-400" />
              <span>Mobile Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              My Android Applications
            </h2>
            <p className="mt-3 text-slate-400 text-base">
              Dedicated mobile utility, security, calculations, and command prompt UI architectures.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <div className="text-xs font-mono text-emerald-300 font-medium bg-emerald-950/60 border border-emerald-800/60 rounded-lg px-3.5 py-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>All 5 Mobile Interfaces Verified &amp; Integrated</span>
            </div>
            <button
              type="button"
              onClick={() => onEnlargeScreenshot('AndroPrompt — Android Command Prompt UI & Terminal Emulator', 'androprompt_terminal_ui')}
              className="text-xs font-mono text-cyan-300 font-medium bg-sky-950/60 hover:bg-sky-900/60 border border-sky-700/60 rounded-lg px-3.5 py-2 flex items-center gap-2 transition-all cursor-pointer"
              title="Launch Android Command Prompt UI"
            >
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Command Prompt UI</span>
            </button>
          </div>
        </ScrollReveal>

        {/* 5 Android Applications Grid with Staggered Cascading Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {androidApps.map((app, index) => (
            <ScrollReveal
              key={app.id}
              staggerIndex={index}
              direction="up"
              distance={24}
              className="h-full"
            >
              <Card3D
                glowColor={
                  app.id === 'androprompt-cli'
                    ? 'emerald'
                    : app.id === '1calcone'
                    ? 'amber'
                    : app.id === 'astroveda-ai'
                    ? 'purple'
                    : 'cyan'
                }
                className="h-full bg-[#0D1222]/90 rounded-2xl border border-white/[0.07] hover:border-sky-500/40 transition-all shadow-xl p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                {/* Top Header: Title & Status */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {app.id === 'androprompt-cli' ? (
                        <Terminal className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Smartphone className="w-4 h-4 text-sky-400" />
                      )}
                      <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {app.title}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-slate-300 leading-snug">
                      {app.description}
                    </p>
                  </div>

                  {/* Status: Clean unboxed text with bold indicator */}
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-bold text-sky-400 tracking-wider font-mono block">
                      [{app.status}]
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold font-mono">
                      ✓ UI VERIFIED
                    </span>
                  </div>
                </div>

                {/* Metadata tags */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-5 font-mono">
                  {app.tags.map((tag, tIdx) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {tIdx < app.tags.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>

                {/* Mobile Device Frame for Screenshots / Clean Interactive Container */}
                <div className="my-4 flex justify-center">
                  <div className="w-full max-w-[260px] aspect-[9/18] rounded-[2.2rem] bg-slate-900 border-[7px] border-slate-800 shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden relative flex flex-col">
                    {/* Top Phone Speaker / Punch Hole Bezel */}
                    <div className="w-full h-5 bg-slate-900 flex items-center justify-center relative shrink-0">
                      <div className="w-12 h-3.5 bg-slate-950 rounded-full flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                      </div>
                    </div>

                    {/* Screen Content Area */}
                    <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center text-center relative overflow-hidden">
                      {renderAppScreen(app)}
                    </div>

                    {/* Bottom Android Navigation Bar Pill Indicator */}
                    <div className="w-full h-4 bg-slate-900 flex items-center justify-center shrink-0">
                      <div className="w-16 h-1 rounded-full bg-slate-700"></div>
                    </div>
                  </div>
                </div>

                {/* Key Capabilities Preview */}
                <div className="mt-6 space-y-2 border-t border-white/[0.06] pt-4">
                  <span className="text-xs font-mono font-bold text-slate-400 block uppercase tracking-wide">
                    Verified Capabilities:
                  </span>
                  <ul className="space-y-1.5">
                    {app.keyCapabilities.slice(0, 3).map((cap, cIdx) => (
                      <li key={cIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-sky-400 font-bold mt-0.5">•</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* View Details Action */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAppDetails(app)}
                  className="w-full flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-lg bg-white/[0.04] hover:bg-sky-500/15 text-slate-200 hover:text-sky-300 border border-white/[0.08] hover:border-sky-400/40 transition-all cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-sky-400" />
                  <span>View Specifications</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
                {app.id === 'androprompt-cli' && (
                  <button
                    type="button"
                    onClick={() => onEnlargeScreenshot('AndroPrompt — Android Command Prompt UI & Terminal Emulator', 'androprompt_terminal_ui')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 transition-all cursor-pointer"
                    title="Fullscreen Command Prompt"
                  >
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Fullscreen</span>
                  </button>
                )}
              </div>
            </Card3D>
          </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
