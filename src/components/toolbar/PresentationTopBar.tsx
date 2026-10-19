import { Maximize2, Minimize2, Sparkles, Presentation, Share2 } from 'lucide-react';
import { ViewMode } from '../../types/presentation';

interface PresentationTopBarProps {
  currentSlideIndex: number;
  totalSlides: number;
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenCoach: () => void;
  onOpenExport: () => void;
  onOpenShare: () => void;
}

export function PresentationTopBar({
  currentSlideIndex,
  totalSlides,
  viewMode,
  onSetViewMode,
  isFullscreen,
  onToggleFullscreen,
  onOpenCoach,
  onOpenExport,
  onOpenShare,
}: PresentationTopBarProps) {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 z-30 select-none">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
          <Presentation className="w-4 h-4 text-slate-950" />
        </div>
        <span className="text-base font-bold tracking-tight text-white font-serif whitespace-nowrap shrink-0">
          AuraSlides
        </span>
      </div>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
        <button
          onClick={() => onSetViewMode('slideshow')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            viewMode === 'slideshow' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Cinematic Slide
        </button>

        <button
          onClick={() => onSetViewMode('interactive')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            viewMode === 'interactive' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Interactive Workshop
        </button>

        <button
          onClick={() => onSetViewMode('presenter')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            viewMode === 'presenter' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Presenter Console
        </button>

        <button
          onClick={() => onSetViewMode('overview')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
            viewMode === 'overview' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Slide Matrix
        </button>

        <button
          onClick={onOpenCoach}
          className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-slate-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Speech Coach</span>
        </button>
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenShare}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          title="Get presentation share link"
        >
          <Share2 className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Share</span>
        </button>

        <button
          onClick={onToggleFullscreen}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all shadow-md shadow-amber-500/15 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          title="Toggle Fullscreen Presentation"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Present Fullscreen'}</span>
        </button>
      </div>
    </header>
  );
}
