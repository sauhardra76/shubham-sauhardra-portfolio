import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import {
  Phone,
  Mail,
  MessageCircle,
  Linkedin,
  Send,
  Copy,
  Check,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Card3D } from './Card3D';

interface ContactProps {
  selectedService: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedService }) => {
  const { personal, services } = PORTFOLIO_DATA;

  // Form state
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [projectType, setProjectType] = useState(selectedService || 'Website Development');
  const [requirements, setRequirements] = useState('');

  // Submission handler state
  const [inquiryPrepared, setInquiryPrepared] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');

  // Update project type when selected from Services section
  useEffect(() => {
    if (selectedService) {
      setProjectType(selectedService);
    }
  }, [selectedService]);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!visitorName.trim() || !visitorEmail.trim() || !requirements.trim()) {
      setFormError('Please fill in your name, email, and project requirements.');
      return;
    }

    // Format the inquiry text
    const summary = [
      `PROJECT INQUIRY FOR SHUBHAM SAUHRADRA`,
      `====================================`,
      `Client Name: ${visitorName}`,
      `Client Email: ${visitorEmail}`,
      visitorPhone ? `Client Phone: ${visitorPhone}` : `Client Phone: Not provided`,
      `Project Category: ${projectType}`,
      `Requirements / Message:`,
      requirements,
      `====================================`,
      `Sent via Shubham Sauhardra IT Portfolio`
    ].join('\n');

    setInquiryPrepared(summary);

    // If real developer email is provided, trigger mailto
    if (personal.email && personal.email.trim() !== '') {
      const subject = encodeURIComponent(`Project Inquiry: ${projectType} - ${visitorName}`);
      const body = encodeURIComponent(summary);
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    }
  };

  const handleCopyInquiry = () => {
    if (!inquiryPrepared) return;
    navigator.clipboard.writeText(inquiryPrepared).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const isPhoneConfigured = Boolean(personal.mobileNumber && personal.mobileNumber.trim() !== '');
  const isEmailConfigured = Boolean(personal.email && personal.email.trim() !== '');
  const isWhatsappConfigured = Boolean(personal.whatsappNumber && personal.whatsappNumber.trim() !== '');
  const isLinkedInConfigured = Boolean(personal.linkedInUrl && personal.linkedInUrl.trim() !== '');

  return (
    <section id="contact" className="py-24 bg-[#07080D] border-b border-white/[0.08] relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header with Reveal Animation */}
        <ScrollReveal direction="up" distance={20} className="max-w-3xl mb-14">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 mb-2.5 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-sky-400" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Contact &amp; Project Inquiry
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Reach out directly for freelance contracts, business website development, CRM projects, or IT support.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left Column: Direct Contact Details & Owner Status */}
          <ScrollReveal direction="up" distance={24} delay={100} className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-1.5">
                {personal.name}
              </h3>
              <p className="text-sm text-sky-400 font-mono mb-4">
                {personal.title}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect via direct message or project inquiry. Real contact channels activate as soon as details are provided in configuration.
              </p>
            </div>

            {/* Direct Connect Buttons (Conditioned strictly on real values) */}
            <div className="space-y-3.5">
              {/* Call Channel */}
              <div className="p-4 rounded-xl border border-white/[0.07] bg-[#0D1222]/90 flex items-center justify-between gap-4 hover:border-sky-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Mobile Phone</span>
                    <span className="text-xs text-slate-400 font-mono">
                      {isPhoneConfigured ? personal.mobileNumber : 'To be provided by owner'}
                    </span>
                  </div>
                </div>

                {isPhoneConfigured ? (
                  <a
                    href={`tel:${personal.mobileNumber}`}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition-colors shadow-sm"
                  >
                    Call Now
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500 bg-white/[0.03] border border-white/[0.06] px-2 py-1 rounded">
                    Pending
                  </span>
                )}
              </div>

              {/* Email Channel */}
              <div className="p-4 rounded-xl border border-white/[0.07] bg-[#0D1222]/90 flex items-center justify-between gap-4 hover:border-sky-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Email Address</span>
                    <span className="text-xs text-slate-400 font-mono">
                      {isEmailConfigured ? personal.email : 'To be provided by owner'}
                    </span>
                  </div>
                </div>

                {isEmailConfigured ? (
                  <a
                    href={`mailto:${personal.email}`}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition-colors shadow-sm"
                  >
                    Send Email
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500 bg-white/[0.03] border border-white/[0.06] px-2 py-1 rounded">
                    Pending
                  </span>
                )}
              </div>

              {/* WhatsApp Channel */}
              <div className="p-4 rounded-xl border border-white/[0.07] bg-[#0D1222]/90 flex items-center justify-between gap-4 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">WhatsApp</span>
                    <span className="text-xs text-slate-400 font-mono">
                      {isWhatsappConfigured ? `+${personal.whatsappNumber}` : 'To be provided by owner'}
                    </span>
                  </div>
                </div>

                {isWhatsappConfigured ? (
                  <a
                    href={`https://wa.me/${personal.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
                  >
                    Chat on WhatsApp
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500 bg-white/[0.03] border border-white/[0.06] px-2 py-1 rounded">
                    Pending
                  </span>
                )}
              </div>

              {/* LinkedIn Channel */}
              <div className="p-4 rounded-xl border border-white/[0.07] bg-[#0D1222]/90 flex items-center justify-between gap-4 hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">LinkedIn Profile</span>
                    <span className="text-xs text-slate-400 font-mono">
                      {isLinkedInConfigured ? 'in/shubham-sauhardra' : 'To be provided by owner'}
                    </span>
                  </div>
                </div>

                {isLinkedInConfigured ? (
                  <a
                    href={personal.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
                  >
                    View LinkedIn
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500 bg-white/[0.03] border border-white/[0.06] px-2 py-1 rounded">
                    Pending
                  </span>
                )}
              </div>
            </div>

            {/* Project Delivery Assurance Card */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.07] flex items-start gap-3 text-xs text-slate-400">
              <div className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold text-white font-mono">Professional Consultation &amp; Delivery</p>
                <p className="mt-0.5 leading-relaxed text-slate-400">
                  Every engagement includes transparent milestones, clean code architecture, cross-device responsiveness testing, and prompt technical support.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Project Inquiry Form */}
          <ScrollReveal direction="up" distance={24} delay={200} className="lg:col-span-7">
            <Card3D glowColor="cyan">
              <div className="bg-[#0D1222]/95 rounded-2xl border border-white/[0.08] p-6 sm:p-8 shadow-2xl">
              <div className="mb-6 pb-4 border-b border-white/[0.08]">
                <h3 className="text-lg font-bold text-white font-display">
                  Send a Project Inquiry
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill in your project requirements below to formulate an inquiry or start a conversation.
                </p>
              </div>

              {formError && (
                <div className="mb-5 p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#080B14] border border-white/[0.1] focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-white placeholder-slate-600 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Your Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#080B14] border border-white/[0.1] focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-white placeholder-slate-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone (Optional) */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#080B14] border border-white/[0.1] focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-white placeholder-slate-600 transition-colors"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Project Category <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#080B14] border border-white/[0.1] focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-white transition-colors"
                    >
                      {services.map((srv) => (
                        <option key={srv.id} value={srv.title} className="bg-[#0D1222] text-white">
                          {srv.title}
                        </option>
                      ))}
                      <option value="Android App Development" className="bg-[#0D1222] text-white">Android App Development</option>
                      <option value="Custom CRM System" className="bg-[#0D1222] text-white">Custom CRM System</option>
                      <option value="IT Infrastructure Support" className="bg-[#0D1222] text-white">IT Infrastructure Support</option>
                      <option value="General Consultation" className="bg-[#0D1222] text-white">General Consultation</option>
                    </select>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                    Project Requirements &amp; Details <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Briefly describe what you want to build, key timeline requirements, or questions..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#080B14] border border-white/[0.1] focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none text-white placeholder-slate-600 transition-colors"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>
                      {isEmailConfigured ? 'Submit Inquiry via Email Client' : 'Compile & Prepare Inquiry'}
                    </span>
                  </button>
                </div>
              </form>

              {/* Prepared Inquiry Summary & Transparent Form Instructions */}
              {inquiryPrepared && (
                <div className="mt-6 p-4 rounded-xl bg-[#080B14] border border-sky-400/40 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                      <Check className="w-4 h-4 text-emerald-400" />
                      Inquiry Compiled Successfully
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyInquiry}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-400/30 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
                    </button>
                  </div>

                  <pre className="p-3 rounded-lg bg-black/50 text-sky-200 text-xs font-mono whitespace-pre-wrap max-h-48 overflow-y-auto border border-white/[0.06]">
                    {inquiryPrepared}
                  </pre>

                  <div className="text-[11px] text-slate-400 leading-normal">
                    {isEmailConfigured ? (
                      <p>
                        A draft email has been opened in your default email application addressed to <strong className="text-white">{personal.email}</strong>. If your mail client did not open automatically, simply copy the text above and send it manually.
                      </p>
                    ) : (
                      <p>
                        The inquiry message has been compiled above. You can copy it to clipboard to send via WhatsApp, email, or direct message once contact details are provided.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Transparent Form Submission Explanation */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] text-xs text-slate-500 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Submission Configuration:</strong> When the owner provides an email in <code className="text-slate-300 font-mono">portfolioData.ts</code>, this form automatically dispatches via client mailto.
                </p>
              </div>
            </div>
          </Card3D>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
