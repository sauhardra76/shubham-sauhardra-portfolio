import React, { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import { X, Upload, Image as ImageIcon, Trash2, Check, Sparkles, AlertCircle, RefreshCw, ZoomIn } from 'lucide-react';
import { useCustomLogo } from '../hooks/useCustomLogo';

interface UploadLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadLogoModal: React.FC<UploadLogoModalProps> = ({ isOpen, onClose }) => {
  const { logoUrl, updateLogo, clearLogo } = useCustomLogo();
  const [previewUrl, setPreviewUrl] = useState<string | null>(logoUrl);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fitMode, setFitMode] = useState<'cover' | 'contain'>('cover');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview with current logo when modal opens
  useEffect(() => {
    if (isOpen) {
      setPreviewUrl(logoUrl);
      setErrorMsg(null);
      setSuccessMsg(null);
      setImageUrlInput('');
    }
  }, [isOpen, logoUrl]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Compress & resize image to safe size (max 400x400) to keep localStorage lightweight and fast
  const processImageFile = (file: File) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPG, SVG, WebP, GIF).');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        setIsProcessing(false);
        setErrorMsg('Could not read image file.');
        return;
      }

      // Create an image object to downscale if necessary
      const img = new Image();
      img.onload = () => {
        try {
          const maxDim = 512;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedDataUrl = canvas.toDataURL('image/png', 0.92);
            setPreviewUrl(optimizedDataUrl);
            setSuccessMsg('Image ready! Click "Save as Logo" below to apply.');
          } else {
            setPreviewUrl(result);
          }
        } catch {
          setPreviewUrl(result);
        } finally {
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        setIsProcessing(false);
        setErrorMsg('Failed to process image.');
      };

      img.src = result;
    };

    reader.onerror = () => {
      setIsProcessing(false);
      setErrorMsg('Error reading file.');
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (!imageUrlInput.trim()) return;
    setPreviewUrl(imageUrlInput.trim());
    setSuccessMsg('Image URL loaded! Click "Save as Logo" below to apply.');
    setErrorMsg(null);
  };

  const handleSave = () => {
    if (!previewUrl) {
      setErrorMsg('No image selected to save.');
      return;
    }
    updateLogo(previewUrl);
    setSuccessMsg('Logo updated successfully!');
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleResetToDefault = () => {
    clearLogo();
    setPreviewUrl(null);
    setSuccessMsg('Reset to default terminal logo (>_).');
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#080B14] border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.2)] overflow-hidden font-sans text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#05070D] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Upload Logo & Avatar</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-400/30 font-semibold">
                  BRAND IDENTITY
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Customize your logo for the navigation bar, terminal card, and footer.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Status Notifications */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Drag & Drop File Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-sky-400 bg-sky-500/10 scale-[1.01]'
                : 'border-white/[0.12] hover:border-sky-500/40 bg-white/[0.02] hover:bg-white/[0.04]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="mx-auto w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-3 group-hover:scale-105 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>

            <div className="text-sm font-semibold text-white">
              {isProcessing ? 'Processing image...' : 'Click to upload or drag & drop'}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Supports PNG, JPG, JPEG, WEBP, GIF, SVG (up to 10MB)
            </p>
          </div>

          {/* Or Paste Image URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <span>Or use an image web link:</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://example.com/my-photo.jpg"
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#04060C] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 font-mono"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                disabled={!imageUrlInput.trim()}
                className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-sky-500/20 text-xs text-white font-medium border border-white/[0.1] hover:border-sky-400/40 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
              >
                Load
              </button>
            </div>
          </div>

          {/* Live Preview Section */}
          <div className="p-4 rounded-xl bg-[#05070E] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Live Logo Preview</span>
              </span>

              {previewUrl && (
                <div className="flex items-center gap-1.5 bg-[#090C18] p-1 rounded-lg border border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setFitMode('cover')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      fitMode === 'cover' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Cover
                  </button>
                  <button
                    type="button"
                    onClick={() => setFitMode('contain')}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      fitMode === 'contain' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Contain
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-around gap-6 py-3 bg-[#0A0E1C]/60 rounded-xl border border-white/[0.05]">
              {/* Preview 1: Navbar Logo Size (Square/Rounded-xl) */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A1022] to-[#04060C] border-2 border-sky-400/60 p-0.5 flex items-center justify-center shadow-[0_0_18px_rgba(56,189,248,0.25)] overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Logo preview"
                      referrerPolicy="no-referrer"
                      className={`w-full h-full rounded-lg ${fitMode === 'contain' ? 'object-contain' : 'object-cover'}`}
                    />
                  ) : (
                    <span className="font-mono text-base font-extrabold text-sky-400 tracking-tighter">
                      &gt;_
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-400">Header Logo</span>
              </div>

              {/* Preview 2: Circular Avatar */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 rounded-full bg-[#0A1022] border-2 border-sky-400 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Avatar preview"
                      referrerPolicy="no-referrer"
                      className={`w-full h-full rounded-full ${fitMode === 'contain' ? 'object-contain' : 'object-cover'}`}
                    />
                  ) : (
                    <span className="font-mono text-lg font-extrabold text-sky-400">SS</span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-400">Profile Avatar</span>
              </div>

              {/* Preview 3: Terminal Mini Badge */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 rounded-lg bg-[#05070E] border border-sky-500/40 p-0.5 flex items-center justify-center shadow-xs overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Terminal icon preview"
                      referrerPolicy="no-referrer"
                      className={`w-full h-full rounded ${fitMode === 'contain' ? 'object-contain' : 'object-cover'}`}
                    />
                  ) : (
                    <span className="font-mono text-xs font-bold text-sky-400">&gt;</span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-400">Terminal Badge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-[#05070D] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Default (&gt;_)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!previewUrl}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 text-slate-950 font-bold" />
              <span>Save as Logo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
