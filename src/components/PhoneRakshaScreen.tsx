import React, { useState } from 'react';
import {
  Shield,
  Bell,
  Settings,
  Camera,
  MapPin,
  Lock,
  Zap,
  Radio,
  Wifi,
  Battery,
  AlertTriangle,
  Volume2
} from 'lucide-react';

interface PhoneRakshaScreenProps {
  className?: string;
  isEnlarged?: boolean;
}

export const PhoneRakshaScreen: React.FC<PhoneRakshaScreenProps> = ({
  className = '',
  isEnlarged = false,
}) => {
  const [pocketTheft, setPocketTheft] = useState(false);
  const [motionAlarm, setMotionAlarm] = useState(false);
  const [chargerAlert, setChargerAlert] = useState(true);
  const [simLock, setSimLock] = useState(true);

  return (
    <div
      className={`w-full h-full bg-[#0A1220] text-white flex flex-col font-sans select-none overflow-hidden relative ${className}`}
      style={{
        background: 'linear-gradient(180deg, #091322 0%, #050B14 100%)',
      }}
    >
      {/* Top Status Bar */}
      <div className="px-5 pt-2 pb-1 flex items-center justify-between text-[11px] font-medium text-slate-300 shrink-0">
        <span className="font-semibold tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5 opacity-90">
          <Wifi className="w-3 h-3" />
          <div className="w-2.5 h-2 border border-current rounded-xs flex items-center justify-center">
            <div className="w-1.5 h-1 bg-current"></div>
          </div>
          <Battery className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* App Bar */}
      <div className="px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-950/80 border border-sky-400/50 flex items-center justify-center text-sky-400 shadow-sm shadow-sky-500/20">
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-tight text-white block leading-tight">
              Phone<span className="text-sky-400">Raksha</span>
            </span>
            <span className="text-[9px] text-slate-400 block -mt-0.5">
              Smart Anti-Theft System
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Settings className="w-4 h-4 hover:text-white" />
        </div>
      </div>

      {/* Scrollable Screen Content */}
      <div className="flex-1 px-4 py-2 space-y-3 overflow-y-auto no-scrollbar">
        {/* Central Circular Radar Armed Dial */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#0F1D33] to-[#0A1424] border border-cyan-500/30 p-4 flex flex-col items-center justify-center shadow-lg shadow-cyan-950/50">
          {/* Circular Gauge */}
          <div className="relative w-28 h-28 rounded-full border-4 border-cyan-500/20 flex items-center justify-center">
            {/* Glowing neon green/cyan ring */}
            <div className="absolute inset-1.5 rounded-full border-3 border-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.4)] animate-pulse"></div>
            
            <div className="text-center z-10 space-y-0.5">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">
                SYSTEM
              </span>
              <span className="text-sm font-extrabold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] block">
                ARMED
              </span>
              <span className="text-[9px] font-semibold text-cyan-300 uppercase tracking-wider block">
                SECURE
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Protection Toggles Grid */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-0.5 block">
            Real-Time Protection
          </span>

          <div className="grid grid-cols-2 gap-2">
            {/* Pocket Theft Detection */}
            <div className="p-2.5 rounded-xl bg-[#0D182A] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-white block leading-tight">
                  Pocket Theft
                </span>
                <span className="text-[9px] text-slate-400">Proximity Sensor</span>
              </div>
              <button
                type="button"
                onClick={() => setPocketTheft(!pocketTheft)}
                className={`w-7 h-4 rounded-full transition-colors relative p-0.5 ${
                  pocketTheft ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white transition-transform ${
                    pocketTheft ? 'translate-x-3' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Motion / Movement Alarm */}
            <div className="p-2.5 rounded-xl bg-[#0D182A] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-white block leading-tight">
                  Motion Alarm
                </span>
                <span className="text-[9px] text-slate-400">Accelerometer</span>
              </div>
              <button
                type="button"
                onClick={() => setMotionAlarm(!motionAlarm)}
                className={`w-7 h-4 rounded-full transition-colors relative p-0.5 ${
                  motionAlarm ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white transition-transform ${
                    motionAlarm ? 'translate-x-3' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Charger Unplug Alert */}
            <div className="p-2.5 rounded-xl bg-[#0D182A] border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-white block leading-tight">
                  Charger Alert
                </span>
                <span className="text-[9px] text-emerald-400">Unplug Siren</span>
              </div>
              <button
                type="button"
                onClick={() => setChargerAlert(!chargerAlert)}
                className={`w-7 h-4 rounded-full transition-colors relative p-0.5 ${
                  chargerAlert ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white transition-transform ${
                    chargerAlert ? 'translate-x-3' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* SIM Card Change Lock */}
            <div className="p-2.5 rounded-xl bg-[#0D182A] border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-white block leading-tight">
                  SIM Change Lock
                </span>
                <span className="text-[9px] text-emerald-400">Auto Lockdown</span>
              </div>
              <button
                type="button"
                onClick={() => setSimLock(!simLock)}
                className={`w-7 h-4 rounded-full transition-colors relative p-0.5 ${
                  simLock ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white transition-transform ${
                    simLock ? 'translate-x-3' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* GPS Live Map Tracking Card */}
        <div className="p-2.5 rounded-xl bg-[#0D182A] border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Interactive GPS / Map</span>
            </span>
            <span className="text-[9px] text-emerald-400 font-mono">LIVE TRACKING</span>
          </div>

          {/* Stylized Dark Map Preview */}
          <div className="h-14 rounded-lg bg-[#070D18] border border-slate-800/80 relative overflow-hidden flex items-center justify-center">
            {/* Grid Map Lines */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            />
            {/* Target Pin */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/40">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
              </div>
              <span className="text-[8px] font-mono text-slate-300 mt-0.5">Device Lat: 28.6139°</span>
            </div>
          </div>
        </div>

        {/* Recent Security Activity & Intruder Selfie Alert */}
        <div className="p-2.5 rounded-xl bg-[#0D182A] border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-white block leading-tight">
                Intruder Alert!
              </span>
              <span className="text-[9px] text-slate-400">Silent front camera capture ready</span>
            </div>
          </div>
          <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            Armed
          </span>
        </div>
      </div>

      {/* Bottom Emergency Action Bar */}
      <div className="p-2.5 bg-[#050B14] border-t border-slate-900 flex items-center gap-2 shrink-0">
        <button
          type="button"
          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/60"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Remote Alarm · Lock Screen Ready</span>
        </button>
      </div>

      {/* Home Indicator */}
      <div className="w-full h-2.5 bg-[#050B14] flex items-center justify-center shrink-0 pb-1">
        <div className="w-16 h-1 rounded-full bg-slate-700"></div>
      </div>
    </div>
  );
};
