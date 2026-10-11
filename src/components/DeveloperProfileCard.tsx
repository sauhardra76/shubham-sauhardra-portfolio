import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, Server, ShieldCheck, Cpu, Smartphone, Database, Globe, Sparkles, Camera } from 'lucide-react';
import { useCustomLogo } from '../hooks/useCustomLogo';

interface DeveloperProfileCardProps {
  onOpenLogoModal?: () => void;
}

export const DeveloperProfileCard: React.FC<DeveloperProfileCardProps> = ({ onOpenLogoModal }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'stack' | 'specs'>('profile');
  const [copied, setCopied] = useState(false);
  const { logoUrl } = useCustomLogo();

  const handleCopy = () => {
    navigator.clipboard.writeText(`// Shubham Sauhardra - Full-Stack & Android Specialist
const engineer = {
  name: "Shubham Sauhardra",
  title: "Software Developer & IT Consultant",
  experience: "Enterprise Full-Stack & Native Android",
  stack: ["TypeScript", "React", "Next.js", "Kotlin", "Node.js", "PostgreSQL", "Docker"],
  availability: "Available for Projects & Contracts"
};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto rounded-2xl bg-[#090D1A]/95 border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="bg-[#05070E] px-4 py-3 border-b border-white/[0.08] flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-400 font-semibold text-[11px] flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>shubham@dev-station: ~/profile</span>
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="p-1.5 text-slate-400 hover:text-white rounded bg-white/[0.04] hover:bg-white/[0.08] transition-colors flex items-center gap-1 cursor-pointer"
          title="Copy config"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Editor Tab Strip */}
      <div className="flex items-center bg-[#070A14] border-b border-white/[0.06] px-2 pt-1 gap-1 overflow-x-auto select-none">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-3 py-1.5 rounded-t text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#090D1A] text-sky-300 border-t-2 border-sky-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-sky-400" />
          <span>profile.ts</span>
        </button>
        <button
          onClick={() => setActiveTab('stack')}
          className={`px-3 py-1.5 rounded-t text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'stack'
              ? 'bg-[#090D1A] text-emerald-300 border-t-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span>stack.json</span>
        </button>
        <button
          onClick={() => setActiveTab('specs')}
          className={`px-3 py-1.5 rounded-t text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'specs'
              ? 'bg-[#090D1A] text-amber-300 border-t-2 border-amber-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <span>architecture.sys</span>
        </button>
      </div>

      {/* Editor Body */}
      <div className="p-4 sm:p-5 min-h-[300px] leading-relaxed select-text overflow-x-auto text-[12px]">
        {activeTab === 'profile' && (
          <div className="space-y-3 font-mono">
            {/* Visual Developer Identity Badge */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] not-italic">
              <button
                type="button"
                onClick={onOpenLogoModal}
                title="Click to upload your image or change photo"
                className="w-11 h-11 rounded-xl bg-[#05070E] border border-sky-400/50 flex items-center justify-center overflow-hidden relative cursor-pointer hover:border-sky-300 transition-all shadow-[0_0_14px_rgba(56,189,248,0.2)] shrink-0 group/av"
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Developer Profile"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-sm font-extrabold text-sky-400">&gt;_</span>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/av:opacity-100 flex items-center justify-center transition-opacity text-sky-300">
                  <Camera className="w-3.5 h-3.5" />
                </div>
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white font-bold text-xs truncate">Shubham Sauhardra</span>
                  <button
                    type="button"
                    onClick={onOpenLogoModal}
                    className="text-[10px] text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer font-sans"
                  >
                    <Camera className="w-2.5 h-2.5" />
                    <span>{logoUrl ? 'Change image' : 'Upload image'}</span>
                  </button>
                </div>
                <span className="text-slate-400 text-[10px] block truncate">
                  Full-Stack &amp; Android Specialist
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-slate-500">// Enterprise Software Engineer Spec</p>
              <p>
                <span className="text-purple-400">export const </span>
                <span className="text-blue-300">engineer</span>
                <span className="text-slate-300">: </span>
                <span className="text-sky-300">SoftwareEngineer</span>
                <span className="text-slate-300"> = {'{'}</span>
              </p>
              <div className="pl-4 space-y-1">
              <p>
                <span className="text-slate-400">name:</span>{' '}
                <span className="text-emerald-300">"Shubham Sauhardra"</span>,
              </p>
              <p>
                <span className="text-slate-400">title:</span>{' '}
                <span className="text-emerald-300">"Full-Stack Web &amp; Android Specialist"</span>,
              </p>
              <p>
                <span className="text-slate-400">location:</span>{' '}
                <span className="text-emerald-300">"India // Remote &amp; Global Contracts"</span>,
              </p>
              <p>
                <span className="text-slate-400">status:</span>{' '}
                <span className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px] border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  "Available for Projects"
                </span>
                ,
              </p>
              <p>
                <span className="text-slate-400">coreDomains:</span> [
              </p>
              <div className="pl-4 space-y-0.5 text-amber-300">
                <p>"Modern Web &amp; SaaS Systems",</p>
                <p>"Native Android Architecture",</p>
                <p>"Enterprise CRM &amp; Automation",</p>
                <p>"Web3 / Smart Contract Integration"</p>
              </div>
              <p className="text-slate-400">],</p>
              <p>
                <span className="text-slate-400">codePhilosophy:</span>{' '}
                <span className="text-sky-300">"Robust architecture, zero bloat, high ROI"</span>
              </p>
            </div>
            <p className="text-slate-300">{'};'}</p>
          </div>
        </div>
      )}

        {activeTab === 'stack' && (
          <div className="space-y-3 font-mono">
            <p className="text-slate-500">// Production Stack &amp; Technologies</p>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.05]">
                <div className="text-[11px] text-sky-400 font-bold mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> Frontend &amp; Web
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  {['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'GraphQL'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.05]">
                <div className="text-[11px] text-emerald-400 font-bold mb-1.5 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" /> Android Ecosystem
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  {['Kotlin', 'Jetpack Compose', 'MVVM / MVI', 'Room DB', 'Coroutines', 'Native NDK'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.05]">
                <div className="text-[11px] text-purple-400 font-bold mb-1.5 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" /> Backend &amp; Data
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  {['Node.js', 'PostgreSQL', 'Express/Fastify', 'Docker', 'RESTful APIs', 'Redis'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-3 font-mono">
            <p className="text-slate-500">// Enterprise Architectural Benchmarks</p>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05] space-y-1">
                <span className="text-slate-400 text-[10px] block">SECURITY</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Hardened
                </span>
                <p className="text-[10px] text-slate-500">OWASP Standards &amp; RBAC</p>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05] space-y-1">
                <span className="text-slate-400 text-[10px] block">TYPE SAFETY</span>
                <span className="text-sky-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 100% Strict
                </span>
                <p className="text-[10px] text-slate-500">TypeScript strict mode</p>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05] space-y-1">
                <span className="text-slate-400 text-[10px] block">PERFORMANCE</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" /> 98+ Lighthouse
                </span>
                <p className="text-[10px] text-slate-500">Optimized bundle &amp; SEO</p>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.05] space-y-1">
                <span className="text-slate-400 text-[10px] block">DELIVERY</span>
                <span className="text-purple-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Turnkey CI/CD
                </span>
                <p className="text-[10px] text-slate-500">Automated builds &amp; deploy</p>
              </div>
            </div>

            <div className="p-2 rounded bg-sky-950/30 border border-sky-800/40 text-[10px] text-sky-300">
              ⚡ All solutions engineered with clean documentation and long-term maintainability.
            </div>
          </div>
        )}
      </div>

      {/* Terminal Status Footer */}
      <div className="px-4 py-2.5 bg-[#05070E] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-slate-300">STATUS: READY_FOR_DEPLOYMENT</span>
        </div>
        <span className="text-slate-500 font-mono">UTF-8 // LF</span>
      </div>
    </div>
  );
};
