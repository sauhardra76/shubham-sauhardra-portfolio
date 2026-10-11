import React, { useState } from 'react';
import {
  Building2,
  Users,
  Calendar,
  DollarSign,
  Search,
  Plus,
  Bell,
  Eye,
  CheckCircle2,
  Clock,
  Layers,
  ArrowUpRight,
  TrendingUp,
  MessageSquare,
  PhoneCall,
  Mail,
  PieChart,
  BarChart3,
  Check,
  UserCheck
} from 'lucide-react';

interface RealEstateCrmScreenProps {
  className?: string;
  isEnlarged?: boolean;
}

export const RealEstateCrmScreen: React.FC<RealEstateCrmScreenProps> = ({
  className = '',
  isEnlarged = false,
}) => {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const viewings = [
    { client: 'Rahul Sharma', agent: 'Asha Sen', property: '3 BHK Luxury - Bandra', time: '09:00 AM', status: 'Viewing Confirmed', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    { client: 'Preeti Shah', agent: 'Amit Roy', property: 'Retail Space - DLF', time: '08:30 AM', status: 'Rescheduled', badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
    { client: 'Karan Singh', agent: 'Sonia Nair', property: 'Golf View Villa - Pune', time: '01:15 PM', status: 'On-site Showing', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { client: 'Rohan Das', agent: 'Sonia Nair', property: 'Golf View Villa - Pune', time: '03:45 PM', status: 'Completed', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  ];

  return (
    <div
      className={`w-full h-full bg-[#0C1322] text-slate-200 flex flex-col font-sans select-none overflow-hidden ${className}`}
    >
      {/* Top Application Bar */}
      <div className="px-4 py-2 bg-[#090E1A] border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo with Cyan Isometric Building Icon */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400 shadow-sm shadow-teal-500/20">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-extrabold text-white tracking-tight">
              PropFlow <span className="text-teal-400">CRM</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
            <Search className="w-3 h-3 text-slate-500" />
            <span>Search properties, leads, agents, deals...</span>
          </div>
        </div>

        {/* Action Buttons: + Add Lead (green), + New Property (cyan), + Book View (purple) */}
        <div className="flex items-center gap-1.5">
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[9.5px] font-semibold transition-colors">
            <Plus className="w-3 h-3" />
            <span>Add Lead</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[9.5px] font-semibold transition-colors">
            <Plus className="w-3 h-3" />
            <span>New Property</span>
          </div>
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[9.5px] font-semibold transition-colors">
            <Eye className="w-3 h-3" />
            <span>Book View</span>
          </div>
          <div className="relative p-1 text-slate-400">
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          </div>
          <div className="text-right hidden sm:block leading-none">
            <span className="text-[10px] font-bold text-white block">Global Agency</span>
            <span className="text-[8px] text-slate-400">Admin</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-28 sm:w-36 bg-[#090E1A] border-r border-slate-800/80 p-2 space-y-0.5 shrink-0 hidden md:block">
          {[
            'Dashboard',
            'Lead Management',
            'Property Inventory',
            'Sales Pipeline',
            'Client CRM',
            'Commissions',
            'Agent Performance',
            'Reports',
            'Settings'
          ].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveNav(item)}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors flex items-center gap-2 ${
                activeNav === item
                  ? 'bg-teal-500/15 text-teal-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{item}</span>
            </button>
          ))}
        </div>

        {/* Content View */}
        <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto no-scrollbar">
          {/* Top 4 KPI Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Total Listings */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-slate-400 uppercase font-medium">Total Listings</span>
                <span className="text-[8px] text-teal-400 font-bold bg-teal-950/60 px-1 py-0.2 rounded">+126 new</span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm font-bold text-white">3,842</span>
              </div>
              <div className="flex items-center justify-between text-[8px] text-slate-400 mt-1">
                <span>2,145 Active</span>
                <span>1,697 Sold</span>
              </div>
            </div>

            {/* Lead Conversion Rate */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[9px] text-slate-400 block uppercase font-medium">Lead Conversion</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm font-bold text-white">24.8%</span>
                <span className="text-[8px] text-teal-400 font-semibold">↑</span>
              </div>
              <div className="text-[8px] text-slate-400 mt-1 truncate">
                482 New Leads · 86 Converted
              </div>
            </div>

            {/* Total Revenue & Pipeline */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[9px] text-slate-400 block uppercase font-medium">Total Revenue</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm font-bold text-teal-400">$48.4M</span>
              </div>
              <div className="flex items-center justify-between text-[8px] text-slate-400 mt-1">
                <span>81% Targeted</span>
                <span className="text-amber-400">$6.6M Escrow</span>
              </div>
            </div>

            {/* Pending Viewings */}
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[9px] text-slate-400 block uppercase font-medium">Pending Viewings</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm font-bold text-white">124</span>
                <span className="text-[8.5px] text-slate-400">Scheduled</span>
              </div>
              <div className="text-[8px] text-slate-400 mt-1">
                32 To-Do · 12 On-Site
              </div>
            </div>
          </div>

          {/* Property Deals & Sales Pipeline (Visual Kanban) */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                <span>Property Deals &amp; Sales Pipeline</span>
              </span>
              <span className="text-[9px] text-slate-400">Live Stage Tracker</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px]">
              {/* Stage 1: New Lead */}
              <div className="p-2 rounded-lg bg-sky-950/40 border border-sky-900/50 space-y-1">
                <span className="text-[9px] font-bold text-sky-400 uppercase block">New Lead</span>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="font-semibold text-white block leading-tight">Anaya Reddy</span>
                  <span className="text-[8px] text-slate-400 block">3 BHK Apt · Bandra</span>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[8.5px] font-bold text-teal-400">$1.2M</span>
                    <span className="px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[7px] font-bold">High Priority</span>
                  </div>
                </div>
              </div>

              {/* Stage 2: Contacted */}
              <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-900/50 space-y-1">
                <span className="text-[9px] font-bold text-amber-400 uppercase block">Contacted</span>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="font-semibold text-white block leading-tight">Sanjay Gupta</span>
                  <span className="text-[8px] text-slate-400 block">Luxury Villa · Goa</span>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[8.5px] font-bold text-teal-400">$2.4M</span>
                    <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[7px] font-bold">Pending Call</span>
                  </div>
                </div>
              </div>

              {/* Stage 3: Site Visit / Showing */}
              <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-900/50 space-y-1">
                <span className="text-[9px] font-bold text-purple-400 uppercase block">Site Visit / Showing</span>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="font-semibold text-white block leading-tight">Vikram Shah</span>
                  <span className="text-[8px] text-slate-400 block">Retail Space · DLF</span>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[8.5px] font-bold text-teal-400">$2.4M</span>
                    <span className="text-[7.5px] text-purple-300">Re-visit Scheduled</span>
                  </div>
                </div>
              </div>

              {/* Stage 4: Negotiation */}
              <div className="p-2 rounded-lg bg-orange-950/40 border border-orange-900/50 space-y-1">
                <span className="text-[9px] font-bold text-orange-400 uppercase block">Negotiation</span>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="font-semibold text-white block leading-tight">Preeti Sharma</span>
                  <span className="text-[8px] text-slate-400 block">Penthouse · Bengaluru</span>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[8.5px] font-bold text-teal-400">$850K</span>
                    <span className="text-[7.5px] text-orange-300">Offer Sent</span>
                  </div>
                </div>
              </div>

              {/* Stage 5: Closed Won */}
              <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[9px] font-bold text-emerald-400 uppercase block">Closed Won</span>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 space-y-0.5">
                  <span className="font-semibold text-white block leading-tight">Preeti Sharma</span>
                  <span className="text-[8px] text-slate-400 block">Penthouse · Bengaluru</span>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[8.5px] font-bold text-emerald-400">$850K</span>
                    <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[7px] font-bold">Contract Signed ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Grid: Live Property Viewings & Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Viewings Table */}
            <div className="lg:col-span-7 p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-teal-400" />
                  <span>Live Property Viewings &amp; Appointments</span>
                </span>
                <span className="text-[9px] text-slate-400 font-normal">Active Today</span>
              </div>

              <div className="space-y-1 text-[9.5px]">
                {viewings.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800/60 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-semibold text-white block leading-tight">{v.client}</span>
                      <span className="text-[8px] text-slate-400">Agent: {v.agent} · {v.property} ({v.time})</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${v.badge}`}>
                      {v.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Commissions & Revenue Analytics */}
            <div className="lg:col-span-5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <PieChart className="w-3.5 h-3.5 text-teal-400" />
                  <span>Broker Commissions &amp; Revenue</span>
                </span>
                <span className="text-[9px] text-teal-400 font-mono">Real-Time</span>
              </div>

              {/* Mini Donut & Metrics */}
              <div className="flex items-center justify-between pt-1 text-[9px] text-slate-300">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>Direct Sale (48%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Broker Referral (32%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Online Leads (20%)</span>
                  </div>
                </div>

                {/* SVG Mini Donut */}
                <div className="w-14 h-14 relative flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#1E293B" strokeWidth="4" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#0EA5E9" strokeWidth="4" strokeDasharray="45 100" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-45" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-75" />
                  </svg>
                  <span className="absolute text-[8px] font-bold text-white">$48M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Feed: Recent Interactions & Communications Log */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-white block">
              Recent Interactions &amp; Communication Log
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[9px]">
              <div className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">WhatsApp to Rajiv Sen</span>
                  <span className="text-[8px] text-slate-400">Price catalog sent</span>
                </div>
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              </div>

              <div className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">Site Visit Call: Ananya</span>
                  <span className="text-[8px] text-slate-400">Callback scheduled</span>
                </div>
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              </div>

              <div className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white block">Email: Registration reminder</span>
                  <span className="text-[8px] text-slate-400">Broadcast to 45 leads</span>
                </div>
                <Mail className="w-3.5 h-3.5 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
