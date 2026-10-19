import React, { useState } from 'react';
import { UserPledge } from '../../types/presentation';
import { X, Printer, Copy, Check, Sparkles, Award } from 'lucide-react';

interface ActionCardExportModalProps {
  pledge: UserPledge;
  onClose: () => void;
}

export function ActionCardExportModal({ pledge, onClose }: ActionCardExportModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `
========================================
    THE ARCHITECTURE OF ACTION
          COURAGE MANIFESTO
========================================

TENET 1: What If I Fail?
  The spotlight effect is an illusion. Audiences respect poise, not perfection.

TENET 2: Confidence Follows Action
  You learn by trying, not by waiting. Confidence is the receipt of survived attempts.

TENET 3: Start Small
  Small actions create big changes. Speak for 1 minute. Start 1 conversation. Take 1 step.

TENET 4: You Don't Need To Feel Ready
  Take the first step today. Readiness is a myth; momentum is reality.

----------------------------------------
MY IMMEDIATE ACTION PLEDGE:
Goal: ${pledge.goal}
Immediate 2-Minute Action: ${pledge.twoMinuteAction}
Date Sealed: ${pledge.dateSigned}
----------------------------------------
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Personalized Action Manifesto Pass
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Action Pass Card (Designed for both screen and print) */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#1e1728] via-[#150d1e] to-[#0c0812] border-2 border-amber-500/40 shadow-xl space-y-6 text-slate-100 relative">
            {/* Corner ornament marks */}
            <div className="absolute top-3 left-3 text-[10px] text-amber-400/50 font-mono">✦ 01</div>
            <div className="absolute top-3 right-3 text-[10px] text-amber-400/50 font-mono">✦ 04</div>

            <div className="text-center space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Official Declaration
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                The Architecture of Action
              </h3>
              <p className="text-xs text-amber-200/80 italic font-serif">
                “Confidence comes after action. You learn by trying, not by waiting.”
              </p>
            </div>

            {/* The 4 Tenets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20">
                <span className="font-bold text-amber-300 block mb-0.5">1. What If I Fail?</span>
                <span className="text-slate-300">Failure is the raw curriculum of mastery. The spotlight dread is an illusion.</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20">
                <span className="font-bold text-amber-300 block mb-0.5">2. Kinetic Confidence</span>
                <span className="text-slate-300">You don’t think your way into bravery; you act your way into confidence.</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20">
                <span className="font-bold text-amber-300 block mb-0.5">3. Start Small</span>
                <span className="text-slate-300">Speak for one minute. Start a conversation. Take one small step.</span>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-amber-500/20">
                <span className="font-bold text-amber-300 block mb-0.5">4. Start Unready</span>
                <span className="text-slate-300">The path only reveals itself to those in motion. Take the step today.</span>
              </div>
            </div>

            {/* Personalized Commitment Box */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>My Active Commitment</span>
              </div>

              <div className="text-xs space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <span className="text-slate-400 font-medium">Goal In Motion:</span>
                  <span className="text-slate-100 font-semibold">{pledge.goal}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <span className="text-amber-300 font-medium">First 2-Minute Action:</span>
                  <span className="text-amber-100 font-bold">{pledge.twoMinuteAction}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Status: Committed</span>
                <span>Date: {pledge.dateSigned}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Manifesto' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/15"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
