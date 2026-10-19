import React, { useState } from 'react';
import { X, Sparkles, Send, Lightbulb, MessageCircle, Mic, CheckCircle2 } from 'lucide-react';

interface AICoachModalProps {
  currentSlideTitle: string;
  onClose: () => void;
}

export function AICoachModal({ currentSlideTitle, onClose }: AICoachModalProps) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'coach'; text: string }>>([
    {
      sender: 'coach',
      text: `Welcome to the Presentation Rehearsal Studio. You are currently rehearsing: "${currentSlideTitle}". How can I support your delivery? You can select a common stage challenge below or ask a specific question.`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sampleScenarios = [
    'How do I open slide 1 with maximum emotional tension without trembling?',
    'What if an audience member looks bored or checks their phone?',
    'How do I explain the "Bicycle Law" without sounding cliché?',
    'How do I bridge from "Start Small" into the final call to action?'
  ];

  const handleSend = (textToSend?: string) => {
    const prompt = textToSend || query;
    if (!prompt.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: prompt }]);
    if (!textToSend) setQuery('');
    setIsLoading(true);

    setTimeout(() => {
      let answer = '';
      const p = prompt.toLowerCase();

      if (p.includes('trembling') || p.includes('tension') || p.includes('open slide 1') || p.includes('nervous')) {
        answer = `Tactical Anchor for Slide 1 ("What If I Fail?"):
1. The 3-Second Breath: Stand at center stage, plant both feet shoulder-width apart, and exhale slowly before uttering your first word. Silence commands attention.
2. Lean into the tension: Say, "Right now, someone in this room is sitting on a brilliant idea because a quiet voice asked: 'What if they laugh at me?'"
3. Physiological Hack: Press your big toes firmly into your shoes. It grounds nervous energy and halts leg shaking instantly.`;
      } else if (p.includes('phone') || p.includes('bored') || p.includes('distracted')) {
        answer = `Audience Re-Engagement Protocol:
1. Don't fight the distraction—change your acoustic energy. Drop your volume slightly rather than shouting; human brains instinctively perk up to decode softer signals.
2. Move across the room to create visual parallax.
3. Ask a direct binary question: "By quick show of hands—or in your head—who here has ever waited to feel ready?"`;
      } else if (p.includes('bicycle') || p.includes('cliché')) {
        answer = `Delivering the "Bicycle Law" with Impact:
Frame it as evolutionary neurology rather than a children's story:
"Your brain is an energy-conservation organ. It treats anything untested as fatal risk. The child on the bicycle doesn't survive because of confidence; they gain confidence because their nervous system survived 10 wobbles."`;
      } else if (p.includes('bridge') || p.includes('call to action') || p.includes('final')) {
        answer = `The Momentum Bridge (Slide 3 to 4):
"We just saw how starting small reduces friction to near zero. So what is left? Only the illusion of readiness. You will never wake up and feel 100% prepared to take the leap. The leap is what prepares you. Take the first step today."`;
      } else {
        answer = `Key Presentation Insight for "${prompt}":
1. Audience Focus: Shift your internal dialogue from "How am I performing?" to "What gift or clarity am I offering this room?"
2. Physical Pacing: After your key quote, leave 2 full beats of silence so the idea lands in their long-term memory.
3. Call to Action: Give them a specific, frictionless 2-minute task rather than a vague philosophy.`;
      }

      setMessages((prev) => [...prev, { sender: 'coach', text: answer }]);
      setIsLoading(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Presentation Rehearsal Coach
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'coach' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium'
                    : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-amber-400 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Analyzing stage dynamics...</span>
            </div>
          )}
        </div>

        {/* Suggested Prompt Chips */}
        <div className="px-6 py-2.5 bg-slate-950/80 border-t border-slate-800/80 flex flex-wrap gap-1.5">
          {sampleScenarios.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors truncate max-w-full text-left"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about timing, tone, body language, or objections..."
            className="flex-1 bg-slate-900 border border-slate-700 px-3.5 py-2 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
