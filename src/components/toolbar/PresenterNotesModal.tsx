import React, { useState, useEffect } from 'react';
import { SlideItem } from '../../types/presentation';
import { Play, Pause, RotateCcw, X, ChevronRight, ChevronLeft, Lightbulb, Clock, MessageSquare, Volume2 } from 'lucide-react';

interface PresenterNotesModalProps {
  slides: SlideItem[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onClose: () => void;
}

export function PresenterNotesModal({
  slides,
  currentSlideIndex,
  onSelectSlide,
  onClose,
}: PresenterNotesModalProps) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const currentSlide = slides[currentSlideIndex];
  const nextSlide = slides[currentSlideIndex + 1] || null;

  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setSecondsElapsed((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-sm font-bold tracking-wide uppercase text-slate-200">
              Presenter Console · Dual View
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Stopwatch */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-amber-200">{formatTime(secondsElapsed)}</span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-slate-400 hover:text-white ml-1"
                title={isTimerRunning ? 'Pause Stopwatch' : 'Start Stopwatch'}
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={() => setSecondsElapsed(0)}
                className="text-slate-400 hover:text-white"
                title="Reset Stopwatch"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body: Split View */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column (5 cols): Slide Previews */}
          <div className="md:col-span-5 space-y-4">
            {/* Current Slide Card */}
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs text-amber-400 font-semibold">
                <span>Current Slide (Live)</span>
                <span className="font-mono">
                  {currentSlideIndex + 1} / {slides.length}
                </span>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden border-2 border-amber-500/60 shadow-lg relative bg-slate-950">
                <img
                  src={currentSlide.imagePath}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 p-3 flex flex-col justify-end text-left">
                  <span className="text-xs font-bold text-amber-400 font-serif">
                    {currentSlide.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Slide Preview */}
            <div>
              <span className="block mb-1.5 text-xs text-slate-400 font-semibold">
                Up Next
              </span>
              {nextSlide ? (
                <div
                  onClick={() => onSelectSlide(currentSlideIndex + 1)}
                  className="aspect-video rounded-xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all cursor-pointer relative bg-slate-950 opacity-80 hover:opacity-100"
                >
                  <img
                    src={nextSlide.imagePath}
                    alt={nextSlide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 p-3 flex flex-col justify-end text-left">
                    <span className="text-xs font-bold text-slate-200 font-serif">
                      {nextSlide.title}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-xs text-slate-500">
                  End of Presentation Deck
                </div>
              )}
            </div>

            {/* Navigation buttons inside console */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onSelectSlide(Math.max(0, currentSlideIndex - 1))}
                disabled={currentSlideIndex === 0}
                className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-medium text-slate-200 flex items-center justify-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev Slide</span>
              </button>
              <button
                onClick={() => onSelectSlide(Math.min(slides.length - 1, currentSlideIndex + 1))}
                disabled={currentSlideIndex === slides.length - 1}
                className="flex-1 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-xs font-semibold text-slate-950 flex items-center justify-center gap-1 transition-colors"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column (7 cols): Speaker Script & Delivery Guidance */}
          <div className="md:col-span-7 space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
            {/* Overview */}
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                Strategic Slide Objective
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-serif">
                {currentSlide.speakerNotes.overview}
              </p>
            </div>

            {/* Stage Delivery Cues */}
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                Presenter Delivery Cues
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentSlide.speakerNotes.deliveryTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-amber-400 font-mono font-bold">{idx + 1}.</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audience Prompt */}
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5 mb-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                Audience Interaction Cue
              </span>
              <p className="text-xs text-amber-200/90 bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg italic">
                {currentSlide.speakerNotes.audienceEngagementPrompt}
              </p>
            </div>

            {/* Slide Pacing target */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Target Duration for this slide:</span>
              <span className="font-mono text-amber-300 font-bold">
                ~{currentSlide.speakerNotes.estimatedMinutes} minutes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
