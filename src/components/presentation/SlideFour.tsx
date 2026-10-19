import React, { useState } from 'react';
import { SlideItem, UserPledge } from '../../types/presentation';
import { soundEngine } from '../../utils/audio';
import { Compass, Sparkles, Download, CheckCircle, ArrowRight, Share2, Award } from 'lucide-react';

interface SlideFourProps {
  slide: SlideItem;
  interactiveMode: boolean;
  onOpenExportModal: (pledge: UserPledge) => void;
}

export function SlideFour({ slide, interactiveMode, onOpenExportModal }: SlideFourProps) {
  const [goal, setGoal] = useState('Publish the project I have been polishing in secret');
  const [twoMinuteAction, setTwoMinuteAction] = useState('Draft the 3-sentence announcement email');
  const [committed, setCommitted] = useState(false);

  const predefinedGoals = [
    'Publish the project I have been polishing in secret',
    'Schedule the hard conversation with my team',
    'Sign up for the public speaking workshop',
    'Pitch my unconventional idea to leadership'
  ];

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || !twoMinuteAction.trim()) return;
    setCommitted(true);
    soundEngine.playChime();
  };

  const currentPledge: UserPledge = {
    goal: goal.trim() || 'My courage breakthrough',
    twoMinuteAction: twoMinuteAction.trim() || 'Take the immediate first step',
    scheduledTime: 'Today',
    accountabilityPartner: 'Self & Audience',
    dateSigned: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
  };

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row bg-[#150d1a] text-slate-100 overflow-hidden select-none">
      {/* Visual Column (Left): Mountain ridge sunrise */}
      <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-slate-950 flex items-center justify-center">
        <img
          src={slide.imagePath}
          alt="Hiker walking along mountain trail towards sunrise horizon"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-transform duration-700 hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic sunset gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#150d1a]/20 to-[#150d1a]" />

        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs text-amber-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/20">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Slide 4 of 4 · The Final Horizon</span>
        </div>
      </div>

      {/* Narrative & Interactive Column (Right) */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-y-auto bg-gradient-to-b from-[#150d1a] via-[#1f1227] to-[#0e0712]">
        <div className="space-y-6 max-w-xl">
          {/* Slide Tagline */}
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-amber-400 font-medium">
            <span>Part 4</span>
            <span aria-hidden="true">·</span>
            <span>The Call to Action</span>
          </div>

          {/* Headline from PDF */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] text-balance">
            YOU DON’T NEED <br />
            TO FEEL READY TO <br />
            <span className="text-amber-400">START.</span>
          </h1>

          {/* Subtitle from PDF */}
          <p className="text-xl sm:text-2xl font-serif text-amber-300/90 font-semibold tracking-wider">
            TAKE THE FIRST STEP TODAY.
          </p>

          {/* Interactive Pledge & Pass Generator */}
          <div className="pt-6 border-t border-purple-950">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Your First Step Manifesto
              </span>
              <span className="text-xs text-slate-400">
                Action Over Hesitation
              </span>
            </div>

            <form onSubmit={handleCommit} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1 font-medium">
                  What have you been waiting to feel "ready" for?
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {predefinedGoals.map((g, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setGoal(g)}
                      className={`text-[11px] px-2 py-1 rounded-md border text-left transition-colors ${
                        goal === g
                          ? 'bg-amber-500/20 text-amber-200 border-amber-500/40'
                          : 'bg-purple-950/30 text-slate-400 border-purple-900/40 hover:text-slate-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-[#20132b] border border-purple-900/60 px-3 py-2 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1 font-medium">
                  Your 2-Minute First Action (Execute in next 24 hours):
                </label>
                <input
                  type="text"
                  value={twoMinuteAction}
                  onChange={(e) => setTwoMinuteAction(e.target.value)}
                  className="w-full bg-[#20132b] border border-purple-900/60 px-3 py-2 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/10"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{committed ? 'Pledge Recorded' : 'Seal My Commitment'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenExportModal(currentPledge)}
                  className="px-3.5 py-2 bg-purple-950/60 hover:bg-purple-900/60 text-amber-300 border border-purple-800/60 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Action Pass</span>
                </button>
              </div>
            </form>

            {committed && (
              <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 animate-in fade-in duration-300">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-amber-200">
                    Commitment Sealed: You are on the mountain trail.
                  </p>
                  <p className="text-slate-300">
                    Confidence is no longer required. Only momentum.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer guidance */}
        <div className="pt-6 flex items-center justify-between text-xs text-slate-500">
          <span>End of Deck · Review or Replay Anytime</span>
          <span className="font-mono">4 / 4</span>
        </div>
      </div>
    </div>
  );
}
