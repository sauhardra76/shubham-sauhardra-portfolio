import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { Menu, X, ArrowUpRight, Compass, Camera } from 'lucide-react';
import { useCustomLogo } from '../hooks/useCustomLogo';

interface NavbarProps {
  onOpenPdfModal?: () => void;
  onOpenLogoModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogoModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { personal } = PORTFOLIO_DATA;
  const { logoUrl } = useCustomLogo();

  const navLinks = [
    { label: '~/about', href: '#about' },
    { label: '~/services', href: '#services' },
    { label: '~/android', href: '#android-apps' },
    { label: '~/crm', href: '#crm-projects' },
    { label: '~/deployments', href: '#live-websites' },
    { label: '~/pipeline', href: '#process' },
    { label: '~/contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#05070D]/90 backdrop-blur-xl border-b border-sky-500/20 text-white transition-all font-mono">
      {/* Topmost Developer Telemetry Ticker Bar */}
      <div className="bg-[#030408] border-b border-white/[0.05] px-4 py-1 text-[10px] text-slate-400 flex items-center justify-between overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>NODE: ACTIVE (linux-arm64)</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-sky-300">GIT: main* (v2.8.4)</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-indigo-300">CPU LOAD: 1.8%</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="text-amber-400 font-bold">SYS_LATENCY: 12ms</span>
          <span>UPTIME: 99.98%</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Developer IDE Badge & Custom Logo */}
        <div className="flex items-center gap-3.5 whitespace-nowrap shrink-0">
          {/* Logo Container with Upload Trigger */}
          <div className="relative group/logo">
            <button
              type="button"
              onClick={onOpenLogoModal}
              title="Click to upload your image or change logo"
              aria-label="Upload custom image to logo"
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A1022] to-[#04060C] border border-sky-500/50 flex items-center justify-center shadow-[0_0_18px_rgba(56,189,248,0.2)] hover:border-sky-400 hover:shadow-[0_0_24px_rgba(56,189,248,0.4)] transition-all overflow-hidden cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${personal.name} Logo`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-mono text-sm font-extrabold text-sky-400 tracking-tighter">
                  &gt;_
                </span>
              )}

              {/* Hover Overlay with Camera Icon */}
              <div className="absolute inset-0 bg-[#05070D]/75 opacity-0 group-hover/logo:opacity-100 flex items-center justify-center transition-opacity text-sky-300">
                <Camera className="w-4 h-4 text-sky-300" />
              </div>
            </button>

            {/* Small Camera Badge */}
            <button
              type="button"
              onClick={onOpenLogoModal}
              title="Upload photo / logo"
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-sky-500 hover:bg-sky-400 border border-[#05070D] flex items-center justify-center shadow-xs cursor-pointer transition-transform hover:scale-110"
            >
              <Camera className="w-2.5 h-2.5 text-slate-950 font-bold" />
            </button>
          </div>

          <a
            href="#"
            className="flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-0.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors font-sans">
                {personal.name}
              </span>
              <span className="px-2 py-0.5 rounded bg-sky-500/15 border border-sky-400/40 text-[9px] font-mono text-sky-300 font-bold hidden sm:flex items-center gap-1 shadow-xs">
                <span>DEV_SR.TS</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:block tracking-wider font-mono">
              shubham@dev-station:~$
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Developer CLI syntax) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-sky-300 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-sky-400 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200 whitespace-nowrap shrink-0"
            >
              <span className="text-sky-500">$</span> {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 transition-all whitespace-nowrap active:scale-95 border border-sky-400/30"
          >
            <span>&gt; execute_contact()</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#07080D]/95 border-b border-white/[0.08] px-4 pt-2 pb-6 space-y-3 backdrop-blur-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/[0.06] rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            {onOpenLogoModal && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogoModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-400/30 transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-sky-400" />
                <span>Upload Custom Logo / Photo</span>
              </button>
            )}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
