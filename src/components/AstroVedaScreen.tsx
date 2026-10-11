import React from 'react';
import {
  Sun,
  Bell,
  Sparkles,
  User,
  Star,
  Compass,
  Calendar,
  Heart,
  MoreHorizontal,
  Layers,
  Home
} from 'lucide-react';

interface AstroVedaScreenProps {
  className?: string;
  isEnlarged?: boolean;
}

export const AstroVedaScreen: React.FC<AstroVedaScreenProps> = ({
  className = '',
  isEnlarged = false,
}) => {
  return (
    <div
      className={`w-full h-full bg-[#0E0B16] text-white flex flex-col font-sans select-none overflow-hidden relative ${className}`}
      style={{
        background: 'linear-gradient(180deg, #120D1E 0%, #08060D 100%)',
      }}
    >
      {/* Top Status Bar */}
      <div className="px-5 pt-2 pb-1 flex items-center justify-between text-[10px] font-medium text-slate-300 shrink-0">
        <span className="font-semibold tracking-tight">15:08</span>
        <div className="flex items-center gap-1.5 opacity-90">
          <span className="text-[9px] font-mono">Jio 5G</span>
          <span>94%</span>
        </div>
      </div>

      {/* App Header */}
      <div className="px-3.5 py-2 flex items-center justify-between shrink-0 border-b border-purple-500/10">
        <div className="flex items-center gap-2">
          {/* Om Symbol Icon */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-orange-500/20">
            ॐ
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold tracking-wide text-white">
                ASTROVEDA
              </span>
              <span className="px-1 py-0.2 rounded bg-amber-500 text-black text-[9px] font-extrabold">
                AI
              </span>
            </div>
            <span className="text-[8.5px] text-amber-200/80 block -mt-0.5">
              Ancient Wisdom. Intelligent Guidance.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <button type="button" aria-label="Theme" className="p-1 text-amber-400">
            <Sun className="w-3.5 h-3.5" />
          </button>
          <div className="relative p-1">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[9px] font-bold text-amber-300">
            3D
          </span>
          <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
            <User className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Scrollable Screen Content */}
      <div className="flex-1 px-3.5 py-2 space-y-3 overflow-y-auto no-scrollbar">
        {/* 3D Planetary Orbit & Vedic Solar Canvas */}
        <div className="relative h-32 rounded-2xl bg-gradient-to-b from-[#1E1435] via-[#150D27] to-[#0D0819] border border-purple-500/20 overflow-hidden shadow-lg flex items-center justify-center">
          {/* Orbital Rings SVG */}
          <svg
            className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
            viewBox="0 0 200 120"
          >
            <ellipse cx="100" cy="60" rx="90" ry="40" fill="none" stroke="#D97706" strokeWidth="0.8" strokeDasharray="3 3" />
            <ellipse cx="100" cy="60" rx="70" ry="30" fill="none" stroke="#A855F7" strokeWidth="0.8" />
            <ellipse cx="100" cy="60" rx="50" ry="20" fill="none" stroke="#38BDF8" strokeWidth="0.8" />
            <ellipse cx="100" cy="60" rx="30" ry="12" fill="none" stroke="#F59E0B" strokeWidth="0.8" />
            
            {/* Planets */}
            <circle cx="160" cy="45" r="4.5" fill="#F59E0B" />
            <circle cx="45" cy="55" r="3.5" fill="#EF4444" />
            <circle cx="125" cy="80" r="3" fill="#3B82F6" />
            <circle cx="85" cy="35" r="2.5" fill="#10B981" />
          </svg>

          {/* Central Radiant Sun */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_20px_rgba(245,158,11,0.8)] flex items-center justify-center">
              <Sun className="w-5 h-5 text-amber-950 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </div>
        </div>

        {/* Selected Celestial Card: SUN (SURYA) */}
        <div className="p-3 rounded-2xl bg-[#1B132C] border border-purple-500/30 space-y-2.5 shadow-md">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-black font-extrabold flex items-center justify-center text-xs">
                ☉
              </div>
              <div>
                <span className="text-xs font-extrabold text-white block leading-tight">
                  SUN (SURYA)
                </span>
                <span className="text-[9.5px] text-amber-300/90 font-medium">
                  Virgo • House 5 • 2.00°
                </span>
              </div>
            </div>

            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              FRIENDLY
            </span>
          </div>

          {/* 3-Column Attributes Grid */}
          <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-black/30 border border-white/5 text-center">
            <div>
              <span className="text-[8px] text-slate-400 block uppercase">Nakshatra</span>
              <span className="text-[9.5px] font-bold text-amber-200 block truncate">
                Uttara Phalguni...
              </span>
            </div>
            <div>
              <span className="text-[8px] text-slate-400 block uppercase">Lord</span>
              <span className="text-[9.5px] font-bold text-amber-200 block truncate">
                Mercury
              </span>
            </div>
            <div>
              <span className="text-[8px] text-slate-400 block uppercase">Gemstone</span>
              <span className="text-[9.5px] font-bold text-rose-300 block truncate">
                Ruby
              </span>
            </div>
          </div>

          {/* Mantra & 3D Orbit Footer */}
          <div className="flex items-center justify-between text-[9px] text-purple-200 pt-1 border-t border-purple-500/20">
            <span className="italic flex items-center gap-1 text-amber-300/90">
              <span>ॐ</span>
              <span>Om Suryaya Namaha</span>
            </span>
            <span className="font-mono text-slate-300">3D Orbit: 152°</span>
          </div>
        </div>

        {/* Kundli Houses Card */}
        <div className="p-3 rounded-2xl bg-[#1B132C] border border-purple-500/30 space-y-1.5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300">
              House 1 (Taurus)
            </span>
            <span className="text-[9px] text-slate-400">
              Lord: Venus (in House 10)
            </span>
          </div>
          <p className="text-[10px] text-slate-300 leading-snug">
            Self, Physical Vitality, Personality, Temperament, and Life Path (Tanu Bhava)
          </p>
          <div className="pt-1 flex items-center gap-1.5">
            <span className="text-[9px] text-slate-400">Occupants:</span>
            <span className="px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 text-[8.5px] font-bold border border-rose-500/40">
              Mars
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Kundli / Vedic Navigation Bar */}
      <div className="px-2 py-2 bg-[#09060E] border-t border-purple-500/20 flex items-center justify-around text-slate-400 shrink-0">
        <div className="flex flex-col items-center hover:text-white">
          <Home className="w-3.5 h-3.5" />
          <span className="text-[8px] mt-0.5">Home</span>
        </div>

        <div className="flex flex-col items-center text-amber-400 relative">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span className="text-[8px] font-bold mt-0.5">Kundli</span>
          <span className="w-4 h-0.5 bg-amber-400 rounded-full mt-0.5"></span>
        </div>

        <div className="flex flex-col items-center hover:text-white">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[8px] mt-0.5">AstroGuru</span>
        </div>

        <div className="flex flex-col items-center hover:text-white">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-[8px] mt-0.5">Panchang</span>
        </div>

        <div className="flex flex-col items-center hover:text-white">
          <Heart className="w-3.5 h-3.5" />
          <span className="text-[8px] mt-0.5">Kundli Match</span>
        </div>

        <div className="flex flex-col items-center hover:text-white">
          <MoreHorizontal className="w-3.5 h-3.5" />
          <span className="text-[8px] mt-0.5">More</span>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="w-full h-2 bg-[#09060E] flex items-center justify-center shrink-0 pb-1">
        <div className="w-16 h-1 rounded-full bg-slate-700"></div>
      </div>
    </div>
  );
};
