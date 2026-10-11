import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  UserCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  Settings,
  Search,
  Plus,
  Bell,
  CheckCircle2,
  Clock,
  Layers,
  BarChart3,
  PieChart,
  UserPlus
} from 'lucide-react';

interface TalentSpaceCrmScreenProps {
  className?: string;
  isEnlarged?: boolean;
}

export const TalentSpaceCrmScreen: React.FC<TalentSpaceCrmScreenProps> = ({
  className = '',
  isEnlarged = false,
}) => {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const attendanceRows = [
    { name: 'John Smith', dept: 'IT', inTime: '09:00 AM', outTime: '06:00 PM', status: 'On Time', badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { name: 'Maria Lopez', dept: 'Sales', inTime: '09:30 AM', outTime: '06:00 PM', status: 'Delayed', badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { name: 'Alex Rivera', dept: 'IT', inTime: '09:00 AM', outTime: '06:00 PM', status: 'WFH', badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { name: 'Maria Smith', dept: 'IT', inTime: '09:00 AM', outTime: '06:00 PM', status: 'Sick Leave', badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
  ];

  return (
    <div
      className={`w-full h-full bg-[#0D131F] text-slate-200 flex flex-col font-sans select-none overflow-hidden ${className}`}
    >
      {/* Top Application Bar */}
      <div className="px-4 py-2.5 bg-[#0B101B] border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-sky-600 flex items-center justify-center text-white">
              <Users className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-white tracking-tight">
              TalentSpace <span className="text-sky-400">CRM</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
            <Search className="w-3 h-3 text-slate-500" />
            <span>Search employees, jobs, pipeline...</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-sky-500 text-white text-[10px] font-semibold">
            <Plus className="w-3 h-3" />
            <span>Add Employee</span>
          </div>
          <div className="relative p-1 text-slate-400">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          </div>
          <div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-600"></div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-28 sm:w-36 bg-[#0B101B] border-r border-slate-800/80 p-2 space-y-1 shrink-0 hidden md:block">
          {['Dashboard', 'Employees', 'Attendance', 'Payroll', 'Recruitment', 'Settings'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveNav(item)}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors flex items-center gap-2 ${
                activeNav === item
                  ? 'bg-sky-500/10 text-sky-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{item}</span>
            </button>
          ))}
        </div>

        {/* Workspace Content */}
        <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto no-scrollbar">
          {/* Top Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[9px] text-slate-400 block uppercase">Active Employees</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-sm font-bold text-white">234</span>
                <span className="text-[9px] text-emerald-400 font-medium">+12%</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[9px] text-slate-400 block uppercase">Onboarding</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-sm font-bold text-white">15</span>
                <span className="text-[9px] text-slate-400">in progress</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[9px] text-slate-400 block uppercase">Open Positions</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-sm font-bold text-white">8</span>
                <span className="text-[9px] text-slate-400">vacant</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[9px] text-slate-400 block uppercase">Leave Requests</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-sm font-bold text-white">12</span>
                <span className="text-[9px] text-amber-400">pending</span>
              </div>
            </div>
          </div>

          {/* Visual Kanban Recruitment Pipeline */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>Visual Kanban Recruitment Pipeline</span>
              </span>
              <span className="text-[9px] text-slate-400">5 Active Stages</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px]">
              {/* Stage 1: Sourcing */}
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Sourcing</span>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="font-semibold text-white block">Jane Doe</span>
                  <span className="text-[8px] text-slate-400 block">Software Engineer</span>
                  <span className="text-[8px] text-sky-400">Review scheduled</span>
                </div>
              </div>

              {/* Stage 2: Applied */}
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Applied</span>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="font-semibold text-white block">Alora Doe</span>
                  <span className="text-[8px] text-slate-400 block">HR Specialist</span>
                  <span className="text-[8px] text-amber-400">Interview scheduler</span>
                </div>
              </div>

              {/* Stage 3: Interviews */}
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Interviews</span>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="font-semibold text-white block">Alex R.</span>
                  <span className="text-[8px] text-slate-400 block">Software Engineer</span>
                  <span className="text-[8px] text-rose-400 font-bold">Urgent</span>
                </div>
              </div>

              {/* Stage 4: Offer Sent */}
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Offer Sent</span>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="font-semibold text-white block">John Smith</span>
                  <span className="text-[8px] text-slate-400 block">Product Designer</span>
                  <span className="text-[8px] text-emerald-400">Review</span>
                </div>
              </div>

              {/* Stage 5: Onboarding */}
              <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1.5 col-span-2 sm:col-span-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Onboarding</span>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="font-semibold text-white block">Alith Soon</span>
                  <span className="text-[8px] text-slate-400 block">Senior QA</span>
                  <span className="text-[8px] text-blue-400">Regitew</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid: Attendance & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Employee Attendance Table */}
            <div className="lg:col-span-7 p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Employee Attendance &amp; Leave Tracker</span>
                </span>
                <span className="text-[9px] text-slate-400 font-normal">Live Log</span>
              </div>

              <div className="space-y-1 text-[10px]">
                {attendanceRows.map((row, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/60 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-white block leading-tight">{row.name}</span>
                      <span className="text-[8.5px] text-slate-400">{row.dept} · In: {row.inTime}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold border ${row.badgeColor}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics & Checklist */}
            <div className="lg:col-span-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Workforce Growth &amp; Turnover</span>
                </span>
                <span className="text-[9px] text-emerald-400 font-mono">100% Task Rate</span>
              </div>

              {/* Mini Trend Graph SVG */}
              <div className="h-14 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-center p-2">
                <svg className="w-full h-full" viewBox="0 0 160 40">
                  <path d="M0 30 Q40 5 80 20 T160 8" fill="none" stroke="#38BDF8" strokeWidth="2" />
                  <path d="M0 35 Q40 25 80 15 T160 30" fill="none" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Pending Checklist */}
              <div className="space-y-1 pt-1 text-[9px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">Review benefits documentation</span>
                  <span className="ml-auto px-1 rounded bg-rose-500/20 text-rose-300 font-bold">High</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">Schedule developer orientation</span>
                  <span className="ml-auto px-1 rounded bg-amber-500/20 text-amber-300 font-bold">Medium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
