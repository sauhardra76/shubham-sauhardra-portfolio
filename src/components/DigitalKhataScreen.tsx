import React from 'react';
import {
  Menu,
  Bell,
  BookOpen,
  Users,
  HardHat,
  FileSpreadsheet,
  Calendar,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Wifi,
  Battery
} from 'lucide-react';

interface DigitalKhataScreenProps {
  className?: string;
  isEnlarged?: boolean;
}

export const DigitalKhataScreen: React.FC<DigitalKhataScreenProps> = ({
  className = '',
  isEnlarged = false,
}) => {
  return (
    <div
      className={`w-full h-full bg-[#1A233A] text-white flex flex-col font-sans select-none overflow-hidden relative ${className}`}
      style={{
        background: 'linear-gradient(180deg, #162035 0%, #111A2D 100%)',
      }}
    >
      {/* Phone Status Bar */}
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

      {/* App Header */}
      <div className="px-4 py-2 flex items-center justify-between shrink-0">
        <button
          type="button"
          aria-label="Menu"
          className="p-1 text-slate-200 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-base font-bold tracking-tight text-white">
          Digital<span className="text-sky-400">Khata</span>
        </span>
        <div className="relative p-1 text-slate-200">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 border border-[#1A233A]"></span>
        </div>
      </div>

      {/* Scrollable Screen Content */}
      <div className="flex-1 px-4 py-2 space-y-3 overflow-y-auto no-scrollbar">
        {/* Glowing Ledger Banner with Financial Line Graph */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#1E2E4F] via-[#1A243D] to-[#121929] border border-sky-500/30 p-3.5 overflow-hidden shadow-lg">
          {/* Subtle neon graph line illustration in background */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
            viewBox="0 0 200 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60 L30 50 L60 55 L90 35 L120 40 L150 20 L180 25 L200 10"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.5"
            />
            <path
              d="M0 70 L40 60 L80 65 L110 50 L150 45 L180 35 L200 30"
              fill="none"
              stroke="#818CF8"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          </svg>

          <div className="relative z-10 flex flex-col items-center text-center py-1">
            {/* Glowing Ledger Book Icon */}
            <div className="relative mb-1">
              <div className="w-14 h-12 rounded-xl bg-gradient-to-tr from-sky-600/30 to-blue-500/20 border border-sky-400/50 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <BookOpen className="w-7 h-7 text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              </div>
            </div>
            {/* Indicator dots */}
            <div className="flex items-center gap-1 mt-1">
              <span className="w-3.5 h-1 rounded-full bg-sky-400"></span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
            </div>
          </div>
        </div>

        {/* 4 Feature Tiles Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Tile 1: Transactions */}
          <div className="p-2.5 rounded-xl bg-white text-slate-800 shadow-sm border border-slate-100 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center mb-1">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                Transactions
              </span>
              <span className="text-[10px] text-slate-500">Udhaar &amp; Jama</span>
            </div>
          </div>

          {/* Tile 2: Customers */}
          <div className="p-2.5 rounded-xl bg-[#FFF7ED] text-slate-800 shadow-sm border border-amber-100 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-1">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                Customers
              </span>
              <span className="text-[10px] text-amber-600/80">Account Balances</span>
            </div>
          </div>

          {/* Tile 3: Suppliers */}
          <div className="p-2.5 rounded-xl bg-[#FAF5FF] text-slate-800 shadow-sm border border-purple-100 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-1">
              <HardHat className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                Suppliers
              </span>
              <span className="text-[10px] text-purple-600/80">Vendor Dues</span>
            </div>
          </div>

          {/* Tile 4: Reports */}
          <div className="p-2.5 rounded-xl bg-[#F0FDF4] text-slate-800 shadow-sm border border-emerald-100 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                Reports
              </span>
              <span className="text-[10px] text-emerald-600/80">PDF Statements</span>
            </div>
          </div>
        </div>

        {/* Financial Summary: Pending vs Paid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-xl bg-white border border-rose-100 shadow-sm text-center">
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
              Pending
            </span>
            <span className="text-sm font-bold text-rose-600">
              ₹s. 230.00
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-emerald-100 shadow-sm text-center">
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
              Paid
            </span>
            <span className="text-sm font-bold text-emerald-600">
              ₹s. 290.00
            </span>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-0.5">
            <span className="font-semibold text-slate-300">Recent Transactions</span>
            <span className="text-sky-400 text-[10px]">View All</span>
          </div>

          {/* Transaction 1 */}
          <div className="p-2 rounded-xl bg-white/95 text-slate-800 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] font-bold text-slate-900 block">
                  Recent transaction
                </span>
                <span className="text-[9px] text-slate-500">12 days ago</span>
              </div>
            </div>
            <div className="text-right leading-tight">
              <span className="text-[11px] font-bold text-emerald-600 block">
                ₹2,900.00
              </span>
              <span className="text-[9px] text-emerald-700/80 font-medium">+50.00</span>
            </div>
          </div>

          {/* Transaction 2 */}
          <div className="p-2 rounded-xl bg-white/95 text-slate-800 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] font-bold text-slate-900 block">
                  Recent transaction
                </span>
                <span className="text-[9px] text-slate-500">10 days ago</span>
              </div>
            </div>
            <div className="text-right leading-tight">
              <span className="text-[11px] font-bold text-rose-600 block">
                -₹1,009.00
              </span>
              <span className="text-[9px] text-rose-700/80 font-medium">-50.00</span>
            </div>
          </div>

          {/* Transaction 3 */}
          <div className="p-2 rounded-xl bg-white/95 text-slate-800 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] font-bold text-slate-900 block">
                  Recent transaction
                </span>
                <span className="text-[9px] text-slate-500">5 days ago</span>
              </div>
            </div>
            <div className="text-right leading-tight">
              <span className="text-[11px] font-bold text-emerald-600 block">
                ₹500.00
              </span>
              <span className="text-[9px] text-slate-500">Received</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar: Add Transaction */}
      <div className="p-3 bg-[#111A2D] border-t border-slate-800/80 flex items-center gap-2 shrink-0">
        <button
          type="button"
          aria-label="Notes"
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
        >
          <BookOpen className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="flex-1 py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-950/40"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Home Navigation Pill Bar */}
      <div className="w-full h-3 bg-[#111A2D] flex items-center justify-center shrink-0 pb-1">
        <div className="w-16 h-1 rounded-full bg-slate-600"></div>
      </div>
    </div>
  );
};
