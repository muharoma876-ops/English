import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Crosshair,
  PenTool,
  FileText,
  LayoutGrid,
  Sparkles,
  Zap
} from 'lucide-react';
import { ViewMode } from '../../types/presentation';

interface PresentationControlBarProps {
  currentSlideIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  isPlayingAuto: boolean;
  onToggleAutoPlay: () => void;
  laserActive: boolean;
  onToggleLaser: () => void;
  drawActive: boolean;
  onToggleDraw: () => void;
  ambientPlaying: boolean;
  onToggleAmbient: () => void;
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
  onOpenCoach: () => void;
}

export function PresentationControlBar({
  currentSlideIndex,
  totalSlides,
  onPrev,
  onNext,
  isPlayingAuto,
  onToggleAutoPlay,
  laserActive,
  onToggleLaser,
  drawActive,
  onToggleDraw,
  ambientPlaying,
  onToggleAmbient,
  viewMode,
  onSetViewMode,
  onOpenCoach,
}: PresentationControlBarProps) {
  const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <div className="w-full bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-4 sm:px-6 py-2.5 z-30 select-none">
      {/* Subtle top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Navigation Buttons & Slide Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={onPrev}
              disabled={currentSlideIndex === 0}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:text-slate-300 transition-colors"
              title="Previous Slide (Left Arrow / PageUp)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onNext}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 disabled:hover:text-slate-300 transition-colors"
              title="Next Slide (Right Arrow / Space / PageDown)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-baseline gap-1.5 font-mono text-xs">
            <span className="font-bold text-amber-400">
              0{currentSlideIndex + 1}
            </span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">
              0{totalSlides}
            </span>
          </div>

          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

          {/* Autoplay toggle */}
          <button
            onClick={onToggleAutoPlay}
            className={`p-1.5 rounded-lg border text-xs transition-colors hidden sm:flex items-center gap-1.5 ${
              isPlayingAuto
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
            title="Auto-play slides (5s intervals)"
          >
            {isPlayingAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{isPlayingAuto ? 'Pause' : 'Autoplay'}</span>
          </button>
        </div>

        {/* Center: Presentation Tool Toggles */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Laser Pointer */}
          <button
            onClick={onToggleLaser}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              laserActive
                ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-sm shadow-red-500/20'
                : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            title="Toggle Laser Pointer (Key: L)"
          >
            <Crosshair className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden md:inline">Laser</span>
          </button>

          {/* Draw Pen */}
          <button
            onClick={onToggleDraw}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              drawActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            title="Draw on Slide (Key: P)"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Annotate</span>
          </button>

          {/* Ambient Sound */}
          <button
            onClick={onToggleAmbient}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              ambientPlaying
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            title="Toggle Calm Focus Soundtrack (Key: M)"
          >
            {ambientPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="hidden lg:inline">{ambientPlaying ? 'Music On' : 'Ambient'}</span>
          </button>

          {/* Rehearsal AI Coach */}
          <button
            onClick={onOpenCoach}
            className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-amber-300 hover:border-amber-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Open Speech Coach (Key: C)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Coach</span>
          </button>
        </div>

        {/* Right: View Mode Switches */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => onSetViewMode('slideshow')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'slideshow'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Cinematic Slideshow"
          >
            Slide
          </button>

          <button
            onClick={() => onSetViewMode('interactive')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              viewMode === 'interactive'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Interactive Workshop Widgets"
          >
            <Zap className="w-3 h-3" />
            <span className="hidden sm:inline">Workshop</span>
          </button>

          <button
            onClick={() => onSetViewMode('presenter')}
            className={`p-1 sm:px-2 sm:py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              viewMode === 'presenter'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Presenter Notes & Stopwatch"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Notes</span>
          </button>

          <button
            onClick={() => onSetViewMode('overview')}
            className={`p-1 sm:px-2 sm:py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              viewMode === 'overview'
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Slide Matrix Overview (Key: G or O)"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Grid</span>
          </button>
        </div>
      </div>
    </div>
  );
}
