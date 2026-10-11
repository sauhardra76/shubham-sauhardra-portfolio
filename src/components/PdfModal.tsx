import React, { useState } from 'react';
import { generatePortfolioPdf } from '../utils/pdfGenerator';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { X, Download, Printer, FileText, CheckCircle2, Loader2 } from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const { personal, services, androidApps, crmProjects, liveWebsites } = PORTFOLIO_DATA;

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    try {
      generatePortfolioPdf();
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setTimeout(() => {
        setDownloading(false);
      }, 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0D1222] rounded-2xl shadow-2xl border border-white/[0.1] overflow-hidden my-8 text-white">
        {/* Header */}
        <div className="bg-[#090C16] text-white px-6 py-5 flex items-start justify-between gap-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-white font-display">
                Download Official IT Portfolio PDF
              </h3>
              <p className="text-xs text-sky-400 mt-0.5 font-mono">
                File: <code>Shubham_Sauhardra_IT_Portfolio.pdf</code>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Close PDF modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Document Summary */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Document Contents (A4 Multi-Page Layout):
              </span>
              <span className="text-[11px] font-mono text-sky-400 font-semibold">
                3 Pages Complete
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Personal Profile &amp; Overview</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>All 7 Professional Services (inc. Web3)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>All 5 Android Applications (inc. AndroPrompt CLI)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>All 3 CRM &amp; Software Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>All 5 Live Websites with Verified Links</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>5-Step Structured Process</span>
              </div>
            </div>
          </div>

          {/* Color & Format Standard Notice */}
          <div className="text-xs text-slate-400 leading-relaxed bg-white/[0.02] p-3.5 rounded-lg border border-white/[0.06] font-mono">
            Formatted to professional international A4 dimensions with Dark Obsidian header structures and Electric Azure accents.
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* Primary Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Vector PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download My Portfolio PDF</span>
                </>
              )}
            </button>

            {/* Print / Save as PDF Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print or Save as PDF via Browser Dialog</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#090C16] border-t border-white/[0.08] text-right">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white font-mono cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
