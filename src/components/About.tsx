import React from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { Monitor, Cpu, Shield, ShieldCheck, CheckCircle2, Coins } from 'lucide-react';
import { Skills } from './Skills';
import { Skills3DSphere } from './Skills3DSphere';
import { SecurityTipOfTheDay } from './SecurityTipOfTheDay';
import { ScrollReveal } from './ScrollReveal';
import { Card3D } from './Card3D';

export const About: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-24 bg-[#07080D]/85 backdrop-blur-[1px] border-b border-white/[0.08] relative">
      {/* Background Dot Texture */}
      <div className="absolute inset-0 bg-dot-mesh opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header with Reveal Animation */}
        <ScrollReveal direction="up" distance={20} className="max-w-3xl mb-14">
          {/* Section Kicker */}
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-2.5 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-sky-400" />
            <span>Professional Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            About Me
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Independent IT professional delivering secure, scalable, and efficient technology solutions tailored to business requirements.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Bio Paragraphs & Core Expertise */}
          <ScrollReveal direction="up" distance={24} delay={100} className="lg:col-span-7 space-y-5 text-slate-300 leading-relaxed text-base">
            {/* Core Expertise Visual Badge Bar */}
            <div className="p-3 rounded-xl bg-[#0B1020]/90 border border-white/[0.08] shadow-inner">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400 block mb-2">
                Core Expertise Domains
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Web Development',
                  'Cybersecurity',
                  'Web3 Solutions',
                  'Software & CRM Development',
                  'IT Support',
                  'Digital Solutions'
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-white/[0.04] text-slate-200 border border-white/[0.08] hover:border-sky-500/40 hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {personal.aboutText.map((paragraph, index) => (
              <p key={index} className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                {paragraph}
              </p>
            ))}

            <p className="text-slate-300 leading-relaxed">
              Whether you are an established business looking to upgrade your digital infrastructure, a startup building specialized web or mobile software, or an organization needing ongoing technical support and security auditing, I emphasize code quality, system reliability, security, and continuous improvement.
            </p>

            {/* Core Values / Work Principles */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0D1222]/90 border border-white/[0.07] hover:border-sky-500/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white block mb-0.5">Code Quality</span>
                  <span className="text-slate-400">Clean, modular, standards-compliant code built for maintainability.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0D1222]/90 border border-white/[0.07] hover:border-emerald-500/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white block mb-0.5">System Reliability</span>
                  <span className="text-slate-400">Durable architecture, graceful error recovery, and high uptime.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0D1222]/90 border border-white/[0.07] hover:border-emerald-500/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white block mb-0.5">Security &amp; Hardening</span>
                  <span className="text-slate-400">Zero-trust principles, OWASP defenses, and encrypted data channels.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0D1222]/90 border border-white/[0.07] hover:border-sky-500/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white block mb-0.5">Continuous Improvement</span>
                  <span className="text-slate-400">Iterative refinement, automated testing, and technical growth.</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Technical Focus Card with 3D Spatial Tilt */}
          <ScrollReveal direction="up" distance={24} delay={200} className="lg:col-span-5">
            <Card3D glowColor="cyan">
              <div className="bg-gradient-to-b from-[#0E1426] to-[#0A0E1A] rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.5)] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                    Primary Technical Focus Areas
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    3D TILT
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Modern Web Interfaces</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Responsive design, standards-compliant HTML/CSS/JavaScript, fast loading performance, and clean layouts.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Web3 &amp; dApp Development</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Decentralized application interfaces, crypto wallet integration, smart contract ABI calls, and IPFS storage.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Software &amp; Android Apps</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Specialized utility apps, secure anti-theft workflows, digital ledgers, and tailored CRM management systems.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Cyber Security &amp; Defense</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Vulnerability assessment, network firewall configuration, OWASP Top 10 mitigation, and cryptographic data protection.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Infrastructure &amp; IT Support</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Troubleshooting system errors, software installation &amp; configuration, system setup, and search engine discoverability.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08]">
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 text-xs font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
                  >
                    Discuss a Project
                  </a>
                </div>
              </div>
            </Card3D>
          </ScrollReveal>
        </div>

        {/* Interactive 3D Skill Architecture & Sphere Component */}
        <ScrollReveal direction="up" distance={24} delay={150}>
          <Skills3DSphere />
        </ScrollReveal>

        {/* Skills Component (Progress Bars or Radar Chart) */}
        <ScrollReveal direction="up" distance={24} delay={200}>
          <Skills />
        </ScrollReveal>

        {/* Security Tip of the Day (Non-intrusive Cybersecurity Best Practice Widget) */}
        <ScrollReveal direction="up" distance={20} delay={220} className="mt-10">
          <SecurityTipOfTheDay />
        </ScrollReveal>
      </div>
    </section>
  );
};
