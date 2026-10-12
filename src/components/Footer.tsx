import React from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { ArrowUp, Shield, Phone, Mail, MessageCircle, Linkedin } from 'lucide-react';
import { useCustomLogo } from '../hooks/useCustomLogo';
import { GitHubActivity } from './GitHubActivity';

export const Footer: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;
  const { logoUrl } = useCustomLogo();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05060A] text-slate-400 border-t border-white/[0.08] pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#090C16] border border-sky-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.15)] overflow-hidden">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={personal.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-mono text-base font-extrabold text-sky-400">SS</span>
                )}
              </div>
              <div>
                <span className="text-base font-bold text-white block">
                  {personal.name}
                </span>
                <span className="text-xs text-sky-400 font-mono">
                  {personal.title}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Independent IT professional delivering secure, scalable, and efficient technology solutions across Web Development, Cybersecurity, Web3, Software &amp; CRM Systems, and IT Infrastructure Support.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                {personal.mobileNumber && (
                  <a
                    href={`tel:${personal.mobileNumber}`}
                    className="p-1.5 rounded-lg bg-white/[0.04] text-slate-300 hover:text-sky-300 hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                    title={`Call: ${personal.mobileNumber}`}
                    aria-label="Call Mobile Phone"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                )}
                {personal.email && (
                  <a
                    href={`mailto:${personal.email}`}
                    className="p-1.5 rounded-lg bg-white/[0.04] text-slate-300 hover:text-sky-300 hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                    title={`Email: ${personal.email}`}
                    aria-label="Send Email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                )}
                {personal.whatsappNumber && (
                  <a
                    href={`https://wa.me/${personal.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/[0.04] text-slate-300 hover:text-emerald-400 hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                    title={`WhatsApp: +${personal.whatsappNumber}`}
                    aria-label="Chat on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                )}
                {personal.linkedInUrl && (
                  <a
                    href={personal.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/[0.04] text-slate-300 hover:text-blue-400 hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                    title="LinkedIn Profile"
                    aria-label="Visit LinkedIn Profile"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About &amp; Skills
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#android-apps" className="hover:text-white transition-colors">
                  Android Applications
                </a>
              </li>
              <li>
                <a href="#crm-projects" className="hover:text-white transition-colors">
                  CRM &amp; Software Projects
                </a>
              </li>
              <li>
                <a href="#live-websites" className="hover:text-white transition-colors">
                  Live Website Contributions
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Working Process
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact &amp; Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Consultation & Availability */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Client Inquiries &amp; Availability
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Available for contract development, enterprise CRM customization, Android mobile solutions, and ongoing IT support.
            </p>
            <div className="pt-1">
              <a
                href="#contact"
                className="text-xs text-sky-400 hover:text-sky-300 font-mono inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Start a Project Consultation</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* GitHub Deployment & Continuous Delivery Telemetry */}
        <div className="py-8 border-b border-white/[0.08]">
          <GitHubActivity repoOwner="sauhardra76" repoName="shubham-sauhardra-portfolio" />
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-600" />
            <span>
              © {new Date().getFullYear()} {personal.name}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>Built with React &amp; TypeScript</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
