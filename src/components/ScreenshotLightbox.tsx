import React from 'react';
import { X, ZoomIn } from 'lucide-react';
import { DigitalKhataScreen } from './DigitalKhataScreen';
import { PhoneRakshaScreen } from './PhoneRakshaScreen';
import { CalcOneScreen } from './CalcOneScreen';
import { AstroVedaScreen } from './AstroVedaScreen';
import { AndroidCommandPromptScreen } from './AndroidCommandPromptScreen';
import { TalentSpaceCrmScreen } from './TalentSpaceCrmScreen';
import { EduScholarCrmScreen } from './EduScholarCrmScreen';
import { RealEstateCrmScreen } from './RealEstateCrmScreen';

interface ScreenshotLightboxProps {
  isOpen: boolean;
  title: string;
  imageSrc: string;
  onClose: () => void;
}

export const ScreenshotLightbox: React.FC<ScreenshotLightboxProps> = ({
  isOpen,
  title,
  imageSrc,
  onClose,
}) => {
  if (!isOpen || !imageSrc) return null;

  const isMobileScreen = [
    'digital_khata',
    'digitalkhatatheme',
    'phoneraksha',
    'calcone',
    'astroveda',
    'androprompt',
  ].some((key) => imageSrc.includes(key));

  const isCrmScreen = [
    'talentspace',
    'hr-crm',
    'eduscholar',
    'school-crm',
    'realestate',
    'real-estate',
    'propflow',
  ].some((key) => imageSrc.includes(key));

  const renderMobileScreen = () => {
    if (imageSrc.includes('digital_khata') || imageSrc.includes('digitalkhatatheme')) {
      return <DigitalKhataScreen isEnlarged={true} />;
    }
    if (imageSrc.includes('phoneraksha')) {
      return <PhoneRakshaScreen isEnlarged={true} />;
    }
    if (imageSrc.includes('calcone')) {
      return <CalcOneScreen isEnlarged={true} />;
    }
    if (imageSrc.includes('astroveda')) {
      return <AstroVedaScreen isEnlarged={true} />;
    }
    if (imageSrc.includes('androprompt')) {
      return <AndroidCommandPromptScreen isEnlarged={true} />;
    }
    return null;
  };

  const renderCrmScreen = () => {
    if (imageSrc.includes('talentspace') || imageSrc.includes('hr-crm')) {
      return <TalentSpaceCrmScreen isEnlarged={true} />;
    }
    if (imageSrc.includes('eduscholar') || imageSrc.includes('school-crm')) {
      return <EduScholarCrmScreen isEnlarged={true} />;
    }
    if (imageSrc.includes('realestate') || imageSrc.includes('real-estate') || imageSrc.includes('propflow')) {
      return <RealEstateCrmScreen isEnlarged={true} />;
    }
    return null;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="w-full max-w-5xl flex items-center justify-between text-white pb-3 mb-2 border-b border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <ZoomIn className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-semibold tracking-wide">{title}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close screenshot preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Container */}
      <div
        className="w-full max-w-5xl max-h-[85vh] flex items-center justify-center overflow-hidden py-2"
        onClick={(e) => e.stopPropagation()}
      >
        {isMobileScreen ? (
          <div className="w-[320px] sm:w-[360px] aspect-[9/18.5] rounded-[2.8rem] bg-slate-900 border-[8px] border-slate-800 shadow-2xl overflow-hidden relative flex flex-col">
            {renderMobileScreen()}
          </div>
        ) : isCrmScreen ? (
          <div className="w-full h-[520px] max-h-[80vh] rounded-2xl bg-slate-900 border-[4px] border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="px-4 py-2 bg-slate-800 flex items-center gap-2 border-b border-slate-700 shrink-0">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-slate-300 font-mono ml-2">
                {title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.cloud
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              {renderCrmScreen()}
            </div>
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl border border-slate-800"
            referrerPolicy="no-referrer"
          />
        )}
      </div>

      <p className="text-xs text-slate-400 mt-3 text-center">
        Click anywhere outside or press Close to dismiss.
      </p>
    </div>
  );
};
