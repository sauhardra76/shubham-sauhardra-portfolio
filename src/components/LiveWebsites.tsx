import React from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { ExternalLink, Globe, ShieldAlert, CheckCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Card3D } from './Card3D';

export const LiveWebsites: React.FC = () => {
  const { liveWebsites } = PORTFOLIO_DATA;

  return (
    <section id="live-websites" className="py-24 bg-[#07080D] border-b border-white/[0.08] relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header with Reveal Animation */}
        <ScrollReveal direction="up" distance={20} className="max-w-3xl mb-14">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-2.5 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-sky-400" />
            <span>Published Online</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Live Website Contributions
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Active websites where I have provided design, content structuring, and technical support assistance.
          </p>
        </ScrollReveal>

        {/* 5 Live Website Cards with Staggered Cascading Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {liveWebsites.map((site, index) => (
            <ScrollReveal
              key={site.id}
              staggerIndex={index}
              direction="up"
              distance={24}
              className="h-full"
            >
              <Card3D
                glowColor="cyan"
                className="h-full bg-[#0D1222]/90 rounded-2xl border border-white/[0.07] shadow-xl hover:border-sky-500/40 transition-all p-7 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Name & Live Status */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {site.name}
                      </h3>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-sky-400 hover:text-sky-300 underline flex items-center gap-1 mt-0.5 break-all font-mono"
                      >
                        <span>{site.url}</span>
                      </a>
                    </div>
                  </div>

                  {/* LIVE WEBSITE status (clean unboxed text) */}
                  <div className="shrink-0 text-right">
                    <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{site.status}</span>
                    </span>
                  </div>
                </div>

                {/* Contribution Details (Exact and editable) */}
                <div className="my-5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wide block">
                    My Technical Contribution:
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {site.contribution}
                  </p>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-6 font-mono">
                  {site.techStack.map((tech, tIdx) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {tIdx < site.techStack.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Working Visit Website Button */}
              <div className="pt-4 border-t border-white/[0.06]">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 transition-all group/btn"
                >
                  <span>Visit {site.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </Card3D>
          </ScrollReveal>
          ))}
        </div>

        {/* Ownership Transparency Notice */}
        <ScrollReveal
          direction="up"
          distance={16}
          delay={200}
          className="mt-10 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3 text-xs text-slate-400 max-w-4xl"
        >
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong className="font-semibold text-slate-300 font-mono">Transparency Note:</strong> All brand identities, trademarks, and domain ownerships remain the exclusive property of their respective owners. Shubham Sauhardra’s role is strictly limited to technical development, design adaptation, frontend engineering, and ongoing support services.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};
