/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INITIAL_SLIDES } from './data/presentationData';
import { ViewMode, UserPledge } from './types/presentation';
import { soundEngine } from './utils/audio';

import { PresentationTopBar } from './components/toolbar/PresentationTopBar';
import { PresentationControlBar } from './components/toolbar/PresentationControlBar';
import { PresenterNotesModal } from './components/toolbar/PresenterNotesModal';
import { SlideOverviewGrid } from './components/toolbar/SlideOverviewGrid';
import { ActionCardExportModal } from './components/toolbar/ActionCardExportModal';
import { AICoachModal } from './components/toolbar/AICoachModal';
import { ShareModal } from './components/toolbar/ShareModal';

import { SlideOne } from './components/presentation/SlideOne';
import { SlideTwo } from './components/presentation/SlideTwo';
import { SlideThree } from './components/presentation/SlideThree';
import { SlideFour } from './components/presentation/SlideFour';
import { LaserPointer } from './components/presentation/LaserPointer';
import { SlideAnnotationLayer } from './components/presentation/SlideAnnotationLayer';

export default function App() {
  const [slides] = useState(INITIAL_SLIDES);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('slideshow');

  // Presentation tool states
  const [laserActive, setLaserActive] = useState(false);
  const [drawActive, setDrawActive] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Modals
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [exportPledge, setExportPledge] = useState<UserPledge | null>(null);

  const slideContainerRef = useRef<HTMLDivElement | null>(null);

  // Sync with initial URL hash (e.g. #slide-2) and mode query parameter
  useEffect(() => {
    try {
      const hash = window.location.hash;
      const match = hash.match(/slide-(\d+)/);
      if (match) {
        const slideNum = parseInt(match[1], 10);
        if (slideNum >= 1 && slideNum <= slides.length) {
          setCurrentSlideIndex(slideNum - 1);
        }
      }

      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      if (mode === 'interactive' || mode === 'presenter' || mode === 'overview') {
        setViewMode(mode);
      }
    } catch {
      // ignore
    }
  }, [slides.length]);

  // Slide navigation with sound cue & URL hash update
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlideIndex(index);
      soundEngine.playTransition();
      try {
        window.history.replaceState(null, '', `#slide-${index + 1}`);
      } catch {
        // ignore
      }
    }
  }, [slides.length]);

  const handleNext = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      goToSlide(currentSlideIndex + 1);
    } else if (isPlayingAuto) {
      goToSlide(0); // loop in autoplay
    }
  }, [currentSlideIndex, slides.length, isPlayingAuto, goToSlide]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }, [currentSlideIndex, goToSlide]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Ambient sound toggle
  const handleToggleAmbient = () => {
    const state = soundEngine.toggleAmbient();
    setAmbientPlaying(state);
  };

  // Autoplay timer
  useEffect(() => {
    let interval: number | null = null;
    if (isPlayingAuto) {
      interval = window.setInterval(() => {
        handleNext();
      }, 6000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingAuto, handleNext]);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing into an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          handlePrev();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'l':
        case 'L':
          e.preventDefault();
          setLaserActive((prev) => !prev);
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setDrawActive((prev) => !prev);
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          handleToggleAmbient();
          break;
        case 'o':
        case 'O':
        case 'g':
        case 'G':
          e.preventDefault();
          setViewMode((v) => (v === 'overview' ? 'slideshow' : 'overview'));
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          setViewMode((v) => (v === 'presenter' ? 'slideshow' : 'presenter'));
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          setIsCoachOpen((prev) => !prev);
          break;
        case 'Escape':
          if (viewMode === 'presenter' || viewMode === 'overview') {
            setViewMode('slideshow');
          }
          if (drawActive) setDrawActive(false);
          if (laserActive) setLaserActive(false);
          setIsCoachOpen(false);
          setIsShareOpen(false);
          setExportPledge(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, viewMode, drawActive, laserActive]);

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#070b14] text-slate-100 font-sans">
      {/* Top Navigation */}
      <PresentationTopBar
        currentSlideIndex={currentSlideIndex}
        totalSlides={slides.length}
        viewMode={viewMode}
        onSetViewMode={setViewMode}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onOpenCoach={() => setIsCoachOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenExport={() =>
          setExportPledge({
            goal: 'Launch the initiative I’ve been hesitating on',
            twoMinuteAction: 'Draft the opening outline and publish',
            scheduledTime: 'Today',
            accountabilityPartner: 'Audience & Self',
            dateSigned: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          })
        }
      />

      {/* Main Slide Presentation Stage Area */}
      <main className="flex-1 relative flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden bg-[#05080f]">
        <div
          ref={slideContainerRef}
          className="relative w-full max-w-7xl h-full max-h-[820px] aspect-[16/9] rounded-2xl shadow-2xl overflow-hidden border border-slate-800/80 bg-slate-950 flex flex-col transition-all duration-300"
        >
          {/* Laser Pointer Overlay */}
          <LaserPointer active={laserActive} containerRef={slideContainerRef} />

          {/* Drawing Annotation Layer */}
          <SlideAnnotationLayer active={drawActive} slideId={currentSlide.id} />

          {/* Slide Renderer based on active index */}
          <div className="w-full h-full relative">
            {currentSlideIndex === 0 && (
              <SlideOne slide={currentSlide} interactiveMode={viewMode === 'interactive'} />
            )}
            {currentSlideIndex === 1 && (
              <SlideTwo slide={currentSlide} interactiveMode={viewMode === 'interactive'} />
            )}
            {currentSlideIndex === 2 && (
              <SlideThree slide={currentSlide} interactiveMode={viewMode === 'interactive'} />
            )}
            {currentSlideIndex === 3 && (
              <SlideFour
                slide={currentSlide}
                interactiveMode={viewMode === 'interactive'}
                onOpenExportModal={(pledge) => setExportPledge(pledge)}
              />
            )}
          </div>
        </div>
      </main>

      {/* Bottom Presentation Control Bar */}
      <PresentationControlBar
        currentSlideIndex={currentSlideIndex}
        totalSlides={slides.length}
        onPrev={handlePrev}
        onNext={handleNext}
        isPlayingAuto={isPlayingAuto}
        onToggleAutoPlay={() => setIsPlayingAuto((p) => !p)}
        laserActive={laserActive}
        onToggleLaser={() => setLaserActive((p) => !p)}
        drawActive={drawActive}
        onToggleDraw={() => setDrawActive((p) => !p)}
        ambientPlaying={ambientPlaying}
        onToggleAmbient={handleToggleAmbient}
        viewMode={viewMode}
        onSetViewMode={setViewMode}
        onOpenCoach={() => setIsCoachOpen(true)}
      />

      {/* Presenter Notes & Stopwatch Console Modal */}
      {viewMode === 'presenter' && (
        <PresenterNotesModal
          slides={slides}
          currentSlideIndex={currentSlideIndex}
          onSelectSlide={goToSlide}
          onClose={() => setViewMode('slideshow')}
        />
      )}

      {/* Slide Matrix Overview Modal */}
      {viewMode === 'overview' && (
        <SlideOverviewGrid
          slides={slides}
          currentSlideIndex={currentSlideIndex}
          onSelectSlide={goToSlide}
          onClose={() => setViewMode('slideshow')}
        />
      )}

      {/* AI Speech Coach Modal */}
      {isCoachOpen && (
        <AICoachModal
          currentSlideTitle={currentSlide.title}
          onClose={() => setIsCoachOpen(false)}
        />
      )}

      {/* Action Manifesto Pass Export Modal */}
      {exportPledge && (
        <ActionCardExportModal
          pledge={exportPledge}
          onClose={() => setExportPledge(null)}
        />
      )}

      {/* Presentation Share Link Modal */}
      {isShareOpen && (
        <ShareModal
          currentSlideIndex={currentSlideIndex}
          totalSlides={slides.length}
          onClose={() => setIsShareOpen(false)}
        />
      )}
    </div>
  );
}
