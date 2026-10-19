import React, { useState, useEffect } from 'react';
import { SlideItem } from '../../types/presentation';
import { soundEngine } from '../../utils/audio';
import { Play, Pause, RotateCcw, Check, MessageSquarePlus, Sparkles, Feather, Bell } from 'lucide-react';

interface SlideThreeProps {
  slide: SlideItem;
  interactiveMode: boolean;
}

export function SlideThree({ slide, interactiveMode }: SlideThreeProps) {
  // 60-Second Challenge Timer State
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);

  // 3 Steps checkmarks state
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  });

  // Conversation prompts generator
  const conversationPrompts = [
    '“What is a project you are working on that secretly excites you?”',
    '“What was the most surprising thing you learned this month?”',
    '“If you could solve one everyday friction with zero effort, what would it be?”',
    '“What is a belief you held 5 years ago that you completely reversed?”'
  ];
  const [promptIdx, setPromptIdx] = useState(0);

  // Micro-step goal slicer
  const [bigGoal, setBigGoal] = useState('');
  const [microSlice, setMicroSlice] = useState<string | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: number | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = window.setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            setTimerCompleted(true);
            soundEngine.playChime();
            setCompletedSteps((s) => ({ ...s, 1: true }));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const toggleTimer = () => {
    if (timerCompleted) {
      setTimerSeconds(60);
      setTimerCompleted(false);
      setTimerRunning(true);
    } else {
      setTimerRunning(!timerRunning);
    }
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(60);
    setTimerCompleted(false);
  };

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) => {
      const next = !prev[stepNum];
      if (next) {
        soundEngine.playChime();
      }
      return {
        ...prev,
        [stepNum]: next,
      };
    });
  };

  const handleSliceGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bigGoal.trim()) return;
    const g = bigGoal.trim();
    setMicroSlice(`Your 60-Second Micro-Slice: "Spend exactly 60 seconds opening one note and writing the first bullet point for: ${g}"`);
    setCompletedSteps((s) => ({ ...s, 3: true }));
  };

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row bg-[#1b1511] text-[#fbf7f4] overflow-hidden select-none">
      {/* Content & Interactive Column (Left - matching layout in slide 3) */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-y-auto bg-gradient-to-b from-[#1b1511] via-[#241a14] to-[#16100c]">
        <div className="space-y-6 max-w-xl">
          {/* Slide Tagline */}
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-400 font-medium">
            <span>Part 3</span>
            <span aria-hidden="true">·</span>
            <span>The Micro-Action Blueprint</span>
          </div>

          {/* Core Headline from PDF */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-100 tracking-tight leading-[1.1]">
            START SMALL
          </h1>

          {/* The 3 Core Steps from PDF with interactive engagement */}
          <div className="space-y-3 pt-2">
            {/* Step 1: Speak for one minute */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                completedSteps[1]
                  ? 'bg-amber-950/40 border-amber-500/50 shadow-md shadow-amber-500/5'
                  : 'bg-[#291e17]/80 border-amber-900/40 hover:border-amber-700/60'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-serif font-bold text-amber-400 font-mono">1</span>
                  <span className="text-base sm:text-lg font-serif text-slate-100 font-medium">
                    Speak for one minute
                  </span>
                </div>
                <button
                  onClick={() => toggleStep(1)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    completedSteps[1]
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'border-amber-700/50 text-amber-300 hover:bg-amber-900/40'
                  }`}
                  title="Mark step completed"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>

              {/* Interactive 60s Micro-Timer Tool */}
              <div className="mt-3 pt-3 border-t border-amber-900/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono font-bold text-amber-200 tabular-nums">
                    00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                  </span>
                  {timerCompleted && (
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <Bell className="w-3.5 h-3.5" />
                      Complete!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleTimer}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs flex items-center gap-1 transition-colors"
                  >
                    {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{timerRunning ? 'Pause' : timerCompleted ? 'Repeat' : 'Start 60s'}</span>
                  </button>
                  <button
                    onClick={resetTimer}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-amber-900/30 transition-colors"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Start a conversation */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                completedSteps[2]
                  ? 'bg-amber-950/40 border-amber-500/50 shadow-md shadow-amber-500/5'
                  : 'bg-[#291e17]/80 border-amber-900/40 hover:border-amber-700/60'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-serif font-bold text-amber-400 font-mono">2</span>
                  <span className="text-base sm:text-lg font-serif text-slate-100 font-medium">
                    Start a conversation
                  </span>
                </div>
                <button
                  onClick={() => toggleStep(2)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    completedSteps[2]
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'border-amber-700/50 text-amber-300 hover:bg-amber-900/40'
                  }`}
                  title="Mark step completed"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>

              {/* Spark prompt */}
              <div className="mt-2 text-xs text-amber-200/90 flex items-start justify-between gap-2 bg-amber-950/30 p-2.5 rounded-lg border border-amber-900/30">
                <p className="italic">{conversationPrompts[promptIdx]}</p>
                <button
                  onClick={() => setPromptIdx((p) => (p + 1) % conversationPrompts.length)}
                  className="text-amber-400 hover:text-amber-300 shrink-0 font-medium text-[11px] flex items-center gap-1"
                >
                  <MessageSquarePlus className="w-3 h-3" />
                  <span>Next Prompt</span>
                </button>
              </div>
            </div>

            {/* Step 3: Take one small step */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                completedSteps[3]
                  ? 'bg-amber-950/40 border-amber-500/50 shadow-md shadow-amber-500/5'
                  : 'bg-[#291e17]/80 border-amber-900/40 hover:border-amber-700/60'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-serif font-bold text-amber-400 font-mono">3</span>
                  <span className="text-base sm:text-lg font-serif text-slate-100 font-medium">
                    Take one small step
                  </span>
                </div>
                <button
                  onClick={() => toggleStep(3)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    completedSteps[3]
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'border-amber-700/50 text-amber-300 hover:bg-amber-900/40'
                  }`}
                  title="Mark step completed"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>

              {/* Micro-step input */}
              <form onSubmit={handleSliceGoal} className="mt-2.5 flex gap-2">
                <input
                  type="text"
                  value={bigGoal}
                  onChange={(e) => setBigGoal(e.target.value)}
                  placeholder="Type a big goal to micro-slice..."
                  className="flex-1 bg-[#1a120d] border border-amber-900/60 px-3 py-1.5 rounded-lg text-xs text-amber-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg text-xs font-medium shrink-0 transition-colors"
                >
                  Slice
                </button>
              </form>

              {microSlice && (
                <p className="mt-2 text-xs text-amber-300 font-medium bg-amber-950/50 p-2 rounded border border-amber-800/40">
                  {microSlice}
                </p>
              )}
            </div>
          </div>

          {/* Subtext matching screenshot */}
          <p className="text-lg sm:text-xl font-serif text-amber-300/90 font-medium pt-2">
            Small actions create big changes.
          </p>
        </div>

        {/* Footer guidance */}
        <div className="pt-6 flex items-center justify-between text-xs text-stone-500">
          <span>Press Space or Right Arrow for Next Slide</span>
          <span className="font-mono">3 / 4</span>
        </div>
      </div>

      {/* Visual Column (Right): Anime lofi window desk */}
      <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-stone-950 flex items-center justify-center">
        <img
          src={slide.imagePath}
          alt="Cozy lofi illustration of person with headphones at desk by open window"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-transform duration-700 hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Soft amber window light gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-[#1b1511]/20 to-[#1b1511]" />

        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 text-xs text-amber-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/20">
          <Feather className="w-3.5 h-3.5 text-amber-400" />
          <span>Slide 3 of 4 · The Atomic Threshold</span>
        </div>
      </div>
    </div>
  );
}
