import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ShieldAlert, 
  RotateCcw, 
  ArrowRight,
  HelpCircle,
  Terminal
} from 'lucide-react';

export default function GalaxIntelligence({ 
  isOpen, 
  onClose, 
  activeContext = null 
}) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "I am GALAX Intelligence, your specialized cybersecurity threat analyst. How can I assist you with assessing digital threats or navigating suspicious communications?",
      timestamp: "Just now"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeContext) {
      // Add a context notification message if a new threat was provided
      setMessages(prev => [
        ...prev,
        {
          role: 'system',
          text: `Context updated: Evaluating [${activeContext.threat_type || 'Digital Threat'}] with Risk Score: ${activeContext.risk_score || 0}/100.`,
          timestamp: "Just now"
        }
      ]);
    }
  }, [activeContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (questionText = null) => {
    const query = questionText || input;
    if (!query.trim() || loading) return;

    const userMsg = {
      role: 'user',
      text: query,
      timestamp: "Just now"
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const resp = await fetch('/api/analyze/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          context: activeContext || {}
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: data.reply,
            provider: data.provider,
            timestamp: "Just now"
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: "Analysis service temporarily unavailable. Please verify connection to the GALAX defense backend.",
            timestamp: "Just now"
          }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: "Communication error: Could not reach GALAX Security Engine.",
          timestamp: "Just now"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const chips = [
    "Why was this flagged?",
    "What should I do right now?",
    "Is this message safe?",
    "Is this payment request suspicious?",
    "What are the warning signs?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[460px] z-50 bg-[#070B14]/95 backdrop-blur-2xl border-l border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-['Outfit']">
                GALAX Intelligence
              </h3>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Adversarial Logic & Defensive Companion
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Active Threat Context Bar */}
      {activeContext && (
        <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="text-slate-300 truncate font-mono text-[11px]">
              {activeContext.threat_type || 'Active Threat'}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
            {activeContext.risk_score || 0}/100
          </span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, idx) => {
          if (m.role === 'system') {
            return (
              <div key={idx} className="flex justify-center my-2">
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-400">
                  {m.text}
                </span>
              </div>
            );
          }

          const isUser = m.role === 'user';
          return (
            <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                isUser 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-tr-none' 
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
              }`}>
                {!isUser && (
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>GALAX Defense Intel</span>
                  </div>
                )}
                {m.text}
                {m.provider && (
                  <div className="mt-2 pt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-400">
                    Engine: {m.provider}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-tl-none p-3 bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-[11px]">Synthesizing defensive assessment...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
          Recommended Queries
        </div>
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }} 
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask GALAX Intelligence..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[9px] text-slate-500 text-center font-mono mt-2">
          AI-powered cybersecurity advisory. Strictly non-destructive.
        </p>
      </div>

    </div>
  );
}
