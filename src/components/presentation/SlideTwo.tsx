import { useState } from 'react';
import { SlideItem } from '../../types/presentation';
import { Play, Sparkles, Bike, Check, RefreshCw } from 'lucide-react';

interface SlideTwoProps {
  slide: SlideItem;
  interactiveMode: boolean;
}

export function SlideTwo({ slide, interactiveMode }: SlideTwoProps) {
  const [momentum, setMomentum] = useState<number>(35);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  // Derive stage of confidence flywheel
  const getStageInfo = (m: number) => {
    if (m < 25) {
      return {
        stage: 'Stage 1: The Sidewalk Trap',
        badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        headline: 'Waiting to "Feel Ready"',
        description: 'Paralysis by analysis. You read 10 articles, buy gear, but never pedal. Confidence remains 0% because your brain has no empirical proof of safety.',
        actionLevel: 'Zero Action',
        confidenceScore: '0%',
      };
    } else if (m < 60) {
      return {
        stage: 'Stage 2: The Clumsy First Push',
        badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
        headline: 'Embracing the Wobble',
        description: 'You took one messy step. The heart races, but the catastrophic fantasy collapses immediately into practical physics. Action generates first real data.',
        actionLevel: 'Courageous Push',
        confidenceScore: '35%',
      };
    } else if (m < 90) {
      return {
        stage: 'Stage 3: Surviving the Feedback',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        headline: 'Competence Developing',
        description: 'You adjusted steering after wobbling. You survived the micro-mistake. Your nervous system rewires: "I can handle this."',
        actionLevel: 'Active Iteration',
        confidenceScore: '75%',
      };
    } else {
      return {
        stage: 'Stage 4: Effortless Momentum',
        badgeColor: 'text-amber-300 bg-amber-400/20 border-amber-400/40',
        headline: 'Organic Confidence Unlocked',
        description: 'Confidence has arrived not because you meditated on feeling confident, but because your body has 100 recorded repetitions of surviving the action.',
        actionLevel: 'Flow State',
        confidenceScore: '100%',
      };
    }
  };

  const stage = getStageInfo(momentum);

  const handlePedal = () => {
    setMomentum((prev) => (prev >= 100 ? 10 : Math.min(100, prev + 25)));
  };

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row bg-[#081812] text-slate-100 overflow-hidden select-none">
      {/* Visual Column (Left): Child riding bicycle */}
      <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-slate-950 flex items-center justify-center">
        <img
          src={slide.imagePath}
          alt="Happy young child wearing helmet learning to ride a bicycle along sunny park path"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-transform duration-700 hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Soft emerald sunlight gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#081812]/20 to-[#081812]" />

        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-xs text-emerald-300/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/20">
          <Bike className="w-3.5 h-3.5 text-emerald-400" />
          <span>Slide 2 of 4 · The Kinetic Inversion</span>
        </div>
      </div>

      {/* Narrative & Interactive Column (Right) */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-y-auto bg-gradient-to-b from-[#081812] via-[#0b231a] to-[#06140e]">
        <div className="space-y-6 max-w-xl">
          {/* Slide Tagline */}
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-emerald-400/90 font-medium">
            <span>Part 2</span>
            <span aria-hidden="true">·</span>
            <span>The Mechanism of Courage</span>
          </div>

          {/* Core Headline from PDF */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] text-balance">
            CONFIDENCE <br />
            COMES AFTER <br />
            <span className="text-emerald-400">ACTION</span>
          </h1>

          {/* Subtext from PDF */}
          <p className="text-xl sm:text-2xl font-serif text-amber-200/90 italic tracking-wide">
            You learn by trying, not by waiting.
          </p>

          {/* Interactive Momentum Simulator */}
          <div className="pt-6 border-t border-emerald-900/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                The Action-Confidence Flywheel
              </span>
              <button
                onClick={handlePedal}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{momentum >= 100 ? 'Reset' : 'Push Pedal (+25%)'}</span>
              </button>
            </div>

            {/* Interactive Slider */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>0% Static Waiting</span>
                <span className="text-emerald-300 font-bold">{momentum}% Momentum</span>
                <span>100% Flow</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={momentum}
                onChange={(e) => setMomentum(Number(e.target.value))}
                className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Dynamic Stage Card */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 backdrop-blur-sm space-y-2.5 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wide uppercase text-emerald-400">
                  {stage.stage}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-300 border border-emerald-500/30">
                  Confidence: {stage.confidenceScore}
                </span>
              </div>

              <h4 className="text-base font-serif font-bold text-slate-100">
                {stage.headline}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {stage.description}
              </p>
            </div>

            {/* Core Principle Callout */}
            <div className="mt-4 p-3 rounded-lg bg-emerald-900/20 border border-emerald-500/20 text-xs text-emerald-200/90 flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>The Bicycle Law:</strong> Did you feel confident before riding a two-wheeler? No. You mounted the frame, fell into the grass, stood back up, and your brain calibrated balance through action.
              </span>
            </div>
          </div>
        </div>

        {/* Footer guidance */}
        <div className="pt-6 flex items-center justify-between text-xs text-slate-500">
          <span>Press Space or Right Arrow for Next Slide</span>
          <span className="font-mono">2 / 4</span>
        </div>
      </div>
    </div>
  );
}
