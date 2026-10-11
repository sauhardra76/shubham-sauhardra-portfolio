import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Calendar,
  CreditCard,
  FileText,
  Bell,
  Search,
  Plus,
  Send,
  CheckCircle2,
  PhoneCall,
  Mail,
  MessageSquare,
  BarChart,
  PieChart,
  UserCheck
} from 'lucide-react';

interface EduScholarCrmScreenProps {
  className?: string;
  isEnlarged?: boolean;
}

export const EduScholarCrmScreen: React.FC<EduScholarCrmScreenProps> = ({
  className = '',
  isEnlarged = false,
}) => {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const alerts = [
    { name: 'Rohan Das', role: 'Grade 10-A', event: 'Unexcused Absence', time: '09:00 AM', status: 'Parent Notified', badge: 'bg-rose-100 text-rose-700' },
    { name: 'Asha Sen', role: 'Staff', event: 'Leave Approved', time: '08:30 AM', status: 'Substitute Assigned', badge: 'bg-blue-100 text-blue-700' },
    { name: 'Rohan Das', role: 'Grade 10-A', event: 'Class Skip', time: '01:15 PM', status: 'In-person Meeting', badge: 'bg-amber-100 text-amber-800' },
  ];

  return (
    <div
      className={`w-full h-full bg-[#F8FAFC] text-slate-800 flex flex-col font-sans select-none overflow-hidden ${className}`}
    >
      {/* Top Application Bar */}
      <div className="px-4 py-2 bg-white border-b border-slate-200 flex items-center justify-between gap-3 shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-900 tracking-tight">
              EduScholar <span className="text-blue-600">CRM</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[10px] text-slate-500">
            <Search className="w-3 h-3 text-slate-400" />
            <span>Search students, staff, classes...</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-semibold">
            <Plus className="w-3 h-3" />
            <span>New Admission</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-600 text-white text-[10px] font-semibold">
            <CreditCard className="w-3 h-3" />
            <span>Pay Fees</span>
          </div>
          <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-semibold">
            <Send className="w-3 h-3" />
            <span>Broadcast</span>
          </div>
          <div className="relative p-1 text-slate-600">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          </div>
          <div className="text-right hidden sm:block leading-none">
            <span className="text-[10px] font-bold text-slate-900 block">Principal's</span>
            <span className="text-[8px] text-slate-500">Portal</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-28 sm:w-36 bg-white border-r border-slate-200 p-2 space-y-0.5 shrink-0 hidden md:block">
          {[
            'Dashboard',
            'Student Directory',
            'Parents CRM',
            'Attendance',
            'Fee Manager',
            'Exam & Reports',
            'Notice Board',
            'Settings'
          ].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveNav(item)}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors flex items-center gap-2 ${
                activeNav === item
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{item}</span>
            </button>
          ))}
        </div>

        {/* Content View */}
        <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto no-scrollbar">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Total Students */}
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[9px] text-slate-500 block uppercase font-medium">Total Students</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-sm font-extrabold text-slate-900">1,482</span>
                <span className="text-[8.5px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                  +45 new
                </span>
              </div>
            </div>

            {/* Attendance Today */}
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[9px] text-slate-500 block uppercase font-medium">Attendance Today</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-sm font-extrabold text-slate-900">94.2%</span>
                <span className="text-[8px] text-slate-500 font-mono">1,396 Present</span>
              </div>
            </div>

            {/* Collected Fees */}
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[9px] text-slate-500 block uppercase font-medium">Collected Fees</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-xs font-bold text-slate-900">₹28.4L / ₹35L</span>
                <span className="text-[8px] text-amber-600 font-bold">81% Collected</span>
              </div>
            </div>

            {/* Leads in Pipeline */}
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[9px] text-slate-500 block uppercase font-medium">Leads In Pipeline</span>
              <div className="flex items-baseline justify-between mt-0.5">
                <span className="text-sm font-extrabold text-slate-900">124 Active</span>
                <span className="text-[8px] text-blue-600 font-semibold">32 In-Progress</span>
              </div>
            </div>
          </div>

          {/* Admission & Enrollment Pipeline */}
          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-900">
                Admission &amp; Enrollment Pipeline
              </span>
              <span className="text-[9px] text-slate-500">Academic Year 2026-27</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px]">
              {/* Stage 1 */}
              <div className="p-2 rounded-lg bg-sky-50/60 border border-sky-100 space-y-1">
                <span className="text-[9px] font-bold text-sky-900 block uppercase">New Enquiry</span>
                <div className="p-1.5 rounded bg-white border border-sky-100 shadow-2xs space-y-0.5">
                  <span className="font-semibold text-slate-900 block leading-tight">Aarav Sharma</span>
                  <span className="text-[8px] text-slate-500">Grade 1 · High priority</span>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100 space-y-1">
                <span className="text-[9px] font-bold text-amber-900 block uppercase">In Review</span>
                <div className="p-1.5 rounded bg-white border border-amber-100 shadow-2xs space-y-0.5">
                  <span className="font-semibold text-slate-900 block leading-tight">Priya Patel</span>
                  <span className="text-[8px] text-slate-500">Grade 8 · Docs verified</span>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="p-2 rounded-lg bg-purple-50/60 border border-purple-100 space-y-1">
                <span className="text-[9px] font-bold text-purple-900 block uppercase">Written Test</span>
                <div className="p-1.5 rounded bg-white border border-purple-100 shadow-2xs space-y-0.5">
                  <span className="font-semibold text-slate-900 block leading-tight">Ryan Fernandes</span>
                  <span className="text-[8px] text-slate-500">Grade 8 · Scheduled 10 AM</span>
                </div>
              </div>

              {/* Stage 4 */}
              <div className="p-2 rounded-lg bg-orange-50/60 border border-orange-100 space-y-1">
                <span className="text-[9px] font-bold text-orange-900 block uppercase">Doc Verification</span>
                <div className="p-1.5 rounded bg-white border border-orange-100 shadow-2xs space-y-0.5">
                  <span className="font-semibold text-slate-900 block leading-tight">Anaya Reddy</span>
                  <span className="text-[8px] text-slate-500">Grade 8 · Pending transfer</span>
                </div>
              </div>

              {/* Stage 5 */}
              <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[9px] font-bold text-emerald-900 block uppercase">Enrolled</span>
                <div className="p-1.5 rounded bg-white border border-emerald-100 shadow-2xs space-y-0.5">
                  <span className="font-semibold text-slate-900 block leading-tight">Anaya Reddy</span>
                  <span className="text-[8px] text-emerald-700 font-bold">Fees Paid · Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Alerts & Communication Log */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Active Student Alerts */}
            <div className="lg:col-span-7 p-3 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-slate-900 block">
                Active Student &amp; Staff Alerts
              </span>
              <div className="space-y-1.5 text-[10px]">
                {alerts.map((al, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-slate-900 block leading-tight">{al.name}</span>
                      <span className="text-[8.5px] text-slate-500">{al.role} · {al.event} ({al.time})</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${al.badge}`}>
                      {al.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Communications Log */}
            <div className="lg:col-span-5 p-3 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-slate-900 block">
                Recent Enquiries &amp; Communications Log
              </span>
              <div className="space-y-1.5 text-[9.5px]">
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900 block">SMS to Grade 5 parents</span>
                    <span className="text-[8px] text-slate-500">Term Exam schedule broadcast</span>
                  </div>
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900 block">Inquiry Call: Aaradhya's parent</span>
                    <span className="text-[8px] text-slate-500">Callback scheduled 02:00 PM</span>
                  </div>
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
