import React, { useState } from 'react';
import {
  Search,
  Palette,
  Smartphone,
  Calculator,
  Percent,
  Calendar,
  TrendingUp,
  DollarSign,
  Star,
  ChevronRight,
  Clock,
  Sparkles,
  Layers,
  FileText,
  Bookmark,
  History,
  Settings,
  Home
} from 'lucide-react';

interface CalcOneScreenProps {
  className?: string;
  isEnlarged?: boolean;
}

export const CalcOneScreen: React.FC<CalcOneScreenProps> = ({
  className = '',
  isEnlarged = false,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'math' | 'finance'>('home');

  return (
    <div
      className={`w-full h-full bg-[#120E0B] text-white flex flex-col font-sans select-none overflow-hidden relative ${className}`}
      style={{
        background: '#140E0A',
      }}
    >
      {/* Top App Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between shrink-0 border-b border-white/5">
        <div className="flex items-center gap-2">
          {/* Orange Circle 1 Logo */}
          <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-[#120E0B] font-extrabold text-sm flex items-center justify-center shadow-md">
            1
          </div>
          <span className="text-xs font-bold tracking-tight text-white/90">
            CalcOne
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <div className="p-1 rounded-md bg-white/5 text-emerald-400">
            <Smartphone className="w-3.5 h-3.5" />
          </div>
          <div className="p-1 rounded-md bg-white/5 text-slate-300">
            <Search className="w-3.5 h-3.5" />
          </div>
          <div className="p-1 rounded-md bg-white/5 text-amber-400">
            <Palette className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Screen View Sub-Tabs (Interactive demo of all 3 uploaded screenshots) */}
      <div className="px-3 pt-2 pb-1 flex items-center gap-1.5 shrink-0 bg-white/[0.02]">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors ${
            activeTab === 'home'
              ? 'bg-[#F59E0B] text-black shadow-xs'
              : 'bg-white/5 text-slate-300 hover:text-white'
          }`}
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('math')}
          className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors ${
            activeTab === 'math'
              ? 'bg-[#F59E0B] text-black shadow-xs'
              : 'bg-white/5 text-slate-300 hover:text-white'
          }`}
        >
          Math (2)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('finance')}
          className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors ${
            activeTab === 'finance'
              ? 'bg-[#F59E0B] text-black shadow-xs'
              : 'bg-white/5 text-slate-300 hover:text-white'
          }`}
        >
          Finance &amp; Date (3)
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 px-3.5 py-2 space-y-3 overflow-y-auto no-scrollbar">
        {activeTab === 'home' && (
          <>
            {/* Kicker Notice */}
            <div className="text-[10px] text-amber-200/70 leading-snug">
              <span>CalcOne Suite · Crafted by </span>
              <strong className="text-amber-300 font-semibold">Shubham Sauhardra</strong>
              <div className="text-[9px] text-slate-400 mt-0.5">
                100% Offline PWA · 14+ Precision Modules
              </div>
            </div>

            {/* Main Headline */}
            <div>
              <h4 className="text-base font-extrabold text-white leading-tight">
                Precision Math &amp; <span className="text-[#F59E0B]">Pro Calculations.</span>
              </h4>
              <p className="text-[10px] text-slate-300/80 mt-1 leading-snug">
                Google Stitch inspired digital calculator suite. Compute everyday arithmetic, finance, tax, and conversions with zero latency.
              </p>
            </div>

            {/* Quick Math Bar Card */}
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                <Calculator className="w-3 h-3" />
                <span>QUICK MATH BAR</span>
              </div>

              <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-[11px] font-mono text-slate-300">
                Type any math: <span className="text-amber-400">1500 * 18%,</span>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-1.5 text-[9px]">
                <span className="text-amber-400/80 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" />
                  PRESETS:
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-200 font-mono">
                  ₹2,500 + 18% GST
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-200 font-mono">
                  ₹85,000 ÷ 12 (Mo)
                </span>
              </div>
            </div>

            {/* Recently Used */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 text-amber-400/90 font-bold uppercase tracking-wider">
                  <Clock className="w-3 h-3" />
                  RECENTLY USED
                </span>
                <span className="text-slate-500 text-[9px]">Clear</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-white block truncate">
                      Profit &amp; Loss
                    </span>
                    <span className="text-[8px] text-slate-400 font-mono">BUSINESS</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Calculator className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-white block truncate">
                      Basic Calc
                    </span>
                    <span className="text-[8px] text-slate-400 font-mono">MATH</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'math' && (
          <div className="space-y-2">
            {/* Module 1: Basic Calculator */}
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Basic Calculator</span>
                </div>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </div>
              <p className="text-[10px] text-slate-300/80 leading-snug">
                Standard arithmetic calculations, percentages, memory, clean expressions and error prevention.
              </p>
              <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400 border-t border-white/5">
                <span className="font-mono uppercase text-sky-400">MATH</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Module 2: Percentage Calculator */}
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Percent className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">Percentage Calculator</span>
                </div>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </div>
              <p className="text-[10px] text-slate-300/80 leading-snug">
                5 essential percentage calculation modes: % of, what %, percentage increase/decrease &amp; difference.
              </p>
              <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400 border-t border-white/5">
                <span className="font-mono uppercase text-sky-400">MATH</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-2">
            {/* Age Calculator */}
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
              <span className="text-xs font-bold text-white block">Age Calculator</span>
              <p className="text-[10px] text-slate-300/80 leading-snug">
                Find exact age in years, months, days, total lived time, and countdown to your next birthday.
              </p>
              <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400 border-t border-white/5">
                <span className="font-mono uppercase text-amber-400">DATETIME</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Compound Interest Calculator */}
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white block">Compound Interest</span>
                <Star className="w-3 h-3 text-slate-500" />
              </div>
              <p className="text-[10px] text-slate-300/80 leading-snug">
                Calculate compounding growth with annual, semi-annual, quarterly, monthly, and daily frequency options.
              </p>
              <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400 border-t border-white/5">
                <span className="font-mono uppercase text-blue-400">FINANCE</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Profit & Loss Calculator */}
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white block">Profit &amp; Loss</span>
                <Star className="w-3 h-3 text-slate-500" />
              </div>
              <p className="text-[10px] text-slate-300/80 leading-snug">
                Determine profit or loss amount, net percentage gain, profit margin %, and markup on cost.
              </p>
              <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400 border-t border-white/5">
                <span className="font-mono uppercase text-purple-400">BUSINESS</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom 1CalcOne Navigation Bar */}
      <div className="px-3 py-2 bg-[#0C0806] border-t border-white/5 flex items-center justify-around text-slate-400 shrink-0">
        <div className="flex flex-col items-center text-[#F59E0B]">
          <div className="w-6 h-6 rounded-full bg-[#F59E0B] text-black flex items-center justify-center">
            <Home className="w-3.5 h-3.5" />
          </div>
          <span className="text-[8px] font-bold mt-0.5">Home</span>
        </div>

        <div className="flex flex-col items-center hover:text-white">
          <Layers className="w-4 h-4" />
          <span className="text-[8px] mt-0.5">Tools</span>
        </div>

        <div className="flex flex-col items-center hover:text-white">
          <FileText className="w-4 h-4" />
          <span className="text-[8px] mt-0.5">Tape</span>
        </div>

        <div className="flex flex-col items-center relative hover:text-white">
          <Bookmark className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F59E0B] text-black text-[7px] font-bold flex items-center justify-center">
            6
          </span>
          <span className="text-[8px] mt-0.5">Saved</span>
        </div>

        <div className="flex flex-col items-center hover:text-white">
          <History className="w-4 h-4" />
          <span className="text-[8px] mt-0.5">History</span>
        </div>

        <div className="flex flex-col items-center hover:text-white">
          <Settings className="w-4 h-4" />
          <span className="text-[8px] mt-0.5">Settings</span>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="w-full h-2 bg-[#0C0806] flex items-center justify-center shrink-0 pb-1">
        <div className="w-16 h-1 rounded-full bg-slate-700"></div>
      </div>
    </div>
  );
};
