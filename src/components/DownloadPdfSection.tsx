import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { generatePortfolioPdf } from '../utils/pdfGenerator';
import { Download, FileText, CheckCircle2, Printer, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { Card3D } from './Card3D';

interface DownloadPdfSectionProps {
  onOpenPdfModal: () => void;
}

export const DownloadPdfSection: React.FC<DownloadPdfSectionProps> = ({ onOpenPdfModal }) => {
  const { personal, services, androidApps, crmProjects, liveWebsites } = PORTFOLIO_DATA;
  const [downloading, setDownloading] = useState(false);

  const handleDirectDownload = () => {
    setDownloading(true);
    try {
      generatePortfolioPdf();
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setTimeout(() => {
        setDownloading(false);
      }, 700);
    }
  };

  return (
    <section id="download-pdf" className="py-20 bg-gradient-to-b from-[#07080D] via-[#0A0E1A] to-[#05060A] border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-grid-mesh opacity-40 pointer-events-none" />

      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[130px] pointer-events-none -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <ScrollReveal direction="up" distance={20} className="max-w-4xl mx-auto">
          <Card3D glowColor="cyan" className="rounded-3xl">
            <div className="bg-gradient-to-br from-[#0F1629]/95 via-[#0B1020]/95 to-[#070A14]/95 rounded-3xl p-8 sm:p-12 border border-white/[0.1] shadow-2xl relative overflow-hidden">
              {/* Top Document Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.08] mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shadow-xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block">
                      OFFICIAL PORTFOLIO EXPORT
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Shubham_Sauhardra_IT_Portfolio.pdf
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-emerald-400 font-semibold px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PRINT &amp; OFFLINE READY</span>
                </div>
              </div>

              {/* Main Headline & Call to Action */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                    Download My Complete IT Portfolio Document
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    Get an offline, high-resolution vector PDF containing all verified contact channels, services, mobile app architectures, CRM platforms, and live websites.
                  </p>

                  {/* Checklist of Included Sections */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-300 font-mono">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{services.length} Professional Services</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{androidApps.length} Android Applications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{crmProjects.length} Enterprise CRM Projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{liveWebsites.length} Live Verified Websites</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="lg:col-span-5 flex flex-col gap-3.5 lg:pl-4">
                  {/* Primary Direct Download Button */}
                  <button
                    type="button"
                    onClick={handleDirectDownload}
                    disabled={downloading}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-bold rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-xl shadow-sky-500/30 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer group/btn"
                  >
                    {downloading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Generating Vector PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        <span>Download PDF Portfolio</span>
                      </>
                    )}
                  </button>

                  {/* Secondary Modal Preview / Print Option */}
                  <button
                    type="button"
                    onClick={onOpenPdfModal}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.1] hover:border-sky-400/50 transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-slate-400" />
                    <span>Preview Details &amp; Print Options</span>
                  </button>

                  <div className="text-[11px] text-slate-400 text-center font-mono pt-1">
                    Dimensions: A4 International Standard · Vector Typography
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        </ScrollReveal>
      </div>
    </section>
  );
};
