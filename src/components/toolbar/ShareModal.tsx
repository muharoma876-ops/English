import React, { useState } from 'react';
import { X, Copy, Check, Share2, ExternalLink, Link2, Monitor, Users } from 'lucide-react';

interface ShareModalProps {
  currentSlideIndex: number;
  totalSlides: number;
  onClose: () => void;
}

export function ShareModal({ currentSlideIndex, totalSlides, onClose }: ShareModalProps) {
  const [copiedGeneral, setCopiedGeneral] = useState(false);
  const [copiedSlide, setCopiedSlide] = useState(false);
  const [copiedInteractive, setCopiedInteractive] = useState(false);

  // Determine base URL safely
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const baseUrl = `${origin}${pathname}`;

  const currentSlideUrl = `${baseUrl}#slide-${currentSlideIndex + 1}`;
  const interactiveUrl = `${baseUrl}?mode=interactive#slide-${currentSlideIndex + 1}`;

  const copyToClipboard = (text: string, type: 'general' | 'slide' | 'interactive') => {
    navigator.clipboard.writeText(text);
    if (type === 'general') {
      setCopiedGeneral(true);
      setTimeout(() => setCopiedGeneral(false), 2000);
    } else if (type === 'slide') {
      setCopiedSlide(true);
      setTimeout(() => setCopiedSlide(false), 2000);
    } else {
      setCopiedInteractive(true);
      setTimeout(() => setCopiedInteractive(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Share Presentation Link
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Main Presentation Link */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1.5">
              <Monitor className="w-3.5 h-3.5 text-amber-400" />
              Direct Presentation Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={baseUrl}
                className="flex-1 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-200 font-mono focus:outline-none select-all"
              />
              <button
                onClick={() => copyToClipboard(baseUrl, 'general')}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copiedGeneral ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedGeneral ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Current Slide Link */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-amber-400" />
                Jump to Current Slide (Slide {currentSlideIndex + 1} of {totalSlides})
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={currentSlideUrl}
                className="flex-1 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-200 font-mono focus:outline-none select-all"
              />
              <button
                onClick={() => copyToClipboard(currentSlideUrl, 'slide')}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors shrink-0 border border-slate-700"
              >
                {copiedSlide ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSlide ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Workshop Link */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              Audience Interactive Workshop Mode
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={interactiveUrl}
                className="flex-1 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-200 font-mono focus:outline-none select-all"
              />
              <button
                onClick={() => copyToClipboard(interactiveUrl, 'interactive')}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors shrink-0 border border-slate-700"
              >
                {copiedInteractive ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedInteractive ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200/90 leading-relaxed">
            Anyone with this link can view the slides in full resolution, participate in the audience poll, run the 60-second micro-challenge, and download their own Action Manifesto.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
