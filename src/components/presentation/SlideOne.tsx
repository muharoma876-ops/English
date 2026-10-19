import React, { useState } from 'react';
import { SlideItem } from '../../types/presentation';
import { MessageSquare, Sparkles, ShieldAlert, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface SlideOneProps {
  slide: SlideItem;
  interactiveMode: boolean;
}

export function SlideOne({ slide, interactiveMode }: SlideOneProps) {
  const [selectedFearId, setSelectedFearId] = useState<string | null>('opt-imposter');
  const [votes, setVotes] = useState<Record<string, number>>({
    'opt-judgement': 42,
    'opt-imposter': 68,
    'opt-perfection': 55,
    'opt-regret': 31,
  });
  const [userVoted, setUserVoted] = useState(false);

  // Worst-Case Scenario reframing drill
  const [customFear, setCustomFear] = useState('');
  const [reframeResult, setReframeResult] = useState<string | null>(null);

  const handleVote = (optionId: string) => {
    setSelectedFearId(optionId);
    if (!userVoted) {
      setVotes((prev) => ({
        ...prev,
        [optionId]: (prev[optionId] || 0) + 1,
      }));
      setUserVoted(true);
    }
  };

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const selectedOption = slide.pollData?.options.find((opt) => opt.id === selectedFearId);

  const handleDrillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFear.trim()) return;

    const fearLower = customFear.toLowerCase();
    let response = '';
    if (fearLower.includes('laugh') || fearLower.includes('embarrass') || fearLower.includes('judg')) {
      response = 'The Spotlight Effect: Audiences remember less than 5% of your phrasing. They remember your calmness and sincerity. If you laugh off a stumble, the room falls in love with your authenticity.';
    } else if (fearLower.includes('forget') || fearLower.includes('blank') || fearLower.includes('mess')) {
      response = 'Tactical Reset Rule: If your mind goes blank, take a deliberate sip of water. Audiences perceive a 4-second pause as profound poise, not memory failure.';
    } else if (fearLower.includes('fail') || fearLower.includes('reject') || fearLower.includes('no')) {
      response = 'The Repetition Law: A single "failure" is merely data on what to adjust. Every master has a graveyard of rough drafts that preceded their breakthrough.';
    } else {
      response = `De-escalation Reframe: Even if "${customFear.trim()}" happens, you will survive, recalibrate in 24 hours, and emerge with higher real-world resilience than someone who never dared to step out.`;
    }
    setReframeResult(response);
  };

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row bg-[#0c1322] text-slate-100 overflow-hidden select-none">
      {/* Visual Column (Left): Anxious stage presentation */}
      <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-slate-950 flex items-center justify-center">
        <img
          src={slide.imagePath}
          alt="Anxious presenter standing under spotlight in an empty auditorium"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-transform duration-700 hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic gradient overlay matching stage lighting */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#0c1322]/20 to-[#0c1322]" />

        {/* Ambient indicator */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs text-amber-300/80 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/20">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Slide 1 of 4 · The Threshold of Dread</span>
        </div>
      </div>

      {/* Narrative & Interactive Content Column (Right) */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-y-auto bg-gradient-to-b from-[#0c1322] via-[#0f172a] to-[#0a0f1d]">
        <div className="space-y-6 max-w-xl">
          {/* Slide Tagline */}
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-400/90 font-medium">
            <span>Part 1</span>
            <span aria-hidden="true">·</span>
            <span>The Anatomy of Hesitation</span>
          </div>

          {/* Core Slide Headline matching screenshot */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#f59e0b] tracking-tight leading-[1.1] text-balance">
            WHAT IF I FAIL?
          </h1>

          {/* Subtitles matching screenshot */}
          <div className="space-y-3 pt-2">
            <p className="text-xl sm:text-2xl font-serif text-slate-200/95 italic tracking-wide">
              What if they laugh at me?
            </p>
            <p className="text-xl sm:text-2xl font-serif text-slate-300/90 italic tracking-wide">
              What if I’m not good enough?
            </p>
          </div>

          {/* Interactive Poll & Reframing Section */}
          <div className="pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                Live Audience Reflection Poll
              </span>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                {totalVotes} participants
              </span>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              Click the option that resonates with your internal friction:
            </p>

            <div className="space-y-2">
              {slide.pollData?.options.map((opt) => {
                const percentage = Math.round((votes[opt.id] / totalVotes) * 100) || 0;
                const isSelected = selectedFearId === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleVote(opt.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'border-amber-400/70 bg-amber-500/10 shadow-lg shadow-amber-500/5'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    {/* Visual vote fill bar */}
                    <div
                      className="absolute inset-y-0 left-0 bg-amber-500/15 transition-all duration-700 ease-out pointer-events-none"
                      style={{ width: `${percentage}%` }}
                    />

                    <div className="relative z-10 flex items-center justify-between gap-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0 group-hover:border-amber-400/60" />
                        )}
                        <span className={`font-medium ${isSelected ? 'text-amber-200' : 'text-slate-200'}`}>
                          {opt.label}
                        </span>
                      </div>
                      <span className="text-xs font-mono tabular-nums text-slate-400 shrink-0">
                        {percentage}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Cognitive Reframe Card */}
            {selectedOption && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 text-xs sm:text-sm text-slate-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Cognitive Antidote</span>
                </div>
                <p className="leading-relaxed text-slate-200">
                  {selectedOption.reframe}
                </p>
              </div>
            )}
          </div>

          {/* Interactive Fear Defusion Drill (Expandable) */}
          {interactiveMode && (
            <div className="mt-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm">
              <span className="font-semibold text-slate-200 block mb-1">
                The Worst-Case Defusion Drill
              </span>
              <p className="text-xs text-slate-400 mb-3">
                Name your specific imaginary worst catastrophe to uncover the recovery blueprint:
              </p>
              <form onSubmit={handleDrillSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={customFear}
                  onChange={(e) => setCustomFear(e.target.value)}
                  placeholder="e.g. My mind blanks in front of the board..."
                  className="flex-1 bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 text-xs"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg transition-colors flex items-center gap-1 text-xs shrink-0"
                >
                  <span>Defuse</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {reframeResult && (
                <div className="mt-3 p-3 bg-slate-900/80 rounded-lg border border-slate-700/60 text-xs text-slate-300 flex items-start justify-between gap-2">
                  <p className="leading-relaxed text-amber-100/90">{reframeResult}</p>
                  <button
                    onClick={() => {
                      setReframeResult(null);
                      setCustomFear('');
                    }}
                    className="text-slate-500 hover:text-slate-300 p-1 shrink-0"
                    title="Reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer guidance */}
        <div className="pt-6 flex items-center justify-between text-xs text-slate-500">
          <span>Press Space or Right Arrow for Next Slide</span>
          <span className="font-mono">1 / 4</span>
        </div>
      </div>
    </div>
  );
}
