import React from 'react';
import { SlideItem } from '../../types/presentation';
import { X, Check } from 'lucide-react';

interface SlideOverviewGridProps {
  slides: SlideItem[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onClose: () => void;
}

export function SlideOverviewGrid({
  slides,
  currentSlideIndex,
  onSelectSlide,
  onClose,
}: SlideOverviewGridProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col p-6 select-none overflow-y-auto animate-in fade-in duration-200">
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-serif font-bold text-white">
              Slide Matrix & Overview
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any slide to jump immediately · Press Esc to return
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid of slides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 flex-1 items-center">
          {slides.map((slide, idx) => {
            const isCurrent = idx === currentSlideIndex;

            return (
              <div
                key={slide.id}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`group cursor-pointer rounded-2xl overflow-hidden border-2 transition-all transform hover:-translate-y-1.5 duration-200 ${
                  isCurrent
                    ? 'border-amber-400 shadow-xl shadow-amber-500/20 ring-4 ring-amber-400/20'
                    : 'border-slate-800 hover:border-slate-600 bg-slate-900/60'
                }`}
              >
                {/* Thumbnail image */}
                <div className="aspect-video relative overflow-hidden bg-slate-950">
                  <img
                    src={slide.imagePath}
                    alt={slide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[11px] font-mono text-amber-300 font-bold">
                    0{idx + 1}
                  </div>
                  {isCurrent && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Active</span>
                    </div>
                  )}
                </div>

                {/* Text summary */}
                <div className="p-4 bg-slate-900 space-y-1.5">
                  <h3 className="text-sm font-serif font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
