import React from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { ArrowDown, Layers, PhoneCall, Compass, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { DeveloperProfileCard } from './DeveloperProfileCard';

export const Hero: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#07080D]/85 via-[#0A0D18]/75 to-[#07080D]/85 backdrop-blur-[1px] text-white pt-16 sm:pt-20 pb-28 border-b border-white/[0.08]">
      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 bg-grid-mesh opacity-70 pointer-events-none" />

      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-br from-sky-500/10 via-indigo-500/5 to-transparent blur-[120px] pointer-events-none -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Content & Required 3 Action Buttons */}
          <ScrollReveal direction="up" distance={20} delay={50} duration={600} className="lg:col-span-7 space-y-7">
            {/* Professional Title with Developer status badge */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-widest text-sky-400">
                <span className="w-2.5 h-0.5 bg-sky-400"></span>
                <span>{personal.title}</span>
              </div>
              <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE // AVAILABLE</span>
              </div>
            </div>

            {/* Name / Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
              Shubham <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-400">Sauhardra</span>
            </h1>

            {/* Exact Required Introduction */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              “{personal.shortBio}”
            </p>

            {/* Required 3 Functional Buttons */}
            <div className="pt-2 flex flex-wrap gap-3.5 sm:gap-4">
              {/* Button 1: View Projects */}
              <a
                href="#android-apps"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 transition-all active:scale-95 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>View Projects</span>
              </a>

              {/* Button 2: Explore Services */}
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-100 border border-white/[0.1] hover:border-sky-400/50 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              >
                <ArrowDown className="w-4 h-4" />
                <span>Explore Services</span>
              </a>

              {/* Button 3: Contact Me */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-transparent hover:bg-white/[0.04] text-slate-200 border border-white/[0.1] hover:border-white/[0.25] transition-all active:scale-95 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quiet capability note */}
            <div className="pt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="text-sky-400">●</span>
              <span>Web Development</span>
              <span>·</span>
              <span>Web3 &amp; Blockchain</span>
              <span>·</span>
              <span>Android Apps</span>
              <span>·</span>
              <span>CRM &amp; IT Solutions</span>
            </div>
          </ScrollReveal>

          {/* Right Column: Developer Profile & Architecture Card */}
          <ScrollReveal direction="up" distance={20} delay={180} duration={650} className="lg:col-span-5 flex flex-col items-center">
            <DeveloperProfileCard />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
